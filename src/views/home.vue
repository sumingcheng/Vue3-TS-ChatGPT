<script setup lang='ts'>
import type { ChatMessage } from '@/types'
import { isMobile, initMsg } from '@/types'
import Loading from '@/components/Loding.vue'
import { nextTick, onMounted, onUpdated, ref, watch, watchEffect } from 'vue'
import { chat } from '@/libs/gpt'
import { initCopy, operationKey, scrollToBottom } from '@/hooks'
import { ElButton, ElInput, ElMessage, ElDialog, ElSelect, ElOption } from 'element-plus'
import { DECODER } from '@/libs/utils'
import { markedRender } from '@/libs/highlight'
import GPT_VERSION from '@/data/data.json'

const { getKey, setKey } = operationKey()

const myInput = ref<HTMLInputElement | null>(null)
const centerDialogVisible = ref(false)
const chatListDom = ref<HTMLDivElement>()
const roleAlias = { user: 'ME', assistant: 'Magic Conch', system: 'System' }
const messageList = ref<ChatMessage[]>(initMsg)

const GPT_V = ref('gpt-3.5-turbo')
let isTalking = ref(false)
let messageContent = ref('')
let Key = ref('')
const isScrolling = ref(false)

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
  const reader = response.data.getReader()
  await readStreamAndUpdateMessage(reader)
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
}

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

const goGitHub = () => {
  window.open('https://github.com/sumingcheng/Vue3-TS-ChatGPT')
}

const goToTheBottom = () => {
  scrollToBottom(chatListDom.value)
}

const toRefresh = () => {
  window.location.reload()
}

const toDelete = () => {
  messageList.value = initMsg
}

watch(messageList.value, () => {
  nextTick(() => {
    if (!isScrolling.value) {
      scrollToBottom(chatListDom.value)
    }
  })
})

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
  checkMathJax()
  initCopy()
})


</script>

<template>
  <div class='flex flex-col h-screen relative'>
    <div class='flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bgColor z-50'>
      <div class='text-2xl font-bold text-white'>神奇海螺</div>
      <div class='ml-4 text-sm text-white' v-if='!isMobile'>
        可以呼唤神奇海螺，神奇海螺会帮你解决问题
      </div>
      <div class='ml-4 my-auto cursor-pointer' @click='goGitHub' v-if='!isMobile'>
        <img loading='lazy' src='https://img.shields.io/github/stars/sumingcheng/Vue3-TS-ChatGPT?logo=github' alt='GitHub'>
      </div>
      <div class='ml-auto text-sm cursor-pointer' @click='handleConfigClick'>
        <el-button size='large' type='info' class='elBtnStyle text-4xl'>设置</el-button>
      </div>
    </div>
    <div class='flex-1 mt-16 content' ref='observedDiv'>
      <div class='m-6' ref='chatListDom'>
        <div v-for="item of messageList.filter((v) => v.role !== 'system')">
          <div class='font-bold mb-3 text-lg'>{{ roleAlias[item.role] }}：</div>
          <div class='text-base text-black whitespace-pre-wrap' v-if='item.content' v-html="markedRender(item.content.replace(/^\n\n/, ''))">
          </div>
          <Loading v-else />
        </div>
      </div>
    </div>
    <div class='sticky w-full p-6 bgColor bottom-0'>
      <div class='flex items-center'>
        <el-input class='input' :rows='1' type='textarea' ref='myInput' v-model='messageContent' size='large'
                  @keydown.enter='sendMessageToAssistant()' :disabled='isTalking' />
        <el-button @click='sendMessageToAssistant()' size='large' type='info' class='elBtnStyle text-5xl ml-5'>发送</el-button>
        <div class='triangle ml-4 cursor-pointer' @click='goToTheBottom' v-if='!isMobile'>
          <img src='@/assets/3.svg' alt='返回底部' />
        </div>
        <div class='triangle ml-4 cursor-pointer' @click='toRefresh'>
          <RefreshRight />
        </div>
        <div class='triangle ml-4 cursor-pointer' @click='toDelete'>
          <DeleteFilled />
        </div>
      </div>
    </div>
  </div>
  <!-- 弹框设置 -->
  <el-dialog v-model='centerDialogVisible' title='设置' width='80%' center>
    <div class='bottom-0 w-full p-6 pb-8'>
      <div class='flex items-center'>
        <span class='w-1/6 font-bold'>API Key</span>
        <el-input placeholder='sk-xxxxxxxxxx' v-model='Key' size='large' clearable />
      </div>
      <div class='flex items-center mt-5'>
        <span class='w-1/6 font-bold'>版本</span>
        <el-select size='large' class='w-full' v-model='GPT_V'>
          <el-option v-for='item in GPT_VERSION' :key='item.id' :label='item.id' :value='item.id' />
        </el-select>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click='centerDialogVisible = false'>关闭</el-button>
        <el-button type='primary' @click='saveApiKey' class='fix-primary'>保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
