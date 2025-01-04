<script setup lang='ts'>
import basicModelList from '@/data/data.json'
import { initCopy, operationKey } from '@/hooks'
import { chat } from '@/libs/gpt'
import { DECODER, sortModelsById } from '@/libs/utils'
import type { ChatMessage } from '@/types'
import { ChatStorageManager, initMsg, isMobile } from '@/types'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'
import SmoothScroll from 'smooth-scroll'
import ChatContent from './components/ChatContent.vue'
import ChatInput from './components/ChatInput.vue'
import Header from './components/Header.vue'
import SettingsDialog from './components/SettingsDialog.vue'

const GPT_VERSION = sortModelsById(basicModelList)

// Initialization
const chatManager = ChatStorageManager.getInstance()
const { getKey, setKey } = operationKey()
const roleAlias = { user: 'ME', assistant: 'Magic Conch', system: 'System' }
const messageList = ref<ChatMessage[]>(initMsg)
const GPT_V = ref('gpt-3.5-turbo')
let isTalking = ref(false)

// References
const chatContentRef = ref()
const chatInputRef = ref()
const centerDialogVisible = ref(false)

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

const sendMessageToAssistant = async (content: string) => {
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

    const serializedData = JSON.stringify(messageList.value)
    const parsedData = JSON.parse(serializedData)
    await chatManager.saveChatRecord(parsedData)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '请求失败，请重试'
    appendLastMessageContent(errorMessage)
    ElMessage({ message: errorMessage, type: 'error' })
  } finally {
    isTalking.value = false
    chatInputRef.value?.getFocus()
  }
}

// UI handling
const handleConfigClick = () => {
  centerDialogVisible.value = true
}

const goToTheBottom = () => {
  const scroll = new SmoothScroll()
  const chatListElement = chatContentRef.value?.chatListDom
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
  chatInputRef.value?.getFocus()
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
      <ChatContent ref="chatContentRef" :messages="messageList" :role-alias="roleAlias" />
    </div>
    <ChatInput ref="chatInputRef" :is-talking="isTalking" :is-mobile="isMobile" @send="sendMessageToAssistant"
      @delete="toDelete" @scroll-bottom="goToTheBottom" />
  </div>
  <SettingsDialog v-model="centerDialogVisible" :api-key="getKey()" :gpt-version="GPT_V" :gpt-version-list="GPT_VERSION"
    @save="handleSaveSettings" />
</template>
