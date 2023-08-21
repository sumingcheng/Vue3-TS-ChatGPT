import axios from 'axios'
import { decryptString } from '@/libs/encryp'

const OPENAI_API_KEY = decryptString(window.localStorage.getItem('apiKey'))
const ORGANIZATION_ID = 'org-u5wdMv1QbV0Xc1qIJk9l7djp'

const headers = {
  Authorization: `Bearer ${OPENAI_API_KEY}`,
  'OpenAI-Organization': ORGANIZATION_ID
}

const url = 'https://api.openai.com/v1/models'

export async function fetchModels() {
  return await axios({
    url,
    method: 'GET',
    headers
  }).then((response) => {
    console.log(response.data)
    // 保存数据到data
    downloadJSON(response.data, 'models.json')
  }).catch((error) => {
    console.error(error)
  })
}

function downloadJSON(data: any, filename: any) {
  let jsonStr = JSON.stringify(data, null, 2)
  let blob = new Blob([jsonStr], { type: 'application/json' })
  let url = URL.createObjectURL(blob)

  let a = document.createElement('a')
  a.download = filename
  a.href = url
  a.click()
}
