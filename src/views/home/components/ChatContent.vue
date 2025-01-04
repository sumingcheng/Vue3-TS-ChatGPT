<script setup lang="ts">
import Loading from '@/components/Loding.vue'
import { markedRender } from '@/libs/highlight'
import type { ChatMessage } from '@/types'
import { Service, UserFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface Props {
  messages: ChatMessage[]
  roleAlias: Record<string, string>
  isMobile: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['scroll-bottom'])

const chatListDom = ref<HTMLDivElement>()
const showScrollButton = ref(false)

// 监听滚动
const handleScroll = () => {
  if (!chatListDom.value) return
  const { scrollTop, scrollHeight, clientHeight } = chatListDom.value
  // 当距离底部超过200px时显示按钮
  showScrollButton.value = scrollHeight - (scrollTop + clientHeight) > 200
}

// 滚动到底部
const scrollToBottom = () => {
  if (!chatListDom.value) return
  chatListDom.value.scrollTop = chatListDom.value.scrollHeight
  showScrollButton.value = false
}

onMounted(() => {
  chatListDom.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  chatListDom.value?.removeEventListener('scroll', handleScroll)
})

// 缓存 markedRender 结果
const getRenderedContent = computed(() => (content: string) => {
  return markedRender(content.replace(/^\n\n/, ''))
})

defineExpose({
  chatListDom,
  scrollToBottom
})
</script>

<template>
  <div class="chat-container h-full overflow-y-auto" :class="{ 'mx-2 my-2': isMobile, 'mx-4 my-2': !isMobile }"
    ref="chatListDom">
    <div v-for="item of messages.filter((v) => v.role !== 'system')" :key="item.content"
      v-memo="[item.content, item.role]">
      <div class="message-wrapper" :class="{ 'flex-row-reverse': item.role === 'user' }">
        <div class="avatar-wrapper" :class="{ 'mobile-avatar': isMobile }">
          <ElIcon :size="isMobile ? 16 : 20" color="#000000">
            <UserFilled v-if="item.role === 'user'" />
            <Service v-else />
          </ElIcon>
        </div>
        <div class="message-content" :class="[item.role, { 'mobile-message': isMobile }]">
          <div class="text-base whitespace-pre-wrap break-words" v-show="item.content"
            v-html="getRenderedContent(item.content)">
          </div>
          <Loading v-show="!item.content" />
        </div>
      </div>
    </div>

    <!-- 向下滚动按钮 -->
    <Transition name="fade">
      <div v-if="showScrollButton"
        class="fixed right-6 bottom-32 cursor-pointer bg-black rounded-full shadow-lg hover:bg-opacity-80 transition-all"
        :class="{ 'right-3 bottom-24': isMobile }" @click="scrollToBottom">
        <div class="bg-black rounded-full p-2">
          <img src='../../../assets/3.svg' alt='ReturnToBottom' class="w-5 h-5" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.chat-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.message-wrapper {
  display: flex;
  margin-bottom: 16px;
  gap: 8px;
  align-items: flex-start;
}

.avatar-wrapper {
  padding: 6px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 32px;
  height: 32px;
}

.mobile-avatar {
  min-width: 28px;
  height: 28px;
  padding: 4px;
}

.message-content {
  padding: 12px 14px;
  border-radius: 1.5rem;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
  max-width: 85%;
}

.message-content.user {
  background-color: #deedd7;
}

.message-content.assistant {
  background-color: #f9f9f9;
}

.mobile-message {
  padding: 8px 12px;
  font-size: 13px;
  max-width: 80%;
}

:deep(pre) {
  margin: 8px 0;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

.mobile-message :deep(pre) {
  padding: 8px;
  font-size: 12px;
}
</style>