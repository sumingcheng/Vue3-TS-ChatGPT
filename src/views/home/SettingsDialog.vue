<script setup lang="ts">
import { ElButton, ElDialog, ElInput, ElOption, ElSelect } from 'element-plus'
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean
  apiKey: string
  gptVersion: string
  gptVersionList: { id: string }[]
  width?: string
  cancelText?: string
  confirmText?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '80%',
  cancelText: 'Close',
  confirmText: 'Preserve'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', key: string, version: string): void
}>()

const localKey = ref(props.apiKey)
const localVersion = ref(props.gptVersion)

watch(() => props.modelValue, (val) => {
  if (val) {
    localKey.value = props.apiKey
    localVersion.value = props.gptVersion
  }
})

const handleClose = () => {
  emit('update:modelValue', false)
}

const handleSave = () => {
  emit('save', localKey.value, localVersion.value)
}
</script>

<template>
  <el-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" title="Settings"
    :width="width" center @close="handleClose">
    <div class="bottom-0 w-full p-6 pb-8">
      <div class="flex items-center">
        <span class="w-1/6 font-bold">API Key</span>
        <el-input placeholder="sk-xxxxxxxxxx" v-model="localKey" size="large" clearable />
      </div>
      <div class="flex items-center mt-5">
        <span class="w-1/6 font-bold">Version</span>
        <el-select size="large" class="w-full" v-model="localVersion">
          <el-option v-for="item in gptVersionList" :key="item.id" :label="item.id" :value="item.id" />
        </el-select>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="handleClose">{{ cancelText }}</el-button>
        <el-button type="primary" @click="handleSave" class="fix-primary">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.fix-primary {
  --el-button-bg-color: var(--el-color-primary) !important;
}
</style>