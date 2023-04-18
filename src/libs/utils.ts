import { decryptString, encryptString } from "@/libs/encryp";


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

