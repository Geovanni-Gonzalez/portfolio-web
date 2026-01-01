import{j as o}from"./jsx-runtime.ClP7wGfN.js";import{r as a}from"./index.DK-fsZOb.js";import{c}from"./createLucideIcon.BzBjTmwi.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],l=c("moon",h);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],u=c("sun",g);function x(){const[e,r]=a.useState("dark"),[s,n]=a.useState(!1);a.useEffect(()=>{const t=localStorage.getItem("theme"),m=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",i=t||m;r(i),document.documentElement.setAttribute("data-theme",i)},[]);const d=()=>{n(!0);const t=e==="dark"?"light":"dark";r(t),document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t),setTimeout(()=>n(!1),300)};return o.jsxs("button",{onClick:d,className:`
        relative p-2.5 rounded-xl transition-all duration-300 group
        ${e==="dark"?"bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-orange-500/50":"bg-white/80 hover:bg-orange-50 border border-zinc-200 hover:border-orange-300"}
        ${s?"scale-95":"scale-100 hover:scale-105"}
        backdrop-blur-sm shadow-lg
      `,"aria-label":`Switch to ${e==="dark"?"light":"dark"} mode`,title:`Switch to ${e==="dark"?"light":"dark"} mode`,children:[o.jsx("div",{className:`transition-all duration-300 ${s?"rotate-180":"rotate-0"}`,children:e==="dark"?o.jsx(u,{className:"w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors"}):o.jsx(l,{className:"w-5 h-5 text-zinc-700 group-hover:text-orange-600 transition-colors"})}),o.jsx("div",{className:`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
        ${e==="dark"?"bg-orange-500/20 blur-md":"bg-orange-300/30 blur-md"}
      `})]})}export{x as default};
