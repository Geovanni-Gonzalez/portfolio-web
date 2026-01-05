import{j as t}from"./jsx-runtime.ClP7wGfN.js";import{r as d}from"./index.DK-fsZOb.js";import{c}from"./createLucideIcon.BzBjTmwi.js";import{G as p}from"./github.C22VTPpa.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],u=c("check",h);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],y=c("copy",x);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],v=c("linkedin",m);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],k=c("mail",b);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],g=c("map-pin",f);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],N=c("phone",j);function C({contactInfo:a}){const[n,l]=d.useState(null),i=[{icon:k,label:a.email,value:a.email,type:"copy"},{icon:N,label:a.phone,value:a.phone,type:"copy"},{icon:v,label:"LinkedIn",value:a.linkedin,type:"link"},{icon:p,label:"GitHub",value:a.github,type:"link"},{icon:g,label:a.location,value:null,type:"text"}],r=(e,o)=>{e.type==="copy"?(navigator.clipboard.writeText(e.value),l(o),setTimeout(()=>l(null),2e3)):e.type==="link"&&window.open(e.value,"_blank","noopener,noreferrer")};return t.jsx("div",{className:"flex flex-col gap-4 w-full",children:i.map((e,o)=>{const s=e.icon;return t.jsxs("button",{onClick:()=>r(e,o),className:`
              group w-full flex items-center gap-4 p-4 rounded-xl border border-text/10 bg-bg/50 backdrop-blur-sm text-muted 
              hover:border-accent/50 hover:text-text hover:bg-bg/80 transition-all duration-300 relative overflow-hidden
              ${e.type!=="text"?"cursor-pointer":"cursor-default"}
            `,children:[t.jsx("div",{className:"p-2 rounded-lg bg-text/5 group-hover:bg-accent/10 transition-colors duration-300",children:t.jsx(s,{className:"w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300"})}),t.jsx("span",{className:"flex-1 text-left font-medium truncate",children:e.label}),e.type==="copy"&&t.jsxs("div",{className:"relative",children:[t.jsx("div",{className:`transition-all duration-300 ${n===o?"opacity-0 scale-50":"opacity-100 scale-100"}`,children:t.jsx(y,{className:"w-4 h-4 text-muted group-hover:text-accent"})}),t.jsx("div",{className:`absolute inset-0 flex items-center justify-center transition-all duration-300 ${n===o?"opacity-100 scale-100":"opacity-0 scale-150"}`,children:t.jsx(u,{className:"w-4 h-4 text-green-500"})})]})]},o)})})}export{C as default};
