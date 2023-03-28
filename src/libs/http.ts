import axios from "axios"
import { Storage } from "@/libs/utils"

const service = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    "Content-Type": "application/json",
  },
})
/* const response = await axios.get('https://stream.example.com', {
    headers: {Authorization: `Bearer ${token}`, 
    responseType: 'stream'
});

const stream = response.data;

stream.on('data', data => {
    console.log(data);
});

stream.on('end', () => {
    console.log("stream done");
}); */
service.interceptors.request.use(config => {
  const access_token = Storage.get('apiKey')

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }

  return config
}, error => Promise.reject(error))

service.interceptors.response.use(response => {
  return JSON.parse(response.data)
}, error => Promise.reject(error))


export default service
