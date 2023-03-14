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
