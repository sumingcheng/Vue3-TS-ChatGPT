import { Storage } from "@/libs/utils";

export function operationKey() {
    const key = Storage.get('apiKey')
    const getKey = () => {
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
