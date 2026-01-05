import{j as o}from"./jsx-runtime.ClP7wGfN.js";import{r as t}from"./index.DK-fsZOb.js";import{c as n}from"./createLucideIcon.BzBjTmwi.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],l=n("arrow-up",i);function u(){const[a,e]=t.useState(!1);t.useEffect(()=>{const r=()=>{window.scrollY>300?e(!0):e(!1)};return window.addEventListener("scroll",r),()=>window.removeEventListener("scroll",r)},[]);const s=()=>{window.scrollTo({top:0,behavior:"smooth"})};return o.jsxs("button",{onClick:s,className:`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 transform border border-orange-400/20 group
        ${a?"opacity-100 translate-y-0":"opacity-0 translate-y-4 pointer-events-none"}
        bg-white/80 dark:bg-black/50 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white hover:scale-110 hover:shadow-orange-500/30
      `,"aria-label":"Volver arriba",children:[o.jsx(l,{className:"w-6 h-6 stroke-[3px]"}),o.jsx("span",{className:"absolute inset-0 rounded-full bg-orange-400/20 opacity-0 group-hover:opacity-100 animate-pulse -z-10"})]})}export{u as default};
