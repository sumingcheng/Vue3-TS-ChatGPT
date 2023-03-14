<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { operationKey } from "@/hooks";
import { ElMessage } from "element-plus";
import { postGPT } from "@/libs/api";
import Loading from "@/components/Loding.vue";


const centerDialogVisible = ref(false)
const chatListDom = ref<HTMLDivElement>();
let isConfig = ref(true);
let Key = ref("");
let content = ref("");
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
const decoder = new TextDecoder("utf-8");

const messageList = ref([ {
  message: {
    content: "您好，有什么我可以帮您的吗？"
  }
} ]);

const { getKey, setKey } = operationKey()

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
  }
}

onMounted(() => {
  if (!getKey()) {
    centerDialogVisible.value = true
  }
})

const clickConfig = () => {
  Key.value = getKey()
  centerDialogVisible.value = true
}

const empty = () => {
  Key.value = ""
}

const sendMessage = async () => {
  let data = content.value
  messageList.value = [];
  content.value = "";
  if (data) {
    try {
      const res: any = await postGPT({
        role: "user",
        content: data,
      })
      messageList.value = res.choices
      console.log(res.choices)
    } catch (error) {
      ElMessage({
        message: '请求错误，尝试更换节点', type: 'warning',
      })
    }
  } else {
    ElMessage({
      message: '请输入消息', type: 'warning',
    })
  }
}

// 监听高度滚动
watch(messageList.value, () => nextTick(() => scrollToBottom()));
const scrollToBottom = () => {
  if (!chatListDom.value) return;
  scrollTo(0, chatListDom.value.scrollHeight);
};

</script>

<template>
  <div class="flex flex-col h-screen">
    <!--顶部-->
    <div class="flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bgColor">
      <div class="text-2xl font-bold ">ChatGPT</div>
      <div class="ml-4 text-sm bgColor">
        一个基于OpenAI技术的大型语言模型，能够自动理解和生成自然语言文本
      </div>
      <div class="ml-4 text-sm bgColor">
        {{ content }}
      </div>
      <div class="ml-auto text-sm cursor-pointer" @click="clickConfig">
        <el-button size="large" type="info" class="elBtnStyle text-5xl">设置</el-button>
      </div>
    </div>
    <!--内容-->
    <div class="flex-1 mt-16">
      <div class="m-6 mb-2" ref="chatListDom">
        <Loading v-show="!messageList.length>0"/>
        <div
            class="mb-6"
            v-for="item in messageList"
            key=""
        >
          <div class="font-bold mb-3">ChatGPT</div>
          <pre class="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed font-bold">
           <code>{{ item.message.content.replace(/^\n\n/, '') }}</code>
          </pre>
        </div>
      </div>
    </div>
    <!--底部-->
    <div class="flex flex-nowrap fixed w-full items-baseline bottom-0 px-6 py-4 bgColor">
      <div class="mx-2 text-sm bgColor w-full">
        <el-input placeholder="请输入内容" v-model="content" size="large" @keydown.enter="sendMessage"/>
      </div>
    </div>
    <!--设置 弹出层-->
    <el-dialog v-model="centerDialogVisible" title="请输入 API Key" width="40%" center>
      <div class="bottom-0 w-full p-6 pb-8">
        <div class="flex items-center">
          <span class="w-1/6 font-bold">API Key</span>
          <el-input placeholder="sk-xxxxxxxxxx" v-model="Key" size="large"/>
          <el-button type="primary" @click="empty" class="ml-2">清空</el-button>
        </div>
      </div>
      <template #footer>
      <span>
        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveApiKey">保存</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
