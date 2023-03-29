import type { ChatMessage } from "@/types";
import axios from "axios";


axios.defaults.headers.post["Content-Type"] = "application/json";

export async function chat(messageList: ChatMessage[], apiKey: string, GPT_VERSION: string) {
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
}
