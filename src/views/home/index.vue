<script setup lang='ts'>
import basicModelList from '@/data/data.json'
import { initCopy, operationKey } from '@/hooks'
import { chat } from '@/libs/gpt'
import { DECODER, sortModelsById } from '@/libs/utils'
import type { ChatMessage } from '@/types'
import { ChatStorageManager, initMsg, isMobile } from '@/types'
import { useDebounceFn } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'
import SmoothScroll from 'smooth-scroll'
import ChatContent from './components/ChatContent.vue'
import ChatInput from './components/ChatInput.vue'
import Header from './components/Header.vue'
import SettingsDialog from './components/SettingsDialog.vue'

// Constants
const GPT_VERSION = sortModelsById(basicModelList)
const roleAlias = { user: 'ME', assistant: 'Magic Conch', system: 'System' }

// State Management
const chatManager = ChatStorageManager.getInstance()
const { getKey, setKey } = operationKey()
const messageList = ref<ChatMessage[]>(initMsg)
const GPT_V = ref('gpt-3.5-turbo')
const isTalking = ref(false)
const centerDialogVisible = ref(false)

// Component References
const chatContentRef = ref()
const chatInputRef = ref()

// MathJax Handling
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

const checkMathJax = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && window.MathJax) {
        handleMathjaxTypeset()
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// Message Handling Functions
const appendLastMessageContent = (content: string) => {
  messageList.value[messageList.value.length - 1].content += content
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
  }

  await readStreamAndUpdateMessage(reader)
}

const updateMessageListWithResponse = async (response: any) => {
  try {
    const reader = response.data.getReader()
    await readStreamAndUpdateMessage(reader)
  } catch (error) {
    console.error('Error updating message list:', error)
  }
}

// Chat Operations
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
      const errorMessage = response.error?.message || '发生未知错误'
      appendLastMessageContent(errorMessage)
      ElMessage({ message: errorMessage, type: 'error' })
    }

    const serializedData = JSON.stringify(messageList.value)
    const parsedData = JSON.parse(serializedData)
    await chatManager.saveChatRecord(parsedData)
  } catch (error: any) {
    const errorMessage = error.error?.message || error.message || '请求失败，请重试'
    appendLastMessageContent(errorMessage)
    ElMessage({ message: errorMessage, type: 'error' })
  } finally {
    isTalking.value = false
    chatInputRef.value?.getFocus()
  }
}

// UI Event Handlers
const handleConfigClick = () => {
  centerDialogVisible.value = true
}

const goToTheBottom = useDebounceFn(() => {
  const scroll = new SmoothScroll()
  const chatListElement = chatContentRef.value?.chatListDom
  if (chatListElement) {
    scroll.animateScroll(chatListElement.scrollHeight, chatListElement)
  }
}, 100)

const toDelete = () => {
  chatManager.deleteChatRecord().then(() => {
    console.log('Chat records deleted successfully!')
  })
  messageList.value = initMsg
}

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

// Initialization
const initializationRecord = async () => {
  const res = await chatManager.getChatRecord()
  if (res) {
    messageList.value = res
  }
}

// Lifecycle Hooks and Watchers
onMounted(() => {
  if (getKey() === '') {
    centerDialogVisible.value = true
  }
  chatInputRef.value?.getFocus()
  initializationRecord()
  checkMathJax()
  initCopy()
})

onUpdated(() => {
  nextTick(() => {
    initCopy()
  })
})

watch(messageList, () => {
  nextTick(() => {
    goToTheBottom()
  })
}, { deep: true })
</script>


<template>
  <div class='flex flex-col h-screen'>
    <Header @config="handleConfigClick" />
    <div class='flex-1 overflow-hidden mt-16' :class="{ 'mb-24': !isMobile, 'mb-10': isMobile }">
      <ChatContent ref="chatContentRef" :messages="messageList" :role-alias="roleAlias" :is-mobile="isMobile"
        @scroll-bottom="goToTheBottom" />
    </div>
    <ChatInput ref="chatInputRef" :is-talking="isTalking" :is-mobile="isMobile" @send="sendMessageToAssistant"
      @delete="toDelete" />
  </div>
  <SettingsDialog v-model="centerDialogVisible" :api-key="getKey()" :gpt-version="GPT_V" :gpt-version-list="GPT_VERSION"
    @save="handleSaveSettings" />
</template>
