import type { ChatMessage } from "@/types";
import http from "@/libs/http";


export async function postGPT(infoArray: ChatMessage) {
    let data = {
        model: "gpt-3.5-turbo",
        messages: [ infoArray ],
    }
    return await http.post<ChatMessage, unknown>('', data, { responseType: 'stream' })
}
