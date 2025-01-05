<script setup lang="ts">
import { ElButton, ElDialog, ElInput, ElOption, ElSelect } from 'element-plus'
import { ref, watch } from 'vue'
import { isMobile } from '@/types'

interface Props {
  modelValue: boolean
  apiKey: string
  gptVersion: string
  gptVersionList: { id: string }[]
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: isMobile ? '90%' : '80%'
})

const emit = defineEmits(['update:modelValue', 'save'])

const localKey = ref(props.apiKey)
const localVersion = ref(props.gptVersion)

watch(() => props.modelValue, (val) => {
  if (val) {
    localKey.value = props.apiKey
    localVersion.value = props.gptVersion
  }
})
</script>

<template>
  <el-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :width="width" center>
    <div :class="{ 'p-6': !isMobile, 'p-3': isMobile }">
      <div :class="['flex items-center gap-4', { 'flex-col items-start': isMobile }]">
        <span class="font-bold whitespace-nowrap">API Key</span>
        <el-input v-model="localKey" placeholder="sk-xxxxxxxxxx" :size="isMobile ? 'default' : 'large'" clearable
          class="flex-1" :class="{ 'w-full': isMobile }" />
      </div>
      <div :class="['flex items-center gap-4 mt-5', { 'flex-col items-start': isMobile }]">
        <span class="font-bold whitespace-nowrap">Version</span>
        <el-select v-model="localVersion" :size="isMobile ? 'default' : 'large'" class="flex-1"
          :class="{ 'w-full': isMobile }">
          <el-option v-for="item in gptVersionList" :key="item.id" :label="item.id" :value="item.id" />
        </el-select>
      </div>
    </div>

    <template #footer>
      <div :class="[{ 'flex justify-center items-center gap-2': !isMobile, 'space-y-2': isMobile }]">
        <el-button @click="$emit('update:modelValue', false)" :size="isMobile ? 'default' : 'large'"
          :class="{ 'w-full mb-2': isMobile }">
          取消
        </el-button>
        <el-button type="primary" @click="emit('save', localKey, localVersion)" :size="isMobile ? 'default' : 'large'"
          class="!m-0" :class="{ 'w-full': isMobile }">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-dialog :deep(.el-button--primary) {
  --el-button-bg-color: var(--el-color-primary);
}
</style>