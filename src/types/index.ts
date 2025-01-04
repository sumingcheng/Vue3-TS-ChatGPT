declare global {
  interface Window {
    MathJax: any
  }
}

// 判断是否为移动端
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// 初始角色
export const initMsg: ChatMessage[] = [
  {
    role: 'system',
    content: 'I want you to act as a professional programmer, providing rigorous and comprehensible answers to my questions. When I present you with a programming query or scenario, respond with the precision and clarity expected of an experienced developer. Ensure your explanations are thorough yet easy to understand, employing technical terminology accurately. Your responses should reflect the expertise and insight of a seasoned programmer, aiding in not just solving the presented issue, but also offering a deeper understanding of the underlying concepts involved.'
  },
  {
    role: 'assistant',
    content: '你好，我是神奇海螺，欢迎提问'
  }
]

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * 数据库名：ChatAppDB
 * 表名：chatRecords
 * 存储键名：chatRecordKey
 * 类的名称：ChatStorageManager
 */

// 聊天记录存储管理器
export class ChatStorageManager {
  private static instance: ChatStorageManager
  private dbName: string = 'ChatAppDB'
  private objectStoreName: string = 'chatRecords'
  private chatRecordKey: string = 'chatRecordKey'
  private isIndexedDBSupported: boolean = ('indexedDB' in window)

  private constructor() {
  }

  public static getInstance(): ChatStorageManager {
    if (!ChatStorageManager.instance) {
      ChatStorageManager.instance = new ChatStorageManager()
    }
    return ChatStorageManager.instance
  }

  // 初始化 IndexedDB
  private initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)
      request.onerror = (_event) => {
        reject('Failed to open IndexedDB')
      }
      request.onsuccess = (_event) => {
        resolve((_event.target as IDBOpenDBRequest).result)
      }
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          db.createObjectStore(this.objectStoreName)
        }
      }
    })
  }

  // 保存聊天记录
  public async saveChatRecord(data: ChatMessage[]): Promise<void> {
    if (this.isIndexedDBSupported) {
      const db = await this.initDB()
      const transaction = db.transaction([this.objectStoreName], 'readwrite')
      const objectStore = transaction.objectStore(this.objectStoreName)
      objectStore.put(data, this.chatRecordKey)
    } else {
      localStorage.setItem(this.chatRecordKey, JSON.stringify(data))
    }
  }

  // 获取聊天记录
  public async getChatRecord(): Promise<ChatMessage[] | null> {
    if (this.isIndexedDBSupported) {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName])
        const objectStore = transaction.objectStore(this.objectStoreName)
        const request = objectStore.get(this.chatRecordKey)
        request.onerror = () => {
          reject('Failed to fetch record from IndexedDB')
        }
        request.onsuccess = () => {
          resolve(request.result as ChatMessage[])
        }
      })
    } else {
      const record = localStorage.getItem(this.chatRecordKey)
      return record ? JSON.parse(record) as ChatMessage[] : null
    }
  }

  // 删除聊天记录
  public async deleteChatRecord(): Promise<void> {
    if (this.isIndexedDBSupported) {
      const db = await this.initDB()
      const transaction = db.transaction([this.objectStoreName], 'readwrite')
      const objectStore = transaction.objectStore(this.objectStoreName)
      objectStore.delete(this.chatRecordKey)
    } else {
      localStorage.removeItem(this.chatRecordKey)
    }
  }
}



