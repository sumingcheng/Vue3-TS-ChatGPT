var ge=Object.defineProperty;var ve=(t,e,o)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var D=(t,e,o)=>ve(t,typeof e!="symbol"?e+"":e,o);import{C as K}from"./vendor/crypto-js-Ci0zXM0r.js";import{E as V,a as he,b as ae,c as N,d as we,e as fe,f as je}from"./vendor/element-plus-Buyz4oKF.js";import{x as f,n as se,J as w,K as x,Y as c,I as T,q as ne,P as xe,p as O,W as J,av as re,a0 as h,_ as S,a6 as _e,X as m,aG as Se,Z as z,u as a,aH as Ce,aI as ke,a4 as X,a5 as Z,V as ie,H as L,ax as Me,aw as q,aJ as Ie,r as De,a9 as Ve,y as Ee,aK as Be}from"./vendor/-DG6odqa_.js";import{l as Te}from"./vendor/lodash-eWJlexCj.js";import{S as $e}from"./vendor/smooth-scroll-DWzhxnP0.js";import{_ as A}from"./index-yZmHTHwL.js";import{H as R,j as Le,p as Re,g as Ke,a as Ne,r as ze,s as qe,b as Ae,c as He,l as Pe,d as Fe,x as Oe,e as Je,f as Ue,h as Ge}from"./vendor/highlight.js-Be3YRpZp.js";import{m as de,_ as We}from"./vendor/marked-COKqZZmD.js";import"./vendor/lodash-es-ut2NwUtB.js";import"./vendor/vue-router-BbBv9qpx.js";const Ye=[{id:"text-search-babbage-doc-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-16k-0613",object:"model",created:1685474247,owned_by:"openai"},{id:"curie-search-query",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-16k",object:"model",created:1683758102,owned_by:"openai-internal"},{id:"text-search-babbage-query-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"babbage",object:"model",created:1649358449,owned_by:"openai"},{id:"babbage-search-query",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-babbage-001",object:"model",created:1649364043,owned_by:"openai"},{id:"text-similarity-davinci-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"gpt-4-1106-preview",object:"model",created:1698957206,owned_by:"system"},{id:"davinci-similarity",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"code-davinci-edit-001",object:"model",created:1649880484,owned_by:"openai"},{id:"curie-similarity",object:"model",created:1651172510,owned_by:"openai-dev"},{id:"babbage-search-document",object:"model",created:1651172510,owned_by:"openai-dev"},{id:"curie-instruct-beta",object:"model",created:1649364042,owned_by:"openai"},{id:"gpt-3.5-turbo",object:"model",created:1677610602,owned_by:"openai"},{id:"gpt-3.5-turbo-1106",object:"model",created:1698959748,owned_by:"system"},{id:"text-search-ada-doc-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"davinci-instruct-beta",object:"model",created:1649364042,owned_by:"openai"},{id:"text-similarity-babbage-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"text-search-davinci-doc-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"babbage-similarity",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"text-embedding-ada-002",object:"model",created:1671217299,owned_by:"openai-internal"},{id:"davinci-search-query",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"gpt-4-vision-preview",object:"model",created:1698894917,owned_by:"system"},{id:"text-similarity-curie-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"gpt-4",object:"model",created:1687882411,owned_by:"openai"},{id:"text-davinci-001",object:"model",created:1649364042,owned_by:"openai"},{id:"text-search-davinci-query-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"ada-search-document",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"ada-code-search-code",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"babbage-002",object:"model",created:1692634615,owned_by:"system"},{id:"davinci-002",object:"model",created:1692634301,owned_by:"system"},{id:"davinci-search-document",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"curie-search-document",object:"model",created:1651172508,owned_by:"openai-dev"},{id:"babbage-code-search-code",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-search-ada-query-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"code-search-ada-text-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"babbage-code-search-text",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"code-search-babbage-code-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"ada-search-query",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"ada-code-search-text",object:"model",created:1651172510,owned_by:"openai-dev"},{id:"tts-1-hd",object:"model",created:1699046015,owned_by:"system"},{id:"text-search-curie-query-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-davinci-002",object:"model",created:1649880484,owned_by:"openai"},{id:"text-davinci-edit-001",object:"model",created:1649809179,owned_by:"openai"},{id:"code-search-babbage-text-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"tts-1-hd-1106",object:"model",created:1699053533,owned_by:"system"},{id:"gpt-3.5-turbo-instruct-0914",object:"model",created:1694122472,owned_by:"system"},{id:"ada",object:"model",created:1649357491,owned_by:"openai"},{id:"gpt-3.5-turbo-0613",object:"model",created:1686587434,owned_by:"openai"},{id:"text-ada-001",object:"model",created:1649364042,owned_by:"openai"},{id:"ada-similarity",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"code-search-ada-code-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"text-similarity-ada-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-0301",object:"model",created:1677649963,owned_by:"openai"},{id:"gpt-3.5-turbo-instruct",object:"model",created:1692901427,owned_by:"system"},{id:"gpt-4-0613",object:"model",created:1686588896,owned_by:"openai"},{id:"text-search-curie-doc-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-davinci-003",object:"model",created:1669599635,owned_by:"openai-internal"},{id:"text-curie-001",object:"model",created:1649364043,owned_by:"openai"},{id:"whisper-1",object:"model",created:1677532384,owned_by:"openai-internal"},{id:"curie",object:"model",created:1649359874,owned_by:"openai"},{id:"gpt-4-0314",object:"model",created:1687882410,owned_by:"openai"},{id:"canary-tts",object:"model",created:1699492935,owned_by:"system"},{id:"tts-1",object:"model",created:1681940951,owned_by:"openai-internal"},{id:"davinci",object:"model",created:1649359874,owned_by:"openai"},{id:"dall-e-2",object:"model",created:1698798177,owned_by:"system"},{id:"tts-1-1106",object:"model",created:1699053241,owned_by:"system"},{id:"dall-e-3",object:"model",created:1698785189,owned_by:"system"}],ce="SuMingcheng";K.enc.Utf8.parse("ThisIsAnIV123456");function Xe(t){return K.AES.encrypt(t,ce).toString()}function Ze(t){return t==null?"":K.AES.decrypt(t,ce).toString(K.enc.Utf8)}const Qe=new TextDecoder("utf-8"),Q={get(t){return Ze(window.localStorage.getItem(t))},set(t,e){window.localStorage.setItem(t,Xe(e))},remove(t){window.localStorage.removeItem(t)}},ee=()=>{window.open("https://github.com/sumingcheng/Vue3-TS-ChatGPT")};function et(t){const e=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});return t.sort((o,r)=>e.compare(o.id,r.id))}function tt(){return{getKey:()=>{const o=Q.get("apiKey");return o===null?"":o},setKey:o=>Q.set("apiKey",o)}}const ot=t=>{navigator.clipboard.writeText(t).then(function(){V({message:"已复制",type:"success"})},function(e){console.error("无法复制文本: ",e)})},te=()=>{const t=document.getElementsByClassName("copyNode");Array.from(t).forEach(o=>{o.copyAction&&o.removeEventListener("click",o.copyAction),o.copyAction=()=>{ot(o.nextSibling.textContent)},o.addEventListener("click",o.copyAction)})};async function at(t,e,o){try{const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"post",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:o,stream:!0,messages:t})});return r.ok?{status:"success",data:r.body}:{status:"error",error:(await r.json()).error}}catch(r){return{status:"error",error:{message:r instanceof Error?r.message:"未知错误"}}}}const le=f(window.innerWidth);window.addEventListener("resize",()=>{le.value=window.innerWidth});const l=se(()=>le.value<=768),oe=[{role:"system",content:"I want you to act as a professional programmer, providing rigorous and comprehensible answers to my questions. When I present you with a programming query or scenario, respond with the precision and clarity expected of an experienced developer. Ensure your explanations are thorough yet easy to understand, employing technical terminology accurately. Your responses should reflect the expertise and insight of a seasoned programmer, aiding in not just solving the presented issue, but also offering a deeper understanding of the underlying concepts involved."},{role:"assistant",content:"Hello, I am the Magic Conch Shell. Feel free to ask me any questions."}];class k extends Error{constructor(e){super(e),this.name="DatabaseError"}}const M=class M{constructor(){D(this,"dbName","ChatAppDB");D(this,"objectStoreName","chatRecords");D(this,"chatRecordKey","chatRecordKey");D(this,"isIndexedDBSupported","indexedDB"in window);if(M.instance)throw new Error("Use ChatStorageManager.getInstance() instead of new.")}static getInstance(){return M.instance||(M.instance=new M),M.instance}async initDB(){try{return await new Promise((e,o)=>{const r=indexedDB.open(this.dbName,1);r.onerror=()=>o(new k("Failed to open IndexedDB")),r.onsuccess=i=>e(i.target.result),r.onupgradeneeded=i=>{const p=i.target.result;p.objectStoreNames.contains(this.objectStoreName)||p.createObjectStore(this.objectStoreName)}})}catch(e){throw new k(`IndexedDB initialization failed: ${e.message}`)}}async saveChatRecord(e){try{if(this.isIndexedDBSupported){const i=(await this.initDB()).transaction([this.objectStoreName],"readwrite").objectStore(this.objectStoreName);await new Promise((p,d)=>{const n=i.put(e,this.chatRecordKey);n.onsuccess=()=>p(),n.onerror=()=>d(new k("Failed to save record"))})}else localStorage.setItem(this.chatRecordKey,JSON.stringify(e))}catch(o){throw new k(`Failed to save chat record: ${o.message}`)}}async getChatRecord(){try{if(this.isIndexedDBSupported){const o=await this.initDB();return await new Promise((r,i)=>{const n=o.transaction([this.objectStoreName]).objectStore(this.objectStoreName).get(this.chatRecordKey);n.onerror=()=>i(new k("Failed to fetch record")),n.onsuccess=()=>r(n.result)})}const e=localStorage.getItem(this.chatRecordKey);return e?JSON.parse(e):null}catch(e){throw new k(`Failed to get chat record: ${e.message}`)}}async deleteChatRecord(){try{if(this.isIndexedDBSupported){const r=(await this.initDB()).transaction([this.objectStoreName],"readwrite").objectStore(this.objectStoreName);await new Promise((i,p)=>{const d=r.delete(this.chatRecordKey);d.onsuccess=()=>i(),d.onerror=()=>p(new k("Failed to delete record"))})}else localStorage.removeItem(this.chatRecordKey)}catch(e){throw new k(`Failed to delete chat record: ${e.message}`)}}};D(M,"instance",null);let F=M;const st="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20t='1688628261553'%20class='icon'%20viewBox='0%200%201024%201024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20p-id='7931'%20width='128'%20height='128'%3e%3cpath%20d='M465.130667%20874.837333a42.666667%2042.666667%200%200%200%2073.856%200L934.314667%20192.042667a42.666667%2042.666667%200%200%200-36.928-64H106.730667a42.666667%2042.666667%200%200%200-36.928%2064z'%20fill='%23f7f7f7'%20p-id='7932'%3e%3c/path%3e%3c/svg%3e",nt={},rt={class:"box"};function it(t,e){return w(),x("div",rt,e[0]||(e[0]=[c("div",{class:"loading"},[c("div"),c("div"),c("div"),c("div"),c("div"),c("div"),c("div"),c("div"),c("div")],-1)]))}const dt=A(nt,[["render",it],["__scopeId","data-v-107fce48"]]),H=new We,ct={javascript:Le,python:Re,go:Ke,java:Ne,rust:ze,shell:qe,php:Ae,sql:He,less:Pe,css:Fe,xml:Oe,json:Je,c:Ue,cpp:Ge};for(const[t,e]of Object.entries(ct))R.registerLanguage(t,e);H.text=function(t){return t.startsWith("$")&&t.endsWith("$")?`<span class='math'>${t.slice(1,-1)}</span>`:t};H.paragraph=function(t){return t.startsWith("$$")&&t.endsWith("$$")?`<div class='math'>${t.slice(2,-2)}</div>`:"<p>"+t+`</p>
`};H.code=(t,e)=>{const r=!!(e&&R.getLanguage(e))?R.highlight(t,{language:e}).value:R.highlightAuto(t).value;return`<pre class='clearfix'><button class='copyNode'>Copy</button><code class='${e} hljs'>${r}</code></pre>
`};de.setOptions({renderer:H});const lt=t=>de(t),ut={class:"outer-container h-full"},pt=["innerHTML"],mt=T({__name:"ChatContent",props:{messages:{},roleAlias:{},isMobile:{type:Boolean}},emits:["scroll-bottom"],setup(t,{expose:e,emit:o}){const r=t,i=f(),p=f(!1),d=()=>{if(!i.value)return;const{scrollTop:s,scrollHeight:v,clientHeight:b}=i.value;p.value=v-(s+b)>200},n=()=>{i.value&&(i.value.scrollTop=i.value.scrollHeight,p.value=!1)};ne(()=>{var s;(s=i.value)==null||s.addEventListener("scroll",d)}),xe(()=>{var s;(s=i.value)==null||s.removeEventListener("scroll",d)});const g=se(()=>s=>lt(s));return O(()=>r.messages,()=>{L(()=>{n()})},{deep:!0}),e({chatListDom:i,scrollToBottom:n}),(s,v)=>(w(),x("div",ut,[c("div",{class:m(["chat-container h-full overflow-y-auto",{mobile:s.isMobile,desktop:!s.isMobile}]),ref_key:"chatListDom",ref:i},[(w(!0),x(J,null,re(s.messages.filter(b=>b.role!=="system"),(b,U,G,C)=>{const E=[b.content,b.role];if(C&&C.key===b.content&&Se(C,E))return C;const $=(w(),x("div",{key:b.content},[c("div",{class:m(["message-wrapper",{"flex-row-reverse":b.role==="user"}])},[c("div",{class:m(["avatar-wrapper",{"mobile-avatar":s.isMobile}])},[h(a(he),{size:s.isMobile?16:20,color:"#000000"},{default:S(()=>[b.role==="user"?(w(),z(a(Ce),{key:0})):(w(),z(a(ke),{key:1}))]),_:2},1032,["size"])],2),c("div",{class:m(["message-content px-6 py-4",[b.role,{"mobile-message px-2":s.isMobile}]])},[X(c("div",{class:"break-words text-base",innerHTML:g.value(b.content)},null,8,pt),[[Z,b.content]]),X(h(dt,null,null,512),[[Z,!b.content]])],2)],2)]));return $.memo=E,$},v,0),128)),h(_e,{name:"fade"},{default:S(()=>[p.value?(w(),x("div",{key:0,class:m(["fixed right-6 bottom-32 cursor-pointer bg-black rounded-full shadow-lg hover:bg-opacity-80 transition-all",{"right-3 bottom-24 opacity-50":s.isMobile}]),onClick:n},v[2]||(v[2]=[c("div",{class:"bg-black rounded-full p-2"},[c("img",{src:st,alt:"ReturnToBottom",class:"w-5 h-5"})],-1)]),2)):ie("",!0)]),_:1})],2)]))}}),bt=A(mt,[["__scopeId","data-v-0d18179d"]]),yt=T({__name:"ChatInput",props:{isTalking:{type:Boolean},isMobile:{type:Boolean}},emits:["send","delete","scroll-bottom"],setup(t,{expose:e,emit:o}){const r=o,i=f(null),p=f(""),d=s=>{s&&s.preventDefault(),p.value.trim()&&(r("send",p.value),p.value="")};return e({getFocus:()=>{var s;(s=i.value)==null||s.focus()},clearContent:()=>{p.value=""},myInput:i}),(s,v)=>(w(),x("div",{class:m(["flex flex-nowrap fixed w-full bottom-0 z-50 bgColor h-24",{"px-6":!s.isMobile,"px-3 h-14":s.isMobile}])},[c("div",{class:m(["flex items-center w-full h-full",{"max-w-3xl mx-auto":s.isMobile}])},[h(a(ae),{class:"input flex-1",rows:1,type:"textarea",ref_key:"myInput",ref:i,modelValue:p.value,"onUpdate:modelValue":v[0]||(v[0]=b=>p.value=b),size:s.isMobile?"default":"large",disabled:s.isTalking,onKeydown:Me(d,["enter"]),style:{"--el-input-text-color":"#000000"}},null,8,["modelValue","size","disabled"]),h(a(N),{onClick:d,size:s.isMobile?"default":"large",type:"info",class:m(["elBtnStyle ml-5",{"text-5xl":!s.isMobile,"text-3xl":s.isMobile}])},{default:S(()=>v[2]||(v[2]=[q(" Send ")])),_:1},8,["size","class"]),c("div",{class:m(["triangle ml-4 cursor-pointer",{"scale-75":s.isMobile}]),onClick:v[1]||(v[1]=b=>r("delete"))},[h(a(Ie))],2)],2)],2))}}),gt=A(yt,[["__scopeId","data-v-13e3049f"]]),vt={key:0,class:"ml-4 text-sm text-white"},ht=T({__name:"Header",setup(t){return(e,o)=>(w(),x("div",{class:m(["flex flex-nowrap fixed w-full items-center top-0 bgColor z-50 h-16",{"px-6":!a(l),"px-3":a(l)}])},[c("div",{class:m(["font-bold text-white",{"text-2xl":!a(l),"text-xl":a(l)}])},"MagicConch",2),a(l)?ie("",!0):(w(),x("div",vt," Magic conch based on ChatGPT ")),c("div",{class:m(["ml-4 my-auto cursor-pointer",{"scale-90":a(l)}]),onClick:o[0]||(o[0]=(...r)=>a(ee)&&a(ee)(...r))},o[2]||(o[2]=[c("img",{loading:"lazy",decoding:"async",src:"https://img.shields.io/github/stars/sumingcheng/Vue3-TS-ChatGPT?logo=github",alt:"GitHub"},null,-1)]),2),c("div",{class:"ml-auto text-sm cursor-pointer",onClick:o[1]||(o[1]=r=>e.$emit("config"))},[h(a(N),{size:a(l)?"default":"large",type:"info",class:m(["elBtnStyle",{"text-4xl":!a(l),"text-3xl":a(l)}])},{default:S(()=>o[3]||(o[3]=[q("Set")])),_:1},8,["size","class"])])],2))}}),wt=T({__name:"SettingsDialog",props:{modelValue:{type:Boolean},apiKey:{},gptVersion:{},gptVersionList:{},width:{default:l?"90%":"80%"}},emits:["update:modelValue","save"],setup(t,{emit:e}){const o=t,r=e,i=f(o.apiKey),p=f(o.gptVersion);return O(()=>o.modelValue,d=>{d&&(i.value=o.apiKey,p.value=o.gptVersion)}),(d,n)=>(w(),z(a(je),{"model-value":d.modelValue,"onUpdate:modelValue":n[4]||(n[4]=g=>d.$emit("update:modelValue",g)),width:d.width,center:""},{footer:S(()=>[c("div",{class:m([{"flex gap-2":!a(l),"space-y-2":a(l)}])},[h(a(N),{onClick:n[2]||(n[2]=g=>d.$emit("update:modelValue",!1)),size:a(l)?"default":"large",class:m({"w-full":a(l)})},{default:S(()=>n[7]||(n[7]=[q(" 取消 ")])),_:1},8,["size","class"]),h(a(N),{type:"primary",onClick:n[3]||(n[3]=g=>r("save",i.value,p.value)),size:a(l)?"default":"large",class:m({"w-full":a(l)})},{default:S(()=>n[8]||(n[8]=[q(" 保存 ")])),_:1},8,["size","class"])],2)]),default:S(()=>[c("div",{class:m({"p-6":!a(l),"p-3":a(l)})},[c("div",{class:m(["flex items-center gap-4",{"flex-col items-start":a(l)}])},[n[5]||(n[5]=c("span",{class:"font-bold whitespace-nowrap"},"API Key",-1)),h(a(ae),{modelValue:i.value,"onUpdate:modelValue":n[0]||(n[0]=g=>i.value=g),placeholder:"sk-xxxxxxxxxx",size:a(l)?"default":"large",clearable:"",class:m(["flex-1",{"w-full":a(l)}])},null,8,["modelValue","size","class"])],2),c("div",{class:m(["flex items-center gap-4 mt-5",{"flex-col items-start":a(l)}])},[n[6]||(n[6]=c("span",{class:"font-bold whitespace-nowrap"},"Version",-1)),h(a(fe),{modelValue:p.value,"onUpdate:modelValue":n[1]||(n[1]=g=>p.value=g),size:a(l)?"default":"large",class:m(["flex-1",{"w-full":a(l)}])},{default:S(()=>[(w(!0),x(J,null,re(d.gptVersionList,g=>(w(),z(a(we),{key:g.id,label:g.id,value:g.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","size","class"])],2)],2)]),_:1},8,["model-value","width"]))}}),ft=A(wt,[["__scopeId","data-v-89d71597"]]),jt={class:"flex flex-col h-screen"},Tt=T({__name:"index",setup(t){const e=et(Ye),o={user:"ME",assistant:"Magic Conch",system:"System"},r=F.getInstance(),{getKey:i,setKey:p}=tt(),d=f(oe),n=f("gpt-3.5-turbo"),g=f(!1),s=f(!1),v=f(),b=f(),U=Te.debounce(()=>{De(()=>{d.value.forEach(u=>{u.content&&u.content.includes("$")&&L(()=>{window.MathJax.typesetPromise()})})})},200),G=()=>{new MutationObserver(y=>{y.forEach(j=>{j.type==="childList"&&window.MathJax&&U()})}).observe(document.body,{childList:!0,subtree:!0})},C=u=>{d.value[d.value.length-1].content+=u},E=async u=>{const{done:y,value:j}=await u.read();if(y){u.releaseLock();return}const B=Qe.decode(j).match(/data: \s*({.*?}]})/g);B&&B.forEach(_=>{const I=_.replace("data: ",""),P=JSON.parse(I);C(P.choices[0].delta.content??"")}),await E(u)},$=async u=>{try{const y=u.data.getReader();await E(y)}catch(y){console.error("Error updating message list:",y)}},ue=async u=>{var y,j,B;try{if(!u){V({message:"请输入内容",type:"info"});return}g.value=!0,d.value.length===2&&d.value.pop(),d.value.push({role:"user",content:u}),d.value.push({role:"assistant",content:""});const _=await at(d.value,i(),n.value);if(_.status==="success"&&_.data)await $(_);else{const Y=((y=_.error)==null?void 0:y.message)||"发生未知错误";C(Y),V({message:Y,type:"error"})}const I=JSON.stringify(d.value),P=JSON.parse(I);await r.saveChatRecord(P)}catch(_){const I=((j=_.error)==null?void 0:j.message)||_.message||"请求失败，请重试";C(I),V({message:I,type:"error"})}finally{g.value=!1,(B=b.value)==null||B.getFocus()}},pe=()=>{s.value=!0},W=Be(()=>{var j;const u=new $e,y=(j=v.value)==null?void 0:j.chatListDom;y&&u.animateScroll(y.scrollHeight,y)},100),me=()=>{r.deleteChatRecord().then(()=>{console.log("Chat records deleted successfully!")}),d.value=oe},be=(u,y)=>{if(!u){V({message:"请输入API Key",type:"warning"});return}p(u),n.value=y,V({message:"保存成功",type:"success"}),s.value=!1},ye=async()=>{const u=await r.getChatRecord();u&&(d.value=u)};return ne(()=>{var u;i()===""&&(s.value=!0),(u=b.value)==null||u.getFocus(),ye(),G(),te()}),Ve(()=>{L(()=>{te()})}),O(d,()=>{L(()=>{W()})},{deep:!0}),(u,y)=>(w(),x(J,null,[c("div",jt,[h(ht,{onConfig:pe}),c("div",{class:m(["flex-1 overflow-hidden mt-16",{"mb-24":!a(l),"mb-10":a(l)}])},[h(bt,{ref_key:"chatContentRef",ref:v,messages:a(d),"role-alias":o,"is-mobile":a(l),onScrollBottom:a(W)},null,8,["messages","is-mobile","onScrollBottom"])],2),h(gt,{ref_key:"chatInputRef",ref:b,"is-talking":a(g),"is-mobile":a(l),onSend:ue,onDelete:me},null,8,["is-talking","is-mobile"])]),h(ft,{modelValue:a(s),"onUpdate:modelValue":y[0]||(y[0]=j=>Ee(s)?s.value=j:null),"api-key":a(i)(),"gpt-version":a(n),"gpt-version-list":a(e),onSave:be},null,8,["modelValue","api-key","gpt-version","gpt-version-list"])],64))}});export{Tt as default};
