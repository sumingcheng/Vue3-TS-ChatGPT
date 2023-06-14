<script setup lang="ts">
import type {ChatMessage} from "@/types"
import Loading from "@/components/Loding.vue"
import {nextTick, onMounted, ref, watch} from "vue"
import {chat} from "@/libs/gpt"
import {operationKey} from "@/hooks"
import {ElMessage} from "element-plus"
import {DECODER} from "@/libs/utils"
import GPT_VERSION from '@/data/data.json'
// 代码块高亮
import {markedRender} from "@/libs/highlight"
// 获取 input
const myInput = ref<HTMLInputElement | null>(null)
// 是否显示loading
const centerDialogVisible = ref(false)
const chatListDom = ref<HTMLDivElement>()


// 角色
const roleAlias = {user: "ME", assistant: "Magic Conch", system: "System"}

// 消息列表
const messageList = ref<ChatMessage[]>([
  {
    role: "system",
    content: "You are ChatGPT, Please answer my questions in a simple, easy-to-understand, and detailed manner. Please prioritize Chinese answers and provide straightforward examples when answering questions as much as possible.",
  },
  {
    role: "assistant",
    content: `
    你好，我是神奇海螺，欢迎提问
    `,
  }
])
// GPT版本
const GPT_V = ref("gpt-3.5-turbo")

// 是否显示配置
let isConfig = ref(true)
// 是否在聊天
let isTalking = ref(false)
let messageContent = ref("")
let Key = ref("")

// localstorage key
const {getKey, setKey} = operationKey()


// 钩子
onMounted(() => {
  if (getKey()) {
    switchConfigStatus()
  }
  getFocus()
})

// 保存 key
const saveApiKey = () => {
  if (Key.value.slice(0, 3) !== "sk-" || Key.value.length !== 51) {
    ElMessage({
      message: '请填写 Key', type: 'warning',
    })
  } else {
    setKey(Key.value)
    ElMessage({
      message: 'Key 设置成功', type: 'success',
    })
    centerDialogVisible.value = false
  }
}

// 发送消息
const sendChatMessage = async (content: string = messageContent.value) => {
  // 禁止发送
  isTalking.value = true
  // 滚动到底部开关
  if (messageList.value.length === 2) {
    messageList.value.pop()
  }

  messageList.value.push({role: "user", content})
  clearMessageContent()

  messageList.value.push({role: "assistant", content: ""})
  // 调用接口 获取数据
  const {status, data, message} = await chat(messageList.value, getKey(), GPT_V.value)

  if (status === "success" && data) {
    const reader = data.getReader()
    await readStream(reader)
  } else {
    appendLastMessageContent(message)
  }
  // 继续发送
  isTalking.value = false
  // 自动聚焦
  getFocus()
}

// 聚焦 myInput
const getFocus = () => {
  nextTick(() => {
    if (myInput.value) {
      myInput.value.focus()
    }
  })
}

// 读取Stream
const readStream = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
  const {done, value} = await reader.read()
  if (done) {
    reader.closed
    return
  }
  const dataList = DECODER.decode(value).match(/data: \s*({.*?}]})/g)
  dataList?.forEach((v: any) => {
    // 移除 "data: "，然后再解析 JSON
    const jsonStr = v.replace('data: ', '')
    const json = JSON.parse(jsonStr)
    appendLastMessageContent(json.choices[0].delta.content ?? "")
  })
  await readStream(reader)
}

const appendLastMessageContent = (content: string) =>
    (messageList.value[messageList.value.length - 1].content += content)

//  发送消息
const sendMessage = () => {
  if (getKey().length === 51) {
    // 发送数据
    sendChatMessage()
  } else {
    ElMessage({
      message: '您好像没有填写Key', type: 'warning',
    })
  }
}

// 设置
const clickConfig = () => {
  console.log(!isConfig.value)
  if (!isConfig.value) {
    Key.value = getKey()
    centerDialogVisible.value = true
  } else {
    clearMessageContent()
  }

  centerDialogVisible.value = true
}

const switchConfigStatus = () => (isConfig.value = !isConfig.value)

const clearMessageContent = () => (messageContent.value = "")


// 监听值改变
watch(messageList.value, () => nextTick(() => scrollToBottom()))

// 滚动到底部
const scrollToBottom = () => {
  if (!chatListDom.value) {
    return
  } else {
    scrollTo(0, chatListDom.value.scrollHeight)
  }
}

</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- 顶部 -->
    <div class="flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bgColor">
      <div class="text-2xl font-bold text-white">神奇海螺</div>
      <div class="ml-4 text-sm text-white">
        可以呼唤神奇海螺，神奇海螺会帮你解决问题
      </div>
      <div class="ml-auto text-sm cursor-pointer" @click="clickConfig">
        <el-button size="large" type="info" class="elBtnStyle text-5xl">设置</el-button>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex-1 mt-16 content">
      <div class="m-6" ref="chatListDom">
        <div v-for="item of messageList.filter((v) => v.role !== 'system')">
          <div class="font-bold mb-3 text-lg">{{ roleAlias[item.role] }}：</div>
          <div class="text-base text-black whitespace-pre-wrap" v-if="item.content"
               v-html="markedRender(item.content.replace(/^\n\n/, ''))">
          </div>
          <Loading v-else/>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="sticky w-full p-6 bgColor pb-6">
      <div class="flex items-center">
        <el-input class="input" :rows="1" type="textarea" ref="myInput" v-model="messageContent" size="large"
                  @keydown.enter="sendMessage()" :disabled="isTalking"/>
        <!--发送-->
        <el-button @click="sendMessage()" size="large" type="info" class="elBtnStyle text-5xl ml-5">发送
        </el-button>
      </div>
    </div>
  </div>
  <!-- 设置 -->
  <el-dialog v-model="centerDialogVisible" title="神奇海螺 设置" width="80%" center>
    <div class="bottom-0 w-full p-6 pb-8">
      <div class="flex items-center">
        <span class="w-1/6 font-bold">API Key</span>
        <el-input placeholder="sk-xxxxxxxxxx" v-model="Key" size="large" clearable/>
      </div>
      <div class="flex items-center mt-5">
        <span class="w-1/6 font-bold">版本</span>
        <el-select size="large" class="w-full" v-model="GPT_V">
          <el-option v-for="item in GPT_VERSION" :key="item.id" :label="item.id" :value="item.id"/>
        </el-select>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveApiKey">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

