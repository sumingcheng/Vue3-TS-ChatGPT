import JSEncrypt from 'jsencrypt'
import type { JSEncryptRSAKey } from "jsencrypt/lib/JSEncryptRSAKey";

let rsa = new JSEncrypt();



export const DECODER = new TextDecoder("utf-8")

// 封装 localStorage
export const Storage = {
    get(key: string): string | null {
        return localStorage.getItem(key)
    },
    set(key: string, value: string): void {
        localStorage.setItem(key, value)
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

