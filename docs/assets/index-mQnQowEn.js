const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BnRdR30x.js","assets/vendor/crypto-js-Ci0zXM0r.js","assets/vendor/element-plus-Buyz4oKF.js","assets/vendor/-DG6odqa_.js","assets/vendor/lodash-es-ut2NwUtB.js","assets/vendor/element-plus-Cd4dbc8K.css","assets/vendor/lodash-eWJlexCj.js","assets/vendor/smooth-scroll-DWzhxnP0.js","assets/vendor/highlight.js-Be3YRpZp.js","assets/vendor/highlight-BfC0goYb.css","assets/vendor/marked-COKqZZmD.js","assets/vendor/vue-router-BbBv9qpx.js","assets/index-Bd2JmWk9.css"])))=>i.map(i=>d[i]);
import"./vendor/element-plus-Buyz4oKF.js";import{at as y,J as v,Z as E,_ as g,a0 as P,aE as w,aF as L}from"./vendor/-DG6odqa_.js";import{c as O,a as S}from"./vendor/vue-router-BbBv9qpx.js";import"./vendor/lodash-es-ut2NwUtB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const b=(a,s)=>{const o=a.__vccOpts||a;for(const[l,e]of s)o[l]=e;return o},A={};function R(a,s){const o=y("RouterView");return v(),E(w,null,{default:g(()=>[P(o)]),_:1})}const C=b(A,[["render",R]]),V="modulepreload",T=function(a){return"/Vue3-TS-ChatGPT/"+a},f={},d=function(s,o,l){let e=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),n=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));e=Promise.allSettled(o.map(c=>{if(c=T(c),c in f)return;f[c]=!0;const u=c.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":V,u||(i.as="script"),i.crossOrigin="",i.href=c,n&&i.setAttribute("nonce",n),document.head.appendChild(i),u)return new Promise((h,_)=>{i.addEventListener("load",h),i.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(t){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=t,window.dispatchEvent(n),!n.defaultPrevented)throw t}return e.then(t=>{for(const n of t||[])n.status==="rejected"&&r(n.reason);return s().catch(r)})},x=O({history:S(),routes:[{path:"/",name:"home",component:()=>d(()=>import("./index-BnRdR30x.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]))},{path:"/:catchAll(.*)",component:()=>d(()=>import("./index-BnRdR30x.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]))}]}),m=L(C);m.use(x);m.mount("#app");export{b as _};
