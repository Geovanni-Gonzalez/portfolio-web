import{j as a}from"./jsx-runtime.ClP7wGfN.js";import{r as d}from"./index.DK-fsZOb.js";import{M as u,L as x}from"./mail.BeoeqEMF.js";import{c as r}from"./createLucideIcon.BzBjTmwi.js";import{G as h}from"./github.C22VTPpa.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],y=r("check",b);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],g=r("copy",v);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],f=r("map-pin",m);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],j=r("phone",k);function $({contactInfo:l}){const[t,n]=d.useState(null),c=[{icon:u,label:l.email,value:l.email,type:"copy"},{icon:j,label:l.phone,value:l.phone,type:"copy"},{icon:x,label:"LinkedIn",value:l.linkedin,type:"link"},{icon:h,label:"GitHub",value:l.github,type:"link"},{icon:f,label:l.location,value:null,type:"text"}],i=async(e,o)=>{e.type==="copy"?(await navigator.clipboard.writeText(e.value),n(o),setTimeout(()=>n(null),2e3)):e.type==="link"&&window.open(e.value,"_blank","noopener,noreferrer")},s=(e,o)=>{const p=e.icon;return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"rounded-lg bg-text/5 p-2 transition-colors duration-300 group-hover:bg-orange-500/10",children:a.jsx(p,{className:"h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:scale-110"})}),a.jsx("span",{className:"flex-1 truncate text-left font-medium",children:e.label}),e.type==="copy"&&a.jsxs("span",{className:"relative","aria-hidden":"true",children:[a.jsx("span",{className:`transition-all duration-300 ${t===o?"scale-50 opacity-0":"scale-100 opacity-100"}`,children:a.jsx(g,{className:"h-4 w-4 text-[var(--color-muted)] group-hover:text-orange-500"})}),a.jsx("span",{className:`absolute inset-0 flex items-center justify-center transition-all duration-300 ${t===o?"scale-100 opacity-100":"scale-150 opacity-0"}`,children:a.jsx(y,{className:"h-4 w-4 text-green-500"})})]})]})};return a.jsx("div",{className:"flex w-full flex-col gap-4",children:c.map((e,o)=>e.type==="text"?a.jsx("div",{className:"group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-text/10 bg-bg/50 p-4 text-[var(--color-muted)] backdrop-blur-sm",children:s(e,o)},e.label):a.jsx("button",{type:"button",onClick:()=>i(e,o),"aria-label":e.type==="copy"?`Copiar ${e.label}`:e.label,className:"group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-text/10 bg-bg/50 p-4 text-[var(--color-muted)] backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-bg/80 hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",children:s(e,o)},e.label))})}export{$ as default};
