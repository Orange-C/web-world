!function(e){function t(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=d.p+""+e+"."+w+".hot-update.js",t.appendChild(n)}function n(e){if("undefined"==typeof XMLHttpRequest)return e(new Error("No browser support"));try{var t=new XMLHttpRequest,n=d.p+""+w+".hot-update.json";t.open("GET",n,!0),t.timeout=1e4,t.send(null)}catch(t){return e(t)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)e(new Error("Manifest request to "+n+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)e(new Error("Manifest request to "+n+" failed."));else{try{var r=JSON.parse(t.responseText)}catch(t){return void e(t)}e(null,r)}}}function r(e){function t(e,t){"ready"===_&&i("prepare"),T++,d.e(e,function(){function n(){T--,"prepare"===_&&(O[e]||s(e),0===T&&0===P&&f())}try{t.call(null,r)}finally{n()}})}var n=H[e];if(!n)return d;var r=function(t){return n.hot.active?H[t]?(H[t].parents.indexOf(e)<0&&H[t].parents.push(e),n.children.indexOf(t)<0&&n.children.push(t)):x=[e]:(console.warn("[HMR] unexpected require("+t+") from disposed module "+e),x=[]),d(t)};for(var o in d)Object.prototype.hasOwnProperty.call(d,o)&&(y?Object.defineProperty(r,o,function(e){return{configurable:!0,enumerable:!0,get:function(){return d[e]},set:function(t){d[e]=t}}}(o)):r[o]=d[o]);return y?Object.defineProperty(r,"e",{enumerable:!0,value:t}):r.e=t,r}function o(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,n){if("undefined"==typeof e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n;else t._acceptedDependencies[e]=n},decline:function(e){if("undefined"==typeof e)t._selfDeclined=!0;else if("number"==typeof e)t._declinedDependencies[e]=!0;else for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:u,apply:l,status:function(e){return e?void g.push(e):_},addStatusHandler:function(e){g.push(e)},removeStatusHandler:function(e){var t=g.indexOf(e);t>=0&&g.splice(t,1)},data:E[e]};return t}function i(e){_=e;for(var t=0;t<g.length;t++)g[t].call(null,e)}function a(e){var t=+e+""===e;return t?+e:e}function u(e,t){if("idle"!==_)throw new Error("check() is only allowed in idle status");"function"==typeof e?(m=!1,t=e):(m=e,t=t||function(e){if(e)throw e}),i("check"),n(function(e,n){if(e)return t(e);if(!n)return i("idle"),void t(null,null);R={},S={},O={};for(var r=0;r<n.c.length;r++)S[n.c[r]]=!0;b=n.h,i("prepare"),h=t,v={};var o=0;s(o),"prepare"===_&&0===T&&0===P&&f()})}function c(e,t){if(S[e]&&R[e]){R[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(v[n]=t[n]);0===--P&&0===T&&f()}}function s(e){S[e]?(R[e]=!0,P++,t(e)):O[e]=!0}function f(){i("ready");var e=h;if(h=null,e)if(m)l(m,e);else{var t=[];for(var n in v)Object.prototype.hasOwnProperty.call(v,n)&&t.push(a(n));e(null,t)}}function l(t,n){function r(e){for(var t=[e],n={},r=t.slice();r.length>0;){var i=r.pop(),e=H[i];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return new Error("Aborted because of self decline: "+i);if(0===i)return;for(var a=0;a<e.parents.length;a++){var u=e.parents[a],c=H[u];if(c.hot._declinedDependencies[i])return new Error("Aborted because of declined dependency: "+i+" in "+u);t.indexOf(u)>=0||(c.hot._acceptedDependencies[i]?(n[u]||(n[u]=[]),o(n[u],[i])):(delete n[u],t.push(u),r.push(u)))}}}return[t,n]}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==_)throw new Error("apply() is only allowed in ready status");"function"==typeof t?(n=t,t={}):t&&"object"==typeof t?n=n||function(e){if(e)throw e}:(t={},n=n||function(e){if(e)throw e});var u={},c=[],s={};for(var f in v)if(Object.prototype.hasOwnProperty.call(v,f)){var l=a(f),p=r(l);if(!p){if(t.ignoreUnaccepted)continue;return i("abort"),n(new Error("Aborted because "+l+" is not accepted"))}if(p instanceof Error)return i("abort"),n(p);s[l]=v[l],o(c,p[0]);for(var l in p[1])Object.prototype.hasOwnProperty.call(p[1],l)&&(u[l]||(u[l]=[]),o(u[l],p[1][l]))}for(var y=[],h=0;h<c.length;h++){var l=c[h];H[l]&&H[l].hot._selfAccepted&&y.push({module:l,errorHandler:H[l].hot._selfAccepted})}i("dispose");for(var m=c.slice();m.length>0;){var l=m.pop(),g=H[l];if(g){for(var P={},T=g.hot._disposeHandlers,O=0;O<T.length;O++){var R=T[O];R(P)}E[l]=P,g.hot.active=!1,delete H[l];for(var O=0;O<g.children.length;O++){var S=H[g.children[O]];if(S){var A=S.parents.indexOf(l);A>=0&&S.parents.splice(A,1)}}}}for(var l in u)if(Object.prototype.hasOwnProperty.call(u,l))for(var g=H[l],M=u[l],O=0;O<M.length;O++){var j=M[O],A=g.children.indexOf(j);A>=0&&g.children.splice(A,1)}i("apply"),w=b;for(var l in s)Object.prototype.hasOwnProperty.call(s,l)&&(e[l]=s[l]);var z=null;for(var l in u)if(Object.prototype.hasOwnProperty.call(u,l)){for(var g=H[l],M=u[l],D=[],h=0;h<M.length;h++){var j=M[h],R=g.hot._acceptedDependencies[j];D.indexOf(R)>=0||D.push(R)}for(var h=0;h<D.length;h++){var R=D[h];try{R(u)}catch(e){z||(z=e)}}}for(var h=0;h<y.length;h++){var k=y[h],l=k.module;x=[l];try{d(l)}catch(e){if("function"==typeof k.errorHandler)try{k.errorHandler(e)}catch(e){z||(z=e)}else z||(z=e)}}return z?(i("fail"),n(z)):(i("idle"),void n(null,c))}function d(t){if(H[t])return H[t].exports;var n=H[t]={exports:{},id:t,loaded:!1,hot:o(t),parents:x,children:[]};return e[t].call(n.exports,n,n.exports,r(t)),n.loaded=!0,n.exports}var p=this.webpackHotUpdate;this.webpackHotUpdate=function(e,t){c(e,t),p&&p(e,t)};var y=!1;try{Object.defineProperty({},"x",{get:function(){}}),y=!0}catch(e){}var h,v,b,m=!0,w="e6af8dad1d974bcc2ec4",E={},x=[],g=[],_="idle",P=0,T=0,O={},R={},S={},H={};return d.m=e,d.c=H,d.p="/dist",d.h=function(){return w},r(0)(0)}([function(e,t,n){e.exports=n(33)},function(e,t,n){var r=n(27)("wks"),o=n(31),i=n(3).Symbol,a="function"==typeof i,u=e.exports=function(e){return r[e]||(r[e]=a&&i[e]||(a?i:o)("Symbol."+e))};u.store=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={R:1,focalDistance:9,FA:0,FF:200,FJ:2,FG:55};t.default=n},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){return++w+""}function i(e){return new THREE.Vector3(e.x,e.y,e.z)}function a(e,t){return new THREE.Vector3(e.x+t.x,e.y+t.y,e.z+t.z)}function u(e,t){return new THREE.Vector3(e.x-t.x,e.y-t.y,e.z-t.z)}function c(e,t){var n=e.x*t.x,r=e.y*t.y,o=e.z*t.z;return n+r+o}function s(e){return"x: "+e.x+" y: "+e.y+" z:"+e.z}function f(e){var t=m.default.scene.getObjectByName(e.name);m.default.scene.remove(t)}function l(e){e.v.multiplyScalar(2)}function d(e){e.v.divideScalar(2)}function p(e){e.v.y=1.35/m.default.FJ}function y(e,t){var n=0===t||2===t?-e/2:e/2,r=1===t||2===t?-e/2:e/2;return{offsetX:n,offsetZ:r}}function h(e){return Math.abs(e)>.05?-.55*e:0}function v(){var e=100,t=new THREE.Geometry;t.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(e,0,0));var n=new THREE.Line(t,new THREE.LineBasicMaterial({color:16711680}));m.default.scene.add(n);var r=new THREE.Geometry;r.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,e,0));var o=new THREE.Line(r,new THREE.LineBasicMaterial({color:65280}));m.default.scene.add(o);var i=new THREE.Geometry;i.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,e));var a=new THREE.Line(i,new THREE.LineBasicMaterial({color:255}));m.default.scene.add(a)}Object.defineProperty(t,"__esModule",{value:!0}),t.initName=o,t.cloneV=i,t.addV=a,t.subtractV=u,t.dotV=c,t.logV=s,t.removeObj=f,t.speedUp=l,t.speedDown=d,t.jumpHigh=p,t.calcOffset=y,t.decreaseV=h,t.createAxis=v;var b=n(2),m=r(b),w=0},function(e,t,n){var r=n(13);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){e.exports=!n(25)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(10),o=n(15);e.exports=n(7)?function(e,t,n){return r.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(5),o=n(46),i=n(62),a=Object.defineProperty;t.f=n(7)?Object.defineProperty:function(e,t,n){if(r(e),t=i(t,!0),r(n),o)try{return a(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=n(37),i=r(o);t.default=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,i.default)(e)}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){e.exports={}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var r=n(27)("keys"),o=n(31);e.exports=function(e){return r[e]||(r[e]=o(e))}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){for(var t=p.default.plane.length,n=0;n<t;n++)u(p.default.plane[n],e);y.forEach(function(t,n){"BoxGeometry"===t.geometry.type&&c(t,e,n)});var r=new THREE.Vector3(e.f.x,e.f.y,e.f.z),o=r.divideScalar(e.m),i=(0,l.addV)(e.v,o);e.newP.x=e.position.x+i.x,e.newP.y=e.position.y+i.y,e.newP.z=e.position.z+i.z}function i(e,t){var n=(e.newP.x-t.newP.x)*(e.newP.x-t.newP.x),r=(e.newP.y-t.newP.y)*(e.newP.y-t.newP.y),o=(e.newP.z-t.newP.z)*(e.newP.z-t.newP.z);if(n+r+o<=(e.R+t.R)*(e.R+t.R)){e.f=new THREE.Vector3(0,0,0),t.f=new THREE.Vector3(0,0,0);var i=(0,l.cloneV)(e.v);e.v=t.v,t.v=i,a(e),a(t)}}function a(e){e.newP.x=e.position.x+e.v.x,e.newP.y=e.position.y+e.v.y,e.newP.z=e.position.z+e.v.z}function u(e,t){var n=0-e.position.x,r=0-e.position.z,o=t.newP.x+n,i=t.newP.z+r,a=Math.abs(e.geometry.vertices[0].x),u=Math.abs(e.geometry.vertices[0].y),c=Math.abs(o)>=a||Math.abs(i)>=u;t.newP.y<=t.R&&t.newP.y>=0&&!c&&(t.f.y=0,t.decrease&&t.v.y?t.v.y=(0,l.decreaseV)(t.v.y):t.v.y=0)}function c(e,t,n){var r=(0,l.subtractV)(t.newP,e.position),o=new THREE.Vector3(Math.abs(r.x),Math.abs(r.y),Math.abs(r.z)),i=(0,l.cloneV)(o);i.divide(r);for(var a in i)isNaN(i[a])&&(i[a]=1);var u=e.geometry.vertices[0],c=(0,l.subtractV)(o,u);if(e.penetrable)c.x<0&&c.y<0&&c.z<0&&((0,l.removeObj)(e),y.splice(n,1),e.callback(t),h[e.name]=e,setTimeout(function(e){y.push(h[e]),p.default.scene.add(h[e]),h[e]=null}.bind(this,e.name),e.refresh?e.refresh:5e3));else{var f=!1,d=new THREE.Vector3(c.x,c.y,c.z);if(c.x>=0&&c.y>=0&&c.z>=0)f=c.length()<=t.R;else{c.x<0&&(d.x=0),c.y<0&&(d.y=0),c.z<0&&(d.z=0);var v=d.length();f=0===v||v<=t.R}f&&s(t,c,i)}}function s(e,t,n){return t.z<=0&&t.y<=0&&t.x>=0?(e.decrease&&e.v.x?e.v.x=(0,l.decreaseV)(e.v.x):e.v.x=0,void(e.f.x=0)):t.x<=0&&t.y<=0&&t.z>=0?(e.decrease&&e.v.z?e.v.z=(0,l.decreaseV)(e.v.z):e.v.z=0,void(e.f.z=0)):t.z<=0&&t.x<=0&&t.y>=0?(e.decrease&&e.v.y?e.v.y=(0,l.decreaseV)(e.v.y):e.v.y=0,void(e.f.y=0)):t.z<=0&&t.x>=0&&t.y>=0?(t.z=0,void f(e,t,n)):t.y<=0&&t.x>=0&&t.z>=0?(t.y=0,void f(e,t,n)):t.x<=0&&t.y>=0&&t.z>=0?(t.x=0,void f(e,t,n)):void 0}function f(e,t,n){var r=(0,l.cloneV)(t).normalize(),o=e.v.length(),i=.2;if(o<i){var a=(0,l.cloneV)(e.v).normalize().multiplyScalar(i-o);e.v.add(a)}e.f.multiply(n),e.v.multiply(n),e.f.sub((0,l.cloneV)(e.f).projectOnVector(r)),e.v.sub((0,l.cloneV)(e.v).projectOnVector(r)),e.f.multiply(n),e.v.multiply(n)}Object.defineProperty(t,"__esModule",{value:!0}),t.collisionObjs=void 0,t.collisionDetection=o,t.BallCollision=i;var l=n(4),d=n(2),p=r(d),y=t.collisionObjs=[],h={}},function(e,t){"use strict";function n(){document.addEventListener("keydown",function(e){e.preventDefault(),r[e.keyCode]=!0}),document.addEventListener("keyup",function(e){e.preventDefault(),r[e.keyCode]=!1})}Object.defineProperty(t,"__esModule",{value:!0}),t.createEvents=n;var r=t.keyboard={}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(41);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var r=n(13),o=n(3).document,i=r(o)&&r(o.createElement);e.exports=function(e){return i?o.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var r=n(3),o=n(6),i=n(21),a=n(9),u="prototype",c=function(e,t,n){var s,f,l,d=e&c.F,p=e&c.G,y=e&c.S,h=e&c.P,v=e&c.B,b=e&c.W,m=p?o:o[t]||(o[t]={}),w=m[u],E=p?r:y?r[t]:(r[t]||{})[u];p&&(n=t);for(s in n)f=!d&&E&&void 0!==E[s],f&&s in m||(l=f?E[s]:n[s],m[s]=p&&"function"!=typeof E[s]?n[s]:v&&f?i(l,r):b&&E[s]==l?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[u]=e[u],t}(l):h&&"function"==typeof l?i(Function.call,l):l,h&&((m.virtual||(m.virtual={}))[s]=l,e&c.R&&w&&!w[s]&&a(w,s,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,n){var r=n(10).f,o=n(8),i=n(1)("toStringTag");e.exports=function(e,t,n){e&&!o(e=n?e:e.prototype,i)&&r(e,i,{configurable:!0,value:t})}},function(e,t,n){var r=n(3),o="__core-js_shared__",i=r[o]||(r[o]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,n){var r=n(47),o=n(12);e.exports=function(e){return r(o(e))}},function(e,t,n){var r=n(17),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t,n){var r=n(12);e.exports=function(e){return Object(r(e))}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){d.default.isSingle&&(f.keyboard[79]&&d.default.camera.rotateY(Math.PI/180),f.keyboard[80]&&d.default.camera.rotateY(Math.PI/180,!0)),d.default.isSingle?(i(d.default.ball[0]),(0,p.collisionDetection)(d.default.ball[0]),a(d.default.ball[0],h[0])):(i(d.default.ball[0],h[1]),i(d.default.ball[1],v),(0,p.collisionDetection)(d.default.ball[0]),(0,p.collisionDetection)(d.default.ball[1]),(0,p.BallCollision)(d.default.ball[0],d.default.ball[1]),(0,p.collisionDetection)(d.default.ball[0]),(0,p.collisionDetection)(d.default.ball[1]),(0,p.BallCollision)(d.default.ball[0],d.default.ball[1]),a(d.default.ball[0],h[1]),a(d.default.ball[1],v)),d.default.isSingle&&d.default.camera.lookAt(d.default.ball[0].position),d.default.renderer.render(d.default.scene,d.default.camera),d.default.id=requestAnimationFrame(o)}function i(e){if(!e.v.y)if(f.keyboard[e.keyConf[0]])e.f.y+=1/d.default.FJ;else{var t=new THREE.Vector3(e.v.x,e.v.y,e.v.z);t.negate().divideScalar(t.length()*d.default.FF),e.v.length()<=t.length()?(e.v.x=0,e.v.y=0,e.v.z=0):e.v=e.v.add(t)}var n=void 0,r=void 0;d.default.isSingle?(n=(e.position.x-d.default.camera.position.x)/d.default.FA,r=(e.position.z-d.default.camera.position.z)/d.default.FA):(n=-d.default.camera.position.x/d.default.FA,r=-d.default.camera.position.z/d.default.FA),f.keyboard[e.keyConf[1]]&&(e.f.x+=n,e.f.z+=r),f.keyboard[e.keyConf[2]]&&(e.f.x-=n,e.f.z-=r),f.keyboard[e.keyConf[3]]&&(e.f.x+=r,e.f.z-=n),f.keyboard[e.keyConf[4]]&&(e.f.x-=r,e.f.z+=n),e.f.y+=-1/d.default.FG;var o=new THREE.Vector3(e.f.x,e.f.y,e.f.z),i=o.divideScalar(e.m),a=(0,y.addV)(e.v,i);e.newP.x=e.position.x+a.x,e.newP.y=e.position.y+a.y,e.newP.z=e.position.z+a.z}function a(e,t){var n=e.f.divideScalar(e.m);e.v.add(n),e.f=new THREE.Vector3(0,0,0);var r=(100*e.v.length()).toFixed(0);t.textContent=r,e.position.y+e.v.y<-30?u(e):(e.position.set(e.position.x+e.v.x,e.position.y+e.v.y,e.position.z+e.v.z),d.default.isSingle&&d.default.camera.position.set(d.default.camera.position.x+e.v.x,d.default.camera.position.y+e.v.y,d.default.camera.position.z+e.v.z))}function u(e){var t;(t=e.position).set.apply(t,(0,s.default)(e.initPos)),e.v=new THREE.Vector3(0,0,0),d.default.isSingle&&d.default.camera.position.set(4*d.default.focalDistance,3*d.default.focalDistance,5*d.default.focalDistance)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(11),s=r(c);t.default=o;var f=n(19),l=n(2),d=r(l),p=n(18),y=n(4),h=document.querySelectorAll(".ball-v"),v=document.querySelector(".ball-2-v"),b=document.querySelector(".reset-btn");b.addEventListener("click",function(e){e.ball.forEach(function(e){var t;(t=e.position).set.apply(t,(0,s.default)(e.initPos)),e.v=new THREE.Vector3(0,0,0)}),e.isSingle&&e.camera.position.set(4*e.focalDistance,3*e.focalDistance,5*e.focalDistance)}.bind(void 0,d.default))},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(){var e=v.value;console.log(e),fetch("http://127.0.0.1:4000/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:(0,a.default)({url:e})}).then(function(e){return e.json()}).then(function(e){console.log(e),l.style.display="block",d.style.display="block",p.style.display="block",y.style.display="none",(0,c.default)("single",e.dom)}).catch(function(e){console.log(e)})}var i=n(38),a=r(i);n(67),n(66);var u=n(34),c=r(u),s=document.querySelector(".single-btn"),f=document.querySelector(".double-btn"),l=document.querySelector(".reset-btn"),d=document.querySelector(".back-btn"),p=document.querySelector(".single-info"),y=document.querySelector(".double-info"),h=document.querySelector(".analyze-box"),v=document.querySelector(".analyze-url"),b=document.querySelector(".analyze-btn");fetch("http://127.0.0.1:4000").then(function(e){200===e.status&&(h.style.display="block",b.addEventListener("click",function(e){o()}))}).then(function(e){}).catch(function(e){console.log(e)}),d.addEventListener("click",function(e){window.location.reload()}),s.addEventListener("click",function(e){l.style.display="block",d.style.display="block",p.style.display="block",y.style.display="none",(0,c.default)("single")}),f.addEventListener("click",function(e){l.style.display="block",d.style.display="block",p.style.display="none",y.style.display="block",(0,c.default)("double")})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){y.default.id&&cancelAnimationFrame(y.default.id),i(e),y.default.renderer=new THREE.WebGLRenderer({antialias:!0,precision:"highp",preserveDrawingBuffer:!0}),y.default.renderer.setSize(E,x),w.innerHTML="",w.appendChild(y.default.renderer.domElement),y.default.renderer.setClearColor(0),y.default.scene=new THREE.Scene,a(),u(),(0,m.initMap)(t),s(),c(),(0,d.createEvents)(),y.default.renderer.render(y.default.scene,y.default.camera),y.default.id=requestAnimationFrame(b.default)}function i(e){y.default.renderer=null,y.default.scene=null,y.default.camera=null,y.default.light=null,y.default.ball=[],y.default.plane=[],y.default.id=null,"double"===e?(y.default.isSingle=!1,y.default.FA=18e3):(y.default.isSingle=!0,y.default.FA=6e3)}function a(){y.default.camera=new THREE.PerspectiveCamera(45,E/x,1,100*y.default.focalDistance),y.default.isSingle?y.default.camera.position.set(4*y.default.focalDistance,3*y.default.focalDistance,5*y.default.focalDistance):y.default.camera.position.set(4*y.default.focalDistance,9*y.default.focalDistance,17*y.default.focalDistance),y.default.camera.lookAt(new THREE.Vector3(0,0,0)),y.default.scene.add(y.default.camera)}function u(){var e=new THREE.AmbientLight(4210752,.5);y.default.scene.add(e),y.default.renderer.shadowMap.enabled=!0,y.default.renderer.shadowMapSoft=!0;var t=new THREE.DirectionalLight(16777215,1);t.position.set(-8*y.default.focalDistance,10*y.default.focalDistance,6*y.default.focalDistance),t.castShadow=!0,t.shadow.camera.near=1,t.shadow.camera.far=5e3,t.shadow.camera.left=-24*y.default.focalDistance,t.shadow.camera.right=24*y.default.focalDistance,t.shadow.camera.bottom=-24*y.default.focalDistance,t.shadow.camera.top=24*y.default.focalDistance,t.shadow.mapSize.width=3e3,t.shadow.mapSize.height=3e3,y.default.light=t,y.default.scene.add(t)}function c(){y.default.camera.rotateY=function(e,t){var n=e;t&&(n=-n);var r=void 0;r=y.default.isSingle?(0,h.subtractV)(y.default.ball[0].position,this.position):(0,h.subtractV)(new THREE.Vector3(0,0,0),this.position),r.negate();var o=new THREE.Vector3(r.x*Math.cos(n)-r.z*Math.sin(n),r.y,r.z*Math.cos(n)+r.x*Math.sin(n)),i=(0,h.addV)(this.position,(0,h.subtractV)(o,r));this.position.set(i.x,i.y,i.z)}}function s(){var e=new THREE.Mesh(new THREE.SphereGeometry(y.default.R,32,32),new THREE.MeshPhongMaterial({color:13450301}));if(e.castShadow=!0,e.receiveShadow=!0,e.newP=new THREE.Vector3(0,0,0),e.v=new THREE.Vector3(0,0,0),e.f=new THREE.Vector3(0,0,0),e.m=1,e.R=y.default.R,e.decrease=!0,y.default.ball.push(e),y.default.isSingle){var t;e.initPos=[0,18,0],(t=e.position).set.apply(t,(0,l.default)(e.initPos)),e.keyConf=[32,87,83,65,68]}else{var n,r,o=new THREE.Mesh(new THREE.SphereGeometry(y.default.R,32,32),new THREE.MeshLambertMaterial({color:52428}));o.castShadow=!0,o.receiveShadow=!0,e.keyConf=[67,87,83,65,68],o.keyConf=[78,73,75,74,76],o.newP=new THREE.Vector3(0,0,0),o.v=new THREE.Vector3(0,0,0),o.f=new THREE.Vector3(0,0,0),o.m=1,o.R=y.default.R,o.decrease=!0,e.initPos=[0,18,20],o.initPos=[20,18,0],(n=e.position).set.apply(n,(0,l.default)(e.initPos)),(r=o.position).set.apply(r,(0,l.default)(o.initPos)),y.default.ball.push(o),y.default.scene.add(o)}y.default.scene.add(e)}Object.defineProperty(t,"__esModule",{value:!0});var f=n(11),l=r(f);t.default=o;var d=n(19),p=n(2),y=r(p),h=n(4),v=n(32),b=r(v),m=n(35),w=document.querySelector(".canvas-box"),E=1e3,x=600},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(e)i(e,72,12,2);else{var t=new THREE.Mesh(new THREE.PlaneGeometry(16*u.default.focalDistance,16*u.default.focalDistance),new THREE.MeshLambertMaterial({color:15263976}));t.rotateX(-Math.PI/2),t.receiveShadow=!0,u.default.plane.push(t),u.default.scene.add(t)}}function i(e,t,n,r,o){var a=t-n;e.forEach(function(e,l){if(!(l>=4&&r>3)){console.log(e.name);var d=16316664,p=4,y=(0,f.calcOffset)(t,l%4),h=void 0,v=void 0,b=0,m=0;if(r<3){var w=144*-Math.floor(l/4);if(l%4===0){var E=new THREE.Mesh(new THREE.PlaneGeometry(18*u.default.focalDistance,18*u.default.focalDistance),new THREE.MeshLambertMaterial({color:15263976}));E.rotateX(-Math.PI/2),E.position.setZ(w),E.receiveShadow=!0,u.default.plane.push(E),u.default.scene.add(E)}y.offsetZ+=w}o&&(y.offsetX+=o.offsetX,y.offsetZ+=o.offsetZ);var x=Date.now()%2;"a"===e.name&&(d=16629313,p=1,h=!0,v=!1,m=a+m<4?4:0,b=l%4?l%4*5+3:3),"input"===e.name&&(d=x?3525707:16537428,p=4,h=!0,v=!1,m=a+m<4?3:0,b=1.2),"ul"!==e.name&&"select"!==e.name||(m=-8,p=4),"li"!==e.name&&"option"!==e.name||(m=4.1,p=1,b=-1),"option"!==e.name&&"select"!==e.name||(v=!1),"span"===e.name&&(h=!0,v=!1),"img"===e.name&&(p=1,m=4);var g=(0,c.createNormalBlock)({len:[a+m,p,a+m],pos:[y.offsetX,r+b,y.offsetZ],color:d,transparent:h,shadow:v});if(g.name=(0,f.initName)(),"a"===e.name&&(g.penetrable=!0,g.callback=f.jumpHigh),"input"===e.name&&(g.penetrable=!0,g.callback=x?f.speedUp:f.speedDown),"option"!==e.name&&"select"!==e.name&&s.collisionObjs.push(g),u.default.scene.add(g),e.children.length&&"a"!==e.name){var _=n/2>4?n/2:4;i(e.children,a/2,_,r+4,y)}}})}Object.defineProperty(t,"__esModule",{value:!0}),t.initMap=o;var a=n(2),u=r(a),c=n(36),s=n(18),f=n(4)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t,n=new THREE.Mesh(new(Function.prototype.bind.apply(THREE.BoxGeometry,[null].concat((0,a.default)(e.len)))),new THREE.MeshPhongMaterial({color:e.color,transparent:e.transparent||!1,opacity:e.opacity||.45}));return(t=n.position).set.apply(t,(0,a.default)(e.pos)),e.shadow!==!1&&(n.castShadow=!0,n.receiveShadow=!0),n}Object.defineProperty(t,"__esModule",{value:!0});var i=n(11),a=r(i);t.createNormalBlock=o;var u=n(2);r(u)},function(e,t,n){e.exports={default:n(39),__esModule:!0}},function(e,t,n){e.exports={default:n(40),__esModule:!0}},function(e,t,n){n(65),n(64),e.exports=n(6).Array.from},function(e,t,n){var r=n(6),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(28),o=n(29),i=n(61);e.exports=function(e){return function(t,n,a){var u,c=r(t),s=o(c.length),f=i(a,s);if(e&&n!=n){for(;s>f;)if(u=c[f++],u!=u)return!0}else for(;s>f;f++)if((e||f in c)&&c[f]===n)return e||f||0;return!e&&-1}}},function(e,t,n){var r=n(20),o=n(1)("toStringTag"),i="Arguments"==r(function(){return arguments}()),a=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,n,u;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=a(t=Object(e),o))?n:i?r(t):"Object"==(u=r(t))&&"function"==typeof t.callee?"Arguments":u}},function(e,t,n){"use strict";var r=n(10),o=n(15);e.exports=function(e,t,n){t in e?r.f(e,t,o(0,n)):e[t]=n}},function(e,t,n){e.exports=n(3).document&&document.documentElement},function(e,t,n){e.exports=!n(7)&&!n(25)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(20);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(14),o=n(1)("iterator"),i=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||i[o]===e)}},function(e,t,n){var r=n(5);e.exports=function(e,t,n,o){try{return o?t(r(n)[0],n[1]):t(n)}catch(t){var i=e.return;throw void 0!==i&&r(i.call(e)),t}}},function(e,t,n){"use strict";var r=n(54),o=n(15),i=n(26),a={};n(9)(a,n(1)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(a,{next:o(1,n)}),i(e,t+" Iterator")}},function(e,t,n){"use strict";var r=n(53),o=n(24),i=n(59),a=n(9),u=n(8),c=n(14),s=n(50),f=n(26),l=n(56),d=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),y="@@iterator",h="keys",v="values",b=function(){return this};e.exports=function(e,t,n,m,w,E,x){s(n,t,m);var g,_,P,T=function(e){if(!p&&e in H)return H[e];switch(e){case h:return function(){return new n(this,e)};case v:return function(){return new n(this,e)}}return function(){return new n(this,e)}},O=t+" Iterator",R=w==v,S=!1,H=e.prototype,A=H[d]||H[y]||w&&H[w],M=A||T(w),j=w?R?T("entries"):M:void 0,z="Array"==t?H.entries||A:A;if(z&&(P=l(z.call(new e)),P!==Object.prototype&&(f(P,O,!0),r||u(P,d)||a(P,d,b))),R&&A&&A.name!==v&&(S=!0,M=function(){return A.call(this)}),r&&!x||!p&&!S&&H[d]||a(H,d,M),c[t]=M,c[O]=b,w)if(g={values:R?M:T(v),keys:E?M:T(h),entries:j},x)for(_ in g)_ in H||i(H,_,g[_]);else o(o.P+o.F*(p||S),t,g);return g}},function(e,t,n){var r=n(1)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!o)return!1;var n=!1;try{var i=[7],a=i[r]();a.next=function(){return{done:n=!0}},i[r]=function(){return a},e(i)}catch(e){}return n}},function(e,t){e.exports=!0},function(e,t,n){var r=n(5),o=n(55),i=n(23),a=n(16)("IE_PROTO"),u=function(){},c="prototype",s=function(){var e,t=n(22)("iframe"),r=i.length,o="<",a=">";for(t.style.display="none",n(45).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(o+"script"+a+"document.F=Object"+o+"/script"+a),e.close(),s=e.F;r--;)delete s[c][i[r]];return s()};e.exports=Object.create||function(e,t){var n;return null!==e?(u[c]=r(e),n=new u,u[c]=null,n[a]=e):n=s(),void 0===t?n:o(n,t)}},function(e,t,n){var r=n(10),o=n(5),i=n(58);e.exports=n(7)?Object.defineProperties:function(e,t){o(e);for(var n,a=i(t),u=a.length,c=0;u>c;)r.f(e,n=a[c++],t[n]);return e}},function(e,t,n){var r=n(8),o=n(30),i=n(16)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=o(e),r(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},function(e,t,n){var r=n(8),o=n(28),i=n(42)(!1),a=n(16)("IE_PROTO");e.exports=function(e,t){var n,u=o(e),c=0,s=[];for(n in u)n!=a&&r(u,n)&&s.push(n);for(;t.length>c;)r(u,n=t[c++])&&(~i(s,n)||s.push(n));return s}},function(e,t,n){var r=n(57),o=n(23);e.exports=Object.keys||function(e){return r(e,o)}},function(e,t,n){e.exports=n(9)},function(e,t,n){var r=n(17),o=n(12);e.exports=function(e){return function(t,n){var i,a,u=String(o(t)),c=r(n),s=u.length;return c<0||c>=s?e?"":void 0:(i=u.charCodeAt(c),i<55296||i>56319||c+1===s||(a=u.charCodeAt(c+1))<56320||a>57343?e?u.charAt(c):i:e?u.slice(c,c+2):(i-55296<<10)+(a-56320)+65536)}}},function(e,t,n){var r=n(17),o=Math.max,i=Math.min;e.exports=function(e,t){return e=r(e),e<0?o(e+t,0):i(e,t)}},function(e,t,n){var r=n(13);e.exports=function(e,t){if(!r(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!r(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var r=n(43),o=n(1)("iterator"),i=n(14);e.exports=n(6).getIteratorMethod=function(e){if(void 0!=e)return e[o]||e["@@iterator"]||i[r(e)]}},function(e,t,n){"use strict";var r=n(21),o=n(24),i=n(30),a=n(49),u=n(48),c=n(29),s=n(44),f=n(63);o(o.S+o.F*!n(52)(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,o,l,d=i(e),p="function"==typeof this?this:Array,y=arguments.length,h=y>1?arguments[1]:void 0,v=void 0!==h,b=0,m=f(d);if(v&&(h=r(h,y>2?arguments[2]:void 0,2)),void 0==m||p==Array&&u(m))for(t=c(d.length),n=new p(t);t>b;b++)s(n,b,v?h(d[b],b):d[b]);else for(l=m.call(d),n=new p;!(o=l.next()).done;b++)s(n,b,v?a(l,h,[o.value,b],!0):o.value);return n.length=b,n}})},function(e,t,n){"use strict";var r=n(60)(!0);n(51)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t){},function(e,t){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function n(e){return"string"!=typeof e&&(e=String(e)),e}function r(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return b.iterable&&(t[Symbol.iterator]=function(){return t}),t}function o(e){this.map={},e instanceof o?e.forEach(function(e,t){this.append(t,e)},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function i(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function a(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function u(e){var t=new FileReader,n=a(t);return t.readAsArrayBuffer(e),n}function c(e){var t=new FileReader,n=a(t);return t.readAsText(e),n}function s(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}function f(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),
t.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(b.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(b.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(b.arrayBuffer&&b.blob&&w(e))this._bodyArrayBuffer=f(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!E(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return c(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(s(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(y)}),this.json=function(){return this.text().then(JSON.parse)},this}function d(e){var t=e.toUpperCase();return x.indexOf(t)>-1?t:e}function p(e,t){t=t||{};var n=t.body;if(e instanceof p){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new o(e.headers)),this.method=e.method,this.mode=e.mode,n||null==e._bodyInit||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new o(t.headers)),this.method=d(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function y(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(o))}}),t}function h(e){var t=new o;return e.split(/\r?\n/).forEach(function(e){var n=e.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();t.append(r,o)}}),t}function v(e,t){t||(t={}),this.type="default",this.status="status"in t?t.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new o(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){var b={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(b.arrayBuffer)var m=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(e){return e&&DataView.prototype.isPrototypeOf(e)},E=ArrayBuffer.isView||function(e){return e&&m.indexOf(Object.prototype.toString.call(e))>-1};o.prototype.append=function(e,r){e=t(e),r=n(r);var o=this.map[e];this.map[e]=o?o+","+r:r},o.prototype.delete=function(e){delete this.map[t(e)]},o.prototype.get=function(e){return e=t(e),this.has(e)?this.map[e]:null},o.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},o.prototype.set=function(e,r){this.map[t(e)]=n(r)},o.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},o.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),r(e)},o.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),r(e)},o.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),r(e)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var x=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},l.call(p.prototype),l.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},v.error=function(){var e=new v(null,{status:0,statusText:""});return e.type="error",e};var g=[301,302,303,307,308];v.redirect=function(e,t){if(g.indexOf(t)===-1)throw new RangeError("Invalid status code");return new v(null,{status:t,headers:{location:e}})},e.Headers=o,e.Request=p,e.Response=v,e.fetch=function(e,t){return new Promise(function(n,r){var o=new p(e,t),i=new XMLHttpRequest;i.onload=function(){var e={status:i.status,statusText:i.statusText,headers:h(i.getAllResponseHeaders()||"")};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var t="response"in i?i.response:i.responseText;n(new v(t,e))},i.onerror=function(){r(new TypeError("Network request failed"))},i.ontimeout=function(){r(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&b.blob&&(i.responseType="blob"),o.headers.forEach(function(e,t){i.setRequestHeader(t,e)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}]);