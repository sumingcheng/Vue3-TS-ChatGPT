import { Storage } from "@/libs/utils";

export function operationKey() {
    const getKey = (): string => {
        const key: string | null = Storage.get('apiKey')
        return key === null ? '' : key
    }
    const setKey = (apiKey: string) => {
        return Storage.set('apiKey', apiKey)
    }

    return {
        getKey,
        setKey
    }
}
