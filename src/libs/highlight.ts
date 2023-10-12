import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import rust from 'highlight.js/lib/languages/rust';
import shell from 'highlight.js/lib/languages/shell';
import php from 'highlight.js/lib/languages/php';

import 'highlight.js/styles/github.css'
// import '@/assets/dracula.css'
import { marked, Renderer } from 'marked'

const renderer = new Renderer()

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('java', java);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('php', php);

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
renderer.code = function(code, language) {
  const validLang = !!(language && hljs.getLanguage(language))
  const highlighted = validLang ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value
  return `<pre class='clearfix'><button class='copyNode'>Copy</button><code  class='${language} hljs'>${highlighted}</code></pre>\n`
}


// 配置 marked
marked.setOptions({
  renderer: renderer,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value
    } else {
      return hljs.highlightAuto(code).value
    }
  }
})

// 导出 markedRender
export const markedRender = (val: string) => {
  return marked(val)
}
