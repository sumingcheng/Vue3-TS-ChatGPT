<script setup lang='ts'>
import Loading from '@/components/Loding.vue'
import basicModelList from '@/data/data.json'
import { initCopy, operationKey } from '@/hooks'
import { chat } from '@/libs/gpt'
import { markedRender } from '@/libs/highlight'
import { DECODER, goGitHub, sortModelsById } from '@/libs/utils'
import type { ChatMessage } from '@/types'
import { ChatStorageManager, initMsg, isMobile } from '@/types'
import { DeleteFilled } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElMessage } from 'element-plus'
import { debounce } from 'lodash'
import SmoothScroll from 'smooth-scroll'
import SettingsDialog from './SettingsDialog.vue'
import Header from './Header.vue'

const GPT_VERSION = sortModelsById(basicModelList)

// Initialization
const chatManager = ChatStorageManager.getInstance()
const { getKey, setKey } = operationKey()
const roleAlias = { user: 'ME', assistant: 'Magic Conch', system: 'System' }
const messageList = ref<ChatMessage[]>(initMsg as ChatMessage[])
const GPT_V = ref('gpt-3.5-turbo')
let isTalking = ref(false)

// References
const myInput = ref<HTMLInputElement | null>(null)
const centerDialogVisible = ref(false)
const chatListDom = ref<HTMLDivElement>()
let messageContent = ref('')

// MathJax handling
const checkMathJax = () => {
  if (window.MathJax) {
    handleMathjaxTypeset()
  } else {
    setTimeout(checkMathJax, 100)
  }
}

const handleMathjaxTypeset = debounce(() => {
  watchEffect(() => {
    messageList.value.forEach((message) => {
      if (message.content && message.content.includes('$')) {
        nextTick(() => {
          window.MathJax.typesetPromise()
        })
      }
    })
  })
}, 200)

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
    reader.releaseLock()
    return
  }

  const dataList = DECODER.decode(value).match(/data: \s*({.*?}]})/g)
  if (dataList) {
    dataList.forEach((v: any) => {
      const jsonStr = v.replace('data: ', '')
      const json = JSON.parse(jsonStr)
      appendLastMessageContent(json.choices[0].delta.content ?? '')
    })

    // await nextTick(() => {
    //   goToTheBottom();
    // });
  }

  await readStreamAndUpdateMessage(reader)
}

const sendMessageToAssistant = async (content: string = messageContent.value) => {
  try {
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
      const errorMessage = typeof response.message === 'string'
        ? response.message
        : '发生未知错误'
      appendLastMessageContent(errorMessage)
    }

    // Save chat records
    const serializedData = JSON.stringify(messageList.value)
    const parsedData = JSON.parse(serializedData)
    await chatManager.saveChatRecord(parsedData)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '请求失败，请重试'
    appendLastMessageContent(errorMessage)
    ElMessage({ message: errorMessage, type: 'error' })
  } finally {
    isTalking.value = false
    getFocus()
  }
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
}

const goToTheBottom = () => {
  const scroll = new SmoothScroll()
  const chatListElement = chatListDom.value
  if (chatListElement) {
    scroll.animateScroll(chatListElement.scrollHeight, chatListElement)
  }
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
    // goToTheBottom()
  }
}

const debouncedGoToTheBottom = debounce(goToTheBottom, 100)

// Watchers and lifecycle hooks
watch(messageList, () => {
  console.log('goToTheBottom()', messageList.value)
  nextTick(() => {
    debouncedGoToTheBottom()
  })
}, { deep: true, immediate: true })

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

const handleSaveSettings = (key: string, version: string) => {
  if (!key) {
    ElMessage({ message: '请输入API Key', type: 'warning' })
    return
  }
  setKey(key)
  GPT_V.value = version
  ElMessage({ message: '保存成功', type: 'success' })
  centerDialogVisible.value = false
}
</script>


<template>
  <div class='flex flex-col h-screen relative'>
    <Header @config="handleConfigClick" />
    <div class='flex-1 mt-16 content' ref='observedDiv'>
      <div class='mx-10 mt-6 mb-24' ref='chatListDom'>
        <div v-for="item of messageList.filter((v) => v.role !== 'system')" :key="item.content">
          <div class='font-bold mb-3 text-lg'>{{ roleAlias[item.role] }}：</div>
          <div class='text-base text-black whitespace-pre-wrap' v-show='item.content'
            v-html="markedRender(item.content.replace(/^\n\n/, ''))">
          </div>
          <Loading v-show='!item.content' />
        </div>
      </div>
    </div>
    <div class='flex flex-nowrap fixed w-full p-6 bgColor bottom-0 z-50'>
      <div class='flex items-center w-full'>
        <el-input class='input' :rows='1' type='textarea' ref='myInput' v-model='messageContent' size='large'
          @keydown.enter='sendMessageToAssistant()' :disabled='isTalking' style="--el-input-text-color: #000000" />
        <el-button @click='sendMessageToAssistant()' size='large' type='info' class='elBtnStyle text-5xl ml-5'>Send
        </el-button>
        <div class='triangle ml-4 cursor-pointer' @click='toDelete'>
          <DeleteFilled />
        </div>
        <div class='triangle ml-4 cursor-pointer' @click='goToTheBottom' v-if='!isMobile'>
          <img src='../../assets/3.svg' alt='ReturnToBottom' />
        </div>
      </div>
    </div>
  </div>
  <!-- 弹框设置 -->
  <SettingsDialog v-model="centerDialogVisible" :api-key="getKey()" :gpt-version="GPT_V" :gpt-version-list="GPT_VERSION"
    @save="handleSaveSettings" />
</template>
