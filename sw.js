!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/nodify/",n(n.s=3)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(e){}},function(e,t){function n(e){return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=2},function(e,t,n){"use strict";n.r(t);n(0);n(1);const s={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[s.prefix,e,s.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||r(s.precache),c=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class o extends Error{constructor(e,t){super(c(e,t)),this.name=e,this.details=t}}const i=new Set;const l=(e,t)=>e.filter((e=>t in e)),h=async({request:e,mode:t,plugins:n=[]})=>{const s=l(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},u=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const a=await self.caches.open(e),c=await h({plugins:r,request:t,mode:"read"});let o=await a.match(c,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:c})}return o},f=async({cacheName:e,request:t,response:n,event:s,plugins:r=[],matchOptions:a})=>{const c=await h({plugins:r,request:t,mode:"write"});if(!n)throw new o("cache-put-with-no-response",{url:(f=c.url,new URL(String(f),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var f;const d=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,a=!1;for(const t of s)if("cacheWillUpdate"in t){a=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return a||(r=r&&200===r.status?r:void 0),r||null})({event:s,plugins:r,response:n,request:c});if(!d)return void 0;const p=await self.caches.open(e),y=l(r,"cacheDidUpdate"),w=y.length>0?await u({cacheName:e,matchOptions:a,request:c}):null;try{await p.put(c,d)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of i)await e()}(),e}for(const t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:w,newResponse:d,request:c})},d=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=l(s,"fetchDidFail"),a=r.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new o("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:n,request:c,response:r}));return r}catch(e){0;for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:c.clone()});throw e}};let p;async function y(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,a=function(){if(void 0===p){const e=new Response("");if("body"in e)try{new Response(e.body),p=!0}catch(e){p=!1}p=!1}return p}()?n.body:await n.blob();return new Response(a,r)}function w(e){if(!e)throw new o("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new o("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:r.href}}class g{constructor(e){this._cacheName=a(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=w(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new o("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new o("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),a=await r.keys(),c=new Set(a.map((e=>e.url)));for(const[e,t]of this._urlsToCacheKeys)c.has(t)?s.push(e):n.push({cacheKey:t,url:e});const o=n.map((({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),a=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:a,event:e,integrity:r,plugins:t,url:s})}));await Promise.all(o);return{updatedURLs:n.map((e=>e.url)),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:a}){const c=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let i,l=await d({event:s,plugins:r,request:c});for(const e of r||[])"cacheWillUpdate"in e&&(i=e);if(!(i?await i.cacheWillUpdate({event:s,request:c,response:l}):l.status<400))throw new o("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await y(l)),await f({event:s,plugins:r,response:l,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new o("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new o("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"8809db9f5433f610257a0a5de0a4e0ba","url":"0480b142.1a8d4cff.js"},{"revision":"9eaa9549777c0567f275bcfab1188b8e","url":"11.5fb5fb33.js"},{"revision":"9afc5b121cc1b56f87cf4f8e64a42bf9","url":"12.5dfa34c8.js"},{"revision":"2a1e61798e73237cee730ef5545a6f56","url":"13.2689bfcb.js"},{"revision":"434efe2422f4c7805197a27cb0a1f678","url":"14.8de41045.js"},{"revision":"3d9c0aa3125c800a4fc82b6f447ed1f2","url":"15.e84a6885.js"},{"revision":"3118f97ace41ba62618a8533d3e10f0b","url":"16.da70da93.js"},{"revision":"6a6160ac36166b38f6472dccb294085a","url":"17.85040745.js"},{"revision":"10075e12aa25d2d656894b4a707ce520","url":"17896441.7410b47a.js"},{"revision":"57bdf6c203edf8dd61a7d9c08e6c01b8","url":"18.ce7926c3.js"},{"revision":"5261c4f4db626f043da85c0bd8e86285","url":"19.42efc293.js"},{"revision":"2572e207c6d29959c17c77b9c9cdac7d","url":"1df93b7f.33f0d3b6.js"},{"revision":"995e6011a59c3af6e8535d6e591e6698","url":"3b8c55ea.c8da6e1d.js"},{"revision":"ff0f2e5ffb38521251d11a98209c39d3","url":"404.html"},{"revision":"10d30278bad57e2796a73a1865a080e5","url":"7dfb83d7.88fed1a5.js"},{"revision":"7482d901eccf06dbd3730a6d738ceb99","url":"935f2afb.73710a23.js"},{"revision":"48e5c74bbbd76a11fe6b96d89ac058b4","url":"a09c2993.a10a1a43.js"},{"revision":"253975da56fce276e021b60eb0c175e0","url":"common.1c22a7a1.js"},{"revision":"0c55669738603965165d028412982c3c","url":"docs/faq/index.html"},{"revision":"08d692b93caf7792a89eb29a0baf9064","url":"docs/index.html"},{"revision":"5623bf8da8c87c1fe3c165936e0f4dd5","url":"docs/installation/index.html"},{"revision":"ba6ba1ecab9c45dd2fc0589460320727","url":"index.html"},{"revision":"c0bfe6d8e062a8c88ed8a7b2d364937a","url":"main.e831f618.js"},{"revision":"bae8351f4b2f90d01aba189cc75d8b88","url":"manifest.json"},{"revision":"bf7130df365e327c8688b1b37b99b31d","url":"runtime~main.e77cd97f.js"},{"revision":"84d6fa9c4a4c1155d596b6d143ee3bdc","url":"search/index.html"},{"revision":"e1f78d658c054f94d2d9acc7ebbdfcaf","url":"showcase/index.html"},{"revision":"9fa2d93a0fb5a7ddab780dad066b7b18","url":"styles.0d95298a.css"},{"revision":"be68c95a48d88ade850e54875d2add95","url":"styles.d591596d.js"},{"revision":"21c557bfe94fb8da10a156009553dd19","url":"assets/images/example-calculator-ff1ebd551c958e1f3de637727b93d9ea.png"},{"revision":"b98669273703c06e2bd4bb752254942f","url":"assets/images/example-playground-6f3834bec78f3edfde260c196e61f3e4.png"},{"revision":"6ac53fb5656fd22dc422dc41069235c6","url":"assets/images/example-state-machine-8ad7282356ace4420e9b1385ca525fba.png"},{"revision":"3abb7ba83d7c9ce731fbfd896799ee26","url":"ideal-img/example-calculator.3abb7ba.640.png"},{"revision":"3e5935102f972d4f54c593a09e92de43","url":"ideal-img/example-calculator.3e59351.837.png"},{"revision":"a8ee6257eccaec568d055eed3a3564df","url":"ideal-img/example-playground.a8ee625.841.png"},{"revision":"d27e266dc239b295a277e3fd1f4e5a68","url":"ideal-img/example-playground.d27e266.640.png"},{"revision":"83365c302c00b69813aa4e2b0265d29e","url":"ideal-img/example-state-machine.83365c3.838.png"},{"revision":"d680cac95ab5d55ddf3126d839c359c2","url":"ideal-img/example-state-machine.d680cac.640.png"},{"revision":"ff1d9ad354f15197f36c9ec2f713242c","url":"img/circuit_board_dark.svg"},{"revision":"2562a0652d76e8212db4275f082e817d","url":"img/circuit_board.svg"},{"revision":"c8d9071cec19873662c295f352d47b7f","url":"img/favicon.ico"},{"revision":"64b7a7feefa37fb96ea6b230163835d0","url":"img/github_logo_dark.svg"},{"revision":"6cfcea2f19db75fd43a158dd22ddbfa5","url":"img/github_logo.svg"},{"revision":"53c49cb3d1cc60d77e4ef13a0ea74a15","url":"img/logo_192.png"},{"revision":"8dfb5b463782482e411d506e16a956fe","url":"img/logo_512.png"},{"revision":"24101feec6336a53a696d9e216ad9b69","url":"img/logo.svg"},{"revision":"bd3a3f516873ce100d6143d2aeda4f83","url":"img/nodify_soc.png"},{"revision":"a0199774bfba5a40ac43c577f78c10be","url":"img/NuGet_logo_dark.svg"},{"revision":"04e61ecdd25682e57cd0724bcfc31dab","url":"img/NuGet_logo.svg"}],n=new g;e.offlineMode&&n.addToCacheList(t),await async function(e){}(),self.addEventListener("install",(e=>{e.waitUntil(n.install())})),self.addEventListener("activate",(e=>{e.waitUntil(n.activate())})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const s=t.request.url,r=function(e){const t=[],n=new URL(e,self.location.href);return n.origin!==self.location.origin||(n.search="",n.hash="",t.push(n.href),n.pathname.endsWith("/")?t.push(`${n.href}index.html`):t.push(`${n.href}/index.html`)),t}(s);for(let a=0;a<r.length;a+=1){const c=r[a],o=n.getCacheKeyForURL(c);if(o){e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:s,possibleURL:c,possibleURLs:r,cacheKey:o}),t.respondWith(caches.match(o));break}}}})),self.addEventListener("message",(async e=>{"SKIP_WAITING"===(e.data&&e.data.type)&&self.skipWaiting()}))})()}]);