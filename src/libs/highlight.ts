import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import rust from 'highlight.js/lib/languages/rust'
import shell from 'highlight.js/lib/languages/shell'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import less from 'highlight.js/lib/languages/less'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml' // HTML 使用 'xml' 模块
import json from 'highlight.js/lib/languages/json'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
// 导入样式
import 'highlight.js/styles/github.css'
// import '@/assets/dracula.css'
import { marked, Renderer } from 'marked'

const renderer = new Renderer()

const languages = {
  javascript, python, go, java, rust, shell, php, sql, less, css, xml, json, c, cpp
}

// 循环注册所有语言模块
for (const [name, module] of Object.entries(languages)) {
  hljs.registerLanguage(name, module)
}

// 以 $ 开始和结束的内联公式，以及以 $$ 开始和结束的块级公式
renderer.text = function(text) {
  if (text.startsWith('$') && text.endsWith('$')) {
    return `<span class='math'>${text.slice(1, -1)}</span>`
  }
  return text
}

// 段落
renderer.paragraph = function(text) {
  if (text.startsWith('$$') && text.endsWith('$$')) {
    return `<div class='math'>${text.slice(2, -2)}</div>`
  }
  return '<p>' + text + '</p>\n'
}

// 代码块
renderer.code = (code, language) => {
  const validLanguage = !!(language && hljs.getLanguage(language))
  const highlighted = validLanguage ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value
  return `<pre class='clearfix'><button class='copyNode'>Copy</button><code class='${language} hljs'>${highlighted}</code></pre>\n`
}

// 配置 marked
marked.setOptions({ renderer })

// 导出 markedRender
export const markedRender = (val: any) => {
  return marked(val)
}
