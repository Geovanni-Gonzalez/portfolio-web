import{j as o}from"./jsx-runtime.ClP7wGfN.js";import{r}from"./index.DK-fsZOb.js";import{S as m}from"./sun.BBkYEwoZ.js";import{c as l}from"./createLucideIcon.BzBjTmwi.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],g=l("moon",h);function k(){const[e,a]=r.useState("dark"),[s,n]=r.useState(!1);r.useEffect(()=>{const t=localStorage.getItem("theme"),d=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",i=t||d;a(i),document.documentElement.setAttribute("data-theme",i)},[]);const c=()=>{n(!0);const t=e==="dark"?"light":"dark";a(t),document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t),setTimeout(()=>n(!1),300)};return o.jsxs("button",{onClick:c,className:`
        relative p-2.5 rounded-xl transition-all duration-300 group
        ${e==="dark"?"bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-orange-500/50":"bg-white/80 hover:bg-orange-50 border border-zinc-200 hover:border-orange-300"}
        ${s?"scale-95":"scale-100 hover:scale-105"}
        backdrop-blur-sm shadow-lg
      `,"aria-label":`Switch to ${e==="dark"?"light":"dark"} mode`,title:`Switch to ${e==="dark"?"light":"dark"} mode`,children:[o.jsx("div",{className:`transition-all duration-300 ${s?"rotate-180":"rotate-0"}`,children:e==="dark"?o.jsx(m,{className:"w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors"}):o.jsx(g,{className:"w-5 h-5 text-zinc-700 group-hover:text-orange-600 transition-colors"})}),o.jsx("div",{className:`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
        ${e==="dark"?"bg-orange-500/20 blur-md":"bg-orange-300/30 blur-md"}
      `})]})}export{k as default};
