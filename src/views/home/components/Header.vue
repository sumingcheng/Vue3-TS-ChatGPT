<script setup lang="ts">
import { isMobile } from '@/types'
import { goGitHub } from '@/libs/utils'
import { ElButton } from 'element-plus'
</script>

<template>
  <div class='flex flex-nowrap fixed w-full items-center top-0 bgColor z-50 h-16'
    :class="{ 'px-6': !isMobile, 'px-3': isMobile }">
    <div class='font-bold text-white' :class="{ 'text-2xl': !isMobile, 'text-xl': isMobile }">MagicConch</div>
    <div class='ml-4 text-sm text-white' v-if='!isMobile'>
      Magic conch based on ChatGPT
    </div>
    <div class='ml-4 my-auto cursor-pointer' @click='goGitHub' v-if='!isMobile'>
      <img loading="lazy" decoding="async"
        src='https://img.shields.io/github/stars/sumingcheng/Vue3-TS-ChatGPT?logo=github' alt='GitHub'>
    </div>
    <div class='ml-auto text-sm cursor-pointer' @click="$emit('config')">
      <el-button :size="isMobile ? 'default' : 'large'" type='info' class='elBtnStyle'
        :class="{ 'text-4xl': !isMobile, 'text-3xl': isMobile }">Set</el-button>
    </div>
  </div>
</template>