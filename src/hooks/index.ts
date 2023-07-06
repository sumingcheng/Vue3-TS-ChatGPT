import {Storage} from "@/libs/utils"
import {ElMessage} from "element-plus";

// localstorage key

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

export const scrollToBottom = (val: any) => {
  if (!val) {
    return
  } else {
    scrollTo(0, val.scrollHeight)
  }
}

const copy = (copyText: string) => {
  navigator.clipboard.writeText(copyText).then(function () {
    ElMessage({
      message: '已复制', type: 'success',
    })
  }, function (err) {
    console.error('无法复制文本: ', err)
  })
}

// 初始化拷贝
export const initCopy = () => {
  const copyText: any = document.getElementsByClassName("copyNode")
  let arr = Array.from(copyText)
  arr.forEach((v: any) => {
    // 如果元素已经有一个 copyAction，那么首先移除它
    if (v.copyAction) {
      v.removeEventListener("click", v.copyAction)
    }

    // 创建一个新的 copyAction，并存储在元素的属性中
    v.copyAction = () => {
      copy(v.nextSibling.textContent)
    }

    // 添加新的监听器
    v.addEventListener("click", v.copyAction)
  })
}

