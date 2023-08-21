import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'
import {marked, Renderer} from 'marked'

const renderer = new Renderer()


hljs.registerLanguage('javascript', javascript)

// 以 $ 开始和结束的内联公式，以及以 $$ 开始和结束的块级公式
renderer.text = function (text) {
  if (text.startsWith('$') && text.endsWith('$')) {
    return `<span class="math">${text.slice(1, -1)}</span>`
  }
  return text
}

renderer.paragraph = function (text) {
  if (text.startsWith('$$') && text.endsWith('$$')) {
    return `<div class="math">${text.slice(2, -2)}</div>`
  }
  return '<p>' + text + '</p>\n'
}

renderer.code = function (code, language) {
  const validLang = !!(language && hljs.getLanguage(language))
  const highlighted = validLang ? hljs.highlight(code, {language}).value : hljs.highlightAuto(code).value
  return `<pre class="clearfix"><button class="copyNode">Copy</button><code  class="${language} hljs">${highlighted}</code></pre>\n`
}


// 配置 marked
marked.setOptions({
  renderer: renderer,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
  // 其他配置
})

// 导出 markedRender
export const markedRender = (val: any) => {
  return marked(val)
}
