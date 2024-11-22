<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog, ElButton, ElInput, ElSelect, ElOption } from 'element-plus'

interface Props {
  visible: boolean
  apiKey: string
  gptVersion: string
  gptVersionList: any[]
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'save', key: string, version: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localKey = ref(props.apiKey)
const localVersion = ref(props.gptVersion)

const handleClose = () => {
  emit('update:visible', false)
}

const handleSave = () => {
  emit('save', localKey.value, localVersion.value)
}
</script>

<template>
  <el-dialog v-model="visible" title="Settings" width="80%" center @update:visible="handleClose">
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
        <el-button @click="handleClose">Close</el-button>
        <el-button type="primary" @click="handleSave" class="fix-primary">Preserve</el-button>
      </span>
    </template>
  </el-dialog>
</template> 