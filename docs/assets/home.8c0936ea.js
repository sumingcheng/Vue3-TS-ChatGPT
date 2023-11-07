var be=Object.defineProperty;var pe=(e,t,o)=>t in e?be(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var w=(e,t,o)=>(pe(e,typeof t!="symbol"?t+"":t,o),o);import{o as l,c as p,aj as me,ak as ye,a as s,C as he,r as u,w as ge,Y as ve,n as S,f as _e,u as d,L as V,S as b,Q as g,M,ab as U,x as E,ac as we,s as fe,al as C,U as je,P as G,a9 as xe}from"./@vue.14a7b677.js";import{_ as Se}from"./index.fd66e581.js";import{C as I}from"./crypto-js.6aa1dd77.js";import{E as B,a as D,b as H,c as Ee,d as Ce,e as De}from"./element-plus.d2cfb5b0.js";import{H as k,j as Be,p as ke,g as Fe,a as Ie,r as Te,s as Ne,b as Ae,c as Ke,l as Re,d as Ve,x as Me,e as Le,f as $e,h as Oe}from"./highlight.js.243975e6.js";import{m as Z,_ as Pe}from"./marked.71c0c359.js";import"./vue-router.59776677.js";import"./@element-plus.df50e9cf.js";import"./@ctrl.b082b0c1.js";import"./@vueuse.f2d0f84a.js";import"./@popperjs.36402333.js";import"./lodash-es.6aaf5ee5.js";const qe="/Vue3-TS-ChatGPT/assets/3.c13c7547.svg",L=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),W=[{role:"system",content:"I want you to act as a professional programmer, providing rigorous and comprehensible answers to my questions. When I present you with a programming query or scenario, respond with the precision and clarity expected of an experienced developer. Ensure your explanations are thorough yet easy to understand, employing technical terminology accurately. Your responses should reflect the expertise and insight of a seasoned programmer, aiding in not just solving the presented issue, but also offering a deeper understanding of the underlying concepts involved."},{role:"assistant",content:"\u4F60\u597D\uFF0C\u6211\u662F\u795E\u5947\u6D77\u87BA\uFF0C\u6B22\u8FCE\u63D0\u95EE"}],f=class{constructor(){w(this,"dbName","ChatAppDB");w(this,"objectStoreName","chatRecords");w(this,"chatRecordKey","chatRecordKey");w(this,"isIndexedDBSupported","indexedDB"in window)}static getInstance(){return f.instance||(f.instance=new f),f.instance}initDB(){return new Promise((t,o)=>{const c=indexedDB.open(this.dbName,1);c.onerror=m=>{o("Failed to open IndexedDB")},c.onsuccess=m=>{t(m.target.result)},c.onupgradeneeded=m=>{const j=m.target.result;j.objectStoreNames.contains(this.objectStoreName)||j.createObjectStore(this.objectStoreName)}})}async saveChatRecord(t){this.isIndexedDBSupported?(await this.initDB()).transaction([this.objectStoreName],"readwrite").objectStore(this.objectStoreName).put(t,this.chatRecordKey):localStorage.setItem(this.chatRecordKey,JSON.stringify(t))}async getChatRecord(){if(this.isIndexedDBSupported){const t=await this.initDB();return new Promise((o,c)=>{const r=t.transaction([this.objectStoreName]).objectStore(this.objectStoreName).get(this.chatRecordKey);r.onerror=v=>{c("Failed to fetch record from IndexedDB")},r.onsuccess=v=>{o(r.result)}})}else{const t=localStorage.getItem(this.chatRecordKey);return t?JSON.parse(t):null}}async deleteChatRecord(){this.isIndexedDBSupported?(await this.initDB()).transaction([this.objectStoreName],"readwrite").objectStore(this.objectStoreName).delete(this.chatRecordKey):localStorage.removeItem(this.chatRecordKey)}};let F=f;w(F,"instance");const ze={},Je=e=>(me("data-v-107fce48"),e=e(),ye(),e),Ue={class:"box"},Ge=Je(()=>s("div",{class:"loading"},[s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div")],-1)),He=[Ge];function We(e,t){return l(),p("div",Ue,He)}const Ye=Se(ze,[["render",We],["__scopeId","data-v-107fce48"]]);async function Qe(e,t,o){try{return{status:"success",data:(await fetch("https://api.openai.com/v1/chat/completions",{method:"post",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:o,stream:!0,messages:e})})).body}}catch(c){return{status:"error",message:c}}}const ee="SuMingcheng";I.enc.Utf8.parse("ThisIsAnIV123456");function Xe(e){return I.AES.encrypt(e,ee).toString()}function Ze(e){return e==null?"":I.AES.decrypt(e,ee).toString(I.enc.Utf8)}const et=new TextDecoder("utf-8"),Y={get(e){return Ze(window.localStorage.getItem(e))},set(e,t){window.localStorage.setItem(e,Xe(t))},remove(e){window.localStorage.removeItem(e)}},Q=()=>{window.open("https://github.com/sumingcheng/Vue3-TS-ChatGPT")};function tt(e){const t=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});return e.sort((o,c)=>t.compare(o.id,c.id))}function ot(){return{getKey:()=>{const o=Y.get("apiKey");return o===null?"":o},setKey:o=>Y.set("apiKey",o)}}const at=e=>{if(e)scrollTo(0,e.scrollHeight);else return},st=e=>{navigator.clipboard.writeText(e).then(function(){B({message:"\u5DF2\u590D\u5236",type:"success"})},function(t){console.error("\u65E0\u6CD5\u590D\u5236\u6587\u672C: ",t)})},X=()=>{const e=document.getElementsByClassName("copyNode");Array.from(e).forEach(o=>{o.copyAction&&o.removeEventListener("click",o.copyAction),o.copyAction=()=>{st(o.nextSibling.textContent)},o.addEventListener("click",o.copyAction)})},T=new Pe,nt={javascript:Be,python:ke,go:Fe,java:Ie,rust:Te,shell:Ne,php:Ae,sql:Ke,less:Re,css:Ve,xml:Me,json:Le,c:$e,cpp:Oe};for(const[e,t]of Object.entries(nt))k.registerLanguage(e,t);T.text=function(e){return e.startsWith("$")&&e.endsWith("$")?`<span class='math'>${e.slice(1,-1)}</span>`:e};T.paragraph=function(e){return e.startsWith("$$")&&e.endsWith("$$")?`<div class='math'>${e.slice(2,-2)}</div>`:"<p>"+e+`</p>
`};T.code=(e,t)=>{const c=!!(t&&k.getLanguage(t))?k.highlight(e,{language:t}).value:k.highlightAuto(e).value;return`<pre class='clearfix'><button class='copyNode'>Copy</button><code class='${t} hljs'>${c}</code></pre>
`};Z.setOptions({renderer:T});const dt=e=>Z(e),it=[{id:"text-search-babbage-doc-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-16k-0613",object:"model",created:1685474247,owned_by:"openai"},{id:"curie-search-query",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-16k",object:"model",created:1683758102,owned_by:"openai-internal"},{id:"text-search-babbage-query-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"babbage",object:"model",created:1649358449,owned_by:"openai"},{id:"babbage-search-query",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-babbage-001",object:"model",created:1649364043,owned_by:"openai"},{id:"whisper-1",object:"model",created:1677532384,owned_by:"openai-internal"},{id:"text-similarity-davinci-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"gpt-4-1106-preview",object:"model",created:1698957206,owned_by:"system"},{id:"davinci-similarity",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"code-davinci-edit-001",object:"model",created:1649880484,owned_by:"openai"},{id:"curie-similarity",object:"model",created:1651172510,owned_by:"openai-dev"},{id:"babbage-search-document",object:"model",created:1651172510,owned_by:"openai-dev"},{id:"curie-instruct-beta",object:"model",created:1649364042,owned_by:"openai"},{id:"text-search-ada-doc-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"davinci-instruct-beta",object:"model",created:1649364042,owned_by:"openai"},{id:"gpt-4",object:"model",created:1687882411,owned_by:"openai"},{id:"text-similarity-babbage-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"text-search-davinci-doc-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"babbage-similarity",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"text-embedding-ada-002",object:"model",created:1671217299,owned_by:"openai-internal"},{id:"davinci-search-query",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"gpt-4-vision-preview",object:"model",created:1698894917,owned_by:"system"},{id:"text-similarity-curie-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"text-davinci-001",object:"model",created:1649364042,owned_by:"openai"},{id:"text-search-davinci-query-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"ada-search-document",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"ada-code-search-code",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"babbage-002",object:"model",created:1692634615,owned_by:"system"},{id:"davinci-002",object:"model",created:1692634301,owned_by:"system"},{id:"tts-1",object:"model",created:1681940951,owned_by:"openai-internal"},{id:"davinci-search-document",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"curie-search-document",object:"model",created:1651172508,owned_by:"openai-dev"},{id:"babbage-code-search-code",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-1106",object:"model",created:1698959748,owned_by:"system"},{id:"text-search-ada-query-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"code-search-ada-text-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"babbage-code-search-text",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"code-search-babbage-code-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"ada-search-query",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"ada-code-search-text",object:"model",created:1651172510,owned_by:"openai-dev"},{id:"tts-1-hd",object:"model",created:1699046015,owned_by:"system"},{id:"text-search-curie-query-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-davinci-002",object:"model",created:1649880484,owned_by:"openai"},{id:"tts-1-1106",object:"model",created:1699053241,owned_by:"system"},{id:"text-davinci-edit-001",object:"model",created:1649809179,owned_by:"openai"},{id:"code-search-babbage-text-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"tts-1-hd-1106",object:"model",created:1699053533,owned_by:"system"},{id:"gpt-3.5-turbo",object:"model",created:1677610602,owned_by:"openai"},{id:"gpt-3.5-turbo-instruct-0914",object:"model",created:1694122472,owned_by:"system"},{id:"ada",object:"model",created:1649357491,owned_by:"openai"},{id:"text-ada-001",object:"model",created:1649364042,owned_by:"openai"},{id:"ada-similarity",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"code-search-ada-code-001",object:"model",created:1651172507,owned_by:"openai-dev"},{id:"text-similarity-ada-001",object:"model",created:1651172505,owned_by:"openai-dev"},{id:"gpt-3.5-turbo-0301",object:"model",created:1677649963,owned_by:"openai"},{id:"gpt-3.5-turbo-instruct",object:"model",created:1692901427,owned_by:"system"},{id:"text-search-curie-doc-001",object:"model",created:1651172509,owned_by:"openai-dev"},{id:"text-davinci-003",object:"model",created:1669599635,owned_by:"openai-internal"},{id:"gpt-4-0613",object:"model",created:1686588896,owned_by:"openai"},{id:"text-curie-001",object:"model",created:1649364043,owned_by:"openai"},{id:"curie",object:"model",created:1649359874,owned_by:"openai"},{id:"gpt-4-0314",object:"model",created:1687882410,owned_by:"openai"},{id:"davinci",object:"model",created:1649359874,owned_by:"openai"},{id:"dall-e-2",object:"model",created:1698798177,owned_by:"system"},{id:"gpt-3.5-turbo-0613",object:"model",created:1686587434,owned_by:"openai"},{id:"dall-e-3",object:"model",created:1698785189,owned_by:"system"}],ct={class:"flex flex-col h-screen relative"},rt={class:"flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bgColor z-50"},lt=s("div",{class:"text-2xl font-bold text-white"},"\u795E\u5947\u6D77\u87BA",-1),ut={key:0,class:"ml-4 text-sm text-white"},bt=s("img",{loading:"lazy",src:"https://img.shields.io/github/stars/sumingcheng/Vue3-TS-ChatGPT?logo=github",alt:"GitHub"},null,-1),pt=[bt],mt={class:"flex-1 mt-16 content",ref:"observedDiv"},yt={class:"font-bold mb-3 text-lg"},ht=["innerHTML"],gt={class:"flex flex-nowrap fixed w-full p-6 bgColor bottom-0 z-50"},vt={class:"flex items-center w-full"},_t=s("img",{src:qe,alt:"\u8FD4\u56DE\u5E95\u90E8"},null,-1),wt=[_t],ft={class:"bottom-0 w-full p-6 pb-8"},jt={class:"flex items-center"},xt=s("span",{class:"w-1/6 font-bold"},"API Key",-1),St={class:"flex items-center mt-5"},Et=s("span",{class:"w-1/6 font-bold"},"\u7248\u672C",-1),Lt=he({__name:"home",setup(e){const t=tt(it),o=F.getInstance(),{getKey:c,setKey:m}=ot(),j={user:"ME",assistant:"Magic Conch",system:"System"},r=u(W),v=u("gpt-3.5-turbo");let N=u(!1);const A=u(null),y=u(!1),K=u(),te=u(!1);let _=u(""),h=u("");const $=()=>{window.MathJax?oe():setTimeout($,100)},oe=()=>{fe(()=>{r.value.forEach(i=>{i.content&&i.content.includes("$")&&S(()=>{window.MathJax.typesetPromise()})})})},ae=()=>{if(!h.value){B({message:"\u8BF7\u8F93\u5165API Key",type:"warning"});return}m(h.value),B({message:"\u4FDD\u5B58\u6210\u529F",type:"success"}),y.value=!1},se=()=>{_.value=""},O=i=>{r.value[r.value.length-1].content+=i},ne=async i=>{try{const n=i.data.getReader();await P(n)}catch(n){console.error("Error updating message list:",n)}},P=async i=>{const{done:n,value:x}=await i.read();if(n){i.closed;return}const a=et.decode(x).match(/data: \s*({.*?}]})/g);a==null||a.forEach(re=>{var J;const le=re.replace("data: ",""),ue=JSON.parse(le);O((J=ue.choices[0].delta.content)!=null?J:"")}),await P(i)},q=async(i=_.value)=>{if(!i){B({message:"\u8BF7\u8F93\u5165\u5185\u5BB9",type:"info"});return}N.value=!0,r.value.length===2&&r.value.pop(),r.value.push({role:"user",content:i}),se(),r.value.push({role:"assistant",content:""});const n=await Qe(r.value,c(),v.value);n.status==="success"&&n.data?await ne(n):O(n.message),N.value=!1,z();const x=JSON.stringify(r.value),a=JSON.parse(x);o.saveChatRecord(a).then(()=>{console.log("Chat records saved successfully!")})},z=()=>{S(()=>{A.value&&A.value.focus()})},de=()=>{y.value=!0;let i=c();i&&(h.value=i)},R=()=>{S(()=>{K.value&&at(K.value)})},ie=()=>{o.deleteChatRecord().then(()=>{console.log("Chat records deleted successfully!")}),r.value=W},ce=async()=>{const i=await o.getChatRecord();i&&(r.value=i,R())};return ge(r.value,()=>{console.log("goToTheBottom()",r.value),S(()=>{te.value||R()})},{deep:!0,immediate:!0}),ve(()=>{S(()=>{X()})}),_e(()=>{c()===""&&(y.value=!0),z(),ce(),$(),X()}),(i,n)=>{const x=xe("DeleteFilled");return l(),p(M,null,[s("div",ct,[s("div",rt,[lt,d(L)?V("",!0):(l(),p("div",ut," \u53EF\u4EE5\u547C\u5524\u795E\u5947\u6D77\u87BA\uFF0C\u795E\u5947\u6D77\u87BA\u4F1A\u5E2E\u4F60\u89E3\u51B3\u95EE\u9898 ")),d(L)?V("",!0):(l(),p("div",{key:1,class:"ml-4 my-auto cursor-pointer",onClick:n[0]||(n[0]=(...a)=>d(Q)&&d(Q)(...a))},pt)),s("div",{class:"ml-auto text-sm cursor-pointer",onClick:de},[b(d(D),{size:"large",type:"info",class:"elBtnStyle text-4xl"},{default:g(()=>[C("\u8BBE\u7F6E")]),_:1})])]),s("div",mt,[s("div",{class:"mx-10 mt-6 mb-24",ref_key:"chatListDom",ref:K},[(l(!0),p(M,null,U(d(r).filter(a=>a.role!=="system"),a=>(l(),p("div",null,[s("div",yt,je(j[a.role])+"\uFF1A",1),a.content?(l(),p("div",{key:0,class:"text-base text-black whitespace-pre-wrap",innerHTML:d(dt)(a.content.replace(/^\n\n/,""))},null,8,ht)):(l(),G(Ye,{key:1}))]))),256))],512)],512),s("div",gt,[s("div",vt,[b(d(H),{class:"input",rows:1,type:"textarea",ref_key:"myInput",ref:A,modelValue:d(_),"onUpdate:modelValue":n[1]||(n[1]=a=>E(_)?_.value=a:_=a),size:"large",onKeydown:n[2]||(n[2]=we(a=>q(),["enter"])),disabled:d(N)},null,8,["modelValue","disabled"]),b(d(D),{onClick:n[3]||(n[3]=a=>q()),size:"large",type:"info",class:"elBtnStyle text-5xl ml-5"},{default:g(()=>[C("\u53D1\u9001")]),_:1}),s("div",{class:"triangle ml-4 cursor-pointer",onClick:ie},[b(x)]),d(L)?V("",!0):(l(),p("div",{key:0,class:"triangle ml-4 cursor-pointer",onClick:R},wt))])])]),b(d(Ee),{modelValue:d(y),"onUpdate:modelValue":n[7]||(n[7]=a=>E(y)?y.value=a:null),title:"\u8BBE\u7F6E",width:"80%",center:""},{footer:g(()=>[s("span",null,[b(d(D),{onClick:n[6]||(n[6]=a=>y.value=!1)},{default:g(()=>[C("\u5173\u95ED")]),_:1}),b(d(D),{type:"primary",onClick:ae,class:"fix-primary"},{default:g(()=>[C("\u4FDD\u5B58")]),_:1})])]),default:g(()=>[s("div",ft,[s("div",jt,[xt,b(d(H),{placeholder:"sk-xxxxxxxxxx",modelValue:d(h),"onUpdate:modelValue":n[4]||(n[4]=a=>E(h)?h.value=a:h=a),size:"large",clearable:""},null,8,["modelValue"])]),s("div",St,[Et,b(d(Ce),{size:"large",class:"w-full",modelValue:d(v),"onUpdate:modelValue":n[5]||(n[5]=a=>E(v)?v.value=a:null)},{default:g(()=>[(l(!0),p(M,null,U(d(t),a=>(l(),G(d(De),{key:a.id,label:a.id,value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])]),_:1},8,["modelValue"])],64)}}});export{Lt as default};
