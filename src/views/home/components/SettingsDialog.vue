<script setup lang="ts">
import { ElButton, ElDialog, ElInput, ElOption, ElSelect } from 'element-plus'
import { ref, watch } from 'vue'

interface Props {
  modelValue: boolean
  apiKey: string
  gptVersion: string
  gptVersionList: { id: string }[]
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '80%'
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
  <el-dialog v-model="modelValue" title="Settings" :width="width" center>
    <div class="p-6">
      <div class="flex items-center">
        <span class="w-24 font-bold">API Key</span>
        <el-input placeholder="sk-xxxxxxxxxx" v-model="localKey" size="large" clearable />
      </div>
      <div class="flex items-center mt-5">
        <span class="w-24 font-bold">Version</span>
        <el-select size="large" class="w-full" v-model="localVersion">
          <el-option v-for="item in gptVersionList" :key="item.id" :label="item.id" :value="item.id" />
        </el-select>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="emit('update:modelValue', false)">取消</el-button>
        <el-button type="primary" @click="emit('save', localKey, localVersion)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-dialog :deep(.el-button--primary) {
  --el-button-bg-color: var(--el-color-primary);
}
</style>