import { decryptString, encryptString } from "@/libs/encryp";


export const DECODER = new TextDecoder("utf-8")

// 封装 localStorage
export const Storage = {
    get(key: string): string | null {
        return decryptString(localStorage.getItem(key))
    },
    set(key: string, value: string): void {
        localStorage.setItem(key, encryptString(value))
    },
    remove(key: string): void {
        localStorage.removeItem(key)
    }
}

// 版本
export const GPT_VERSION = [
    {
        value: 'gpt-3.5-turbo',
        label: 'GPT-3.5',
    },
    {
        value: 'gpt-4',
        label: 'GPT-4',
    },
]

