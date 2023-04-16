import { decryptString, encryptString } from "@/libs/encryp";
import { response } from '@/hooks'


export const DECODER = new TextDecoder("utf-8")
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

// 版本
export function GPT_VERSION() {
    if (response.data && response.data.data.length > 0) {
        return response.data.data
    } else {
        return [
            {
                id: 'gpt-3.5-turbo',
                label: 'GPT-3.5',
            },
            {
                id: 'gpt-4',
                label: 'GPT-4',
            },
        ]
    }
}
