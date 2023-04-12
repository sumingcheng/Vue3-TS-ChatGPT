// 加密函数
export function encryptString(str) {
  let result = ''
  for (let i = 0; i < str.length; i ++) {
    let ascii = str.charCodeAt(i)
    result += String.fromCharCode(ascii + 1)  // 将 ASCII 编码值加 1
  }
  return result
}

// 解密函数
export function decryptString(str) {
  let result = ''
  for (let i = 0; i < str.length; i ++) {
    let ascii = str.charCodeAt(i)
    result += String.fromCharCode(ascii - 1)  // 将 ASCII 编码值减 1
  }
  return result
}
