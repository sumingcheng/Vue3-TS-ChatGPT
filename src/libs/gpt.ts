import type { ChatMessage } from '@/types'

export async function chat(messageList: ChatMessage[], apiKey: string, GPT_VERSION: string) {
  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
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
    return { status: 'success', data: result.body }
  } catch (error) {
    return { status: 'error', message: error instanceof Error ? error.message : '未知错误' }
  }
}
