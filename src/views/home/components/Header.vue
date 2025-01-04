<script setup lang="ts">
import { isMobile } from '@/types'
import { goGitHub } from '@/libs/utils'
import { ElButton } from 'element-plus'
</script>

<template>
  <div class='flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bgColor z-50'>
    <div class='text-2xl font-bold text-white'>MagicConch</div>
    <div class='ml-4 text-sm text-white' v-if='!isMobile'>
      Magic conch based on ChatGPT
    </div>
    <div class='ml-4 my-auto cursor-pointer' @click='goGitHub' v-if='!isMobile'>
      <img loading="lazy" decoding="async"
        src='https://img.shields.io/github/stars/sumingcheng/Vue3-TS-ChatGPT?logo=github' alt='GitHub'>
    </div>
    <div class='ml-auto text-sm cursor-pointer' @click="$emit('config')">
      <el-button size='large' type='info' class='elBtnStyle text-4xl'>Settings</el-button>
    </div>
  </div>
</template>