// ==UserScript==
// @name         Krunker Cheat Loader
// @namespace    https://forum.sys32.dev/
// @icon         https://y9x.github.io/webpack/libs/gg.gif
// @version      1.22
// @match        https://krunker.io/*
// @match        https://*.browserfps.com/*
// @run-at       document-start
// @noframes
// ==/UserScript==

(()=>{var e={565:(e,t,r)=>{'use strict';var s=new(r(263));class n{}n.Types=[class{static id='rotate';constructor(e,t){this.name=e,this.data=t,this.content=s.crt_ele('div',{className:'setBodH'}),this.sub=s.add_ele('div',this.content,{className:'settName'}),this.label=s.add_ele('text',this.sub,{nodeValue:this.name}),this.select=s.add_ele('select',this.sub,{className:'inputGrey2',events:{change:()=>this.change()}});for(let e in this.data.value)s.add_ele('option',this.select,{value:e,textContent:e});this.init=!0,this.value=this.data.value,this.init=!1}get value(){return this.data.value[this.select.value]}set value(e){for(let t in this.data.value)this.data.value[t]==e&&(this.select.value=t);return this.select.value=e,this.change(),e}change(){'function'==typeof this.data.change&&this.data.change(this.init,this.value,(e=>this.select.value=e))}}],e.exports=n},415:(e,t,r)=>{var s=r(565);e.exports=class{constructor(){var e=this.list=[];this.id='a-'+Math.random().toString().slice(2),customElements.define(this.id,class extends HTMLElement{connectedCallback(){this.replaceWith(e[this.id].content)}})}html(){var e='';for(let t in this.list)e+=`<${this.id} id="${t}"></${this.id}>`;return e}add_control(e,t){for(let r of s.Types)if(r.id==t.type){let s=new r(e,t);return this.list.push(s),s}throw new TypeError('Unknown type: '+t.type)}}},144:e=>{'use strict';var t=e=>'object'==typeof e&&null!=e,r=e=>'string'==typeof e||e instanceof Location||e instanceof URL,s=e=>{if(t(e)){if(e instanceof Headers){let t={};for(let[r,s]of e)t[r]=s;return t}return e}return{}},n=e=>{if(!t(e))throw new TypeError('Input must be an object');var r={cache:'no-cache',headers:s(e.headers)},i=n.resolve(e);switch(e.cache){case!0:r.cache='force-cache';break;case'query':i.search+='?'+Date.now()}1==e.cache&&(r.cache='force-cache'),t(e.data)&&(r.method='POST',r.body=JSON.stringify(e.data),r.headers['content-type']='application/json'),'string'==typeof e.method&&(r.method=e.method),e.sync&&(r.xhr=!0,r.synchronous=!0);var a=['text','json','arrayBuffer'].includes(e.result)?e.result:'text';return(r.xhr?n.fetch_xhr:n.fetch)(i,r).then((e=>e[a]()))};n.fetch=window.fetch.bind(window),n.fetch_xhr=(e,t={})=>{if(!r(e))throw new TypeError('url param is not resolvable');e=new URL(e,location).href;var s='string'==typeof t.method?t.method:'GET',n=new XMLHttpRequest;return n.open(s,e,!t.synchronous),new Promise(((e,r)=>{n.addEventListener('load',(()=>e({text:async()=>n.responseText,json:async()=>JSON.parse(n.responseText),headers:new Headers}))),n.addEventListener('error',(e=>r(e.error))),n.send(t.body)}))},n.resolve=e=>{if(!r(e.target))throw new TypeError('Target must be specified');var t=new URL(e.target);return r(e.endpoint)&&(t=new URL(e.endpoint,t)),'object'==typeof e.query&&null!=e.query&&(t.search='?'+new URLSearchParams(Object.entries(e.query))),t},e.exports=n},263:e=>{'use strict';e.exports=class{is_host(e,...t){return t.some((t=>e.hostname==t||e.hostname.endsWith('.'+t)))}round(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}add_ele(e,t,r={}){var s=this.crt_ele(e,r);if('function'==typeof t)this.wait_for(t).then((e=>e.appendChild(s)));else{if('object'!=typeof t||null==t||!t.appendChild)throw new Error('Parent is not resolvable to a DOM element');t.appendChild(s)}return s}crt_ele(e,t={}){var r,s={};for(let e in t)'object'==typeof t[e]&&null!=t[e]&&(s[e]=t[e],delete t[e]);r='raw'==e?this.crt_ele('div',{innerHTML:t.html}).firstChild:'text'==e?document.createTextNode(''):document.createElement(e);var n=t.className;n&&(delete t.className,r.setAttribute('class',n));var i=s.events;if(i){delete s.events;for(let e in i)r.addEventListener(e,i[e])}Object.assign(r,t);for(let e in s)Object.assign(r[e],s[e]);return r}wait_for(e,t){return new Promise((r=>{var s,n=()=>{try{var t=e();if(t)return s&&clearInterval(s),r(t),!0}catch(e){console.log(e)}};s=n()||setInterval(n,t||50)}))}sanitize(e){var t=document.createElement('div');return t.textContent=e,t.innerHTML}unsanitize(e){var t=document.createElement('div');return t.innerHTML=e,t.textContent}node_tree(e,t=document){var r={parent:t},s=/^\$\s+>?/g,n=/^\^\s+>?/g;for(var i in e){var a=e[i];if(a instanceof Node)r[i]=a;else if('object'==typeof a)r[i]=this.node_tree(a,r.container);else if(s.test(e[i])){if(!r.container){console.warn('No container is available, could not access',a);continue}r[i]=r.container.querySelector(e[i].replace(s,''))}else if(n.test(e[i])){if(!r.parent){console.warn('No parent is available, could not access',a);continue}r[i]=r.parent.querySelector(e[i].replace(n,''))}else r[i]=t.querySelector(e[i]);r[i]||console.warn('No node found, could not access',a)}return r}string_key(e){return e.replace(/^([A-Z][a-z]+?)([A-Z0-9][a-z]*?)/,((e,t,r)=>['Digit','Key'].includes(t)?r:`${r} ${t}`))}clone_obj(e){return JSON.parse(JSON.stringify(e))}assign_deep(e,...t){for(let r in t)for(let s in t[r])'object'==typeof t[r][s]&&null!=t[r][s]&&s in e?this.assign_deep(e[s],t[r][s]):'object'==typeof e&&null!=e&&Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t[r],s));return e}filter_deep(e,t){for(let r in e)r in t||delete e[r],'object'==typeof t[r]&&null!=t[r]&&this.filter_deep(e[r],t[r]);return e}redirect(e,t,r){var s=Symbol();r.addEventListener(e,(e=>{e[s]})),t.addEventListener(e,(t=>r.dispatchEvent(Object.assign(new t.constructor(e,t),{[s]:!0,stopImmediatePropagation:t.stopImmediatePropagation.bind(t),preventDefault:t.preventDefault.bind(t)}))))}promise(){var e,t=new Promise(((t,r)=>e={resolve:t,reject:r}));return Object.assign(t,e),t.resolve_in=(e=0,r)=>setTimeout((()=>t.resolve(r)),e),t}rtn(e,t){return(e/t).toFixed()*t}}},619:e=>{'use strict';e.exports=class{is_host(e,...t){return t.some((t=>e.hostname==t||e.hostname.endsWith('.'+t)))}round(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}add_ele(e,t,r={}){var s=this.crt_ele(e,r);if('function'==typeof t)this.wait_for(t).then((e=>e.appendChild(s)));else{if('object'!=typeof t||null==t||!t.appendChild)throw new Error('Parent is not resolvable to a DOM element');t.appendChild(s)}return s}crt_ele(e,t={}){var r,s={};for(let e in t)'object'==typeof t[e]&&null!=t[e]&&(s[e]=t[e],delete t[e]);r='raw'==e?this.crt_ele('div',{innerHTML:t.html}).firstChild:'text'==e?document.createTextNode(''):document.createElement(e);var n=t.className;n&&(delete t.className,r.setAttribute('class',n));var i=s.events;if(i){delete s.events;for(let e in i)r.addEventListener(e,i[e])}Object.assign(r,t);for(let e in s)Object.assign(r[e],s[e]);return r}wait_for(e,t){return new Promise((r=>{var s,n=()=>{try{var t=e();if(t)return s&&clearInterval(s),r(t),!0}catch(e){console.log(e)}};s=n()||setInterval(n,t||50)}))}sanitize(e){var t=document.createElement('div');return t.textContent=e,t.innerHTML}unsanitize(e){var t=document.createElement('div');return t.innerHTML=e,t.textContent}node_tree(e,t=document){var r={parent:t},s=/^\$\s+>?/g,n=/^\^\s+>?/g;for(var i in e){var a=e[i];if(a instanceof Node)r[i]=a;else if('object'==typeof a)r[i]=this.node_tree(a,r.container);else if(s.test(e[i])){if(!r.container){console.warn('No container is available, could not access',a);continue}r[i]=r.container.querySelector(e[i].replace(s,''))}else if(n.test(e[i])){if(!r.parent){console.warn('No parent is available, could not access',a);continue}r[i]=r.parent.querySelector(e[i].replace(n,''))}else r[i]=t.querySelector(e[i]);r[i]||console.warn('No node found, could not access',a)}return r}string_key(e){return e.replace(/^([A-Z][a-z]+?)([A-Z0-9][a-z]*?)/,((e,t,r)=>['Digit','Key'].includes(t)?r:`${r} ${t}`))}clone_obj(e){return JSON.parse(JSON.stringify(e))}assign_deep(e,...t){for(let r in t)for(let s in t[r])'object'==typeof t[r][s]&&null!=t[r][s]&&s in e?this.assign_deep(e[s],t[r][s]):'object'==typeof e&&null!=e&&Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t[r],s));return e}filter_deep(e,t){for(let r in e)r in t||delete e[r],'object'==typeof t[r]&&null!=t[r]&&this.filter_deep(e[r],t[r]);return e}redirect(e,t,r){var s=Symbol();r.addEventListener(e,(e=>{e[s]})),t.addEventListener(e,(t=>r.dispatchEvent(Object.assign(new t.constructor(e,t),{[s]:!0,stopImmediatePropagation:t.stopImmediatePropagation.bind(t),preventDefault:t.preventDefault.bind(t)}))))}promise(){var e,t=new Promise(((t,r)=>e={resolve:t,reject:r}));return Object.assign(t,e),t.resolve_in=(e=0,r)=>setTimeout((()=>t.resolve(r)),e),t}rtn(e,t){return(e/t).toFixed()*t}}},871:e=>{'use strict';e.exports={name:'Krunker Cheat Loader',namespace:'https://forum.sys32.dev/',icon:'https://y9x.github.io/webpack/libs/gg.gif',version:1.22,match:['https://krunker.io/*','https://*.browserfps.com/*']}}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var i=t[s]={exports:{}};return e[s](i,i.exports,r),i.exports}(()=>{'use strict';var e=r(144),t=new(r(619)),s=r(415),n=r(871);var i=new class{type='Userscript';lock=!0;version=n.version;og_names={doge:'Dogeware',skid:'SkidFest',shit:'Sploit',sploit:'Sploit',junk:'Junker'};constructor(e){this.url=e,this.badge='[LOADER '+this.version+']',this.active=null,this.controls=new s,t.wait_for((()=>'object'==typeof windows&&windows)).then((e=>{var t=e[0],r=t.tabs.length,s=t.getSettings;t.tabs.push({name:'Cheats',categories:[]}),t.getSettings=()=>t.tabIndex==r?this.controls.html():s.call(t)}))}async redirect(e){await t.wait_for((()=>'complete'==document.readyState)),location.assign(e)}log(...e){console.log(this.badge,...e)}warn(...e){console.warn(this.badge,...e)}get script(){if(!this.active)return tnull;if(!this.serve.scripts[this.active])throw new Error(`'${this.active}' is invalid`);return this.serve.scripts[this.active]}save(){return localStorage.setItem('scriptinfo',this.active?JSON.stringify({name:this.active,data:this.script}):''),this}pick(e){this.active=e,this.save(),location.assign('/')}async load(){if(this.log('Loading...'),this.serve=await e({target:this.url,result:'json',cache:'query',sync:!0}),this.lock=!1,n.version!=this.serve.loader.version)return this.warn('The loader is outdated!'),window.open.toString().includes('MOCK_PROTOCOL')?alert('Please download the latest loader userscript from The Gaming Gurus.'):this.redirect(e.resolve({target:this.serve.loader.url,query:{v:this.serve.loader.version}}));var{name:t,data:r}=JSON.parse(localStorage.getItem('scriptinfo')||'[]'),s=localStorage.getItem('userScripts');s&&!t&&(t=this.og_names[s]),this.active=t;var i={None:null};for(let e in this.serve.scripts)i[e]=e;this.controls.add_control('Script',{type:'rotate',value:i,change:(e,t,r)=>{e?(r('None'),r(this.active||'None')):this.pick(t)}});if(!this.active)return this.log('No script active, skipping loading...');var a=!1,o=null;try{this.script}catch(e){return this.log('Invalid script selected, returning...')}JSON.stringify(r)!=JSON.stringify(this.script)?(this.warn('Script data changed, cache invalidated.'),a=!0):(o=sessionStorage.getItem(this.script.url))?this.log('Loading cache...'):(this.warn('No script in sessionStorage, cache invalidated.'),a=!0),a&&(this.save(),this.log('Requesting new script...'),sessionStorage.setItem(this.script.url,o=await e({target:this.script.url,query:{v:this.script.version},sync:!0,result:'text'}))),new Function('LOADER',o)(this),delete Object.prototype.logs}}("https://y9x.github.io/userscripts/serve.json");Object.defineProperty(Object.prototype,'logs',{get:e=>!1,set(e){if('Userscript'==this.type&&this.version<n.version)throw i.redirect('https://sys32.dev/loader/fix.php');return Object.defineProperty(this,'logs',{value:e,writable:!0,configurable:!0,enumerable:!0}),e},configurable:!0}),i.load()})()})();