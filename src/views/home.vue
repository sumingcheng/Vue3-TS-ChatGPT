<script setup lang='ts'>
// Imports
import type { ChatMessage } from '@/types'
import { isMobile, initMsg, ChatStorageManager } from '@/types'
import Loading from '@/components/Loding.vue'
import { chat } from '@/libs/gpt'
import { initCopy, operationKey, scrollToBottom } from '@/hooks'
import { ElButton, ElInput, ElMessage, ElDialog, ElSelect, ElOption } from 'element-plus'
import { DECODER, goGitHub, sortModelsById } from '@/libs/utils'
import { markedRender } from '@/libs/highlight'
import basicModelList from '@/data/data.json'

const GPT_VERSION = sortModelsById(basicModelList)

// Initialization
const chatManager = ChatStorageManager.getInstance()
const { getKey, setKey } = operationKey()
const roleAlias = { user: 'ME', assistant: 'Magic Conch', system: 'System' }
const messageList = ref<ChatMessage[]>(initMsg)
const GPT_V = ref('gpt-3.5-turbo')
let isTalking = ref(false)

// References
const myInput = ref<HTMLInputElement | null>(null)
const centerDialogVisible = ref(false)
const chatListDom = ref<HTMLDivElement>()
const isScrolling = ref(false)
let messageContent = ref('')
let Key = ref('')

// MathJax handling
const checkMathJax = () => {
  if (window.MathJax) {
    handleMathjaxTypeset()
  } else {
    setTimeout(checkMathJax, 100)
  }
}

const handleMathjaxTypeset = () => {
  watchEffect(() => {
    messageList.value.forEach((message) => {
      if (message.content && message.content.includes('$')) {
        nextTick(() => {
          window.MathJax.typesetPromise()
        })
      }
    })
  })
}

// Message handling
const saveApiKey = () => {
  if (!Key.value) {
    ElMessage({ message: '请输入API Key', type: 'warning' })
    return
  }
  setKey(Key.value)
  ElMessage({ message: '保存成功', type: 'success' })
  centerDialogVisible.value = false
}

const clearMessageContent = () => {
  messageContent.value = ''
}

const appendLastMessageContent = (content: string) => {
  messageList.value[messageList.value.length - 1].content += content
}

const updateMessageListWithResponse = async (response: any) => {
  try {
    const reader = response.data.getReader()
    await readStreamAndUpdateMessage(reader)
  } catch (error) {
    console.error('Error updating message list:', error)
  }
}

const readStreamAndUpdateMessage = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
  const { done, value } = await reader.read()
  if (done) {
    reader.closed
    return
  }
  const dataList = DECODER.decode(value).match(/data: \s*({.*?}]})/g)
  dataList?.forEach((v: any) => {
    const jsonStr = v.replace('data: ', '')
    const json = JSON.parse(jsonStr)
    appendLastMessageContent(json.choices[0].delta.content ?? '')
  })
  await readStreamAndUpdateMessage(reader)
}

const sendMessageToAssistant = async (content: string = messageContent.value) => {
  if (!content) {
    ElMessage({ message: '请输入内容', type: 'info' })
    return
  }

  isTalking.value = true

  if (messageList.value.length === 2) {
    messageList.value.pop()
  }

  messageList.value.push({ role: 'user', content })
  clearMessageContent()

  messageList.value.push({ role: 'assistant', content: '' })

  const response = await chat(messageList.value, getKey(), GPT_V.value)
  if (response.status === 'success' && response.data) {
    await updateMessageListWithResponse(response)
  } else {
    appendLastMessageContent(response.message)
  }

  isTalking.value = false
  getFocus()

  // Save chat records
  const serializedData = JSON.stringify(messageList.value)
  const parsedData = JSON.parse(serializedData)
  chatManager.saveChatRecord(parsedData).then(() => {
    console.log('Chat records saved successfully!')
  })
}

// UI handling
const getFocus = () => {
  nextTick(() => {
    if (myInput.value) {
      myInput.value.focus()
    }
  })
}

const handleConfigClick = () => {
  centerDialogVisible.value = true

  let apiKey = getKey()
  if (apiKey) {
    Key.value = apiKey
  }
}

const goToTheBottom = () => {
  nextTick(() => {
    if (chatListDom.value) {
      scrollToBottom(chatListDom.value)
    }
  })
}

const toDelete = () => {
  chatManager.deleteChatRecord().then(() => {
    console.log('Chat records deleted successfully!')
  })
  messageList.value = initMsg
}

const initializationRecord = async () => {
  const res = await chatManager.getChatRecord()
  if (res) {
    messageList.value = res
    goToTheBottom()
  }
}

// Watchers and lifecycle hooks
watch(messageList.value, () => {
    console.log('goToTheBottom()', messageList.value)
    nextTick(() => {
      if (!isScrolling.value) {
        goToTheBottom()
      }
    })
  },
  { deep: true, immediate: true }
)

onUpdated(() => {
  nextTick(() => {
    initCopy()
  })
})

onMounted(() => {
  if (getKey() === '') {
    centerDialogVisible.value = true
  }
  getFocus()
  initializationRecord()
  checkMathJax()
  initCopy()
})

</script>


<template>
  <div class='flex flex-col h-screen relative'>
    <div class='flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bgColor z-50'>
      <div class='text-2xl font-bold text-white'>MagicConch</div>
      <div class='ml-4 text-sm text-white' v-if='!isMobile'>
        Magic conch based on ChatGPT
      </div>
      <div class='ml-4 my-auto cursor-pointer' @click='goGitHub' v-if='!isMobile'>
        <img loading='lazy' src='https://img.shields.io/github/stars/sumingcheng/Vue3-TS-ChatGPT?logo=github' alt='GitHub'>
      </div>
      <div class='ml-auto text-sm cursor-pointer' @click='handleConfigClick'>
        <el-button size='large' type='info' class='elBtnStyle text-4xl'>Settings</el-button>
      </div>
    </div>
    <div class='flex-1 mt-16 content' ref='observedDiv'>
      <div class='mx-10 mt-6 mb-24' ref='chatListDom'>
        <div v-for="item of messageList.filter((v) => v.role !== 'system')">
          <div class='font-bold mb-3 text-lg'>{{ roleAlias[item.role] }}：</div>
          <div class='text-base text-black whitespace-pre-wrap' v-if='item.content' v-html="markedRender(item.content.replace(/^\n\n/, ''))">
          </div>
          <Loading v-else />
        </div>
      </div>
    </div>
    <div class='flex flex-nowrap fixed w-full p-6 bgColor bottom-0 z-50'>
      <div class='flex items-center w-full'>
        <el-input class='input' :rows='1' type='textarea' ref='myInput' v-model='messageContent' size='large'
                  @keydown.enter='sendMessageToAssistant()' :disabled='isTalking' />
        <el-button @click='sendMessageToAssistant()' size='large' type='info' class='elBtnStyle text-5xl ml-5'>Send</el-button>
        <div class='triangle ml-4 cursor-pointer' @click='toDelete'>
          <DeleteFilled />
        </div>
        <div class='triangle ml-4 cursor-pointer' @click='goToTheBottom' v-if='!isMobile'>
          <img src='@/assets/3.svg' alt='ReturnToBottom' />
        </div>
      </div>
    </div>
  </div>
  <!-- 弹框设置 -->
  <el-dialog v-model='centerDialogVisible' title='Settings' width='80%' center>
    <div class='bottom-0 w-full p-6 pb-8'>
      <div class='flex items-center'>
        <span class='w-1/6 font-bold'>API Key</span>
        <el-input placeholder='sk-xxxxxxxxxx' v-model='Key' size='large' clearable />
      </div>
      <div class='flex items-center mt-5'>
        <span class='w-1/6 font-bold'>Version</span>
        <el-select size='large' class='w-full' v-model='GPT_V'>
          <el-option v-for='item in GPT_VERSION' :key='item.id' :label='item.id' :value='item.id' />
        </el-select>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click='centerDialogVisible = false'>Close</el-button>
        <el-button type='primary' @click='saveApiKey' class='fix-primary'>Preserve</el-button>
      </span>
    </template>
  </el-dialog>
</template>
