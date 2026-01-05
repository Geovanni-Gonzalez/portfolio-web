import{j as e}from"./jsx-runtime.ClP7wGfN.js";import{r as d}from"./index.DK-fsZOb.js";import{c as l}from"./createLucideIcon.BzBjTmwi.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],h=l("circle-alert",x);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],g=l("circle-check-big",p);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],f=l("loader-circle",b);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],v=l("send",y);function k({translations:t,formId:n}){const[a,r]=d.useState("idle"),[s,i]=d.useState({name:"",email:"",message:""}),m=async o=>{if(o.preventDefault(),!n){console.error("Formspree ID not found");return}r("submitting");try{(await fetch(`https://formspree.io/f/${n}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).ok?(r("success"),i({name:"",email:"",message:""}),setTimeout(()=>r("idle"),5e3)):r("error")}catch{r("error")}},c=o=>{i({...s,[o.target.name]:o.target.value})};return e.jsxs("form",{onSubmit:m,className:"p-6 sm:p-8 rounded-3xl border border-text/10 bg-bg/50 backdrop-blur-md shadow-xl flex flex-col gap-6 relative overflow-hidden group","aria-live":"polite","aria-busy":a==="submitting",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),a==="success"&&e.jsx("div",{role:"status","aria-live":"assertive",className:"absolute top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-10 animate-fade-in",children:t.sent}),a==="error"&&e.jsx("div",{role:"alert","aria-live":"assertive",className:"absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg z-10 animate-fade-in",children:t.error}),e.jsxs("div",{className:"relative space-y-2",children:[e.jsx("label",{htmlFor:"name",className:"text-sm font-semibold text-accent ml-1",children:t.name}),e.jsx("input",{id:"name",type:"text",name:"name",value:s.name,onChange:c,required:!0,placeholder:t.namePlaceholder,className:"w-full rounded-xl border border-text/10 bg-bg/50 p-4 text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300","aria-required":"true"})]}),e.jsxs("div",{className:"relative space-y-2",children:[e.jsx("label",{htmlFor:"email",className:"text-sm font-semibold text-accent ml-1",children:t.email}),e.jsx("input",{id:"email",type:"email",name:"email",value:s.email,onChange:c,required:!0,placeholder:t.emailPlaceholder,className:"w-full rounded-xl border border-text/10 bg-bg/50 p-4 text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"})]}),e.jsxs("div",{className:"relative space-y-2",children:[e.jsx("label",{htmlFor:"message",className:"text-sm font-semibold text-accent ml-1",children:t.message}),e.jsx("textarea",{id:"message",name:"message",rows:"4",value:s.message,onChange:c,required:!0,placeholder:t.messagePlaceholder,className:"w-full rounded-xl border border-text/10 bg-bg/50 p-4 text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y transition-all duration-300 min-h-[120px]"})]}),e.jsxs("button",{type:"submit",disabled:a==="submitting"||a==="success",className:`
          relative w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden
          ${a==="success"?"bg-green-500 hover:bg-green-600":"bg-accent hover:bg-accent-light hover:scale-[1.02]"}
          ${a==="error"?"bg-red-500 hover:bg-red-600":""}
          disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100
        `,children:[a==="idle"&&e.jsxs(e.Fragment,{children:[t.send," ",e.jsx(v,{className:"w-5 h-5"})]}),a==="submitting"&&e.jsx(f,{className:"w-6 h-6 animate-spin"}),a==="success"&&e.jsxs(e.Fragment,{children:[t.sent," ",e.jsx(g,{className:"w-6 h-6"})]}),a==="error"&&e.jsxs(e.Fragment,{children:[t.error," ",e.jsx(h,{className:"w-6 h-6"})]})]})]})}export{k as default};
