import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.Cd_vQiNd.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,o)=>o?o.toUpperCase():a.toLowerCase()),u=e=>{const t=w(e);return t.charAt(0).toUpperCase()+t.slice(1)},x=(...e)=>e.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim(),b=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=c.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:s="",children:l,iconNode:d,...m},n)=>c.createElement("svg",{ref:n,...p,width:t,height:t,stroke:e,strokeWidth:o?Number(a)*24/Number(t):a,className:x("lucide",s),...!l&&!b(m)&&{"aria-hidden":"true"},...m},[...d.map(([i,f])=>c.createElement(i,f)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(e,t)=>{const a=c.forwardRef(({className:o,...s},l)=>c.createElement(v,{ref:l,iconNode:t,className:x(`lucide-${g(u(e))}`,`lucide-${e}`,o),...s}));return a.displayName=u(e),a};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],N=h("chevron-left",j);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],C=h("chevron-right",y);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],$=h("github",k);function z({title:e,description:t,tech:a,repo:o,image:s}){return r.jsxs("div",{className:"flex flex-col bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-zinc-900/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-500 overflow-hidden w-full max-w-lg mx-auto h-full",children:[s&&r.jsxs("div",{className:"relative w-full h-40 sm:h-44 md:h-48 overflow-hidden",children:[r.jsx("img",{src:s,alt:`Captura de ${e}`,className:"absolute inset-0 w-full h-full object-contain transition-transform duration-700 hover:scale-105 bg-black",loading:"lazy"}),r.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"})]}),r.jsxs("div",{className:"flex flex-col flex-grow p-5 sm:p-6",children:[r.jsx("h3",{className:"text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg",children:e}),r.jsx("p",{className:"mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed flex-grow font-light tracking-wide",children:t}),a?.length>0&&r.jsx("div",{className:"mt-4 flex flex-wrap gap-2 text-xs sm:text-sm",children:a.map((l,d)=>r.jsx("span",{className:"bg-gradient-to-r from-orange-500/30 to-yellow-400/30 border border-orange-400 text-orange-200 px-3 py-1 rounded-full font-medium shadow-sm hover:scale-105 hover:shadow-md transition-transform duration-300",children:l},d))}),r.jsx("div",{className:"mt-6",children:r.jsxs("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-orange-500 hover:to-yellow-300 text-white text-sm sm:text-base font-semibold py-2 px-4 rounded-lg transition-transform duration-300 w-full text-center shadow-md hover:shadow-orange-400/30 hover:scale-[1.03]","aria-label":`Ver repositorio GitHub de ${e}`,children:[r.jsx($,{className:"mr-2 w-5 h-5",strokeWidth:1.5}),"Github"]})})]})]})}function E({projects:e}){const[t,a]=c.useState(0),o=c.useRef(null),s=5e3,l=()=>{o.current&&clearTimeout(o.current)};c.useEffect(()=>(l(),o.current=setTimeout(()=>{a(n=>(n+1)%e.length)},s),()=>l()),[t,e.length]);const d=()=>a(n=>(n-1+e.length)%e.length),m=()=>a(n=>(n+1)%e.length);return r.jsxs("div",{className:"relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto bg-gradient-to-br from-zinc-900/70 via-zinc-800/60 to-zinc-900/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg overflow-hidden",children:[r.jsxs("div",{className:"relative h-[520px] sm:h-[540px] md:h-[560px] overflow-hidden",children:[r.jsx("div",{className:"flex transition-transform duration-700 ease-in-out h-full",style:{transform:`translateX(-${t*100}%)`},children:e.map((n,i)=>r.jsx("div",{className:"w-full flex-shrink-0 px-2 h-full flex",children:r.jsx(z,{...n})},i))}),r.jsx("button",{onClick:d,className:"absolute left-3 top-1/2 -translate-y-1/2 bg-zinc-800/70 hover:bg-orange-600/60 hover:scale-110 transition-all text-white rounded-full p-3 shadow-md","aria-label":"Anterior",children:r.jsx(N,{className:"w-6 h-6"})}),r.jsx("button",{onClick:m,className:"absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-800/70 hover:bg-orange-600/60 hover:scale-110 transition-all text-white rounded-full p-3 shadow-md","aria-label":"Siguiente",children:r.jsx(C,{className:"w-6 h-6"})})]}),r.jsx("div",{className:"flex justify-center mt-6 gap-2",children:e.map((n,i)=>r.jsx("button",{onClick:()=>a(i),className:`w-3 h-3 rounded-full ${i===t?"bg-orange-500":"bg-yellow-400/40"} transition-all duration-300`,"aria-label":`Ir al proyecto ${i+1}`},i))})]})}export{E as default};
