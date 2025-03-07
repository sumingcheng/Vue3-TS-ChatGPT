import axios from 'axios'
import { decryptString } from '@/libs/encryp'

export async function fetchModels() {
  const OPENAI_API_KEY = decryptString(window.localStorage.getItem('apiKey'))
  try {
    const response = await axios({
      url: 'https://api.openai.com/v1/models',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Organization': 'org-u5wdMv1QbV0Xc1qIJk9l7djp'
      }
    })
    const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = 'models.json'
    a.href = url
    a.click()
  } catch (error) {
    console.error(error)
  }
}
