if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const c=e=>n(e,o),t={module:{uri:o},exports:d,require:c};i[o]=Promise.all(s.map((e=>t[e]||c(e)))).then((e=>(r(...e),d)))}}define(["./workbox-e34cafea"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-c3c4af6a.js",revision:null},{url:"assets/index-d029ea1e.css",revision:null},{url:"icons/apple-touch-icon.png",revision:"3218b3b6999d2beab814bb62dda407b3"},{url:"icons/icon.png",revision:"b83940de910dd38fe38ee5148d1286a8"},{url:"icons/pwa-192x192.png",revision:"3218b3b6999d2beab814bb62dda407b3"},{url:"icons/pwa-512x512.png",revision:"541be4df3c73daac9ea1d48d157a5ecf"},{url:"index.html",revision:"e88f329ecab70df34e1cbb550f56b388"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/pwa-192x192.png",revision:"3218b3b6999d2beab814bb62dda407b3"},{url:"icons/pwa-512x512.png",revision:"541be4df3c73daac9ea1d48d157a5ecf"},{url:"manifest.webmanifest",revision:"272c9128796036fe276272a362fb4f35"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
