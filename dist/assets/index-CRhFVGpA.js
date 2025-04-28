import{c as xe,a as ye,b as he,d as be,e as k,r as p,j as f,f as K,g as Q,h as X,i as ve,k as j,s as E,P as Ce,m as $e,l as ee,n as A,I as Se,o as V,p as Z,q as B}from"./index-EQlX5qql.js";const we=xe();function Ae(e){const{theme:t,name:o,props:r}=e;return!t||!t.components||!t.components[o]||!t.components[o].defaultProps?r:ye(t.components[o].defaultProps,r)}function ke({props:e,name:t,defaultTheme:o,themeId:r}){let n=he(o);return r&&(n=n[r]||n),Ae({theme:n,name:t,props:e})}const Me=be(),Pe=we("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[`maxWidth${k(String(o.maxWidth))}`],o.fixed&&t.fixed,o.disableGutters&&t.disableGutters]}}),je=e=>ke({props:e,name:"MuiContainer",defaultTheme:Me}),Ee=(e,t)=>{const o=l=>X(t,l),{classes:r,fixed:n,disableGutters:a,maxWidth:s}=e,i={root:["root",s&&`maxWidth${k(String(s))}`,n&&"fixed",a&&"disableGutters"]};return Q(i,o,r)};function Ie(e={}){const{createStyledComponent:t=Pe,useThemeProps:o=je,componentName:r="MuiContainer"}=e,n=t(({theme:s,ownerState:i})=>({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",...!i.disableGutters&&{paddingLeft:s.spacing(2),paddingRight:s.spacing(2),[s.breakpoints.up("sm")]:{paddingLeft:s.spacing(3),paddingRight:s.spacing(3)}}}),({theme:s,ownerState:i})=>i.fixed&&Object.keys(s.breakpoints.values).reduce((l,d)=>{const c=d,u=s.breakpoints.values[c];return u!==0&&(l[s.breakpoints.up(c)]={maxWidth:`${u}${s.breakpoints.unit}`}),l},{}),({theme:s,ownerState:i})=>({...i.maxWidth==="xs"&&{[s.breakpoints.up("xs")]:{maxWidth:Math.max(s.breakpoints.values.xs,444)}},...i.maxWidth&&i.maxWidth!=="xs"&&{[s.breakpoints.up(i.maxWidth)]:{maxWidth:`${s.breakpoints.values[i.maxWidth]}${s.breakpoints.unit}`}}}));return p.forwardRef(function(i,l){const d=o(i),{className:c,component:u="div",disableGutters:m=!1,fixed:g=!1,maxWidth:C="lg",classes:M,...N}=d,z={...d,component:u,disableGutters:m,fixed:g,maxWidth:C},F=Ee(z,r);return f.jsx(n,{as:u,ownerState:z,className:K(F.root,c),ref:l,...N})})}function ze(e){return X("MuiAlert",e)}const q=ve("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),Oe=j(f.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),Re=j(f.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),Te=j(f.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),We=j(f.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),Le=j(f.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),De=e=>{const{variant:t,color:o,severity:r,classes:n}=e,a={root:["root",`color${k(o||r)}`,`${t}${k(o||r)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return Q(a,ze,n)},Ne=E(Ce,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],t[`${o.variant}${k(o.color||o.severity)}`]]}})($e(({theme:e})=>{const t=e.palette.mode==="light"?V:Z,o=e.palette.mode==="light"?Z:V;return{...e.typography.body2,backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter(B(["light"])).map(([r])=>({props:{colorSeverity:r,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${r}Color`]:t(e.palette[r].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${r}StandardBg`]:o(e.palette[r].light,.9),[`& .${q.icon}`]:e.vars?{color:e.vars.palette.Alert[`${r}IconColor`]}:{color:e.palette[r].main}}})),...Object.entries(e.palette).filter(B(["light"])).map(([r])=>({props:{colorSeverity:r,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${r}Color`]:t(e.palette[r].light,.6),border:`1px solid ${(e.vars||e).palette[r].light}`,[`& .${q.icon}`]:e.vars?{color:e.vars.palette.Alert[`${r}IconColor`]}:{color:e.palette[r].main}}})),...Object.entries(e.palette).filter(B(["dark"])).map(([r])=>({props:{colorSeverity:r,variant:"filled"},style:{fontWeight:e.typography.fontWeightMedium,...e.vars?{color:e.vars.palette.Alert[`${r}FilledColor`],backgroundColor:e.vars.palette.Alert[`${r}FilledBg`]}:{backgroundColor:e.palette.mode==="dark"?e.palette[r].dark:e.palette[r].main,color:e.palette.getContrastText(e.palette[r].main)}}}))]}})),Fe=E("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),Be=E("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),He=E("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),Y={success:f.jsx(Oe,{fontSize:"inherit"}),warning:f.jsx(Re,{fontSize:"inherit"}),error:f.jsx(Te,{fontSize:"inherit"}),info:f.jsx(We,{fontSize:"inherit"})},Ot=p.forwardRef(function(t,o){const r=ee({props:t,name:"MuiAlert"}),{action:n,children:a,className:s,closeText:i="Close",color:l,components:d={},componentsProps:c={},icon:u,iconMapping:m=Y,onClose:g,role:C="alert",severity:M="success",slotProps:N={},slots:z={},variant:F="standard",...se}=r,$={...r,color:l,severity:M,variant:F,colorSeverity:l||M},O=De($),w={slots:{closeButton:d.CloseButton,closeIcon:d.CloseIcon,...z},slotProps:{...c,...N}},[ne,ie]=A("root",{ref:o,shouldForwardComponentProp:!0,className:K(O.root,s),elementType:Ne,externalForwardedProps:{...w,...se},ownerState:$,additionalProps:{role:C,elevation:0}}),[le,de]=A("icon",{className:O.icon,elementType:Fe,externalForwardedProps:w,ownerState:$}),[ce,pe]=A("message",{className:O.message,elementType:Be,externalForwardedProps:w,ownerState:$}),[U,_]=A("action",{className:O.action,elementType:He,externalForwardedProps:w,ownerState:$}),[ue,fe]=A("closeButton",{elementType:Se,externalForwardedProps:w,ownerState:$}),[me,ge]=A("closeIcon",{elementType:Le,externalForwardedProps:w,ownerState:$});return f.jsxs(ne,{...ie,children:[u!==!1?f.jsx(le,{...de,children:u||m[M]||Y[M]}):null,f.jsx(ce,{...pe,children:a}),n!=null?f.jsx(U,{..._,children:n}):null,n==null&&g?f.jsx(U,{..._,children:f.jsx(ue,{size:"small","aria-label":i,title:i,color:"inherit",onClick:g,...fe,children:f.jsx(me,{fontSize:"small",...ge})})}):null]})}),Rt=Ie({createStyledComponent:E("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[`maxWidth${k(String(o.maxWidth))}`],o.fixed&&t.fixed,o.disableGutters&&t.disableGutters]}}),useThemeProps:e=>ee({props:e,name:"MuiContainer"})});let Ge={data:""},Ue=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Ge,_e=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ve=/\/\*[^]*?\*\/|  +/g,J=/\n+/g,b=(e,t)=>{let o="",r="",n="";for(let a in e){let s=e[a];a[0]=="@"?a[1]=="i"?o=a+" "+s+";":r+=a[1]=="f"?b(s,a):a+"{"+b(s,a[1]=="k"?"":t)+"}":typeof s=="object"?r+=b(s,t?t.replace(/([^,])+/g,i=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):a):s!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=b.p?b.p(a,s):a+":"+s+";")}return o+(t&&n?t+"{"+n+"}":n)+r},y={},te=e=>{if(typeof e=="object"){let t="";for(let o in e)t+=o+te(e[o]);return t}return e},Ze=(e,t,o,r,n)=>{let a=te(e),s=y[a]||(y[a]=(l=>{let d=0,c=11;for(;d<l.length;)c=101*c+l.charCodeAt(d++)>>>0;return"go"+c})(a));if(!y[s]){let l=a!==e?e:(d=>{let c,u,m=[{}];for(;c=_e.exec(d.replace(Ve,""));)c[4]?m.shift():c[3]?(u=c[3].replace(J," ").trim(),m.unshift(m[0][u]=m[0][u]||{})):m[0][c[1]]=c[2].replace(J," ").trim();return m[0]})(e);y[s]=b(n?{["@keyframes "+s]:l}:l,o?"":"."+s)}let i=o&&y.g?y.g:null;return o&&(y.g=y[s]),((l,d,c,u)=>{u?d.data=d.data.replace(u,l):d.data.indexOf(l)===-1&&(d.data=c?l+d.data:d.data+l)})(y[s],t,r,i),s},qe=(e,t,o)=>e.reduce((r,n,a)=>{let s=t[a];if(s&&s.call){let i=s(o),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;s=l?"."+l:i&&typeof i=="object"?i.props?"":b(i,""):i===!1?"":i}return r+n+(s??"")},"");function D(e){let t=this||{},o=e.call?e(t.p):e;return Ze(o.unshift?o.raw?qe(o,[].slice.call(arguments,1),t.p):o.reduce((r,n)=>Object.assign(r,n&&n.call?n(t.p):n),{}):o,Ue(t.target),t.g,t.o,t.k)}let oe,H,G;D.bind({g:1});let h=D.bind({k:1});function Ye(e,t,o,r){b.p=t,oe=e,H=o,G=r}function v(e,t){let o=this||{};return function(){let r=arguments;function n(a,s){let i=Object.assign({},a),l=i.className||n.className;o.p=Object.assign({theme:H&&H()},i),o.o=/ *go\d+/.test(l),i.className=D.apply(o,r)+(l?" "+l:"");let d=e;return e[0]&&(d=i.as||e,delete i.as),G&&d[0]&&G(i),oe(d,i)}return n}}var Je=e=>typeof e=="function",L=(e,t)=>Je(e)?e(t):e,Ke=(()=>{let e=0;return()=>(++e).toString()})(),re=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Qe=20,ae=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Qe)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:o}=t;return ae(e,{type:e.toasts.find(a=>a.id===o.id)?1:0,toast:o});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(a=>a.id===r||r===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+n}))}}},T=[],W={toasts:[],pausedAt:void 0},S=e=>{W=ae(W,e),T.forEach(t=>{t(W)})},Xe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},et=(e={})=>{let[t,o]=p.useState(W);p.useEffect(()=>(T.push(o),()=>{let n=T.indexOf(o);n>-1&&T.splice(n,1)}),[t]);let r=t.toasts.map(n=>{var a,s,i;return{...e,...e[n.type],...n,removeDelay:n.removeDelay||((a=e[n.type])==null?void 0:a.removeDelay)||(e==null?void 0:e.removeDelay),duration:n.duration||((s=e[n.type])==null?void 0:s.duration)||(e==null?void 0:e.duration)||Xe[n.type],style:{...e.style,...(i=e[n.type])==null?void 0:i.style,...n.style}}});return{...t,toasts:r}},tt=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(o==null?void 0:o.id)||Ke()}),I=e=>(t,o)=>{let r=tt(t,e,o);return S({type:2,toast:r}),r.id},x=(e,t)=>I("blank")(e,t);x.error=I("error");x.success=I("success");x.loading=I("loading");x.custom=I("custom");x.dismiss=e=>{S({type:3,toastId:e})};x.remove=e=>S({type:4,toastId:e});x.promise=(e,t,o)=>{let r=x.loading(t.loading,{...o,...o==null?void 0:o.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let a=t.success?L(t.success,n):void 0;return a?x.success(a,{id:r,...o,...o==null?void 0:o.success}):x.dismiss(r),n}).catch(n=>{let a=t.error?L(t.error,n):void 0;a?x.error(a,{id:r,...o,...o==null?void 0:o.error}):x.dismiss(r)}),e};var ot=(e,t)=>{S({type:1,toast:{id:e,height:t}})},rt=()=>{S({type:5,time:Date.now()})},P=new Map,at=1e3,st=(e,t=at)=>{if(P.has(e))return;let o=setTimeout(()=>{P.delete(e),S({type:4,toastId:e})},t);P.set(e,o)},nt=e=>{let{toasts:t,pausedAt:o}=et(e);p.useEffect(()=>{if(o)return;let a=Date.now(),s=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(a-i.createdAt);if(l<0){i.visible&&x.dismiss(i.id);return}return setTimeout(()=>x.dismiss(i.id),l)});return()=>{s.forEach(i=>i&&clearTimeout(i))}},[t,o]);let r=p.useCallback(()=>{o&&S({type:6,time:Date.now()})},[o]),n=p.useCallback((a,s)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:d}=s||{},c=t.filter(g=>(g.position||d)===(a.position||d)&&g.height),u=c.findIndex(g=>g.id===a.id),m=c.filter((g,C)=>C<u&&g.visible).length;return c.filter(g=>g.visible).slice(...i?[m+1]:[0,m]).reduce((g,C)=>g+(C.height||0)+l,0)},[t]);return p.useEffect(()=>{t.forEach(a=>{if(a.dismissed)st(a.id,a.removeDelay);else{let s=P.get(a.id);s&&(clearTimeout(s),P.delete(a.id))}})},[t]),{toasts:t,handlers:{updateHeight:ot,startPause:rt,endPause:r,calculateOffset:n}}},it=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,lt=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,dt=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ct=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${it} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${lt} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${dt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,pt=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ut=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${pt} 1s linear infinite;
`,ft=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,mt=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,gt=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ft} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${mt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,xt=v("div")`
  position: absolute;
`,yt=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ht=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,bt=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ht} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,vt=({toast:e})=>{let{icon:t,type:o,iconTheme:r}=e;return t!==void 0?typeof t=="string"?p.createElement(bt,null,t):t:o==="blank"?null:p.createElement(yt,null,p.createElement(ut,{...r}),o!=="loading"&&p.createElement(xt,null,o==="error"?p.createElement(ct,{...r}):p.createElement(gt,{...r})))},Ct=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,$t=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,St="0%{opacity:0;} 100%{opacity:1;}",wt="0%{opacity:1;} 100%{opacity:0;}",At=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,kt=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Mt=(e,t)=>{let o=e.includes("top")?1:-1,[r,n]=re()?[St,wt]:[Ct(o),$t(o)];return{animation:t?`${h(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Pt=p.memo(({toast:e,position:t,style:o,children:r})=>{let n=e.height?Mt(e.position||t||"top-center",e.visible):{opacity:0},a=p.createElement(vt,{toast:e}),s=p.createElement(kt,{...e.ariaProps},L(e.message,e));return p.createElement(At,{className:e.className,style:{...n,...o,...e.style}},typeof r=="function"?r({icon:a,message:s}):p.createElement(p.Fragment,null,a,s))});Ye(p.createElement);var jt=({id:e,className:t,style:o,onHeightUpdate:r,children:n})=>{let a=p.useCallback(s=>{if(s){let i=()=>{let l=s.getBoundingClientRect().height;r(e,l)};i(),new MutationObserver(i).observe(s,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return p.createElement("div",{ref:a,className:t,style:o},n)},Et=(e,t)=>{let o=e.includes("top"),r=o?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:re()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...r,...n}},It=D`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,R=16,Tt=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:r,children:n,containerStyle:a,containerClassName:s})=>{let{toasts:i,handlers:l}=nt(o);return p.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:R,left:R,right:R,bottom:R,pointerEvents:"none",...a},className:s,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(d=>{let c=d.position||t,u=l.calculateOffset(d,{reverseOrder:e,gutter:r,defaultPosition:t}),m=Et(c,u);return p.createElement(jt,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?It:"",style:m},d.type==="custom"?L(d.message,d):n?n(d):p.createElement(Pt,{toast:d,position:c}))}))},Wt=x;export{Ot as A,Rt as C,Tt as D,Wt as k};
