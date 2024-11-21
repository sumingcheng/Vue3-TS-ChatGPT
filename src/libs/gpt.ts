import type { ChatMessage } from '@/types'

export async function chat(messageList: ChatMessage[], apiKey: string, GPT_VERSION: string) {
  try {
    const baseURL = import.meta.env.DEV
      ? '/api/v1/chat/completions' // 开发环境使用代理
      : 'https://api.openai.com/v1/chat/completions' // 生产环境直接请求
    console.log('baseURL', baseURL)

    const result = await fetch(baseURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: GPT_VERSION,
        stream: true,
        messages: messageList
      })
    })

    return {
      status: 'success',
      data: result.body
    }
  } catch (error: any) {
    return {
      status: 'error',
      message: error
    }
  }
}
