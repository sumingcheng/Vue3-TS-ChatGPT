import { decryptString, encryptString } from '@/libs/encryp'

export const DECODER = new TextDecoder('utf-8')
// 封装 localStorage
export const Storage = {
  get(key: string): string | null {
    return decryptString(window.localStorage.getItem(key))
  },
  set(key: string, value: string): void {
    window.localStorage.setItem(key, encryptString(value))
  },
  remove(key: string): void {
    window.localStorage.removeItem(key)
  }
}

export const goGitHub = () => {
  window.open('https://github.com/sumingcheng/Vue3-TS-ChatGPT')
}

interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

export function sortModelsById(models: Model[]): Model[] {
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  })

  return models.sort((a, b) => collator.compare(a.id, b.id))
}
