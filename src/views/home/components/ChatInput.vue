<script setup lang="ts">
import { DeleteFilled } from '@element-plus/icons-vue'
import { ElButton, ElInput } from 'element-plus'
import { ref } from 'vue'

interface Props {
  isTalking: boolean
  isMobile: boolean
}

defineProps<Props>()

const emit = defineEmits(['send', 'delete', 'scroll-bottom'])

const myInput = ref<HTMLInputElement | null>(null)
const messageContent = ref('')

const handleSend = (e?: Event) => {
  if (e) e.preventDefault()

  if (!messageContent.value.trim()) return

  emit('send', messageContent.value)
  messageContent.value = ''
}

const getFocus = () => {
  myInput.value?.focus()
}

const clearContent = () => {
  messageContent.value = ''
}

defineExpose({
  getFocus,
  clearContent,
  myInput
})
</script>

<template>
  <div class='flex flex-nowrap fixed w-full p-6 bgColor bottom-0 z-50'>
    <div class='flex items-center w-full'>
      <el-input class='input' :rows='1' type='textarea' ref='myInput' v-model='messageContent' size='large'
        :disabled='isTalking' @keydown.enter='handleSend' style="--el-input-text-color: #000000" />
      <el-button @click='handleSend' size='large' type='info' class='elBtnStyle text-5xl ml-5'>
        Send
      </el-button>
      <div class='triangle ml-4 cursor-pointer' @click="emit('delete')">
        <DeleteFilled />
      </div>
      <div v-if='!isMobile' class='triangle ml-4 cursor-pointer' @click="emit('scroll-bottom')">
        <img src='../../../assets/3.svg' alt='ReturnToBottom' />
      </div>
    </div>
  </div>
</template>