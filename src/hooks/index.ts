import { Storage } from "@/libs/utils";

export function operationKey() {
    const key: string | null = Storage.get('apiKey')
    const getKey = (): string => {
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
