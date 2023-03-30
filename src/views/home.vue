<script setup lang="ts">
import type { ChatMessage } from "@/types"
import { nextTick, onMounted, ref, watch } from "vue"
import { chat } from "@/libs/gpt"
import Loading from "@/components/Loding.vue"
import { ElMessage } from "element-plus"
import { operationKey } from "@/hooks"
import { GPT_VERSION } from "@/libs/utils"
// 代码块高亮
import hljs from '@/libs/highlight';
import { marked } from 'marked';

// 配置 marked
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
  // 其他配置
});

// 触发渲染
const markedRender = (val: any) => {
  return marked(val);
};

// 获取 input
const myInput = ref<HTMLInputElement | null>(null)
// 是否显示配置
let isConfig = ref(true)
// 是否在聊天
let isTalking = ref(false)
let messageContent = ref("")
let Key = ref("")
// 是否显示loading
const centerDialogVisible = ref(false)

// GPT版本
let GPT_V = ref("gpt-3.5-turbo")
const chatListDom = ref<HTMLDivElement>()
const decoder = new TextDecoder("utf-8")
// 角色
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" }
// localstorage key
const { getKey, setKey } = operationKey()
// 消息列表
const messageList = ref<ChatMessage[]>([
  {
    role: "system",
    content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能Authentic, concise,accurate的回答问题。",
  },
  {
    role: "assistant",
    content: `
    你好，我是ChatGPT，您的中文人工智能引擎，您可以问我任何问题例如：
    1. 翻译：我可以把中文翻译任何语言等。
    2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。
    3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。`,
  },
])
// 钩子
onMounted(() => {
  if (getKey()) {
    switchConfigStatus()
  }
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
  isTalking.value = true

  if (messageList.value.length === 2) {
    messageList.value.pop()
  }

  messageList.value.push({ role: "user", content })
  clearMessageContent()

  messageList.value.push({ role: "assistant", content: "" })
  // 调用接口 获取数据
  const { status, data, message } = await chat(messageList.value, getKey(), GPT_V.value)

  if (status === "success" && data) {
    const reader = data.getReader()
    await readStream(reader)
  } else {
    appendLastMessageContent(message)
  }

  isTalking.value = false
  getFocus()
}

// 聚焦myInput
const getFocus = () => {
  nextTick(() => {
    if (myInput.value) {
      myInput.value.focus()
    }
  })
}

// 读取Stream
const readStream = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
  const { done, value } = await reader.read()
  if (done) {
    reader.closed
    return
  }
  const dataList = decoder.decode(value).match(/(?<=data: )\s*({.*?}]})/g)
  dataList?.forEach((v: any) => {
    const json = JSON.parse(v)
    appendLastMessageContent(json.choices[0].delta.content ?? "")
  })
  await readStream(reader)
}

const appendLastMessageContent = (content: string) =>
    (messageList.value[messageList.value.length - 1].content += content)


const sendOrSave = () => {
  // if (!messageContent.value.length) return
  if (getKey()) {
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


// 值改变，滚动到底部
watch(messageList.value, () => nextTick(() => scrollToBottom()))

const scrollToBottom = () => {
  if (!chatListDom.value) return
  scrollTo(0, chatListDom.value.scrollHeight)
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
    <div class="flex-1 mt-16">
      <div class="m-6" ref="chatListDom">
        <div v-for="item of messageList.filter((v) => v.role !== 'system')">
          <div class="font-bold mb-3 text-lg">{{ roleAlias[item.role] }}：</div>
          <div class="text-base text-black whitespace-pre-wrap"
              v-if="item.content" v-html="markedRender(item.content.replace(/^\n\n/, ''))">
          </div>
          <Loading v-else/>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="sticky bottom-0 w-full p-6 pb-8 bgColor">
      <div class="flex">
        <el-input class="input" ref="myInput" placeholder="请输入" v-model="messageContent" size="large"
            @keydown.enter="sendOrSave()" :disabled="isTalking"/>
      </div>
    </div>
  </div>
  <!-- 设置 -->
  <el-dialog v-model="centerDialogVisible" title="ChatGPT 设置" width="40%" center>
    <div class="bottom-0 w-full p-6 pb-8">
      <div class="flex items-center">
        <span class="w-1/6 font-bold">API Key</span>
        <el-input placeholder="sk-xxxxxxxxxx" v-model="Key" size="large" clearable/>
      </div>
      <div class="flex items-center mt-5">
        <span class="w-1/6 font-bold">GPT 版本</span>
        <el-select size="large" class="w-full" v-model="GPT_V">
          <el-option v-for="item in GPT_VERSION" :key="item.value" :label="item.label" :value="item.value"/>
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

