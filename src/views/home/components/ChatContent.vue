<script setup lang="ts">
import Loading from '@/components/Loding.vue'
import { markedRender } from '@/libs/highlight'
import type { ChatMessage } from '@/types'
import { ref } from 'vue'

interface Props {
  messages: ChatMessage[]
  roleAlias: Record<string, string>
}

defineProps<Props>()

const chatListDom = ref<HTMLDivElement>()

defineExpose({
  chatListDom
})
</script>

<template>
  <div class="mx-10 mt-6 mb-24" ref="chatListDom">
    <div v-for="item of messages.filter((v) => v.role !== 'system')" :key="item.content">
      <div class="font-bold mb-3 text-lg">{{ roleAlias[item.role] }}：</div>
      <div class="text-base text-black whitespace-pre-wrap" v-show="item.content"
        v-html="markedRender(item.content.replace(/^\n\n/, ''))">
      </div>
      <Loading v-show="!item.content" />
    </div>
  </div>
</template>