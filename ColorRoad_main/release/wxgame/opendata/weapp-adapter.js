(function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={exports:{},id:e,loaded:false};n[e].call(t.exports,t,t.exports,o);t.loaded=true;return t.exports}o.m=n;o.c=r;o.p="";return o(0)})([function(e,t,n){"use strict";var r=n(1);var u=i(r);var o=n(4);var s=a(o);function a(e){return e&&e.__esModule?e:{default:e}}function i(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var n in e){if(Object.prototype.hasOwnProperty.call(e,n))t[n]=e[n]}}t.default=e;return t}}var c=GameGlobal;function f(){u.addEventListener=function(e,t){u.document.addEventListener(e,t)};u.removeEventListener=function(e,t){u.document.removeEventListener(e,t)};if(u.canvas){u.canvas.addEventListener=u.addEventListener;u.canvas.removeEventListener=u.removeEventListener}if(c.sharedCanvas){sharedCanvas.__proto__.__proto__=new s.default("canvas");sharedCanvas.addEventListener=u.addEventListener;sharedCanvas.removeEventListener=u.removeEventListener}var e=wx.getSystemInfoSync(),t=e.platform;if(typeof __devtoolssubcontext==="undefined"&&t==="devtools"){for(var n in u){var r=Object.getOwnPropertyDescriptor(c,n);if(!r||r.configurable===true){Object.defineProperty(window,n,{value:u[n]})}}for(var o in u.document){var a=Object.getOwnPropertyDescriptor(c.document,o);if(!a||a.configurable===true){Object.defineProperty(c.document,o,{value:u.document[o]})}}window.parent=window}else{for(var i in u){c[i]=u[i]}c.window=u;window=c;window.top=window.parent=window}}if(!GameGlobal.__isAdapterInjected){GameGlobal.__isAdapterInjected=true;f()}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:true});n.cancelAnimationFrame=n.requestAnimationFrame=n.clearInterval=n.clearTimeout=n.setInterval=n.setTimeout=n.canvas=n.location=n.localStorage=n.HTMLElement=n.FileReader=n.Audio=n.Image=n.WebSocket=n.XMLHttpRequest=n.navigator=n.document=undefined;var r=t(2);Object.keys(r).forEach(function(t){if(t==="default"||t==="__esModule")return;Object.defineProperty(n,t,{enumerable:true,get:function e(){return r[t]}})});var o=t(3);Object.keys(o).forEach(function(t){if(t==="default"||t==="__esModule")return;Object.defineProperty(n,t,{enumerable:true,get:function e(){return o[t]}})});var a=t(9);var i=P(a);var u=t(17);var s=t(10);var c=P(s);var f=t(18);var l=P(f);var d=t(19);var p=P(d);var v=t(20);var h=P(v);var y=t(11);var b=P(y);var g=t(12);var _=P(g);var w=t(21);var m=P(w);var O=t(4);var E=P(O);var S=t(22);var j=P(S);var T=t(23);var k=P(T);function P(e){return e&&e.__esModule?e:{default:e}}n.document=c.default;n.navigator=l.default;n.XMLHttpRequest=p.default;n.WebSocket=h.default;n.Image=b.default;n.Audio=_.default;n.FileReader=m.default;n.HTMLElement=E.default;n.localStorage=j.default;n.location=k.default;var M=(0,u.isSubContext)()?undefined:new i.default;n.canvas=M;n.setTimeout=setTimeout;n.setInterval=setInterval;n.clearTimeout=clearTimeout;n.clearInterval=clearInterval;n.requestAnimationFrame=requestAnimationFrame;n.cancelAnimationFrame=cancelAnimationFrame},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=wx.getSystemInfoSync(),r=n.screenWidth,o=n.screenHeight,a=n.devicePixelRatio;var i=t.innerWidth=r;var u=t.innerHeight=o;t.devicePixelRatio=a;var s=t.screen={availWidth:i,availHeight:u};var c=t.performance={now:function e(){return Date.now()/1e3}};var f=t.ontouchstart=null;var l=t.ontouchmove=null;var d=t.ontouchend=null},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.HTMLCanvasElement=t.HTMLImageElement=undefined;var r=n(4);var o=a(r);function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function u(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function s(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var c=t.HTMLImageElement=function(e){s(t,e);function t(){i(this,t);return u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"img"))}return t}(o.default);var f=t.HTMLCanvasElement=function(e){s(t,e);function t(){i(this,t);return u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"canvas"))}return t}(o.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();var o=n(5);var a=s(o);var i=n(8);var u=n(2);function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function f(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function l(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var d=function(e){l(n,e);function n(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";c(this,n);var t=f(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));t.className="";t.childern=[];t.style={width:u.innerWidth+"px",height:u.innerHeight+"px"};t.insertBefore=i.noop;t.innerHTML="";t.tagName=e.toUpperCase();return t}r(n,[{key:"setAttribute",value:function e(t,n){this[t]=n}},{key:"getAttribute",value:function e(t){return this[t]}},{key:"getBoundingClientRect",value:function e(){return{top:0,left:0,width:u.innerWidth,height:u.innerHeight}}},{key:"focus",value:function e(){}},{key:"clientWidth",get:function e(){var t=parseInt(this.style.fontSize,10)*this.innerHTML.length;return Number.isNaN(t)?0:t}},{key:"clientHeight",get:function e(){var t=parseInt(this.style.fontSize,10);return Number.isNaN(t)?0:t}}]);return n}(a.default);t.default=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(6);var o=a(r);function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function u(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function s(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var c=function(e){s(t,e);function t(){i(this,t);var e=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));e.className="";e.children=[];return e}return t}(o.default);t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();var o=n(7);var a=i(o);function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function s(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var f=function(e){c(n,e);function n(){u(this,n);var e=s(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));e.childNodes=[];return e}r(n,[{key:"appendChild",value:function e(t){if(t instanceof n){this.childNodes.push(t)}else{throw new TypeError("Failed to executed 'appendChild' on 'Node': parameter 1 is not of type 'Node'.")}}},{key:"cloneNode",value:function e(){var t=Object.create(this);Object.assign(t,this);return t}},{key:"removeChild",value:function e(t){var n=this.childNodes.findIndex(function(e){return e===t});if(n>-1){return this.childNodes.splice(n,1)}return null}}]);return n}(a.default);t.default=f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();function r(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var a=new WeakMap;var o=function(){function e(){r(this,e);a.set(this,{})}n(e,[{key:"addEventListener",value:function e(t,n){var r=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var o=a.get(this);if(!o){o={};a.set(this,o)}if(!o[t]){o[t]=[]}o[t].push(n);if(r.capture){console.warn("EventTarget.addEventListener: options.capture is not implemented.")}if(r.once){console.warn("EventTarget.addEventListener: options.once is not implemented.")}if(r.passive){console.warn("EventTarget.addEventListener: options.passive is not implemented.")}}},{key:"removeEventListener",value:function e(t,n){var r=a.get(this)[t];if(r&&r.length>0){for(var o=r.length;o--;o>0){if(r[o]===n){r.splice(o,1);break}}}}},{key:"dispatchEvent",value:function e(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var n=a.get(this)[t.type];if(n){for(var r=0;r<n.length;r++){n[r](t)}}}}]);return e}();t.default=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.noop=n;t.isSubContext=r;function n(){}function r(){return typeof GameGlobal!=="undefined"&&GameGlobal.__isSubContext===true}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=d;var r=n(3);var o=n(4);var a=s(o);var i=n(10);var u=s(i);function s(e){return e&&e.__esModule?e:{default:e}}var c=false;var f=false;var l=false;function d(){var e=wx.createCanvas();e.type="canvas";e.__proto__.__proto__=new a.default("canvas");var t=e.getContext;e.getBoundingClientRect=function(){var e={top:0,left:0,width:window.innerWidth,height:window.innerHeight};return e};return e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(1);var o=v(r);var a=n(4);var i=p(a);var u=n(11);var s=p(u);var c=n(12);var f=p(c);var l=n(9);var d=p(l);n(15);function p(e){return e&&e.__esModule?e:{default:e}}function v(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var n in e){if(Object.prototype.hasOwnProperty.call(e,n))t[n]=e[n]}}t.default=e;return t}}var h={};var y={readyState:"complete",visibilityState:"visible",documentElement:o,hidden:false,style:{},location:o.location,ontouchstart:null,ontouchmove:null,ontouchend:null,head:new i.default("head"),body:new i.default("body"),createElement:function e(t){if(t==="canvas"){return new d.default}else if(t==="audio"){return new f.default}else if(t==="img"){return new s.default}return new i.default(t)},getElementById:function e(t){if(t===o.canvas.id){return o.canvas}return null},getElementsByTagName:function e(t){if(t==="head"){return[y.head]}else if(t==="body"){return[y.body]}else if(t==="canvas"){return[o.canvas]}return[]},querySelector:function e(t){if(t==="head"){return y.head}else if(t==="body"){return y.body}else if(t==="canvas"){return o.canvas}else if(t==="#"+o.canvas.id){return o.canvas}return null},querySelectorAll:function e(t){if(t==="head"){return[y.head]}else if(t==="body"){return[y.body]}else if(t==="canvas"){return[o.canvas]}return[]},addEventListener:function e(t,n){if(!h[t]){h[t]=[]}h[t].push(n)},removeEventListener:function e(t,n){var r=h[t];if(r&&r.length>0){for(var o=r.length;o--;o>0){if(r[o]===n){r.splice(o,1);break}}}},dispatchEvent:function e(t){var n=h[t.type];if(n){for(var r=0;r<n.length;r++){n[r](t)}}}};t.default=y},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=n;function n(){var e=wx.createImage();return e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var o=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();var r=n(13);var a=u(r);var i=n(8);function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function c(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function f(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var l=0;var d=1;var p=2;var v=3;var h=4;var y=new WeakMap;var b=new WeakMap;var g=new WeakMap;var _=new WeakMap;var w=function(e){f(r,e);function r(e){s(this,r);var t=c(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));t.HAVE_NOTHING=l;t.HAVE_METADATA=d;t.HAVE_CURRENT_DATA=p;t.HAVE_FUTURE_DATA=v;t.HAVE_ENOUGH_DATA=h;t.readyState=l;if((0,i.isSubContext)()){console.warn("HTMLAudioElement is not supported in SubContext.");return c(t)}b.set(t,"");var n=wx.createInnerAudioContext();y.set(t,n);n.onCanplay(function(){t.dispatchEvent({type:"load"});t.dispatchEvent({type:"loadend"});t.dispatchEvent({type:"canplay"});t.dispatchEvent({type:"canplaythrough"});t.dispatchEvent({type:"loadedmetadata"});t.readyState=p});n.onPlay(function(){t.dispatchEvent({type:"play"})});n.onPause(function(){t.dispatchEvent({type:"pause"})});n.onEnded(function(){t.dispatchEvent({type:"ended"});t.readyState=h});n.onError(function(){t.dispatchEvent({type:"error"})});if(e){y.get(t).src=e}return t}o(r,[{key:"load",value:function e(){console.warn("HTMLAudioElement.load() is not implemented.")}},{key:"play",value:function e(){if(!(0,i.isSubContext)()){y.get(this).play()}}},{key:"pause",value:function e(){if(!(0,i.isSubContext)()){y.get(this).pause()}}},{key:"canPlayType",value:function e(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";if(typeof t!=="string"){return""}if(t.indexOf("audio/mpeg")>-1||t.indexOf("audio/mp4")){return"probably"}return""}},{key:"cloneNode",value:function e(){var t=new r;if(!(0,i.isSubContext)()){t.loop=y.get(this).loop;t.autoplay=y.get(this).loop;t.src=this.src}return t}},{key:"currentTime",get:function e(){if(!(0,i.isSubContext)()){return y.get(this).currentTime}return 0},set:function e(t){if(!(0,i.isSubContext)()){y.get(this).seek(t)}}},{key:"src",get:function e(){return b.get(this)},set:function e(t){b.set(this,t);if(!(0,i.isSubContext)()){y.get(this).src=t}}},{key:"loop",get:function e(){if(!(0,i.isSubContext)()){return y.get(this).loop}return false},set:function e(t){if(!(0,i.isSubContext)()){y.get(this).loop=t}}},{key:"autoplay",get:function e(){if(!(0,i.isSubContext)()){return y.get(this).autoplay}return false},set:function e(t){if(!(0,i.isSubContext)()){y.get(this).autoplay=t}}},{key:"paused",get:function e(){if(!(0,i.isSubContext)()){return y.get(this).paused}return false}}]);return r}(a.default);t.default=w},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(14);var o=a(r);function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function u(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function s(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var c=function(e){s(t,e);function t(){i(this,t);return u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"audio"))}return t}(o.default);t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();var o=n(4);var a=i(o);function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function s(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var f=function(e){c(t,e);function t(e){u(this,t);return s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}r(t,[{key:"addTextTrack",value:function e(){}},{key:"captureStream",value:function e(){}},{key:"fastSeek",value:function e(){}},{key:"load",value:function e(){}},{key:"pause",value:function e(){}},{key:"play",value:function e(){}}]);return t}(a.default);t.default=f},function(e,t,n){"use strict";n(16)},function(e,t,n){"use strict";var r=n(1);var o=c(r);var a=n(10);var i=s(a);var u=n(8);function s(e){return e&&e.__esModule?e:{default:e}}function c(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var n in e){if(Object.prototype.hasOwnProperty.call(e,n))t[n]=e[n]}}t.default=e;return t}}function f(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var l=function e(t){f(this,e);this.target=o.canvas;this.currentTarget=o.canvas;this.touches=[];this.targetTouches=[];this.changedTouches=[];this.preventDefault=u.noop;this.stopPropagation=u.noop;this.type=t};function d(n){return function(e){var t=new l(n);t.touches=e.touches;t.targetTouches=Array.prototype.slice.call(e.touches);t.changedTouches=e.changedTouches;t.timeStamp=e.timeStamp;i.default.dispatchEvent(t)}}wx.onTouchStart(d("touchstart"));wx.onTouchMove(d("touchmove"));wx.onTouchEnd(d("touchend"));wx.onTouchCancel(d("touchcancel"))},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.noop=n;t.isSubContext=r;function n(){}function r(){return typeof GameGlobal!=="undefined"&&GameGlobal.__isSubContext===true}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(8);var o=wx.getSystemInfoSync(),a=o.platform;var i={platform:a,language:"zh-cn",appVersion:"5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN",onLine:true,geolocation:{getCurrentPosition:r.noop,watchPosition:r.noop,clearWatch:r.noop}};t.default=i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();function r(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var o=new WeakMap;var a=new WeakMap;var i=new WeakMap;var f=new WeakMap;var u=new WeakMap;function l(e){if(typeof this["on"+e]==="function"){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++){n[r-1]=arguments[r]}this["on"+e].apply(this,n)}}function d(e){this.readyState=e;l.call(this,"readystatechange")}var s=function(){function c(){r(this,c);this.onabort=null;this.onerror=null;this.onload=null;this.onloadstart=null;this.onprogress=null;this.ontimeout=null;this.onloadend=null;this.onreadystatechange=null;this.readyState=0;this.response=null;this.responseText=null;this.responseType="";this.responseXML=null;this.status=0;this.statusText="";this.upload={};this.withCredentials=false;i.set(this,{"content-type":"application/x-www-form-urlencoded"});f.set(this,{})}n(c,[{key:"abort",value:function e(){var t=u.get(this);if(t){t.abort()}}},{key:"getAllResponseHeaders",value:function e(){var t=f.get(this);return Object.keys(t).map(function(e){return e+": "+t[e]}).join("\n")}},{key:"getResponseHeader",value:function e(t){return f.get(this)[t]}},{key:"open",value:function e(t,n){a.set(this,t);o.set(this,n);d.call(this,c.OPENED)}},{key:"overrideMimeType",value:function e(){}},{key:"send",value:function e(){var s=this;var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";if(this.readyState!==c.OPENED){throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.")}else{wx.request({data:t,url:o.get(this),method:a.get(this),header:i.get(this),responseType:this.responseType,success:function e(t){var n=t.data,r=t.statusCode,o=t.header;if(typeof n!=="string"&&!(n instanceof ArrayBuffer)){try{n=JSON.stringify(n)}catch(e){n=n}}s.status=r;f.set(s,o);l.call(s,"loadstart");d.call(s,c.HEADERS_RECEIVED);d.call(s,c.LOADING);s.response=n;if(n instanceof ArrayBuffer){s.responseText="";var a=new Uint8Array(n);var i=a.byteLength;for(var u=0;u<i;u++){s.responseText+=String.fromCharCode(a[u])}}else{s.responseText=n}d.call(s,c.DONE);l.call(s,"load");l.call(s,"loadend")},fail:function e(t){var n=t.errMsg;if(n.indexOf("abort")!==-1){l.call(s,"abort")}else{l.call(s,"error",n)}l.call(s,"loadend")}})}}},{key:"setRequestHeader",value:function e(t,n){var r=i.get(this);r[t]=n;i.set(this,r)}}]);return c}();s.UNSEND=0;s.OPENED=1;s.HEADERS_RECEIVED=2;s.LOADING=3;s.DONE=4;t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();var a=n(8);function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var u=new WeakMap;var o=function(){function o(e){var t=this;var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];i(this,o);this.binaryType="";this.bufferedAmount=0;this.extensions="";this.onclose=null;this.onerror=null;this.onmessage=null;this.onopen=null;this.protocol="";this.readyState=3;if((0,a.isSubContext)()){throw new Error("WebSocket is not supported in SubContext.")}if(typeof e!=="string"||!/(^ws:\/\/)|(^wss:\/\/)/.test(e)){throw new TypeError("Failed to construct 'WebSocket': The URL '"+e+"' is invalid")}this.url=e;this.readyState=o.CONNECTING;var r=wx.connectSocket({url:e,protocols:Array.isArray(n)?n:[n]});u.set(this,r);r.onClose(function(e){t.readyState=o.CLOSED;if(typeof t.onclose==="function"){t.onclose(e)}});r.onMessage(function(e){if(typeof t.onmessage==="function"){t.onmessage(e)}});r.onOpen(function(){t.readyState=o.OPEN;if(typeof t.onopen==="function"){t.onopen()}});r.onError(function(e){if(typeof t.onerror==="function"){t.onerror(new Error(e.errMsg))}});return this}r(o,[{key:"close",value:function e(t,n){this.readyState=o.CLOSING;var r=u.get(this);r.close({code:t,reason:n})}},{key:"send",value:function e(t){if(typeof t!=="string"&&!(t instanceof ArrayBuffer)){throw new TypeError("Failed to send message: The data "+t+" is invalid")}var n=u.get(this);n.send({data:t})}}]);return o}();o.CONNECTING=0;o.OPEN=1;o.CLOSING=2;o.CLOSED=3;t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,n){if(t)r(e.prototype,t);if(n)r(e,n);return e}}();var o=n(8);function a(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var i=function(){function e(){a(this,e)}r(e,[{key:"construct",value:function e(){if((0,o.isSubContext)()){throw new Error("FileReader is not supported in SubContext.")}}}]);return e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(8);var o={get length(){var e=wx.getStorageInfoSync(),t=e.keys;return t.length},key:function e(t){var n=wx.getStorageInfoSync(),r=n.keys;return r[t]},getItem:function e(t){return wx.getStorageSync(t)},setItem:function e(t,n){return wx.setStorageSync(t,n)},removeItem:function e(t){wx.removeStorageSync(t)},clear:function e(){wx.clearStorageSync()}};var a={};var i={get length(){var e=Object.keys(a);return e.length},key:function e(t){var n=Object.keys(a);return n[t]},getItem:function e(t){return a[t]},setItem:function e(t,n){a[t]=n},removeItem:function e(t){delete a[t]},clear:function e(){a={}}};var u=(0,r.isSubContext)()?i:o;t.default=u},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n={href:"game.js",reload:function e(){}};t.default=n}]);