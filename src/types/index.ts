export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

declare global {
  interface Window {
    MathJax: any
  }
}

// 判断是否为移动端
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// 存储聊天记录
export class ChatStorage {
  private static instance: ChatStorage
  private useIndexedDB: boolean

  // 私有构造函数，确保外部无法直接实例化
  private constructor() {
    this.useIndexedDB = !!window.indexedDB
  }

  // 提供一个公共的静态方法来获取类实例
  public static getInstance(): ChatStorage {
    if (!ChatStorage.instance) {
      ChatStorage.instance = new ChatStorage()
    }
    return ChatStorage.instance
  }

  // 保存聊天记录
  async saveMessage(message: any) {
    if (this.useIndexedDB) {
      await this.saveToIndexedDB(message)
    } else {
      this.saveToLocalStorage(message)
    }
  }

  // 加载聊天记录
  async loadMessages(): Promise<any[]> {
    if (this.useIndexedDB) {
      return await this.loadFromIndexedDB()
    } else {
      return this.loadFromLocalStorage()
    }
  }

  // 更新聊天记录
  async updateMessage(updatedMessage: any) {
    if (this.useIndexedDB) {
      await this.updateInIndexedDB(updatedMessage)
    } else {
      this.updateInLocalStorage(updatedMessage)
    }
  }

  // 删除聊天记录
  async deleteMessage(messageId: string) {
    if (this.useIndexedDB) {
      await this.deleteFromIndexedDB(messageId)
    } else {
      this.deleteFromLocalStorage(messageId)
    }
  }

  // IndexedDB 存储方法 (您可能需要实现实际的逻辑)
  private async saveToIndexedDB(message: any) {
    // 在这里实现IndexedDB的保存逻辑
  }

  private async loadFromIndexedDB(): Promise<any[]> {
    // 在这里实现IndexedDB的加载逻辑
    return []
  }

  private async updateInIndexedDB(updatedMessage: any) {
    // 在这里实现IndexedDB的更新逻辑
  }

  private async deleteFromIndexedDB(messageId: string) {
    // 在这里实现IndexedDB的删除逻辑
  }

  // LocalStorage 存储方法
  private saveToLocalStorage(message: any) {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]')
    messages.push(message)
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }

  private loadFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('chatMessages') || '[]')
  }

  private updateInLocalStorage(updatedMessage: any) {
    const messages = this.loadFromLocalStorage()
    const index = messages.findIndex((msg: any) => msg.id === updatedMessage.id)
    if (index !== -1) {
      messages[index] = updatedMessage
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }

  private deleteFromLocalStorage(messageId: string) {
    const messages = this.loadFromLocalStorage()
    const updatedMessages = messages.filter((msg: any) => msg.id !== messageId)
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages))
  }
}

// 使用方法:
// const storage = ChatStorage.getInstance();
