import axios from "axios";
import { Storage } from "@/libs/utils";

const service = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: {
        "Content-Type": "application/json",
    },
})

service.interceptors.request.use(config => {
    const access_token = Storage.get('apiKey')

    if (access_token) {
        config.headers.Authorization = `Bearer ${ access_token }`
    }

    return config
}, error => Promise.reject(error))

service.interceptors.response.use(response => {
    return JSON.parse(response.data)
}, error => Promise.reject(error))

export default service
