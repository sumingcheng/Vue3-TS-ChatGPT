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
      <div class="font-bold mb-3 text-lg">{{ roleAlias[item.role] }}：</div>
      <div class="text-base text-black whitespace-pre-wrap" v-show="item.content"
        v-html="getRenderedContent(item.content)">
      </div>
      <Loading v-show="!item.content" />
    </div>
  </div>
</template>