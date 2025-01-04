<script setup lang="ts">
import Loading from '@/components/Loding.vue'
import { markedRender } from '@/libs/highlight'
import type { ChatMessage } from '@/types'
import { Service, UserFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, ref } from 'vue'

interface Props {
  messages: ChatMessage[]
  roleAlias: Record<string, string>
}

defineProps<Props>()

const chatListDom = ref<HTMLDivElement>()

// 缓存 markedRender 结果
const getRenderedContent = computed(() => (content: string) => {
  return markedRender(content.replace(/^\n\n/, ''))
})

defineExpose({
  chatListDom
})
</script>

<template>
  <div class="chat-container mx-6 mt-8 mb-24" ref="chatListDom">
    <div v-for="item of messages.filter((v) => v.role !== 'system')" :key="item.content"
      v-memo="[item.content, item.role]">
      <div class="message-wrapper" :class="{ 'flex-row-reverse': item.role === 'user' }">
        <div class="avatar-wrapper">
          <ElIcon :size="20" color="#000000">
            <UserFilled v-if="item.role === 'user'" />
            <Service v-else />
          </ElIcon>
        </div>
        <div class="message-content" :class="item.role">
          <div class="text-base whitespace-pre-wrap" v-show="item.content" v-html="getRenderedContent(item.content)">
          </div>
          <Loading v-show="!item.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  background-color: #ffffff;
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

.message-content {
  padding: 12px 14px;
  border-radius: 1.5rem;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

.message-content.user {
  background-color: #deedd7;
}

.message-content.assistant {
  background-color: #f9f9f9;
}

/* 保持代码块的样式 */
:deep(pre) {
  margin: 8px 0;
  padding: 12px;
  border-radius: 6px;
}

:deep(code) {
  font-family: Monaco, Consolas, Menlo, monospace;
}
</style>