import { Storage } from "@/libs/utils";
import { Configuration, OpenAIApi } from "openai";
// localstorage key
const { getKey, setKey } = operationKey()

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

// 获取引擎列表
const configuration = new Configuration({
    organization: "org-u5wdMv1QbV0Xc1qIJk9l7djp",
    apiKey: getKey(),
});
const openai = new OpenAIApi(configuration);

export let response = await openai.listEngines();

