!function(e){function t(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=d.p+""+e+"."+b+".hot-update.js",t.appendChild(n)}function n(e){if("undefined"==typeof XMLHttpRequest)return e(new Error("No browser support"));try{var t=new XMLHttpRequest,n=d.p+""+b+".hot-update.json";t.open("GET",n,!0),t.timeout=1e4,t.send(null)}catch(t){return e(t)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)e(new Error("Manifest request to "+n+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)e(new Error("Manifest request to "+n+" failed."));else{try{var r=JSON.parse(t.responseText)}catch(t){return void e(t)}e(null,r)}}}function r(e){function t(e,t){"ready"===_&&a("prepare"),H++,d.e(e,function(){function n(){H--,"prepare"===_&&(R[e]||l(e),0===H&&0===O&&f())}try{t.call(null,r)}finally{n()}})}var n=M[e];if(!n)return d;var r=function(t){return n.hot.active?M[t]?(M[t].parents.indexOf(e)<0&&M[t].parents.push(e),n.children.indexOf(t)<0&&n.children.push(t)):x=[e]:(console.warn("[HMR] unexpected require("+t+") from disposed module "+e),x=[]),d(t)};for(var o in d)Object.prototype.hasOwnProperty.call(d,o)&&(v?Object.defineProperty(r,o,function(e){return{configurable:!0,enumerable:!0,get:function(){return d[e]},set:function(t){d[e]=t}}}(o)):r[o]=d[o]);return v?Object.defineProperty(r,"e",{enumerable:!0,value:t}):r.e=t,r}function o(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,n){if("undefined"==typeof e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n;else t._acceptedDependencies[e]=n},decline:function(e){if("undefined"==typeof e)t._selfDeclined=!0;else if("number"==typeof e)t._declinedDependencies[e]=!0;else for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:c,apply:s,status:function(e){return e?void g.push(e):_},addStatusHandler:function(e){g.push(e)},removeStatusHandler:function(e){var t=g.indexOf(e);t>=0&&g.splice(t,1)},data:m[e]};return t}function a(e){_=e;for(var t=0;t<g.length;t++)g[t].call(null,e)}function i(e){var t=+e+""===e;return t?+e:e}function c(e,t){if("idle"!==_)throw new Error("check() is only allowed in idle status");"function"==typeof e?(E=!1,t=e):(E=e,t=t||function(e){if(e)throw e}),a("check"),n(function(e,n){if(e)return t(e);if(!n)return a("idle"),void t(null,null);S={},T={},R={};for(var r=0;r<n.c.length;r++)T[n.c[r]]=!0;w=n.h,a("prepare"),y=t,h={};var o=0;l(o),"prepare"===_&&0===H&&0===O&&f()})}function u(e,t){if(T[e]&&S[e]){S[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(h[n]=t[n]);0===--O&&0===H&&f()}}function l(e){T[e]?(S[e]=!0,O++,t(e)):R[e]=!0}function f(){a("ready");var e=y;if(y=null,e)if(E)s(E,e);else{var t=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&t.push(i(n));e(null,t)}}function s(t,n){function r(e){for(var t=[e],n={},r=t.slice();r.length>0;){var a=r.pop(),e=M[a];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return new Error("Aborted because of self decline: "+a);if(0===a)return;for(var i=0;i<e.parents.length;i++){var c=e.parents[i],u=M[c];if(u.hot._declinedDependencies[a])return new Error("Aborted because of declined dependency: "+a+" in "+c);t.indexOf(c)>=0||(u.hot._acceptedDependencies[a]?(n[c]||(n[c]=[]),o(n[c],[a])):(delete n[c],t.push(c),r.push(c)))}}}return[t,n]}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==_)throw new Error("apply() is only allowed in ready status");"function"==typeof t?(n=t,t={}):t&&"object"==typeof t?n=n||function(e){if(e)throw e}:(t={},n=n||function(e){if(e)throw e});var c={},u=[],l={};for(var f in h)if(Object.prototype.hasOwnProperty.call(h,f)){var s=i(f),p=r(s);if(!p){if(t.ignoreUnaccepted)continue;return a("abort"),n(new Error("Aborted because "+s+" is not accepted"))}if(p instanceof Error)return a("abort"),n(p);l[s]=h[s],o(u,p[0]);for(var s in p[1])Object.prototype.hasOwnProperty.call(p[1],s)&&(c[s]||(c[s]=[]),o(c[s],p[1][s]))}for(var v=[],y=0;y<u.length;y++){var s=u[y];M[s]&&M[s].hot._selfAccepted&&v.push({module:s,errorHandler:M[s].hot._selfAccepted})}a("dispose");for(var E=u.slice();E.length>0;){var s=E.pop(),g=M[s];if(g){for(var O={},H=g.hot._disposeHandlers,R=0;R<H.length;R++){var S=H[R];S(O)}m[s]=O,g.hot.active=!1,delete M[s];for(var R=0;R<g.children.length;R++){var T=M[g.children[R]];if(T){var j=T.parents.indexOf(s);j>=0&&T.parents.splice(j,1)}}}}for(var s in c)if(Object.prototype.hasOwnProperty.call(c,s))for(var g=M[s],P=c[s],R=0;R<P.length;R++){var z=P[R],j=g.children.indexOf(z);j>=0&&g.children.splice(j,1)}a("apply"),b=w;for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);var k=null;for(var s in c)if(Object.prototype.hasOwnProperty.call(c,s)){for(var g=M[s],P=c[s],V=[],y=0;y<P.length;y++){var z=P[y],S=g.hot._acceptedDependencies[z];V.indexOf(S)>=0||V.push(S)}for(var y=0;y<V.length;y++){var S=V[y];try{S(c)}catch(e){k||(k=e)}}}for(var y=0;y<v.length;y++){var A=v[y],s=A.module;x=[s];try{d(s)}catch(e){if("function"==typeof A.errorHandler)try{A.errorHandler(e)}catch(e){k||(k=e)}else k||(k=e)}}return k?(a("fail"),n(k)):(a("idle"),void n(null,u))}function d(t){if(M[t])return M[t].exports;var n=M[t]={exports:{},id:t,loaded:!1,hot:o(t),parents:x,children:[]};return e[t].call(n.exports,n,n.exports,r(t)),n.loaded=!0,n.exports}var p=this.webpackHotUpdate;this.webpackHotUpdate=function(e,t){u(e,t),p&&p(e,t)};var v=!1;try{Object.defineProperty({},"x",{get:function(){}}),v=!0}catch(e){}var y,h,w,E=!0,b="ae6488bc5ae10a55daca",m={},x=[],g=[],_="idle",O=0,H=0,R={},S={},T={},M={};return d.m=e,d.c=M,d.p="/dist",d.h=function(){return b},r(0)(0)}([function(e,t,n){e.exports=n(33)},function(e,t,n){var r=n(27)("wks"),o=n(31),a=n(3).Symbol,i="function"==typeof a,c=e.exports=function(e){return r[e]||(r[e]=i&&a[e]||(i?a:o)("Symbol."+e))};c.store=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={R:1,focalDistance:9,FA:1e4,FF:600,FJ:3,FG:100,renderer:null,scene:null,camera:null,ball:null,id:null,isSingle:!0};t.default=n},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){var r=n(13);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){e.exports=!n(25)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(8),o=n(15);e.exports=n(5)?function(e,t,n){return r.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(4),o=n(43),a=n(59),i=Object.defineProperty;t.f=n(5)?Object.defineProperty:function(e,t,n){if(r(e),t=a(t,!0),r(n),o)try{return i(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return new THREE.Vector3(e.x,e.y,e.z)}function a(e,t){return new THREE.Vector3(e.x+t.x,e.y+t.y,e.z+t.z)}function i(e,t){return new THREE.Vector3(e.x-t.x,e.y-t.y,e.z-t.z)}function c(e,t){var n=e.x*t.x,r=e.y*t.y,o=e.z*t.z;return n+r+o}function u(e){return"x: "+e.x+" y: "+e.y+" z:"+e.z}function l(){var e=100,t=new THREE.Geometry;t.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(e,0,0));var n=new THREE.Line(t,new THREE.LineBasicMaterial({color:16711680}));s.default.scene.add(n);var r=new THREE.Geometry;r.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,e,0));var o=new THREE.Line(r,new THREE.LineBasicMaterial({color:65280}));s.default.scene.add(o);var a=new THREE.Geometry;a.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,e));var i=new THREE.Line(a,new THREE.LineBasicMaterial({color:255}));s.default.scene.add(i)}Object.defineProperty(t,"__esModule",{value:!0}),t.cloneV=o,t.addV=a,t.subtractV=i,t.dotV=c,t.logV=u,t.createAxis=l;var f=n(2),s=r(f)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=n(36),a=r(o);t.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,a.default)(e)}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports={}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(27)("keys"),o=n(31);e.exports=function(e){return r[e]||(r[e]=o(e))}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){for(var t=f.length,n=0;n<t;n++){var r=f[n];"BoxGeometry"===r.geometry.type&&a(r,e)}}function a(e,t){var n=(0,u.subtractV)(t.newP,e.position),r=new THREE.Vector3(Math.abs(n.x),Math.abs(n.y),Math.abs(n.z)),o=(0,u.cloneV)(r);o.divide(n);for(var a in o)isNaN(o[a])&&(o[a]=1);var c=e.geometry.vertices[0],l=(0,u.subtractV)(r,c),f=!1,s=new THREE.Vector3(l.x,l.y,l.z);if(l.x>=0&&l.y>=0&&l.z>=0)f=l.length()<=t.R;else{l.x<0&&(s.x=0),l.y<0&&(s.y=0),l.z<0&&(s.z=0);var d=s.length();f=0==d||d<=t.R}f&&i(t,l,o)}function i(e,t,n){return t.z<=0&&t.y<=0&&t.x>=0?(e.v.x=0,void(e.f.x=0)):t.x<=0&&t.y<=0&&t.z>=0?(e.v.z=0,void(e.f.z=0)):t.z<=0&&t.x<=0&&t.y>=0?(e.isPlane=!0,e.v.y=0,void(e.f.y=0)):t.z<=0&&t.x>=0&&t.y>=0?(t.z=0,void c(e,t,n)):t.y<=0&&t.x>=0&&t.z>=0?(t.y=0,void c(e,t,n)):t.x<=0&&t.y>=0&&t.z>=0?(t.x=0,void c(e,t,n)):void 0}function c(e,t,n){var r=(0,u.cloneV)(t).normalize(),o=e.v.length(),a=.2;if(o<a){var i=(0,u.cloneV)(e.v).normalize().multiplyScalar(a-o);e.v.add(i)}e.f.multiply(n),e.v.multiply(n),e.f.sub((0,u.cloneV)(e.f).projectOnVector(r)),e.v.sub((0,u.cloneV)(e.v).projectOnVector(r)),e.f.divide(n),e.v.divide(n)}Object.defineProperty(t,"__esModule",{value:!0}),t.collisionObjs=void 0,t.collisionDetection=o;var u=n(9),l=n(2),f=(r(l),t.collisionObjs=[])},function(e,t){"use strict";function n(){document.addEventListener("keydown",function(e){e.preventDefault(),r[e.keyCode]=!0}),document.addEventListener("keyup",function(e){e.preventDefault(),r[e.keyCode]=!1})}Object.defineProperty(t,"__esModule",{value:!0}),t.createEvents=n;var r=t.keyboard={}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(38);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var r=n(13),o=n(3).document,a=r(o)&&r(o.createElement);e.exports=function(e){return a?o.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var r=n(3),o=n(11),a=n(21),i=n(7),c="prototype",u=function(e,t,n){var l,f,s,d=e&u.F,p=e&u.G,v=e&u.S,y=e&u.P,h=e&u.B,w=e&u.W,E=p?o:o[t]||(o[t]={}),b=E[c],m=p?r:v?r[t]:(r[t]||{})[c];p&&(n=t);for(l in n)f=!d&&m&&void 0!==m[l],f&&l in E||(s=f?m[l]:n[l],E[l]=p&&"function"!=typeof m[l]?n[l]:h&&f?a(s,r):w&&m[l]==s?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[c]=e[c],t}(s):y&&"function"==typeof s?a(Function.call,s):s,y&&((E.virtual||(E.virtual={}))[l]=s,e&u.R&&b&&!b[l]&&i(b,l,s)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,n){var r=n(8).f,o=n(6),a=n(1)("toStringTag");e.exports=function(e,t,n){e&&!o(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},function(e,t,n){var r=n(3),o="__core-js_shared__",a=r[o]||(r[o]={});e.exports=function(e){return a[e]||(a[e]={})}},function(e,t,n){var r=n(44),o=n(12);e.exports=function(e){return r(o(e))}},function(e,t,n){var r=n(17),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t,n){var r=n(12);e.exports=function(e){return Object(r(e))}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){s.default.isSingle&&(l.keyboard[90]&&s.default.camera.rotateY(Math.PI/180),l.keyboard[88]&&s.default.camera.rotateY(Math.PI/180,!0)),s.default.isSingle?a(s.default.ball[0],v[0]):(a(s.default.ball[0],v[1]),a(s.default.ball[1],y)),s.default.isSingle&&s.default.camera.lookAt(s.default.ball[0].position),s.default.renderer.render(s.default.scene,s.default.camera),s.default.id=requestAnimationFrame(o)}function a(e,t){if(e.isPlane)if(e.isPlane=!1,l.keyboard[e.keyConf[0]])e.f.y+=1/s.default.FJ;else{var n=new THREE.Vector3(e.v.x,e.v.y,e.v.z);n.negate().divideScalar(n.length()*s.default.FF),e.v.length()<=n.length()?(e.v.x=0,e.v.y=0,e.v.z=0):e.v=e.v.add(n)}var r=void 0,o=void 0;s.default.isSingle?(r=(e.position.x-s.default.camera.position.x)/s.default.FA,o=(e.position.z-s.default.camera.position.z)/s.default.FA):(r=-s.default.camera.position.x/s.default.FA,o=-s.default.camera.position.z/s.default.FA),l.keyboard[e.keyConf[1]]&&(e.f.x+=r,e.f.z+=o),l.keyboard[e.keyConf[2]]&&(e.f.x-=r,e.f.z-=o),l.keyboard[e.keyConf[3]]&&(e.f.x+=o,e.f.z-=r),l.keyboard[e.keyConf[4]]&&(e.f.x-=o,e.f.z+=r),e.f.y+=-1/s.default.FG;var a=new THREE.Vector3(e.f.x,e.f.y,e.f.z),c=a.divideScalar(e.m),u=(0,p.addV)(e.v,c);e.newP.x=e.position.x+u.x,e.newP.y=e.position.y+u.y,e.newP.z=e.position.z+u.z,(0,d.collisionDetection)(e),c=e.f.divideScalar(e.m),e.v.add(c),e.f=new THREE.Vector3(0,0,0);var f=e.v.length().toFixed(2);t.textContent=f,e.position.y+e.v.y<-30?i(e):(e.position.set(e.position.x+e.v.x,e.position.y+e.v.y,e.position.z+e.v.z),s.default.isSingle&&s.default.camera.position.set(s.default.camera.position.x+e.v.x,s.default.camera.position.y+e.v.y,s.default.camera.position.z+e.v.z))}function i(e){var t;(t=e.position).set.apply(t,(0,u.default)(e.initPos)),e.v=new THREE.Vector3(0,0,0),s.default.isSingle&&s.default.camera.position.set(4*s.default.focalDistance,3*s.default.focalDistance,5*s.default.focalDistance)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(10),u=r(c);t.default=o;var l=n(19),f=n(2),s=r(f),d=n(18),p=n(9),v=document.querySelectorAll(".ball-v"),y=document.querySelector(".ball-2-v"),h=document.querySelector(".reset-btn");h.addEventListener("click",function(e){e.ball.forEach(function(e){var t;(t=e.position).set.apply(t,(0,u.default)(e.initPos)),e.v=new THREE.Vector3(0,0,0)}),e.isSingle&&e.camera.position.set(4*e.focalDistance,3*e.focalDistance,5*e.focalDistance)}.bind(void 0,s.default))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(34),a=r(o),i=document.querySelector(".single-btn"),c=document.querySelector(".double-btn");i.addEventListener("click",function(e){document.querySelector(".single-info").style.display="block",document.querySelector(".double-info").style.display="none",(0,a.default)("single")}),c.addEventListener("click",function(e){document.querySelector(".single-info").style.display="none",document.querySelector(".double-info").style.display="block",(0,a.default)("double")})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){h.default.id&&cancelAnimationFrame(h.default.id),a(e),h.default.renderer=new THREE.WebGLRenderer({antialias:!0,precision:"highp",preserveDrawingBuffer:!0}),h.default.renderer.setSize(600,450),x.innerHTML="",x.appendChild(h.default.renderer.domElement),h.default.renderer.setClearColor(0),h.default.scene=new THREE.Scene,i(),(0,w.createAxis)(),f(),l(),c(),u(),(0,p.createEvents)(),h.default.renderer.render(h.default.scene,h.default.camera),h.default.id=requestAnimationFrame(b.default)}function a(e){h.default.renderer=null,h.default.scene=null,h.default.camera=null,h.default.ball=[],h.default.id=null,"double"===e?(h.default.isSingle=!1,h.default.FA=3e4):(h.default.isSingle=!0,h.default.FA=1e4)}function i(){h.default.camera=new THREE.PerspectiveCamera(45,4/3,1,100*h.default.focalDistance),h.default.isSingle?h.default.camera.position.set(4*h.default.focalDistance,3*h.default.focalDistance,5*h.default.focalDistance):h.default.camera.position.set(12*h.default.focalDistance,9*h.default.focalDistance,15*h.default.focalDistance),h.default.camera.lookAt(new THREE.Vector3(0,0,0)),h.default.scene.add(h.default.camera)}function c(){var e=new THREE.AmbientLight(4210752);h.default.scene.add(e),h.default.renderer.shadowMap.enabled=!0,h.default.renderer.shadowMapSoft=!0;var t=new THREE.PointLight(16777215,1,1e3);t.position.set(-4*h.default.focalDistance,5*h.default.focalDistance,5*h.default.focalDistance),t.castShadow=!0,t.shadow.camera.near=1,t.shadow.camera.far=1e3,t.shadow.camera.fov=90,t.shadow.mapSize.width=1024,t.shadow.mapSize.height=1024,h.default.scene.add(t)}function u(){h.default.camera.rotateY=function(e,t){var n=e;t&&(n=-n);var r=void 0;r=h.default.isSingle?(0,w.subtractV)(h.default.ball[0].position,this.position):(0,w.subtractV)(new THREE.Vector3(0,0,0),this.position),r.negate();var o=new THREE.Vector3(r.x*Math.cos(n)-r.z*Math.sin(n),r.y,r.z*Math.cos(n)+r.x*Math.sin(n)),a=(0,w.addV)(this.position,(0,w.subtractV)(o,r));this.position.set(a.x,a.y,a.z)}}function l(){var e=new THREE.Mesh(new THREE.SphereGeometry(h.default.R,32,32),new THREE.MeshLambertMaterial({color:52428}));if(e.castShadow=!0,e.receiveShadow=!0,e.newP=new THREE.Vector3(0,0,0),e.v=new THREE.Vector3(0,0,0),e.f=new THREE.Vector3(0,0,0),e.m=1,e.R=h.default.R,h.default.ball.push(e),h.default.isSingle){var t;e.initPos=[0,10,0],(t=e.position).set.apply(t,(0,d.default)(e.initPos)),e.keyConf=[32,87,83,65,68]}else{var n,r,o=new THREE.Mesh(new THREE.SphereGeometry(h.default.R,32,32),new THREE.MeshLambertMaterial({color:13369548}));o.castShadow=!0,o.receiveShadow=!0,e.keyConf=[67,87,83,65,68],o.keyConf=[78,73,75,74,76],o.newP=new THREE.Vector3(0,0,0),o.v=new THREE.Vector3(0,0,0),o.f=new THREE.Vector3(0,0,0),o.m=1,o.R=h.default.R,e.initPos=[0,10,20],o.initPos=[20,10,0],(n=e.position).set.apply(n,(0,d.default)(e.initPos)),(r=o.position).set.apply(r,(0,d.default)(o.initPos)),h.default.ball.push(o),h.default.scene.add(o)}h.default.scene.add(e)}function f(){var e=new THREE.Mesh(new THREE.BoxGeometry(16*h.default.focalDistance,1,16*h.default.focalDistance),new THREE.MeshLambertMaterial({color:15263976}));e.position.setY(-.5),e.receiveShadow=!0,v.collisionObjs.push(e),h.default.scene.add(e);var t=(0,m.createNormalBlock)({len:[8,2,8],pos:[-2,1,0],color:16316664});v.collisionObjs.push(t),h.default.scene.add(t);var n=(0,m.createNormalBlock)({len:[8,2,8],pos:[-8,3,0],color:16316664});v.collisionObjs.push(n),h.default.scene.add(n);var r=(0,m.createNormalBlock)({len:[8,2,8],pos:[-14,5,0],color:16316664});v.collisionObjs.push(r),h.default.scene.add(r);var o=(0,m.createNormalBlock)({len:[30,16,2],pos:[-10,8,4.8],color:16777215,transparent:!0,shadow:!1});v.collisionObjs.push(o),h.default.scene.add(o);var a=(0,m.createNormalBlock)({len:[30,16,2],pos:[-10,8,-4.8],color:16777215,transparent:!0,shadow:!1});v.collisionObjs.push(a),h.default.scene.add(a)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(10),d=r(s);t.default=o;var p=n(19),v=n(18),y=n(2),h=r(y),w=n(9),E=n(32),b=r(E),m=n(35),x=document.querySelector(".canvas-box")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t,n=new THREE.Mesh(new(Function.prototype.bind.apply(THREE.BoxGeometry,[null].concat((0,i.default)(e.len)))),new THREE.MeshLambertMaterial({color:e.color,transparent:e.transparent||!1,opacity:e.opacity||.3}));return(t=n.position).set.apply(t,(0,i.default)(e.pos)),e.shadow!==!1&&(n.castShadow=!0,n.receiveShadow=!0),n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(10),i=r(a);t.createNormalBlock=o;var c=n(2);r(c)},function(e,t,n){e.exports={default:n(37),__esModule:!0}},function(e,t,n){n(62),n(61),e.exports=n(11).Array.from},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(28),o=n(29),a=n(58);e.exports=function(e){return function(t,n,i){var c,u=r(t),l=o(u.length),f=a(i,l);if(e&&n!=n){for(;l>f;)if(c=u[f++],c!=c)return!0}else for(;l>f;f++)if((e||f in u)&&u[f]===n)return e||f||0;return!e&&-1}}},function(e,t,n){var r=n(20),o=n(1)("toStringTag"),a="Arguments"==r(function(){return arguments}()),i=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,n,c;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=i(t=Object(e),o))?n:a?r(t):"Object"==(c=r(t))&&"function"==typeof t.callee?"Arguments":c}},function(e,t,n){"use strict";var r=n(8),o=n(15);e.exports=function(e,t,n){t in e?r.f(e,t,o(0,n)):e[t]=n}},function(e,t,n){e.exports=n(3).document&&document.documentElement},function(e,t,n){e.exports=!n(5)&&!n(25)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(20);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(14),o=n(1)("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||a[o]===e)}},function(e,t,n){var r=n(4);e.exports=function(e,t,n,o){try{return o?t(r(n)[0],n[1]):t(n)}catch(t){var a=e.return;throw void 0!==a&&r(a.call(e)),t}}},function(e,t,n){"use strict";var r=n(51),o=n(15),a=n(26),i={};n(7)(i,n(1)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(i,{next:o(1,n)}),a(e,t+" Iterator")}},function(e,t,n){"use strict";var r=n(50),o=n(24),a=n(56),i=n(7),c=n(6),u=n(14),l=n(47),f=n(26),s=n(53),d=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),v="@@iterator",y="keys",h="values",w=function(){return this};e.exports=function(e,t,n,E,b,m,x){l(n,t,E);var g,_,O,H=function(e){if(!p&&e in M)return M[e];switch(e){case y:return function(){return new n(this,e)};case h:return function(){return new n(this,e)}}return function(){return new n(this,e)}},R=t+" Iterator",S=b==h,T=!1,M=e.prototype,j=M[d]||M[v]||b&&M[b],P=j||H(b),z=b?S?H("entries"):P:void 0,k="Array"==t?M.entries||j:j;if(k&&(O=s(k.call(new e)),O!==Object.prototype&&(f(O,R,!0),r||c(O,d)||i(O,d,w))),S&&j&&j.name!==h&&(T=!0,P=function(){return j.call(this)}),r&&!x||!p&&!T&&M[d]||i(M,d,P),u[t]=P,u[R]=w,b)if(g={values:S?P:H(h),keys:m?P:H(y),entries:z},x)for(_ in g)_ in M||a(M,_,g[_]);else o(o.P+o.F*(p||T),t,g);return g}},function(e,t,n){var r=n(1)("iterator"),o=!1;try{var a=[7][r]();a.return=function(){o=!0},Array.from(a,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!o)return!1;var n=!1;try{var a=[7],i=a[r]();i.next=function(){return{done:n=!0}},a[r]=function(){return i},e(a)}catch(e){}return n}},function(e,t){e.exports=!0},function(e,t,n){var r=n(4),o=n(52),a=n(23),i=n(16)("IE_PROTO"),c=function(){},u="prototype",l=function(){var e,t=n(22)("iframe"),r=a.length,o="<",i=">";for(t.style.display="none",n(42).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(o+"script"+i+"document.F=Object"+o+"/script"+i),e.close(),l=e.F;r--;)delete l[u][a[r]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(c[u]=r(e),n=new c,c[u]=null,n[i]=e):n=l(),void 0===t?n:o(n,t)}},function(e,t,n){var r=n(8),o=n(4),a=n(55);e.exports=n(5)?Object.defineProperties:function(e,t){o(e);for(var n,i=a(t),c=i.length,u=0;c>u;)r.f(e,n=i[u++],t[n]);return e}},function(e,t,n){var r=n(6),o=n(30),a=n(16)("IE_PROTO"),i=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=o(e),r(e,a)?e[a]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?i:null}},function(e,t,n){var r=n(6),o=n(28),a=n(39)(!1),i=n(16)("IE_PROTO");e.exports=function(e,t){var n,c=o(e),u=0,l=[];for(n in c)n!=i&&r(c,n)&&l.push(n);for(;t.length>u;)r(c,n=t[u++])&&(~a(l,n)||l.push(n));return l}},function(e,t,n){var r=n(54),o=n(23);e.exports=Object.keys||function(e){return r(e,o)}},function(e,t,n){e.exports=n(7)},function(e,t,n){var r=n(17),o=n(12);e.exports=function(e){return function(t,n){var a,i,c=String(o(t)),u=r(n),l=c.length;return u<0||u>=l?e?"":void 0:(a=c.charCodeAt(u),a<55296||a>56319||u+1===l||(i=c.charCodeAt(u+1))<56320||i>57343?e?c.charAt(u):a:e?c.slice(u,u+2):(a-55296<<10)+(i-56320)+65536)}}},function(e,t,n){var r=n(17),o=Math.max,a=Math.min;e.exports=function(e,t){return e=r(e),e<0?o(e+t,0):a(e,t)}},function(e,t,n){var r=n(13);e.exports=function(e,t){if(!r(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!r(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var r=n(40),o=n(1)("iterator"),a=n(14);e.exports=n(11).getIteratorMethod=function(e){if(void 0!=e)return e[o]||e["@@iterator"]||a[r(e)]}},function(e,t,n){"use strict";var r=n(21),o=n(24),a=n(30),i=n(46),c=n(45),u=n(29),l=n(41),f=n(60);o(o.S+o.F*!n(49)(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,o,s,d=a(e),p="function"==typeof this?this:Array,v=arguments.length,y=v>1?arguments[1]:void 0,h=void 0!==y,w=0,E=f(d);if(h&&(y=r(y,v>2?arguments[2]:void 0,2)),void 0==E||p==Array&&c(E))for(t=u(d.length),n=new p(t);t>w;w++)l(n,w,h?y(d[w],w):d[w]);else for(s=E.call(d),n=new p;!(o=s.next()).done;w++)l(n,w,h?i(s,y,[o.value,w],!0):o.value);return n.length=w,n}})},function(e,t,n){"use strict";var r=n(57)(!0);n(48)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})}]);