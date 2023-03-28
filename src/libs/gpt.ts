import type { ChatMessage } from "@/types";
import axios from "axios";


axios.defaults.headers.post["Content-Type"] = "application/json";

export async function chat(messageList: ChatMessage[], apiKey: string, GPT_VERSION: string) {
    if (GPT_VERSION === 'gpt-3.5-turbo') {
        try {
            const result = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ apiKey }`,
                },

                body: JSON.stringify({
                    model: GPT_VERSION,
                    stream: true,
                    messages: messageList,
                }),
            });
            console.log(result.body)
            return {
                status: "success",
                data: result.body,
            };
        } catch (error: any) {
            return {
                status: "error",
                message: error,
            };
        }
    } else {
        //     请求GPT-4
        try {
            const result = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ apiKey }`,
                },

                body: JSON.stringify({
                    prompt: messageList,
                    max_tokens: 1000,
                    temperature: 0.7,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                }),
            });
            console.log(result.body)
        } catch (error: any) {
            return {
                status: "error",
                message: error,
            };
        }
    }
}
