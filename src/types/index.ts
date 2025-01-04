export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

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

export type Role = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  role: Role
  content: string
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export class ChatStorageManager {
  private static instance: ChatStorageManager | null = null
  private readonly dbName = 'ChatAppDB'
  private readonly objectStoreName = 'chatRecords'
  private readonly chatRecordKey = 'chatRecordKey'
  private readonly isIndexedDBSupported = 'indexedDB' in window

  private constructor() {
    if (ChatStorageManager.instance) {
      throw new Error('Use ChatStorageManager.getInstance() instead of new.')
    }
  }

  public static getInstance(): ChatStorageManager {
    if (!ChatStorageManager.instance) {
      ChatStorageManager.instance = new ChatStorageManager()
    }
    return ChatStorageManager.instance
  }

  private async initDB(): Promise<IDBDatabase> {
    try {
      return await new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1)
        request.onerror = () => reject(new DatabaseError('Failed to open IndexedDB'))
        request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result)
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result
          if (!db.objectStoreNames.contains(this.objectStoreName)) {
            db.createObjectStore(this.objectStoreName)
          }
        }
      })
    } catch (error: any) {
      throw new DatabaseError(`IndexedDB initialization failed: ${error.message}`)
    }
  }

  public async saveChatRecord(data: ChatMessage[]): Promise<void> {
    try {
      if (this.isIndexedDBSupported) {
        const db = await this.initDB()
        const transaction = db.transaction([this.objectStoreName], 'readwrite')
        const objectStore = transaction.objectStore(this.objectStoreName)
        await new Promise<void>((resolve, reject) => {
          const request = objectStore.put(data, this.chatRecordKey)
          request.onsuccess = () => resolve()
          request.onerror = () => reject(new DatabaseError('Failed to save record'))
        })
      } else {
        localStorage.setItem(this.chatRecordKey, JSON.stringify(data))
      }
    } catch (error: any) {
      throw new DatabaseError(`Failed to save chat record: ${error.message}`)
    }
  }

  public async getChatRecord(): Promise<ChatMessage[] | null> {
    try {
      if (this.isIndexedDBSupported) {
        const db = await this.initDB()
        return await new Promise((resolve, reject) => {
          const transaction = db.transaction([this.objectStoreName])
          const objectStore = transaction.objectStore(this.objectStoreName)
          const request = objectStore.get(this.chatRecordKey)
          request.onerror = () => reject(new DatabaseError('Failed to fetch record'))
          request.onsuccess = () => resolve(request.result)
        })
      }
      const record = localStorage.getItem(this.chatRecordKey)
      return record ? JSON.parse(record) : null
    } catch (error: any) {
      throw new DatabaseError(`Failed to get chat record: ${error.message}`)
    }
  }

  public async deleteChatRecord(): Promise<void> {
    try {
      if (this.isIndexedDBSupported) {
        const db = await this.initDB()
        const transaction = db.transaction([this.objectStoreName], 'readwrite')
        const objectStore = transaction.objectStore(this.objectStoreName)
        await new Promise<void>((resolve, reject) => {
          const request = objectStore.delete(this.chatRecordKey)
          request.onsuccess = () => resolve()
          request.onerror = () => reject(new DatabaseError('Failed to delete record'))
        })
      } else {
        localStorage.removeItem(this.chatRecordKey)
      }
    } catch (error: any) {
      throw new DatabaseError(`Failed to delete chat record: ${error.message}`)
    }
  }
}



