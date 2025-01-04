<script setup lang="ts">
import Loading from '@/components/Loding.vue'
import { markedRender } from '@/libs/highlight'
import type { ChatMessage } from '@/types'
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
  <div class="mx-10 mt-6 mb-24" ref="chatListDom">
    <div v-for="item of messages.filter((v) => v.role !== 'system')" :key="item.content"
      v-memo="[item.content, item.role]">
      <div class="message-wrapper" :class="{ 'flex-row-reverse': item.role === 'user' }">
        <div class="message-content" :class="item.role">
          <div class="font-bold mb-3 text-lg">{{ roleAlias[item.role] }}：</div>
          <div class="text-base text-black whitespace-pre-wrap" v-show="item.content"
            v-html="getRenderedContent(item.content)">
          </div>
          <Loading v-show="!item.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

.message-content {
  max-width: 80%;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.message-content.user {
  background-color: #e3f2fd;
}

.message-content.assistant {
  background-color: #f5f5f5;
}

/* 保持代码块的样式 */
:deep(pre) {
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: #282a36 !important;
}

:deep(code) {
  font-family: Monaco, Consolas, Menlo, monospace;
}
</style>