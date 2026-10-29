(()=>{var m_=Object.create;var $f=Object.defineProperty;var g_=Object.getOwnPropertyDescriptor;var __=Object.getOwnPropertyNames;var b_=Object.getPrototypeOf,x_=Object.prototype.hasOwnProperty;var v_=(a,e)=>()=>(e||a((e={exports:{}}).exports,e),e.exports);var y_=(a,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of __(e))!x_.call(a,r)&&r!==n&&$f(a,r,{get:()=>e[r],enumerable:!(i=g_(e,r))||i.enumerable});return a};var M_=(a,e,n)=>(n=a!=null?m_(b_(a)):{},y_(e||!a||!a.__esModule?$f(n,"default",{value:a,enumerable:!0}):n,a));var Sg=v_(rl=>{(function(){"use strict";var a=function(){this.init()};a.prototype={init:function(){var l=this||e;return l._counter=1e3,l._html5AudioPool=[],l.html5PoolSize=10,l._codecs={},l._howls=[],l._muted=!1,l._volume=1,l._canPlayEvent="canplaythrough",l._navigator=typeof window!="undefined"&&window.navigator?window.navigator:null,l.masterGain=null,l.noAudio=!1,l.usingWebAudio=!0,l.autoSuspend=!0,l.ctx=null,l.autoUnlock=!0,l._setup(),l},volume:function(l){var h=this||e;if(l=parseFloat(l),h.ctx||f(),typeof l!="undefined"&&l>=0&&l<=1){if(h._volume=l,h._muted)return h;h.usingWebAudio&&h.masterGain.gain.setValueAtTime(l,e.ctx.currentTime);for(var d=0;d<h._howls.length;d++)if(!h._howls[d]._webAudio)for(var p=h._howls[d]._getSoundIds(),_=0;_<p.length;_++){var b=h._howls[d]._soundById(p[_]);b&&b._node&&(b._node.volume=b._volume*l)}return h}return h._volume},mute:function(l){var h=this||e;h.ctx||f(),h._muted=l,h.usingWebAudio&&h.masterGain.gain.setValueAtTime(l?0:h._volume,e.ctx.currentTime);for(var d=0;d<h._howls.length;d++)if(!h._howls[d]._webAudio)for(var p=h._howls[d]._getSoundIds(),_=0;_<p.length;_++){var b=h._howls[d]._soundById(p[_]);b&&b._node&&(b._node.muted=l?!0:b._muted)}return h},stop:function(){for(var l=this||e,h=0;h<l._howls.length;h++)l._howls[h].stop();return l},unload:function(){for(var l=this||e,h=l._howls.length-1;h>=0;h--)l._howls[h].unload();return l.usingWebAudio&&l.ctx&&typeof l.ctx.close!="undefined"&&(l.ctx.close(),l.ctx=null,f()),l},codecs:function(l){return(this||e)._codecs[l.replace(/^x-/,"")]},_setup:function(){var l=this||e;if(l.state=l.ctx&&l.ctx.state||"suspended",l._autoSuspend(),!l.usingWebAudio)if(typeof Audio!="undefined")try{var h=new Audio;typeof h.oncanplaythrough=="undefined"&&(l._canPlayEvent="canplay")}catch{l.noAudio=!0}else l.noAudio=!0;try{var h=new Audio;h.muted&&(l.noAudio=!0)}catch{}return l.noAudio||l._setupCodecs(),l},_setupCodecs:function(){var l=this||e,h=null;try{h=typeof Audio!="undefined"?new Audio:null}catch{return l}if(!h||typeof h.canPlayType!="function")return l;var d=h.canPlayType("audio/mpeg;").replace(/^no$/,""),p=l._navigator?l._navigator.userAgent:"",_=p.match(/OPR\/(\d+)/g),b=_&&parseInt(_[0].split("/")[1],10)<33,m=p.indexOf("Safari")!==-1&&p.indexOf("Chrome")===-1,g=p.match(/Version\/(.*?) /),v=m&&g&&parseInt(g[1],10)<15;return l._codecs={mp3:!!(!b&&(d||h.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!d,opus:!!h.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!h.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!h.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(h.canPlayType('audio/wav; codecs="1"')||h.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!h.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!h.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(h.canPlayType("audio/x-m4a;")||h.canPlayType("audio/m4a;")||h.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(h.canPlayType("audio/x-m4b;")||h.canPlayType("audio/m4b;")||h.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(h.canPlayType("audio/x-mp4;")||h.canPlayType("audio/mp4;")||h.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!v&&h.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!v&&h.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!h.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(h.canPlayType("audio/x-flac;")||h.canPlayType("audio/flac;")).replace(/^no$/,"")},l},_unlockAudio:function(){var l=this||e;if(!(l._audioUnlocked||!l.ctx)){l._audioUnlocked=!1,l.autoUnlock=!1,!l._mobileUnloaded&&l.ctx.sampleRate!==44100&&(l._mobileUnloaded=!0,l.unload()),l._scratchBuffer=l.ctx.createBuffer(1,1,22050);var h=function(d){for(;l._html5AudioPool.length<l.html5PoolSize;)try{var p=new Audio;p._unlocked=!0,l._releaseHtml5Audio(p)}catch{l.noAudio=!0;break}for(var _=0;_<l._howls.length;_++)if(!l._howls[_]._webAudio)for(var b=l._howls[_]._getSoundIds(),m=0;m<b.length;m++){var g=l._howls[_]._soundById(b[m]);g&&g._node&&!g._node._unlocked&&(g._node._unlocked=!0,g._node.load())}l._autoResume();var v=l.ctx.createBufferSource();v.buffer=l._scratchBuffer,v.connect(l.ctx.destination),typeof v.start=="undefined"?v.noteOn(0):v.start(0),typeof l.ctx.resume=="function"&&l.ctx.resume(),v.onended=function(){v.disconnect(0),l._audioUnlocked=!0,document.removeEventListener("touchstart",h,!0),document.removeEventListener("touchend",h,!0),document.removeEventListener("click",h,!0),document.removeEventListener("keydown",h,!0);for(var x=0;x<l._howls.length;x++)l._howls[x]._emit("unlock")}};return document.addEventListener("touchstart",h,!0),document.addEventListener("touchend",h,!0),document.addEventListener("click",h,!0),document.addEventListener("keydown",h,!0),l}},_obtainHtml5Audio:function(){var l=this||e;if(l._html5AudioPool.length)return l._html5AudioPool.pop();var h=new Audio().play();return h&&typeof Promise!="undefined"&&(h instanceof Promise||typeof h.then=="function")&&h.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(l){var h=this||e;return l._unlocked&&h._html5AudioPool.push(l),h},_autoSuspend:function(){var l=this;if(!(!l.autoSuspend||!l.ctx||typeof l.ctx.suspend=="undefined"||!e.usingWebAudio)){for(var h=0;h<l._howls.length;h++)if(l._howls[h]._webAudio){for(var d=0;d<l._howls[h]._sounds.length;d++)if(!l._howls[h]._sounds[d]._paused)return l}return l._suspendTimer&&clearTimeout(l._suspendTimer),l._suspendTimer=setTimeout(function(){if(l.autoSuspend){l._suspendTimer=null,l.state="suspending";var p=function(){l.state="suspended",l._resumeAfterSuspend&&(delete l._resumeAfterSuspend,l._autoResume())};l.ctx.suspend().then(p,p)}},3e4),l}},_autoResume:function(){var l=this;if(!(!l.ctx||typeof l.ctx.resume=="undefined"||!e.usingWebAudio))return l.state==="running"&&l.ctx.state!=="interrupted"&&l._suspendTimer?(clearTimeout(l._suspendTimer),l._suspendTimer=null):l.state==="suspended"||l.state==="running"&&l.ctx.state==="interrupted"?(l.ctx.resume().then(function(){l.state="running";for(var h=0;h<l._howls.length;h++)l._howls[h]._emit("resume")}),l._suspendTimer&&(clearTimeout(l._suspendTimer),l._suspendTimer=null)):l.state==="suspending"&&(l._resumeAfterSuspend=!0),l}};var e=new a,n=function(l){var h=this;if(!l.src||l.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}h.init(l)};n.prototype={init:function(l){var h=this;return e.ctx||f(),h._autoplay=l.autoplay||!1,h._format=typeof l.format!="string"?l.format:[l.format],h._html5=l.html5||!1,h._muted=l.mute||!1,h._loop=l.loop||!1,h._pool=l.pool||5,h._preload=typeof l.preload=="boolean"||l.preload==="metadata"?l.preload:!0,h._rate=l.rate||1,h._sprite=l.sprite||{},h._src=typeof l.src!="string"?l.src:[l.src],h._volume=l.volume!==void 0?l.volume:1,h._xhr={method:l.xhr&&l.xhr.method?l.xhr.method:"GET",headers:l.xhr&&l.xhr.headers?l.xhr.headers:null,withCredentials:l.xhr&&l.xhr.withCredentials?l.xhr.withCredentials:!1},h._duration=0,h._state="unloaded",h._sounds=[],h._endTimers={},h._queue=[],h._playLock=!1,h._onend=l.onend?[{fn:l.onend}]:[],h._onfade=l.onfade?[{fn:l.onfade}]:[],h._onload=l.onload?[{fn:l.onload}]:[],h._onloaderror=l.onloaderror?[{fn:l.onloaderror}]:[],h._onplayerror=l.onplayerror?[{fn:l.onplayerror}]:[],h._onpause=l.onpause?[{fn:l.onpause}]:[],h._onplay=l.onplay?[{fn:l.onplay}]:[],h._onstop=l.onstop?[{fn:l.onstop}]:[],h._onmute=l.onmute?[{fn:l.onmute}]:[],h._onvolume=l.onvolume?[{fn:l.onvolume}]:[],h._onrate=l.onrate?[{fn:l.onrate}]:[],h._onseek=l.onseek?[{fn:l.onseek}]:[],h._onunlock=l.onunlock?[{fn:l.onunlock}]:[],h._onresume=[],h._webAudio=e.usingWebAudio&&!h._html5,typeof e.ctx!="undefined"&&e.ctx&&e.autoUnlock&&e._unlockAudio(),e._howls.push(h),h._autoplay&&h._queue.push({event:"play",action:function(){h.play()}}),h._preload&&h._preload!=="none"&&h.load(),h},load:function(){var l=this,h=null;if(e.noAudio){l._emit("loaderror",null,"No audio support.");return}typeof l._src=="string"&&(l._src=[l._src]);for(var d=0;d<l._src.length;d++){var p,_;if(l._format&&l._format[d])p=l._format[d];else{if(_=l._src[d],typeof _!="string"){l._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}p=/^data:audio\/([^;,]+);/i.exec(_),p||(p=/\.([^.]+)$/.exec(_.split("?",1)[0])),p&&(p=p[1].toLowerCase())}if(p||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),p&&e.codecs(p)){h=l._src[d];break}}if(!h){l._emit("loaderror",null,"No codec support for selected audio sources.");return}return l._src=h,l._state="loading",window.location.protocol==="https:"&&h.slice(0,5)==="http:"&&(l._html5=!0,l._webAudio=!1),new i(l),l._webAudio&&s(l),l},play:function(l,h){var d=this,p=null;if(typeof l=="number")p=l,l=null;else{if(typeof l=="string"&&d._state==="loaded"&&!d._sprite[l])return null;if(typeof l=="undefined"&&(l="__default",!d._playLock)){for(var _=0,b=0;b<d._sounds.length;b++)d._sounds[b]._paused&&!d._sounds[b]._ended&&(_++,p=d._sounds[b]._id);_===1?l=null:p=null}}var m=p?d._soundById(p):d._inactiveSound();if(!m)return null;if(p&&!l&&(l=m._sprite||"__default"),d._state!=="loaded"){m._sprite=l,m._ended=!1;var g=m._id;return d._queue.push({event:"play",action:function(){d.play(g)}}),g}if(p&&!m._paused)return h||d._loadQueue("play"),m._id;d._webAudio&&e._autoResume();var v=Math.max(0,m._seek>0?m._seek:d._sprite[l][0]/1e3),x=Math.max(0,(d._sprite[l][0]+d._sprite[l][1])/1e3-v),M=x*1e3/Math.abs(m._rate),w=d._sprite[l][0]/1e3,T=(d._sprite[l][0]+d._sprite[l][1])/1e3;m._sprite=l,m._ended=!1;var A=function(){m._paused=!1,m._seek=v,m._start=w,m._stop=T,m._loop=!!(m._loop||d._sprite[l][2])};if(v>=T){d._ended(m);return}var C=m._node;if(d._webAudio){var y=function(){d._playLock=!1,A(),d._refreshBuffer(m);var V=m._muted||d._muted?0:m._volume;C.gain.setValueAtTime(V,e.ctx.currentTime),m._playStart=e.ctx.currentTime,typeof C.bufferSource.start=="undefined"?m._loop?C.bufferSource.noteGrainOn(0,v,86400):C.bufferSource.noteGrainOn(0,v,x):m._loop?C.bufferSource.start(0,v,86400):C.bufferSource.start(0,v,x),M!==1/0&&(d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),M)),h||setTimeout(function(){d._emit("play",m._id),d._loadQueue()},0)};e.state==="running"&&e.ctx.state!=="interrupted"?y():(d._playLock=!0,d.once("resume",y),d._clearTimer(m._id))}else{var S=function(){C.currentTime=v,C.muted=m._muted||d._muted||e._muted||C.muted,C.volume=m._volume*e.volume(),C.playbackRate=m._rate;try{var V=C.play();if(V&&typeof Promise!="undefined"&&(V instanceof Promise||typeof V.then=="function")?(d._playLock=!0,A(),V.then(function(){d._playLock=!1,C._unlocked=!0,h?d._loadQueue():d._emit("play",m._id)}).catch(function(){d._playLock=!1,d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):h||(d._playLock=!1,A(),d._emit("play",m._id)),C.playbackRate=m._rate,C.paused){d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}l!=="__default"||m._loop?d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),M):(d._endTimers[m._id]=function(){d._ended(m),C.removeEventListener("ended",d._endTimers[m._id],!1)},C.addEventListener("ended",d._endTimers[m._id],!1))}catch(I){d._emit("playerror",m._id,I)}};C.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(C.src=d._src,C.load());var N=window&&window.ejecta||!C.readyState&&e._navigator.isCocoonJS;if(C.readyState>=3||N)S();else{d._playLock=!0,d._state="loading";var F=function(){d._state="loaded",S(),C.removeEventListener(e._canPlayEvent,F,!1)};C.addEventListener(e._canPlayEvent,F,!1),d._clearTimer(m._id)}}return m._id},pause:function(l){var h=this;if(h._state!=="loaded"||h._playLock)return h._queue.push({event:"pause",action:function(){h.pause(l)}}),h;for(var d=h._getSoundIds(l),p=0;p<d.length;p++){h._clearTimer(d[p]);var _=h._soundById(d[p]);if(_&&!_._paused&&(_._seek=h.seek(d[p]),_._rateSeek=0,_._paused=!0,h._stopFade(d[p]),_._node))if(h._webAudio){if(!_._node.bufferSource)continue;typeof _._node.bufferSource.stop=="undefined"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),h._cleanBuffer(_._node)}else(!isNaN(_._node.duration)||_._node.duration===1/0)&&_._node.pause();arguments[1]||h._emit("pause",_?_._id:null)}return h},stop:function(l,h){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"stop",action:function(){d.stop(l)}}),d;for(var p=d._getSoundIds(l),_=0;_<p.length;_++){d._clearTimer(p[_]);var b=d._soundById(p[_]);b&&(b._seek=b._start||0,b._rateSeek=0,b._paused=!0,b._ended=!0,d._stopFade(p[_]),b._node&&(d._webAudio?b._node.bufferSource&&(typeof b._node.bufferSource.stop=="undefined"?b._node.bufferSource.noteOff(0):b._node.bufferSource.stop(0),d._cleanBuffer(b._node)):(!isNaN(b._node.duration)||b._node.duration===1/0)&&(b._node.currentTime=b._start||0,b._node.pause(),b._node.duration===1/0&&d._clearSound(b._node))),h||d._emit("stop",b._id))}return d},mute:function(l,h){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"mute",action:function(){d.mute(l,h)}}),d;if(typeof h=="undefined")if(typeof l=="boolean")d._muted=l;else return d._muted;for(var p=d._getSoundIds(h),_=0;_<p.length;_++){var b=d._soundById(p[_]);b&&(b._muted=l,b._interval&&d._stopFade(b._id),d._webAudio&&b._node?b._node.gain.setValueAtTime(l?0:b._volume,e.ctx.currentTime):b._node&&(b._node.muted=e._muted?!0:l),d._emit("mute",b._id))}return d},volume:function(){var l=this,h=arguments,d,p;if(h.length===0)return l._volume;if(h.length===1||h.length===2&&typeof h[1]=="undefined"){var _=l._getSoundIds(),b=_.indexOf(h[0]);b>=0?p=parseInt(h[0],10):d=parseFloat(h[0])}else h.length>=2&&(d=parseFloat(h[0]),p=parseInt(h[1],10));var m;if(typeof d!="undefined"&&d>=0&&d<=1){if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"volume",action:function(){l.volume.apply(l,h)}}),l;typeof p=="undefined"&&(l._volume=d),p=l._getSoundIds(p);for(var g=0;g<p.length;g++)m=l._soundById(p[g]),m&&(m._volume=d,h[2]||l._stopFade(p[g]),l._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(d,e.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=d*e.volume()),l._emit("volume",m._id))}else return m=p?l._soundById(p):l._sounds[0],m?m._volume:0;return l},fade:function(l,h,d,p){var _=this;if(_._state!=="loaded"||_._playLock)return _._queue.push({event:"fade",action:function(){_.fade(l,h,d,p)}}),_;l=Math.min(Math.max(0,parseFloat(l)),1),h=Math.min(Math.max(0,parseFloat(h)),1),d=parseFloat(d),_.volume(l,p);for(var b=_._getSoundIds(p),m=0;m<b.length;m++){var g=_._soundById(b[m]);if(g){if(p||_._stopFade(b[m]),_._webAudio&&!g._muted){var v=e.ctx.currentTime,x=v+d/1e3;g._volume=l,g._node.gain.setValueAtTime(l,v),g._node.gain.linearRampToValueAtTime(h,x)}_._startFadeInterval(g,l,h,d,b[m],typeof p=="undefined")}}return _},_startFadeInterval:function(l,h,d,p,_,b){var m=this,g=h,v=d-h,x=Math.abs(v/.01),M=Math.max(4,x>0?p/x:p),w=Date.now();l._fadeTo=d,l._interval=setInterval(function(){var T=(Date.now()-w)/p;w=Date.now(),g+=v*T,g=Math.round(g*100)/100,v<0?g=Math.max(d,g):g=Math.min(d,g),m._webAudio?l._volume=g:m.volume(g,l._id,!0),b&&(m._volume=g),(d<h&&g<=d||d>h&&g>=d)&&(clearInterval(l._interval),l._interval=null,l._fadeTo=null,m.volume(d,l._id),m._emit("fade",l._id))},M)},_stopFade:function(l){var h=this,d=h._soundById(l);return d&&d._interval&&(h._webAudio&&d._node.gain.cancelScheduledValues(e.ctx.currentTime),clearInterval(d._interval),d._interval=null,h.volume(d._fadeTo,l),d._fadeTo=null,h._emit("fade",l)),h},loop:function(){var l=this,h=arguments,d,p,_;if(h.length===0)return l._loop;if(h.length===1)if(typeof h[0]=="boolean")d=h[0],l._loop=d;else return _=l._soundById(parseInt(h[0],10)),_?_._loop:!1;else h.length===2&&(d=h[0],p=parseInt(h[1],10));for(var b=l._getSoundIds(p),m=0;m<b.length;m++)_=l._soundById(b[m]),_&&(_._loop=d,l._webAudio&&_._node&&_._node.bufferSource&&(_._node.bufferSource.loop=d,d&&(_._node.bufferSource.loopStart=_._start||0,_._node.bufferSource.loopEnd=_._stop,l.playing(b[m])&&(l.pause(b[m],!0),l.play(b[m],!0)))));return l},rate:function(){var l=this,h=arguments,d,p;if(h.length===0)p=l._sounds[0]._id;else if(h.length===1){var _=l._getSoundIds(),b=_.indexOf(h[0]);b>=0?p=parseInt(h[0],10):d=parseFloat(h[0])}else h.length===2&&(d=parseFloat(h[0]),p=parseInt(h[1],10));var m;if(typeof d=="number"){if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"rate",action:function(){l.rate.apply(l,h)}}),l;typeof p=="undefined"&&(l._rate=d),p=l._getSoundIds(p);for(var g=0;g<p.length;g++)if(m=l._soundById(p[g]),m){l.playing(p[g])&&(m._rateSeek=l.seek(p[g]),m._playStart=l._webAudio?e.ctx.currentTime:m._playStart),m._rate=d,l._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(d,e.ctx.currentTime):m._node&&(m._node.playbackRate=d);var v=l.seek(p[g]),x=(l._sprite[m._sprite][0]+l._sprite[m._sprite][1])/1e3-v,M=x*1e3/Math.abs(m._rate);(l._endTimers[p[g]]||!m._paused)&&(l._clearTimer(p[g]),l._endTimers[p[g]]=setTimeout(l._ended.bind(l,m),M)),l._emit("rate",m._id)}}else return m=l._soundById(p),m?m._rate:l._rate;return l},seek:function(){var l=this,h=arguments,d,p;if(h.length===0)l._sounds.length&&(p=l._sounds[0]._id);else if(h.length===1){var _=l._getSoundIds(),b=_.indexOf(h[0]);b>=0?p=parseInt(h[0],10):l._sounds.length&&(p=l._sounds[0]._id,d=parseFloat(h[0]))}else h.length===2&&(d=parseFloat(h[0]),p=parseInt(h[1],10));if(typeof p=="undefined")return 0;if(typeof d=="number"&&(l._state!=="loaded"||l._playLock))return l._queue.push({event:"seek",action:function(){l.seek.apply(l,h)}}),l;var m=l._soundById(p);if(m)if(typeof d=="number"&&d>=0){var g=l.playing(p);g&&l.pause(p,!0),m._seek=d,m._ended=!1,l._clearTimer(p),!l._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=d);var v=function(){g&&l.play(p,!0),l._emit("seek",p)};if(g&&!l._webAudio){var x=function(){l._playLock?setTimeout(x,0):v()};setTimeout(x,0)}else v()}else if(l._webAudio){var M=l.playing(p)?e.ctx.currentTime-m._playStart:0,w=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(w+M*Math.abs(m._rate))}else return m._node.currentTime;return l},playing:function(l){var h=this;if(typeof l=="number"){var d=h._soundById(l);return d?!d._paused:!1}for(var p=0;p<h._sounds.length;p++)if(!h._sounds[p]._paused)return!0;return!1},duration:function(l){var h=this,d=h._duration,p=h._soundById(l);return p&&(d=h._sprite[p._sprite][1]/1e3),d},state:function(){return this._state},unload:function(){for(var l=this,h=l._sounds,d=0;d<h.length;d++)h[d]._paused||l.stop(h[d]._id),l._webAudio||(l._clearSound(h[d]._node),h[d]._node.removeEventListener("error",h[d]._errorFn,!1),h[d]._node.removeEventListener(e._canPlayEvent,h[d]._loadFn,!1),h[d]._node.removeEventListener("ended",h[d]._endFn,!1),e._releaseHtml5Audio(h[d]._node)),delete h[d]._node,l._clearTimer(h[d]._id);var p=e._howls.indexOf(l);p>=0&&e._howls.splice(p,1);var _=!0;for(d=0;d<e._howls.length;d++)if(e._howls[d]._src===l._src||l._src.indexOf(e._howls[d]._src)>=0){_=!1;break}return r&&_&&delete r[l._src],e.noAudio=!1,l._state="unloaded",l._sounds=[],l=null,null},on:function(l,h,d,p){var _=this,b=_["_on"+l];return typeof h=="function"&&b.push(p?{id:d,fn:h,once:p}:{id:d,fn:h}),_},off:function(l,h,d){var p=this,_=p["_on"+l],b=0;if(typeof h=="number"&&(d=h,h=null),h||d)for(b=0;b<_.length;b++){var m=d===_[b].id;if(h===_[b].fn&&m||!h&&m){_.splice(b,1);break}}else if(l)p["_on"+l]=[];else{var g=Object.keys(p);for(b=0;b<g.length;b++)g[b].indexOf("_on")===0&&Array.isArray(p[g[b]])&&(p[g[b]]=[])}return p},once:function(l,h,d){var p=this;return p.on(l,h,d,1),p},_emit:function(l,h,d){for(var p=this,_=p["_on"+l],b=_.length-1;b>=0;b--)(!_[b].id||_[b].id===h||l==="load")&&(setTimeout(function(m){m.call(this,h,d)}.bind(p,_[b].fn),0),_[b].once&&p.off(l,_[b].fn,_[b].id));return p._loadQueue(l),p},_loadQueue:function(l){var h=this;if(h._queue.length>0){var d=h._queue[0];d.event===l&&(h._queue.shift(),h._loadQueue()),l||d.action()}return h},_ended:function(l){var h=this,d=l._sprite;if(!h._webAudio&&l._node&&!l._node.paused&&!l._node.ended&&l._node.currentTime<l._stop)return setTimeout(h._ended.bind(h,l),100),h;var p=!!(l._loop||h._sprite[d][2]);if(h._emit("end",l._id),!h._webAudio&&p&&h.stop(l._id,!0).play(l._id),h._webAudio&&p){h._emit("play",l._id),l._seek=l._start||0,l._rateSeek=0,l._playStart=e.ctx.currentTime;var _=(l._stop-l._start)*1e3/Math.abs(l._rate);h._endTimers[l._id]=setTimeout(h._ended.bind(h,l),_)}return h._webAudio&&!p&&(l._paused=!0,l._ended=!0,l._seek=l._start||0,l._rateSeek=0,h._clearTimer(l._id),h._cleanBuffer(l._node),e._autoSuspend()),!h._webAudio&&!p&&h.stop(l._id,!0),h},_clearTimer:function(l){var h=this;if(h._endTimers[l]){if(typeof h._endTimers[l]!="function")clearTimeout(h._endTimers[l]);else{var d=h._soundById(l);d&&d._node&&d._node.removeEventListener("ended",h._endTimers[l],!1)}delete h._endTimers[l]}return h},_soundById:function(l){for(var h=this,d=0;d<h._sounds.length;d++)if(l===h._sounds[d]._id)return h._sounds[d];return null},_inactiveSound:function(){var l=this;l._drain();for(var h=0;h<l._sounds.length;h++)if(l._sounds[h]._ended)return l._sounds[h].reset();return new i(l)},_drain:function(){var l=this,h=l._pool,d=0,p=0;if(!(l._sounds.length<h)){for(p=0;p<l._sounds.length;p++)l._sounds[p]._ended&&d++;for(p=l._sounds.length-1;p>=0;p--){if(d<=h)return;l._sounds[p]._ended&&(l._webAudio&&l._sounds[p]._node&&l._sounds[p]._node.disconnect(0),l._sounds.splice(p,1),d--)}}},_getSoundIds:function(l){var h=this;if(typeof l=="undefined"){for(var d=[],p=0;p<h._sounds.length;p++)d.push(h._sounds[p]._id);return d}else return[l]},_refreshBuffer:function(l){var h=this;return l._node.bufferSource=e.ctx.createBufferSource(),l._node.bufferSource.buffer=r[h._src],l._panner?l._node.bufferSource.connect(l._panner):l._node.bufferSource.connect(l._node),l._node.bufferSource.loop=l._loop,l._loop&&(l._node.bufferSource.loopStart=l._start||0,l._node.bufferSource.loopEnd=l._stop||0),l._node.bufferSource.playbackRate.setValueAtTime(l._rate,e.ctx.currentTime),h},_cleanBuffer:function(l){var h=this,d=e._navigator&&e._navigator.vendor.indexOf("Apple")>=0;if(!l.bufferSource)return h;if(e._scratchBuffer&&l.bufferSource&&(l.bufferSource.onended=null,l.bufferSource.disconnect(0),d))try{l.bufferSource.buffer=e._scratchBuffer}catch{}return l.bufferSource=null,h},_clearSound:function(l){var h=/MSIE |Trident\//.test(e._navigator&&e._navigator.userAgent);h||(l.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(l){this._parent=l,this.init()};i.prototype={init:function(){var l=this,h=l._parent;return l._muted=h._muted,l._loop=h._loop,l._volume=h._volume,l._rate=h._rate,l._seek=0,l._paused=!0,l._ended=!0,l._sprite="__default",l._id=++e._counter,h._sounds.push(l),l.create(),l},create:function(){var l=this,h=l._parent,d=e._muted||l._muted||l._parent._muted?0:l._volume;return h._webAudio?(l._node=typeof e.ctx.createGain=="undefined"?e.ctx.createGainNode():e.ctx.createGain(),l._node.gain.setValueAtTime(d,e.ctx.currentTime),l._node.paused=!0,l._node.connect(e.masterGain)):e.noAudio||(l._node=e._obtainHtml5Audio(),l._errorFn=l._errorListener.bind(l),l._node.addEventListener("error",l._errorFn,!1),l._loadFn=l._loadListener.bind(l),l._node.addEventListener(e._canPlayEvent,l._loadFn,!1),l._endFn=l._endListener.bind(l),l._node.addEventListener("ended",l._endFn,!1),l._node.src=h._src,l._node.preload=h._preload===!0?"auto":h._preload,l._node.volume=d*e.volume(),l._node.load()),l},reset:function(){var l=this,h=l._parent;return l._muted=h._muted,l._loop=h._loop,l._volume=h._volume,l._rate=h._rate,l._seek=0,l._rateSeek=0,l._paused=!0,l._ended=!0,l._sprite="__default",l._id=++e._counter,l},_errorListener:function(){var l=this;l._parent._emit("loaderror",l._id,l._node.error?l._node.error.code:0),l._node.removeEventListener("error",l._errorFn,!1)},_loadListener:function(){var l=this,h=l._parent;h._duration=Math.ceil(l._node.duration*10)/10,Object.keys(h._sprite).length===0&&(h._sprite={__default:[0,h._duration*1e3]}),h._state!=="loaded"&&(h._state="loaded",h._emit("load"),h._loadQueue()),l._node.removeEventListener(e._canPlayEvent,l._loadFn,!1)},_endListener:function(){var l=this,h=l._parent;h._duration===1/0&&(h._duration=Math.ceil(l._node.duration*10)/10,h._sprite.__default[1]===1/0&&(h._sprite.__default[1]=h._duration*1e3),h._ended(l)),l._node.removeEventListener("ended",l._endFn,!1)}};var r={},s=function(l){var h=l._src;if(r[h]){l._duration=r[h].duration,u(l);return}if(/^data:[^;]+;base64,/.test(h)){for(var d=atob(h.split(",")[1]),p=new Uint8Array(d.length),_=0;_<d.length;++_)p[_]=d.charCodeAt(_);c(p.buffer,l)}else{var b=new XMLHttpRequest;b.open(l._xhr.method,h,!0),b.withCredentials=l._xhr.withCredentials,b.responseType="arraybuffer",l._xhr.headers&&Object.keys(l._xhr.headers).forEach(function(m){b.setRequestHeader(m,l._xhr.headers[m])}),b.onload=function(){var m=(b.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){l._emit("loaderror",null,"Failed loading audio file with status: "+b.status+".");return}c(b.response,l)},b.onerror=function(){l._webAudio&&(l._html5=!0,l._webAudio=!1,l._sounds=[],delete r[h],l.load())},o(b)}},o=function(l){try{l.send()}catch{l.onerror()}},c=function(l,h){var d=function(){h._emit("loaderror",null,"Decoding audio data failed.")},p=function(_){_&&h._sounds.length>0?(r[h._src]=_,u(h,_)):d()};typeof Promise!="undefined"&&e.ctx.decodeAudioData.length===1?e.ctx.decodeAudioData(l).then(p).catch(d):e.ctx.decodeAudioData(l,p,d)},u=function(l,h){h&&!l._duration&&(l._duration=h.duration),Object.keys(l._sprite).length===0&&(l._sprite={__default:[0,l._duration*1e3]}),l._state!=="loaded"&&(l._state="loaded",l._emit("load"),l._loadQueue())},f=function(){if(e.usingWebAudio){try{typeof AudioContext!="undefined"?e.ctx=new AudioContext:typeof webkitAudioContext!="undefined"?e.ctx=new webkitAudioContext:e.usingWebAudio=!1}catch{e.usingWebAudio=!1}e.ctx||(e.usingWebAudio=!1);var l=/iP(hone|od|ad)/.test(e._navigator&&e._navigator.platform),h=e._navigator&&e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),d=h?parseInt(h[1],10):null;if(l&&d&&d<9){var p=/safari/.test(e._navigator&&e._navigator.userAgent.toLowerCase());e._navigator&&!p&&(e.usingWebAudio=!1)}e.usingWebAudio&&(e.masterGain=typeof e.ctx.createGain=="undefined"?e.ctx.createGainNode():e.ctx.createGain(),e.masterGain.gain.setValueAtTime(e._muted?0:e._volume,e.ctx.currentTime),e.masterGain.connect(e.ctx.destination)),e._setup()}};typeof define=="function"&&define.amd&&define([],function(){return{Howler:e,Howl:n}}),typeof rl!="undefined"&&(rl.Howler=e,rl.Howl=n),typeof global!="undefined"?(global.HowlerGlobal=a,global.Howler=e,global.Howl=n,global.Sound=i):typeof window!="undefined"&&(window.HowlerGlobal=a,window.Howler=e,window.Howl=n,window.Sound=i)})();(function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,i){var r=this;if(!r.ctx||!r.ctx.listener)return r;if(n=typeof n!="number"?r._pos[1]:n,i=typeof i!="number"?r._pos[2]:i,typeof e=="number")r._pos=[e,n,i],typeof r.ctx.listener.positionX!="undefined"?(r.ctx.listener.positionX.setTargetAtTime(r._pos[0],Howler.ctx.currentTime,.1),r.ctx.listener.positionY.setTargetAtTime(r._pos[1],Howler.ctx.currentTime,.1),r.ctx.listener.positionZ.setTargetAtTime(r._pos[2],Howler.ctx.currentTime,.1)):r.ctx.listener.setPosition(r._pos[0],r._pos[1],r._pos[2]);else return r._pos;return r},HowlerGlobal.prototype.orientation=function(e,n,i,r,s,o){var c=this;if(!c.ctx||!c.ctx.listener)return c;var u=c._orientation;if(n=typeof n!="number"?u[1]:n,i=typeof i!="number"?u[2]:i,r=typeof r!="number"?u[3]:r,s=typeof s!="number"?u[4]:s,o=typeof o!="number"?u[5]:o,typeof e=="number")c._orientation=[e,n,i,r,s,o],typeof c.ctx.listener.forwardX!="undefined"?(c.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),c.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),c.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),c.ctx.listener.upX.setTargetAtTime(r,Howler.ctx.currentTime,.1),c.ctx.listener.upY.setTargetAtTime(s,Howler.ctx.currentTime,.1),c.ctx.listener.upZ.setTargetAtTime(o,Howler.ctx.currentTime,.1)):c.ctx.listener.setOrientation(e,n,i,r,s,o);else return u;return c},Howl.prototype.init=function(e){return function(n){var i=this;return i._orientation=n.orientation||[1,0,0],i._stereo=n.stereo||null,i._pos=n.pos||null,i._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle!="undefined"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle!="undefined"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain!="undefined"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel!="undefined"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance!="undefined"?n.maxDistance:1e4,panningModel:typeof n.panningModel!="undefined"?n.panningModel:"HRTF",refDistance:typeof n.refDistance!="undefined"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor!="undefined"?n.rolloffFactor:1},i._onstereo=n.onstereo?[{fn:n.onstereo}]:[],i._onpos=n.onpos?[{fn:n.onpos}]:[],i._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(e,n){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(e,n)}}),i;var r=typeof Howler.ctx.createStereoPanner=="undefined"?"spatial":"stereo";if(typeof n=="undefined")if(typeof e=="number")i._stereo=e,i._pos=[e,0,0];else return i._stereo;for(var s=i._getSoundIds(n),o=0;o<s.length;o++){var c=i._soundById(s[o]);if(c)if(typeof e=="number")c._stereo=e,c._pos=[e,0,0],c._node&&(c._pannerAttr.panningModel="equalpower",(!c._panner||!c._panner.pan)&&a(c,r),r==="spatial"?typeof c._panner.positionX!="undefined"?(c._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),c._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),c._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):c._panner.setPosition(e,0,0):c._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),i._emit("stereo",c._id);else return c._stereo}return i},Howl.prototype.pos=function(e,n,i,r){var s=this;if(!s._webAudio)return s;if(s._state!=="loaded")return s._queue.push({event:"pos",action:function(){s.pos(e,n,i,r)}}),s;if(n=typeof n!="number"?0:n,i=typeof i!="number"?-.5:i,typeof r=="undefined")if(typeof e=="number")s._pos=[e,n,i];else return s._pos;for(var o=s._getSoundIds(r),c=0;c<o.length;c++){var u=s._soundById(o[c]);if(u)if(typeof e=="number")u._pos=[e,n,i],u._node&&((!u._panner||u._panner.pan)&&a(u,"spatial"),typeof u._panner.positionX!="undefined"?(u._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setPosition(e,n,i)),s._emit("pos",u._id);else return u._pos}return s},Howl.prototype.orientation=function(e,n,i,r){var s=this;if(!s._webAudio)return s;if(s._state!=="loaded")return s._queue.push({event:"orientation",action:function(){s.orientation(e,n,i,r)}}),s;if(n=typeof n!="number"?s._orientation[1]:n,i=typeof i!="number"?s._orientation[2]:i,typeof r=="undefined")if(typeof e=="number")s._orientation=[e,n,i];else return s._orientation;for(var o=s._getSoundIds(r),c=0;c<o.length;c++){var u=s._soundById(o[c]);if(u)if(typeof e=="number")u._orientation=[e,n,i],u._node&&(u._panner||(u._pos||(u._pos=s._pos||[0,0,-.5]),a(u,"spatial")),typeof u._panner.orientationX!="undefined"?(u._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setOrientation(e,n,i)),s._emit("orientation",u._id);else return u._orientation}return s},Howl.prototype.pannerAttr=function(){var e=this,n=arguments,i,r,s;if(!e._webAudio)return e;if(n.length===0)return e._pannerAttr;if(n.length===1)if(typeof n[0]=="object")i=n[0],typeof r=="undefined"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),e._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle!="undefined"?i.pannerAttr.coneInnerAngle:e._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle!="undefined"?i.pannerAttr.coneOuterAngle:e._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain!="undefined"?i.pannerAttr.coneOuterGain:e._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel!="undefined"?i.pannerAttr.distanceModel:e._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance!="undefined"?i.pannerAttr.maxDistance:e._maxDistance,refDistance:typeof i.pannerAttr.refDistance!="undefined"?i.pannerAttr.refDistance:e._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor!="undefined"?i.pannerAttr.rolloffFactor:e._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel!="undefined"?i.pannerAttr.panningModel:e._panningModel});else return s=e._soundById(parseInt(n[0],10)),s?s._pannerAttr:e._pannerAttr;else n.length===2&&(i=n[0],r=parseInt(n[1],10));for(var o=e._getSoundIds(r),c=0;c<o.length;c++)if(s=e._soundById(o[c]),s){var u=s._pannerAttr;u={coneInnerAngle:typeof i.coneInnerAngle!="undefined"?i.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle!="undefined"?i.coneOuterAngle:u.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain!="undefined"?i.coneOuterGain:u.coneOuterGain,distanceModel:typeof i.distanceModel!="undefined"?i.distanceModel:u.distanceModel,maxDistance:typeof i.maxDistance!="undefined"?i.maxDistance:u.maxDistance,refDistance:typeof i.refDistance!="undefined"?i.refDistance:u.refDistance,rolloffFactor:typeof i.rolloffFactor!="undefined"?i.rolloffFactor:u.rolloffFactor,panningModel:typeof i.panningModel!="undefined"?i.panningModel:u.panningModel};var f=s._panner;f||(s._pos||(s._pos=e._pos||[0,0,-.5]),a(s,"spatial"),f=s._panner),f.coneInnerAngle=u.coneInnerAngle,f.coneOuterAngle=u.coneOuterAngle,f.coneOuterGain=u.coneOuterGain,f.distanceModel=u.distanceModel,f.maxDistance=u.maxDistance,f.refDistance=u.refDistance,f.rolloffFactor=u.rolloffFactor,f.panningModel=u.panningModel}return e},Sound.prototype.init=function(e){return function(){var n=this,i=n._parent;n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,e.call(this),n._stereo?i.stereo(n._stereo):n._pos&&i.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,i=n._parent;return n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,n._stereo?i.stereo(n._stereo):n._pos?i.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,i._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var a=function(e,n){n=n||"spatial",n==="spatial"?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,typeof e._panner.positionX!="undefined"?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),typeof e._panner.orientationX!="undefined"?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}})()});var Wu="160";var S_=0,ed=1,T_=2;var kp=1,Xu=2,Li=3,hi=0,tn=1,xn=2;var ui=0,Is=1,Br=2,td=3,nd=4,w_=5,Or=100,A_=101,E_=102,id=103,rd=104,R_=200,C_=201,P_=202,L_=203,cu=204,lu=205,I_=206,D_=207,O_=208,N_=209,U_=210,F_=211,k_=212,B_=213,z_=214,G_=0,H_=1,V_=2,Yo=3,W_=4,X_=5,q_=6,Y_=7,Bp=0,j_=1,K_=2,nr=0,qu=1,Yu=2,ju=3,Va=4,J_=5,Ku=6,sd="attached",Z_="detached",zp=300,Ns=301,Us=302,Ia=303,uu=304,Cc=306,fi=1e3,fn=1001,Da=1002,Nt=1003,jo=1004;var Ea=1005;var Rt=1006,Ju=1007;var Ni=1008;var ir=1009,Q_=1010,$_=1011,Zu=1012,Gp=1013,er=1014,Pn=1015,Vt=1016,Hp=1017,Vp=1018,Ur=1020,e0=1021,Gn=1023,t0=1024,n0=1025,Fr=1026,Fs=1027,i0=1028,Wp=1029,r0=1030,Xp=1031,qp=1033,Cl=33776,Pl=33777,Ll=33778,Il=33779,ad=35840,od=35841,cd=35842,ld=35843,Yp=36196,ud=37492,hd=37496,fd=37808,dd=37809,pd=37810,md=37811,gd=37812,_d=37813,bd=37814,xd=37815,vd=37816,yd=37817,Md=37818,Sd=37819,Td=37820,wd=37821,Dl=36492,Ad=36494,Ed=36495,s0=36283,Rd=36284,Cd=36285,Pd=36286,Qu=2200,a0=2201,o0=2202,ks=2300,zr=2301,Ol=2302,Es=2400,Rs=2401,Ko=2402,$u=2500,c0=2501,jp=0,Pc=1,Wa=2,Kp=3e3,kr=3001,l0=3200,u0=3201,Jp=0,h0=1,Hn="",nt="srgb",Pt="srgb-linear",eh="display-p3",Lc="display-p3-linear",Jo="linear",rt="srgb",Zo="rec709",Qo="p3";var us=7680;var Ld=519,f0=512,d0=513,p0=514,Zp=515,m0=516,g0=517,_0=518,b0=519,hu=35044;var Id="300 es",fu=1035,Oi=2e3,$o=2001,Ui=class{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},$t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dd=1234567,Ra=Math.PI/180,Bs=180/Math.PI;function ei(){let a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($t[a&255]+$t[a>>8&255]+$t[a>>16&255]+$t[a>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[n&63|128]+$t[n>>8&255]+"-"+$t[n>>16&255]+$t[n>>24&255]+$t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]).toLowerCase()}function qt(a,e,n){return Math.max(e,Math.min(n,a))}function th(a,e){return(a%e+e)%e}function x0(a,e,n,i,r){return i+(a-e)*(r-i)/(n-e)}function v0(a,e,n){return a!==e?(n-a)/(e-a):0}function Ca(a,e,n){return(1-n)*a+n*e}function y0(a,e,n,i){return Ca(a,e,1-Math.exp(-n*i))}function M0(a,e=1){return e-Math.abs(th(a,e*2)-e)}function S0(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*(3-2*a))}function T0(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*a*(a*(a*6-15)+10))}function w0(a,e){return a+Math.floor(Math.random()*(e-a+1))}function A0(a,e){return a+Math.random()*(e-a)}function E0(a){return a*(.5-Math.random())}function R0(a){a!==void 0&&(Dd=a);let e=Dd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function C0(a){return a*Ra}function P0(a){return a*Bs}function du(a){return(a&a-1)===0&&a!==0}function L0(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function ec(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function I0(a,e,n,i,r){let s=Math.cos,o=Math.sin,c=s(n/2),u=o(n/2),f=s((e+i)/2),l=o((e+i)/2),h=s((e-i)/2),d=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":a.set(c*l,u*h,u*d,c*f);break;case"YZY":a.set(u*d,c*l,u*h,c*f);break;case"ZXZ":a.set(u*h,u*d,c*l,c*f);break;case"XZX":a.set(c*l,u*_,u*p,c*f);break;case"YXY":a.set(u*p,c*l,u*_,c*f);break;case"ZYZ":a.set(u*_,u*p,c*l,c*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function li(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function tt(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var Qp={DEG2RAD:Ra,RAD2DEG:Bs,generateUUID:ei,clamp:qt,euclideanModulo:th,mapLinear:x0,inverseLerp:v0,lerp:Ca,damp:y0,pingpong:M0,smoothstep:S0,smootherstep:T0,randInt:w0,randFloat:A0,randFloatSpread:E0,seededRandom:R0,degToRad:C0,radToDeg:P0,isPowerOfTwo:du,ceilPowerOfTwo:L0,floorPowerOfTwo:ec,setQuaternionFromProperEuler:I0,normalize:tt,denormalize:li},me=class a{constructor(e=0,n=0){a.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},We=class a{constructor(e,n,i,r,s,o,c,u,f){a.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,c,u,f)}set(e,n,i,r,s,o,c,u,f){let l=this.elements;return l[0]=e,l[1]=r,l[2]=c,l[3]=n,l[4]=s,l[5]=u,l[6]=i,l[7]=o,l[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,s=this.elements,o=i[0],c=i[3],u=i[6],f=i[1],l=i[4],h=i[7],d=i[2],p=i[5],_=i[8],b=r[0],m=r[3],g=r[6],v=r[1],x=r[4],M=r[7],w=r[2],T=r[5],A=r[8];return s[0]=o*b+c*v+u*w,s[3]=o*m+c*x+u*T,s[6]=o*g+c*M+u*A,s[1]=f*b+l*v+h*w,s[4]=f*m+l*x+h*T,s[7]=f*g+l*M+h*A,s[2]=d*b+p*v+_*w,s[5]=d*m+p*x+_*T,s[8]=d*g+p*M+_*A,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],c=e[5],u=e[6],f=e[7],l=e[8];return n*o*l-n*c*f-i*s*l+i*c*u+r*s*f-r*o*u}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],c=e[5],u=e[6],f=e[7],l=e[8],h=l*o-c*f,d=c*u-l*s,p=f*s-o*u,_=n*h+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/_;return e[0]=h*b,e[1]=(r*f-l*i)*b,e[2]=(c*i-r*o)*b,e[3]=d*b,e[4]=(l*n-r*u)*b,e[5]=(r*s-c*n)*b,e[6]=p*b,e[7]=(i*u-f*n)*b,e[8]=(o*n-i*s)*b,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,c){let u=Math.cos(s),f=Math.sin(s);return this.set(i*u,i*f,-i*(u*o+f*c)+o+e,-r*f,r*u,-r*(-f*o+u*c)+c+n,0,0,1),this}scale(e,n){return this.premultiply(Nl.makeScale(e,n)),this}rotate(e){return this.premultiply(Nl.makeRotation(-e)),this}translate(e,n){return this.premultiply(Nl.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Nl=new We;function $p(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function Oa(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function D0(){let a=Oa("canvas");return a.style.display="block",a}var Od={};function Pa(a){a in Od||(Od[a]=!0,console.warn(a))}var Nd=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ud=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xo={[Pt]:{transfer:Jo,primaries:Zo,toReference:a=>a,fromReference:a=>a},[nt]:{transfer:rt,primaries:Zo,toReference:a=>a.convertSRGBToLinear(),fromReference:a=>a.convertLinearToSRGB()},[Lc]:{transfer:Jo,primaries:Qo,toReference:a=>a.applyMatrix3(Ud),fromReference:a=>a.applyMatrix3(Nd)},[eh]:{transfer:rt,primaries:Qo,toReference:a=>a.convertSRGBToLinear().applyMatrix3(Ud),fromReference:a=>a.applyMatrix3(Nd).convertLinearToSRGB()}},O0=new Set([Pt,Lc]),Ze={enabled:!0,_workingColorSpace:Pt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(a){if(!O0.has(a))throw new Error(`Unsupported working color space, "${a}".`);this._workingColorSpace=a},convert:function(a,e,n){if(this.enabled===!1||e===n||!e||!n)return a;let i=xo[e].toReference,r=xo[n].fromReference;return r(i(a))},fromWorkingColorSpace:function(a,e){return this.convert(a,this._workingColorSpace,e)},toWorkingColorSpace:function(a,e){return this.convert(a,e,this._workingColorSpace)},getPrimaries:function(a){return xo[a].primaries},getTransfer:function(a){return a===Hn?Jo:xo[a].transfer}};function Ds(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Ul(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var hs,tc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{hs===void 0&&(hs=Oa("canvas")),hs.width=e.width,hs.height=e.height;let i=hs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=hs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let n=Oa("canvas");n.width=e.width,n.height=e.height;let i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ds(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){let n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ds(n[i]/255)*255):n[i]=Ds(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},N0=0,nc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=ei(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,c=r.length;o<c;o++)r[o].isDataTexture?s.push(Fl(r[o].image)):s.push(Fl(r[o]))}else s=Fl(r);i.url=s}return n||(e.images[this.uuid]=i),i}};function Fl(a){return typeof HTMLImageElement!="undefined"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&a instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&a instanceof ImageBitmap?tc.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var U0=0,Yt=class a extends Ui{constructor(e=a.DEFAULT_IMAGE,n=a.DEFAULT_MAPPING,i=fn,r=fn,s=Rt,o=Ni,c=Gn,u=ir,f=a.DEFAULT_ANISOTROPY,l=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=ei(),this.name="",this.source=new nc(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=f,this.format=c,this.internalFormat=null,this.type=u,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof l=="string"?this.colorSpace=l:(Pa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=l===kr?nt:Hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fi:e.x=e.x-Math.floor(e.x);break;case fn:e.x=e.x<0?0:1;break;case Da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fi:e.y=e.y-Math.floor(e.y);break;case fn:e.y=e.y<0?0:1;break;case Da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Pa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===nt?kr:Kp}set encoding(e){Pa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===kr?nt:Hn}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=zp;Yt.DEFAULT_ANISOTROPY=1;var at=class a{constructor(e=0,n=0,i=0,r=1){a.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s,u=e.elements,f=u[0],l=u[4],h=u[8],d=u[1],p=u[5],_=u[9],b=u[2],m=u[6],g=u[10];if(Math.abs(l-d)<.01&&Math.abs(h-b)<.01&&Math.abs(_-m)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+b)<.1&&Math.abs(_+m)<.1&&Math.abs(f+p+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let x=(f+1)/2,M=(p+1)/2,w=(g+1)/2,T=(l+d)/4,A=(h+b)/4,C=(_+m)/4;return x>M&&x>w?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=T/i,s=A/i):M>w?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=T/r,s=C/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=C/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-_)*(m-_)+(h-b)*(h-b)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(h-b)/v,this.z=(d-l)/v,this.w=Math.acos((f+p+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pu=class extends Ui{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new at(0,0,e,n),this.scissorTest=!1,this.viewport=new at(0,0,e,n);let r={width:e,height:n,depth:1};i.encoding!==void 0&&(Pa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===kr?nt:Hn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Yt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let n=Object.assign({},e.texture.image);return this.texture.source=new nc(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends pu{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}},ic=class extends Yt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mu=class extends Yt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var nn=class{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,c){let u=i[r+0],f=i[r+1],l=i[r+2],h=i[r+3],d=s[o+0],p=s[o+1],_=s[o+2],b=s[o+3];if(c===0){e[n+0]=u,e[n+1]=f,e[n+2]=l,e[n+3]=h;return}if(c===1){e[n+0]=d,e[n+1]=p,e[n+2]=_,e[n+3]=b;return}if(h!==b||u!==d||f!==p||l!==_){let m=1-c,g=u*d+f*p+l*_+h*b,v=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let w=Math.sqrt(x),T=Math.atan2(w,g*v);m=Math.sin(m*T)/w,c=Math.sin(c*T)/w}let M=c*v;if(u=u*m+d*M,f=f*m+p*M,l=l*m+_*M,h=h*m+b*M,m===1-c){let w=1/Math.sqrt(u*u+f*f+l*l+h*h);u*=w,f*=w,l*=w,h*=w}}e[n]=u,e[n+1]=f,e[n+2]=l,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,o){let c=i[r],u=i[r+1],f=i[r+2],l=i[r+3],h=s[o],d=s[o+1],p=s[o+2],_=s[o+3];return e[n]=c*_+l*h+u*p-f*d,e[n+1]=u*_+l*d+f*h-c*p,e[n+2]=f*_+l*p+c*d-u*h,e[n+3]=l*_-c*h-u*d-f*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let i=e._x,r=e._y,s=e._z,o=e._order,c=Math.cos,u=Math.sin,f=c(i/2),l=c(r/2),h=c(s/2),d=u(i/2),p=u(r/2),_=u(s/2);switch(o){case"XYZ":this._x=d*l*h+f*p*_,this._y=f*p*h-d*l*_,this._z=f*l*_+d*p*h,this._w=f*l*h-d*p*_;break;case"YXZ":this._x=d*l*h+f*p*_,this._y=f*p*h-d*l*_,this._z=f*l*_-d*p*h,this._w=f*l*h+d*p*_;break;case"ZXY":this._x=d*l*h-f*p*_,this._y=f*p*h+d*l*_,this._z=f*l*_+d*p*h,this._w=f*l*h-d*p*_;break;case"ZYX":this._x=d*l*h-f*p*_,this._y=f*p*h+d*l*_,this._z=f*l*_-d*p*h,this._w=f*l*h+d*p*_;break;case"YZX":this._x=d*l*h+f*p*_,this._y=f*p*h+d*l*_,this._z=f*l*_-d*p*h,this._w=f*l*h-d*p*_;break;case"XZY":this._x=d*l*h-f*p*_,this._y=f*p*h-d*l*_,this._z=f*l*_+d*p*h,this._w=f*l*h+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],c=n[5],u=n[9],f=n[2],l=n[6],h=n[10],d=i+c+h;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(l-u)*p,this._y=(s-f)*p,this._z=(o-r)*p}else if(i>c&&i>h){let p=2*Math.sqrt(1+i-c-h);this._w=(l-u)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+f)/p}else if(c>h){let p=2*Math.sqrt(1+c-i-h);this._w=(s-f)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(u+l)/p}else{let p=2*Math.sqrt(1+h-i-c);this._w=(o-r)/p,this._x=(s+f)/p,this._y=(u+l)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qt(this.dot(e),-1,1)))}rotateTowards(e,n){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,c=n._x,u=n._y,f=n._z,l=n._w;return this._x=i*l+o*c+r*f-s*u,this._y=r*l+o*u+s*c-i*f,this._z=s*l+o*f+i*u-r*c,this._w=o*l-i*c-r*u-s*f,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,c=o*e._w+i*e._x+r*e._y+s*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let u=1-c*c;if(u<=Number.EPSILON){let p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}let f=Math.sqrt(u),l=Math.atan2(f,c),h=Math.sin((1-n)*l)/f,d=Math.sin(n*l)/f;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){let e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class a{constructor(e=0,n=0,i=0){a.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Fd.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Fd.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,c=e.z,u=e.w,f=2*(o*r-c*i),l=2*(c*n-s*r),h=2*(s*i-o*n);return this.x=n+u*f+o*h-c*l,this.y=i+u*l+c*f-s*h,this.z=r+u*h+s*l-o*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let i=e.x,r=e.y,s=e.z,o=n.x,c=n.y,u=n.z;return this.x=r*u-s*c,this.y=s*o-i*u,this.z=i*c-r*o,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return kl.copy(this).projectOnVector(e),this.sub(kl)}reflect(e){return this.sub(kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){let r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},kl=new D,Fd=new nn,vn=class{constructor(e=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Zn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Zn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){let i=Zn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Zn):Zn.fromBufferAttribute(s,o),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(va),yo.subVectors(this.max,va),fs.subVectors(e.a,va),ds.subVectors(e.b,va),ps.subVectors(e.c,va),Ki.subVectors(ds,fs),Ji.subVectors(ps,ds),Cr.subVectors(fs,ps);let n=[0,-Ki.z,Ki.y,0,-Ji.z,Ji.y,0,-Cr.z,Cr.y,Ki.z,0,-Ki.x,Ji.z,0,-Ji.x,Cr.z,0,-Cr.x,-Ki.y,Ki.x,0,-Ji.y,Ji.x,0,-Cr.y,Cr.x,0];return!Bl(n,fs,ds,ps,yo)||(n=[1,0,0,0,1,0,0,0,1],!Bl(n,fs,ds,ps,yo))?!1:(Mo.crossVectors(Ki,Ji),n=[Mo.x,Mo.y,Mo.z],Bl(n,fs,ds,ps,yo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},wi=[new D,new D,new D,new D,new D,new D,new D,new D],Zn=new D,vo=new vn,fs=new D,ds=new D,ps=new D,Ki=new D,Ji=new D,Cr=new D,va=new D,yo=new D,Mo=new D,Pr=new D;function Bl(a,e,n,i,r){for(let s=0,o=a.length-3;s<=o;s+=3){Pr.fromArray(a,s);let c=r.x*Math.abs(Pr.x)+r.y*Math.abs(Pr.y)+r.z*Math.abs(Pr.z),u=e.dot(Pr),f=n.dot(Pr),l=i.dot(Pr);if(Math.max(-Math.max(u,f,l),Math.min(u,f,l))>c)return!1}return!0}var F0=new vn,ya=new D,zl=new D,In=class{constructor(e=new D,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){let i=this.center;n!==void 0?i.copy(n):F0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){let i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ya.subVectors(e,this.center);let n=ya.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ya,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ya.copy(e.center).add(zl)),this.expandByPoint(ya.copy(e.center).sub(zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ai=new D,Gl=new D,So=new D,Zi=new D,Hl=new D,To=new D,Vl=new D,Gr=class{constructor(e=new D,n=new D(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let n=Ai.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,n),Ai.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Gl.copy(e).add(n).multiplyScalar(.5),So.copy(n).sub(e).normalize(),Zi.copy(this.origin).sub(Gl);let s=e.distanceTo(n)*.5,o=-this.direction.dot(So),c=Zi.dot(this.direction),u=-Zi.dot(So),f=Zi.lengthSq(),l=Math.abs(1-o*o),h,d,p,_;if(l>0)if(h=o*u-c,d=o*c-u,_=s*l,h>=0)if(d>=-_)if(d<=_){let b=1/l;h*=b,d*=b,p=h*(h+o*d+2*c)+d*(o*h+d+2*u)+f}else d=s,h=Math.max(0,-(o*d+c)),p=-h*h+d*(d+2*u)+f;else d=-s,h=Math.max(0,-(o*d+c)),p=-h*h+d*(d+2*u)+f;else d<=-_?(h=Math.max(0,-(-o*s+c)),d=h>0?-s:Math.min(Math.max(-s,-u),s),p=-h*h+d*(d+2*u)+f):d<=_?(h=0,d=Math.min(Math.max(-s,-u),s),p=d*(d+2*u)+f):(h=Math.max(0,-(o*s+c)),d=h>0?s:Math.min(Math.max(-s,-u),s),p=-h*h+d*(d+2*u)+f);else d=o>0?-s:s,h=Math.max(0,-(o*d+c)),p=-h*h+d*(d+2*u)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Gl).addScaledVector(So,d),p}intersectSphere(e,n){Ai.subVectors(e.center,this.origin);let i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),c=i-o,u=i+o;return u<0?null:c<0?this.at(u,n):this.at(c,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){let i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){let n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,c,u,f=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return f>=0?(i=(e.min.x-d.x)*f,r=(e.max.x-d.x)*f):(i=(e.max.x-d.x)*f,r=(e.min.x-d.x)*f),l>=0?(s=(e.min.y-d.y)*l,o=(e.max.y-d.y)*l):(s=(e.max.y-d.y)*l,o=(e.min.y-d.y)*l),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(c=(e.min.z-d.z)*h,u=(e.max.z-d.z)*h):(c=(e.max.z-d.z)*h,u=(e.min.z-d.z)*h),i>u||c>r)||((c>i||i!==i)&&(i=c),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,n,i,r,s){Hl.subVectors(n,e),To.subVectors(i,e),Vl.crossVectors(Hl,To);let o=this.direction.dot(Vl),c;if(o>0){if(r)return null;c=1}else if(o<0)c=-1,o=-o;else return null;Zi.subVectors(this.origin,e);let u=c*this.direction.dot(To.crossVectors(Zi,To));if(u<0)return null;let f=c*this.direction.dot(Hl.cross(Zi));if(f<0||u+f>o)return null;let l=-c*Zi.dot(Vl);return l<0?null:this.at(l/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},we=class a{constructor(e,n,i,r,s,o,c,u,f,l,h,d,p,_,b,m){a.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,c,u,f,l,h,d,p,_,b,m)}set(e,n,i,r,s,o,c,u,f,l,h,d,p,_,b,m){let g=this.elements;return g[0]=e,g[4]=n,g[8]=i,g[12]=r,g[1]=s,g[5]=o,g[9]=c,g[13]=u,g[2]=f,g[6]=l,g[10]=h,g[14]=d,g[3]=p,g[7]=_,g[11]=b,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new a().fromArray(this.elements)}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){let n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){let n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){let n=this.elements,i=e.elements,r=1/ms.setFromMatrixColumn(e,0).length(),s=1/ms.setFromMatrixColumn(e,1).length(),o=1/ms.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){let n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),c=Math.sin(i),u=Math.cos(r),f=Math.sin(r),l=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=o*l,p=o*h,_=c*l,b=c*h;n[0]=u*l,n[4]=-u*h,n[8]=f,n[1]=p+_*f,n[5]=d-b*f,n[9]=-c*u,n[2]=b-d*f,n[6]=_+p*f,n[10]=o*u}else if(e.order==="YXZ"){let d=u*l,p=u*h,_=f*l,b=f*h;n[0]=d+b*c,n[4]=_*c-p,n[8]=o*f,n[1]=o*h,n[5]=o*l,n[9]=-c,n[2]=p*c-_,n[6]=b+d*c,n[10]=o*u}else if(e.order==="ZXY"){let d=u*l,p=u*h,_=f*l,b=f*h;n[0]=d-b*c,n[4]=-o*h,n[8]=_+p*c,n[1]=p+_*c,n[5]=o*l,n[9]=b-d*c,n[2]=-o*f,n[6]=c,n[10]=o*u}else if(e.order==="ZYX"){let d=o*l,p=o*h,_=c*l,b=c*h;n[0]=u*l,n[4]=_*f-p,n[8]=d*f+b,n[1]=u*h,n[5]=b*f+d,n[9]=p*f-_,n[2]=-f,n[6]=c*u,n[10]=o*u}else if(e.order==="YZX"){let d=o*u,p=o*f,_=c*u,b=c*f;n[0]=u*l,n[4]=b-d*h,n[8]=_*h+p,n[1]=h,n[5]=o*l,n[9]=-c*l,n[2]=-f*l,n[6]=p*h+_,n[10]=d-b*h}else if(e.order==="XZY"){let d=o*u,p=o*f,_=c*u,b=c*f;n[0]=u*l,n[4]=-h,n[8]=f*l,n[1]=d*h+b,n[5]=o*l,n[9]=p*h-_,n[2]=_*h-p,n[6]=c*l,n[10]=b*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(k0,e,B0)}lookAt(e,n,i){let r=this.elements;return Rn.subVectors(e,n),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Qi.crossVectors(i,Rn),Qi.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Qi.crossVectors(i,Rn)),Qi.normalize(),wo.crossVectors(Rn,Qi),r[0]=Qi.x,r[4]=wo.x,r[8]=Rn.x,r[1]=Qi.y,r[5]=wo.y,r[9]=Rn.y,r[2]=Qi.z,r[6]=wo.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,s=this.elements,o=i[0],c=i[4],u=i[8],f=i[12],l=i[1],h=i[5],d=i[9],p=i[13],_=i[2],b=i[6],m=i[10],g=i[14],v=i[3],x=i[7],M=i[11],w=i[15],T=r[0],A=r[4],C=r[8],y=r[12],S=r[1],N=r[5],F=r[9],V=r[13],I=r[2],U=r[6],k=r[10],Y=r[14],K=r[3],j=r[7],J=r[11],Q=r[15];return s[0]=o*T+c*S+u*I+f*K,s[4]=o*A+c*N+u*U+f*j,s[8]=o*C+c*F+u*k+f*J,s[12]=o*y+c*V+u*Y+f*Q,s[1]=l*T+h*S+d*I+p*K,s[5]=l*A+h*N+d*U+p*j,s[9]=l*C+h*F+d*k+p*J,s[13]=l*y+h*V+d*Y+p*Q,s[2]=_*T+b*S+m*I+g*K,s[6]=_*A+b*N+m*U+g*j,s[10]=_*C+b*F+m*k+g*J,s[14]=_*y+b*V+m*Y+g*Q,s[3]=v*T+x*S+M*I+w*K,s[7]=v*A+x*N+M*U+w*j,s[11]=v*C+x*F+M*k+w*J,s[15]=v*y+x*V+M*Y+w*Q,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],c=e[5],u=e[9],f=e[13],l=e[2],h=e[6],d=e[10],p=e[14],_=e[3],b=e[7],m=e[11],g=e[15];return _*(+s*u*h-r*f*h-s*c*d+i*f*d+r*c*p-i*u*p)+b*(+n*u*p-n*f*d+s*o*d-r*o*p+r*f*l-s*u*l)+m*(+n*f*h-n*c*p-s*o*h+i*o*p+s*c*l-i*f*l)+g*(-r*c*l-n*u*h+n*c*d+r*o*h-i*o*d+i*u*l)}transpose(){let e=this.elements,n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],c=e[5],u=e[6],f=e[7],l=e[8],h=e[9],d=e[10],p=e[11],_=e[12],b=e[13],m=e[14],g=e[15],v=h*m*f-b*d*f+b*u*p-c*m*p-h*u*g+c*d*g,x=_*d*f-l*m*f-_*u*p+o*m*p+l*u*g-o*d*g,M=l*b*f-_*h*f+_*c*p-o*b*p-l*c*g+o*h*g,w=_*h*u-l*b*u-_*c*d+o*b*d+l*c*m-o*h*m,T=n*v+i*x+r*M+s*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=v*A,e[1]=(b*d*s-h*m*s-b*r*p+i*m*p+h*r*g-i*d*g)*A,e[2]=(c*m*s-b*u*s+b*r*f-i*m*f-c*r*g+i*u*g)*A,e[3]=(h*u*s-c*d*s-h*r*f+i*d*f+c*r*p-i*u*p)*A,e[4]=x*A,e[5]=(l*m*s-_*d*s+_*r*p-n*m*p-l*r*g+n*d*g)*A,e[6]=(_*u*s-o*m*s-_*r*f+n*m*f+o*r*g-n*u*g)*A,e[7]=(o*d*s-l*u*s+l*r*f-n*d*f-o*r*p+n*u*p)*A,e[8]=M*A,e[9]=(_*h*s-l*b*s-_*i*p+n*b*p+l*i*g-n*h*g)*A,e[10]=(o*b*s-_*c*s+_*i*f-n*b*f-o*i*g+n*c*g)*A,e[11]=(l*c*s-o*h*s-l*i*f+n*h*f+o*i*p-n*c*p)*A,e[12]=w*A,e[13]=(l*b*r-_*h*r+_*i*d-n*b*d-l*i*m+n*h*m)*A,e[14]=(_*c*r-o*b*r-_*i*u+n*b*u+o*i*m-n*c*m)*A,e[15]=(o*h*r-l*c*r+l*i*u-n*h*u-o*i*d+n*c*d)*A,this}scale(e){let n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){let n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){let i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,c=e.y,u=e.z,f=s*o,l=s*c;return this.set(f*o+i,f*c-r*u,f*u+r*c,0,f*c+r*u,l*c+i,l*u-r*o,0,f*u-r*c,l*u+r*o,s*u*u+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){let r=this.elements,s=n._x,o=n._y,c=n._z,u=n._w,f=s+s,l=o+o,h=c+c,d=s*f,p=s*l,_=s*h,b=o*l,m=o*h,g=c*h,v=u*f,x=u*l,M=u*h,w=i.x,T=i.y,A=i.z;return r[0]=(1-(b+g))*w,r[1]=(p+M)*w,r[2]=(_-x)*w,r[3]=0,r[4]=(p-M)*T,r[5]=(1-(d+g))*T,r[6]=(m+v)*T,r[7]=0,r[8]=(_+x)*A,r[9]=(m-v)*A,r[10]=(1-(d+b))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){let r=this.elements,s=ms.set(r[0],r[1],r[2]).length(),o=ms.set(r[4],r[5],r[6]).length(),c=ms.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Qn.copy(this);let f=1/s,l=1/o,h=1/c;return Qn.elements[0]*=f,Qn.elements[1]*=f,Qn.elements[2]*=f,Qn.elements[4]*=l,Qn.elements[5]*=l,Qn.elements[6]*=l,Qn.elements[8]*=h,Qn.elements[9]*=h,Qn.elements[10]*=h,n.setFromRotationMatrix(Qn),i.x=s,i.y=o,i.z=c,this}makePerspective(e,n,i,r,s,o,c=Oi){let u=this.elements,f=2*s/(n-e),l=2*s/(i-r),h=(n+e)/(n-e),d=(i+r)/(i-r),p,_;if(c===Oi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(c===$o)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=f,u[4]=0,u[8]=h,u[12]=0,u[1]=0,u[5]=l,u[9]=d,u[13]=0,u[2]=0,u[6]=0,u[10]=p,u[14]=_,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,n,i,r,s,o,c=Oi){let u=this.elements,f=1/(n-e),l=1/(i-r),h=1/(o-s),d=(n+e)*f,p=(i+r)*l,_,b;if(c===Oi)_=(o+s)*h,b=-2*h;else if(c===$o)_=s*h,b=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*f,u[4]=0,u[8]=0,u[12]=-d,u[1]=0,u[5]=2*l,u[9]=0,u[13]=-p,u[2]=0,u[6]=0,u[10]=b,u[14]=-_,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}},ms=new D,Qn=new we,k0=new D(0,0,0),B0=new D(1,1,1),Qi=new D,wo=new D,Rn=new D,kd=new we,Bd=new nn,rc=class a{constructor(e=0,n=0,i=0,r=a.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],c=r[8],u=r[1],f=r[5],l=r[9],h=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,f),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(c,p),this._z=Math.atan2(u,f)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,f)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-o,f));break;case"YZX":this._z=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-l,f),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(c,p));break;case"XZY":this._z=Math.asin(-qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,f),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-l,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return kd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kd,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Bd.setFromEuler(this),this.setFromQuaternion(Bd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rc.DEFAULT_ORDER="XYZ";var Na=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},z0=0,zd=new D,gs=new nn,Ei=new we,Ao=new D,Ma=new D,G0=new D,H0=new nn,Gd=new D(1,0,0),Hd=new D(0,1,0),Vd=new D(0,0,1),V0={type:"added"},W0={type:"removed"},_t=class a extends Ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=a.DEFAULT_UP.clone();let e=new D,n=new rc,i=new nn,r=new D(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new we},normalMatrix:{value:new We}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=a.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=a.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return gs.setFromAxisAngle(e,n),this.quaternion.multiply(gs),this}rotateOnWorldAxis(e,n){return gs.setFromAxisAngle(e,n),this.quaternion.premultiply(gs),this}rotateX(e){return this.rotateOnAxis(Gd,e)}rotateY(e){return this.rotateOnAxis(Hd,e)}rotateZ(e){return this.rotateOnAxis(Vd,e)}translateOnAxis(e,n){return zd.copy(e).applyQuaternion(this.quaternion),this.position.add(zd.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Gd,e)}translateY(e){return this.translateOnAxis(Hd,e)}translateZ(e){return this.translateOnAxis(Vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ao.copy(e):Ao.set(e,n,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(Ma,Ao,this.up):Ei.lookAt(Ao,Ma,this.up),this.quaternion.setFromRotationMatrix(Ei),r&&(Ei.extractRotation(r.matrixWorld),gs.setFromRotationMatrix(Ei),this.quaternion.premultiply(gs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(V0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(W0)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,e,G0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,H0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,r=n.length;i<r;i++){let s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++){let c=r[s];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let u=c.shapes;if(Array.isArray(u))for(let f=0,l=u.length;f<l;f++){let h=u[f];s(e.shapes,h)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let u=0,f=this.material.length;u<f;u++)c.push(s(e.materials,this.material[u]));r.material=c}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){let u=this.animations[c];r.animations.push(s(e.animations,u))}}if(n){let c=o(e.geometries),u=o(e.materials),f=o(e.textures),l=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),_=o(e.nodes);c.length>0&&(i.geometries=c),u.length>0&&(i.materials=u),f.length>0&&(i.textures=f),l.length>0&&(i.images=l),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(c){let u=[];for(let f in c){let l=c[f];delete l.metadata,u.push(l)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};_t.DEFAULT_UP=new D(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var $n=new D,Ri=new D,Wl=new D,Ci=new D,_s=new D,bs=new D,Wd=new D,Xl=new D,ql=new D,Yl=new D,Eo=!1,Cs=class a{constructor(e=new D,n=new D,i=new D){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),$n.subVectors(e,n),r.cross($n);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){$n.subVectors(r,n),Ri.subVectors(i,n),Wl.subVectors(e,n);let o=$n.dot($n),c=$n.dot(Ri),u=$n.dot(Wl),f=Ri.dot(Ri),l=Ri.dot(Wl),h=o*f-c*c;if(h===0)return s.set(0,0,0),null;let d=1/h,p=(f*u-c*l)*d,_=(o*l-c*u)*d;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getUV(e,n,i,r,s,o,c,u){return Eo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Eo=!0),this.getInterpolation(e,n,i,r,s,o,c,u)}static getInterpolation(e,n,i,r,s,o,c,u){return this.getBarycoord(e,n,i,r,Ci)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,Ci.x),u.addScaledVector(o,Ci.y),u.addScaledVector(c,Ci.z),u)}static isFrontFacing(e,n,i,r){return $n.subVectors(i,n),Ri.subVectors(e,n),$n.cross(Ri).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),$n.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return a.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return Eo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Eo=!0),a.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return a.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){let i=this.a,r=this.b,s=this.c,o,c;_s.subVectors(r,i),bs.subVectors(s,i),Xl.subVectors(e,i);let u=_s.dot(Xl),f=bs.dot(Xl);if(u<=0&&f<=0)return n.copy(i);ql.subVectors(e,r);let l=_s.dot(ql),h=bs.dot(ql);if(l>=0&&h<=l)return n.copy(r);let d=u*h-l*f;if(d<=0&&u>=0&&l<=0)return o=u/(u-l),n.copy(i).addScaledVector(_s,o);Yl.subVectors(e,s);let p=_s.dot(Yl),_=bs.dot(Yl);if(_>=0&&p<=_)return n.copy(s);let b=p*f-u*_;if(b<=0&&f>=0&&_<=0)return c=f/(f-_),n.copy(i).addScaledVector(bs,c);let m=l*_-p*h;if(m<=0&&h-l>=0&&p-_>=0)return Wd.subVectors(s,r),c=(h-l)/(h-l+(p-_)),n.copy(r).addScaledVector(Wd,c);let g=1/(m+b+d);return o=b*g,c=d*g,n.copy(i).addScaledVector(_s,o).addScaledVector(bs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},em={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Ro={h:0,s:0,l:0};function jl(a,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?a+(e-a)*6*n:n<1/2?e:n<2/3?a+(e-a)*6*(2/3-n):a}var se=class{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Ze.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ze.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Ze.workingColorSpace){if(e=th(e,1),n=qt(n,0,1),i=qt(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=jl(o,s,e+1/3),this.g=jl(o,s,e),this.b=jl(o,s,e-1/3)}return Ze.toWorkingColorSpace(this,r),this}setStyle(e,n=nt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],c=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=nt){let i=em[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}copyLinearToSRGB(e){return this.r=Ul(e.r),this.g=Ul(e.g),this.b=Ul(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return Ze.fromWorkingColorSpace(en.copy(this),e),Math.round(qt(en.r*255,0,255))*65536+Math.round(qt(en.g*255,0,255))*256+Math.round(qt(en.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ze.workingColorSpace){Ze.fromWorkingColorSpace(en.copy(this),n);let i=en.r,r=en.g,s=en.b,o=Math.max(i,r,s),c=Math.min(i,r,s),u,f,l=(c+o)/2;if(c===o)u=0,f=0;else{let h=o-c;switch(f=l<=.5?h/(o+c):h/(2-o-c),o){case i:u=(r-s)/h+(r<s?6:0);break;case r:u=(s-i)/h+2;break;case s:u=(i-r)/h+4;break}u/=6}return e.h=u,e.s=f,e.l=l,e}getRGB(e,n=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(en.copy(this),n),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=nt){Ze.fromWorkingColorSpace(en.copy(this),e);let n=en.r,i=en.g,r=en.b;return e!==nt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL($i),this.setHSL($i.h+e,$i.s+n,$i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL($i),e.getHSL(Ro);let i=Ca($i.h,Ro.h,n),r=Ca($i.s,Ro.s,n),s=Ca($i.l,Ro.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new se;se.NAMES=em;var X0=0,Dn=class extends Ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Is,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cu,this.blendDst=lu,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Yo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ld,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){let n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==cu&&(i.blendSrc=this.blendSrc),this.blendDst!==lu&&(i.blendDst=this.blendDst),this.blendEquation!==Or&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Yo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ld&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(i.stencilFail=this.stencilFail),this.stencilZFail!==us&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let c in s){let u=s[c];delete u.metadata,o.push(u)}return o}if(n){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let n=e.clippingPlanes,i=null;if(n!==null){let r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},bt=class extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Bp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Di=q0();function q0(){let a=new ArrayBuffer(4),e=new Float32Array(a),n=new Uint32Array(a),i=new Uint32Array(512),r=new Uint32Array(512);for(let u=0;u<256;++u){let f=u-127;f<-27?(i[u]=0,i[u|256]=32768,r[u]=24,r[u|256]=24):f<-14?(i[u]=1024>>-f-14,i[u|256]=1024>>-f-14|32768,r[u]=-f-1,r[u|256]=-f-1):f<=15?(i[u]=f+15<<10,i[u|256]=f+15<<10|32768,r[u]=13,r[u|256]=13):f<128?(i[u]=31744,i[u|256]=64512,r[u]=24,r[u|256]=24):(i[u]=31744,i[u|256]=64512,r[u]=13,r[u|256]=13)}let s=new Uint32Array(2048),o=new Uint32Array(64),c=new Uint32Array(64);for(let u=1;u<1024;++u){let f=u<<13,l=0;for(;!(f&8388608);)f<<=1,l-=8388608;f&=-8388609,l+=947912704,s[u]=f|l}for(let u=1024;u<2048;++u)s[u]=939524096+(u-1024<<13);for(let u=1;u<31;++u)o[u]=u<<23;o[31]=1199570944,o[32]=2147483648;for(let u=33;u<63;++u)o[u]=2147483648+(u-32<<23);o[63]=3347054592;for(let u=1;u<64;++u)u!==32&&(c[u]=1024);return{floatView:e,uint32View:n,baseTable:i,shiftTable:r,mantissaTable:s,exponentTable:o,offsetTable:c}}function Y0(a){Math.abs(a)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),a=qt(a,-65504,65504),Di.floatView[0]=a;let e=Di.uint32View[0],n=e>>23&511;return Di.baseTable[n]+((e&8388607)>>Di.shiftTable[n])}function j0(a){let e=a>>10;return Di.uint32View[0]=Di.mantissaTable[Di.offsetTable[e]+(a&1023)]+Di.exponentTable[e],Di.floatView[0]}var Xa={toHalfFloat:Y0,fromHalfFloat:j0},Dt=new D,Co=new me,Ct=class{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=hu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Co.fromBufferAttribute(this,n),Co.applyMatrix3(e),this.setXY(n,Co.x,Co.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=tt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=li(n,this.array)),n}setX(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=li(n,this.array)),n}setY(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=li(n,this.array)),n}setZ(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=li(n,this.array)),n}setW(e,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),r=tt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),r=tt(r,this.array),s=tt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==hu&&(e.usage=this.usage),e}};var sc=class extends Ct{constructor(e,n,i){super(new Uint16Array(e),n,i)}};var ac=class extends Ct{constructor(e,n,i){super(new Uint32Array(e),n,i)}};var ot=class extends Ct{constructor(e,n,i){super(new Float32Array(e),n,i)}};var K0=0,zn=new we,Kl=new _t,xs=new D,Cn=new vn,Sa=new vn,Ht=new D,Ot=class a extends Ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($p(e)?ac:sc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zn.makeRotationFromQuaternion(e),this.applyMatrix4(zn),this}rotateX(e){return zn.makeRotationX(e),this.applyMatrix4(zn),this}rotateY(e){return zn.makeRotationY(e),this.applyMatrix4(zn),this}rotateZ(e){return zn.makeRotationZ(e),this.applyMatrix4(zn),this}translate(e,n,i){return zn.makeTranslation(e,n,i),this.applyMatrix4(zn),this}scale(e,n,i){return zn.makeScale(e,n,i),this.applyMatrix4(zn),this}lookAt(e){return Kl.lookAt(e),Kl.updateMatrix(),this.applyMatrix4(Kl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(e){let n=[];for(let i=0,r=e.length;i<r;i++){let s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ot(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){let s=n[i];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){let i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){let c=n[s];Sa.setFromBufferAttribute(c),this.morphTargetsRelative?(Ht.addVectors(Cn.min,Sa.min),Cn.expandByPoint(Ht),Ht.addVectors(Cn.max,Sa.max),Cn.expandByPoint(Ht)):(Cn.expandByPoint(Sa.min),Cn.expandByPoint(Sa.max))}Cn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ht));if(n)for(let s=0,o=n.length;s<o;s++){let c=n[s],u=this.morphTargetsRelative;for(let f=0,l=c.count;f<l;f++)Ht.fromBufferAttribute(c,f),u&&(xs.fromBufferAttribute(e,f),Ht.add(xs)),r=Math.max(r,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,c=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*c),4));let u=this.getAttribute("tangent").array,f=[],l=[];for(let S=0;S<c;S++)f[S]=new D,l[S]=new D;let h=new D,d=new D,p=new D,_=new me,b=new me,m=new me,g=new D,v=new D;function x(S,N,F){h.fromArray(r,S*3),d.fromArray(r,N*3),p.fromArray(r,F*3),_.fromArray(o,S*2),b.fromArray(o,N*2),m.fromArray(o,F*2),d.sub(h),p.sub(h),b.sub(_),m.sub(_);let V=1/(b.x*m.y-m.x*b.y);isFinite(V)&&(g.copy(d).multiplyScalar(m.y).addScaledVector(p,-b.y).multiplyScalar(V),v.copy(p).multiplyScalar(b.x).addScaledVector(d,-m.x).multiplyScalar(V),f[S].add(g),f[N].add(g),f[F].add(g),l[S].add(v),l[N].add(v),l[F].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let S=0,N=M.length;S<N;++S){let F=M[S],V=F.start,I=F.count;for(let U=V,k=V+I;U<k;U+=3)x(i[U+0],i[U+1],i[U+2])}let w=new D,T=new D,A=new D,C=new D;function y(S){A.fromArray(s,S*3),C.copy(A);let N=f[S];w.copy(N),w.sub(A.multiplyScalar(A.dot(N))).normalize(),T.crossVectors(C,N);let V=T.dot(l[S])<0?-1:1;u[S*4]=w.x,u[S*4+1]=w.y,u[S*4+2]=w.z,u[S*4+3]=V}for(let S=0,N=M.length;S<N;++S){let F=M[S],V=F.start,I=F.count;for(let U=V,k=V+I;U<k;U+=3)y(i[U+0]),y(i[U+1]),y(i[U+2])}}computeVertexNormals(){let e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let r=new D,s=new D,o=new D,c=new D,u=new D,f=new D,l=new D,h=new D;if(e)for(let d=0,p=e.count;d<p;d+=3){let _=e.getX(d+0),b=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,b),o.fromBufferAttribute(n,m),l.subVectors(o,s),h.subVectors(r,s),l.cross(h),c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,m),c.add(l),u.add(l),f.add(l),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(b,u.x,u.y,u.z),i.setXYZ(m,f.x,f.y,f.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),l.subVectors(o,s),h.subVectors(r,s),l.cross(h),i.setXYZ(d+0,l.x,l.y,l.z),i.setXYZ(d+1,l.x,l.y,l.z),i.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ht.fromBufferAttribute(e,n),Ht.normalize(),e.setXYZ(n,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(c,u){let f=c.array,l=c.itemSize,h=c.normalized,d=new f.constructor(u.length*l),p=0,_=0;for(let b=0,m=u.length;b<m;b++){c.isInterleavedBufferAttribute?p=u[b]*c.data.stride+c.offset:p=u[b]*l;for(let g=0;g<l;g++)d[_++]=f[p++]}return new Ct(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new a,i=this.index.array,r=this.attributes;for(let c in r){let u=r[c],f=e(u,i);n.setAttribute(c,f)}let s=this.morphAttributes;for(let c in s){let u=[],f=s[c];for(let l=0,h=f.length;l<h;l++){let d=f[l],p=e(d,i);u.push(p)}n.morphAttributes[c]=u}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let c=0,u=o.length;c<u;c++){let f=o[c];n.addGroup(f.start,f.count,f.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let u=this.parameters;for(let f in u)u[f]!==void 0&&(e[f]=u[f]);return e}e.data={attributes:{}};let n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let u in i){let f=i[u];e.data.attributes[u]=f.toJSON(e.data)}let r={},s=!1;for(let u in this.morphAttributes){let f=this.morphAttributes[u],l=[];for(let h=0,d=f.length;h<d;h++){let p=f[h];l.push(p.toJSON(e.data))}l.length>0&&(r[u]=l,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(n));let r=e.attributes;for(let f in r){let l=r[f];this.setAttribute(f,l.clone(n))}let s=e.morphAttributes;for(let f in s){let l=[],h=s[f];for(let d=0,p=h.length;d<p;d++)l.push(h[d].clone(n));this.morphAttributes[f]=l}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let f=0,l=o.length;f<l;f++){let h=o[f];this.addGroup(h.start,h.count,h.materialIndex)}let c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());let u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xd=new we,Lr=new Gr,Po=new In,qd=new D,vs=new D,ys=new D,Ms=new D,Jl=new D,Lo=new D,Io=new me,Do=new me,Oo=new me,Yd=new D,jd=new D,Kd=new D,No=new D,Uo=new D,Le=class extends _t{constructor(e=new Ot,n=new bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,n){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);let c=this.morphTargetInfluences;if(s&&c){Lo.set(0,0,0);for(let u=0,f=s.length;u<f;u++){let l=c[u],h=s[u];l!==0&&(Jl.fromBufferAttribute(h,e),o?Lo.addScaledVector(Jl,l):Lo.addScaledVector(Jl.sub(n),l))}n.add(Lo)}return n}raycast(e,n){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Po.copy(i.boundingSphere),Po.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(Po.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(Po,qd)===null||Lr.origin.distanceToSquared(qd)>(e.far-e.near)**2))&&(Xd.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(Xd),!(i.boundingBox!==null&&Lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Lr)))}_computeIntersections(e,n,i){let r,s=this.geometry,o=this.material,c=s.index,u=s.attributes.position,f=s.attributes.uv,l=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(c!==null)if(Array.isArray(o))for(let _=0,b=d.length;_<b;_++){let m=d[_],g=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,w=x;M<w;M+=3){let T=c.getX(M),A=c.getX(M+1),C=c.getX(M+2);r=Fo(this,g,e,i,f,l,h,T,A,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{let _=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=_,g=b;m<g;m+=3){let v=c.getX(m),x=c.getX(m+1),M=c.getX(m+2);r=Fo(this,o,e,i,f,l,h,v,x,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(u!==void 0)if(Array.isArray(o))for(let _=0,b=d.length;_<b;_++){let m=d[_],g=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(u.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,w=x;M<w;M+=3){let T=M,A=M+1,C=M+2;r=Fo(this,g,e,i,f,l,h,T,A,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{let _=Math.max(0,p.start),b=Math.min(u.count,p.start+p.count);for(let m=_,g=b;m<g;m+=3){let v=m,x=m+1,M=m+2;r=Fo(this,o,e,i,f,l,h,v,x,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}};function J0(a,e,n,i,r,s,o,c){let u;if(e.side===tn?u=i.intersectTriangle(o,s,r,!0,c):u=i.intersectTriangle(r,s,o,e.side===hi,c),u===null)return null;Uo.copy(c),Uo.applyMatrix4(a.matrixWorld);let f=n.ray.origin.distanceTo(Uo);return f<n.near||f>n.far?null:{distance:f,point:Uo.clone(),object:a}}function Fo(a,e,n,i,r,s,o,c,u,f){a.getVertexPosition(c,vs),a.getVertexPosition(u,ys),a.getVertexPosition(f,Ms);let l=J0(a,e,n,i,vs,ys,Ms,No);if(l){r&&(Io.fromBufferAttribute(r,c),Do.fromBufferAttribute(r,u),Oo.fromBufferAttribute(r,f),l.uv=Cs.getInterpolation(No,vs,ys,Ms,Io,Do,Oo,new me)),s&&(Io.fromBufferAttribute(s,c),Do.fromBufferAttribute(s,u),Oo.fromBufferAttribute(s,f),l.uv1=Cs.getInterpolation(No,vs,ys,Ms,Io,Do,Oo,new me),l.uv2=l.uv1),o&&(Yd.fromBufferAttribute(o,c),jd.fromBufferAttribute(o,u),Kd.fromBufferAttribute(o,f),l.normal=Cs.getInterpolation(No,vs,ys,Ms,Yd,jd,Kd,new D),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));let h={a:c,b:u,c:f,normal:new D,materialIndex:0};Cs.getNormal(vs,ys,Ms,h.normal),l.face=h}return l}var dn=class a extends Ot{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let c=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let u=[],f=[],l=[],h=[],d=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(u),this.setAttribute("position",new ot(f,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(h,2));function _(b,m,g,v,x,M,w,T,A,C,y){let S=M/A,N=w/C,F=M/2,V=w/2,I=T/2,U=A+1,k=C+1,Y=0,K=0,j=new D;for(let J=0;J<k;J++){let Q=J*N-V;for(let re=0;re<U;re++){let X=re*S-F;j[b]=X*v,j[m]=Q*x,j[g]=I,f.push(j.x,j.y,j.z),j[b]=0,j[m]=0,j[g]=T>0?1:-1,l.push(j.x,j.y,j.z),h.push(re/A),h.push(1-J/C),Y+=1}}for(let J=0;J<C;J++)for(let Q=0;Q<A;Q++){let re=d+Q+U*J,X=d+Q+U*(J+1),Z=d+(Q+1)+U*(J+1),ce=d+(Q+1)+U*J;u.push(re,X,ce),u.push(X,Z,ce),K+=6}c.addGroup(p,K,y),p+=K,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function zs(a){let e={};for(let n in a){e[n]={};for(let i in a[n]){let r=a[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function hn(a){let e={};for(let n=0;n<a.length;n++){let i=zs(a[n]);for(let r in i)e[r]=i[r]}return e}function Z0(a){let e=[];for(let n=0;n<a.length;n++)e.push(a[n].clone());return e}function tm(a){return a.getRenderTarget()===null?a.outputColorSpace:Ze.workingColorSpace}var ur={clone:zs,merge:hn},Q0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Q0,this.fragmentShader=$0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=Z0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},oc=class extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=Oi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ut=class extends oc{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let n=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ra*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(Ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,n=e*Math.tan(Ra*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let u=o.fullWidth,f=o.fullHeight;s+=o.offsetX*r/u,n-=o.offsetY*i/f,r*=o.width/u,i*=o.height/f}let c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},Ss=-90,Ts=1,gu=class extends _t{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ut(Ss,Ts,e,n);r.layers=this.layers,this.add(r);let s=new Ut(Ss,Ts,e,n);s.layers=this.layers,this.add(s);let o=new Ut(Ss,Ts,e,n);o.layers=this.layers,this.add(o);let c=new Ut(Ss,Ts,e,n);c.layers=this.layers,this.add(c);let u=new Ut(Ss,Ts,e,n);u.layers=this.layers,this.add(u);let f=new Ut(Ss,Ts,e,n);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){let e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,c,u]=n;for(let f of n)this.remove(f);if(e===Oi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===$o)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let f of n)this.add(f),f.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,c,u,f,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,c),e.setRenderTarget(i,3,r),e.render(n,u),e.setRenderTarget(i,4,r),e.render(n,f),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),e.render(n,l),e.setRenderTarget(h,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},cc=class extends Yt{constructor(e,n,i,r,s,o,c,u,f,l){e=e!==void 0?e:[],n=n!==void 0?n:Ns,super(e,n,i,r,s,o,c,u,f,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},_u=class extends jt{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(Pa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===kr?nt:Hn),this.texture=new cc(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Rt}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new dn(5,5,5),s=new Lt({name:"CubemapFromEquirect",uniforms:zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:ui});s.uniforms.tEquirect.value=n;let o=new Le(r,s),c=n.minFilter;return n.minFilter===Ni&&(n.minFilter=Rt),new gu(1,10,this).update(e,o),n.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}},Zl=new D,eb=new D,tb=new We,Ii=class{constructor(e=new D(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){let r=Zl.subVectors(i,n).cross(eb.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){let i=e.delta(Zl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){let i=n||tb.getNormalMatrix(e),r=this.coplanarPoint(Zl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ir=new In,ko=new D,Ua=class{constructor(e=new Ii,n=new Ii,i=new Ii,r=new Ii,s=new Ii,o=new Ii){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){let c=this.planes;return c[0].copy(e),c[1].copy(n),c[2].copy(i),c[3].copy(r),c[4].copy(s),c[5].copy(o),this}copy(e){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Oi){let i=this.planes,r=e.elements,s=r[0],o=r[1],c=r[2],u=r[3],f=r[4],l=r[5],h=r[6],d=r[7],p=r[8],_=r[9],b=r[10],m=r[11],g=r[12],v=r[13],x=r[14],M=r[15];if(i[0].setComponents(u-s,d-f,m-p,M-g).normalize(),i[1].setComponents(u+s,d+f,m+p,M+g).normalize(),i[2].setComponents(u+o,d+l,m+_,M+v).normalize(),i[3].setComponents(u-o,d-l,m-_,M-v).normalize(),i[4].setComponents(u-c,d-h,m-b,M-x).normalize(),n===Oi)i[5].setComponents(u+c,d+h,m+b,M+x).normalize();else if(n===$o)i[5].setComponents(c,h,b,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ir)}intersectsSprite(e){return Ir.center.set(0,0,0),Ir.radius=.7071067811865476,Ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ir)}intersectsSphere(e){let n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let n=this.planes;for(let i=0;i<6;i++){let r=n[i];if(ko.x=r.normal.x>0?e.max.x:e.min.x,ko.y=r.normal.y>0?e.max.y:e.min.y,ko.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ko)<0)return!1}return!0}containsPoint(e){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function nm(){let a=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=a.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=a.requestAnimationFrame(r),e=!0)},stop:function(){a.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){a=s}}}function nb(a,e){let n=e.isWebGL2,i=new WeakMap;function r(f,l){let h=f.array,d=f.usage,p=h.byteLength,_=a.createBuffer();a.bindBuffer(l,_),a.bufferData(l,h,d),f.onUploadCallback();let b;if(h instanceof Float32Array)b=a.FLOAT;else if(h instanceof Uint16Array)if(f.isFloat16BufferAttribute)if(n)b=a.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=a.UNSIGNED_SHORT;else if(h instanceof Int16Array)b=a.SHORT;else if(h instanceof Uint32Array)b=a.UNSIGNED_INT;else if(h instanceof Int32Array)b=a.INT;else if(h instanceof Int8Array)b=a.BYTE;else if(h instanceof Uint8Array)b=a.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)b=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:b,bytesPerElement:h.BYTES_PER_ELEMENT,version:f.version,size:p}}function s(f,l,h){let d=l.array,p=l._updateRange,_=l.updateRanges;if(a.bindBuffer(h,f),p.count===-1&&_.length===0&&a.bufferSubData(h,0,d),_.length!==0){for(let b=0,m=_.length;b<m;b++){let g=_[b];n?a.bufferSubData(h,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count):a.bufferSubData(h,g.start*d.BYTES_PER_ELEMENT,d.subarray(g.start,g.start+g.count))}l.clearUpdateRanges()}p.count!==-1&&(n?a.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):a.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),l.onUploadCallback()}function o(f){return f.isInterleavedBufferAttribute&&(f=f.data),i.get(f)}function c(f){f.isInterleavedBufferAttribute&&(f=f.data);let l=i.get(f);l&&(a.deleteBuffer(l.buffer),i.delete(f))}function u(f,l){if(f.isGLBufferAttribute){let d=i.get(f);(!d||d.version<f.version)&&i.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}f.isInterleavedBufferAttribute&&(f=f.data);let h=i.get(f);if(h===void 0)i.set(f,r(f,l));else if(h.version<f.version){if(h.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,f,l),h.version=f.version}}return{get:o,remove:c,update:u}}var ti=class a extends Ot{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};let s=e/2,o=n/2,c=Math.floor(i),u=Math.floor(r),f=c+1,l=u+1,h=e/c,d=n/u,p=[],_=[],b=[],m=[];for(let g=0;g<l;g++){let v=g*d-o;for(let x=0;x<f;x++){let M=x*h-s;_.push(M,-v,0),b.push(0,0,1),m.push(x/c),m.push(1-g/u)}}for(let g=0;g<u;g++)for(let v=0;v<c;v++){let x=v+f*g,M=v+f*(g+1),w=v+1+f*(g+1),T=v+1+f*g;p.push(x,M,T),p.push(M,w,T)}this.setIndex(p),this.setAttribute("position",new ot(_,3)),this.setAttribute("normal",new ot(b,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.widthSegments,e.heightSegments)}},ib=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ab=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ob=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,cb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ub=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hb=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,db=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_b=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,xb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,wb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ab=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Eb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ib=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Db="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ob=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Nb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ub=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xb=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Jb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$b=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ex=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,nx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ix=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ax=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ox=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,lx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ux=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,px=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_x=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,bx=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,xx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ex=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ox=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ux=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,nv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ov=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,uv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_v=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Av=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ev=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ov=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:ib,alphahash_pars_fragment:rb,alphamap_fragment:sb,alphamap_pars_fragment:ab,alphatest_fragment:ob,alphatest_pars_fragment:cb,aomap_fragment:lb,aomap_pars_fragment:ub,batching_pars_vertex:hb,batching_vertex:fb,begin_vertex:db,beginnormal_vertex:pb,bsdfs:mb,iridescence_fragment:gb,bumpmap_pars_fragment:_b,clipping_planes_fragment:bb,clipping_planes_pars_fragment:xb,clipping_planes_pars_vertex:vb,clipping_planes_vertex:yb,color_fragment:Mb,color_pars_fragment:Sb,color_pars_vertex:Tb,color_vertex:wb,common:Ab,cube_uv_reflection_fragment:Eb,defaultnormal_vertex:Rb,displacementmap_pars_vertex:Cb,displacementmap_vertex:Pb,emissivemap_fragment:Lb,emissivemap_pars_fragment:Ib,colorspace_fragment:Db,colorspace_pars_fragment:Ob,envmap_fragment:Nb,envmap_common_pars_fragment:Ub,envmap_pars_fragment:Fb,envmap_pars_vertex:kb,envmap_physical_pars_fragment:Jb,envmap_vertex:Bb,fog_vertex:zb,fog_pars_vertex:Gb,fog_fragment:Hb,fog_pars_fragment:Vb,gradientmap_pars_fragment:Wb,lightmap_fragment:Xb,lightmap_pars_fragment:qb,lights_lambert_fragment:Yb,lights_lambert_pars_fragment:jb,lights_pars_begin:Kb,lights_toon_fragment:Zb,lights_toon_pars_fragment:Qb,lights_phong_fragment:$b,lights_phong_pars_fragment:ex,lights_physical_fragment:tx,lights_physical_pars_fragment:nx,lights_fragment_begin:ix,lights_fragment_maps:rx,lights_fragment_end:sx,logdepthbuf_fragment:ax,logdepthbuf_pars_fragment:ox,logdepthbuf_pars_vertex:cx,logdepthbuf_vertex:lx,map_fragment:ux,map_pars_fragment:hx,map_particle_fragment:fx,map_particle_pars_fragment:dx,metalnessmap_fragment:px,metalnessmap_pars_fragment:mx,morphcolor_vertex:gx,morphnormal_vertex:_x,morphtarget_pars_vertex:bx,morphtarget_vertex:xx,normal_fragment_begin:vx,normal_fragment_maps:yx,normal_pars_fragment:Mx,normal_pars_vertex:Sx,normal_vertex:Tx,normalmap_pars_fragment:wx,clearcoat_normal_fragment_begin:Ax,clearcoat_normal_fragment_maps:Ex,clearcoat_pars_fragment:Rx,iridescence_pars_fragment:Cx,opaque_fragment:Px,packing:Lx,premultiplied_alpha_fragment:Ix,project_vertex:Dx,dithering_fragment:Ox,dithering_pars_fragment:Nx,roughnessmap_fragment:Ux,roughnessmap_pars_fragment:Fx,shadowmap_pars_fragment:kx,shadowmap_pars_vertex:Bx,shadowmap_vertex:zx,shadowmask_pars_fragment:Gx,skinbase_vertex:Hx,skinning_pars_vertex:Vx,skinning_vertex:Wx,skinnormal_vertex:Xx,specularmap_fragment:qx,specularmap_pars_fragment:Yx,tonemapping_fragment:jx,tonemapping_pars_fragment:Kx,transmission_fragment:Jx,transmission_pars_fragment:Zx,uv_pars_fragment:Qx,uv_pars_vertex:$x,uv_vertex:ev,worldpos_vertex:tv,background_vert:nv,background_frag:iv,backgroundCube_vert:rv,backgroundCube_frag:sv,cube_vert:av,cube_frag:ov,depth_vert:cv,depth_frag:lv,distanceRGBA_vert:uv,distanceRGBA_frag:hv,equirect_vert:fv,equirect_frag:dv,linedashed_vert:pv,linedashed_frag:mv,meshbasic_vert:gv,meshbasic_frag:_v,meshlambert_vert:bv,meshlambert_frag:xv,meshmatcap_vert:vv,meshmatcap_frag:yv,meshnormal_vert:Mv,meshnormal_frag:Sv,meshphong_vert:Tv,meshphong_frag:wv,meshphysical_vert:Av,meshphysical_frag:Ev,meshtoon_vert:Rv,meshtoon_frag:Cv,points_vert:Pv,points_frag:Lv,shadow_vert:Iv,shadow_frag:Dv,sprite_vert:Ov,sprite_frag:Nv},oe={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},ci={basic:{uniforms:hn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:hn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new se(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:hn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:hn([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:hn([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new se(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:hn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:hn([oe.points,oe.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:hn([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:hn([oe.common,oe.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:hn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:hn([oe.sprite,oe.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:hn([oe.common,oe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:hn([oe.lights,oe.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};ci.physical={uniforms:hn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var Bo={r:0,b:0,g:0};function Uv(a,e,n,i,r,s,o){let c=new se(0),u=s===!0?0:1,f,l,h=null,d=0,p=null;function _(m,g){let v=!1,x=g.isScene===!0?g.background:null;x&&x.isTexture&&(x=(g.backgroundBlurriness>0?n:e).get(x)),x===null?b(c,u):x&&x.isColor&&(b(x,1),v=!0);let M=a.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(a.autoClear||v)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Cc)?(l===void 0&&(l=new Le(new dn(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:zs(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(x.colorSpace)!==rt,(h!==x||d!==x.version||p!==a.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,p=a.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(f===void 0&&(f=new Le(new ti(2,2),new Lt({name:"BackgroundMaterial",uniforms:zs(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=x,f.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,f.material.toneMapped=Ze.getTransfer(x.colorSpace)!==rt,x.matrixAutoUpdate===!0&&x.updateMatrix(),f.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||p!==a.toneMapping)&&(f.material.needsUpdate=!0,h=x,d=x.version,p=a.toneMapping),f.layers.enableAll(),m.unshift(f,f.geometry,f.material,0,0,null))}function b(m,g){m.getRGB(Bo,tm(a)),i.buffers.color.setClear(Bo.r,Bo.g,Bo.b,g,o)}return{getClearColor:function(){return c},setClearColor:function(m,g=1){c.set(m),u=g,b(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(m){u=m,b(c,u)},render:_}}function Fv(a,e,n,i){let r=a.getParameter(a.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,c={},u=m(null),f=u,l=!1;function h(I,U,k,Y,K){let j=!1;if(o){let J=b(Y,k,U);f!==J&&(f=J,p(f.object)),j=g(I,Y,k,K),j&&v(I,Y,k,K)}else{let J=U.wireframe===!0;(f.geometry!==Y.id||f.program!==k.id||f.wireframe!==J)&&(f.geometry=Y.id,f.program=k.id,f.wireframe=J,j=!0)}K!==null&&n.update(K,a.ELEMENT_ARRAY_BUFFER),(j||l)&&(l=!1,C(I,U,k,Y),K!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,n.get(K).buffer))}function d(){return i.isWebGL2?a.createVertexArray():s.createVertexArrayOES()}function p(I){return i.isWebGL2?a.bindVertexArray(I):s.bindVertexArrayOES(I)}function _(I){return i.isWebGL2?a.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function b(I,U,k){let Y=k.wireframe===!0,K=c[I.id];K===void 0&&(K={},c[I.id]=K);let j=K[U.id];j===void 0&&(j={},K[U.id]=j);let J=j[Y];return J===void 0&&(J=m(d()),j[Y]=J),J}function m(I){let U=[],k=[],Y=[];for(let K=0;K<r;K++)U[K]=0,k[K]=0,Y[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:Y,object:I,attributes:{},index:null}}function g(I,U,k,Y){let K=f.attributes,j=U.attributes,J=0,Q=k.getAttributes();for(let re in Q)if(Q[re].location>=0){let Z=K[re],ce=j[re];if(ce===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(ce=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(ce=I.instanceColor)),Z===void 0||Z.attribute!==ce||ce&&Z.data!==ce.data)return!0;J++}return f.attributesNum!==J||f.index!==Y}function v(I,U,k,Y){let K={},j=U.attributes,J=0,Q=k.getAttributes();for(let re in Q)if(Q[re].location>=0){let Z=j[re];Z===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor));let ce={};ce.attribute=Z,Z&&Z.data&&(ce.data=Z.data),K[re]=ce,J++}f.attributes=K,f.attributesNum=J,f.index=Y}function x(){let I=f.newAttributes;for(let U=0,k=I.length;U<k;U++)I[U]=0}function M(I){w(I,0)}function w(I,U){let k=f.newAttributes,Y=f.enabledAttributes,K=f.attributeDivisors;k[I]=1,Y[I]===0&&(a.enableVertexAttribArray(I),Y[I]=1),K[I]!==U&&((i.isWebGL2?a:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,U),K[I]=U)}function T(){let I=f.newAttributes,U=f.enabledAttributes;for(let k=0,Y=U.length;k<Y;k++)U[k]!==I[k]&&(a.disableVertexAttribArray(k),U[k]=0)}function A(I,U,k,Y,K,j,J){J===!0?a.vertexAttribIPointer(I,U,k,K,j):a.vertexAttribPointer(I,U,k,Y,K,j)}function C(I,U,k,Y){if(i.isWebGL2===!1&&(I.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();let K=Y.attributes,j=k.getAttributes(),J=U.defaultAttributeValues;for(let Q in j){let re=j[Q];if(re.location>=0){let X=K[Q];if(X===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(X=I.instanceColor)),X!==void 0){let Z=X.normalized,ce=X.itemSize,ve=n.get(X);if(ve===void 0)continue;let xe=ve.buffer,Oe=ve.type,Ue=ve.bytesPerElement,Ee=i.isWebGL2===!0&&(Oe===a.INT||Oe===a.UNSIGNED_INT||X.gpuType===Gp);if(X.isInterleavedBufferAttribute){let Je=X.data,z=Je.stride,on=X.offset;if(Je.isInstancedInterleavedBuffer){for(let Me=0;Me<re.locationSize;Me++)w(re.location+Me,Je.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Je.meshPerAttribute*Je.count)}else for(let Me=0;Me<re.locationSize;Me++)M(re.location+Me);a.bindBuffer(a.ARRAY_BUFFER,xe);for(let Me=0;Me<re.locationSize;Me++)A(re.location+Me,ce/re.locationSize,Oe,Z,z*Ue,(on+ce/re.locationSize*Me)*Ue,Ee)}else{if(X.isInstancedBufferAttribute){for(let Je=0;Je<re.locationSize;Je++)w(re.location+Je,X.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Je=0;Je<re.locationSize;Je++)M(re.location+Je);a.bindBuffer(a.ARRAY_BUFFER,xe);for(let Je=0;Je<re.locationSize;Je++)A(re.location+Je,ce/re.locationSize,Oe,Z,ce*Ue,ce/re.locationSize*Je*Ue,Ee)}}else if(J!==void 0){let Z=J[Q];if(Z!==void 0)switch(Z.length){case 2:a.vertexAttrib2fv(re.location,Z);break;case 3:a.vertexAttrib3fv(re.location,Z);break;case 4:a.vertexAttrib4fv(re.location,Z);break;default:a.vertexAttrib1fv(re.location,Z)}}}}T()}function y(){F();for(let I in c){let U=c[I];for(let k in U){let Y=U[k];for(let K in Y)_(Y[K].object),delete Y[K];delete U[k]}delete c[I]}}function S(I){if(c[I.id]===void 0)return;let U=c[I.id];for(let k in U){let Y=U[k];for(let K in Y)_(Y[K].object),delete Y[K];delete U[k]}delete c[I.id]}function N(I){for(let U in c){let k=c[U];if(k[I.id]===void 0)continue;let Y=k[I.id];for(let K in Y)_(Y[K].object),delete Y[K];delete k[I.id]}}function F(){V(),l=!0,f!==u&&(f=u,p(f.object))}function V(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:h,reset:F,resetDefaultState:V,dispose:y,releaseStatesOfGeometry:S,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:M,disableUnusedAttributes:T}}function kv(a,e,n,i){let r=i.isWebGL2,s;function o(l){s=l}function c(l,h){a.drawArrays(s,l,h),n.update(h,s,1)}function u(l,h,d){if(d===0)return;let p,_;if(r)p=a,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,l,h,d),n.update(h,s,d)}function f(l,h,d){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<d;_++)this.render(l[_],h[_]);else{p.multiDrawArraysWEBGL(s,l,0,h,0,d);let _=0;for(let b=0;b<d;b++)_+=h[b];n.update(_,s,1)}}this.setMode=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=f}function Bv(a,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=a.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&a.constructor.name==="WebGL2RenderingContext",c=n.precision!==void 0?n.precision:"highp",u=s(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=o||e.has("WEBGL_draw_buffers"),l=n.logarithmicDepthBuffer===!0,h=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),d=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=a.getParameter(a.MAX_TEXTURE_SIZE),_=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),b=a.getParameter(a.MAX_VERTEX_ATTRIBS),m=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),g=a.getParameter(a.MAX_VARYING_VECTORS),v=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,M=o||e.has("OES_texture_float"),w=x&&M,T=o?a.getParameter(a.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:f,getMaxAnisotropy:r,getMaxPrecision:s,precision:c,logarithmicDepthBuffer:l,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:b,maxVertexUniforms:m,maxVaryings:g,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:w,maxSamples:T}}function zv(a){let e=this,n=null,i=0,r=!1,s=!1,o=new Ii,c=new We,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=l(h,d,0)},this.setState=function(h,d,p){let _=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,g=a.get(h);if(!r||_===null||_.length===0||s&&!m)s?l(null):f();else{let v=s?0:i,x=v*4,M=g.clippingState||null;u.value=M,M=l(_,d,x,p);for(let w=0;w!==x;++w)M[w]=n[w];g.clippingState=M,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function f(){u.value!==n&&(u.value=n,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function l(h,d,p,_){let b=h!==null?h.length:0,m=null;if(b!==0){if(m=u.value,_!==!0||m===null){let g=p+b*4,v=d.matrixWorldInverse;c.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let x=0,M=p;x!==b;++x,M+=4)o.copy(h[x]).applyMatrix4(v,c),o.normal.toArray(m,M),m[M+3]=o.constant}u.value=m,u.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function Gv(a){let e=new WeakMap;function n(o,c){return c===Ia?o.mapping=Ns:c===uu&&(o.mapping=Us),o}function i(o){if(o&&o.isTexture){let c=o.mapping;if(c===Ia||c===uu)if(e.has(o)){let u=e.get(o).texture;return n(u,o.mapping)}else{let u=o.image;if(u&&u.height>0){let f=new _u(u.height/2);return f.fromEquirectangularTexture(a,o),e.set(o,f),o.addEventListener("dispose",r),n(f.texture,o.mapping)}else return null}}return o}function r(o){let c=o.target;c.removeEventListener("dispose",r);let u=e.get(c);u!==void 0&&(e.delete(c),u.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var rr=class extends oc{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,c=r+n,u=r-n;if(this.view!==null&&this.view.enabled){let f=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=f*this.view.offsetX,o=s+f*this.view.width,c-=l*this.view.offsetY,u=c-l*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},Ps=4,Jd=[.125,.215,.35,.446,.526,.582],Nr=20,Ql=new rr,Zd=new se,$l=null,eu=0,tu=0,Dr=(1+Math.sqrt(5))/2,ws=1/Dr,Qd=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Dr,ws),new D(0,Dr,-ws),new D(ws,0,Dr),new D(-ws,0,Dr),new D(Dr,ws,0),new D(-Dr,ws,0)],Gs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){$l=this._renderer.getRenderTarget(),eu=this._renderer.getActiveCubeFace(),tu=this._renderer.getActiveMipmapLevel(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($l,eu,tu),e.scissorTest=!1,zo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ns||e.mapping===Us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$l=this._renderer.getRenderTarget(),eu=this._renderer.getActiveCubeFace(),tu=this._renderer.getActiveMipmapLevel();let i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Vt,format:Gn,colorSpace:Pt,depthBuffer:!1},r=$d(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$d(e,n,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hv(s)),this._blurMaterial=Vv(s,e,n)}return r}_compileMaterial(e){let n=new Le(this._lodPlanes[0],e);this._renderer.compile(n,Ql)}_sceneToCubeUV(e,n,i,r){let c=new Ut(90,1,n,i),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],l=this._renderer,h=l.autoClear,d=l.toneMapping;l.getClearColor(Zd),l.toneMapping=nr,l.autoClear=!1;let p=new bt({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),_=new Le(new dn,p),b=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,b=!0):(p.color.copy(Zd),b=!0);for(let g=0;g<6;g++){let v=g%3;v===0?(c.up.set(0,u[g],0),c.lookAt(f[g],0,0)):v===1?(c.up.set(0,0,u[g]),c.lookAt(0,f[g],0)):(c.up.set(0,u[g],0),c.lookAt(0,0,f[g]));let x=this._cubeSize;zo(r,v*x,g>2?x:0,x,x),l.setRenderTarget(r),b&&l.render(_,c),l.render(e,c)}_.geometry.dispose(),_.material.dispose(),l.toneMapping=d,l.autoClear=h,e.background=m}_textureToCubeUV(e,n){let i=this._renderer,r=e.mapping===Ns||e.mapping===Us;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=tp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ep());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Le(this._lodPlanes[0],s),c=s.uniforms;c.envMap.value=e;let u=this._cubeSize;zo(n,0,0,3*u,2*u),i.setRenderTarget(n),i.render(o,Ql)}_applyPMREM(e){let n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Qd[(r-1)%Qd.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,c){let u=this._renderer,f=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let l=3,h=new Le(this._lodPlanes[r],f),d=f.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Nr-1),b=s/_,m=isFinite(s)?1+Math.floor(l*b):Nr;m>Nr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Nr}`);let g=[],v=0;for(let A=0;A<Nr;++A){let C=A/b,y=Math.exp(-C*C/2);g.push(y),A===0?v+=y:A<m&&(v+=2*y)}for(let A=0;A<g.length;A++)g[A]=g[A]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=o==="latitudinal",c&&(d.poleAxis.value=c);let{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-i;let M=this._sizeLods[r],w=3*M*(r>x-Ps?r-x+Ps:0),T=4*(this._cubeSize-M);zo(n,w,T,3*M,2*M),u.setRenderTarget(n),u.render(h,Ql)}};function Hv(a){let e=[],n=[],i=[],r=a,s=a-Ps+1+Jd.length;for(let o=0;o<s;o++){let c=Math.pow(2,r);n.push(c);let u=1/c;o>a-Ps?u=Jd[o-a+Ps-1]:o===0&&(u=0),i.push(u);let f=1/(c-2),l=-f,h=1+f,d=[l,l,h,l,h,h,l,l,h,h,l,h],p=6,_=6,b=3,m=2,g=1,v=new Float32Array(b*_*p),x=new Float32Array(m*_*p),M=new Float32Array(g*_*p);for(let T=0;T<p;T++){let A=T%3*2/3-1,C=T>2?0:-1,y=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];v.set(y,b*_*T),x.set(d,m*_*T);let S=[T,T,T,T,T,T];M.set(S,g*_*T)}let w=new Ot;w.setAttribute("position",new Ct(v,b)),w.setAttribute("uv",new Ct(x,m)),w.setAttribute("faceIndex",new Ct(M,g)),e.push(w),r>Ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function $d(a,e,n){let i=new jt(a,e,n);return i.texture.mapping=Cc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zo(a,e,n,i,r){a.viewport.set(e,n,i,r),a.scissor.set(e,n,i,r)}function Vv(a,e,n){let i=new Float32Array(Nr),r=new D(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:Nr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function ep(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function tp(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function nh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wv(a){let e=new WeakMap,n=null;function i(c){if(c&&c.isTexture){let u=c.mapping,f=u===Ia||u===uu,l=u===Ns||u===Us;if(f||l)if(c.isRenderTargetTexture&&c.needsPMREMUpdate===!0){c.needsPMREMUpdate=!1;let h=e.get(c);return n===null&&(n=new Gs(a)),h=f?n.fromEquirectangular(c,h):n.fromCubemap(c,h),e.set(c,h),h.texture}else{if(e.has(c))return e.get(c).texture;{let h=c.image;if(f&&h&&h.height>0||l&&h&&r(h)){n===null&&(n=new Gs(a));let d=f?n.fromEquirectangular(c):n.fromCubemap(c);return e.set(c,d),c.addEventListener("dispose",s),d.texture}else return null}}}return c}function r(c){let u=0,f=6;for(let l=0;l<f;l++)c[l]!==void 0&&u++;return u===f}function s(c){let u=c.target;u.removeEventListener("dispose",s);let f=e.get(u);f!==void 0&&(e.delete(u),f.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Xv(a){let e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=a.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){let r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function qv(a,e,n,i){let r={},s=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let _ in d.attributes)e.remove(d.attributes[_]);for(let _ in d.morphAttributes){let b=d.morphAttributes[_];for(let m=0,g=b.length;m<g;m++)e.remove(b[m])}d.removeEventListener("dispose",o),delete r[d.id];let p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function c(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function u(h){let d=h.attributes;for(let _ in d)e.update(d[_],a.ARRAY_BUFFER);let p=h.morphAttributes;for(let _ in p){let b=p[_];for(let m=0,g=b.length;m<g;m++)e.update(b[m],a.ARRAY_BUFFER)}}function f(h){let d=[],p=h.index,_=h.attributes.position,b=0;if(p!==null){let v=p.array;b=p.version;for(let x=0,M=v.length;x<M;x+=3){let w=v[x+0],T=v[x+1],A=v[x+2];d.push(w,T,T,A,A,w)}}else if(_!==void 0){let v=_.array;b=_.version;for(let x=0,M=v.length/3-1;x<M;x+=3){let w=x+0,T=x+1,A=x+2;d.push(w,T,T,A,A,w)}}else return;let m=new($p(d)?ac:sc)(d,1);m.version=b;let g=s.get(h);g&&e.remove(g),s.set(h,m)}function l(h){let d=s.get(h);if(d){let p=h.index;p!==null&&d.version<p.version&&f(h)}else f(h);return s.get(h)}return{get:c,update:u,getWireframeAttribute:l}}function Yv(a,e,n,i){let r=i.isWebGL2,s;function o(p){s=p}let c,u;function f(p){c=p.type,u=p.bytesPerElement}function l(p,_){a.drawElements(s,_,c,p*u),n.update(_,s,1)}function h(p,_,b){if(b===0)return;let m,g;if(r)m=a,g="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](s,_,c,p*u,b),n.update(_,s,b)}function d(p,_,b){if(b===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<b;g++)this.render(p[g]/u,_[g]);else{m.multiDrawElementsWEBGL(s,_,0,c,p,0,b);let g=0;for(let v=0;v<b;v++)g+=_[v];n.update(g,s,1)}}this.setMode=o,this.setIndex=f,this.render=l,this.renderInstances=h,this.renderMultiDraw=d}function jv(a){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,c){switch(n.calls++,o){case a.TRIANGLES:n.triangles+=c*(s/3);break;case a.LINES:n.lines+=c*(s/2);break;case a.LINE_STRIP:n.lines+=c*(s-1);break;case a.LINE_LOOP:n.lines+=c*s;break;case a.POINTS:n.points+=c*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Kv(a,e){return a[0]-e[0]}function Jv(a,e){return Math.abs(e[1])-Math.abs(a[1])}function Zv(a,e,n){let i={},r=new Float32Array(8),s=new WeakMap,o=new at,c=[];for(let f=0;f<8;f++)c[f]=[f,0];function u(f,l,h){let d=f.morphTargetInfluences;if(e.isWebGL2===!0){let p=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,_=p!==void 0?p.length:0,b=s.get(l);if(b===void 0||b.count!==_){let I=function(){F.dispose(),s.delete(l),l.removeEventListener("dispose",I)};b!==void 0&&b.texture.dispose();let v=l.morphAttributes.position!==void 0,x=l.morphAttributes.normal!==void 0,M=l.morphAttributes.color!==void 0,w=l.morphAttributes.position||[],T=l.morphAttributes.normal||[],A=l.morphAttributes.color||[],C=0;v===!0&&(C=1),x===!0&&(C=2),M===!0&&(C=3);let y=l.attributes.position.count*C,S=1;y>e.maxTextureSize&&(S=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let N=new Float32Array(y*S*4*_),F=new ic(N,y,S,_);F.type=Pn,F.needsUpdate=!0;let V=C*4;for(let U=0;U<_;U++){let k=w[U],Y=T[U],K=A[U],j=y*S*4*U;for(let J=0;J<k.count;J++){let Q=J*V;v===!0&&(o.fromBufferAttribute(k,J),N[j+Q+0]=o.x,N[j+Q+1]=o.y,N[j+Q+2]=o.z,N[j+Q+3]=0),x===!0&&(o.fromBufferAttribute(Y,J),N[j+Q+4]=o.x,N[j+Q+5]=o.y,N[j+Q+6]=o.z,N[j+Q+7]=0),M===!0&&(o.fromBufferAttribute(K,J),N[j+Q+8]=o.x,N[j+Q+9]=o.y,N[j+Q+10]=o.z,N[j+Q+11]=K.itemSize===4?o.w:1)}}b={count:_,texture:F,size:new me(y,S)},s.set(l,b),l.addEventListener("dispose",I)}let m=0;for(let v=0;v<d.length;v++)m+=d[v];let g=l.morphTargetsRelative?1:1-m;h.getUniforms().setValue(a,"morphTargetBaseInfluence",g),h.getUniforms().setValue(a,"morphTargetInfluences",d),h.getUniforms().setValue(a,"morphTargetsTexture",b.texture,n),h.getUniforms().setValue(a,"morphTargetsTextureSize",b.size)}else{let p=d===void 0?0:d.length,_=i[l.id];if(_===void 0||_.length!==p){_=[];for(let x=0;x<p;x++)_[x]=[x,0];i[l.id]=_}for(let x=0;x<p;x++){let M=_[x];M[0]=x,M[1]=d[x]}_.sort(Jv);for(let x=0;x<8;x++)x<p&&_[x][1]?(c[x][0]=_[x][0],c[x][1]=_[x][1]):(c[x][0]=Number.MAX_SAFE_INTEGER,c[x][1]=0);c.sort(Kv);let b=l.morphAttributes.position,m=l.morphAttributes.normal,g=0;for(let x=0;x<8;x++){let M=c[x],w=M[0],T=M[1];w!==Number.MAX_SAFE_INTEGER&&T?(b&&l.getAttribute("morphTarget"+x)!==b[w]&&l.setAttribute("morphTarget"+x,b[w]),m&&l.getAttribute("morphNormal"+x)!==m[w]&&l.setAttribute("morphNormal"+x,m[w]),r[x]=T,g+=T):(b&&l.hasAttribute("morphTarget"+x)===!0&&l.deleteAttribute("morphTarget"+x),m&&l.hasAttribute("morphNormal"+x)===!0&&l.deleteAttribute("morphNormal"+x),r[x]=0)}let v=l.morphTargetsRelative?1:1-g;h.getUniforms().setValue(a,"morphTargetBaseInfluence",v),h.getUniforms().setValue(a,"morphTargetInfluences",r)}}return{update:u}}function Qv(a,e,n,i){let r=new WeakMap;function s(u){let f=i.render.frame,l=u.geometry,h=e.get(u,l);if(r.get(h)!==f&&(e.update(h),r.set(h,f)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),r.get(u)!==f&&(n.update(u.instanceMatrix,a.ARRAY_BUFFER),u.instanceColor!==null&&n.update(u.instanceColor,a.ARRAY_BUFFER),r.set(u,f))),u.isSkinnedMesh){let d=u.skeleton;r.get(d)!==f&&(d.update(),r.set(d,f))}return h}function o(){r=new WeakMap}function c(u){let f=u.target;f.removeEventListener("dispose",c),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:s,dispose:o}}var lc=class extends Yt{constructor(e,n,i,r,s,o,c,u,f,l){if(l=l!==void 0?l:Fr,l!==Fr&&l!==Fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===Fr&&(i=er),i===void 0&&l===Fs&&(i=Ur),super(null,r,s,o,c,u,l,i,f),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=c!==void 0?c:Nt,this.minFilter=u!==void 0?u:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},im=new Yt,rm=new lc(1,1);rm.compareFunction=Zp;var sm=new ic,am=new mu,om=new cc,np=[],ip=[],rp=new Float32Array(16),sp=new Float32Array(9),ap=new Float32Array(4);function Js(a,e,n){let i=a[0];if(i<=0||i>0)return a;let r=e*n,s=np[r];if(s===void 0&&(s=new Float32Array(r),np[r]=s),e!==0){i.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=n,a[o].toArray(s,c)}return s}function Ft(a,e){if(a.length!==e.length)return!1;for(let n=0,i=a.length;n<i;n++)if(a[n]!==e[n])return!1;return!0}function kt(a,e){for(let n=0,i=e.length;n<i;n++)a[n]=e[n]}function Ic(a,e){let n=ip[e];n===void 0&&(n=new Int32Array(e),ip[e]=n);for(let i=0;i!==e;++i)n[i]=a.allocateTextureUnit();return n}function $v(a,e){let n=this.cache;n[0]!==e&&(a.uniform1f(this.addr,e),n[0]=e)}function ey(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;a.uniform2fv(this.addr,e),kt(n,e)}}function ty(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ft(n,e))return;a.uniform3fv(this.addr,e),kt(n,e)}}function ny(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;a.uniform4fv(this.addr,e),kt(n,e)}}function iy(a,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;a.uniformMatrix2fv(this.addr,!1,e),kt(n,e)}else{if(Ft(n,i))return;ap.set(i),a.uniformMatrix2fv(this.addr,!1,ap),kt(n,i)}}function ry(a,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;a.uniformMatrix3fv(this.addr,!1,e),kt(n,e)}else{if(Ft(n,i))return;sp.set(i),a.uniformMatrix3fv(this.addr,!1,sp),kt(n,i)}}function sy(a,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;a.uniformMatrix4fv(this.addr,!1,e),kt(n,e)}else{if(Ft(n,i))return;rp.set(i),a.uniformMatrix4fv(this.addr,!1,rp),kt(n,i)}}function ay(a,e){let n=this.cache;n[0]!==e&&(a.uniform1i(this.addr,e),n[0]=e)}function oy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;a.uniform2iv(this.addr,e),kt(n,e)}}function cy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;a.uniform3iv(this.addr,e),kt(n,e)}}function ly(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;a.uniform4iv(this.addr,e),kt(n,e)}}function uy(a,e){let n=this.cache;n[0]!==e&&(a.uniform1ui(this.addr,e),n[0]=e)}function hy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;a.uniform2uiv(this.addr,e),kt(n,e)}}function fy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;a.uniform3uiv(this.addr,e),kt(n,e)}}function dy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;a.uniform4uiv(this.addr,e),kt(n,e)}}function py(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r);let s=this.type===a.SAMPLER_2D_SHADOW?rm:im;n.setTexture2D(e||s,r)}function my(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||am,r)}function gy(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||om,r)}function _y(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||sm,r)}function by(a){switch(a){case 5126:return $v;case 35664:return ey;case 35665:return ty;case 35666:return ny;case 35674:return iy;case 35675:return ry;case 35676:return sy;case 5124:case 35670:return ay;case 35667:case 35671:return oy;case 35668:case 35672:return cy;case 35669:case 35673:return ly;case 5125:return uy;case 36294:return hy;case 36295:return fy;case 36296:return dy;case 35678:case 36198:case 36298:case 36306:case 35682:return py;case 35679:case 36299:case 36307:return my;case 35680:case 36300:case 36308:case 36293:return gy;case 36289:case 36303:case 36311:case 36292:return _y}}function xy(a,e){a.uniform1fv(this.addr,e)}function vy(a,e){let n=Js(e,this.size,2);a.uniform2fv(this.addr,n)}function yy(a,e){let n=Js(e,this.size,3);a.uniform3fv(this.addr,n)}function My(a,e){let n=Js(e,this.size,4);a.uniform4fv(this.addr,n)}function Sy(a,e){let n=Js(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,n)}function Ty(a,e){let n=Js(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,n)}function wy(a,e){let n=Js(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,n)}function Ay(a,e){a.uniform1iv(this.addr,e)}function Ey(a,e){a.uniform2iv(this.addr,e)}function Ry(a,e){a.uniform3iv(this.addr,e)}function Cy(a,e){a.uniform4iv(this.addr,e)}function Py(a,e){a.uniform1uiv(this.addr,e)}function Ly(a,e){a.uniform2uiv(this.addr,e)}function Iy(a,e){a.uniform3uiv(this.addr,e)}function Dy(a,e){a.uniform4uiv(this.addr,e)}function Oy(a,e,n){let i=this.cache,r=e.length,s=Ic(n,r);Ft(i,s)||(a.uniform1iv(this.addr,s),kt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||im,s[o])}function Ny(a,e,n){let i=this.cache,r=e.length,s=Ic(n,r);Ft(i,s)||(a.uniform1iv(this.addr,s),kt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||am,s[o])}function Uy(a,e,n){let i=this.cache,r=e.length,s=Ic(n,r);Ft(i,s)||(a.uniform1iv(this.addr,s),kt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||om,s[o])}function Fy(a,e,n){let i=this.cache,r=e.length,s=Ic(n,r);Ft(i,s)||(a.uniform1iv(this.addr,s),kt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||sm,s[o])}function ky(a){switch(a){case 5126:return xy;case 35664:return vy;case 35665:return yy;case 35666:return My;case 35674:return Sy;case 35675:return Ty;case 35676:return wy;case 5124:case 35670:return Ay;case 35667:case 35671:return Ey;case 35668:case 35672:return Ry;case 35669:case 35673:return Cy;case 5125:return Py;case 36294:return Ly;case 36295:return Iy;case 36296:return Dy;case 35678:case 36198:case 36298:case 36306:case 35682:return Oy;case 35679:case 36299:case 36307:return Ny;case 35680:case 36300:case 36308:case 36293:return Uy;case 36289:case 36303:case 36311:case 36292:return Fy}}var bu=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=by(n.type)}},xu=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ky(n.type)}},vu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let c=r[s];c.setValue(e,n[c.id],i)}}},nu=/(\w+)(\])?(\[|\.)?/g;function op(a,e){a.seq.push(e),a.map[e.id]=e}function By(a,e,n){let i=a.name,r=i.length;for(nu.lastIndex=0;;){let s=nu.exec(i),o=nu.lastIndex,c=s[1],u=s[2]==="]",f=s[3];if(u&&(c=c|0),f===void 0||f==="["&&o+2===r){op(n,f===void 0?new bu(c,a,e):new xu(c,a,e));break}else{let h=n.map[c];h===void 0&&(h=new vu(c),op(n,h)),n=h}}}var Os=class{constructor(e,n){this.seq=[],this.map={};let i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);By(s,o,this)}}setValue(e,n,i,r){let s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){let r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){let c=n[s],u=i[c.id];u.needsUpdate!==!1&&c.setValue(e,u.value,r)}}static seqWithValue(e,n){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in n&&i.push(o)}return i}};function cp(a,e,n){let i=a.createShader(e);return a.shaderSource(i,n),a.compileShader(i),i}var zy=37297,Gy=0;function Hy(a,e){let n=a.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){let c=o+1;i.push(`${c===e?">":" "} ${c}: ${n[o]}`)}return i.join(`
`)}function Vy(a){let e=Ze.getPrimaries(Ze.workingColorSpace),n=Ze.getPrimaries(a),i;switch(e===n?i="":e===Qo&&n===Zo?i="LinearDisplayP3ToLinearSRGB":e===Zo&&n===Qo&&(i="LinearSRGBToLinearDisplayP3"),a){case Pt:case Lc:return[i,"LinearTransferOETF"];case nt:case eh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",a),[i,"LinearTransferOETF"]}}function lp(a,e,n){let i=a.getShaderParameter(e,a.COMPILE_STATUS),r=a.getShaderInfoLog(e).trim();if(i&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+Hy(a.getShaderSource(e),o)}else return r}function Wy(a,e){let n=Vy(e);return`vec4 ${a}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Xy(a,e){let n;switch(e){case qu:n="Linear";break;case Yu:n="Reinhard";break;case ju:n="OptimizedCineon";break;case Va:n="ACESFilmic";break;case Ku:n="AgX";break;case J_:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+a+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function qy(a){return[a.extensionDerivatives||a.envMapCubeUVHeight||a.bumpMap||a.normalMapTangentSpace||a.clearcoatNormalMap||a.flatShading||a.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(a.extensionFragDepth||a.logarithmicDepthBuffer)&&a.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",a.extensionDrawBuffers&&a.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(a.extensionShaderTextureLOD||a.envMap||a.transmission)&&a.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ls).join(`
`)}function Yy(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ls).join(`
`)}function jy(a){let e=[];for(let n in a){let i=a[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Ky(a,e){let n={},i=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=a.getActiveAttrib(e,r),o=s.name,c=1;s.type===a.FLOAT_MAT2&&(c=2),s.type===a.FLOAT_MAT3&&(c=3),s.type===a.FLOAT_MAT4&&(c=4),n[o]={type:s.type,location:a.getAttribLocation(e,o),locationSize:c}}return n}function Ls(a){return a!==""}function up(a,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hp(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Jy=/^[ \t]*#include +<([\w\d./]+)>/gm;function yu(a){return a.replace(Jy,Qy)}var Zy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Qy(a,e){let n=ke[e];if(n===void 0){let i=Zy.get(e);if(i!==void 0)n=ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return yu(n)}var $y=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fp(a){return a.replace($y,eM)}function eM(a,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function dp(a){let e="precision "+a.precision+` float;
precision `+a.precision+" int;";return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function tM(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===kp?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===Xu?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function nM(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Ns:case Us:e="ENVMAP_TYPE_CUBE";break;case Cc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function iM(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case Us:e="ENVMAP_MODE_REFRACTION";break}return e}function rM(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case Bp:e="ENVMAP_BLENDING_MULTIPLY";break;case j_:e="ENVMAP_BLENDING_MIX";break;case K_:e="ENVMAP_BLENDING_ADD";break}return e}function sM(a){let e=a.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function aM(a,e,n,i){let r=a.getContext(),s=n.defines,o=n.vertexShader,c=n.fragmentShader,u=tM(n),f=nM(n),l=iM(n),h=rM(n),d=sM(n),p=n.isWebGL2?"":qy(n),_=Yy(n),b=jy(s),m=r.createProgram(),g,v,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(Ls).join(`
`),g.length>0&&(g+=`
`),v=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(Ls).join(`
`),v.length>0&&(v+=`
`)):(g=[dp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+u:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),v=[p,dp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+u:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==nr?"#define TONE_MAPPING":"",n.toneMapping!==nr?ke.tonemapping_pars_fragment:"",n.toneMapping!==nr?Xy("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Wy("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ls).join(`
`)),o=yu(o),o=up(o,n),o=hp(o,n),c=yu(c),c=up(c,n),c=hp(c,n),o=fp(o),c=fp(c),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Id?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let M=x+g+o,w=x+v+c,T=cp(r,r.VERTEX_SHADER,M),A=cp(r,r.FRAGMENT_SHADER,w);r.attachShader(m,T),r.attachShader(m,A),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function C(F){if(a.debug.checkShaderErrors){let V=r.getProgramInfoLog(m).trim(),I=r.getShaderInfoLog(T).trim(),U=r.getShaderInfoLog(A).trim(),k=!0,Y=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(k=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(r,m,T,A);else{let K=lp(r,T,"vertex"),j=lp(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+V+`
`+K+`
`+j)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(I===""||U==="")&&(Y=!1);Y&&(F.diagnostics={runnable:k,programLog:V,vertexShader:{log:I,prefix:g},fragmentShader:{log:U,prefix:v}})}r.deleteShader(T),r.deleteShader(A),y=new Os(r,m),S=Ky(r,m)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let N=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(m,zy)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Gy++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}var oM=0,Mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let n=this.materialCache.get(e);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let n=this.materialCache,i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){let n=this.shaderCache,i=n.get(e);return i===void 0&&(i=new Su(e),n.set(e,i)),i}},Su=class{constructor(e){this.id=oM++,this.code=e,this.usedTimes=0}};function cM(a,e,n,i,r,s,o){let c=new Na,u=new Mu,f=[],l=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures,p=r.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(y){return y===0?"uv":`uv${y}`}function m(y,S,N,F,V){let I=F.fog,U=V.geometry,k=y.isMeshStandardMaterial?F.environment:null,Y=(y.isMeshStandardMaterial?n:e).get(y.envMap||k),K=Y&&Y.mapping===Cc?Y.image.height:null,j=_[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Q=J!==void 0?J.length:0,re=0;U.morphAttributes.position!==void 0&&(re=1),U.morphAttributes.normal!==void 0&&(re=2),U.morphAttributes.color!==void 0&&(re=3);let X,Z,ce,ve;if(j){let cn=ci[j];X=cn.vertexShader,Z=cn.fragmentShader}else X=y.vertexShader,Z=y.fragmentShader,u.update(y),ce=u.getVertexShaderID(y),ve=u.getFragmentShaderID(y);let xe=a.getRenderTarget(),Oe=V.isInstancedMesh===!0,Ue=V.isBatchedMesh===!0,Ee=!!y.map,Je=!!y.matcap,z=!!Y,on=!!y.aoMap,Me=!!y.lightMap,Ie=!!y.bumpMap,ge=!!y.normalMap,mt=!!y.displacementMap,Be=!!y.emissiveMap,P=!!y.metalnessMap,E=!!y.roughnessMap,H=y.anisotropy>0,ne=y.clearcoat>0,te=y.iridescence>0,ie=y.sheen>0,_e=y.transmission>0,he=H&&!!y.anisotropyMap,de=ne&&!!y.clearcoatMap,Ae=ne&&!!y.clearcoatNormalMap,ze=ne&&!!y.clearcoatRoughnessMap,ee=te&&!!y.iridescenceMap,et=te&&!!y.iridescenceThicknessMap,qe=ie&&!!y.sheenColorMap,Pe=ie&&!!y.sheenRoughnessMap,ye=!!y.specularMap,pe=!!y.specularColorMap,Fe=!!y.specularIntensityMap,$e=_e&&!!y.transmissionMap,Mt=_e&&!!y.thicknessMap,He=!!y.gradientMap,ae=!!y.alphaMap,O=y.alphaTest>0,le=!!y.alphaHash,ue=!!y.extensions,Re=!!U.attributes.uv1,Se=!!U.attributes.uv2,lt=!!U.attributes.uv3,ut=nr;return y.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(ut=a.toneMapping),{isWebGL2:l,shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:X,fragmentShader:Z,defines:y.defines,customVertexShaderID:ce,customFragmentShaderID:ve,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ue,instancing:Oe,instancingColor:Oe&&V.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:xe===null?a.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Pt,map:Ee,matcap:Je,envMap:z,envMapMode:z&&Y.mapping,envMapCubeUVHeight:K,aoMap:on,lightMap:Me,bumpMap:Ie,normalMap:ge,displacementMap:d&&mt,emissiveMap:Be,normalMapObjectSpace:ge&&y.normalMapType===h0,normalMapTangentSpace:ge&&y.normalMapType===Jp,metalnessMap:P,roughnessMap:E,anisotropy:H,anisotropyMap:he,clearcoat:ne,clearcoatMap:de,clearcoatNormalMap:Ae,clearcoatRoughnessMap:ze,iridescence:te,iridescenceMap:ee,iridescenceThicknessMap:et,sheen:ie,sheenColorMap:qe,sheenRoughnessMap:Pe,specularMap:ye,specularColorMap:pe,specularIntensityMap:Fe,transmission:_e,transmissionMap:$e,thicknessMap:Mt,gradientMap:He,opaque:y.transparent===!1&&y.blending===Is,alphaMap:ae,alphaTest:O,alphaHash:le,combine:y.combine,mapUv:Ee&&b(y.map.channel),aoMapUv:on&&b(y.aoMap.channel),lightMapUv:Me&&b(y.lightMap.channel),bumpMapUv:Ie&&b(y.bumpMap.channel),normalMapUv:ge&&b(y.normalMap.channel),displacementMapUv:mt&&b(y.displacementMap.channel),emissiveMapUv:Be&&b(y.emissiveMap.channel),metalnessMapUv:P&&b(y.metalnessMap.channel),roughnessMapUv:E&&b(y.roughnessMap.channel),anisotropyMapUv:he&&b(y.anisotropyMap.channel),clearcoatMapUv:de&&b(y.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&b(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&b(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&b(y.iridescenceMap.channel),iridescenceThicknessMapUv:et&&b(y.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&b(y.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&b(y.sheenRoughnessMap.channel),specularMapUv:ye&&b(y.specularMap.channel),specularColorMapUv:pe&&b(y.specularColorMap.channel),specularIntensityMapUv:Fe&&b(y.specularIntensityMap.channel),transmissionMapUv:$e&&b(y.transmissionMap.channel),thicknessMapUv:Mt&&b(y.thicknessMap.channel),alphaMapUv:ae&&b(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ge||H),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Re,vertexUv2s:Se,vertexUv3s:lt,pointsUvs:V.isPoints===!0&&!!U.attributes.uv&&(Ee||ae),fog:!!I,useFog:y.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:V.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:re,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:a.shadowMap.enabled&&N.length>0,shadowMapType:a.shadowMap.type,toneMapping:ut,useLegacyLights:a._useLegacyLights,decodeVideoTexture:Ee&&y.map.isVideoTexture===!0&&Ze.getTransfer(y.map.colorSpace)===rt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===xn,flipSided:y.side===tn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ue&&y.extensions.derivatives===!0,extensionFragDepth:ue&&y.extensions.fragDepth===!0,extensionDrawBuffers:ue&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ue&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ue&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:l||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function g(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let N in y.defines)S.push(N),S.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(v(S,y),x(S,y),S.push(a.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function v(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function x(y,S){c.disableAll(),S.isWebGL2&&c.enable(0),S.supportsVertexTextures&&c.enable(1),S.instancing&&c.enable(2),S.instancingColor&&c.enable(3),S.matcap&&c.enable(4),S.envMap&&c.enable(5),S.normalMapObjectSpace&&c.enable(6),S.normalMapTangentSpace&&c.enable(7),S.clearcoat&&c.enable(8),S.iridescence&&c.enable(9),S.alphaTest&&c.enable(10),S.vertexColors&&c.enable(11),S.vertexAlphas&&c.enable(12),S.vertexUv1s&&c.enable(13),S.vertexUv2s&&c.enable(14),S.vertexUv3s&&c.enable(15),S.vertexTangents&&c.enable(16),S.anisotropy&&c.enable(17),S.alphaHash&&c.enable(18),S.batching&&c.enable(19),y.push(c.mask),c.disableAll(),S.fog&&c.enable(0),S.useFog&&c.enable(1),S.flatShading&&c.enable(2),S.logarithmicDepthBuffer&&c.enable(3),S.skinning&&c.enable(4),S.morphTargets&&c.enable(5),S.morphNormals&&c.enable(6),S.morphColors&&c.enable(7),S.premultipliedAlpha&&c.enable(8),S.shadowMapEnabled&&c.enable(9),S.useLegacyLights&&c.enable(10),S.doubleSided&&c.enable(11),S.flipSided&&c.enable(12),S.useDepthPacking&&c.enable(13),S.dithering&&c.enable(14),S.transmission&&c.enable(15),S.sheen&&c.enable(16),S.opaque&&c.enable(17),S.pointsUvs&&c.enable(18),S.decodeVideoTexture&&c.enable(19),y.push(c.mask)}function M(y){let S=_[y.type],N;if(S){let F=ci[S];N=ur.clone(F.uniforms)}else N=y.uniforms;return N}function w(y,S){let N;for(let F=0,V=f.length;F<V;F++){let I=f[F];if(I.cacheKey===S){N=I,++N.usedTimes;break}}return N===void 0&&(N=new aM(a,S,y,s),f.push(N)),N}function T(y){if(--y.usedTimes===0){let S=f.indexOf(y);f[S]=f[f.length-1],f.pop(),y.destroy()}}function A(y){u.remove(y)}function C(){u.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:M,acquireProgram:w,releaseProgram:T,releaseShaderCache:A,programs:f,dispose:C}}function lM(){let a=new WeakMap;function e(s){let o=a.get(s);return o===void 0&&(o={},a.set(s,o)),o}function n(s){a.delete(s)}function i(s,o,c){a.get(s)[o]=c}function r(){a=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function uM(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function pp(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function mp(){let a=[],e=0,n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(h,d,p,_,b,m){let g=a[e];return g===void 0?(g={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:b,group:m},a[e]=g):(g.id=h.id,g.object=h,g.geometry=d,g.material=p,g.groupOrder=_,g.renderOrder=h.renderOrder,g.z=b,g.group=m),e++,g}function c(h,d,p,_,b,m){let g=o(h,d,p,_,b,m);p.transmission>0?i.push(g):p.transparent===!0?r.push(g):n.push(g)}function u(h,d,p,_,b,m){let g=o(h,d,p,_,b,m);p.transmission>0?i.unshift(g):p.transparent===!0?r.unshift(g):n.unshift(g)}function f(h,d){n.length>1&&n.sort(h||uM),i.length>1&&i.sort(d||pp),r.length>1&&r.sort(d||pp)}function l(){for(let h=e,d=a.length;h<d;h++){let p=a[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:c,unshift:u,finish:l,sort:f}}function hM(){let a=new WeakMap;function e(i,r){let s=a.get(i),o;return s===void 0?(o=new mp,a.set(i,[o])):r>=s.length?(o=new mp,s.push(o)):o=s[r],o}function n(){a=new WeakMap}return{get:e,dispose:n}}function fM(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new D,color:new se};break;case"SpotLight":n={position:new D,direction:new D,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new D,color:new se,distance:0,decay:0};break;case"HemisphereLight":n={direction:new D,skyColor:new se,groundColor:new se};break;case"RectAreaLight":n={color:new se,position:new D,halfWidth:new D,halfHeight:new D};break}return a[e.id]=n,n}}}function dM(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=n,n}}}var pM=0;function mM(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function gM(a,e){let n=new fM,i=dM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new D);let s=new D,o=new we,c=new we;function u(l,h){let d=0,p=0,_=0;for(let F=0;F<9;F++)r.probe[F].set(0,0,0);let b=0,m=0,g=0,v=0,x=0,M=0,w=0,T=0,A=0,C=0,y=0;l.sort(mM);let S=h===!0?Math.PI:1;for(let F=0,V=l.length;F<V;F++){let I=l[F],U=I.color,k=I.intensity,Y=I.distance,K=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=U.r*k*S,p+=U.g*k*S,_+=U.b*k*S;else if(I.isLightProbe){for(let j=0;j<9;j++)r.probe[j].addScaledVector(I.sh.coefficients[j],k);y++}else if(I.isDirectionalLight){let j=n.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity*S),I.castShadow){let J=I.shadow,Q=i.get(I);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,r.directionalShadow[b]=Q,r.directionalShadowMap[b]=K,r.directionalShadowMatrix[b]=I.shadow.matrix,M++}r.directional[b]=j,b++}else if(I.isSpotLight){let j=n.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(U).multiplyScalar(k*S),j.distance=Y,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,r.spot[g]=j;let J=I.shadow;if(I.map&&(r.spotLightMap[A]=I.map,A++,J.updateMatrices(I),I.castShadow&&C++),r.spotLightMatrix[g]=J.matrix,I.castShadow){let Q=i.get(I);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,r.spotShadow[g]=Q,r.spotShadowMap[g]=K,T++}g++}else if(I.isRectAreaLight){let j=n.get(I);j.color.copy(U).multiplyScalar(k),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),r.rectArea[v]=j,v++}else if(I.isPointLight){let j=n.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity*S),j.distance=I.distance,j.decay=I.decay,I.castShadow){let J=I.shadow,Q=i.get(I);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,Q.shadowCameraNear=J.camera.near,Q.shadowCameraFar=J.camera.far,r.pointShadow[m]=Q,r.pointShadowMap[m]=K,r.pointShadowMatrix[m]=I.shadow.matrix,w++}r.point[m]=j,m++}else if(I.isHemisphereLight){let j=n.get(I);j.skyColor.copy(I.color).multiplyScalar(k*S),j.groundColor.copy(I.groundColor).multiplyScalar(k*S),r.hemi[x]=j,x++}}v>0&&(e.isWebGL2?a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):a.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=_;let N=r.hash;(N.directionalLength!==b||N.pointLength!==m||N.spotLength!==g||N.rectAreaLength!==v||N.hemiLength!==x||N.numDirectionalShadows!==M||N.numPointShadows!==w||N.numSpotShadows!==T||N.numSpotMaps!==A||N.numLightProbes!==y)&&(r.directional.length=b,r.spot.length=g,r.rectArea.length=v,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=T+A-C,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=C,r.numLightProbes=y,N.directionalLength=b,N.pointLength=m,N.spotLength=g,N.rectAreaLength=v,N.hemiLength=x,N.numDirectionalShadows=M,N.numPointShadows=w,N.numSpotShadows=T,N.numSpotMaps=A,N.numLightProbes=y,r.version=pM++)}function f(l,h){let d=0,p=0,_=0,b=0,m=0,g=h.matrixWorldInverse;for(let v=0,x=l.length;v<x;v++){let M=l[v];if(M.isDirectionalLight){let w=r.directional[d];w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),d++}else if(M.isSpotLight){let w=r.spot[_];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),_++}else if(M.isRectAreaLight){let w=r.rectArea[b];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),c.identity(),o.copy(M.matrixWorld),o.premultiply(g),c.extractRotation(o),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(c),w.halfHeight.applyMatrix4(c),b++}else if(M.isPointLight){let w=r.point[p];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),p++}else if(M.isHemisphereLight){let w=r.hemi[m];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:u,setupView:f,state:r}}function gp(a,e){let n=new gM(a,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function c(h){r.push(h)}function u(h){n.setup(i,h)}function f(h){n.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:u,setupLightsView:f,pushLight:o,pushShadow:c}}function _M(a,e){let n=new WeakMap;function i(s,o=0){let c=n.get(s),u;return c===void 0?(u=new gp(a,e),n.set(s,[u])):o>=c.length?(u=new gp(a,e),c.push(u)):u=c[o],u}function r(){n=new WeakMap}return{get:i,dispose:r}}var Tu=class extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=l0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},wu=class extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},bM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vM(a,e,n){let i=new Ua,r=new me,s=new me,o=new at,c=new Tu({depthPacking:u0}),u=new wu,f={},l=n.maxTextureSize,h={[hi]:tn,[tn]:hi,[xn]:xn},d=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:bM,fragmentShader:xM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let _=new Ot;_.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Le(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kp;let g=this.type;this.render=function(T,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let y=a.getRenderTarget(),S=a.getActiveCubeFace(),N=a.getActiveMipmapLevel(),F=a.state;F.setBlending(ui),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=g!==Li&&this.type===Li,I=g===Li&&this.type!==Li;for(let U=0,k=T.length;U<k;U++){let Y=T[U],K=Y.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);let j=K.getFrameExtents();if(r.multiply(j),s.copy(K.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(s.x=Math.floor(l/j.x),r.x=s.x*j.x,K.mapSize.x=s.x),r.y>l&&(s.y=Math.floor(l/j.y),r.y=s.y*j.y,K.mapSize.y=s.y)),K.map===null||V===!0||I===!0){let Q=this.type!==Li?{minFilter:Nt,magFilter:Nt}:{};K.map!==null&&K.map.dispose(),K.map=new jt(r.x,r.y,Q),K.map.texture.name=Y.name+".shadowMap",K.camera.updateProjectionMatrix()}a.setRenderTarget(K.map),a.clear();let J=K.getViewportCount();for(let Q=0;Q<J;Q++){let re=K.getViewport(Q);o.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),F.viewport(o),K.updateMatrices(Y,Q),i=K.getFrustum(),M(A,C,K.camera,Y,this.type)}K.isPointLightShadow!==!0&&this.type===Li&&v(K,C),K.needsUpdate=!1}g=this.type,m.needsUpdate=!1,a.setRenderTarget(y,S,N)};function v(T,A){let C=e.update(b);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new jt(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,a.setRenderTarget(T.mapPass),a.clear(),a.renderBufferDirect(A,null,C,d,b,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,a.setRenderTarget(T.map),a.clear(),a.renderBufferDirect(A,null,C,p,b,null)}function x(T,A,C,y){let S=null,N=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)S=N;else if(S=C.isPointLight===!0?u:c,a.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let F=S.uuid,V=A.uuid,I=f[F];I===void 0&&(I={},f[F]=I);let U=I[V];U===void 0&&(U=S.clone(),I[V]=U,A.addEventListener("dispose",w)),S=U}if(S.visible=A.visible,S.wireframe=A.wireframe,y===Li?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:h[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let F=a.properties.get(S);F.light=C}return S}function M(T,A,C,y,S){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===Li)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);let V=e.update(T),I=T.material;if(Array.isArray(I)){let U=V.groups;for(let k=0,Y=U.length;k<Y;k++){let K=U[k],j=I[K.materialIndex];if(j&&j.visible){let J=x(T,j,y,S);T.onBeforeShadow(a,T,A,C,V,J,K),a.renderBufferDirect(C,null,V,J,T,K),T.onAfterShadow(a,T,A,C,V,J,K)}}}else if(I.visible){let U=x(T,I,y,S);T.onBeforeShadow(a,T,A,C,V,U,null),a.renderBufferDirect(C,null,V,U,T,null),T.onAfterShadow(a,T,A,C,V,U,null)}}let F=T.children;for(let V=0,I=F.length;V<I;V++)M(F[V],A,C,y,S)}function w(T){T.target.removeEventListener("dispose",w);for(let C in f){let y=f[C],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}function yM(a,e,n){let i=n.isWebGL2;function r(){let O=!1,le=new at,ue=null,Re=new at(0,0,0,0);return{setMask:function(Se){ue!==Se&&!O&&(a.colorMask(Se,Se,Se,Se),ue=Se)},setLocked:function(Se){O=Se},setClear:function(Se,lt,ut,zt,cn){cn===!0&&(Se*=zt,lt*=zt,ut*=zt),le.set(Se,lt,ut,zt),Re.equals(le)===!1&&(a.clearColor(Se,lt,ut,zt),Re.copy(le))},reset:function(){O=!1,ue=null,Re.set(-1,0,0,0)}}}function s(){let O=!1,le=null,ue=null,Re=null;return{setTest:function(Se){Se?Ue(a.DEPTH_TEST):Ee(a.DEPTH_TEST)},setMask:function(Se){le!==Se&&!O&&(a.depthMask(Se),le=Se)},setFunc:function(Se){if(ue!==Se){switch(Se){case G_:a.depthFunc(a.NEVER);break;case H_:a.depthFunc(a.ALWAYS);break;case V_:a.depthFunc(a.LESS);break;case Yo:a.depthFunc(a.LEQUAL);break;case W_:a.depthFunc(a.EQUAL);break;case X_:a.depthFunc(a.GEQUAL);break;case q_:a.depthFunc(a.GREATER);break;case Y_:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}ue=Se}},setLocked:function(Se){O=Se},setClear:function(Se){Re!==Se&&(a.clearDepth(Se),Re=Se)},reset:function(){O=!1,le=null,ue=null,Re=null}}}function o(){let O=!1,le=null,ue=null,Re=null,Se=null,lt=null,ut=null,zt=null,cn=null;return{setTest:function(ht){O||(ht?Ue(a.STENCIL_TEST):Ee(a.STENCIL_TEST))},setMask:function(ht){le!==ht&&!O&&(a.stencilMask(ht),le=ht)},setFunc:function(ht,ln,oi){(ue!==ht||Re!==ln||Se!==oi)&&(a.stencilFunc(ht,ln,oi),ue=ht,Re=ln,Se=oi)},setOp:function(ht,ln,oi){(lt!==ht||ut!==ln||zt!==oi)&&(a.stencilOp(ht,ln,oi),lt=ht,ut=ln,zt=oi)},setLocked:function(ht){O=ht},setClear:function(ht){cn!==ht&&(a.clearStencil(ht),cn=ht)},reset:function(){O=!1,le=null,ue=null,Re=null,Se=null,lt=null,ut=null,zt=null,cn=null}}}let c=new r,u=new s,f=new o,l=new WeakMap,h=new WeakMap,d={},p={},_=new WeakMap,b=[],m=null,g=!1,v=null,x=null,M=null,w=null,T=null,A=null,C=null,y=new se(0,0,0),S=0,N=!1,F=null,V=null,I=null,U=null,k=null,Y=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,j=0,J=a.getParameter(a.VERSION);J.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(J)[1]),K=j>=1):J.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),K=j>=2);let Q=null,re={},X=a.getParameter(a.SCISSOR_BOX),Z=a.getParameter(a.VIEWPORT),ce=new at().fromArray(X),ve=new at().fromArray(Z);function xe(O,le,ue,Re){let Se=new Uint8Array(4),lt=a.createTexture();a.bindTexture(O,lt),a.texParameteri(O,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(O,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let ut=0;ut<ue;ut++)i&&(O===a.TEXTURE_3D||O===a.TEXTURE_2D_ARRAY)?a.texImage3D(le,0,a.RGBA,1,1,Re,0,a.RGBA,a.UNSIGNED_BYTE,Se):a.texImage2D(le+ut,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Se);return lt}let Oe={};Oe[a.TEXTURE_2D]=xe(a.TEXTURE_2D,a.TEXTURE_2D,1),Oe[a.TEXTURE_CUBE_MAP]=xe(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Oe[a.TEXTURE_2D_ARRAY]=xe(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),Oe[a.TEXTURE_3D]=xe(a.TEXTURE_3D,a.TEXTURE_3D,1,1)),c.setClear(0,0,0,1),u.setClear(1),f.setClear(0),Ue(a.DEPTH_TEST),u.setFunc(Yo),Be(!1),P(ed),Ue(a.CULL_FACE),ge(ui);function Ue(O){d[O]!==!0&&(a.enable(O),d[O]=!0)}function Ee(O){d[O]!==!1&&(a.disable(O),d[O]=!1)}function Je(O,le){return p[O]!==le?(a.bindFramebuffer(O,le),p[O]=le,i&&(O===a.DRAW_FRAMEBUFFER&&(p[a.FRAMEBUFFER]=le),O===a.FRAMEBUFFER&&(p[a.DRAW_FRAMEBUFFER]=le)),!0):!1}function z(O,le){let ue=b,Re=!1;if(O)if(ue=_.get(le),ue===void 0&&(ue=[],_.set(le,ue)),O.isWebGLMultipleRenderTargets){let Se=O.texture;if(ue.length!==Se.length||ue[0]!==a.COLOR_ATTACHMENT0){for(let lt=0,ut=Se.length;lt<ut;lt++)ue[lt]=a.COLOR_ATTACHMENT0+lt;ue.length=Se.length,Re=!0}}else ue[0]!==a.COLOR_ATTACHMENT0&&(ue[0]=a.COLOR_ATTACHMENT0,Re=!0);else ue[0]!==a.BACK&&(ue[0]=a.BACK,Re=!0);Re&&(n.isWebGL2?a.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function on(O){return m!==O?(a.useProgram(O),m=O,!0):!1}let Me={[Or]:a.FUNC_ADD,[A_]:a.FUNC_SUBTRACT,[E_]:a.FUNC_REVERSE_SUBTRACT};if(i)Me[id]=a.MIN,Me[rd]=a.MAX;else{let O=e.get("EXT_blend_minmax");O!==null&&(Me[id]=O.MIN_EXT,Me[rd]=O.MAX_EXT)}let Ie={[R_]:a.ZERO,[C_]:a.ONE,[P_]:a.SRC_COLOR,[cu]:a.SRC_ALPHA,[U_]:a.SRC_ALPHA_SATURATE,[O_]:a.DST_COLOR,[I_]:a.DST_ALPHA,[L_]:a.ONE_MINUS_SRC_COLOR,[lu]:a.ONE_MINUS_SRC_ALPHA,[N_]:a.ONE_MINUS_DST_COLOR,[D_]:a.ONE_MINUS_DST_ALPHA,[F_]:a.CONSTANT_COLOR,[k_]:a.ONE_MINUS_CONSTANT_COLOR,[B_]:a.CONSTANT_ALPHA,[z_]:a.ONE_MINUS_CONSTANT_ALPHA};function ge(O,le,ue,Re,Se,lt,ut,zt,cn,ht){if(O===ui){g===!0&&(Ee(a.BLEND),g=!1);return}if(g===!1&&(Ue(a.BLEND),g=!0),O!==w_){if(O!==v||ht!==N){if((x!==Or||T!==Or)&&(a.blendEquation(a.FUNC_ADD),x=Or,T=Or),ht)switch(O){case Is:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Br:a.blendFunc(a.ONE,a.ONE);break;case td:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case nd:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Is:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Br:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case td:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case nd:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,w=null,A=null,C=null,y.set(0,0,0),S=0,v=O,N=ht}return}Se=Se||le,lt=lt||ue,ut=ut||Re,(le!==x||Se!==T)&&(a.blendEquationSeparate(Me[le],Me[Se]),x=le,T=Se),(ue!==M||Re!==w||lt!==A||ut!==C)&&(a.blendFuncSeparate(Ie[ue],Ie[Re],Ie[lt],Ie[ut]),M=ue,w=Re,A=lt,C=ut),(zt.equals(y)===!1||cn!==S)&&(a.blendColor(zt.r,zt.g,zt.b,cn),y.copy(zt),S=cn),v=O,N=!1}function mt(O,le){O.side===xn?Ee(a.CULL_FACE):Ue(a.CULL_FACE);let ue=O.side===tn;le&&(ue=!ue),Be(ue),O.blending===Is&&O.transparent===!1?ge(ui):ge(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),u.setFunc(O.depthFunc),u.setTest(O.depthTest),u.setMask(O.depthWrite),c.setMask(O.colorWrite);let Re=O.stencilWrite;f.setTest(Re),Re&&(f.setMask(O.stencilWriteMask),f.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),f.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),H(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Ue(a.SAMPLE_ALPHA_TO_COVERAGE):Ee(a.SAMPLE_ALPHA_TO_COVERAGE)}function Be(O){F!==O&&(O?a.frontFace(a.CW):a.frontFace(a.CCW),F=O)}function P(O){O!==S_?(Ue(a.CULL_FACE),O!==V&&(O===ed?a.cullFace(a.BACK):O===T_?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Ee(a.CULL_FACE),V=O}function E(O){O!==I&&(K&&a.lineWidth(O),I=O)}function H(O,le,ue){O?(Ue(a.POLYGON_OFFSET_FILL),(U!==le||k!==ue)&&(a.polygonOffset(le,ue),U=le,k=ue)):Ee(a.POLYGON_OFFSET_FILL)}function ne(O){O?Ue(a.SCISSOR_TEST):Ee(a.SCISSOR_TEST)}function te(O){O===void 0&&(O=a.TEXTURE0+Y-1),Q!==O&&(a.activeTexture(O),Q=O)}function ie(O,le,ue){ue===void 0&&(Q===null?ue=a.TEXTURE0+Y-1:ue=Q);let Re=re[ue];Re===void 0&&(Re={type:void 0,texture:void 0},re[ue]=Re),(Re.type!==O||Re.texture!==le)&&(Q!==ue&&(a.activeTexture(ue),Q=ue),a.bindTexture(O,le||Oe[O]),Re.type=O,Re.texture=le)}function _e(){let O=re[Q];O!==void 0&&O.type!==void 0&&(a.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function he(){try{a.compressedTexImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{a.compressedTexImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ae(){try{a.texSubImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ze(){try{a.texSubImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function qe(){try{a.texStorage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pe(){try{a.texStorage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{a.texImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pe(){try{a.texImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(O){ce.equals(O)===!1&&(a.scissor(O.x,O.y,O.z,O.w),ce.copy(O))}function $e(O){ve.equals(O)===!1&&(a.viewport(O.x,O.y,O.z,O.w),ve.copy(O))}function Mt(O,le){let ue=h.get(le);ue===void 0&&(ue=new WeakMap,h.set(le,ue));let Re=ue.get(O);Re===void 0&&(Re=a.getUniformBlockIndex(le,O.name),ue.set(O,Re))}function He(O,le){let Re=h.get(le).get(O);l.get(le)!==Re&&(a.uniformBlockBinding(le,Re,O.__bindingPointIndex),l.set(le,Re))}function ae(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),i===!0&&(a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null)),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),d={},Q=null,re={},p={},_=new WeakMap,b=[],m=null,g=!1,v=null,x=null,M=null,w=null,T=null,A=null,C=null,y=new se(0,0,0),S=0,N=!1,F=null,V=null,I=null,U=null,k=null,ce.set(0,0,a.canvas.width,a.canvas.height),ve.set(0,0,a.canvas.width,a.canvas.height),c.reset(),u.reset(),f.reset()}return{buffers:{color:c,depth:u,stencil:f},enable:Ue,disable:Ee,bindFramebuffer:Je,drawBuffers:z,useProgram:on,setBlending:ge,setMaterial:mt,setFlipSided:Be,setCullFace:P,setLineWidth:E,setPolygonOffset:H,setScissorTest:ne,activeTexture:te,bindTexture:ie,unbindTexture:_e,compressedTexImage2D:he,compressedTexImage3D:de,texImage2D:ye,texImage3D:pe,updateUBOMapping:Mt,uniformBlockBinding:He,texStorage2D:qe,texStorage3D:Pe,texSubImage2D:Ae,texSubImage3D:ze,compressedTexSubImage2D:ee,compressedTexSubImage3D:et,scissor:Fe,viewport:$e,reset:ae}}function MM(a,e,n,i,r,s,o){let c=r.isWebGL2,u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new WeakMap,h,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,E){return p?new OffscreenCanvas(P,E):Oa("canvas")}function b(P,E,H,ne){let te=1;if((P.width>ne||P.height>ne)&&(te=ne/Math.max(P.width,P.height)),te<1||E===!0)if(typeof HTMLImageElement!="undefined"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&P instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&P instanceof ImageBitmap){let ie=E?ec:Math.floor,_e=ie(te*P.width),he=ie(te*P.height);h===void 0&&(h=_(_e,he));let de=H?_(_e,he):h;return de.width=_e,de.height=he,de.getContext("2d").drawImage(P,0,0,_e,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+_e+"x"+he+")."),de}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function m(P){return du(P.width)&&du(P.height)}function g(P){return c?!1:P.wrapS!==fn||P.wrapT!==fn||P.minFilter!==Nt&&P.minFilter!==Rt}function v(P,E){return P.generateMipmaps&&E&&P.minFilter!==Nt&&P.minFilter!==Rt}function x(P){a.generateMipmap(P)}function M(P,E,H,ne,te=!1){if(c===!1)return E;if(P!==null){if(a[P]!==void 0)return a[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ie=E;if(E===a.RED&&(H===a.FLOAT&&(ie=a.R32F),H===a.HALF_FLOAT&&(ie=a.R16F),H===a.UNSIGNED_BYTE&&(ie=a.R8)),E===a.RED_INTEGER&&(H===a.UNSIGNED_BYTE&&(ie=a.R8UI),H===a.UNSIGNED_SHORT&&(ie=a.R16UI),H===a.UNSIGNED_INT&&(ie=a.R32UI),H===a.BYTE&&(ie=a.R8I),H===a.SHORT&&(ie=a.R16I),H===a.INT&&(ie=a.R32I)),E===a.RG&&(H===a.FLOAT&&(ie=a.RG32F),H===a.HALF_FLOAT&&(ie=a.RG16F),H===a.UNSIGNED_BYTE&&(ie=a.RG8)),E===a.RGBA){let _e=te?Jo:Ze.getTransfer(ne);H===a.FLOAT&&(ie=a.RGBA32F),H===a.HALF_FLOAT&&(ie=a.RGBA16F),H===a.UNSIGNED_BYTE&&(ie=_e===rt?a.SRGB8_ALPHA8:a.RGBA8),H===a.UNSIGNED_SHORT_4_4_4_4&&(ie=a.RGBA4),H===a.UNSIGNED_SHORT_5_5_5_1&&(ie=a.RGB5_A1)}return(ie===a.R16F||ie===a.R32F||ie===a.RG16F||ie===a.RG32F||ie===a.RGBA16F||ie===a.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function w(P,E,H){return v(P,H)===!0||P.isFramebufferTexture&&P.minFilter!==Nt&&P.minFilter!==Rt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function T(P){return P===Nt||P===jo||P===Ea?a.NEAREST:a.LINEAR}function A(P){let E=P.target;E.removeEventListener("dispose",A),y(E),E.isVideoTexture&&l.delete(E)}function C(P){let E=P.target;E.removeEventListener("dispose",C),N(E)}function y(P){let E=i.get(P);if(E.__webglInit===void 0)return;let H=P.source,ne=d.get(H);if(ne){let te=ne[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(P),Object.keys(ne).length===0&&d.delete(H)}i.remove(P)}function S(P){let E=i.get(P);a.deleteTexture(E.__webglTexture);let H=P.source,ne=d.get(H);delete ne[E.__cacheKey],o.memory.textures--}function N(P){let E=P.texture,H=i.get(P),ne=i.get(E);if(ne.__webglTexture!==void 0&&(a.deleteTexture(ne.__webglTexture),o.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(H.__webglFramebuffer[te]))for(let ie=0;ie<H.__webglFramebuffer[te].length;ie++)a.deleteFramebuffer(H.__webglFramebuffer[te][ie]);else a.deleteFramebuffer(H.__webglFramebuffer[te]);H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer[te])}else{if(Array.isArray(H.__webglFramebuffer))for(let te=0;te<H.__webglFramebuffer.length;te++)a.deleteFramebuffer(H.__webglFramebuffer[te]);else a.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&a.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let te=0;te<H.__webglColorRenderbuffer.length;te++)H.__webglColorRenderbuffer[te]&&a.deleteRenderbuffer(H.__webglColorRenderbuffer[te]);H.__webglDepthRenderbuffer&&a.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let te=0,ie=E.length;te<ie;te++){let _e=i.get(E[te]);_e.__webglTexture&&(a.deleteTexture(_e.__webglTexture),o.memory.textures--),i.remove(E[te])}i.remove(E),i.remove(P)}let F=0;function V(){F=0}function I(){let P=F;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),F+=1,P}function U(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function k(P,E){let H=i.get(P);if(P.isVideoTexture&&mt(P),P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){let ne=P.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(H,P,E);return}}n.bindTexture(a.TEXTURE_2D,H.__webglTexture,a.TEXTURE0+E)}function Y(P,E){let H=i.get(P);if(P.version>0&&H.__version!==P.version){ce(H,P,E);return}n.bindTexture(a.TEXTURE_2D_ARRAY,H.__webglTexture,a.TEXTURE0+E)}function K(P,E){let H=i.get(P);if(P.version>0&&H.__version!==P.version){ce(H,P,E);return}n.bindTexture(a.TEXTURE_3D,H.__webglTexture,a.TEXTURE0+E)}function j(P,E){let H=i.get(P);if(P.version>0&&H.__version!==P.version){ve(H,P,E);return}n.bindTexture(a.TEXTURE_CUBE_MAP,H.__webglTexture,a.TEXTURE0+E)}let J={[fi]:a.REPEAT,[fn]:a.CLAMP_TO_EDGE,[Da]:a.MIRRORED_REPEAT},Q={[Nt]:a.NEAREST,[jo]:a.NEAREST_MIPMAP_NEAREST,[Ea]:a.NEAREST_MIPMAP_LINEAR,[Rt]:a.LINEAR,[Ju]:a.LINEAR_MIPMAP_NEAREST,[Ni]:a.LINEAR_MIPMAP_LINEAR},re={[f0]:a.NEVER,[b0]:a.ALWAYS,[d0]:a.LESS,[Zp]:a.LEQUAL,[p0]:a.EQUAL,[_0]:a.GEQUAL,[m0]:a.GREATER,[g0]:a.NOTEQUAL};function X(P,E,H){if(H?(a.texParameteri(P,a.TEXTURE_WRAP_S,J[E.wrapS]),a.texParameteri(P,a.TEXTURE_WRAP_T,J[E.wrapT]),(P===a.TEXTURE_3D||P===a.TEXTURE_2D_ARRAY)&&a.texParameteri(P,a.TEXTURE_WRAP_R,J[E.wrapR]),a.texParameteri(P,a.TEXTURE_MAG_FILTER,Q[E.magFilter]),a.texParameteri(P,a.TEXTURE_MIN_FILTER,Q[E.minFilter])):(a.texParameteri(P,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(P,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),(P===a.TEXTURE_3D||P===a.TEXTURE_2D_ARRAY)&&a.texParameteri(P,a.TEXTURE_WRAP_R,a.CLAMP_TO_EDGE),(E.wrapS!==fn||E.wrapT!==fn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),a.texParameteri(P,a.TEXTURE_MAG_FILTER,T(E.magFilter)),a.texParameteri(P,a.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==Nt&&E.minFilter!==Rt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(a.texParameteri(P,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(P,a.TEXTURE_COMPARE_FUNC,re[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let ne=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===Nt||E.minFilter!==Ea&&E.minFilter!==Ni||E.type===Pn&&e.has("OES_texture_float_linear")===!1||c===!1&&E.type===Vt&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(a.texParameterf(P,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function Z(P,E){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",A));let ne=E.source,te=d.get(ne);te===void 0&&(te={},d.set(ne,te));let ie=U(E);if(ie!==P.__cacheKey){te[ie]===void 0&&(te[ie]={texture:a.createTexture(),usedTimes:0},o.memory.textures++,H=!0),te[ie].usedTimes++;let _e=te[P.__cacheKey];_e!==void 0&&(te[P.__cacheKey].usedTimes--,_e.usedTimes===0&&S(E)),P.__cacheKey=ie,P.__webglTexture=te[ie].texture}return H}function ce(P,E,H){let ne=a.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ne=a.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ne=a.TEXTURE_3D);let te=Z(P,E),ie=E.source;n.bindTexture(ne,P.__webglTexture,a.TEXTURE0+H);let _e=i.get(ie);if(ie.version!==_e.__version||te===!0){n.activeTexture(a.TEXTURE0+H);let he=Ze.getPrimaries(Ze.workingColorSpace),de=E.colorSpace===Hn?null:Ze.getPrimaries(E.colorSpace),Ae=E.colorSpace===Hn||he===de?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let ze=g(E)&&m(E.image)===!1,ee=b(E.image,ze,!1,r.maxTextureSize);ee=Be(E,ee);let et=m(ee)||c,qe=s.convert(E.format,E.colorSpace),Pe=s.convert(E.type),ye=M(E.internalFormat,qe,Pe,E.colorSpace,E.isVideoTexture);X(ne,E,et);let pe,Fe=E.mipmaps,$e=c&&E.isVideoTexture!==!0&&ye!==Yp,Mt=_e.__version===void 0||te===!0,He=w(E,ee,et);if(E.isDepthTexture)ye=a.DEPTH_COMPONENT,c?E.type===Pn?ye=a.DEPTH_COMPONENT32F:E.type===er?ye=a.DEPTH_COMPONENT24:E.type===Ur?ye=a.DEPTH24_STENCIL8:ye=a.DEPTH_COMPONENT16:E.type===Pn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Fr&&ye===a.DEPTH_COMPONENT&&E.type!==Zu&&E.type!==er&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=er,Pe=s.convert(E.type)),E.format===Fs&&ye===a.DEPTH_COMPONENT&&(ye=a.DEPTH_STENCIL,E.type!==Ur&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Ur,Pe=s.convert(E.type))),Mt&&($e?n.texStorage2D(a.TEXTURE_2D,1,ye,ee.width,ee.height):n.texImage2D(a.TEXTURE_2D,0,ye,ee.width,ee.height,0,qe,Pe,null));else if(E.isDataTexture)if(Fe.length>0&&et){$e&&Mt&&n.texStorage2D(a.TEXTURE_2D,He,ye,Fe[0].width,Fe[0].height);for(let ae=0,O=Fe.length;ae<O;ae++)pe=Fe[ae],$e?n.texSubImage2D(a.TEXTURE_2D,ae,0,0,pe.width,pe.height,qe,Pe,pe.data):n.texImage2D(a.TEXTURE_2D,ae,ye,pe.width,pe.height,0,qe,Pe,pe.data);E.generateMipmaps=!1}else $e?(Mt&&n.texStorage2D(a.TEXTURE_2D,He,ye,ee.width,ee.height),n.texSubImage2D(a.TEXTURE_2D,0,0,0,ee.width,ee.height,qe,Pe,ee.data)):n.texImage2D(a.TEXTURE_2D,0,ye,ee.width,ee.height,0,qe,Pe,ee.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){$e&&Mt&&n.texStorage3D(a.TEXTURE_2D_ARRAY,He,ye,Fe[0].width,Fe[0].height,ee.depth);for(let ae=0,O=Fe.length;ae<O;ae++)pe=Fe[ae],E.format!==Gn?qe!==null?$e?n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,ee.depth,qe,pe.data,0,0):n.compressedTexImage3D(a.TEXTURE_2D_ARRAY,ae,ye,pe.width,pe.height,ee.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?n.texSubImage3D(a.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,ee.depth,qe,Pe,pe.data):n.texImage3D(a.TEXTURE_2D_ARRAY,ae,ye,pe.width,pe.height,ee.depth,0,qe,Pe,pe.data)}else{$e&&Mt&&n.texStorage2D(a.TEXTURE_2D,He,ye,Fe[0].width,Fe[0].height);for(let ae=0,O=Fe.length;ae<O;ae++)pe=Fe[ae],E.format!==Gn?qe!==null?$e?n.compressedTexSubImage2D(a.TEXTURE_2D,ae,0,0,pe.width,pe.height,qe,pe.data):n.compressedTexImage2D(a.TEXTURE_2D,ae,ye,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?n.texSubImage2D(a.TEXTURE_2D,ae,0,0,pe.width,pe.height,qe,Pe,pe.data):n.texImage2D(a.TEXTURE_2D,ae,ye,pe.width,pe.height,0,qe,Pe,pe.data)}else if(E.isDataArrayTexture)$e?(Mt&&n.texStorage3D(a.TEXTURE_2D_ARRAY,He,ye,ee.width,ee.height,ee.depth),n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,qe,Pe,ee.data)):n.texImage3D(a.TEXTURE_2D_ARRAY,0,ye,ee.width,ee.height,ee.depth,0,qe,Pe,ee.data);else if(E.isData3DTexture)$e?(Mt&&n.texStorage3D(a.TEXTURE_3D,He,ye,ee.width,ee.height,ee.depth),n.texSubImage3D(a.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,qe,Pe,ee.data)):n.texImage3D(a.TEXTURE_3D,0,ye,ee.width,ee.height,ee.depth,0,qe,Pe,ee.data);else if(E.isFramebufferTexture){if(Mt)if($e)n.texStorage2D(a.TEXTURE_2D,He,ye,ee.width,ee.height);else{let ae=ee.width,O=ee.height;for(let le=0;le<He;le++)n.texImage2D(a.TEXTURE_2D,le,ye,ae,O,0,qe,Pe,null),ae>>=1,O>>=1}}else if(Fe.length>0&&et){$e&&Mt&&n.texStorage2D(a.TEXTURE_2D,He,ye,Fe[0].width,Fe[0].height);for(let ae=0,O=Fe.length;ae<O;ae++)pe=Fe[ae],$e?n.texSubImage2D(a.TEXTURE_2D,ae,0,0,qe,Pe,pe):n.texImage2D(a.TEXTURE_2D,ae,ye,qe,Pe,pe);E.generateMipmaps=!1}else $e?(Mt&&n.texStorage2D(a.TEXTURE_2D,He,ye,ee.width,ee.height),n.texSubImage2D(a.TEXTURE_2D,0,0,0,qe,Pe,ee)):n.texImage2D(a.TEXTURE_2D,0,ye,qe,Pe,ee);v(E,et)&&x(ne),_e.__version=ie.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function ve(P,E,H){if(E.image.length!==6)return;let ne=Z(P,E),te=E.source;n.bindTexture(a.TEXTURE_CUBE_MAP,P.__webglTexture,a.TEXTURE0+H);let ie=i.get(te);if(te.version!==ie.__version||ne===!0){n.activeTexture(a.TEXTURE0+H);let _e=Ze.getPrimaries(Ze.workingColorSpace),he=E.colorSpace===Hn?null:Ze.getPrimaries(E.colorSpace),de=E.colorSpace===Hn||_e===he?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let Ae=E.isCompressedTexture||E.image[0].isCompressedTexture,ze=E.image[0]&&E.image[0].isDataTexture,ee=[];for(let ae=0;ae<6;ae++)!Ae&&!ze?ee[ae]=b(E.image[ae],!1,!0,r.maxCubemapSize):ee[ae]=ze?E.image[ae].image:E.image[ae],ee[ae]=Be(E,ee[ae]);let et=ee[0],qe=m(et)||c,Pe=s.convert(E.format,E.colorSpace),ye=s.convert(E.type),pe=M(E.internalFormat,Pe,ye,E.colorSpace),Fe=c&&E.isVideoTexture!==!0,$e=ie.__version===void 0||ne===!0,Mt=w(E,et,qe);X(a.TEXTURE_CUBE_MAP,E,qe);let He;if(Ae){Fe&&$e&&n.texStorage2D(a.TEXTURE_CUBE_MAP,Mt,pe,et.width,et.height);for(let ae=0;ae<6;ae++){He=ee[ae].mipmaps;for(let O=0;O<He.length;O++){let le=He[O];E.format!==Gn?Pe!==null?Fe?n.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,0,0,le.width,le.height,Pe,le.data):n.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,pe,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,0,0,le.width,le.height,Pe,ye,le.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O,pe,le.width,le.height,0,Pe,ye,le.data)}}}else{He=E.mipmaps,Fe&&$e&&(He.length>0&&Mt++,n.texStorage2D(a.TEXTURE_CUBE_MAP,Mt,pe,ee[0].width,ee[0].height));for(let ae=0;ae<6;ae++)if(ze){Fe?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ee[ae].width,ee[ae].height,Pe,ye,ee[ae].data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,pe,ee[ae].width,ee[ae].height,0,Pe,ye,ee[ae].data);for(let O=0;O<He.length;O++){let ue=He[O].image[ae].image;Fe?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,0,0,ue.width,ue.height,Pe,ye,ue.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,pe,ue.width,ue.height,0,Pe,ye,ue.data)}}else{Fe?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Pe,ye,ee[ae]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,pe,Pe,ye,ee[ae]);for(let O=0;O<He.length;O++){let le=He[O];Fe?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,0,0,Pe,ye,le.image[ae]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+ae,O+1,pe,Pe,ye,le.image[ae])}}}v(E,qe)&&x(a.TEXTURE_CUBE_MAP),ie.__version=te.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function xe(P,E,H,ne,te,ie){let _e=s.convert(H.format,H.colorSpace),he=s.convert(H.type),de=M(H.internalFormat,_e,he,H.colorSpace);if(!i.get(E).__hasExternalTextures){let ze=Math.max(1,E.width>>ie),ee=Math.max(1,E.height>>ie);te===a.TEXTURE_3D||te===a.TEXTURE_2D_ARRAY?n.texImage3D(te,ie,de,ze,ee,E.depth,0,_e,he,null):n.texImage2D(te,ie,de,ze,ee,0,_e,he,null)}n.bindFramebuffer(a.FRAMEBUFFER,P),ge(E)?u.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ne,te,i.get(H).__webglTexture,0,Ie(E)):(te===a.TEXTURE_2D||te>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,ne,te,i.get(H).__webglTexture,ie),n.bindFramebuffer(a.FRAMEBUFFER,null)}function Oe(P,E,H){if(a.bindRenderbuffer(a.RENDERBUFFER,P),E.depthBuffer&&!E.stencilBuffer){let ne=c===!0?a.DEPTH_COMPONENT24:a.DEPTH_COMPONENT16;if(H||ge(E)){let te=E.depthTexture;te&&te.isDepthTexture&&(te.type===Pn?ne=a.DEPTH_COMPONENT32F:te.type===er&&(ne=a.DEPTH_COMPONENT24));let ie=Ie(E);ge(E)?u.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ie,ne,E.width,E.height):a.renderbufferStorageMultisample(a.RENDERBUFFER,ie,ne,E.width,E.height)}else a.renderbufferStorage(a.RENDERBUFFER,ne,E.width,E.height);a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,P)}else if(E.depthBuffer&&E.stencilBuffer){let ne=Ie(E);H&&ge(E)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,ne,a.DEPTH24_STENCIL8,E.width,E.height):ge(E)?u.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ne,a.DEPTH24_STENCIL8,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_STENCIL,E.width,E.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,P)}else{let ne=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let te=0;te<ne.length;te++){let ie=ne[te],_e=s.convert(ie.format,ie.colorSpace),he=s.convert(ie.type),de=M(ie.internalFormat,_e,he,ie.colorSpace),Ae=Ie(E);H&&ge(E)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,Ae,de,E.width,E.height):ge(E)?u.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Ae,de,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,de,E.width,E.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Ue(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(a.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),k(E.depthTexture,0);let ne=i.get(E.depthTexture).__webglTexture,te=Ie(E);if(E.depthTexture.format===Fr)ge(E)?u.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,ne,0,te):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,ne,0);else if(E.depthTexture.format===Fs)ge(E)?u.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,ne,0,te):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ee(P){let E=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Ue(E.__webglFramebuffer,P)}else if(H){E.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer[ne]),E.__webglDepthbuffer[ne]=a.createRenderbuffer(),Oe(E.__webglDepthbuffer[ne],P,!1)}else n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=a.createRenderbuffer(),Oe(E.__webglDepthbuffer,P,!1);n.bindFramebuffer(a.FRAMEBUFFER,null)}function Je(P,E,H){let ne=i.get(P);E!==void 0&&xe(ne.__webglFramebuffer,P,P.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),H!==void 0&&Ee(P)}function z(P){let E=P.texture,H=i.get(P),ne=i.get(E);P.addEventListener("dispose",C),P.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=a.createTexture()),ne.__version=E.version,o.memory.textures++);let te=P.isWebGLCubeRenderTarget===!0,ie=P.isWebGLMultipleRenderTargets===!0,_e=m(P)||c;if(te){H.__webglFramebuffer=[];for(let he=0;he<6;he++)if(c&&E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[he]=[];for(let de=0;de<E.mipmaps.length;de++)H.__webglFramebuffer[he][de]=a.createFramebuffer()}else H.__webglFramebuffer[he]=a.createFramebuffer()}else{if(c&&E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let he=0;he<E.mipmaps.length;he++)H.__webglFramebuffer[he]=a.createFramebuffer()}else H.__webglFramebuffer=a.createFramebuffer();if(ie)if(r.drawBuffers){let he=P.texture;for(let de=0,Ae=he.length;de<Ae;de++){let ze=i.get(he[de]);ze.__webglTexture===void 0&&(ze.__webglTexture=a.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(c&&P.samples>0&&ge(P)===!1){let he=ie?E:[E];H.__webglMultisampledFramebuffer=a.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(a.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let de=0;de<he.length;de++){let Ae=he[de];H.__webglColorRenderbuffer[de]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,H.__webglColorRenderbuffer[de]);let ze=s.convert(Ae.format,Ae.colorSpace),ee=s.convert(Ae.type),et=M(Ae.internalFormat,ze,ee,Ae.colorSpace,P.isXRRenderTarget===!0),qe=Ie(P);a.renderbufferStorageMultisample(a.RENDERBUFFER,qe,et,P.width,P.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+de,a.RENDERBUFFER,H.__webglColorRenderbuffer[de])}a.bindRenderbuffer(a.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=a.createRenderbuffer(),Oe(H.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(a.FRAMEBUFFER,null)}}if(te){n.bindTexture(a.TEXTURE_CUBE_MAP,ne.__webglTexture),X(a.TEXTURE_CUBE_MAP,E,_e);for(let he=0;he<6;he++)if(c&&E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)xe(H.__webglFramebuffer[he][de],P,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+he,de);else xe(H.__webglFramebuffer[he],P,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);v(E,_e)&&x(a.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ie){let he=P.texture;for(let de=0,Ae=he.length;de<Ae;de++){let ze=he[de],ee=i.get(ze);n.bindTexture(a.TEXTURE_2D,ee.__webglTexture),X(a.TEXTURE_2D,ze,_e),xe(H.__webglFramebuffer,P,ze,a.COLOR_ATTACHMENT0+de,a.TEXTURE_2D,0),v(ze,_e)&&x(a.TEXTURE_2D)}n.unbindTexture()}else{let he=a.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(c?he=P.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(he,ne.__webglTexture),X(he,E,_e),c&&E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)xe(H.__webglFramebuffer[de],P,E,a.COLOR_ATTACHMENT0,he,de);else xe(H.__webglFramebuffer,P,E,a.COLOR_ATTACHMENT0,he,0);v(E,_e)&&x(he),n.unbindTexture()}P.depthBuffer&&Ee(P)}function on(P){let E=m(P)||c,H=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ne=0,te=H.length;ne<te;ne++){let ie=H[ne];if(v(ie,E)){let _e=P.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D,he=i.get(ie).__webglTexture;n.bindTexture(_e,he),x(_e),n.unbindTexture()}}}function Me(P){if(c&&P.samples>0&&ge(P)===!1){let E=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],H=P.width,ne=P.height,te=a.COLOR_BUFFER_BIT,ie=[],_e=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,he=i.get(P),de=P.isWebGLMultipleRenderTargets===!0;if(de)for(let Ae=0;Ae<E.length;Ae++)n.bindFramebuffer(a.FRAMEBUFFER,he.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ae,a.RENDERBUFFER,null),n.bindFramebuffer(a.FRAMEBUFFER,he.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ae,a.TEXTURE_2D,null,0);n.bindFramebuffer(a.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Ae=0;Ae<E.length;Ae++){ie.push(a.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&ie.push(_e);let ze=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(ze===!1&&(P.depthBuffer&&(te|=a.DEPTH_BUFFER_BIT),P.stencilBuffer&&(te|=a.STENCIL_BUFFER_BIT)),de&&a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,he.__webglColorRenderbuffer[Ae]),ze===!0&&(a.invalidateFramebuffer(a.READ_FRAMEBUFFER,[_e]),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[_e])),de){let ee=i.get(E[Ae]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,ee,0)}a.blitFramebuffer(0,0,H,ne,0,0,H,ne,te,a.NEAREST),f&&a.invalidateFramebuffer(a.READ_FRAMEBUFFER,ie)}if(n.bindFramebuffer(a.READ_FRAMEBUFFER,null),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),de)for(let Ae=0;Ae<E.length;Ae++){n.bindFramebuffer(a.FRAMEBUFFER,he.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ae,a.RENDERBUFFER,he.__webglColorRenderbuffer[Ae]);let ze=i.get(E[Ae]).__webglTexture;n.bindFramebuffer(a.FRAMEBUFFER,he.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ae,a.TEXTURE_2D,ze,0)}n.bindFramebuffer(a.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function Ie(P){return Math.min(r.maxSamples,P.samples)}function ge(P){let E=i.get(P);return c&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function mt(P){let E=o.render.frame;l.get(P)!==E&&(l.set(P,E),P.update())}function Be(P,E){let H=P.colorSpace,ne=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===fu||H!==Pt&&H!==Hn&&(Ze.getTransfer(H)===rt?c===!1?e.has("EXT_sRGB")===!0&&ne===Gn?(P.format=fu,P.minFilter=Rt,P.generateMipmaps=!1):E=tc.sRGBToLinear(E):(ne!==Gn||te!==ir)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}this.allocateTextureUnit=I,this.resetTextureUnits=V,this.setTexture2D=k,this.setTexture2DArray=Y,this.setTexture3D=K,this.setTextureCube=j,this.rebindTextures=Je,this.setupRenderTarget=z,this.updateRenderTargetMipmap=on,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ge}function SM(a,e,n){let i=n.isWebGL2;function r(s,o=Hn){let c,u=Ze.getTransfer(o);if(s===ir)return a.UNSIGNED_BYTE;if(s===Hp)return a.UNSIGNED_SHORT_4_4_4_4;if(s===Vp)return a.UNSIGNED_SHORT_5_5_5_1;if(s===Q_)return a.BYTE;if(s===$_)return a.SHORT;if(s===Zu)return a.UNSIGNED_SHORT;if(s===Gp)return a.INT;if(s===er)return a.UNSIGNED_INT;if(s===Pn)return a.FLOAT;if(s===Vt)return i?a.HALF_FLOAT:(c=e.get("OES_texture_half_float"),c!==null?c.HALF_FLOAT_OES:null);if(s===e0)return a.ALPHA;if(s===Gn)return a.RGBA;if(s===t0)return a.LUMINANCE;if(s===n0)return a.LUMINANCE_ALPHA;if(s===Fr)return a.DEPTH_COMPONENT;if(s===Fs)return a.DEPTH_STENCIL;if(s===fu)return c=e.get("EXT_sRGB"),c!==null?c.SRGB_ALPHA_EXT:null;if(s===i0)return a.RED;if(s===Wp)return a.RED_INTEGER;if(s===r0)return a.RG;if(s===Xp)return a.RG_INTEGER;if(s===qp)return a.RGBA_INTEGER;if(s===Cl||s===Pl||s===Ll||s===Il)if(u===rt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Cl)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Pl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ll)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Il)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Cl)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Pl)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ll)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Il)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ad||s===od||s===cd||s===ld)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===ad)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===od)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===cd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ld)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Yp)return c=e.get("WEBGL_compressed_texture_etc1"),c!==null?c.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ud||s===hd)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===ud)return u===rt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===hd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===fd||s===dd||s===pd||s===md||s===gd||s===_d||s===bd||s===xd||s===vd||s===yd||s===Md||s===Sd||s===Td||s===wd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===fd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===dd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===pd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===md)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===gd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===_d)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===bd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===xd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===vd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===yd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Md)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Sd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Td)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===wd)return u===rt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Dl||s===Ad||s===Ed)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Dl)return u===rt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ad)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ed)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===s0||s===Rd||s===Cd||s===Pd)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Dl)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Rd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Cd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Pd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ur?i?a.UNSIGNED_INT_24_8:(c=e.get("WEBGL_depth_texture"),c!==null?c.UNSIGNED_INT_24_8_WEBGL:null):a[s]!==void 0?a[s]:null}return{convert:r}}var Au=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ln=class extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}},TM={type:"move"},La=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let n=this._hand;if(n)for(let i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null,c=this._targetRay,u=this._grip,f=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(f&&e.hand){o=!0;for(let b of e.hand.values()){let m=n.getJointPose(b,i),g=this._getHandJoint(f,b);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let l=f.joints["index-finger-tip"],h=f.joints["thumb-tip"],d=l.position.distanceTo(h.position),p=.02,_=.005;f.inputState.pinching&&d>p+_?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&d<=p-_&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(TM)))}return c!==null&&(c.visible=r!==null),u!==null&&(u.visible=s!==null),f!==null&&(f.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){let i=new Ln;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}},Eu=class extends Ui{constructor(e,n){super();let i=this,r=null,s=1,o=null,c="local-floor",u=1,f=null,l=null,h=null,d=null,p=null,_=null,b=n.getContextAttributes(),m=null,g=null,v=[],x=[],M=new me,w=null,T=new Ut;T.layers.enable(1),T.viewport=new at;let A=new Ut;A.layers.enable(2),A.viewport=new at;let C=[T,A],y=new Au;y.layers.enable(1),y.layers.enable(2);let S=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=v[X];return Z===void 0&&(Z=new La,v[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=v[X];return Z===void 0&&(Z=new La,v[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=v[X];return Z===void 0&&(Z=new La,v[X]=Z),Z.getHandSpace()};function F(X){let Z=x.indexOf(X.inputSource);if(Z===-1)return;let ce=v[Z];ce!==void 0&&(ce.update(X.inputSource,X.frame,f||o),ce.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",I);for(let X=0;X<v.length;X++){let Z=x[X];Z!==null&&(x[X]=null,v[X].disconnect(Z))}S=null,N=null,e.setRenderTarget(m),p=null,d=null,h=null,r=null,g=null,re.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){c=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||o},this.setReferenceSpace=function(X){f=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",V),r.addEventListener("inputsourceschange",I),b.xrCompatible!==!0&&await n.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Z={antialias:r.renderState.layers===void 0?b.antialias:!0,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),g=new jt(p.framebufferWidth,p.framebufferHeight,{format:Gn,type:ir,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let Z=null,ce=null,ve=null;b.depth&&(ve=b.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Z=b.stencil?Fs:Fr,ce=b.stencil?Ur:er);let xe={colorFormat:n.RGBA8,depthFormat:ve,scaleFactor:s};h=new XRWebGLBinding(r,n),d=h.createProjectionLayer(xe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),g=new jt(d.textureWidth,d.textureHeight,{format:Gn,type:ir,depthTexture:new lc(d.textureWidth,d.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});let Oe=e.properties.get(g);Oe.__ignoreDepthValues=d.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(u),f=null,o=await r.requestReferenceSpace(c),re.setContext(r),re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function I(X){for(let Z=0;Z<X.removed.length;Z++){let ce=X.removed[Z],ve=x.indexOf(ce);ve>=0&&(x[ve]=null,v[ve].disconnect(ce))}for(let Z=0;Z<X.added.length;Z++){let ce=X.added[Z],ve=x.indexOf(ce);if(ve===-1){for(let Oe=0;Oe<v.length;Oe++)if(Oe>=x.length){x.push(ce),ve=Oe;break}else if(x[Oe]===null){x[Oe]=ce,ve=Oe;break}if(ve===-1)break}let xe=v[ve];xe&&xe.connect(ce)}}let U=new D,k=new D;function Y(X,Z,ce){U.setFromMatrixPosition(Z.matrixWorld),k.setFromMatrixPosition(ce.matrixWorld);let ve=U.distanceTo(k),xe=Z.projectionMatrix.elements,Oe=ce.projectionMatrix.elements,Ue=xe[14]/(xe[10]-1),Ee=xe[14]/(xe[10]+1),Je=(xe[9]+1)/xe[5],z=(xe[9]-1)/xe[5],on=(xe[8]-1)/xe[0],Me=(Oe[8]+1)/Oe[0],Ie=Ue*on,ge=Ue*Me,mt=ve/(-on+Me),Be=mt*-on;Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Be),X.translateZ(mt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();let P=Ue+mt,E=Ee+mt,H=Ie-Be,ne=ge+(ve-Be),te=Je*Ee/E*P,ie=z*Ee/E*P;X.projectionMatrix.makePerspective(H,ne,te,ie,P,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function K(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;y.near=A.near=T.near=X.near,y.far=A.far=T.far=X.far,(S!==y.near||N!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,N=y.far);let Z=X.parent,ce=y.cameras;K(y,Z);for(let ve=0;ve<ce.length;ve++)K(ce[ve],Z);ce.length===2?Y(y,T,A):y.projectionMatrix.copy(T.projectionMatrix),j(X,y,Z)};function j(X,Z,ce){ce===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(ce.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Bs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return u},this.setFoveation=function(X){u=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let J=null;function Q(X,Z){if(l=Z.getViewerPose(f||o),_=Z,l!==null){let ce=l.views;p!==null&&(e.setRenderTargetFramebuffer(g,p.framebuffer),e.setRenderTarget(g));let ve=!1;ce.length!==y.cameras.length&&(y.cameras.length=0,ve=!0);for(let xe=0;xe<ce.length;xe++){let Oe=ce[xe],Ue=null;if(p!==null)Ue=p.getViewport(Oe);else{let Je=h.getViewSubImage(d,Oe);Ue=Je.viewport,xe===0&&(e.setRenderTargetTextures(g,Je.colorTexture,d.ignoreDepthValues?void 0:Je.depthStencilTexture),e.setRenderTarget(g))}let Ee=C[xe];Ee===void 0&&(Ee=new Ut,Ee.layers.enable(xe),Ee.viewport=new at,C[xe]=Ee),Ee.matrix.fromArray(Oe.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Oe.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),xe===0&&(y.matrix.copy(Ee.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ve===!0&&y.cameras.push(Ee)}}for(let ce=0;ce<v.length;ce++){let ve=x[ce],xe=v[ce];ve!==null&&xe!==void 0&&xe.update(ve,Z,f||o)}J&&J(X,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),_=null}let re=new nm;re.setAnimationLoop(Q),this.setAnimationLoop=function(X){J=X},this.dispose=function(){}}};function wM(a,e){function n(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,tm(a)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,v,x,M){g.isMeshBasicMaterial||g.isMeshLambertMaterial?s(m,g):g.isMeshToonMaterial?(s(m,g),h(m,g)):g.isMeshPhongMaterial?(s(m,g),l(m,g)):g.isMeshStandardMaterial?(s(m,g),d(m,g),g.isMeshPhysicalMaterial&&p(m,g,M)):g.isMeshMatcapMaterial?(s(m,g),_(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),b(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&c(m,g)):g.isPointsMaterial?u(m,g,v,x):g.isSpriteMaterial?f(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,n(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===tn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,n(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===tn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,n(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,n(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let v=e.get(g).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap){m.lightMap.value=g.lightMap;let x=a._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=g.lightMapIntensity*x,n(g.lightMap,m.lightMapTransform)}g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform))}function c(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function u(m,g,v,x){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=x*.5,g.map&&(m.map.value=g.map,n(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function f(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,m.roughnessMapTransform)),e.get(g).envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function p(m,g,v){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===tn&&m.clearcoatNormalScale.value.negate())),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,g){g.matcap&&(m.matcap.value=g.matcap)}function b(m,g){let v=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function AM(a,e,n,i){let r={},s={},o=[],c=n.isWebGL2?a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS):0;function u(v,x){let M=x.program;i.uniformBlockBinding(v,M)}function f(v,x){let M=r[v.id];M===void 0&&(_(v),M=l(v),r[v.id]=M,v.addEventListener("dispose",m));let w=x.program;i.updateUBOMapping(v,w);let T=e.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function l(v){let x=h();v.__bindingPointIndex=x;let M=a.createBuffer(),w=v.__size,T=v.usage;return a.bindBuffer(a.UNIFORM_BUFFER,M),a.bufferData(a.UNIFORM_BUFFER,w,T),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,x,M),M}function h(){for(let v=0;v<c;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let x=r[v.id],M=v.uniforms,w=v.__cache;a.bindBuffer(a.UNIFORM_BUFFER,x);for(let T=0,A=M.length;T<A;T++){let C=Array.isArray(M[T])?M[T]:[M[T]];for(let y=0,S=C.length;y<S;y++){let N=C[y];if(p(N,T,y,w)===!0){let F=N.__offset,V=Array.isArray(N.value)?N.value:[N.value],I=0;for(let U=0;U<V.length;U++){let k=V[U],Y=b(k);typeof k=="number"||typeof k=="boolean"?(N.__data[0]=k,a.bufferSubData(a.UNIFORM_BUFFER,F+I,N.__data)):k.isMatrix3?(N.__data[0]=k.elements[0],N.__data[1]=k.elements[1],N.__data[2]=k.elements[2],N.__data[3]=0,N.__data[4]=k.elements[3],N.__data[5]=k.elements[4],N.__data[6]=k.elements[5],N.__data[7]=0,N.__data[8]=k.elements[6],N.__data[9]=k.elements[7],N.__data[10]=k.elements[8],N.__data[11]=0):(k.toArray(N.__data,I),I+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,F,N.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function p(v,x,M,w){let T=v.value,A=x+"_"+M;if(w[A]===void 0)return typeof T=="number"||typeof T=="boolean"?w[A]=T:w[A]=T.clone(),!0;{let C=w[A];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return w[A]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function _(v){let x=v.uniforms,M=0,w=16;for(let A=0,C=x.length;A<C;A++){let y=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,N=y.length;S<N;S++){let F=y[S],V=Array.isArray(F.value)?F.value:[F.value];for(let I=0,U=V.length;I<U;I++){let k=V[I],Y=b(k),K=M%w;K!==0&&w-K<Y.boundary&&(M+=w-K),F.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=Y.storage}}}let T=M%w;return T>0&&(M+=w-T),v.__size=M,v.__cache={},this}function b(v){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){let x=v.target;x.removeEventListener("dispose",m);let M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),a.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function g(){for(let v in r)a.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:u,update:f,dispose:g}}var Fa=class{constructor(e={}){let{canvas:n=D0(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:f=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;let p=new Uint32Array(4),_=new Int32Array(4),b=null,m=null,g=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this._useLegacyLights=!1,this.toneMapping=nr,this.toneMappingExposure=1;let x=this,M=!1,w=0,T=0,A=null,C=-1,y=null,S=new at,N=new at,F=null,V=new se(0),I=0,U=n.width,k=n.height,Y=1,K=null,j=null,J=new at(0,0,U,k),Q=new at(0,0,U,k),re=!1,X=new Ua,Z=!1,ce=!1,ve=null,xe=new we,Oe=new me,Ue=new D,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Je(){return A===null?Y:1}let z=i;function on(R,B){for(let W=0;W<R.length;W++){let q=R[W],G=n.getContext(q,B);if(G!==null)return G}return null}try{let R={alpha:!0,depth:r,stencil:s,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:f,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Wu}`),n.addEventListener("webglcontextlost",ae,!1),n.addEventListener("webglcontextrestored",O,!1),n.addEventListener("webglcontextcreationerror",le,!1),z===null){let B=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&B.shift(),z=on(B,R),z===null)throw on(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Me,Ie,ge,mt,Be,P,E,H,ne,te,ie,_e,he,de,Ae,ze,ee,et,qe,Pe,ye,pe,Fe,$e;function Mt(){Me=new Xv(z),Ie=new Bv(z,Me,e),Me.init(Ie),pe=new SM(z,Me,Ie),ge=new yM(z,Me,Ie),mt=new jv(z),Be=new lM,P=new MM(z,Me,ge,Be,Ie,pe,mt),E=new Gv(x),H=new Wv(x),ne=new nb(z,Ie),Fe=new Fv(z,Me,ne,Ie),te=new qv(z,ne,mt,Fe),ie=new Qv(z,te,ne,mt),qe=new Zv(z,Ie,P),ze=new zv(Be),_e=new cM(x,E,H,Me,Ie,Fe,ze),he=new wM(x,Be),de=new hM,Ae=new _M(Me,Ie),et=new Uv(x,E,H,ge,ie,d,u),ee=new vM(x,ie,Ie),$e=new AM(z,mt,Ie,ge),Pe=new kv(z,Me,mt,Ie),ye=new Yv(z,Me,mt,Ie),mt.programs=_e.programs,x.capabilities=Ie,x.extensions=Me,x.properties=Be,x.renderLists=de,x.shadowMap=ee,x.state=ge,x.info=mt}Mt();let He=new Eu(x,z);this.xr=He,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let R=Me.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Me.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(R){R!==void 0&&(Y=R,this.setSize(U,k,!1))},this.getSize=function(R){return R.set(U,k)},this.setSize=function(R,B,W=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=R,k=B,n.width=Math.floor(R*Y),n.height=Math.floor(B*Y),W===!0&&(n.style.width=R+"px",n.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(U*Y,k*Y).floor()},this.setDrawingBufferSize=function(R,B,W){U=R,k=B,Y=W,n.width=Math.floor(R*W),n.height=Math.floor(B*W),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(S)},this.getViewport=function(R){return R.copy(J)},this.setViewport=function(R,B,W,q){R.isVector4?J.set(R.x,R.y,R.z,R.w):J.set(R,B,W,q),ge.viewport(S.copy(J).multiplyScalar(Y).floor())},this.getScissor=function(R){return R.copy(Q)},this.setScissor=function(R,B,W,q){R.isVector4?Q.set(R.x,R.y,R.z,R.w):Q.set(R,B,W,q),ge.scissor(N.copy(Q).multiplyScalar(Y).floor())},this.getScissorTest=function(){return re},this.setScissorTest=function(R){ge.setScissorTest(re=R)},this.setOpaqueSort=function(R){K=R},this.setTransparentSort=function(R){j=R},this.getClearColor=function(R){return R.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(R=!0,B=!0,W=!0){let q=0;if(R){let G=!1;if(A!==null){let fe=A.texture.format;G=fe===qp||fe===Xp||fe===Wp}if(G){let fe=A.texture.type,be=fe===ir||fe===er||fe===Zu||fe===Ur||fe===Hp||fe===Vp,Te=et.getClearColor(),Ce=et.getClearAlpha(),Ge=Te.r,De=Te.g,Ne=Te.b;be?(p[0]=Ge,p[1]=De,p[2]=Ne,p[3]=Ce,z.clearBufferuiv(z.COLOR,0,p)):(_[0]=Ge,_[1]=De,_[2]=Ne,_[3]=Ce,z.clearBufferiv(z.COLOR,0,_))}else q|=z.COLOR_BUFFER_BIT}B&&(q|=z.DEPTH_BUFFER_BIT),W&&(q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ae,!1),n.removeEventListener("webglcontextrestored",O,!1),n.removeEventListener("webglcontextcreationerror",le,!1),de.dispose(),Ae.dispose(),Be.dispose(),E.dispose(),H.dispose(),ie.dispose(),Fe.dispose(),$e.dispose(),_e.dispose(),He.dispose(),He.removeEventListener("sessionstart",cn),He.removeEventListener("sessionend",ht),ve&&(ve.dispose(),ve=null),ln.stop()};function ae(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let R=mt.autoReset,B=ee.enabled,W=ee.autoUpdate,q=ee.needsUpdate,G=ee.type;Mt(),mt.autoReset=R,ee.enabled=B,ee.autoUpdate=W,ee.needsUpdate=q,ee.type=G}function le(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){let B=R.target;B.removeEventListener("dispose",ue),Re(B)}function Re(R){Se(R),Be.remove(R)}function Se(R){let B=Be.get(R).programs;B!==void 0&&(B.forEach(function(W){_e.releaseProgram(W)}),R.isShaderMaterial&&_e.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,W,q,G,fe){B===null&&(B=Ee);let be=G.isMesh&&G.matrixWorld.determinant()<0,Te=h_(R,B,W,q,G);ge.setMaterial(q,be);let Ce=W.index,Ge=1;if(q.wireframe===!0){if(Ce=te.getWireframeAttribute(W),Ce===void 0)return;Ge=2}let De=W.drawRange,Ne=W.attributes.position,Et=De.start*Ge,En=(De.start+De.count)*Ge;fe!==null&&(Et=Math.max(Et,fe.start*Ge),En=Math.min(En,(fe.start+fe.count)*Ge)),Ce!==null?(Et=Math.max(Et,0),En=Math.min(En,Ce.count)):Ne!=null&&(Et=Math.max(Et,0),En=Math.min(En,Ne.count));let Gt=En-Et;if(Gt<0||Gt===1/0)return;Fe.setup(G,q,Te,W,Ce);let Ti,gt=Pe;if(Ce!==null&&(Ti=ne.get(Ce),gt=ye,gt.setIndex(Ti)),G.isMesh)q.wireframe===!0?(ge.setLineWidth(q.wireframeLinewidth*Je()),gt.setMode(z.LINES)):gt.setMode(z.TRIANGLES);else if(G.isLine){let Ve=q.linewidth;Ve===void 0&&(Ve=1),ge.setLineWidth(Ve*Je()),G.isLineSegments?gt.setMode(z.LINES):G.isLineLoop?gt.setMode(z.LINE_LOOP):gt.setMode(z.LINE_STRIP)}else G.isPoints?gt.setMode(z.POINTS):G.isSprite&&gt.setMode(z.TRIANGLES);if(G.isBatchedMesh)gt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)gt.renderInstances(Et,Gt,G.count);else if(W.isInstancedBufferGeometry){let Ve=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,wl=Math.min(W.instanceCount,Ve);gt.renderInstances(Et,Gt,wl)}else gt.render(Et,Gt)};function lt(R,B,W){R.transparent===!0&&R.side===xn&&R.forceSinglePass===!1?(R.side=tn,R.needsUpdate=!0,bo(R,B,W),R.side=hi,R.needsUpdate=!0,bo(R,B,W),R.side=xn):bo(R,B,W)}this.compile=function(R,B,W=null){W===null&&(W=R),m=Ae.get(W),m.init(),v.push(m),W.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),R!==W&&R.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(x._useLegacyLights);let q=new Set;return R.traverse(function(G){let fe=G.material;if(fe)if(Array.isArray(fe))for(let be=0;be<fe.length;be++){let Te=fe[be];lt(Te,W,G),q.add(Te)}else lt(fe,W,G),q.add(fe)}),v.pop(),m=null,q},this.compileAsync=function(R,B,W=null){let q=this.compile(R,B,W);return new Promise(G=>{function fe(){if(q.forEach(function(be){Be.get(be).currentProgram.isReady()&&q.delete(be)}),q.size===0){G(R);return}setTimeout(fe,10)}Me.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ut=null;function zt(R){ut&&ut(R)}function cn(){ln.stop()}function ht(){ln.start()}let ln=new nm;ln.setAnimationLoop(zt),typeof self!="undefined"&&ln.setContext(self),this.setAnimationLoop=function(R){ut=R,He.setAnimationLoop(R),R===null?ln.stop():ln.start()},He.addEventListener("sessionstart",cn),He.addEventListener("sessionend",ht),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(B),B=He.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,B,A),m=Ae.get(R,v.length),m.init(),v.push(m),xe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),X.setFromProjectionMatrix(xe),ce=this.localClippingEnabled,Z=ze.init(this.clippingPlanes,ce),b=de.get(R,g.length),b.init(),g.push(b),oi(R,B,0,x.sortObjects),b.finish(),x.sortObjects===!0&&b.sort(K,j),this.info.render.frame++,Z===!0&&ze.beginShadows();let W=m.state.shadowsArray;if(ee.render(W,R,B),Z===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),et.render(b,R),m.setupLights(x._useLegacyLights),B.isArrayCamera){let q=B.cameras;for(let G=0,fe=q.length;G<fe;G++){let be=q[G];Yf(b,R,be,be.viewport)}}else Yf(b,R,B);A!==null&&(P.updateMultisampleRenderTarget(A),P.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(x,R,B),Fe.resetDefaultState(),C=-1,y=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,g.pop(),g.length>0?b=g[g.length-1]:b=null};function oi(R,B,W,q){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)W=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||X.intersectsSprite(R)){q&&Ue.setFromMatrixPosition(R.matrixWorld).applyMatrix4(xe);let be=ie.update(R),Te=R.material;Te.visible&&b.push(R,be,Te,W,Ue.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||X.intersectsObject(R))){let be=ie.update(R),Te=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ue.copy(R.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ue.copy(be.boundingSphere.center)),Ue.applyMatrix4(R.matrixWorld).applyMatrix4(xe)),Array.isArray(Te)){let Ce=be.groups;for(let Ge=0,De=Ce.length;Ge<De;Ge++){let Ne=Ce[Ge],Et=Te[Ne.materialIndex];Et&&Et.visible&&b.push(R,be,Et,W,Ue.z,Ne)}}else Te.visible&&b.push(R,be,Te,W,Ue.z,null)}}let fe=R.children;for(let be=0,Te=fe.length;be<Te;be++)oi(fe[be],B,W,q)}function Yf(R,B,W,q){let G=R.opaque,fe=R.transmissive,be=R.transparent;m.setupLightsView(W),Z===!0&&ze.setGlobalState(x.clippingPlanes,W),fe.length>0&&u_(G,fe,B,W),q&&ge.viewport(S.copy(q)),G.length>0&&_o(G,B,W),fe.length>0&&_o(fe,B,W),be.length>0&&_o(be,B,W),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function u_(R,B,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;let fe=Ie.isWebGL2;ve===null&&(ve=new jt(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?Vt:ir,minFilter:Ni,samples:fe?4:0})),x.getDrawingBufferSize(Oe),fe?ve.setSize(Oe.x,Oe.y):ve.setSize(ec(Oe.x),ec(Oe.y));let be=x.getRenderTarget();x.setRenderTarget(ve),x.getClearColor(V),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();let Te=x.toneMapping;x.toneMapping=nr,_o(R,W,q),P.updateMultisampleRenderTarget(ve),P.updateRenderTargetMipmap(ve);let Ce=!1;for(let Ge=0,De=B.length;Ge<De;Ge++){let Ne=B[Ge],Et=Ne.object,En=Ne.geometry,Gt=Ne.material,Ti=Ne.group;if(Gt.side===xn&&Et.layers.test(q.layers)){let gt=Gt.side;Gt.side=tn,Gt.needsUpdate=!0,jf(Et,W,q,En,Gt,Ti),Gt.side=gt,Gt.needsUpdate=!0,Ce=!0}}Ce===!0&&(P.updateMultisampleRenderTarget(ve),P.updateRenderTargetMipmap(ve)),x.setRenderTarget(be),x.setClearColor(V,I),x.toneMapping=Te}function _o(R,B,W){let q=B.isScene===!0?B.overrideMaterial:null;for(let G=0,fe=R.length;G<fe;G++){let be=R[G],Te=be.object,Ce=be.geometry,Ge=q===null?be.material:q,De=be.group;Te.layers.test(W.layers)&&jf(Te,B,W,Ce,Ge,De)}}function jf(R,B,W,q,G,fe){R.onBeforeRender(x,B,W,q,G,fe),R.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),G.onBeforeRender(x,B,W,q,R,fe),G.transparent===!0&&G.side===xn&&G.forceSinglePass===!1?(G.side=tn,G.needsUpdate=!0,x.renderBufferDirect(W,B,q,G,R,fe),G.side=hi,G.needsUpdate=!0,x.renderBufferDirect(W,B,q,G,R,fe),G.side=xn):x.renderBufferDirect(W,B,q,G,R,fe),R.onAfterRender(x,B,W,q,G,fe)}function bo(R,B,W){B.isScene!==!0&&(B=Ee);let q=Be.get(R),G=m.state.lights,fe=m.state.shadowsArray,be=G.state.version,Te=_e.getParameters(R,G.state,fe,B,W),Ce=_e.getProgramCacheKey(Te),Ge=q.programs;q.environment=R.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(R.isMeshStandardMaterial?H:E).get(R.envMap||q.environment),Ge===void 0&&(R.addEventListener("dispose",ue),Ge=new Map,q.programs=Ge);let De=Ge.get(Ce);if(De!==void 0){if(q.currentProgram===De&&q.lightsStateVersion===be)return Jf(R,Te),De}else Te.uniforms=_e.getUniforms(R),R.onBuild(W,Te,x),R.onBeforeCompile(Te,x),De=_e.acquireProgram(Te,Ce),Ge.set(Ce,De),q.uniforms=Te.uniforms;let Ne=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ne.clippingPlanes=ze.uniform),Jf(R,Te),q.needsLights=d_(R),q.lightsStateVersion=be,q.needsLights&&(Ne.ambientLightColor.value=G.state.ambient,Ne.lightProbe.value=G.state.probe,Ne.directionalLights.value=G.state.directional,Ne.directionalLightShadows.value=G.state.directionalShadow,Ne.spotLights.value=G.state.spot,Ne.spotLightShadows.value=G.state.spotShadow,Ne.rectAreaLights.value=G.state.rectArea,Ne.ltc_1.value=G.state.rectAreaLTC1,Ne.ltc_2.value=G.state.rectAreaLTC2,Ne.pointLights.value=G.state.point,Ne.pointLightShadows.value=G.state.pointShadow,Ne.hemisphereLights.value=G.state.hemi,Ne.directionalShadowMap.value=G.state.directionalShadowMap,Ne.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ne.spotShadowMap.value=G.state.spotShadowMap,Ne.spotLightMatrix.value=G.state.spotLightMatrix,Ne.spotLightMap.value=G.state.spotLightMap,Ne.pointShadowMap.value=G.state.pointShadowMap,Ne.pointShadowMatrix.value=G.state.pointShadowMatrix),q.currentProgram=De,q.uniformsList=null,De}function Kf(R){if(R.uniformsList===null){let B=R.currentProgram.getUniforms();R.uniformsList=Os.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function Jf(R,B){let W=Be.get(R);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function h_(R,B,W,q,G){B.isScene!==!0&&(B=Ee),P.resetTextureUnits();let fe=B.fog,be=q.isMeshStandardMaterial?B.environment:null,Te=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Pt,Ce=(q.isMeshStandardMaterial?H:E).get(q.envMap||be),Ge=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,De=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ne=!!W.morphAttributes.position,Et=!!W.morphAttributes.normal,En=!!W.morphAttributes.color,Gt=nr;q.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Gt=x.toneMapping);let Ti=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,gt=Ti!==void 0?Ti.length:0,Ve=Be.get(q),wl=m.state.lights;if(Z===!0&&(ce===!0||R!==y)){let Bn=R===y&&q.id===C;ze.setState(q,R,Bn)}let St=!1;q.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==wl.state.version||Ve.outputColorSpace!==Te||G.isBatchedMesh&&Ve.batching===!1||!G.isBatchedMesh&&Ve.batching===!0||G.isInstancedMesh&&Ve.instancing===!1||!G.isInstancedMesh&&Ve.instancing===!0||G.isSkinnedMesh&&Ve.skinning===!1||!G.isSkinnedMesh&&Ve.skinning===!0||G.isInstancedMesh&&Ve.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ve.instancingColor===!1&&G.instanceColor!==null||Ve.envMap!==Ce||q.fog===!0&&Ve.fog!==fe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==Ge||Ve.vertexTangents!==De||Ve.morphTargets!==Ne||Ve.morphNormals!==Et||Ve.morphColors!==En||Ve.toneMapping!==Gt||Ie.isWebGL2===!0&&Ve.morphTargetsCount!==gt)&&(St=!0):(St=!0,Ve.__version=q.version);let Er=Ve.currentProgram;St===!0&&(Er=bo(q,B,G));let Zf=!1,xa=!1,Al=!1,Qt=Er.getUniforms(),Rr=Ve.uniforms;if(ge.useProgram(Er.program)&&(Zf=!0,xa=!0,Al=!0),q.id!==C&&(C=q.id,xa=!0),Zf||y!==R){Qt.setValue(z,"projectionMatrix",R.projectionMatrix),Qt.setValue(z,"viewMatrix",R.matrixWorldInverse);let Bn=Qt.map.cameraPosition;Bn!==void 0&&Bn.setValue(z,Ue.setFromMatrixPosition(R.matrixWorld)),Ie.logarithmicDepthBuffer&&Qt.setValue(z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Qt.setValue(z,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,xa=!0,Al=!0)}if(G.isSkinnedMesh){Qt.setOptional(z,G,"bindMatrix"),Qt.setOptional(z,G,"bindMatrixInverse");let Bn=G.skeleton;Bn&&(Ie.floatVertexTextures?(Bn.boneTexture===null&&Bn.computeBoneTexture(),Qt.setValue(z,"boneTexture",Bn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Qt.setOptional(z,G,"batchingTexture"),Qt.setValue(z,"batchingTexture",G._matricesTexture,P));let El=W.morphAttributes;if((El.position!==void 0||El.normal!==void 0||El.color!==void 0&&Ie.isWebGL2===!0)&&qe.update(G,W,Er),(xa||Ve.receiveShadow!==G.receiveShadow)&&(Ve.receiveShadow=G.receiveShadow,Qt.setValue(z,"receiveShadow",G.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Rr.envMap.value=Ce,Rr.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),xa&&(Qt.setValue(z,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&f_(Rr,Al),fe&&q.fog===!0&&he.refreshFogUniforms(Rr,fe),he.refreshMaterialUniforms(Rr,q,Y,k,ve),Os.upload(z,Kf(Ve),Rr,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Os.upload(z,Kf(Ve),Rr,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Qt.setValue(z,"center",G.center),Qt.setValue(z,"modelViewMatrix",G.modelViewMatrix),Qt.setValue(z,"normalMatrix",G.normalMatrix),Qt.setValue(z,"modelMatrix",G.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Bn=q.uniformsGroups;for(let Rl=0,p_=Bn.length;Rl<p_;Rl++)if(Ie.isWebGL2){let Qf=Bn[Rl];$e.update(Qf,Er),$e.bind(Qf,Er)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Er}function f_(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function d_(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,B,W){Be.get(R.texture).__webglTexture=B,Be.get(R.depthTexture).__webglTexture=W;let q=Be.get(R);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,B){let W=Be.get(R);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(R,B=0,W=0){A=R,w=B,T=W;let q=!0,G=null,fe=!1,be=!1;if(R){let Ce=Be.get(R);Ce.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(z.FRAMEBUFFER,null),q=!1):Ce.__webglFramebuffer===void 0?P.setupRenderTarget(R):Ce.__hasExternalTextures&&P.rebindTextures(R,Be.get(R.texture).__webglTexture,Be.get(R.depthTexture).__webglTexture);let Ge=R.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(be=!0);let De=Be.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(De[B])?G=De[B][W]:G=De[B],fe=!0):Ie.isWebGL2&&R.samples>0&&P.useMultisampledRTT(R)===!1?G=Be.get(R).__webglMultisampledFramebuffer:Array.isArray(De)?G=De[W]:G=De,S.copy(R.viewport),N.copy(R.scissor),F=R.scissorTest}else S.copy(J).multiplyScalar(Y).floor(),N.copy(Q).multiplyScalar(Y).floor(),F=re;if(ge.bindFramebuffer(z.FRAMEBUFFER,G)&&Ie.drawBuffers&&q&&ge.drawBuffers(R,G),ge.viewport(S),ge.scissor(N),ge.setScissorTest(F),fe){let Ce=Be.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ce.__webglTexture,W)}else if(be){let Ce=Be.get(R.texture),Ge=B||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ce.__webglTexture,W||0,Ge)}C=-1},this.readRenderTargetPixels=function(R,B,W,q,G,fe,be){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Be.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){ge.bindFramebuffer(z.FRAMEBUFFER,Te);try{let Ce=R.texture,Ge=Ce.format,De=Ce.type;if(Ge!==Gn&&pe.convert(Ge)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ne=De===Vt&&(Me.has("EXT_color_buffer_half_float")||Ie.isWebGL2&&Me.has("EXT_color_buffer_float"));if(De!==ir&&pe.convert(De)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(De===Pn&&(Ie.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-q&&W>=0&&W<=R.height-G&&z.readPixels(B,W,q,G,pe.convert(Ge),pe.convert(De),fe)}finally{let Ce=A!==null?Be.get(A).__webglFramebuffer:null;ge.bindFramebuffer(z.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(R,B,W=0){let q=Math.pow(2,-W),G=Math.floor(B.image.width*q),fe=Math.floor(B.image.height*q);P.setTexture2D(B,0),z.copyTexSubImage2D(z.TEXTURE_2D,W,0,0,R.x,R.y,G,fe),ge.unbindTexture()},this.copyTextureToTexture=function(R,B,W,q=0){let G=B.image.width,fe=B.image.height,be=pe.convert(W.format),Te=pe.convert(W.type);P.setTexture2D(W,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,W.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,W.unpackAlignment),B.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,q,R.x,R.y,G,fe,be,Te,B.image.data):B.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,q,R.x,R.y,B.mipmaps[0].width,B.mipmaps[0].height,be,B.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,q,R.x,R.y,be,Te,B.image),q===0&&W.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(R,B,W,q,G=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let fe=R.max.x-R.min.x+1,be=R.max.y-R.min.y+1,Te=R.max.z-R.min.z+1,Ce=pe.convert(q.format),Ge=pe.convert(q.type),De;if(q.isData3DTexture)P.setTexture3D(q,0),De=z.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)P.setTexture2DArray(q,0),De=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,q.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,q.unpackAlignment);let Ne=z.getParameter(z.UNPACK_ROW_LENGTH),Et=z.getParameter(z.UNPACK_IMAGE_HEIGHT),En=z.getParameter(z.UNPACK_SKIP_PIXELS),Gt=z.getParameter(z.UNPACK_SKIP_ROWS),Ti=z.getParameter(z.UNPACK_SKIP_IMAGES),gt=W.isCompressedTexture?W.mipmaps[G]:W.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,gt.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,gt.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,R.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,R.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,R.min.z),W.isDataTexture||W.isData3DTexture?z.texSubImage3D(De,G,B.x,B.y,B.z,fe,be,Te,Ce,Ge,gt.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(De,G,B.x,B.y,B.z,fe,be,Te,Ce,gt.data)):z.texSubImage3D(De,G,B.x,B.y,B.z,fe,be,Te,Ce,Ge,gt),z.pixelStorei(z.UNPACK_ROW_LENGTH,Ne),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Et),z.pixelStorei(z.UNPACK_SKIP_PIXELS,En),z.pixelStorei(z.UNPACK_SKIP_ROWS,Gt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ti),G===0&&q.generateMipmaps&&z.generateMipmap(De),ge.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),ge.unbindTexture()},this.resetState=function(){w=0,T=0,A=null,ge.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let n=this.getContext();n.drawingBufferColorSpace=e===eh?"display-p3":"srgb",n.unpackColorSpace=Ze.workingColorSpace===Lc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===nt?kr:Kp}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===kr?nt:Pt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Ru=class extends Fa{};Ru.prototype.isWebGL1Renderer=!0;var uc=class a{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new se(e),this.density=n}clone(){return new a(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var hc=class extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}},ka=class{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=hu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},un=new D,Ba=class a{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)un.fromBufferAttribute(this,n),un.applyMatrix4(e),this.setXYZ(n,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)un.fromBufferAttribute(this,n),un.applyNormalMatrix(e),this.setXYZ(n,un.x,un.y,un.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)un.fromBufferAttribute(this,n),un.transformDirection(e),this.setXYZ(n,un.x,un.y,un.z);return this}setX(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=li(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=li(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=li(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=li(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),r=tt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=tt(n,this.array),i=tt(i,this.array),r=tt(r,this.array),s=tt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let n=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new Ct(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new a(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let n=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var _p=new D,bp=new at,xp=new at,EM=new D,vp=new we,Go=new D,iu=new In,yp=new we,ru=new Gr,fc=class extends Le{constructor(e,n){super(e,n),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sd,this.bindMatrix=new we,this.bindMatrixInverse=new we,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new vn),this.boundingBox.makeEmpty();let n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Go),this.boundingBox.expandByPoint(Go)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();let n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Go),this.boundingSphere.expandByPoint(Go)}copy(e,n){return super.copy(e,n),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,n){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),iu.copy(this.boundingSphere),iu.applyMatrix4(r),e.ray.intersectsSphere(iu)!==!1&&(yp.copy(r).invert(),ru.copy(e.ray).applyMatrix4(yp),!(this.boundingBox!==null&&ru.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,n,ru)))}getVertexPosition(e,n){return super.getVertexPosition(e,n),this.applyBoneTransform(e,n),n}bind(e,n){this.skeleton=e,n===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),n=this.matrixWorld),this.bindMatrix.copy(n),this.bindMatrixInverse.copy(n).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new at,n=this.geometry.attributes.skinWeight;for(let i=0,r=n.count;i<r;i++){e.fromBufferAttribute(n,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),n.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Z_?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,n){let i=this.skeleton,r=this.geometry;bp.fromBufferAttribute(r.attributes.skinIndex,e),xp.fromBufferAttribute(r.attributes.skinWeight,e),_p.copy(n).applyMatrix4(this.bindMatrix),n.set(0,0,0);for(let s=0;s<4;s++){let o=xp.getComponent(s);if(o!==0){let c=bp.getComponent(s);vp.multiplyMatrices(i.bones[c].matrixWorld,i.boneInverses[c]),n.addScaledVector(EM.copy(_p).applyMatrix4(vp),o)}}return n.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,n){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,n)}},za=class extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}},dc=class extends Yt{constructor(e=null,n=1,i=1,r,s,o,c,u,f=Nt,l=Nt,h,d){super(null,o,c,u,f,l,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Mp=new we,RM=new we,pc=class a{constructor(e=[],n=[]){this.uuid=ei(),this.bones=e.slice(0),this.boneInverses=n,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,n=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),n.length===0)this.calculateInverses();else if(e.length!==n.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new we)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,n=this.bones.length;e<n;e++){let i=new we;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,n=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let c=e[s]?e[s].matrixWorld:RM;Mp.multiplyMatrices(c,n[s]),Mp.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new a(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let n=new Float32Array(e*e*4);n.set(this.boneMatrices);let i=new dc(n,e,e,Gn,Pn);return i.needsUpdate=!0,this.boneMatrices=n,this.boneTexture=i,this}getBoneByName(e){for(let n=0,i=this.bones.length;n<i;n++){let r=this.bones[n];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,n){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],o=n[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new za),this.bones.push(o),this.boneInverses.push(new we().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let n=this.bones,i=this.boneInverses;for(let r=0,s=n.length;r<s;r++){let o=n[r];e.bones.push(o.uuid);let c=i[r];e.boneInverses.push(c.toArray())}return e}},Hr=class extends Ct{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},As=new we,Sp=new we,Ho=[],Tp=new vn,CM=new we,Ta=new Le,wa=new In,di=class extends Le{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Hr(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,CM)}computeBoundingBox(){let e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,As),Tp.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(Tp)}computeBoundingSphere(){let e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,As),wa.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(wa)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}raycast(e,n){let i=this.matrixWorld,r=this.count;if(Ta.geometry=this.geometry,Ta.material=this.material,Ta.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wa.copy(this.boundingSphere),wa.applyMatrix4(i),e.ray.intersectsSphere(wa)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,As),Sp.multiplyMatrices(i,As),Ta.matrixWorld=Sp,Ta.raycast(e,Ho);for(let o=0,c=Ho.length;o<c;o++){let u=Ho[o];u.instanceId=s,u.object=this,n.push(u)}Ho.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new Hr(new Float32Array(this.instanceMatrix.count*3),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Vr=class extends Dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},wp=new D,Ap=new D,Ep=new we,su=new Gr,Vo=new In,Hs=class extends _t{constructor(e=new Ot,n=new Vr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)wp.fromBufferAttribute(n,r-1),Ap.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=wp.distanceTo(Ap);e.setAttribute("lineDistance",new ot(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vo.copy(i.boundingSphere),Vo.applyMatrix4(r),Vo.radius+=s,e.ray.intersectsSphere(Vo)===!1)return;Ep.copy(r).invert(),su.copy(e.ray).applyMatrix4(Ep);let c=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,f=new D,l=new D,h=new D,d=new D,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){let g=Math.max(0,o.start),v=Math.min(_.count,o.start+o.count);for(let x=g,M=v-1;x<M;x+=p){let w=_.getX(x),T=_.getX(x+1);if(f.fromBufferAttribute(m,w),l.fromBufferAttribute(m,T),su.distanceSqToSegment(f,l,d,h)>u)continue;d.applyMatrix4(this.matrixWorld);let C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||n.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let g=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=g,M=v-1;x<M;x+=p){if(f.fromBufferAttribute(m,x),l.fromBufferAttribute(m,x+1),su.distanceSqToSegment(f,l,d,h)>u)continue;d.applyMatrix4(this.matrixWorld);let T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||n.push({distance:T,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}},Rp=new D,Cp=new D,Vs=class extends Hs{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Rp.fromBufferAttribute(n,r),Cp.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Rp.distanceTo(Cp);e.setAttribute("lineDistance",new ot(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},mc=class extends Hs{constructor(e,n){super(e,n),this.isLineLoop=!0,this.type="LineLoop"}},Ga=class extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Pp=new we,Cu=new Gr,Wo=new In,Xo=new D,gc=class extends _t{constructor(e=new Ot,n=new Ga){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(r),Wo.radius+=s,e.ray.intersectsSphere(Wo)===!1)return;Pp.copy(r).invert(),Cu.copy(e.ray).applyMatrix4(Pp);let c=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,f=i.index,h=i.attributes.position;if(f!==null){let d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,b=p;_<b;_++){let m=f.getX(_);Xo.fromBufferAttribute(h,m),Lp(Xo,m,u,r,e,n,this)}}else{let d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=d,b=p;_<b;_++)Xo.fromBufferAttribute(h,_),Lp(Xo,_,u,r,e,n,this)}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}};function Lp(a,e,n,i,r,s,o){let c=Cu.distanceSqToPoint(a);if(c<n){let u=new D;Cu.closestPointToPoint(a,u),u.applyMatrix4(i);let f=r.ray.origin.distanceTo(u);if(f<r.near||f>r.far)return;s.push({distance:f,distanceToRay:Math.sqrt(c),point:u,index:e,face:null,object:o})}}var Ws=class extends Yt{constructor(e,n,i,r,s,o,c,u,f){super(e,n,i,r,s,o,c,u,f),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Xs=class a extends Ot{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);let s=[],o=[],c=[],u=[],f=new D,l=new me;o.push(0,0,0),c.push(0,0,1),u.push(.5,.5);for(let h=0,d=3;h<=n;h++,d+=3){let p=i+h/n*r;f.x=e*Math.cos(p),f.y=e*Math.sin(p),o.push(f.x,f.y,f.z),c.push(0,0,1),l.x=(o[d]/e+1)/2,l.y=(o[d+1]/e+1)/2,u.push(l.x,l.y)}for(let h=1;h<=n;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(c,3)),this.setAttribute("uv",new ot(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radius,e.segments,e.thetaStart,e.thetaLength)}},sr=class a extends Ot{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:u};let f=this;r=Math.floor(r),s=Math.floor(s);let l=[],h=[],d=[],p=[],_=0,b=[],m=i/2,g=0;v(),o===!1&&(e>0&&x(!0),n>0&&x(!1)),this.setIndex(l),this.setAttribute("position",new ot(h,3)),this.setAttribute("normal",new ot(d,3)),this.setAttribute("uv",new ot(p,2));function v(){let M=new D,w=new D,T=0,A=(n-e)/i;for(let C=0;C<=s;C++){let y=[],S=C/s,N=S*(n-e)+e;for(let F=0;F<=r;F++){let V=F/r,I=V*u+c,U=Math.sin(I),k=Math.cos(I);w.x=N*U,w.y=-S*i+m,w.z=N*k,h.push(w.x,w.y,w.z),M.set(U,A,k).normalize(),d.push(M.x,M.y,M.z),p.push(V,1-S),y.push(_++)}b.push(y)}for(let C=0;C<r;C++)for(let y=0;y<s;y++){let S=b[y][C],N=b[y+1][C],F=b[y+1][C+1],V=b[y][C+1];l.push(S,N,V),l.push(N,F,V),T+=6}f.addGroup(g,T,0),g+=T}function x(M){let w=_,T=new me,A=new D,C=0,y=M===!0?e:n,S=M===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,m*S,0),d.push(0,S,0),p.push(.5,.5),_++;let N=_;for(let F=0;F<=r;F++){let I=F/r*u+c,U=Math.cos(I),k=Math.sin(I);A.x=y*k,A.y=m*S,A.z=y*U,h.push(A.x,A.y,A.z),d.push(0,S,0),T.x=U*.5+.5,T.y=k*.5*S+.5,p.push(T.x,T.y),_++}for(let F=0;F<r;F++){let V=w+F,I=N+F;M===!0?l.push(I,I+1,V):l.push(I+1,I,V),C+=3}f.addGroup(g,C,M===!0?1:2),g+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},_c=class a extends sr{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,c=Math.PI*2){super(0,e,n,i,r,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new a(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Pu=class a extends Ot{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};let s=[],o=[];c(r),f(i),l(),this.setAttribute("position",new ot(s,3)),this.setAttribute("normal",new ot(s.slice(),3)),this.setAttribute("uv",new ot(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function c(v){let x=new D,M=new D,w=new D;for(let T=0;T<n.length;T+=3)p(n[T+0],x),p(n[T+1],M),p(n[T+2],w),u(x,M,w,v)}function u(v,x,M,w){let T=w+1,A=[];for(let C=0;C<=T;C++){A[C]=[];let y=v.clone().lerp(M,C/T),S=x.clone().lerp(M,C/T),N=T-C;for(let F=0;F<=N;F++)F===0&&C===T?A[C][F]=y:A[C][F]=y.clone().lerp(S,F/N)}for(let C=0;C<T;C++)for(let y=0;y<2*(T-C)-1;y++){let S=Math.floor(y/2);y%2===0?(d(A[C][S+1]),d(A[C+1][S]),d(A[C][S])):(d(A[C][S+1]),d(A[C+1][S+1]),d(A[C+1][S]))}}function f(v){let x=new D;for(let M=0;M<s.length;M+=3)x.x=s[M+0],x.y=s[M+1],x.z=s[M+2],x.normalize().multiplyScalar(v),s[M+0]=x.x,s[M+1]=x.y,s[M+2]=x.z}function l(){let v=new D;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];let M=m(v)/2/Math.PI+.5,w=g(v)/Math.PI+.5;o.push(M,1-w)}_(),h()}function h(){for(let v=0;v<o.length;v+=6){let x=o[v+0],M=o[v+2],w=o[v+4],T=Math.max(x,M,w),A=Math.min(x,M,w);T>.9&&A<.1&&(x<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function p(v,x){let M=v*3;x.x=e[M+0],x.y=e[M+1],x.z=e[M+2]}function _(){let v=new D,x=new D,M=new D,w=new D,T=new me,A=new me,C=new me;for(let y=0,S=0;y<s.length;y+=9,S+=6){v.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),M.set(s[y+6],s[y+7],s[y+8]),T.set(o[S+0],o[S+1]),A.set(o[S+2],o[S+3]),C.set(o[S+4],o[S+5]),w.copy(v).add(x).add(M).divideScalar(3);let N=m(w);b(T,S+0,v,N),b(A,S+2,x,N),b(C,S+4,M,N)}}function b(v,x,M,w){w<0&&v.x===1&&(o[x]=v.x-1),M.x===0&&M.z===0&&(o[x]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.vertices,e.indices,e.radius,e.details)}};var bc=class a extends Pu{constructor(e=1,n=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new a(e.radius,e.detail)}};var Wr=class a extends Ot{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:c},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let u=Math.min(o+c,Math.PI),f=0,l=[],h=new D,d=new D,p=[],_=[],b=[],m=[];for(let g=0;g<=i;g++){let v=[],x=g/i,M=0;g===0&&o===0?M=.5/n:g===i&&u===Math.PI&&(M=-.5/n);for(let w=0;w<=n;w++){let T=w/n;h.x=-e*Math.cos(r+T*s)*Math.sin(o+x*c),h.y=e*Math.cos(o+x*c),h.z=e*Math.sin(r+T*s)*Math.sin(o+x*c),_.push(h.x,h.y,h.z),d.copy(h).normalize(),b.push(d.x,d.y,d.z),m.push(T+M,1-x),v.push(f++)}l.push(v)}for(let g=0;g<i;g++)for(let v=0;v<n;v++){let x=l[g][v+1],M=l[g][v],w=l[g+1][v],T=l[g+1][v+1];(g!==0||o>0)&&p.push(x,M,T),(g!==i-1||u<Math.PI)&&p.push(M,w,T)}this.setIndex(p),this.setAttribute("position",new ot(_,3)),this.setAttribute("normal",new ot(b,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var xc=class extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},xt=class extends Dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jp,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vn=class extends xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function qo(a,e,n){return!a||!n&&a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function PM(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function LM(a){function e(r,s){return a[r]-a[s]}let n=a.length,i=new Array(n);for(let r=0;r!==n;++r)i[r]=r;return i.sort(e),i}function Ip(a,e,n){let i=a.length,r=new a.constructor(i);for(let s=0,o=0;o!==i;++s){let c=n[s]*e;for(let u=0;u!==e;++u)r[o++]=a[c+u]}return r}function cm(a,e,n,i){let r=1,s=a[0];for(;s!==void 0&&s[i]===void 0;)s=a[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),n.push.apply(n,o)),s=a[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(n,n.length)),s=a[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),n.push(o)),s=a[r++];while(s!==void 0)}var ar=class{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,i=this._cachedIndex,r=n[i],s=n[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let c=i+2;;){if(r===void 0){if(e<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===c)break;if(s=r,r=n[++i],e<r)break t}o=n.length;break n}if(!(e>=s)){let c=n[1];e<c&&(i=2,s=c);for(let u=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===u)break;if(r=s,s=n[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let c=i+o>>>1;e<n[c]?o=c:i=c+1}if(r=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)n[o]=i[s+o];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Lu=class extends ar{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Es,endingEnd:Es}}intervalChanged_(e,n,i){let r=this.parameterPositions,s=e-2,o=e+1,c=r[s],u=r[o];if(c===void 0)switch(this.getSettings_().endingStart){case Rs:s=e,c=2*n-i;break;case Ko:s=r.length-2,c=n+r[s]-r[s+1];break;default:s=e,c=i}if(u===void 0)switch(this.getSettings_().endingEnd){case Rs:o=e,u=2*i-n;break;case Ko:o=1,u=i+r[1]-r[0];break;default:o=e-1,u=n}let f=(i-n)*.5,l=this.valueSize;this._weightPrev=f/(n-c),this._weightNext=f/(u-i),this._offsetPrev=s*l,this._offsetNext=o*l}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,f=u-c,l=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,_=(i-n)/(r-n),b=_*_,m=b*_,g=-d*m+2*d*b-d*_,v=(1+d)*m+(-1.5-2*d)*b+(-.5+d)*_+1,x=(-1-p)*m+(1.5+p)*b+.5*_,M=p*m-p*b;for(let w=0;w!==c;++w)s[w]=g*o[l+w]+v*o[f+w]+x*o[u+w]+M*o[h+w];return s}},vc=class extends ar{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=e*c,f=u-c,l=(i-n)/(r-n),h=1-l;for(let d=0;d!==c;++d)s[d]=o[f+d]*h+o[u+d]*l;return s}},Iu=class extends ar{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Wn=class{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qo(n,this.TimeBufferType),this.values=qo(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:qo(e.times,Array),values:qo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Iu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case ks:n=this.InterpolantFactoryMethodDiscrete;break;case zr:n=this.InterpolantFactoryMethodLinear;break;case Ol:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ks;case this.InterpolantFactoryMethodLinear:return zr;case this.InterpolantFactoryMethodSmooth:return Ol}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>n;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let c=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*c,o*c)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let c=0;c!==s;c++){let u=i[c];if(typeof u=="number"&&isNaN(u)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,c,u),e=!1;break}if(o!==null&&o>u){console.error("THREE.KeyframeTrack: Out of order keys.",this,c,u,o),e=!1;break}o=u}if(r!==void 0&&PM(r))for(let c=0,u=r.length;c!==u;++c){let f=r[c];if(isNaN(f)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,c,f),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Ol,s=e.length-1,o=1;for(let c=1;c<s;++c){let u=!1,f=e[c],l=e[c+1];if(f!==l&&(c!==1||f!==e[0]))if(r)u=!0;else{let h=c*i,d=h-i,p=h+i;for(let _=0;_!==i;++_){let b=n[h+_];if(b!==n[d+_]||b!==n[p+_]){u=!0;break}}}if(u){if(c!==o){e[o]=e[c];let h=c*i,d=o*i;for(let p=0;p!==i;++p)n[d+p]=n[h+p]}++o}}if(s>0){e[o]=e[s];for(let c=s*i,u=o*i,f=0;f!==i;++f)n[u+f]=n[c+f];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=n.slice(0,o*i)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}};Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=zr;var or=class extends Wn{};or.prototype.ValueTypeName="bool";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=ks;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;var yc=class extends Wn{};yc.prototype.ValueTypeName="color";var Fi=class extends Wn{};Fi.prototype.ValueTypeName="number";var Du=class extends ar{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=(i-n)/(r-n),f=e*c;for(let l=f+c;f!==l;f+=4)nn.slerpFlat(s,0,o,f-c,o,f,u);return s}},pi=class extends Wn{InterpolantFactoryMethodLinear(e){return new Du(this.times,this.values,this.getValueSize(),e)}};pi.prototype.ValueTypeName="quaternion";pi.prototype.DefaultInterpolation=zr;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var cr=class extends Wn{};cr.prototype.ValueTypeName="string";cr.prototype.ValueBufferType=Array;cr.prototype.DefaultInterpolation=ks;cr.prototype.InterpolantFactoryMethodLinear=void 0;cr.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends Wn{};ki.prototype.ValueTypeName="vector";var qs=class{constructor(e,n=-1,i,r=$u){this.name=e,this.tracks=i,this.duration=n,this.blendMode=r,this.uuid=ei(),this.duration<0&&this.resetDuration()}static parse(e){let n=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,c=i.length;o!==c;++o)n.push(DM(i[o]).scale(r));let s=new this(e.name,e.duration,n,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let n=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:n,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=i.length;s!==o;++s)n.push(Wn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,n,i,r){let s=n.length,o=[];for(let c=0;c<s;c++){let u=[],f=[];u.push((c+s-1)%s,c,(c+1)%s),f.push(0,1,0);let l=LM(u);u=Ip(u,1,l),f=Ip(f,1,l),!r&&u[0]===0&&(u.push(s),f.push(f[0])),o.push(new Fi(".morphTargetInfluences["+n[c].name+"]",u,f).scale(1/i))}return new this(e,-1,o)}static findByName(e,n){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===n)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,n,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let c=0,u=e.length;c<u;c++){let f=e[c],l=f.name.match(s);if(l&&l.length>1){let h=l[1],d=r[h];d||(r[h]=d=[]),d.push(f)}}let o=[];for(let c in r)o.push(this.CreateFromMorphTargetSequence(c,r[c],n,i));return o}static parseAnimation(e,n){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(h,d,p,_,b){if(p.length!==0){let m=[],g=[];cm(p,m,g,_),m.length!==0&&b.push(new h(d,m,g))}},r=[],s=e.name||"default",o=e.fps||30,c=e.blendMode,u=e.length||-1,f=e.hierarchy||[];for(let h=0;h<f.length;h++){let d=f[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},_;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let b=0;b<d[_].morphTargets.length;b++)p[d[_].morphTargets[b]]=-1;for(let b in p){let m=[],g=[];for(let v=0;v!==d[_].morphTargets.length;++v){let x=d[_];m.push(x.time),g.push(x.morphTarget===b?1:0)}r.push(new Fi(".morphTargetInfluence["+b+"]",m,g))}u=p.length*o}else{let p=".bones["+n[h].name+"]";i(ki,p+".position",d,"pos",r),i(pi,p+".quaternion",d,"rot",r),i(ki,p+".scale",d,"scl",r)}}return r.length===0?null:new this(s,u,r,c)}resetDuration(){let e=this.tracks,n=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];n=Math.max(n,s.times[s.times.length-1])}return this.duration=n,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let n=0;n<this.tracks.length;n++)e=e&&this.tracks[n].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function IM(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Fi;case"vector":case"vector2":case"vector3":case"vector4":return ki;case"color":return yc;case"quaternion":return pi;case"bool":case"boolean":return or;case"string":return cr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function DM(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=IM(a.type);if(a.times===void 0){let n=[],i=[];cm(a.keys,n,i,"value"),a.times=n,a.values=i}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}var tr={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(this.files[a]=e)},get:function(a){if(this.enabled!==!1)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},Ou=class{constructor(e,n,i){let r=this,s=!1,o=0,c=0,u,f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(l){c++,s===!1&&r.onStart!==void 0&&r.onStart(l,o,c),s=!0},this.itemEnd=function(l){o++,r.onProgress!==void 0&&r.onProgress(l,o,c),o===c&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(l){r.onError!==void 0&&r.onError(l)},this.resolveURL=function(l){return u?u(l):l},this.setURLModifier=function(l){return u=l,this},this.addHandler=function(l,h){return f.push(l,h),this},this.removeHandler=function(l){let h=f.indexOf(l);return h!==-1&&f.splice(h,2),this},this.getHandler=function(l){for(let h=0,d=f.length;h<d;h+=2){let p=f[h],_=f[h+1];if(p.global&&(p.lastIndex=0),p.test(l))return _}return null}}},OM=new Ou,mi=class{constructor(e){this.manager=e!==void 0?e:OM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};mi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Pi={},Nu=class extends Error{constructor(e,n){super(e),this.response=n}},Ys=class extends mi{constructor(e){super(e)}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=tr.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(s),this.manager.itemEnd(e)},0),s;if(Pi[e]!==void 0){Pi[e].push({onLoad:n,onProgress:i,onError:r});return}Pi[e]=[],Pi[e].push({onLoad:n,onProgress:i,onError:r});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),c=this.mimeType,u=this.responseType;fetch(o).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||f.body===void 0||f.body.getReader===void 0)return f;let l=Pi[e],h=f.body.getReader(),d=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),p=d?parseInt(d):0,_=p!==0,b=0,m=new ReadableStream({start(g){v();function v(){h.read().then(({done:x,value:M})=>{if(x)g.close();else{b+=M.byteLength;let w=new ProgressEvent("progress",{lengthComputable:_,loaded:b,total:p});for(let T=0,A=l.length;T<A;T++){let C=l[T];C.onProgress&&C.onProgress(w)}g.enqueue(M),v()}})}}});return new Response(m)}else throw new Nu(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(u){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(l=>new DOMParser().parseFromString(l,c));case"json":return f.json();default:if(c===void 0)return f.text();{let h=/charset="?([^;"\s]*)"?/i.exec(c),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return f.arrayBuffer().then(_=>p.decode(_))}}}).then(f=>{tr.add(e,f);let l=Pi[e];delete Pi[e];for(let h=0,d=l.length;h<d;h++){let p=l[h];p.onLoad&&p.onLoad(f)}}).catch(f=>{let l=Pi[e];if(l===void 0)throw this.manager.itemError(e),f;delete Pi[e];for(let h=0,d=l.length;h<d;h++){let p=l[h];p.onError&&p.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Uu=class extends mi{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=tr.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;let c=Oa("img");function u(){l(),tr.add(e,this),n&&n(this),s.manager.itemEnd(e)}function f(h){l(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function l(){c.removeEventListener("load",u,!1),c.removeEventListener("error",f,!1)}return c.addEventListener("load",u,!1),c.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),s.manager.itemStart(e),c.src=e,c}};var Mc=class extends mi{constructor(e){super(e)}load(e,n,i,r){let s=this,o=new dc,c=new Ys(this.manager);return c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setPath(this.path),c.setWithCredentials(s.withCredentials),c.load(e,function(u){let f;try{f=s.parse(u)}catch(l){if(r!==void 0)r(l);else{console.error(l);return}}f.image!==void 0?o.image=f.image:f.data!==void 0&&(o.image.width=f.width,o.image.height=f.height,o.image.data=f.data),o.wrapS=f.wrapS!==void 0?f.wrapS:fn,o.wrapT=f.wrapT!==void 0?f.wrapT:fn,o.magFilter=f.magFilter!==void 0?f.magFilter:Rt,o.minFilter=f.minFilter!==void 0?f.minFilter:Rt,o.anisotropy=f.anisotropy!==void 0?f.anisotropy:1,f.colorSpace!==void 0?o.colorSpace=f.colorSpace:f.encoding!==void 0&&(o.encoding=f.encoding),f.flipY!==void 0&&(o.flipY=f.flipY),f.format!==void 0&&(o.format=f.format),f.type!==void 0&&(o.type=f.type),f.mipmaps!==void 0&&(o.mipmaps=f.mipmaps,o.minFilter=Ni),f.mipmapCount===1&&(o.minFilter=Rt),f.generateMipmaps!==void 0&&(o.generateMipmaps=f.generateMipmaps),o.needsUpdate=!0,n&&n(o,f)},i,r),o}},js=class extends mi{constructor(e){super(e)}load(e,n,i,r){let s=new Yt,o=new Uu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(c){s.image=c,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}},Ks=class extends _t{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new se(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}},Sc=class extends Ks{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new se(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}},au=new we,Dp=new D,Op=new D,Ha=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ua,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let n=this.camera,i=this.matrix;Dp.setFromMatrixPosition(e.matrixWorld),n.position.copy(Dp),Op.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Op),n.updateMatrixWorld(),au.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(au),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(au)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fu=class extends Ha{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let n=this.camera,i=Bs*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Tc=class extends Ks{constructor(e,n,i=0,r=Math.PI/3,s=0,o=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Fu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Np=new we,Aa=new D,ou=new D,ku=class extends Ha{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,n=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Aa.setFromMatrixPosition(e.matrixWorld),i.position.copy(Aa),ou.copy(i.position),ou.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(ou),i.updateMatrixWorld(),r.makeTranslation(-Aa.x,-Aa.y,-Aa.z),Np.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Np)}},Bi=class extends Ks{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new ku}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Bu=class extends Ha{constructor(){super(new rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xr=class extends Ks{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new Bu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var lr=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let n="";for(let i=0,r=e.length;i<r;i++)n+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(n))}catch{return n}}static extractUrlBase(e){let n=e.lastIndexOf("/");return n===-1?"./":e.slice(0,n+1)}static resolveURL(e,n){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(n)&&/^\//.test(e)&&(n=n.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:n+e)}};var wc=class extends mi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=tr.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(f=>{n&&n(f),s.manager.itemEnd(e)}).catch(f=>{r&&r(f)});return}return setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o}let c={};c.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",c.headers=this.requestHeader;let u=fetch(e,c).then(function(f){return f.blob()}).then(function(f){return createImageBitmap(f,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(f){return tr.add(e,f),n&&n(f),s.manager.itemEnd(e),f}).catch(function(f){r&&r(f),tr.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});tr.add(e,u),s.manager.itemStart(e)}};var Ac=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Up(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let n=Up();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}};function Up(){return(typeof performance=="undefined"?Date:performance).now()}var zu=class{constructor(e,n,i){this.binding=e,this.valueSize=i;let r,s,o;switch(n){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,n){let i=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let c=0;c!==r;++c)i[s+c]=i[c];o=n}else{o+=n;let c=n/o;this._mixBufferRegion(i,s,0,c,r)}this.cumulativeWeight=o}accumulateAdditive(e){let n=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(n,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let n=this.valueSize,i=this.buffer,r=e*n+n,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,c=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let u=n*this._origIndex;this._mixBufferRegion(i,r,u,1-s,n)}o>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*n,1,n);for(let u=n,f=n+n;u!==f;++u)if(i[u]!==i[u+n]){c.setValue(i,r);break}}saveOriginalState(){let e=this.binding,n=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(n,r);for(let s=i,o=r;s!==o;++s)n[s]=n[r+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,n=e+this.valueSize;for(let i=e;i<n;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,n=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[n+i]=this.buffer[e+i]}_select(e,n,i,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[n+o]=e[i+o]}_slerp(e,n,i,r){nn.slerpFlat(e,n,e,n,e,i,r)}_slerpAdditive(e,n,i,r,s){let o=this._workIndex*s;nn.multiplyQuaternionsFlat(e,o,e,n,e,i),nn.slerpFlat(e,n,e,n,e,o,r)}_lerp(e,n,i,r,s){let o=1-r;for(let c=0;c!==s;++c){let u=n+c;e[u]=e[u]*o+e[i+c]*r}}_lerpAdditive(e,n,i,r,s){for(let o=0;o!==s;++o){let c=n+o;e[c]=e[c]+e[i+o]*r}}},ih="\\[\\]\\.:\\/",NM=new RegExp("["+ih+"]","g"),rh="[^"+ih+"]",UM="[^"+ih.replace("\\.","")+"]",FM=/((?:WC+[\/:])*)/.source.replace("WC",rh),kM=/(WCOD+)?/.source.replace("WCOD",UM),BM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),zM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),GM=new RegExp("^"+FM+kM+BM+zM+"$"),HM=["material","materials","bones","map"],Gu=class{constructor(e,n,i){let r=i||st.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,r)}getValue(e,n){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,n)}setValue(e,n){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}},st=class a{constructor(e,n,i){this.path=n,this.parsedPath=i||a.parseTrackName(n),this.node=a.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new a.Composite(e,n,i):new a(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(NM,"")}static parseTrackName(e){let n=GM.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);HM.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let c=s[o];if(c.name===n||c.uuid===n)return c;let u=i(c.children);if(u)return u}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[n++]=i[r]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,r=n.propertyName,s=n.propertyIndex;if(e||(e=a.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let f=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let l=0;l<e.length;l++)if(e[l].name===f){f=l;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(f!==void 0){if(e[f]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[f]}}let o=e[r];if(o===void 0){let f=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+f+"."+r+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?c=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}u=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(u=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=Gu;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Hu=class{constructor(e,n,i=null,r=n.blendMode){this._mixer=e,this._clip=n,this._localRoot=i,this.blendMode=r;let s=n.tracks,o=s.length,c=new Array(o),u={endingStart:Es,endingEnd:Es};for(let f=0;f!==o;++f){let l=s[f].createInterpolant(null);c[f]=l,l.settings=u}this._interpolantSettings=u,this._interpolants=c,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=a0,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,n){return this.loop=e,this.repetitions=n,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,n,i){if(e.fadeOut(n),this.fadeIn(n),i){let r=this._clip.duration,s=e._clip.duration,o=s/r,c=r/s;e.warp(1,o,n),this.warp(c,1,n)}return this}crossFadeTo(e,n,i){return e.crossFadeFrom(this,n,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,n,i){let r=this._mixer,s=r.time,o=this.timeScale,c=this._timeScaleInterpolant;c===null&&(c=r._lendControlInterpolant(),this._timeScaleInterpolant=c);let u=c.parameterPositions,f=c.sampleValues;return u[0]=s,u[1]=s+i,f[0]=e/o,f[1]=n/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,n,i,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let u=(e-s)*i;u<0||i===0?n=0:(this._startTime=null,n=i*u)}n*=this._updateTimeScale(e);let o=this._updateTime(n),c=this._updateWeight(e);if(c>0){let u=this._interpolants,f=this._propertyBindings;switch(this.blendMode){case c0:for(let l=0,h=u.length;l!==h;++l)u[l].evaluate(o),f[l].accumulateAdditive(c);break;case $u:default:for(let l=0,h=u.length;l!==h;++l)u[l].evaluate(o),f[l].accumulate(r,c)}}}_updateWeight(e){let n=0;if(this.enabled){n=this.weight;let i=this._weightInterpolant;if(i!==null){let r=i.evaluate(e)[0];n*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=n,n}_updateTimeScale(e){let n=0;if(!this.paused){n=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let r=i.evaluate(e)[0];n*=r,e>i.parameterPositions[1]&&(this.stopWarping(),n===0?this.paused=!0:this.timeScale=n)}}return this._effectiveTimeScale=n,n}_updateTime(e){let n=this._clip.duration,i=this.loop,r=this.time+e,s=this._loopCount,o=i===o0;if(e===0)return s===-1?r:o&&(s&1)===1?n-r:r;if(i===Qu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=n)r=n;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=n||r<0){let c=Math.floor(r/n);r-=n*c,s+=Math.abs(c);let u=this.repetitions-s;if(u<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?n:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(u===1){let f=e<0;this._setEndings(f,!f,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:c})}}else this.time=r;if(o&&(s&1)===1)return n-r}return r}_setEndings(e,n,i){let r=this._interpolantSettings;i?(r.endingStart=Rs,r.endingEnd=Rs):(e?r.endingStart=this.zeroSlopeAtStart?Rs:Es:r.endingStart=Ko,n?r.endingEnd=this.zeroSlopeAtEnd?Rs:Es:r.endingEnd=Ko)}_scheduleFading(e,n,i){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let c=o.parameterPositions,u=o.sampleValues;return c[0]=s,u[0]=n,c[1]=s+e,u[1]=i,this}},VM=new Float32Array(1),Ec=class extends Ui{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,n){let i=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,c=e._interpolants,u=i.uuid,f=this._bindingsByRootAndName,l=f[u];l===void 0&&(l={},f[u]=l);for(let h=0;h!==s;++h){let d=r[h],p=d.name,_=l[p];if(_!==void 0)++_.referenceCount,o[h]=_;else{if(_=o[h],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,u,p));continue}let b=n&&n._propertyBindings[h].binding.parsedPath;_=new zu(st.create(i,p,b),d.ValueTypeName,d.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,u,p),o[h]=_}c[h].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,i)}let n=e._propertyBindings;for(let i=0,r=n.length;i!==r;++i){let s=n[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let n=e._propertyBindings;for(let i=0,r=n.length;i!==r;++i){let s=n[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let n=e._cacheIndex;return n!==null&&n<this._nActiveActions}_addInactiveAction(e,n,i){let r=this._actions,s=this._actionsByClip,o=s[n];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[n]=o;else{let c=o.knownActions;e._byClipCacheIndex=c.length,c.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){let n=this._actions,i=n[n.length-1],r=e._cacheIndex;i._cacheIndex=r,n[r]=i,n.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,c=o[s],u=c.knownActions,f=u[u.length-1],l=e._byClipCacheIndex;f._byClipCacheIndex=l,u[l]=f,u.pop(),e._byClipCacheIndex=null;let h=c.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],u.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let n=e._propertyBindings;for(let i=0,r=n.length;i!==r;++i){let s=n[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let n=this._actions,i=e._cacheIndex,r=this._nActiveActions++,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_takeBackAction(e){let n=this._actions,i=e._cacheIndex,r=--this._nActiveActions,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_addInactiveBinding(e,n,i){let r=this._bindingsByRootAndName,s=this._bindings,o=r[n];o===void 0&&(o={},r[n]=o),o[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let n=this._bindings,i=e.binding,r=i.rootNode.uuid,s=i.path,o=this._bindingsByRootAndName,c=o[r],u=n[n.length-1],f=e._cacheIndex;u._cacheIndex=f,n[f]=u,n.pop(),delete c[s],Object.keys(c).length===0&&delete o[r]}_lendBinding(e){let n=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_takeBackBinding(e){let n=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_lendControlInterpolant(){let e=this._controlInterpolants,n=this._nActiveControlInterpolants++,i=e[n];return i===void 0&&(i=new vc(new Float32Array(2),new Float32Array(2),1,VM),i.__cacheIndex=n,e[n]=i),i}_takeBackControlInterpolant(e){let n=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=n[r];e.__cacheIndex=r,n[r]=e,s.__cacheIndex=i,n[i]=s}clipAction(e,n,i){let r=n||this._root,s=r.uuid,o=typeof e=="string"?qs.findByName(r,e):e,c=o!==null?o.uuid:e,u=this._actionsByClip[c],f=null;if(i===void 0&&(o!==null?i=o.blendMode:i=$u),u!==void 0){let h=u.actionByRoot[s];if(h!==void 0&&h.blendMode===i)return h;f=u.knownActions[0],o===null&&(o=f._clip)}if(o===null)return null;let l=new Hu(this,o,n,i);return this._bindAction(l,f),this._addInactiveAction(l,c,s),l}existingAction(e,n){let i=n||this._root,r=i.uuid,s=typeof e=="string"?qs.findByName(i,e):e,o=s?s.uuid:e,c=this._actionsByClip[o];return c!==void 0&&c.actionByRoot[r]||null}stopAllAction(){let e=this._actions,n=this._nActiveActions;for(let i=n-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let n=this._actions,i=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let f=0;f!==i;++f)n[f]._update(r,e,s,o);let c=this._bindings,u=this._nActiveBindings;for(let f=0;f!==u;++f)c[f].apply(o);return this}setTime(e){this.time=0;for(let n=0;n<this._actions.length;n++)this._actions[n].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let n=this._actions,i=e.uuid,r=this._actionsByClip,s=r[i];if(s!==void 0){let o=s.knownActions;for(let c=0,u=o.length;c!==u;++c){let f=o[c];this._deactivateAction(f);let l=f._cacheIndex,h=n[n.length-1];f._cacheIndex=null,f._byClipCacheIndex=null,h._cacheIndex=l,n[l]=h,n.pop(),this._removeInactiveBindingsForAction(f)}delete r[i]}}uncacheRoot(e){let n=e.uuid,i=this._actionsByClip;for(let o in i){let c=i[o].actionByRoot,u=c[n];u!==void 0&&(this._deactivateAction(u),this._removeInactiveAction(u))}let r=this._bindingsByRootAndName,s=r[n];if(s!==void 0)for(let o in s){let c=s[o];c.restoreOriginalState(),this._removeInactiveBinding(c)}}uncacheAction(e,n){let i=this.existingAction(e,n);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var Rc=class{constructor(e,n,i=0,r=1/0){this.ray=new Gr(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Na,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,i=[]){return Vu(e,this,i,n),i.sort(Fp),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Vu(e[r],this,i,n);return i.sort(Fp),i}};function Fp(a,e){return a.distance-e.distance}function Vu(a,e,n,i){if(a.layers.test(e.layers)&&a.raycast(e,n),i===!0){let r=a.children;for(let s=0,o=r.length;s<o;s++)Vu(r[s],e,n,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wu}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wu);function sh(a,e){if(e===jp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===Wa||e===Pc){let n=a.getIndex();if(n===null){let o=[],c=a.getAttribute("position");if(c!==void 0){for(let u=0;u<c.count;u++)o.push(u);a.setIndex(o),n=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}let i=n.count-2,r=[];if(e===Wa)for(let o=1;o<=i;o++)r.push(n.getX(0)),r.push(n.getX(o)),r.push(n.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(n.getX(o)),r.push(n.getX(o+1)),r.push(n.getX(o+2))):(r.push(n.getX(o+2)),r.push(n.getX(o+1)),r.push(n.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=a.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}var Dc=class extends mi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(n){return new fh(n)}),this.register(function(n){return new yh(n)}),this.register(function(n){return new Mh(n)}),this.register(function(n){return new Sh(n)}),this.register(function(n){return new ph(n)}),this.register(function(n){return new mh(n)}),this.register(function(n){return new gh(n)}),this.register(function(n){return new _h(n)}),this.register(function(n){return new hh(n)}),this.register(function(n){return new bh(n)}),this.register(function(n){return new dh(n)}),this.register(function(n){return new vh(n)}),this.register(function(n){return new xh(n)}),this.register(function(n){return new lh(n)}),this.register(function(n){return new Th(n)}),this.register(function(n){return new wh(n)})}load(e,n,i,r){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let f=lr.extractUrlBase(e);o=lr.resolveURL(f,this.path)}else o=lr.extractUrlBase(e);this.manager.itemStart(e);let c=function(f){r?r(f):console.error(f),s.manager.itemError(e),s.manager.itemEnd(e)},u=new Ys(this.manager);u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setWithCredentials(this.withCredentials),u.load(e,function(f){try{s.parse(f,o,function(l){n(l),s.manager.itemEnd(e)},c)}catch(l){c(l)}},i,c)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,n,i,r){let s,o={},c={},u=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(u.decode(new Uint8Array(e,0,4))===dm){try{o[je.KHR_BINARY_GLTF]=new Ah(e)}catch(h){r&&r(h);return}s=JSON.parse(o[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(u.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let f=new Dh(s,{path:n||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});f.fileLoader.setRequestHeader(this.requestHeader);for(let l=0;l<this.pluginCallbacks.length;l++){let h=this.pluginCallbacks[l](f);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),c[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let l=0;l<s.extensionsUsed.length;++l){let h=s.extensionsUsed[l],d=s.extensionsRequired||[];switch(h){case je.KHR_MATERIALS_UNLIT:o[h]=new uh;break;case je.KHR_DRACO_MESH_COMPRESSION:o[h]=new Eh(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:o[h]=new Rh;break;case je.KHR_MESH_QUANTIZATION:o[h]=new Ch;break;default:d.indexOf(h)>=0&&c[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}f.setExtensions(o),f.setPlugins(c),f.parse(i,r)}parseAsync(e,n){let i=this;return new Promise(function(r,s){i.parse(e,n,r,s)})}};function XM(){let a={};return{get:function(e){return a[e]},add:function(e,n){a[e]=n},remove:function(e){delete a[e]},removeAll:function(){a={}}}}var je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},lh=class{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,n=this.parser.json.nodes||[];for(let i=0,r=n.length;i<r;i++){let s=n[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let n=this.parser,i="light:"+e,r=n.cache.get(i);if(r)return r;let s=n.json,u=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],f,l=new se(16777215);u.color!==void 0&&l.setRGB(u.color[0],u.color[1],u.color[2],Pt);let h=u.range!==void 0?u.range:0;switch(u.type){case"directional":f=new Xr(l),f.target.position.set(0,0,-1),f.add(f.target);break;case"point":f=new Bi(l),f.distance=h;break;case"spot":f=new Tc(l),f.distance=h,u.spot=u.spot||{},u.spot.innerConeAngle=u.spot.innerConeAngle!==void 0?u.spot.innerConeAngle:0,u.spot.outerConeAngle=u.spot.outerConeAngle!==void 0?u.spot.outerConeAngle:Math.PI/4,f.angle=u.spot.outerConeAngle,f.penumbra=1-u.spot.innerConeAngle/u.spot.outerConeAngle,f.target.position.set(0,0,-1),f.add(f.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+u.type)}return f.position.set(0,0,0),f.decay=2,fr(f,u),u.intensity!==void 0&&(f.intensity=u.intensity),f.name=n.createUniqueName(u.name||"light_"+e),r=Promise.resolve(f),n.cache.add(i,r),r}getDependency(e,n){if(e==="light")return this._loadLight(n)}createNodeAttachment(e){let n=this,i=this.parser,s=i.json.nodes[e],c=(s.extensions&&s.extensions[this.name]||{}).light;return c===void 0?null:this._loadLight(c).then(function(u){return i._getNodeRef(n.cache,c,u)})}},uh=class{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return bt}extendParams(e,n,i){let r=[];e.color=new se(1,1,1),e.opacity=1;let s=n.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Pt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,nt))}return Promise.all(r)}},hh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,n){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(n.emissiveIntensity=s),Promise.resolve()}},fh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(n.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(i.assignTexture(n,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(n.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(i.assignTexture(n,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(i.assignTexture(n,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let c=o.clearcoatNormalTexture.scale;n.clearcoatNormalScale=new me(c,c)}return Promise.all(s)}},dh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(n.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(i.assignTexture(n,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(n.iridescenceIOR=o.iridescenceIor),n.iridescenceThicknessRange===void 0&&(n.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(i.assignTexture(n,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}},ph=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];n.sheenColor=new se(0,0,0),n.sheenRoughness=0,n.sheen=1;let o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){let c=o.sheenColorFactor;n.sheenColor.setRGB(c[0],c[1],c[2],Pt)}return o.sheenRoughnessFactor!==void 0&&(n.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(i.assignTexture(n,"sheenColorMap",o.sheenColorTexture,nt)),o.sheenRoughnessTexture!==void 0&&s.push(i.assignTexture(n,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}},mh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(n.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(i.assignTexture(n,"transmissionMap",o.transmissionTexture)),Promise.all(s)}},gh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];n.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(i.assignTexture(n,"thicknessMap",o.thicknessTexture)),n.attenuationDistance=o.attenuationDistance||1/0;let c=o.attenuationColor||[1,1,1];return n.attenuationColor=new se().setRGB(c[0],c[1],c[2],Pt),Promise.all(s)}},_h=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return n.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},bh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];n.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(i.assignTexture(n,"specularIntensityMap",o.specularTexture));let c=o.specularColorFactor||[1,1,1];return n.specularColor=new se().setRGB(c[0],c[1],c[2],Pt),o.specularColorTexture!==void 0&&s.push(i.assignTexture(n,"specularColorMap",o.specularColorTexture,nt)),Promise.all(s)}},xh=class{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return n.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(i.assignTexture(n,"bumpMap",o.bumpTexture)),Promise.all(s)}},vh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(n.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(n.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(i.assignTexture(n,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}},yh=class{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){let n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],o=n.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return n.loadTextureImage(e,s.source,o)}},Mh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let n=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[n])return null;let o=s.extensions[n],c=r.images[o.source],u=i.textureLoader;if(c.uri){let f=i.options.manager.getHandler(c.uri);f!==null&&(u=f)}return this.detectSupport().then(function(f){if(f)return i.loadTextureImage(e,o.source,u);if(r.extensionsRequired&&r.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let n=new Image;n.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",n.onload=n.onerror=function(){e(n.height===1)}})),this.isSupported}},Sh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let n=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[n])return null;let o=s.extensions[n],c=r.images[o.source],u=i.textureLoader;if(c.uri){let f=i.options.manager.getHandler(c.uri);f!==null&&(u=f)}return this.detectSupport().then(function(f){if(f)return i.loadTextureImage(e,o.source,u);if(r.extensionsRequired&&r.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let n=new Image;n.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",n.onload=n.onerror=function(){e(n.height===1)}})),this.isSupported}},Th=class{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let n=this.parser.json,i=n.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(c){let u=r.byteOffset||0,f=r.byteLength||0,l=r.count,h=r.byteStride,d=new Uint8Array(c,u,f);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(l,h,d,r.mode,r.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(l*h);return o.decodeGltfBuffer(new Uint8Array(p),l,h,d,r.mode,r.filter),p})})}else return null}},wh=class{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let n=this.parser.json,i=n.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=n.meshes[i.mesh];for(let f of r.primitives)if(f.mode!==Xn.TRIANGLES&&f.mode!==Xn.TRIANGLE_STRIP&&f.mode!==Xn.TRIANGLE_FAN&&f.mode!==void 0)return null;let o=i.extensions[this.name].attributes,c=[],u={};for(let f in o)c.push(this.parser.getDependency("accessor",o[f]).then(l=>(u[f]=l,u[f])));return c.length<1?null:(c.push(this.parser.createNodeMesh(e)),Promise.all(c).then(f=>{let l=f.pop(),h=l.isGroup?l.children:[l],d=f[0].count,p=[];for(let _ of h){let b=new we,m=new D,g=new nn,v=new D(1,1,1),x=new di(_.geometry,_.material,d);for(let M=0;M<d;M++)u.TRANSLATION&&m.fromBufferAttribute(u.TRANSLATION,M),u.ROTATION&&g.fromBufferAttribute(u.ROTATION,M),u.SCALE&&v.fromBufferAttribute(u.SCALE,M),x.setMatrixAt(M,b.compose(m,g,v));for(let M in u)if(M==="_COLOR_0"){let w=u[M];x.instanceColor=new Hr(w.array,w.itemSize,w.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&_.geometry.setAttribute(M,u[M]);_t.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),p.push(x)}return l.isGroup?(l.clear(),l.add(...p),l):p[0]}))}},dm="glTF",qa=12,lm={JSON:1313821514,BIN:5130562},Ah=class{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;let n=new DataView(e,0,qa),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:n.getUint32(4,!0),length:n.getUint32(8,!0)},this.header.magic!==dm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-qa,s=new DataView(e,qa),o=0;for(;o<r;){let c=s.getUint32(o,!0);o+=4;let u=s.getUint32(o,!0);if(o+=4,u===lm.JSON){let f=new Uint8Array(e,qa+o,c);this.content=i.decode(f)}else if(u===lm.BIN){let f=qa+o;this.body=e.slice(f,f+c)}o+=c}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Eh=class{constructor(e,n){if(!n)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=n,this.dracoLoader.preload()}decodePrimitive(e,n){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,c={},u={},f={};for(let l in o){let h=Lh[l]||l.toLowerCase();c[h]=o[l]}for(let l in e.attributes){let h=Lh[l]||l.toLowerCase();if(o[l]!==void 0){let d=i.accessors[e.attributes[l]],p=Zs[d.componentType];f[h]=p.name,u[h]=d.normalized===!0}}return n.getDependency("bufferView",s).then(function(l){return new Promise(function(h,d){r.decodeDracoFile(l,function(p){for(let _ in p.attributes){let b=p.attributes[_],m=u[_];m!==void 0&&(b.normalized=m)}h(p)},c,f,Pt,d)})})}},Rh=class{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,n){return(n.texCoord===void 0||n.texCoord===e.channel)&&n.offset===void 0&&n.rotation===void 0&&n.scale===void 0||(e=e.clone(),n.texCoord!==void 0&&(e.channel=n.texCoord),n.offset!==void 0&&e.offset.fromArray(n.offset),n.rotation!==void 0&&(e.rotation=n.rotation),n.scale!==void 0&&e.repeat.fromArray(n.scale),e.needsUpdate=!0),e}},Ch=class{constructor(){this.name=je.KHR_MESH_QUANTIZATION}},Oc=class extends ar{constructor(e,n,i,r){super(e,n,i,r)}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)n[o]=i[s+o];return n}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,c=this.valueSize,u=c*2,f=c*3,l=r-n,h=(i-n)/l,d=h*h,p=d*h,_=e*f,b=_-f,m=-2*p+3*d,g=p-d,v=1-m,x=g-d+h;for(let M=0;M!==c;M++){let w=o[b+M+c],T=o[b+M+u]*l,A=o[_+M+c],C=o[_+M]*l;s[M]=v*w+x*T+m*A+g*C}return s}},qM=new nn,Ph=class extends Oc{interpolate_(e,n,i,r){let s=super.interpolate_(e,n,i,r);return qM.fromArray(s).normalize().toArray(s),s}},Xn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},um={9728:Nt,9729:Rt,9984:jo,9985:Ju,9986:Ea,9987:Ni},hm={33071:fn,33648:Da,10497:fi},ah={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Lh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},YM={CUBICSPLINE:void 0,LINEAR:zr,STEP:ks},oh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function jM(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new xt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:hi})),a.DefaultMaterial}function qr(a,e,n){for(let i in n.extensions)a[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=n.extensions[i])}function fr(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function KM(a,e,n){let i=!1,r=!1,s=!1;for(let f=0,l=e.length;f<l;f++){let h=e[f];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(a);let o=[],c=[],u=[];for(let f=0,l=e.length;f<l;f++){let h=e[f];if(i){let d=h.POSITION!==void 0?n.getDependency("accessor",h.POSITION):a.attributes.position;o.push(d)}if(r){let d=h.NORMAL!==void 0?n.getDependency("accessor",h.NORMAL):a.attributes.normal;c.push(d)}if(s){let d=h.COLOR_0!==void 0?n.getDependency("accessor",h.COLOR_0):a.attributes.color;u.push(d)}}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(u)]).then(function(f){let l=f[0],h=f[1],d=f[2];return i&&(a.morphAttributes.position=l),r&&(a.morphAttributes.normal=h),s&&(a.morphAttributes.color=d),a.morphTargetsRelative=!0,a})}function JM(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let n=0,i=e.weights.length;n<i;n++)a.morphTargetInfluences[n]=e.weights[n];if(e.extras&&Array.isArray(e.extras.targetNames)){let n=e.extras.targetNames;if(a.morphTargetInfluences.length===n.length){a.morphTargetDictionary={};for(let i=0,r=n.length;i<r;i++)a.morphTargetDictionary[n[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ZM(a){let e,n=a.extensions&&a.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(n?e="draco:"+n.bufferView+":"+n.indices+":"+ch(n.attributes):e=a.indices+":"+ch(a.attributes)+":"+a.mode,a.targets!==void 0)for(let i=0,r=a.targets.length;i<r;i++)e+=":"+ch(a.targets[i]);return e}function ch(a){let e="",n=Object.keys(a).sort();for(let i=0,r=n.length;i<r;i++)e+=n[i]+":"+a[n[i]]+";";return e}function Ih(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function QM(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var $M=new we,Dh=class{constructor(e={},n={}){this.json=e,this.extensions={},this.plugins={},this.options=n,this.cache=new XM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=!1,s=-1;typeof navigator!="undefined"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,s=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||i||r&&s<98?this.textureLoader=new js(this.options.manager):this.textureLoader=new wc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ys(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,n){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){let c={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return qr(s,c,r),fr(c,r),Promise.all(i._invokeAll(function(u){return u.afterRoot&&u.afterRoot(c)})).then(function(){e(c)})}).catch(n)}_markDefs(){let e=this.json.nodes||[],n=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=n.length;r<s;r++){let o=n[r].joints;for(let c=0,u=o.length;c<u;c++)e[o[c]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,n){n!==void 0&&(e.refs[n]===void 0&&(e.refs[n]=e.uses[n]=0),e.refs[n]++)}_getNodeRef(e,n,i){if(e.refs[n]<=1)return i;let r=i.clone(),s=(o,c)=>{let u=this.associations.get(o);u!=null&&this.associations.set(c,u);for(let[f,l]of o.children.entries())s(l,c.children[f])};return s(i,r),r.name+="_instance_"+e.uses[n]++,r}_invokeOne(e){let n=Object.values(this.plugins);n.push(this);for(let i=0;i<n.length;i++){let r=e(n[i]);if(r)return r}return null}_invokeAll(e){let n=Object.values(this.plugins);n.unshift(this);let i=[];for(let r=0;r<n.length;r++){let s=e(n[r]);s&&i.push(s)}return i}getDependency(e,n){let i=e+":"+n,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(n);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(n)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(n)});break;case"accessor":r=this.loadAccessor(n);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(n)});break;case"buffer":r=this.loadBuffer(n);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(n)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(n)});break;case"skin":r=this.loadSkin(n);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(n)});break;case"camera":r=this.loadCamera(n);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,n)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let n=this.cache.get(e);if(!n){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];n=Promise.all(r.map(function(s,o){return i.getDependency(e,o)})),this.cache.add(e,n)}return n}loadBuffer(e){let n=this.json.buffers[e],i=this.fileLoader;if(n.type&&n.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+n.type+" buffer type is not supported.");if(n.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,o){i.load(lr.resolveURL(n.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+n.uri+'".'))})})}loadBufferView(e){let n=this.json.bufferViews[e];return this.getDependency("buffer",n.buffer).then(function(i){let r=n.byteLength||0,s=n.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let n=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let o=ah[r.type],c=Zs[r.componentType],u=r.normalized===!0,f=new c(r.count*o);return Promise.resolve(new Ct(f,o,u))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){let c=o[0],u=ah[r.type],f=Zs[r.componentType],l=f.BYTES_PER_ELEMENT,h=l*u,d=r.byteOffset||0,p=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,_=r.normalized===!0,b,m;if(p&&p!==h){let g=Math.floor(d/p),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+g+":"+r.count,x=n.cache.get(v);x||(b=new f(c,g*p,r.count*p/l),x=new ka(b,p/l),n.cache.add(v,x)),m=new Ba(x,u,d%p/l,_)}else c===null?b=new f(r.count*u):b=new f(c,d,r.count*u),m=new Ct(b,u,_);if(r.sparse!==void 0){let g=ah.SCALAR,v=Zs[r.sparse.indices.componentType],x=r.sparse.indices.byteOffset||0,M=r.sparse.values.byteOffset||0,w=new v(o[1],x,r.sparse.count*g),T=new f(o[2],M,r.sparse.count*u);c!==null&&(m=new Ct(m.array.slice(),m.itemSize,m.normalized));for(let A=0,C=w.length;A<C;A++){let y=w[A];if(m.setX(y,T[A*u]),u>=2&&m.setY(y,T[A*u+1]),u>=3&&m.setZ(y,T[A*u+2]),u>=4&&m.setW(y,T[A*u+3]),u>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let n=this.json,i=this.options,s=n.textures[e].source,o=n.images[s],c=this.textureLoader;if(o.uri){let u=i.manager.getHandler(o.uri);u!==null&&(c=u)}return this.loadTextureImage(e,s,c)}loadTextureImage(e,n,i){let r=this,s=this.json,o=s.textures[e],c=s.images[n],u=(c.uri||c.bufferView)+":"+o.sampler;if(this.textureCache[u])return this.textureCache[u];let f=this.loadImageSource(n,i).then(function(l){l.flipY=!1,l.name=o.name||c.name||"",l.name===""&&typeof c.uri=="string"&&c.uri.startsWith("data:image/")===!1&&(l.name=c.uri);let d=(s.samplers||{})[o.sampler]||{};return l.magFilter=um[d.magFilter]||Rt,l.minFilter=um[d.minFilter]||Ni,l.wrapS=hm[d.wrapS]||fi,l.wrapT=hm[d.wrapT]||fi,r.associations.set(l,{textures:e}),l}).catch(function(){return null});return this.textureCache[u]=f,f}loadImageSource(e,n){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=r.images[e],c=self.URL||self.webkitURL,u=o.uri||"",f=!1;if(o.bufferView!==void 0)u=i.getDependency("bufferView",o.bufferView).then(function(h){f=!0;let d=new Blob([h],{type:o.mimeType});return u=c.createObjectURL(d),u});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let l=Promise.resolve(u).then(function(h){return new Promise(function(d,p){let _=d;n.isImageBitmapLoader===!0&&(_=function(b){let m=new Yt(b);m.needsUpdate=!0,d(m)}),n.load(lr.resolveURL(h,s.path),_,void 0,p)})}).then(function(h){return f===!0&&c.revokeObjectURL(u),h.userData.mimeType=o.mimeType||QM(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",u),h});return this.sourceCache[e]=l,l}assignTexture(e,n,i,r){let s=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){let c=i.extensions!==void 0?i.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(c){let u=s.associations.get(o);o=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(o,c),s.associations.set(o,u)}}return r!==void 0&&(o.colorSpace=r),e[n]=o,o})}assignFinalMaterial(e){let n=e.geometry,i=e.material,r=n.attributes.tangent===void 0,s=n.attributes.color!==void 0,o=n.attributes.normal===void 0;if(e.isPoints){let c="PointsMaterial:"+i.uuid,u=this.cache.get(c);u||(u=new Ga,Dn.prototype.copy.call(u,i),u.color.copy(i.color),u.map=i.map,u.sizeAttenuation=!1,this.cache.add(c,u)),i=u}else if(e.isLine){let c="LineBasicMaterial:"+i.uuid,u=this.cache.get(c);u||(u=new Vr,Dn.prototype.copy.call(u,i),u.color.copy(i.color),u.map=i.map,this.cache.add(c,u)),i=u}if(r||s||o){let c="ClonedMaterial:"+i.uuid+":";r&&(c+="derivative-tangents:"),s&&(c+="vertex-colors:"),o&&(c+="flat-shading:");let u=this.cache.get(c);u||(u=i.clone(),s&&(u.vertexColors=!0),o&&(u.flatShading=!0),r&&(u.normalScale&&(u.normalScale.y*=-1),u.clearcoatNormalScale&&(u.clearcoatNormalScale.y*=-1)),this.cache.add(c,u),this.associations.set(u,this.associations.get(i))),i=u}e.material=i}getMaterialType(){return xt}loadMaterial(e){let n=this,i=this.json,r=this.extensions,s=i.materials[e],o,c={},u=s.extensions||{},f=[];if(u[je.KHR_MATERIALS_UNLIT]){let h=r[je.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),f.push(h.extendParams(c,s,n))}else{let h=s.pbrMetallicRoughness||{};if(c.color=new se(1,1,1),c.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;c.color.setRGB(d[0],d[1],d[2],Pt),c.opacity=d[3]}h.baseColorTexture!==void 0&&f.push(n.assignTexture(c,"map",h.baseColorTexture,nt)),c.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,c.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(f.push(n.assignTexture(c,"metalnessMap",h.metallicRoughnessTexture)),f.push(n.assignTexture(c,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),f.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,c)})))}s.doubleSided===!0&&(c.side=xn);let l=s.alphaMode||oh.OPAQUE;if(l===oh.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,l===oh.MASK&&(c.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==bt&&(f.push(n.assignTexture(c,"normalMap",s.normalTexture)),c.normalScale=new me(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;c.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==bt&&(f.push(n.assignTexture(c,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==bt){let h=s.emissiveFactor;c.emissive=new se().setRGB(h[0],h[1],h[2],Pt)}return s.emissiveTexture!==void 0&&o!==bt&&f.push(n.assignTexture(c,"emissiveMap",s.emissiveTexture,nt)),Promise.all(f).then(function(){let h=new o(c);return s.name&&(h.name=s.name),fr(h,s),n.associations.set(h,{materials:e}),s.extensions&&qr(r,h,s),h})}createUniqueName(e){let n=st.sanitizeNodeName(e||"");return n in this.nodeNamesUsed?n+"_"+ ++this.nodeNamesUsed[n]:(this.nodeNamesUsed[n]=0,n)}loadGeometries(e){let n=this,i=this.extensions,r=this.primitiveCache;function s(c){return i[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(c,n).then(function(u){return fm(u,c,n)})}let o=[];for(let c=0,u=e.length;c<u;c++){let f=e[c],l=ZM(f),h=r[l];if(h)o.push(h.promise);else{let d;f.extensions&&f.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=s(f):d=fm(new Ot,f,n),r[l]={primitive:f,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let n=this,i=this.json,r=this.extensions,s=i.meshes[e],o=s.primitives,c=[];for(let u=0,f=o.length;u<f;u++){let l=o[u].material===void 0?jM(this.cache):this.getDependency("material",o[u].material);c.push(l)}return c.push(n.loadGeometries(o)),Promise.all(c).then(function(u){let f=u.slice(0,u.length-1),l=u[u.length-1],h=[];for(let p=0,_=l.length;p<_;p++){let b=l[p],m=o[p],g,v=f[p];if(m.mode===Xn.TRIANGLES||m.mode===Xn.TRIANGLE_STRIP||m.mode===Xn.TRIANGLE_FAN||m.mode===void 0)g=s.isSkinnedMesh===!0?new fc(b,v):new Le(b,v),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Xn.TRIANGLE_STRIP?g.geometry=sh(g.geometry,Pc):m.mode===Xn.TRIANGLE_FAN&&(g.geometry=sh(g.geometry,Wa));else if(m.mode===Xn.LINES)g=new Vs(b,v);else if(m.mode===Xn.LINE_STRIP)g=new Hs(b,v);else if(m.mode===Xn.LINE_LOOP)g=new mc(b,v);else if(m.mode===Xn.POINTS)g=new gc(b,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&JM(g,s),g.name=n.createUniqueName(s.name||"mesh_"+e),fr(g,s),m.extensions&&qr(r,g,m),n.assignFinalMaterial(g),h.push(g)}for(let p=0,_=h.length;p<_;p++)n.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return s.extensions&&qr(r,h[0],s),h[0];let d=new Ln;s.extensions&&qr(r,d,s),n.associations.set(d,{meshes:e});for(let p=0,_=h.length;p<_;p++)d.add(h[p]);return d})}loadCamera(e){let n,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?n=new Ut(Qp.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(n=new rr(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(n.name=this.createUniqueName(i.name)),fr(n,i),Promise.resolve(n)}loadSkin(e){let n=this.json.skins[e],i=[];for(let r=0,s=n.joints.length;r<s;r++)i.push(this._loadNodeShallow(n.joints[r]));return n.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",n.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),o=r,c=[],u=[];for(let f=0,l=o.length;f<l;f++){let h=o[f];if(h){c.push(h);let d=new we;s!==null&&d.fromArray(s.array,f*16),u.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',n.joints[f])}return new pc(c,u)})}loadAnimation(e){let n=this.json,i=this,r=n.animations[e],s=r.name?r.name:"animation_"+e,o=[],c=[],u=[],f=[],l=[];for(let h=0,d=r.channels.length;h<d;h++){let p=r.channels[h],_=r.samplers[p.sampler],b=p.target,m=b.node,g=r.parameters!==void 0?r.parameters[_.input]:_.input,v=r.parameters!==void 0?r.parameters[_.output]:_.output;b.node!==void 0&&(o.push(this.getDependency("node",m)),c.push(this.getDependency("accessor",g)),u.push(this.getDependency("accessor",v)),f.push(_),l.push(b))}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(u),Promise.all(f),Promise.all(l)]).then(function(h){let d=h[0],p=h[1],_=h[2],b=h[3],m=h[4],g=[];for(let v=0,x=d.length;v<x;v++){let M=d[v],w=p[v],T=_[v],A=b[v],C=m[v];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let y=i._createAnimationTracks(M,w,T,A,C);if(y)for(let S=0;S<y.length;S++)g.push(y[S])}return new qs(s,void 0,g)})}createNodeMesh(e){let n=this.json,i=this,r=n.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let o=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(c){if(c.isMesh)for(let u=0,f=r.weights.length;u<f;u++)c.morphTargetInfluences[u]=r.weights[u]}),o})}loadNode(e){let n=this.json,i=this,r=n.nodes[e],s=i._loadNodeShallow(e),o=[],c=r.children||[];for(let f=0,l=c.length;f<l;f++)o.push(i.getDependency("node",c[f]));let u=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),u]).then(function(f){let l=f[0],h=f[1],d=f[2];d!==null&&l.traverse(function(p){p.isSkinnedMesh&&p.bind(d,$M)});for(let p=0,_=h.length;p<_;p++)l.add(h[p]);return l})}_loadNodeShallow(e){let n=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=n.nodes[e],o=s.name?r.createUniqueName(s.name):"",c=[],u=r._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});return u&&c.push(u),s.camera!==void 0&&c.push(r.getDependency("camera",s.camera).then(function(f){return r._getNodeRef(r.cameraCache,s.camera,f)})),r._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){c.push(f)}),this.nodeCache[e]=Promise.all(c).then(function(f){let l;if(s.isBone===!0?l=new za:f.length>1?l=new Ln:f.length===1?l=f[0]:l=new _t,l!==f[0])for(let h=0,d=f.length;h<d;h++)l.add(f[h]);if(s.name&&(l.userData.name=s.name,l.name=o),fr(l,s),s.extensions&&qr(i,l,s),s.matrix!==void 0){let h=new we;h.fromArray(s.matrix),l.applyMatrix4(h)}else s.translation!==void 0&&l.position.fromArray(s.translation),s.rotation!==void 0&&l.quaternion.fromArray(s.rotation),s.scale!==void 0&&l.scale.fromArray(s.scale);return r.associations.has(l)||r.associations.set(l,{}),r.associations.get(l).nodes=e,l}),this.nodeCache[e]}loadScene(e){let n=this.extensions,i=this.json.scenes[e],r=this,s=new Ln;i.name&&(s.name=r.createUniqueName(i.name)),fr(s,i),i.extensions&&qr(n,s,i);let o=i.nodes||[],c=[];for(let u=0,f=o.length;u<f;u++)c.push(r.getDependency("node",o[u]));return Promise.all(c).then(function(u){for(let l=0,h=u.length;l<h;l++)s.add(u[l]);let f=l=>{let h=new Map;for(let[d,p]of r.associations)(d instanceof Dn||d instanceof Yt)&&h.set(d,p);return l.traverse(d=>{let p=r.associations.get(d);p!=null&&h.set(d,p)}),h};return r.associations=f(s),s})}_createAnimationTracks(e,n,i,r,s){let o=[],c=e.name?e.name:e.uuid,u=[];hr[s.path]===hr.weights?e.traverse(function(d){d.morphTargetInfluences&&u.push(d.name?d.name:d.uuid)}):u.push(c);let f;switch(hr[s.path]){case hr.weights:f=Fi;break;case hr.rotation:f=pi;break;case hr.position:case hr.scale:f=ki;break;default:switch(i.itemSize){case 1:f=Fi;break;case 2:case 3:default:f=ki;break}break}let l=r.interpolation!==void 0?YM[r.interpolation]:zr,h=this._getArrayFromAccessor(i);for(let d=0,p=u.length;d<p;d++){let _=new f(u[d]+"."+hr[s.path],n.array,h,l);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let n=e.array;if(e.normalized){let i=Ih(n.constructor),r=new Float32Array(n.length);for(let s=0,o=n.length;s<o;s++)r[s]=n[s]*i;n=r}return n}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof pi?Ph:Oc;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function eS(a,e,n){let i=e.attributes,r=new vn;if(i.POSITION!==void 0){let c=n.json.accessors[i.POSITION],u=c.min,f=c.max;if(u!==void 0&&f!==void 0){if(r.set(new D(u[0],u[1],u[2]),new D(f[0],f[1],f[2])),c.normalized){let l=Ih(Zs[c.componentType]);r.min.multiplyScalar(l),r.max.multiplyScalar(l)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let c=new D,u=new D;for(let f=0,l=s.length;f<l;f++){let h=s[f];if(h.POSITION!==void 0){let d=n.json.accessors[h.POSITION],p=d.min,_=d.max;if(p!==void 0&&_!==void 0){if(u.setX(Math.max(Math.abs(p[0]),Math.abs(_[0]))),u.setY(Math.max(Math.abs(p[1]),Math.abs(_[1]))),u.setZ(Math.max(Math.abs(p[2]),Math.abs(_[2]))),d.normalized){let b=Ih(Zs[d.componentType]);u.multiplyScalar(b)}c.max(u)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(c)}a.boundingBox=r;let o=new In;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,a.boundingSphere=o}function fm(a,e,n){let i=e.attributes,r=[];function s(o,c){return n.getDependency("accessor",o).then(function(u){a.setAttribute(c,u)})}for(let o in i){let c=Lh[o]||o.toLowerCase();c in a.attributes||r.push(s(i[o],c))}if(e.indices!==void 0&&!a.index){let o=n.getDependency("accessor",e.indices).then(function(c){a.setIndex(c)});r.push(o)}return Ze.workingColorSpace!==Pt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),fr(a,e),eS(a,e,n),Promise.all(r).then(function(){return e.targets!==void 0?KM(a,e.targets,n):a})}var Nc=class extends Mc{constructor(e){super(e),this.type=Vt}parse(e){let o=function(C,y){switch(C){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(y||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(y||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(y||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(y||""))}},l=`
`,h=function(C,y,S){y=y||1024;let F=C.pos,V=-1,I=0,U="",k=String.fromCharCode.apply(null,new Uint16Array(C.subarray(F,F+128)));for(;0>(V=k.indexOf(l))&&I<y&&F<C.byteLength;)U+=k,I+=k.length,F+=128,k+=String.fromCharCode.apply(null,new Uint16Array(C.subarray(F,F+128)));return-1<V?(S!==!1&&(C.pos+=I+V+1),U+k.slice(0,V)):!1},d=function(C){let y=/^#\?(\S+)/,S=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,N=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,F=/^\s*FORMAT=(\S+)\s*$/,V=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,I={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},U,k;for((C.pos>=C.byteLength||!(U=h(C)))&&o(1,"no header found"),(k=U.match(y))||o(3,"bad initial token"),I.valid|=1,I.programtype=k[1],I.string+=U+`
`;U=h(C),U!==!1;){if(I.string+=U+`
`,U.charAt(0)==="#"){I.comments+=U+`
`;continue}if((k=U.match(S))&&(I.gamma=parseFloat(k[1])),(k=U.match(N))&&(I.exposure=parseFloat(k[1])),(k=U.match(F))&&(I.valid|=2,I.format=k[1]),(k=U.match(V))&&(I.valid|=4,I.height=parseInt(k[1],10),I.width=parseInt(k[2],10)),I.valid&2&&I.valid&4)break}return I.valid&2||o(3,"missing format specifier"),I.valid&4||o(3,"missing image size specifier"),I},p=function(C,y,S){let N=y;if(N<8||N>32767||C[0]!==2||C[1]!==2||C[2]&128)return new Uint8Array(C);N!==(C[2]<<8|C[3])&&o(3,"wrong scanline width");let F=new Uint8Array(4*y*S);F.length||o(4,"unable to allocate buffer space");let V=0,I=0,U=4*N,k=new Uint8Array(4),Y=new Uint8Array(U),K=S;for(;K>0&&I<C.byteLength;){I+4>C.byteLength&&o(1),k[0]=C[I++],k[1]=C[I++],k[2]=C[I++],k[3]=C[I++],(k[0]!=2||k[1]!=2||(k[2]<<8|k[3])!=N)&&o(3,"bad rgbe scanline format");let j=0,J;for(;j<U&&I<C.byteLength;){J=C[I++];let re=J>128;if(re&&(J-=128),(J===0||j+J>U)&&o(3,"bad scanline data"),re){let X=C[I++];for(let Z=0;Z<J;Z++)Y[j++]=X}else Y.set(C.subarray(I,I+J),j),j+=J,I+=J}let Q=N;for(let re=0;re<Q;re++){let X=0;F[V]=Y[re+X],X+=N,F[V+1]=Y[re+X],X+=N,F[V+2]=Y[re+X],X+=N,F[V+3]=Y[re+X],V+=4}K--}return F},_=function(C,y,S,N){let F=C[y+3],V=Math.pow(2,F-128)/255;S[N+0]=C[y+0]*V,S[N+1]=C[y+1]*V,S[N+2]=C[y+2]*V,S[N+3]=1},b=function(C,y,S,N){let F=C[y+3],V=Math.pow(2,F-128)/255;S[N+0]=Xa.toHalfFloat(Math.min(C[y+0]*V,65504)),S[N+1]=Xa.toHalfFloat(Math.min(C[y+1]*V,65504)),S[N+2]=Xa.toHalfFloat(Math.min(C[y+2]*V,65504)),S[N+3]=Xa.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let g=d(m),v=g.width,x=g.height,M=p(m.subarray(m.pos),v,x),w,T,A;switch(this.type){case Pn:A=M.length/4;let C=new Float32Array(A*4);for(let S=0;S<A;S++)_(M,S*4,C,S*4);w=C,T=Pn;break;case Vt:A=M.length/4;let y=new Uint16Array(A*4);for(let S=0;S<A;S++)b(M,S*4,y,S*4);w=y,T=Vt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:v,height:x,data:w,header:g.string,gamma:g.gamma,exposure:g.exposure,type:T}}setDataType(e){return this.type=e,this}load(e,n,i,r){function s(o,c){switch(o.type){case Pn:case Vt:o.colorSpace=Pt,o.minFilter=Rt,o.magFilter=Rt,o.generateMipmaps=!1,o.flipY=!0;break}n&&n(o,c)}return super.load(e,s,i,r)}};var pm=function(){"use strict";var a="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",n=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(n)?e:a,s,o=WebAssembly.instantiate(c(r),{}).then(function(g){s=g.instance,s.exports.__wasm_call_ctors()});function c(g){for(var v=new Uint8Array(g.length),x=0;x<g.length;++x){var M=g.charCodeAt(x);v[x]=M>96?M-97:M>64?M-39:M+4}for(var w=0,x=0;x<g.length;++x)v[w++]=v[x]<60?i[v[x]]:(v[x]-60)*64+v[++x];return v.buffer.slice(0,w)}function u(g,v,x,M,w,T){var A=s.exports.sbrk,C=x+3&-4,y=A(C*M),S=A(w.length),N=new Uint8Array(s.exports.memory.buffer);N.set(w,S);var F=g(y,x,M,S,w.length);if(F==0&&T&&T(y,C,M),v.set(N.subarray(y,y+x*M)),A(y-A(0)),F!=0)throw new Error("Malformed buffer data: "+F)}var f={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},l={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],d=0;function p(g){var v={object:new Worker(g),pending:0,requests:{}};return v.object.onmessage=function(x){var M=x.data;v.pending-=M.count,v.requests[M.id][M.action](M.value),delete v.requests[M.id]},v}function _(g){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(c(r))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+u.toString()+m.toString(),x=new Blob([v],{type:"text/javascript"}),M=URL.createObjectURL(x),w=0;w<g;++w)h[w]=p(M);URL.revokeObjectURL(M)}function b(g,v,x,M,w){for(var T=h[0],A=1;A<h.length;++A)h[A].pending<T.pending&&(T=h[A]);return new Promise(function(C,y){var S=new Uint8Array(x),N=d++;T.pending+=g,T.requests[N]={resolve:C,reject:y},T.object.postMessage({id:N,count:g,size:v,source:S,mode:M,filter:w},[S.buffer])})}function m(g){o.then(function(){var v=g.data;try{var x=new Uint8Array(v.count*v.size);u(s.exports[v.mode],x,v.count,v.size,v.source,s.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:x},[x.buffer])}catch(M){self.postMessage({id:v.id,count:v.count,action:"reject",value:M})}})}return{ready:o,supported:!0,useWorkers:function(g){_(g)},decodeVertexBuffer:function(g,v,x,M,w){u(s.exports.meshopt_decodeVertexBuffer,g,v,x,M,s.exports[f[w]])},decodeIndexBuffer:function(g,v,x,M){u(s.exports.meshopt_decodeIndexBuffer,g,v,x,M)},decodeIndexSequence:function(g,v,x,M){u(s.exports.meshopt_decodeIndexSequence,g,v,x,M)},decodeGltfBuffer:function(g,v,x,M,w,T){u(s.exports[l[w]],g,v,x,M,s.exports[f[T]])},decodeGltfBufferAsync:function(g,v,x,M,w){return h.length>0?b(g,v,x,l[M],f[w]):o.then(function(){var T=new Uint8Array(g*v);return u(s.exports[l[M]],T,g,v,x,s.exports[f[w]]),T})}}}();var Uc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var On=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},tS=new rr(-1,1,1,-1,0,1),Oh=class extends Ot{constructor(){super(),this.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ot([0,2,0,0,2,0],2))}},nS=new Oh,dr=class{constructor(e){this._mesh=new Le(nS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,tS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Qs=class extends On{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ur.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new dr(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Ya=class extends On{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(c),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Fc=class extends On{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var kc=class{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){let i=e.getSize(new me);this._width=i.width,this._height=i.height,n=new jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Vt}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qs(Uc),this.copyPass.material.blending=ui,this.clock=new Ac}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let n=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let c=this.renderer.getContext(),u=this.renderer.state.buffers.stencil;u.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),u.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Ya!==void 0&&(o instanceof Ya?i=!0:o instanceof Fc&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){let n=this.renderer.getSize(new me);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Bc=class extends On{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new se}render(e,n,i){let r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}};var mm={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new se(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var $s=class a extends On{constructor(e,n,i,r){super(),this.strength=n!==void 0?n:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new me(e.x,e.y):new me(256,256),this.clearColor=new se(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new jt(s,o,{type:Vt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new jt(s,o,{type:Vt});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let p=new jt(s,o,{type:Vt});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),o=Math.round(o/2)}let c=mm;this.highPassUniforms=ur.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Lt({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let u=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(u[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new me(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;let f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let l=Uc;this.copyUniforms=ur.clone(l.uniforms),this.blendMaterial=new Lt({uniforms:this.copyUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader,blending:Br,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new se,this.oldClearAlpha=1,this.basic=new bt,this.fsQuad=new dr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new me(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let c=this.renderTargetBright;for(let u=0;u<this.nMips;u++)this.fsQuad.material=this.separableBlurMaterials[u],this.separableBlurMaterials[u].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[u].uniforms.direction.value=a.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[u]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[u].uniforms.colorTexture.value=this.renderTargetsHorizontal[u].texture,this.separableBlurMaterials[u].uniforms.direction.value=a.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[u]),e.clear(),this.fsQuad.render(e),c=this.renderTargetsVertical[u];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){let n=[];for(let i=0;i<e;i++)n.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new Lt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new me(.5,.5)},direction:{value:new me(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};$s.BlurDirectionX=new me(1,0);$s.BlurDirectionY=new me(0,1);var gm={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var zc=class extends On{constructor(){super();let e=gm;this.uniforms=ur.clone(e.uniforms),this.material=new xc({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new dr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,n,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===rt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===qu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Yu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ju?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Va?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ku&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};function zi(a){if(a===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function Tm(a,e){a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.__proto__=e}var Tn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ta={duration:.5,overwrite:!1,delay:0},$h,rn,dt,Yn=1e8,ft=1/Yn,Hh=Math.PI*2,iS=Hh/4,rS=0,wm=Math.sqrt,sS=Math.cos,aS=Math.sin,Bt=function(e){return typeof e=="string"},Tt=function(e){return typeof e=="function"},Hi=function(e){return typeof e=="number"},Jc=function(e){return typeof e=="undefined"},bi=function(e){return typeof e=="object"},Sn=function(e){return e!==!1},ef=function(){return typeof window!="undefined"},Gc=function(e){return Tt(e)||Bt(e)},Am=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},sn=Array.isArray,Vh=/(?:-?\.?\d|\.)+/gi,tf=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Zr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Nh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,nf=/[+-]=-?[.\d]+/,Em=/[^,'"\[\]\s]+/gi,oS=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,vt,gi,Wh,rf,Un={},Xc={},Rm,Cm=function(e){return(Xc=Jr(e,Un))&&an},Zc=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},$a=function(e,n){return!n&&console.warn(e)},Pm=function(e,n){return e&&(Un[e]=n)&&Xc&&(Xc[e]=n)||Un},eo=function(){return 0},cS={suppressEvents:!0,isStart:!0,kill:!1},Hc={suppressEvents:!0,kill:!1},lS={suppressEvents:!0},sf={},mr=[],Xh={},Lm,yn={},Uh={},_m=30,Vc=[],af="",of=function(e){var n=e[0],i,r;if(bi(n)||Tt(n)||(e=[e]),!(i=(n._gsap||{}).harness)){for(r=Vc.length;r--&&!Vc[r].targetTest(n););i=Vc[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new uf(e[r],i)))||e.splice(r,1);return e},gr=function(e){return e._gsap||of(jn(e))[0]._gsap},cf=function(e,n,i){return(i=e[n])&&Tt(i)?e[n]():Jc(i)&&e.getAttribute&&e.getAttribute(n)||i},pn=function(e,n){return(e=e.split(",")).forEach(n)||e},wt=function(e){return Math.round(e*1e5)/1e5||0},Wt=function(e){return Math.round(e*1e7)/1e7||0},Qr=function(e,n){var i=n.charAt(0),r=parseFloat(n.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},uS=function(e,n){for(var i=n.length,r=0;e.indexOf(n[r])<0&&++r<i;);return r<i},qc=function(){var e=mr.length,n=mr.slice(0),i,r;for(Xh={},mr.length=0,i=0;i<e;i++)r=n[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Im=function(e,n,i,r){mr.length&&!rn&&qc(),e.render(n,i,r||rn&&n<0&&(e._initted||e._startAt)),mr.length&&!rn&&qc()},Dm=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(Em).length<2?n:Bt(e)?e.trim():e},Om=function(e){return e},Kn=function(e,n){for(var i in n)i in e||(e[i]=n[i]);return e},hS=function(e){return function(n,i){for(var r in i)r in n||r==="duration"&&e||r==="ease"||(n[r]=i[r])}},Jr=function(e,n){for(var i in n)e[i]=n[i];return e},bm=function a(e,n){for(var i in n)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=bi(n[i])?a(e[i]||(e[i]={}),n[i]):n[i]);return e},Yc=function(e,n){var i={},r;for(r in e)r in n||(i[r]=e[r]);return i},Ja=function(e){var n=e.parent||vt,i=e.keyframes?hS(sn(e.keyframes)):Kn;if(Sn(e.inherit))for(;n;)i(e,n.vars.defaults),n=n.parent||n._dp;return e},fS=function(e,n){for(var i=e.length,r=i===n.length;r&&i--&&e[i]===n[i];);return i<0},Nm=function(e,n,i,r,s){i===void 0&&(i="_first"),r===void 0&&(r="_last");var o=e[r],c;if(s)for(c=n[s];o&&o[s]>c;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=e[i],e[i]=n),n._next?n._next._prev=n:e[r]=n,n._prev=o,n.parent=n._dp=e,n},Qc=function(e,n,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=n._prev,o=n._next;s?s._next=o:e[i]===n&&(e[i]=o),o?o._prev=s:e[r]===n&&(e[r]=s),n._next=n._prev=n.parent=null},_r=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Yr=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},dS=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},qh=function(e,n,i,r){return e._startAt&&(rn?e._startAt.revert(Hc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,r))},pS=function a(e){return!e||e._ts&&a(e.parent)},xm=function(e){return e._repeat?na(e._tTime,e=e.duration()+e._rDelay)*e:0},na=function(e,n){var i=Math.floor(e/=n);return e&&i===e?i-1:i},jc=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},$c=function(e){return e._end=Wt(e._start+(e._tDur/Math.abs(e._ts||e._rts||ft)||0))},el=function(e,n){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Wt(i._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),$c(e),i._dirty||Yr(i,e)),e},Um=function(e,n){var i;if((n._time||!n._dur&&n._initted||n._start<e._time&&(n._dur||!n.add))&&(i=jc(e.rawTime(),n),(!n._dur||io(0,n.totalDuration(),i)-n._tTime>ft)&&n.render(i,!0)),Yr(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-ft}},_i=function(e,n,i,r){return n.parent&&_r(n),n._start=Wt((Hi(i)?i:i||e!==vt?qn(e,i,n):e._time)+n._delay),n._end=Wt(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),Nm(e,n,"_first","_last",e._sort?"_start":0),Yh(n)||(e._recent=n),r||Um(e,n),e._ts<0&&el(e,e._tTime),e},Fm=function(e,n){return(Un.ScrollTrigger||Zc("scrollTrigger",n))&&Un.ScrollTrigger.create(n,e)},km=function(e,n,i,r,s){if(df(e,n,s),!e._initted)return 1;if(!i&&e._pt&&!rn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Lm!==Mn.frame)return mr.push(e),e._lazy=[s,r],1},mS=function a(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||a(n))},Yh=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},gS=function(e,n,i,r){var s=e.ratio,o=n<0||!n&&(!e._start&&mS(e)&&!(!e._initted&&Yh(e))||(e._ts<0||e._dp._ts<0)&&!Yh(e))?0:1,c=e._rDelay,u=0,f,l,h;if(c&&e._repeat&&(u=io(0,e._tDur,n),l=na(u,c),e._yoyo&&l&1&&(o=1-o),l!==na(e._tTime,c)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||rn||r||e._zTime===ft||!n&&e._zTime){if(!e._initted&&km(e,n,r,i,u))return;for(h=e._zTime,e._zTime=n||(i?ft:0),i||(i=n&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=u,f=e._pt;f;)f.r(o,f.d),f=f._next;n<0&&qh(e,n,i,!0),e._onUpdate&&!i&&Nn(e,"onUpdate"),u&&e._repeat&&!i&&e.parent&&Nn(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===o&&(o&&_r(e,1),!i&&!rn&&(Nn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},_S=function(e,n,i){var r;if(i>n)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>n)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<n)return r;r=r._prev}},ia=function(e,n,i,r){var s=e._repeat,o=Wt(n)||0,c=e._tTime/e._tDur;return c&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Wt(o*(s+1)+e._rDelay*s):o,c>0&&!r&&el(e,e._tTime=e._tDur*c),e.parent&&$c(e),i||Yr(e.parent,e),e},vm=function(e){return e instanceof Kt?Yr(e):ia(e,e._dur)},bS={_start:0,endTime:eo,totalDuration:eo},qn=function a(e,n,i){var r=e.labels,s=e._recent||bS,o=e.duration()>=Yn?s.endTime(!1):e._dur,c,u,f;return Bt(n)&&(isNaN(n)||n in r)?(u=n.charAt(0),f=n.substr(-1)==="%",c=n.indexOf("="),u==="<"||u===">"?(c>=0&&(n=n.replace(/=/,"")),(u==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(f?(c<0?s:i).totalDuration()/100:1)):c<0?(n in r||(r[n]=o),r[n]):(u=parseFloat(n.charAt(c-1)+n.substr(c+1)),f&&i&&(u=u/100*(sn(i)?i[0]:i).totalDuration()),c>1?a(e,n.substr(0,c-1),i)+u:o+u)):n==null?o:+n},Za=function(e,n,i){var r=Hi(n[1]),s=(r?2:1)+(e<2?0:1),o=n[s],c,u;if(r&&(o.duration=n[1]),o.parent=i,e){for(c=o,u=i;u&&!("immediateRender"in c);)c=u.vars.defaults||{},u=Sn(u.vars.inherit)&&u.parent;o.immediateRender=Sn(c.immediateRender),e<2?o.runBackwards=1:o.startAt=n[s-1]}return new It(n[0],o,n[s+1])},br=function(e,n){return e||e===0?n(e):n},io=function(e,n,i){return i<e?e:i>n?n:i},Jt=function(e,n){return!Bt(e)||!(n=oS.exec(e))?"":n[1]},xS=function(e,n,i){return br(i,function(r){return io(e,n,r)})},jh=[].slice,Bm=function(e,n){return e&&bi(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&bi(e[0]))&&!e.nodeType&&e!==gi},vS=function(e,n,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Bt(r)&&!n||Bm(r,1)?(s=i).push.apply(s,jn(r)):i.push(r)})||i},jn=function(e,n,i){return dt&&!n&&dt.selector?dt.selector(e):Bt(e)&&!i&&(Wh||!ra())?jh.call((n||rf).querySelectorAll(e),0):sn(e)?vS(e,i):Bm(e)?jh.call(e,0):e?[e]:[]},Kh=function(e){return e=jn(e)[0]||$a("Invalid scope")||{},function(n){var i=e.current||e.nativeElement||e;return jn(n,i.querySelectorAll?i:i===e?$a("Invalid scope")||rf.createElement("div"):e)}},zm=function(e){return e.sort(function(){return .5-Math.random()})},Gm=function(e){if(Tt(e))return e;var n=bi(e)?e:{each:e},i=jr(n.ease),r=n.from||0,s=parseFloat(n.base)||0,o={},c=r>0&&r<1,u=isNaN(r)||c,f=n.axis,l=r,h=r;return Bt(r)?l=h={center:.5,edges:.5,end:1}[r]||0:!c&&u&&(l=r[0],h=r[1]),function(d,p,_){var b=(_||n).length,m=o[b],g,v,x,M,w,T,A,C,y;if(!m){if(y=n.grid==="auto"?0:(n.grid||[1,Yn])[1],!y){for(A=-Yn;A<(A=_[y++].getBoundingClientRect().left)&&y<b;);y<b&&y--}for(m=o[b]=[],g=u?Math.min(y,b)*l-.5:r%y,v=y===Yn?0:u?b*h/y-.5:r/y|0,A=0,C=Yn,T=0;T<b;T++)x=T%y-g,M=v-(T/y|0),m[T]=w=f?Math.abs(f==="y"?M:x):wm(x*x+M*M),w>A&&(A=w),w<C&&(C=w);r==="random"&&zm(m),m.max=A-C,m.min=C,m.v=b=(parseFloat(n.amount)||parseFloat(n.each)*(y>b?b-1:f?f==="y"?b/y:y:Math.max(y,b/y))||0)*(r==="edges"?-1:1),m.b=b<0?s-b:s,m.u=Jt(n.amount||n.each)||0,i=i&&b<0?Jm(i):i}return b=(m[d]-m.min)/m.max||0,Wt(m.b+(i?i(b):b)*m.v)+m.u}},Jh=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Wt(Math.round(parseFloat(i)/e)*e*n);return(r-r%1)/n+(Hi(i)?0:Jt(i))}},Hm=function(e,n){var i=sn(e),r,s;return!i&&bi(e)&&(r=i=e.radius||Yn,e.values?(e=jn(e.values),(s=!Hi(e[0]))&&(r*=r)):e=Jh(e.increment)),br(n,i?Tt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var c=parseFloat(s?o.x:o),u=parseFloat(s?o.y:0),f=Yn,l=0,h=e.length,d,p;h--;)s?(d=e[h].x-c,p=e[h].y-u,d=d*d+p*p):d=Math.abs(e[h]-c),d<f&&(f=d,l=h);return l=!r||f<=r?e[l]:o,s||l===o||Hi(o)?l:l+Jt(o)}:Jh(e))},Vm=function(e,n,i,r){return br(sn(e)?!n:i===!0?!!(i=0):!r,function(){return sn(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(n-e+i*.99))/i)*i*r)/r})},yS=function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return function(r){return n.reduce(function(s,o){return o(s)},r)}},MS=function(e,n){return function(i){return e(parseFloat(i))+(n||Jt(i))}},SS=function(e,n,i){return Xm(e,n,0,1,i)},Wm=function(e,n,i){return br(i,function(r){return e[~~n(r)]})},TS=function a(e,n,i){var r=n-e;return sn(e)?Wm(e,a(0,e.length),n):br(i,function(s){return(r+(s-e)%r)%r+e})},wS=function a(e,n,i){var r=n-e,s=r*2;return sn(e)?Wm(e,a(0,e.length-1),n):br(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},sa=function(e){for(var n=0,i="",r,s,o,c;~(r=e.indexOf("random(",n));)o=e.indexOf(")",r),c=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(c?Em:Vh),i+=e.substr(n,r-n)+Vm(c?s:+s[0],c?0:+s[1],+s[2]||1e-5),n=o+1;return i+e.substr(n,e.length-n)},Xm=function(e,n,i,r,s){var o=n-e,c=r-i;return br(s,function(u){return i+((u-e)/o*c||0)})},AS=function a(e,n,i,r){var s=isNaN(e+n)?0:function(p){return(1-p)*e+p*n};if(!s){var o=Bt(e),c={},u,f,l,h,d;if(i===!0&&(r=1)&&(i=null),o)e={p:e},n={p:n};else if(sn(e)&&!sn(n)){for(l=[],h=e.length,d=h-2,f=1;f<h;f++)l.push(a(e[f-1],e[f]));h--,s=function(_){_*=h;var b=Math.min(d,~~_);return l[b](_-b)},i=n}else r||(e=Jr(sn(e)?[]:{},e));if(!l){for(u in n)hf.call(c,e,u,"get",n[u]);s=function(_){return gf(_,c)||(o?e.p:e)}}}return br(i,s)},ym=function(e,n,i){var r=e.labels,s=Yn,o,c,u;for(o in r)c=r[o]-n,c<0==!!i&&c&&s>(c=Math.abs(c))&&(u=o,s=c);return u},Nn=function(e,n,i){var r=e.vars,s=r[n],o=dt,c=e._ctx,u,f,l;if(s)return u=r[n+"Params"],f=r.callbackScope||e,i&&mr.length&&qc(),c&&(dt=c),l=u?s.apply(f,u):s.call(f),dt=o,l},ja=function(e){return _r(e),e.scrollTrigger&&e.scrollTrigger.kill(!!rn),e.progress()<1&&Nn(e,"onInterrupt"),e},ea,qm=[],Ym=function(e){if(e)if(e=!e.name&&e.default||e,ef()||e.headless){var n=e.name,i=Tt(e),r=n&&!i&&e.init?function(){this._props=[]}:e,s={init:eo,render:gf,add:hf,kill:HS,modifier:GS,rawVars:0},o={targetTest:0,get:0,getSetter:tl,aliases:{},register:0};if(ra(),e!==r){if(yn[n])return;Kn(r,Kn(Yc(e,s),o)),Jr(r.prototype,Jr(s,Yc(e,o))),yn[r.prop=n]=r,e.targetTest&&(Vc.push(r),sf[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}Pm(n,r),e.register&&e.register(an,r,mn)}else qm.push(e)},ct=255,Ka={aqua:[0,ct,ct],lime:[0,ct,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ct],navy:[0,0,128],white:[ct,ct,ct],olive:[128,128,0],yellow:[ct,ct,0],orange:[ct,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ct,0,0],pink:[ct,192,203],cyan:[0,ct,ct],transparent:[ct,ct,ct,0]},Fh=function(e,n,i){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(i-n)*e*6:e<.5?i:e*3<2?n+(i-n)*(2/3-e)*6:n)*ct+.5|0},jm=function(e,n,i){var r=e?Hi(e)?[e>>16,e>>8&ct,e&ct]:0:Ka.black,s,o,c,u,f,l,h,d,p,_;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ka[e])r=Ka[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),c=e.charAt(3),e="#"+s+s+o+o+c+c+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&ct,r&ct,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&ct,e&ct]}else if(e.substr(0,3)==="hsl"){if(r=_=e.match(Vh),!n)u=+r[0]%360/360,f=+r[1]/100,l=+r[2]/100,o=l<=.5?l*(f+1):l+f-l*f,s=l*2-o,r.length>3&&(r[3]*=1),r[0]=Fh(u+1/3,s,o),r[1]=Fh(u,s,o),r[2]=Fh(u-1/3,s,o);else if(~e.indexOf("="))return r=e.match(tf),i&&r.length<4&&(r[3]=1),r}else r=e.match(Vh)||Ka.transparent;r=r.map(Number)}return n&&!_&&(s=r[0]/ct,o=r[1]/ct,c=r[2]/ct,h=Math.max(s,o,c),d=Math.min(s,o,c),l=(h+d)/2,h===d?u=f=0:(p=h-d,f=l>.5?p/(2-h-d):p/(h+d),u=h===s?(o-c)/p+(o<c?6:0):h===o?(c-s)/p+2:(s-o)/p+4,u*=60),r[0]=~~(u+.5),r[1]=~~(f*100+.5),r[2]=~~(l*100+.5)),i&&r.length<4&&(r[3]=1),r},Km=function(e){var n=[],i=[],r=-1;return e.split(Gi).forEach(function(s){var o=s.match(Zr)||[];n.push.apply(n,o),i.push(r+=o.length+1)}),n.c=i,n},Mm=function(e,n,i){var r="",s=(e+r).match(Gi),o=n?"hsla(":"rgba(",c=0,u,f,l,h;if(!s)return e;if(s=s.map(function(d){return(d=jm(d,n,1))&&o+(n?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),i&&(l=Km(e),u=i.c,u.join(r)!==l.c.join(r)))for(f=e.replace(Gi,"1").split(Zr),h=f.length-1;c<h;c++)r+=f[c]+(~u.indexOf(c)?s.shift()||o+"0,0,0,0)":(l.length?l:s.length?s:i).shift());if(!f)for(f=e.split(Gi),h=f.length-1;c<h;c++)r+=f[c]+s[c];return r+f[h]},Gi=function(){var a="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ka)a+="|"+e+"\\b";return new RegExp(a+")","gi")}(),ES=/hsl[a]?\(/,lf=function(e){var n=e.join(" "),i;if(Gi.lastIndex=0,Gi.test(n))return i=ES.test(n),e[1]=Mm(e[1],i),e[0]=Mm(e[0],i,Km(e[1])),!0},to,Mn=function(){var a=Date.now,e=500,n=33,i=a(),r=i,s=1e3/240,o=s,c=[],u,f,l,h,d,p,_=function b(m){var g=a()-r,v=m===!0,x,M,w,T;if((g>e||g<0)&&(i+=g-n),r+=g,w=r-i,x=w-o,(x>0||v)&&(T=++h.frame,d=w-h.time*1e3,h.time=w=w/1e3,o+=x+(x>=s?4:s-x),M=1),v||(u=f(b)),M)for(p=0;p<c.length;p++)c[p](w,d,T,m)};return h={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){Rm&&(!Wh&&ef()&&(gi=Wh=window,rf=gi.document||{},Un.gsap=an,(gi.gsapVersions||(gi.gsapVersions=[])).push(an.version),Cm(Xc||gi.GreenSockGlobals||!gi.gsap&&gi||{}),qm.forEach(Ym)),l=typeof requestAnimationFrame!="undefined"&&requestAnimationFrame,u&&h.sleep(),f=l||function(m){return setTimeout(m,o-h.time*1e3+1|0)},to=1,_(2))},sleep:function(){(l?cancelAnimationFrame:clearTimeout)(u),to=0,f=eo},lagSmoothing:function(m,g){e=m||1/0,n=Math.min(g||33,e)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,g,v){var x=g?function(M,w,T,A){m(M,w,T,A),h.remove(x)}:m;return h.remove(m),c[v?"unshift":"push"](x),ra(),x},remove:function(m,g){~(g=c.indexOf(m))&&c.splice(g,1)&&p>=g&&p--},_listeners:c},h}(),ra=function(){return!to&&Mn.wake()},Ke={},RS=/^[\d.\-M][\d.\-,\s]/,CS=/["']/g,PS=function(e){for(var n={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,c,u,f;s<o;s++)u=i[s],c=s!==o-1?u.lastIndexOf(","):u.length,f=u.substr(0,c),n[r]=isNaN(f)?f.replace(CS,"").trim():+f,r=u.substr(c+1).trim();return n},LS=function(e){var n=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",n);return e.substring(n,~r&&r<i?e.indexOf(")",i+1):i)},IS=function(e){var n=(e+"").split("("),i=Ke[n[0]];return i&&n.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[PS(n[1])]:LS(e).split(",").map(Dm)):Ke._CE&&RS.test(e)?Ke._CE("",e):i},Jm=function(e){return function(n){return 1-e(1-n)}},Zm=function a(e,n){for(var i=e._first,r;i;)i instanceof Kt?a(i,n):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==n&&(i.timeline?a(i.timeline,n):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=n)),i=i._next},jr=function(e,n){return e&&(Tt(e)?e:Ke[e]||IS(e))||n},$r=function(e,n,i,r){i===void 0&&(i=function(u){return 1-n(1-u)}),r===void 0&&(r=function(u){return u<.5?n(u*2)/2:1-n((1-u)*2)/2});var s={easeIn:n,easeOut:i,easeInOut:r},o;return pn(e,function(c){Ke[c]=Un[c]=s,Ke[o=c.toLowerCase()]=i;for(var u in s)Ke[o+(u==="easeIn"?".in":u==="easeOut"?".out":".inOut")]=Ke[c+"."+u]=s[u]}),s},Qm=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},kh=function a(e,n,i){var r=n>=1?n:1,s=(i||(e?.3:.45))/(n<1?n:1),o=s/Hh*(Math.asin(1/r)||0),c=function(l){return l===1?1:r*Math.pow(2,-10*l)*aS((l-o)*s)+1},u=e==="out"?c:e==="in"?function(f){return 1-c(1-f)}:Qm(c);return s=Hh/s,u.config=function(f,l){return a(e,f,l)},u},Bh=function a(e,n){n===void 0&&(n=1.70158);var i=function(o){return o?--o*o*((n+1)*o+n)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:Qm(i);return r.config=function(s){return a(e,s)},r};pn("Linear,Quad,Cubic,Quart,Quint,Strong",function(a,e){var n=e<5?e+1:e;$r(a+",Power"+(n-1),e?function(i){return Math.pow(i,n)}:function(i){return i},function(i){return 1-Math.pow(1-i,n)},function(i){return i<.5?Math.pow(i*2,n)/2:1-Math.pow((1-i)*2,n)/2})});Ke.Linear.easeNone=Ke.none=Ke.Linear.easeIn;$r("Elastic",kh("in"),kh("out"),kh());(function(a,e){var n=1/e,i=2*n,r=2.5*n,s=function(c){return c<n?a*c*c:c<i?a*Math.pow(c-1.5/e,2)+.75:c<r?a*(c-=2.25/e)*c+.9375:a*Math.pow(c-2.625/e,2)+.984375};$r("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);$r("Expo",function(a){return a?Math.pow(2,10*(a-1)):0});$r("Circ",function(a){return-(wm(1-a*a)-1)});$r("Sine",function(a){return a===1?1:-sS(a*iS)+1});$r("Back",Bh("in"),Bh("out"),Bh());Ke.SteppedEase=Ke.steps=Un.SteppedEase={config:function(e,n){e===void 0&&(e=1);var i=1/e,r=e+(n?0:1),s=n?1:0,o=1-ft;return function(c){return((r*io(0,o,c)|0)+s)*i}}};ta.ease=Ke["quad.out"];pn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(a){return af+=a+","+a+"Params,"});var uf=function(e,n){this.id=rS++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:cf,this.set=n?n.getSetter:tl},no=function(){function a(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,ia(this,+n.duration,1,1),this.data=n.data,dt&&(this._ctx=dt,dt.data.push(this)),to||Mn.wake()}var e=a.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,ia(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(ra(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(el(this,i),!s._dp||s.parent||Um(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&_i(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===ft||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Im(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+xm(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+xm(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?na(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-ft?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?jc(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-ft?0:this._rts,this.totalTime(io(-Math.abs(this._delay),this._tDur,s),r!==!1),$c(this),dS(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ra(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ft&&(this._tTime-=ft)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&_i(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Sn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?jc(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=lS);var r=rn;return rn=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),rn=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,vm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,vm(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(qn(this,i),Sn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Sn(r))},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-ft:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-ft,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-ft)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this;return new Promise(function(s){var o=Tt(i)?i:Om,c=function(){var f=r.then;r.then=null,Tt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=f),s(o),r.then=f};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?c():r._prom=c})},e.kill=function(){ja(this)},a}();Kn(no.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ft,_prom:0,_ps:!1,_rts:1});var Kt=function(a){Tm(e,a);function e(i,r){var s;return i===void 0&&(i={}),s=a.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=Sn(i.sortChildren),vt&&_i(i.parent||vt,zi(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&Fm(zi(s),i.scrollTrigger),s}var n=e.prototype;return n.to=function(r,s,o){return Za(0,arguments,this),this},n.from=function(r,s,o){return Za(1,arguments,this),this},n.fromTo=function(r,s,o,c){return Za(2,arguments,this),this},n.set=function(r,s,o){return s.duration=0,s.parent=this,Ja(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new It(r,s,qn(this,o),1),this},n.call=function(r,s,o){return _i(this,It.delayedCall(0,r,s),o)},n.staggerTo=function(r,s,o,c,u,f,l){return o.duration=s,o.stagger=o.stagger||c,o.onComplete=f,o.onCompleteParams=l,o.parent=this,new It(r,o,qn(this,u)),this},n.staggerFrom=function(r,s,o,c,u,f,l){return o.runBackwards=1,Ja(o).immediateRender=Sn(o.immediateRender),this.staggerTo(r,s,o,c,u,f,l)},n.staggerFromTo=function(r,s,o,c,u,f,l,h){return c.startAt=o,Ja(c).immediateRender=Sn(c.immediateRender),this.staggerTo(r,s,c,u,f,l,h)},n.render=function(r,s,o){var c=this._time,u=this._dirty?this.totalDuration():this._tDur,f=this._dur,l=r<=0?0:Wt(r),h=this._zTime<0!=r<0&&(this._initted||!f),d,p,_,b,m,g,v,x,M,w,T,A;if(this!==vt&&l>u&&r>=0&&(l=u),l!==this._tTime||o||h){if(c!==this._time&&f&&(l+=this._time-c,r+=this._time-c),d=l,M=this._start,x=this._ts,g=!x,h&&(f||(c=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,m=f+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(d=Wt(l%m),l===u?(b=this._repeat,d=f):(b=~~(l/m),b&&b===l/m&&(d=f,b--),d>f&&(d=f)),w=na(this._tTime,m),!c&&this._tTime&&w!==b&&this._tTime-w*m-this._dur<=0&&(w=b),T&&b&1&&(d=f-d,A=1),b!==w&&!this._lock){var C=T&&w&1,y=C===(T&&b&1);if(b<w&&(C=!C),c=C?0:l%f?f:l,this._lock=1,this.render(c||(A?0:Wt(b*m)),s,!f)._lock=0,this._tTime=l,!s&&this.parent&&Nn(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),c&&c!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(f=this._dur,u=this._tDur,y&&(this._lock=2,c=C?f:-1e-4,this.render(c,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!g)return this;Zm(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=_S(this,Wt(c),Wt(d)),v&&(l-=d-(d=v._start))),this._tTime=l,this._time=d,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,c=0),!c&&d&&!s&&!b&&(Nn(this,"onStart"),this._tTime!==l))return this;if(d>=c&&r>=0)for(p=this._first;p;){if(_=p._next,(p._act||d>=p._start)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(d-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(d-p._start)*p._ts,s,o),d!==this._time||!this._ts&&!g){v=0,_&&(l+=this._zTime=-ft);break}}p=_}else{p=this._last;for(var S=r<0?r:d;p;){if(_=p._prev,(p._act||S<=p._end)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(S-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(S-p._start)*p._ts,s,o||rn&&(p._initted||p._startAt)),d!==this._time||!this._ts&&!g){v=0,_&&(l+=this._zTime=S?-ft:ft);break}}p=_}}if(v&&!s&&(this.pause(),v.render(d>=c?0:-ft)._zTime=d>=c?1:-1,this._ts))return this._start=M,$c(this),this.render(r,s,o);this._onUpdate&&!s&&Nn(this,"onUpdate",!0),(l===u&&this._tTime>=this.totalDuration()||!l&&c)&&(M===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!f)&&(l===u&&this._ts>0||!l&&this._ts<0)&&_r(this,1),!s&&!(r<0&&!c)&&(l||c||!u)&&(Nn(this,l===u&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(l<u&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(r,s){var o=this;if(Hi(s)||(s=qn(this,s,r)),!(r instanceof no)){if(sn(r))return r.forEach(function(c){return o.add(c,s)}),this;if(Bt(r))return this.addLabel(r,s);if(Tt(r))r=It.delayedCall(0,r);else return this}return this!==r?_i(this,r,s):this},n.getChildren=function(r,s,o,c){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),c===void 0&&(c=-Yn);for(var u=[],f=this._first;f;)f._start>=c&&(f instanceof It?s&&u.push(f):(o&&u.push(f),r&&u.push.apply(u,f.getChildren(!0,s,o)))),f=f._next;return u},n.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},n.remove=function(r){return Bt(r)?this.removeLabel(r):Tt(r)?this.killTweensOf(r):(Qc(this,r),r===this._recent&&(this._recent=this._last),Yr(this))},n.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Wt(Mn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),a.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},n.addLabel=function(r,s){return this.labels[r]=qn(this,s),this},n.removeLabel=function(r){return delete this.labels[r],this},n.addPause=function(r,s,o){var c=It.delayedCall(0,s||eo,o);return c.data="isPause",this._hasPause=1,_i(this,c,qn(this,r))},n.removePause=function(r){var s=this._first;for(r=qn(this,r);s;)s._start===r&&s.data==="isPause"&&_r(s),s=s._next},n.killTweensOf=function(r,s,o){for(var c=this.getTweensOf(r,o),u=c.length;u--;)pr!==c[u]&&c[u].kill(r,s);return this},n.getTweensOf=function(r,s){for(var o=[],c=jn(r),u=this._first,f=Hi(s),l;u;)u instanceof It?uS(u._targets,c)&&(f?(!pr||u._initted&&u._ts)&&u.globalTime(0)<=s&&u.globalTime(u.totalDuration())>s:!s||u.isActive())&&o.push(u):(l=u.getTweensOf(c,s)).length&&o.push.apply(o,l),u=u._next;return o},n.tweenTo=function(r,s){s=s||{};var o=this,c=qn(o,r),u=s,f=u.startAt,l=u.onStart,h=u.onStartParams,d=u.immediateRender,p,_=It.to(o,Kn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:c,overwrite:"auto",duration:s.duration||Math.abs((c-(f&&"time"in f?f.time:o._time))/o.timeScale())||ft,onStart:function(){if(o.pause(),!p){var m=s.duration||Math.abs((c-(f&&"time"in f?f.time:o._time))/o.timeScale());_._dur!==m&&ia(_,m,0,1).render(_._time,!0,!0),p=1}l&&l.apply(_,h||[])}},s));return d?_.render(0):_},n.tweenFromTo=function(r,s,o){return this.tweenTo(s,Kn({startAt:{time:qn(this,r)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(r){return r===void 0&&(r=this._time),ym(this,qn(this,r))},n.previousLabel=function(r){return r===void 0&&(r=this._time),ym(this,qn(this,r),1)},n.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+ft)},n.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var c=this._first,u=this.labels,f;c;)c._start>=o&&(c._start+=r,c._end+=r),c=c._next;if(s)for(f in u)u[f]>=o&&(u[f]+=r);return Yr(this)},n.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return a.prototype.invalidate.call(this,r)},n.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Yr(this)},n.totalDuration=function(r){var s=0,o=this,c=o._last,u=Yn,f,l,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;c;)f=c._prev,c._dirty&&c.totalDuration(),l=c._start,l>u&&o._sort&&c._ts&&!o._lock?(o._lock=1,_i(o,c,l-c._delay,1)._lock=0):u=l,l<0&&c._ts&&(s-=l,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=l/o._ts,o._time-=l,o._tTime-=l),o.shiftChildren(-l,!1,-1/0),u=0),c._end>s&&c._ts&&(s=c._end),c=f;ia(o,o===vt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(vt._ts&&(Im(vt,jc(r,vt)),Lm=Mn.frame),Mn.frame>=_m){_m+=Tn.autoSleep||120;var s=vt._first;if((!s||!s._ts)&&Tn.autoSleep&&Mn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Mn.sleep()}}},e}(no);Kn(Kt.prototype,{_lock:0,_hasPause:0,_forcing:0});var DS=function(e,n,i,r,s,o,c){var u=new mn(this._pt,e,n,0,1,mf,null,s),f=0,l=0,h,d,p,_,b,m,g,v;for(u.b=i,u.e=r,i+="",r+="",(g=~r.indexOf("random("))&&(r=sa(r)),o&&(v=[i,r],o(v,e,n),i=v[0],r=v[1]),d=i.match(Nh)||[];h=Nh.exec(r);)_=h[0],b=r.substring(f,h.index),p?p=(p+1)%5:b.substr(-5)==="rgba("&&(p=1),_!==d[l++]&&(m=parseFloat(d[l-1])||0,u._pt={_next:u._pt,p:b||l===1?b:",",s:m,c:_.charAt(1)==="="?Qr(m,_)-m:parseFloat(_)-m,m:p&&p<4?Math.round:0},f=Nh.lastIndex);return u.c=f<r.length?r.substring(f,r.length):"",u.fp=c,(nf.test(r)||g)&&(u.e=0),this._pt=u,u},hf=function(e,n,i,r,s,o,c,u,f,l){Tt(r)&&(r=r(s||0,e,o));var h=e[n],d=i!=="get"?i:Tt(h)?f?e[n.indexOf("set")||!Tt(e["get"+n.substr(3)])?n:"get"+n.substr(3)](f):e[n]():h,p=Tt(h)?f?kS:tg:pf,_;if(Bt(r)&&(~r.indexOf("random(")&&(r=sa(r)),r.charAt(1)==="="&&(_=Qr(d,r)+(Jt(d)||0),(_||_===0)&&(r=_))),!l||d!==r||Zh)return!isNaN(d*r)&&r!==""?(_=new mn(this._pt,e,n,+d||0,r-(d||0),typeof h=="boolean"?zS:ng,0,p),f&&(_.fp=f),c&&_.modifier(c,this,e),this._pt=_):(!h&&!(n in e)&&Zc(n,r),DS.call(this,e,n,d,r,p,u||Tn.stringFilter,f))},OS=function(e,n,i,r,s){if(Tt(e)&&(e=Qa(e,s,n,i,r)),!bi(e)||e.style&&e.nodeType||sn(e)||Am(e))return Bt(e)?Qa(e,s,n,i,r):e;var o={},c;for(c in e)o[c]=Qa(e[c],s,n,i,r);return o},ff=function(e,n,i,r,s,o){var c,u,f,l;if(yn[e]&&(c=new yn[e]).init(s,c.rawVars?n[e]:OS(n[e],r,s,o,i),i,r,o)!==!1&&(i._pt=u=new mn(i._pt,s,e,0,1,c.render,c,0,c.priority),i!==ea))for(f=i._ptLookup[i._targets.indexOf(s)],l=c._props.length;l--;)f[c._props[l]]=u;return c},pr,Zh,df=function a(e,n,i){var r=e.vars,s=r.ease,o=r.startAt,c=r.immediateRender,u=r.lazy,f=r.onUpdate,l=r.runBackwards,h=r.yoyoEase,d=r.keyframes,p=r.autoRevert,_=e._dur,b=e._startAt,m=e._targets,g=e.parent,v=g&&g.data==="nested"?g.vars.targets:m,x=e._overwrite==="auto"&&!$h,M=e.timeline,w,T,A,C,y,S,N,F,V,I,U,k,Y;if(M&&(!d||!s)&&(s="none"),e._ease=jr(s,ta.ease),e._yEase=h?Jm(jr(h===!0?s:h,ta.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!M&&!!r.runBackwards,!M||d&&!r.stagger){if(F=m[0]?gr(m[0]).harness:0,k=F&&r[F.prop],w=Yc(r,sf),b&&(b._zTime<0&&b.progress(1),n<0&&l&&c&&!p?b.render(-1,!0):b.revert(l&&_?Hc:cS),b._lazy=0),o){if(_r(e._startAt=It.set(m,Kn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!b&&Sn(u),startAt:null,delay:0,onUpdate:f&&function(){return Nn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,n<0&&(rn||!c&&!p)&&e._startAt.revert(Hc),c&&_&&n<=0&&i<=0){n&&(e._zTime=n);return}}else if(l&&_&&!b){if(n&&(c=!1),A=Kn({overwrite:!1,data:"isFromStart",lazy:c&&!b&&Sn(u),immediateRender:c,stagger:0,parent:g},w),k&&(A[F.prop]=k),_r(e._startAt=It.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,n<0&&(rn?e._startAt.revert(Hc):e._startAt.render(-1,!0)),e._zTime=n,!c)a(e._startAt,ft,ft);else if(!n)return}for(e._pt=e._ptCache=0,u=_&&Sn(u)||u&&!_,T=0;T<m.length;T++){if(y=m[T],N=y._gsap||of(m)[T]._gsap,e._ptLookup[T]=I={},Xh[N.id]&&mr.length&&qc(),U=v===m?T:v.indexOf(y),F&&(V=new F).init(y,k||w,e,U,v)!==!1&&(e._pt=C=new mn(e._pt,y,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(K){I[K]=C}),V.priority&&(S=1)),!F||k)for(A in w)yn[A]&&(V=ff(A,w,e,U,y,v))?V.priority&&(S=1):I[A]=C=hf.call(e,y,A,"get",w[A],U,v,0,r.stringFilter);e._op&&e._op[T]&&e.kill(y,e._op[T]),x&&e._pt&&(pr=e,vt.killTweensOf(y,I,e.globalTime(n)),Y=!e.parent,pr=0),e._pt&&u&&(Xh[N.id]=1)}S&&_f(e),e._onInit&&e._onInit(e)}e._onUpdate=f,e._initted=(!e._op||e._pt)&&!Y,d&&n<=0&&M.render(Yn,!0,!0)},NS=function(e,n,i,r,s,o,c,u){var f=(e._pt&&e._ptCache||(e._ptCache={}))[n],l,h,d,p;if(!f)for(f=e._ptCache[n]=[],d=e._ptLookup,p=e._targets.length;p--;){if(l=d[p][n],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==n&&l.fp!==n;)l=l._next;if(!l)return Zh=1,e.vars[n]="+=0",df(e,c),Zh=0,u?$a(n+" not eligible for reset"):1;f.push(l)}for(p=f.length;p--;)h=f[p],l=h._pt||h,l.s=(r||r===0)&&!s?r:l.s+(r||0)+o*l.c,l.c=i-l.s,h.e&&(h.e=wt(i)+Jt(h.e)),h.b&&(h.b=l.s+Jt(h.b))},US=function(e,n){var i=e[0]?gr(e[0]).harness:0,r=i&&i.aliases,s,o,c,u;if(!r)return n;s=Jr({},n);for(o in r)if(o in s)for(u=r[o].split(","),c=u.length;c--;)s[u[c]]=s[o];return s},FS=function(e,n,i,r){var s=n.ease||r||"power1.inOut",o,c;if(sn(n))c=i[e]||(i[e]=[]),n.forEach(function(u,f){return c.push({t:f/(n.length-1)*100,v:u,e:s})});else for(o in n)c=i[o]||(i[o]=[]),o==="ease"||c.push({t:parseFloat(e),v:n[o],e:s})},Qa=function(e,n,i,r,s){return Tt(e)?e.call(n,i,r,s):Bt(e)&&~e.indexOf("random(")?sa(e):e},$m=af+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",eg={};pn($m+",id,stagger,delay,duration,paused,scrollTrigger",function(a){return eg[a]=1});var It=function(a){Tm(e,a);function e(i,r,s,o){var c;typeof r=="number"&&(s.duration=r,r=s,s=null),c=a.call(this,o?r:Ja(r))||this;var u=c.vars,f=u.duration,l=u.delay,h=u.immediateRender,d=u.stagger,p=u.overwrite,_=u.keyframes,b=u.defaults,m=u.scrollTrigger,g=u.yoyoEase,v=r.parent||vt,x=(sn(i)||Am(i)?Hi(i[0]):"length"in r)?[i]:jn(i),M,w,T,A,C,y,S,N;if(c._targets=x.length?of(x):$a("GSAP target "+i+" not found. https://gsap.com",!Tn.nullTargetWarn)||[],c._ptLookup=[],c._overwrite=p,_||d||Gc(f)||Gc(l)){if(r=c.vars,M=c.timeline=new Kt({data:"nested",defaults:b||{},targets:v&&v.data==="nested"?v.vars.targets:x}),M.kill(),M.parent=M._dp=zi(c),M._start=0,d||Gc(f)||Gc(l)){if(A=x.length,S=d&&Gm(d),bi(d))for(C in d)~$m.indexOf(C)&&(N||(N={}),N[C]=d[C]);for(w=0;w<A;w++)T=Yc(r,eg),T.stagger=0,g&&(T.yoyoEase=g),N&&Jr(T,N),y=x[w],T.duration=+Qa(f,zi(c),w,y,x),T.delay=(+Qa(l,zi(c),w,y,x)||0)-c._delay,!d&&A===1&&T.delay&&(c._delay=l=T.delay,c._start+=l,T.delay=0),M.to(y,T,S?S(w,y,x):0),M._ease=Ke.none;M.duration()?f=l=0:c.timeline=0}else if(_){Ja(Kn(M.vars.defaults,{ease:"none"})),M._ease=jr(_.ease||r.ease||"none");var F=0,V,I,U;if(sn(_))_.forEach(function(k){return M.to(x,k,">")}),M.duration();else{T={};for(C in _)C==="ease"||C==="easeEach"||FS(C,_[C],T,_.easeEach);for(C in T)for(V=T[C].sort(function(k,Y){return k.t-Y.t}),F=0,w=0;w<V.length;w++)I=V[w],U={ease:I.e,duration:(I.t-(w?V[w-1].t:0))/100*f},U[C]=I.v,M.to(x,U,F),F+=U.duration;M.duration()<f&&M.to({},{duration:f-M.duration()})}}f||c.duration(f=M.duration())}else c.timeline=0;return p===!0&&!$h&&(pr=zi(c),vt.killTweensOf(x),pr=0),_i(v,zi(c),s),r.reversed&&c.reverse(),r.paused&&c.paused(!0),(h||!f&&!_&&c._start===Wt(v._time)&&Sn(h)&&pS(zi(c))&&v.data!=="nested")&&(c._tTime=-ft,c.render(Math.max(0,-l)||0)),m&&Fm(zi(c),m),c}var n=e.prototype;return n.render=function(r,s,o){var c=this._time,u=this._tDur,f=this._dur,l=r<0,h=r>u-ft&&!l?u:r<ft?0:r,d,p,_,b,m,g,v,x,M;if(!f)gS(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==l){if(d=h,x=this.timeline,this._repeat){if(b=f+this._rDelay,this._repeat<-1&&l)return this.totalTime(b*100+r,s,o);if(d=Wt(h%b),h===u?(_=this._repeat,d=f):(_=~~(h/b),_&&_===Wt(h/b)&&(d=f,_--),d>f&&(d=f)),g=this._yoyo&&_&1,g&&(M=this._yEase,d=f-d),m=na(this._tTime,b),d===c&&!o&&this._initted&&_===m)return this._tTime=h,this;_!==m&&(x&&this._yEase&&Zm(x,g),this.vars.repeatRefresh&&!g&&!this._lock&&this._time!==b&&this._initted&&(this._lock=o=1,this.render(Wt(b*_),!0).invalidate()._lock=0))}if(!this._initted){if(km(this,l?r:d,o,s,h))return this._tTime=0,this;if(c!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(f!==this._dur)return this.render(r,s,o)}if(this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=v=(M||this._ease)(d/f),this._from&&(this.ratio=v=1-v),d&&!c&&!s&&!_&&(Nn(this,"onStart"),this._tTime!==h))return this;for(p=this._pt;p;)p.r(v,p.d),p=p._next;x&&x.render(r<0?r:x._dur*x._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(l&&qh(this,r,s,o),Nn(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&Nn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(l&&!this._onUpdate&&qh(this,r,!0,!0),(r||!f)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&_r(this,1),!s&&!(l&&!c)&&(h||c||g)&&(Nn(this,h===u?"onComplete":"onReverseComplete",!0),this._prom&&!(h<u&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),a.prototype.invalidate.call(this,r)},n.resetTo=function(r,s,o,c,u){to||Mn.wake(),this._ts||this.play();var f=Math.min(this._dur,(this._dp._time-this._start)*this._ts),l;return this._initted||df(this,f),l=this._ease(f/this._dur),NS(this,r,s,o,c,l,f,u)?this.resetTo(r,s,o,c,1):(el(this,0),this.parent||Nm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ja(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,pr&&pr.vars.overwrite!==!0)._first||ja(this),this.parent&&o!==this.timeline.totalDuration()&&ia(this,this._dur*this.timeline._tDur/o,0,1),this}var c=this._targets,u=r?jn(r):c,f=this._ptLookup,l=this._pt,h,d,p,_,b,m,g;if((!s||s==="all")&&fS(c,u))return s==="all"&&(this._pt=0),ja(this);for(h=this._op=this._op||[],s!=="all"&&(Bt(s)&&(b={},pn(s,function(v){return b[v]=1}),s=b),s=US(c,s)),g=c.length;g--;)if(~u.indexOf(c[g])){d=f[g],s==="all"?(h[g]=s,_=d,p={}):(p=h[g]=h[g]||{},_=s);for(b in _)m=d&&d[b],m&&((!("kill"in m.d)||m.d.kill(b)===!0)&&Qc(this,m,"_pt"),delete d[b]),p!=="all"&&(p[b]=1)}return this._initted&&!this._pt&&l&&ja(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Za(1,arguments)},e.delayedCall=function(r,s,o,c){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:c})},e.fromTo=function(r,s,o){return Za(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return vt.killTweensOf(r,s,o)},e}(no);Kn(It.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});pn("staggerTo,staggerFrom,staggerFromTo",function(a){It[a]=function(){var e=new Kt,n=jh.call(arguments,0);return n.splice(a==="staggerFromTo"?5:4,0,0),e[a].apply(e,n)}});var pf=function(e,n,i){return e[n]=i},tg=function(e,n,i){return e[n](i)},kS=function(e,n,i,r){return e[n](r.fp,i)},BS=function(e,n,i){return e.setAttribute(n,i)},tl=function(e,n){return Tt(e[n])?tg:Jc(e[n])&&e.setAttribute?BS:pf},ng=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},zS=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},mf=function(e,n){var i=n._pt,r="";if(!e&&n.b)r=n.b;else if(e===1&&n.e)r=n.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=n.c}n.set(n.t,n.p,r,n)},gf=function(e,n){for(var i=n._pt;i;)i.r(e,i.d),i=i._next},GS=function(e,n,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,n,i),s=o},HS=function(e){for(var n=this._pt,i,r;n;)r=n._next,n.p===e&&!n.op||n.op===e?Qc(this,n,"_pt"):n.dep||(i=1),n=r;return!i},VS=function(e,n,i,r){r.mSet(e,n,r.m.call(r.tween,i,r.mt),r)},_f=function(e){for(var n=e._pt,i,r,s,o;n;){for(i=n._next,r=s;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:o)?n._prev._next=n:s=n,(n._next=r)?r._prev=n:o=n,n=i}e._pt=s},mn=function(){function a(n,i,r,s,o,c,u,f,l){this.t=i,this.s=s,this.c=o,this.p=r,this.r=c||ng,this.d=u||this,this.set=f||pf,this.pr=l||0,this._next=n,n&&(n._prev=this)}var e=a.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=VS,this.m=i,this.mt=s,this.tween=r},a}();pn(af+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(a){return sf[a]=1});Un.TweenMax=Un.TweenLite=It;Un.TimelineLite=Un.TimelineMax=Kt;vt=new Kt({sortChildren:!1,defaults:ta,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Tn.stringFilter=lf;var Kr=[],Wc={},WS=[],Sm=0,XS=0,zh=function(e){return(Wc[e]||WS).map(function(n){return n()})},Qh=function(){var e=Date.now(),n=[];e-Sm>2&&(zh("matchMediaInit"),Kr.forEach(function(i){var r=i.queries,s=i.conditions,o,c,u,f;for(c in r)o=gi.matchMedia(r[c]).matches,o&&(u=1),o!==s[c]&&(s[c]=o,f=1);f&&(i.revert(),u&&n.push(i))}),zh("matchMediaRevert"),n.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),Sm=e,zh("matchMedia"))},ig=function(){function a(n,i){this.selector=i&&Kh(i),this.data=[],this._r=[],this.isReverted=!1,this.id=XS++,n&&this.add(n)}var e=a.prototype;return e.add=function(i,r,s){Tt(i)&&(s=r,r=i,i=Tt);var o=this,c=function(){var f=dt,l=o.selector,h;return f&&f!==o&&f.data.push(o),s&&(o.selector=Kh(s)),dt=o,h=r.apply(o,arguments),Tt(h)&&o._r.push(h),dt=f,o.selector=l,o.isReverted=!1,h};return o.last=c,i===Tt?c(o,function(u){return o.add(null,u)}):i?o[i]=c:c},e.ignore=function(i){var r=dt;dt=null,i(this),dt=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof a?i.push.apply(i,r.getTweens()):r instanceof It&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var c=s.getTweens(),u=s.data.length,f;u--;)f=s.data[u],f.data==="isFlip"&&(f.revert(),f.getChildren(!0,!0,!1).forEach(function(l){return c.splice(c.indexOf(l),1)}));for(c.map(function(l){return{g:l._dur||l._delay||l._sat&&!l._sat.vars.immediateRender?l.globalTime(0):-1/0,t:l}}).sort(function(l,h){return h.g-l.g||-1/0}).forEach(function(l){return l.t.revert(i)}),u=s.data.length;u--;)f=s.data[u],f instanceof Kt?f.data!=="nested"&&(f.scrollTrigger&&f.scrollTrigger.revert(),f.kill()):!(f instanceof It)&&f.revert&&f.revert(i);s._r.forEach(function(l){return l(i,s)}),s.isReverted=!0}():this.data.forEach(function(c){return c.kill&&c.kill()}),this.clear(),r)for(var o=Kr.length;o--;)Kr[o].id===this.id&&Kr.splice(o,1)},e.revert=function(i){this.kill(i||{})},a}(),qS=function(){function a(n){this.contexts=[],this.scope=n,dt&&dt.data.push(this)}var e=a.prototype;return e.add=function(i,r,s){bi(i)||(i={matches:i});var o=new ig(0,s||this.scope),c=o.conditions={},u,f,l;dt&&!o.selector&&(o.selector=dt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(f in i)f==="all"?l=1:(u=gi.matchMedia(i[f]),u&&(Kr.indexOf(o)<0&&Kr.push(o),(c[f]=u.matches)&&(l=1),u.addListener?u.addListener(Qh):u.addEventListener("change",Qh)));return l&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},a}(),Kc={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];n.forEach(function(r){return Ym(r)})},timeline:function(e){return new Kt(e)},getTweensOf:function(e,n){return vt.getTweensOf(e,n)},getProperty:function(e,n,i,r){Bt(e)&&(e=jn(e)[0]);var s=gr(e||{}).get,o=i?Om:Dm;return i==="native"&&(i=""),e&&(n?o((yn[n]&&yn[n].get||s)(e,n,i,r)):function(c,u,f){return o((yn[c]&&yn[c].get||s)(e,c,u,f))})},quickSetter:function(e,n,i){if(e=jn(e),e.length>1){var r=e.map(function(l){return an.quickSetter(l,n,i)}),s=r.length;return function(l){for(var h=s;h--;)r[h](l)}}e=e[0]||{};var o=yn[n],c=gr(e),u=c.harness&&(c.harness.aliases||{})[n]||n,f=o?function(l){var h=new o;ea._pt=0,h.init(e,i?l+i:l,ea,0,[e]),h.render(1,h),ea._pt&&gf(1,ea)}:c.set(e,u);return o?f:function(l){return f(e,u,i?l+i:l,c,1)}},quickTo:function(e,n,i){var r,s=an.to(e,Jr((r={},r[n]="+=0.1",r.paused=!0,r),i||{})),o=function(u,f,l){return s.resetTo(n,u,f,l)};return o.tween=s,o},isTweening:function(e){return vt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=jr(e.ease,ta.ease)),bm(ta,e||{})},config:function(e){return bm(Tn,e||{})},registerEffect:function(e){var n=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(c){return c&&!yn[c]&&!Un[c]&&$a(n+" effect requires "+c+" plugin.")}),Uh[n]=function(c,u,f){return i(jn(c),Kn(u||{},s),f)},o&&(Kt.prototype[n]=function(c,u,f){return this.add(Uh[n](c,bi(u)?u:(f=u)&&{},this),f)})},registerEase:function(e,n){Ke[e]=jr(n)},parseEase:function(e,n){return arguments.length?jr(e,n):Ke},getById:function(e){return vt.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var i=new Kt(e),r,s;for(i.smoothChildTiming=Sn(e.smoothChildTiming),vt.remove(i),i._dp=0,i._time=i._tTime=vt._time,r=vt._first;r;)s=r._next,(n||!(!r._dur&&r instanceof It&&r.vars.onComplete===r._targets[0]))&&_i(i,r,r._start-r._delay),r=s;return _i(vt,i,0),i},context:function(e,n){return e?new ig(e,n):dt},matchMedia:function(e){return new qS(e)},matchMediaRefresh:function(){return Kr.forEach(function(e){var n=e.conditions,i,r;for(r in n)n[r]&&(n[r]=!1,i=1);i&&e.revert()})||Qh()},addEventListener:function(e,n){var i=Wc[e]||(Wc[e]=[]);~i.indexOf(n)||i.push(n)},removeEventListener:function(e,n){var i=Wc[e],r=i&&i.indexOf(n);r>=0&&i.splice(r,1)},utils:{wrap:TS,wrapYoyo:wS,distribute:Gm,random:Vm,snap:Hm,normalize:SS,getUnit:Jt,clamp:xS,splitColor:jm,toArray:jn,selector:Kh,mapRange:Xm,pipe:yS,unitize:MS,interpolate:AS,shuffle:zm},install:Cm,effects:Uh,ticker:Mn,updateRoot:Kt.updateRoot,plugins:yn,globalTimeline:vt,core:{PropTween:mn,globals:Pm,Tween:It,Timeline:Kt,Animation:no,getCache:gr,_removeLinkedListItem:Qc,reverting:function(){return rn},context:function(e){return e&&dt&&(dt.data.push(e),e._ctx=dt),dt},suppressOverwrites:function(e){return $h=e}}};pn("to,from,fromTo,delayedCall,set,killTweensOf",function(a){return Kc[a]=It[a]});Mn.add(Kt.updateRoot);ea=Kc.to({},{duration:0});var YS=function(e,n){for(var i=e._pt;i&&i.p!==n&&i.op!==n&&i.fp!==n;)i=i._next;return i},jS=function(e,n){var i=e._targets,r,s,o;for(r in n)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=YS(o,r)),o&&o.modifier&&o.modifier(n[r],e,i[s],r))},Gh=function(e,n){return{name:e,rawVars:1,init:function(r,s,o){o._onInit=function(c){var u,f;if(Bt(s)&&(u={},pn(s,function(l){return u[l]=1}),s=u),n){u={};for(f in s)u[f]=n(s[f]);s=u}jS(c,s)}}}},an=Kc.registerPlugin({name:"attr",init:function(e,n,i,r,s){var o,c,u;this.tween=i;for(o in n)u=e.getAttribute(o)||"",c=this.add(e,"setAttribute",(u||0)+"",n[o],r,s,0,0,o),c.op=o,c.b=u,this._props.push(o)},render:function(e,n){for(var i=n._pt;i;)rn?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",init:function(e,n){for(var i=n.length;i--;)this.add(e,i,e[i]||0,n[i],0,0,0,0,0,1)}},Gh("roundProps",Jh),Gh("modifiers"),Gh("snap",Hm))||Kc;It.version=Kt.version=an.version="3.12.5";Rm=1;ef()&&ra();var KS=Ke.Power0,JS=Ke.Power1,ZS=Ke.Power2,QS=Ke.Power3,$S=Ke.Power4,eT=Ke.Linear,tT=Ke.Quad,nT=Ke.Cubic,iT=Ke.Quart,rT=Ke.Quint,sT=Ke.Strong,aT=Ke.Elastic,oT=Ke.Back,cT=Ke.SteppedEase,lT=Ke.Bounce,uT=Ke.Sine,hT=Ke.Expo,fT=Ke.Circ;var rg,xr,oa,Tf,is,dT,sg,wf,pT=function(){return typeof window!="undefined"},Wi={},ns=180/Math.PI,ca=Math.PI/180,aa=Math.atan2,ag=1e8,Af=/([A-Z])/g,mT=/(left|right|width|margin|padding|x)/i,gT=/[\s,\(]\S/,xi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},vf=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},_T=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},bT=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},xT=function(e,n){var i=n.s+n.c*e;n.set(n.t,n.p,~~(i+(i<0?-.5:.5))+n.u,n)},dg=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},pg=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},vT=function(e,n,i){return e.style[n]=i},yT=function(e,n,i){return e.style.setProperty(n,i)},MT=function(e,n,i){return e._gsap[n]=i},ST=function(e,n,i){return e._gsap.scaleX=e._gsap.scaleY=i},TT=function(e,n,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},wT=function(e,n,i,r,s){var o=e._gsap;o[n]=i,o.renderTransform(s,o)},yt="transform",wn=yt+"Origin",AT=function a(e,n){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Wi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=xi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(c){return i.tfm[c]=Vi(r,c)}):this.tfm[e]=o.x?o[e]:Vi(r,e),e===wn&&(this.tfm.zOrigin=o.zOrigin);else return xi.transform.split(",").forEach(function(c){return a.call(i,c,n)});if(this.props.indexOf(yt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(wn,n,"")),e=yt}(s||n)&&this.props.push(e,n,s[e])},mg=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},ET=function(){var e=this.props,n=this.target,i=n.style,r=n._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?n[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Af,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=wf(),(!s||!s.isStart)&&!i[yt]&&(mg(i),r.zOrigin&&i[wn]&&(i[wn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},gg=function(e,n){var i={target:e,props:[],revert:ET,save:AT};return e._gsap||an.core.getCache(e),n&&n.split(",").forEach(function(r){return i.save(r)}),i},_g,yf=function(e,n){var i=xr.createElementNS?xr.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):xr.createElement(e);return i&&i.style?i:xr.createElement(e)},vi=function a(e,n,i){var r=getComputedStyle(e);return r[n]||r.getPropertyValue(n.replace(Af,"-$1").toLowerCase())||r.getPropertyValue(n)||!i&&a(e,la(n)||n,1)||""},og="O,Moz,ms,Ms,Webkit".split(","),la=function(e,n,i){var r=n||is,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(og[o]+e in s););return o<0?null:(o===3?"ms":o>=0?og[o]:"")+e},Mf=function(){pT()&&window.document&&(rg=window,xr=rg.document,oa=xr.documentElement,is=yf("div")||{style:{}},dT=yf("div"),yt=la(yt),wn=yt+"Origin",is.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_g=!!la("perspective"),wf=an.core.reverting,Tf=1)},bf=function a(e){var n=yf("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,r=this.nextSibling,s=this.style.cssText,o;if(oa.appendChild(n),n.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=a}catch{}else this._gsapBBox&&(o=this._gsapBBox());return i&&(r?i.insertBefore(this,r):i.appendChild(this)),oa.removeChild(n),this.style.cssText=s,o},cg=function(e,n){for(var i=n.length;i--;)if(e.hasAttribute(n[i]))return e.getAttribute(n[i])},bg=function(e){var n;try{n=e.getBBox()}catch{n=bf.call(e,!0)}return n&&(n.width||n.height)||e.getBBox===bf||(n=bf.call(e,!0)),n&&!n.width&&!n.x&&!n.y?{x:+cg(e,["x","cx","x1"])||0,y:+cg(e,["y","cy","y1"])||0,width:0,height:0}:n},xg=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&bg(e))},rs=function(e,n){if(n){var i=e.style,r;n in Wi&&n!==wn&&(n=yt),i.removeProperty?(r=n.substr(0,2),(r==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),i.removeProperty(r==="--"?n:n.replace(Af,"-$1").toLowerCase())):i.removeAttribute(n)}},vr=function(e,n,i,r,s,o){var c=new mn(e._pt,n,i,0,1,o?pg:dg);return e._pt=c,c.b=r,c.e=s,e._props.push(i),c},lg={deg:1,rad:1,turn:1},RT={grid:1,flex:1},yr=function a(e,n,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",c=is.style,u=mT.test(n),f=e.tagName.toLowerCase()==="svg",l=(f?"client":"offset")+(u?"Width":"Height"),h=100,d=r==="px",p=r==="%",_,b,m,g;if(r===o||!s||lg[r]||lg[o])return s;if(o!=="px"&&!d&&(s=a(e,n,i,"px")),g=e.getCTM&&xg(e),(p||o==="%")&&(Wi[n]||~n.indexOf("adius")))return _=g?e.getBBox()[u?"width":"height"]:e[l],wt(p?s/_*h:s/100*_);if(c[u?"width":"height"]=h+(d?o:r),b=~n.indexOf("adius")||r==="em"&&e.appendChild&&!f?e:e.parentNode,g&&(b=(e.ownerSVGElement||{}).parentNode),(!b||b===xr||!b.appendChild)&&(b=xr.body),m=b._gsap,m&&p&&m.width&&u&&m.time===Mn.time&&!m.uncache)return wt(s/m.width*h);if(p&&(n==="height"||n==="width")){var v=e.style[n];e.style[n]=h+r,_=e[l],v?e.style[n]=v:rs(e,n)}else(p||o==="%")&&!RT[vi(b,"display")]&&(c.position=vi(e,"position")),b===e&&(c.position="static"),b.appendChild(is),_=is[l],b.removeChild(is),c.position="absolute";return u&&p&&(m=gr(b),m.time=Mn.time,m.width=b[l]),wt(d?_*s/h:_&&s?h/_*s:0)},Vi=function(e,n,i,r){var s;return Tf||Mf(),n in xi&&n!=="transform"&&(n=xi[n],~n.indexOf(",")&&(n=n.split(",")[0])),Wi[n]&&n!=="transform"?(s=ao(e,r),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:il(vi(e,wn))+" "+s.zOrigin+"px"):(s=e.style[n],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=nl[n]&&nl[n](e,n,i)||vi(e,n)||cf(e,n)||(n==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?yr(e,n,s,i)+i:s},CT=function(e,n,i,r){if(!i||i==="none"){var s=la(n,e,1),o=s&&vi(e,s,1);o&&o!==i?(n=s,i=o):n==="borderColor"&&(i=vi(e,"borderTopColor"))}var c=new mn(this._pt,e.style,n,0,1,mf),u=0,f=0,l,h,d,p,_,b,m,g,v,x,M,w;if(c.b=i,c.e=r,i+="",r+="",r==="auto"&&(b=e.style[n],e.style[n]=r,r=vi(e,n)||r,b?e.style[n]=b:rs(e,n)),l=[i,r],lf(l),i=l[0],r=l[1],d=i.match(Zr)||[],w=r.match(Zr)||[],w.length){for(;h=Zr.exec(r);)m=h[0],v=r.substring(u,h.index),_?_=(_+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(_=1),m!==(b=d[f++]||"")&&(p=parseFloat(b)||0,M=b.substr((p+"").length),m.charAt(1)==="="&&(m=Qr(p,m)+M),g=parseFloat(m),x=m.substr((g+"").length),u=Zr.lastIndex-x.length,x||(x=x||Tn.units[n]||M,u===r.length&&(r+=x,c.e+=x)),M!==x&&(p=yr(e,n,b,x)||0),c._pt={_next:c._pt,p:v||f===1?v:",",s:p,c:g-p,m:_&&_<4||n==="zIndex"?Math.round:0});c.c=u<r.length?r.substring(u,r.length):""}else c.r=n==="display"&&r==="none"?pg:dg;return nf.test(r)&&(c.e=0),this._pt=c,c},ug={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},PT=function(e){var n=e.split(" "),i=n[0],r=n[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),n[0]=ug[i]||i,n[1]=ug[r]||r,n.join(" ")},LT=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var i=n.t,r=i.style,s=n.u,o=i._gsap,c,u,f;if(s==="all"||s===!0)r.cssText="",u=1;else for(s=s.split(","),f=s.length;--f>-1;)c=s[f],Wi[c]&&(u=1,c=c==="transformOrigin"?wn:yt),rs(i,c);u&&(rs(i,yt),o&&(o.svg&&i.removeAttribute("transform"),ao(i,1),o.uncache=1,mg(r)))}},nl={clearProps:function(e,n,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new mn(e._pt,n,i,0,0,LT);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},so=[1,0,0,1,0,0],vg={},yg=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},hg=function(e){var n=vi(e,yt);return yg(n)?so:n.substr(7).match(tf).map(wt)},Ef=function(e,n){var i=e._gsap||gr(e),r=e.style,s=hg(e),o,c,u,f;return i.svg&&e.getAttribute("transform")?(u=e.transform.baseVal.consolidate().matrix,s=[u.a,u.b,u.c,u.d,u.e,u.f],s.join(",")==="1,0,0,1,0,0"?so:s):(s===so&&!e.offsetParent&&e!==oa&&!i.svg&&(u=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(f=1,c=e.nextElementSibling,oa.appendChild(e)),s=hg(e),u?r.display=u:rs(e,"display"),f&&(c?o.insertBefore(e,c):o?o.appendChild(e):oa.removeChild(e))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Sf=function(e,n,i,r,s,o){var c=e._gsap,u=s||Ef(e,!0),f=c.xOrigin||0,l=c.yOrigin||0,h=c.xOffset||0,d=c.yOffset||0,p=u[0],_=u[1],b=u[2],m=u[3],g=u[4],v=u[5],x=n.split(" "),M=parseFloat(x[0])||0,w=parseFloat(x[1])||0,T,A,C,y;i?u!==so&&(A=p*m-_*b)&&(C=M*(m/A)+w*(-b/A)+(b*v-m*g)/A,y=M*(-_/A)+w*(p/A)-(p*v-_*g)/A,M=C,w=y):(T=bg(e),M=T.x+(~x[0].indexOf("%")?M/100*T.width:M),w=T.y+(~(x[1]||x[0]).indexOf("%")?w/100*T.height:w)),r||r!==!1&&c.smooth?(g=M-f,v=w-l,c.xOffset=h+(g*p+v*b)-g,c.yOffset=d+(g*_+v*m)-v):c.xOffset=c.yOffset=0,c.xOrigin=M,c.yOrigin=w,c.smooth=!!r,c.origin=n,c.originIsAbsolute=!!i,e.style[wn]="0px 0px",o&&(vr(o,c,"xOrigin",f,M),vr(o,c,"yOrigin",l,w),vr(o,c,"xOffset",h,c.xOffset),vr(o,c,"yOffset",d,c.yOffset)),e.setAttribute("data-svg-origin",M+" "+w)},ao=function(e,n){var i=e._gsap||new uf(e);if("x"in i&&!n&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",c="deg",u=getComputedStyle(e),f=vi(e,wn)||"0",l,h,d,p,_,b,m,g,v,x,M,w,T,A,C,y,S,N,F,V,I,U,k,Y,K,j,J,Q,re,X,Z,ce;return l=h=d=b=m=g=v=x=M=0,p=_=1,i.svg=!!(e.getCTM&&xg(e)),u.translate&&((u.translate!=="none"||u.scale!=="none"||u.rotate!=="none")&&(r[yt]=(u.translate!=="none"?"translate3d("+(u.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(u.rotate!=="none"?"rotate("+u.rotate+") ":"")+(u.scale!=="none"?"scale("+u.scale.split(" ").join(",")+") ":"")+(u[yt]!=="none"?u[yt]:"")),r.scale=r.rotate=r.translate="none"),A=Ef(e,i.svg),i.svg&&(i.uncache?(K=e.getBBox(),f=i.xOrigin-K.x+"px "+(i.yOrigin-K.y)+"px",Y=""):Y=!n&&e.getAttribute("data-svg-origin"),Sf(e,Y||f,!!Y||i.originIsAbsolute,i.smooth!==!1,A)),w=i.xOrigin||0,T=i.yOrigin||0,A!==so&&(N=A[0],F=A[1],V=A[2],I=A[3],l=U=A[4],h=k=A[5],A.length===6?(p=Math.sqrt(N*N+F*F),_=Math.sqrt(I*I+V*V),b=N||F?aa(F,N)*ns:0,v=V||I?aa(V,I)*ns+b:0,v&&(_*=Math.abs(Math.cos(v*ca))),i.svg&&(l-=w-(w*N+T*V),h-=T-(w*F+T*I))):(ce=A[6],X=A[7],J=A[8],Q=A[9],re=A[10],Z=A[11],l=A[12],h=A[13],d=A[14],C=aa(ce,re),m=C*ns,C&&(y=Math.cos(-C),S=Math.sin(-C),Y=U*y+J*S,K=k*y+Q*S,j=ce*y+re*S,J=U*-S+J*y,Q=k*-S+Q*y,re=ce*-S+re*y,Z=X*-S+Z*y,U=Y,k=K,ce=j),C=aa(-V,re),g=C*ns,C&&(y=Math.cos(-C),S=Math.sin(-C),Y=N*y-J*S,K=F*y-Q*S,j=V*y-re*S,Z=I*S+Z*y,N=Y,F=K,V=j),C=aa(F,N),b=C*ns,C&&(y=Math.cos(C),S=Math.sin(C),Y=N*y+F*S,K=U*y+k*S,F=F*y-N*S,k=k*y-U*S,N=Y,U=K),m&&Math.abs(m)+Math.abs(b)>359.9&&(m=b=0,g=180-g),p=wt(Math.sqrt(N*N+F*F+V*V)),_=wt(Math.sqrt(k*k+ce*ce)),C=aa(U,k),v=Math.abs(C)>2e-4?C*ns:0,M=Z?1/(Z<0?-Z:Z):0),i.svg&&(Y=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!yg(vi(e,yt)),Y&&e.setAttribute("transform",Y))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(p*=-1,v+=b<=0?180:-180,b+=b<=0?180:-180):(_*=-1,v+=v<=0?180:-180)),n=n||i.uncache,i.x=l-((i.xPercent=l&&(!n&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=h-((i.yPercent=h&&(!n&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=d+o,i.scaleX=wt(p),i.scaleY=wt(_),i.rotation=wt(b)+c,i.rotationX=wt(m)+c,i.rotationY=wt(g)+c,i.skewX=v+c,i.skewY=x+c,i.transformPerspective=M+o,(i.zOrigin=parseFloat(f.split(" ")[2])||!n&&i.zOrigin||0)&&(r[wn]=il(f)),i.xOffset=i.yOffset=0,i.force3D=Tn.force3D,i.renderTransform=i.svg?DT:_g?Mg:IT,i.uncache=0,i},il=function(e){return(e=e.split(" "))[0]+" "+e[1]},xf=function(e,n,i){var r=Jt(n);return wt(parseFloat(n)+parseFloat(yr(e,"x",i+"px",r)))+r},IT=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,Mg(e,n)},es="0deg",ro="0px",ts=") ",Mg=function(e,n){var i=n||this,r=i.xPercent,s=i.yPercent,o=i.x,c=i.y,u=i.z,f=i.rotation,l=i.rotationY,h=i.rotationX,d=i.skewX,p=i.skewY,_=i.scaleX,b=i.scaleY,m=i.transformPerspective,g=i.force3D,v=i.target,x=i.zOrigin,M="",w=g==="auto"&&e&&e!==1||g===!0;if(x&&(h!==es||l!==es)){var T=parseFloat(l)*ca,A=Math.sin(T),C=Math.cos(T),y;T=parseFloat(h)*ca,y=Math.cos(T),o=xf(v,o,A*y*-x),c=xf(v,c,-Math.sin(T)*-x),u=xf(v,u,C*y*-x+x)}m!==ro&&(M+="perspective("+m+ts),(r||s)&&(M+="translate("+r+"%, "+s+"%) "),(w||o!==ro||c!==ro||u!==ro)&&(M+=u!==ro||w?"translate3d("+o+", "+c+", "+u+") ":"translate("+o+", "+c+ts),f!==es&&(M+="rotate("+f+ts),l!==es&&(M+="rotateY("+l+ts),h!==es&&(M+="rotateX("+h+ts),(d!==es||p!==es)&&(M+="skew("+d+", "+p+ts),(_!==1||b!==1)&&(M+="scale("+_+", "+b+ts),v.style[yt]=M||"translate(0, 0)"},DT=function(e,n){var i=n||this,r=i.xPercent,s=i.yPercent,o=i.x,c=i.y,u=i.rotation,f=i.skewX,l=i.skewY,h=i.scaleX,d=i.scaleY,p=i.target,_=i.xOrigin,b=i.yOrigin,m=i.xOffset,g=i.yOffset,v=i.forceCSS,x=parseFloat(o),M=parseFloat(c),w,T,A,C,y;u=parseFloat(u),f=parseFloat(f),l=parseFloat(l),l&&(l=parseFloat(l),f+=l,u+=l),u||f?(u*=ca,f*=ca,w=Math.cos(u)*h,T=Math.sin(u)*h,A=Math.sin(u-f)*-d,C=Math.cos(u-f)*d,f&&(l*=ca,y=Math.tan(f-l),y=Math.sqrt(1+y*y),A*=y,C*=y,l&&(y=Math.tan(l),y=Math.sqrt(1+y*y),w*=y,T*=y)),w=wt(w),T=wt(T),A=wt(A),C=wt(C)):(w=h,C=d,T=A=0),(x&&!~(o+"").indexOf("px")||M&&!~(c+"").indexOf("px"))&&(x=yr(p,"x",o,"px"),M=yr(p,"y",c,"px")),(_||b||m||g)&&(x=wt(x+_-(_*w+b*A)+m),M=wt(M+b-(_*T+b*C)+g)),(r||s)&&(y=p.getBBox(),x=wt(x+r/100*y.width),M=wt(M+s/100*y.height)),y="matrix("+w+","+T+","+A+","+C+","+x+","+M+")",p.setAttribute("transform",y),v&&(p.style[yt]=y)},OT=function(e,n,i,r,s){var o=360,c=Bt(s),u=parseFloat(s)*(c&&~s.indexOf("rad")?ns:1),f=u-r,l=r+f+"deg",h,d;return c&&(h=s.split("_")[1],h==="short"&&(f%=o,f!==f%(o/2)&&(f+=f<0?o:-o)),h==="cw"&&f<0?f=(f+o*ag)%o-~~(f/o)*o:h==="ccw"&&f>0&&(f=(f-o*ag)%o-~~(f/o)*o)),e._pt=d=new mn(e._pt,n,i,r,f,_T),d.e=l,d.u="deg",e._props.push(i),d},fg=function(e,n){for(var i in n)e[i]=n[i];return e},NT=function(e,n,i){var r=fg({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,c,u,f,l,h,d,p,_;r.svg?(f=i.getAttribute("transform"),i.setAttribute("transform",""),o[yt]=n,c=ao(i,1),rs(i,yt),i.setAttribute("transform",f)):(f=getComputedStyle(i)[yt],o[yt]=n,c=ao(i,1),o[yt]=f);for(u in Wi)f=r[u],l=c[u],f!==l&&s.indexOf(u)<0&&(p=Jt(f),_=Jt(l),h=p!==_?yr(i,u,f,_):parseFloat(f),d=parseFloat(l),e._pt=new mn(e._pt,c,u,h,d-h,vf),e._pt.u=_||0,e._props.push(u));fg(c,r)};pn("padding,margin,Width,Radius",function(a,e){var n="Top",i="Right",r="Bottom",s="Left",o=(e<3?[n,i,r,s]:[n+s,n+i,r+i,r+s]).map(function(c){return e<2?a+c:"border"+c+a});nl[e>1?"border"+a:a]=function(c,u,f,l,h){var d,p;if(arguments.length<4)return d=o.map(function(_){return Vi(c,_,f)}),p=d.join(" "),p.split(d[0]).length===5?d[0]:p;d=(l+"").split(" "),p={},o.forEach(function(_,b){return p[_]=d[b]=d[b]||d[(b-1)/2|0]}),c.init(u,p,h)}});var Rf={name:"css",register:Mf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,i,r,s){var o=this._props,c=e.style,u=i.vars.startAt,f,l,h,d,p,_,b,m,g,v,x,M,w,T,A,C;Tf||Mf(),this.styles=this.styles||gg(e),C=this.styles.props,this.tween=i;for(b in n)if(b!=="autoRound"&&(l=n[b],!(yn[b]&&ff(b,n,i,r,e,s)))){if(p=typeof l,_=nl[b],p==="function"&&(l=l.call(i,r,e,s),p=typeof l),p==="string"&&~l.indexOf("random(")&&(l=sa(l)),_)_(this,e,b,l,i)&&(A=1);else if(b.substr(0,2)==="--")f=(getComputedStyle(e).getPropertyValue(b)+"").trim(),l+="",Gi.lastIndex=0,Gi.test(f)||(m=Jt(f),g=Jt(l)),g?m!==g&&(f=yr(e,b,f,g)+g):m&&(l+=m),this.add(c,"setProperty",f,l,r,s,0,0,b),o.push(b),C.push(b,0,c[b]);else if(p!=="undefined"){if(u&&b in u?(f=typeof u[b]=="function"?u[b].call(i,r,e,s):u[b],Bt(f)&&~f.indexOf("random(")&&(f=sa(f)),Jt(f+"")||f==="auto"||(f+=Tn.units[b]||Jt(Vi(e,b))||""),(f+"").charAt(1)==="="&&(f=Vi(e,b))):f=Vi(e,b),d=parseFloat(f),v=p==="string"&&l.charAt(1)==="="&&l.substr(0,2),v&&(l=l.substr(2)),h=parseFloat(l),b in xi&&(b==="autoAlpha"&&(d===1&&Vi(e,"visibility")==="hidden"&&h&&(d=0),C.push("visibility",0,c.visibility),vr(this,c,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),b!=="scale"&&b!=="transform"&&(b=xi[b],~b.indexOf(",")&&(b=b.split(",")[0]))),x=b in Wi,x){if(this.styles.save(b),M||(w=e._gsap,w.renderTransform&&!n.parseTransform||ao(e,n.parseTransform),T=n.smoothOrigin!==!1&&w.smooth,M=this._pt=new mn(this._pt,c,yt,0,1,w.renderTransform,w,0,-1),M.dep=1),b==="scale")this._pt=new mn(this._pt,w,"scaleY",w.scaleY,(v?Qr(w.scaleY,v+h):h)-w.scaleY||0,vf),this._pt.u=0,o.push("scaleY",b),b+="X";else if(b==="transformOrigin"){C.push(wn,0,c[wn]),l=PT(l),w.svg?Sf(e,l,0,T,0,this):(g=parseFloat(l.split(" ")[2])||0,g!==w.zOrigin&&vr(this,w,"zOrigin",w.zOrigin,g),vr(this,c,b,il(f),il(l)));continue}else if(b==="svgOrigin"){Sf(e,l,1,T,0,this);continue}else if(b in vg){OT(this,w,b,d,v?Qr(d,v+l):l);continue}else if(b==="smoothOrigin"){vr(this,w,"smooth",w.smooth,l);continue}else if(b==="force3D"){w[b]=l;continue}else if(b==="transform"){NT(this,l,e);continue}}else b in c||(b=la(b)||b);if(x||(h||h===0)&&(d||d===0)&&!gT.test(l)&&b in c)m=(f+"").substr((d+"").length),h||(h=0),g=Jt(l)||(b in Tn.units?Tn.units[b]:m),m!==g&&(d=yr(e,b,f,g)),this._pt=new mn(this._pt,x?w:c,b,d,(v?Qr(d,v+h):h)-d,!x&&(g==="px"||b==="zIndex")&&n.autoRound!==!1?xT:vf),this._pt.u=g||0,m!==g&&g!=="%"&&(this._pt.b=f,this._pt.r=bT);else if(b in c)CT.call(this,e,b,f,v?v+l:l);else if(b in e)this.add(e,b,f||e[b],v?v+l:l,r,s);else if(b!=="parseTransform"){Zc(b,l);continue}x||(b in c?C.push(b,0,c[b]):C.push(b,1,f||e[b])),o.push(b)}}A&&_f(this)},render:function(e,n){if(n.tween._time||!wf())for(var i=n._pt;i;)i.r(e,i.d),i=i._next;else n.styles.revert()},get:Vi,aliases:xi,getSetter:function(e,n,i){var r=xi[n];return r&&r.indexOf(",")<0&&(n=r),n in Wi&&n!==wn&&(e._gsap.x||Vi(e,"x"))?i&&sg===i?n==="scale"?ST:MT:(sg=i||{})&&(n==="scale"?TT:wT):e.style&&!Jc(e.style[n])?vT:~n.indexOf("-")?yT:tl(e,n)},core:{_removeProperty:rs,_getMatrix:Ef}};an.utils.checkPrefix=la;an.core.getStyleSaver=gg;(function(a,e,n,i){var r=pn(a+","+e+","+n,function(s){Wi[s]=1});pn(e,function(s){Tn.units[s]="deg",vg[s]=1}),xi[r[13]]=a+","+e,pn(i,function(s){var o=s.split(":");xi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");pn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(a){Tn.units[a]="px"});an.registerPlugin(Rf);var gn=an.registerPlugin(Rf)||an,pA=gn.core.Tween;var as=M_(Sg()),UT={fr:{quest:"objectif : r\xE9cup\xE9rer les 5 fragments",enterBtn:"\u25B2 entrer",enter:"entrer",helpW:"ZQSD ou fl\xE8ches pour courir \xB7 Maj pour marcher \xB7 glisser pour regarder \xB7 \u21B5 pour entrer",helpT:"joystick pour marcher \xB7 glisse pour regarder \xB7 touche une porte",hello:"Bienvenue dans mon monde.",done:"Les 5 fragments. Merci d'\xEAtre venu jusqu'ici.",got:"fragment r\xE9cup\xE9r\xE9",names:["DOSSIERS","UNIVERSIT\xC9","SALLE SERVEURS","ARCADE","ANTENNE"]},en:{quest:"objective: collect the 5 fragments",enterBtn:"\u25B2 enter",enter:"enter",helpW:"WASD or arrows to run \xB7 Shift to walk \xB7 drag to look \xB7 \u21B5 to enter",helpT:"joystick to walk \xB7 swipe to look \xB7 tap a door",hello:"Welcome to my world.",done:"All 5 fragments. Thanks for coming this far.",got:"fragment collected",names:["FILES","UNIVERSITY","SERVER ROOM","ARCADE","ANTENNA"]}},ii=a=>UT[L][a];gn.ticker.lagSmoothing(0);var zg=395018,Uf=1446170,FT=12588574,kT=(a,e)=>new se(a).multiplyScalar(e),ga=kT(FT,4),Gg=new se(1,.68,.38),BT=new se(2.6,2.4,2.2),Hg={who:"assets/ink/who.webp",parcours:"assets/ink/parcours.webp",travail:"assets/ink/travail.webp",passions:"assets/ink/passions.webp"},Lf=4,Qe=Lf/1.8,si=10,Zt=si+6,Jn=3*Qe,hl={x:0,z:4},zT=11,GT=4.5,ba=-150,mo=14,Sr=a=>mo-(a+.5)*Jn,Xt=[{page:"s1",outfit:"who",k:4,side:-1,floors:6,kind:"files"},{page:"s2",outfit:"parcours",k:8,side:1,floors:5,kind:"uni"},{page:"s3",outfit:"travail",k:12,side:-1,floors:8,kind:"servers"},{page:"s4",outfit:"passions",k:16,side:1,floors:4,kind:"arcade"},{page:"s5",outfit:"who",k:20,side:-1,floors:6,kind:"antenna"}];Xt.forEach(a=>{a.z=Sr(a.k),a.w=3*Jn,a.dx=a.side*(Zt-2.2),a.dz=a.z});var Tr=matchMedia("(hover: none)").matches,wr=$("#world"),pa=$("#bubble"),At;try{At=new Fa({antialias:!0,powerPreference:"high-performance"})}catch(a){throw wr.classList.add("no3d"),a}At.setPixelRatio(Math.min(devicePixelRatio||1,Tr?1.5:1.75));At.setClearColor(zg);At.toneMapping=Va;At.toneMappingExposure=1.15;At.shadowMap.enabled=!0;At.shadowMap.type=Xu;wr.prepend(At.domElement);At.domElement.className="gl3d";At.domElement.addEventListener("webglcontextlost",a=>{a.preventDefault(),wr.classList.add("no3d")});var Ye=new hc;Ye.background=new se(zg);Ye.fog=new uc(Uf,.011);var _n=new Ut(48,1,.1,900),ls=new kc(At,new jt(4,4,{type:Vt,samples:Tr?2:4}));ls.addPass(new Bc(Ye,_n));var Ff=new $s(new me(256,256),.7,.55,.95);ls.addPass(Ff);ls.addPass(new zc);var Vg=new Qs({uniforms:{tDiffuse:{value:null},time:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 d = vUv - 0.5; float r2 = dot(d, d); vec2 o = d * r2 * 0.012;
      vec3 c = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
      c *= 1.0 - r2 * 1.2;
      c += (h(vUv * 1000.0 + fract(time) * 7.0) - 0.5) * 0.035;
      gl_FragColor = vec4(c, 1.0);
    }`});ls.addPass(Vg);var cl=!0,HT=new Le(new Wr(700,32,16),new Lt({side:tn,depthWrite:!1,fog:!1,uniforms:{top:{value:new se(197639)},mid:{value:new se(Uf)},glow:{value:new se(3802891)}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, mid, glow; varying vec3 vP;
    void main(){
      vec3 c = mix(mid, top, pow(max(vP.y, 0.0), 0.5));
      c += glow * pow(max(dot(vP, normalize(vec3(0.0, 0.1, -1.0))), 0.0), 8.0) * 1.8;
      gl_FragColor = vec4(c, 1.0);
    }`}));Ye.add(HT);var Wg=new Le(new Xs(34,64),new bt({color:ga,fog:!1,toneMapped:!1}));Wg.position.set(0,70,-560);Ye.add(Wg);var VT=new Gs(At);new Nc().load("assets/city/tex/night.hdr",a=>{a.mapping=Ia,Ye.environment=VT.fromEquirectangular(a).texture,a.dispose()});Ye.add(new Sc(3818584,658190,.6));var ji=new Xr(10466008,.9);ji.castShadow=!0;ji.shadow.mapSize.set(Tr?1024:2048,Tr?1024:2048);Object.assign(ji.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:1,far:220});ji.shadow.bias=-4e-4;ji.shadow.normalBias=.05;Ye.add(ji,ji.target);var Xg=new Xr(16724016,.6);Xg.position.set(0,30,-200);Ye.add(Xg);var WT=Tr?4:6,qg=[];for(let a=0;a<WT;a++){let e=new Bi(16766632,70,30,1.8);Ye.add(e),qg.push(e)}var XT=At.capabilities.getMaxAnisotropy(),qT=new js;function ma(a,e,n){let i=qT.load(a);return i.wrapS=i.wrapT=fi,i.repeat.set(e[0],e[1]),i.anisotropy=XT,n&&(i.colorSpace=nt),i}function Yg(a,e){let n=document.createElement("canvas");n.width=n.height=a,e(n.getContext("2d"),a);let i=new Ws(n);return i.colorSpace=nt,i}var xl=Yg(128,(a,e)=>{let n=a.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=n,a.fillRect(0,0,e,e)}),YT=Yg(64,(a,e)=>{let n=a.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.5,"rgba(255,255,255,.9)"),n.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=n,a.fillRect(0,0,e,e),a.globalCompositeOperation="destination-in";let i=a.createLinearGradient(0,0,e,0);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(.5,"rgba(0,0,0,1)"),i.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=i,a.fillRect(0,0,e,e)}),vl=(a,e,n)=>new bt({map:a,color:e,transparent:!0,opacity:n,blending:Br,depthWrite:!1,toneMapped:!1});function jg(a,e,n,i,r){let s=new Le(new ti(e,n),a);return s.rotation.x=-Math.PI/2,s.position.set(i,.05,r),s.renderOrder=2,Ye.add(s),s}function jT(a,e={}){let n=document.createElement("canvas"),i=n.getContext("2d"),r=e.size||64,s=r*.6;i.font=`600 ${r}px "IBM Plex Mono", ui-monospace, monospace`;let o=Math.ceil(i.measureText(a).width)+s*2,c=Math.ceil(r*2.3);n.width=o,n.height=c,i.font=`600 ${r}px "IBM Plex Mono", ui-monospace, monospace`,i.textBaseline="middle",i.shadowColor=e.glow||"#ff3030",i.shadowBlur=r*.35,i.fillStyle=e.fg||"#ffffff",i.fillText(a,s,c/2+2);let u=new Ws(n);return u.colorSpace=nt,u.anisotropy=4,{t:u,ratio:o/c}}function fa(a,e,n={}){let{t:i,ratio:r}=jT(a,n);return new Le(new ti(e*r,e),new bt({map:i,color:n.color||BT,transparent:!0,depthWrite:!1,side:xn,toneMapped:!1}))}function KT(a){return()=>{a|=0,a=a+1831565813|0;let e=Math.imul(a^a>>>15,1|a);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var it=KT(7),Tg=a=>a[Math.floor(it()*a.length)],qi=mo-ba+40,If=(mo+ba)/2,yl=new Le(new ti(si*2,qi),new xt({map:ma("assets/city/tex/asphalt_diff.webp",[3,qi/7],!0),normalMap:ma("assets/city/tex/asphalt_nor_gl.webp",[3,qi/7]),roughnessMap:ma("assets/city/tex/asphalt_rough.webp",[3,qi/7]),roughness:.42,metalness:.1,color:9079440,normalScale:new me(.6,.6)}));yl.rotation.x=-Math.PI/2;yl.position.set(0,0,If);yl.receiveShadow=!0;Ye.add(yl);var JT=new xt({color:12170146,roughness:.5});for(let a=mo;a>ba;a-=9){let e=new Le(new ti(.35,4),JT);e.rotation.x=-Math.PI/2,e.position.set(0,.02,a),e.receiveShadow=!0,Ye.add(e)}var ZT=new xt({map:ma("assets/city/tex/pave_diff.webp",[2,qi/6],!0),normalMap:ma("assets/city/tex/pave_nor_gl.webp",[2,qi/6]),roughnessMap:ma("assets/city/tex/pave_rough.webp",[2,qi/6]),roughness:.6,color:7829372}),QT=new xt({color:3816256,roughness:.7});for(let a of[-1,1]){let e=new Le(new dn(Zt-si+2,.35,qi),ZT);e.position.set(a*(si+(Zt-si+2)/2),.175,If),e.receiveShadow=!0,Ye.add(e);let n=new Le(new dn(.4,.4,qi),QT);n.position.set(a*(si+.2),.2,If),n.receiveShadow=!0,Ye.add(n)}var kf=new Le(new ti(1200,1200),new xt({color:723983,roughness:.35}));kf.rotation.x=-Math.PI/2;kf.position.set(0,-.03,-300);Ye.add(kf);var Kg=[];for(let a=0;a<60;a++){let e=60+it()*180,n=14+it()*26,i=(it()-.5)*600,r=-300-it()*240;if(Math.abs(i)<70)continue;let s=new Le(new dn(n,e,n),new bt({color:new se(592141).lerp(new se(Uf),Math.min(1,(-r-300)/300)),fog:!1}));if(s.position.set(i,e/2-2,r),Ye.add(s),it()<.5){let o=new Le(new Wr(1,8,8),new bt({color:ga,fog:!1,toneMapped:!1}));o.position.set(i,e+1,r),o.userData.ph=it()*6,Ye.add(o),Kg.push(o)}}function $T(a){return new we().makeTranslation(a*Zt,0,0).multiply(new we().makeRotationY(a<0?Math.PI/2:-Math.PI/2)).multiply(new we().makeScale(Qe,Qe,Qe))}var ew=(a,e)=>a<0?-(Sr(e)-Jn/2)/Qe:(Sr(e)+Jn/2)/Qe,An=(a,e,n,i=0)=>$T(a).multiply(new we().makeTranslation(ew(a,e),n,i)),ll={},Df=new Map,Jg=[],Bf=0,Zg=170;function Fn(a,e,n,i){let r=ll[a];if(r)for(let s of r){let o=e.clone().multiply(s.rel),c=Math.round(o.elements[14]/40),u=s.key+"|"+c,f=Df.get(u);f||Df.set(u,f={p:s,z:c*40,mats:[],cols:[]}),f.mats.push(o),f.cols.push(s.mat===Of?i||Qg:n||tw)}}var tw=new se(1,1,1),Qg=new se(.035,.04,.05);function wg(a){return a==="red"?ga.clone().multiplyScalar(.3):a?Gg.clone().multiplyScalar(.55+it()*1.1):Qg.clone().multiplyScalar(.6+it()*.8)}var nw=["centered_small","centered_large","centered_double"],ha=[new se(.62,.6,.62),new se(.5,.5,.56),new se(.42,.42,.48),new se(.7,.62,.6),new se(.34,.34,.4)],$g=[],e_=[],t_=[];function Ag(a,e,n,i,r={}){let s=r.tint||Tg(ha),o=r.style||Tg(nw),c=Bf,u=i*3+c;for(let f=0;f<n;f++){let l=e+f;r.door!==l&&Fn("base_standard_01",An(a,l,0),s),r.door===l?Fn("wall_standard_standard_01",An(a,l,c),s):it()<.3?(Fn("wall_door_centered_small_01",An(a,l,c),s),Fn("door_centered_small_01",An(a,l,c))):(Fn("wall_window_centered_large_01",An(a,l,c),s),Fn("window_centered_large_01",An(a,l,c),null,wg(it()<.12?"red":it()<.7)));for(let h=1;h<i;h++){let d=h===i-1,p=d?"03":h%2?"01":"02";Fn(`wall_window_${o}_${p}`,An(a,l,c+h*3),s),Fn(`window_${o}_${p}`,An(a,l,c+h*3),null,wg(r.windows?r.windows(h,f):it()<.04?"red":it()<.42)),Fn("dado_standard_standard_01",An(a,l,c+h*3-.25),s)}Fn("cornice_standard_standard_01",An(a,l,u),s),Fn("crown_standard_standard_01",An(a,l,u+.2),s)}for(let f of[e,e+n]){let l=f===e+n?An(a,f-1,c).multiply(new we().makeTranslation(-3,0,0)):An(a,f,c);for(let h=0;h<i;h++)Fn("wall_pier_standard_01",l.clone().multiply(new we().makeTranslation(0,h*3,0)),s);Fn("crown_pier_pedestal_01",l.clone().multiply(new we().makeTranslation(0,i*3+.2,0)),s)}fl.push({sd:a,k0:e,cols:n,H:u,tint:s}),!r.door&&i>=5&&it()<.45&&$g.push(An(a,e+Math.floor(it()*n),c+3+3.65,.85)),it()<.5&&e_.push({sd:a,z:Sr(e)+(it()-.5)*Jn})}var fl=[];function iw(){for(let a of[-1,1]){let e=Xt.filter(n=>n.side===a);for(let n=-2;Sr(n)>ba-20;){let i=e.find(c=>c.k-1===n);if(i){Ag(a,n,3,i.floors,rw(i)),n+=3;continue}let r=e.find(c=>c.k-1>n),s=r?r.k-1-n:99,o=Math.min(s,2+Math.floor(it()*3));Ag(a,n,o,4+Math.floor(it()*4)),n+=o,it()<.25&&t_.push({sd:a,z:Sr(n)+Jn/2})}}}function rw(a){let e={door:a.k,tint:[ha[1],ha[0],ha[4],ha[3],ha[2]][Xt.indexOf(a)]};return a.kind==="servers"&&Object.assign(e,{style:"centered_double",windows:(n,i)=>(n+i)%3===0?"red":!1}),a.kind==="uni"&&(e.style="centered_large"),a.kind==="files"&&(e.style="centered_small"),e}var Ml=[];for(let a of[-1,1])for(let e=8+(a>0?8:0);e>ba;e-=16)Ml.push(new D(a*(si+1.2),0,e));var sw=new Lt({transparent:!0,depthWrite:!1,blending:Br,side:xn,uniforms:{c:{value:new se(1,.75,.45)}},vertexShader:"varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 c; varying float vY; void main(){ gl_FragColor = vec4(c * 0.03 * pow(vY, 1.8), 1.0); }"}),aw=vl(YT,new se(1,.7,.4),.45);Ml.forEach(a=>{let e=new Le(new sr(.4,4.2,3.4*Qe,24,1,!0),sw);e.position.set(a.x,1.7*Qe,a.z),Ye.add(e),jg(aw,1.1,10,a.x-Math.sign(a.x)*2.5,a.z+5)});var ow=new Dc().setMeshoptDecoder(pm),n_=[],zf=a=>{let e=new Promise(n=>ow.load(a,n,void 0,()=>n(null)));return n_.push(e),e},Of=new bt({color:16777215,toneMapped:!1}),cw=new xt({color:1709331,roughness:.95});function lw(a){return a.traverse(e=>{e.isMesh&&(e.castShadow=e.receiveShadow=!0)}),a}zf("assets/city/modular_urban_apartments_facade.glb").then(a=>{if(!a)return;a.scene.updateMatrixWorld(!0),a.scene.children.forEach(i=>{i.position.set(0,0,0),i.updateMatrixWorld(!0);let r=[],s=new vn;i.traverse(o=>{if(!o.isMesh)return;let c=o.material;/glass/.test(c.name)?c=Of:/plaster|trim/.test(c.name)&&(c=c.clone(),c.vertexColors=!1),r.push({key:o.uuid,geo:o.geometry,mat:c,rel:o.matrixWorld.clone()}),o.geometry.computeBoundingBox(),s.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld))}),ll[i.name]=r,r.bb=s}),ll.base_standard_01&&(Bf=ll.base_standard_01.bb.max.y),iw(),ri.forEach(i=>dw(i));for(let i of Df.values()){let r=new di(i.p.geo,i.p.mat,i.mats.length);i.mats.forEach((s,o)=>{r.setMatrixAt(o,s),r.setColorAt(o,i.cols[o])}),r.castShadow=i.p.mat!==Of,r.receiveShadow=!0,r.computeBoundingSphere(),r.userData.z=i.z,Jg.push(r),Ye.add(r)}let e=new dn(1,1,1),n=new di(e,cw,fl.length);fl.forEach((i,r)=>{let s=Sr(i.k0)+Jn/2-i.cols*Jn/2;n.setMatrixAt(r,new we().compose(new D(i.sd*(Zt+9),i.H*Qe/2,s),new nn,new D(17.6,i.H*Qe-.1,i.cols*Jn))),n.setColorAt(r,i.tint)}),n.receiveShadow=!0,Ye.add(n),hw(),uw()});function oo(a,e,n){zf(a).then(i=>{i&&(lw(i.scene),e.forEach((r,s)=>{let o=s?i.scene.clone():i.scene;n(o,r),Ye.add(o)}))})}function uw(){oo("assets/city/modular_fire_escape.glb",$g,(a,e)=>{a.applyMatrix4(e)}),oo("assets/city/metal_trash_can.glb",e_,(a,e)=>{a.scale.setScalar(Qe),a.position.set(e.sd*(Zt-1),.35,e.z),a.rotation.y=it()*6}),oo("assets/city/fire_hydrant.glb",t_,(a,e)=>{a.scale.setScalar(Qe),a.position.set(e.sd*(si+1.4),.35,e.z),a.rotation.y=e.sd<0?Math.PI/2:-Math.PI/2}),oo("assets/city/street_lamp_01.glb",Ml,(a,e)=>{a.scale.setScalar(Qe),a.position.set(e.x,.35,e.z),a.traverse(n=>{n.isMesh&&/glass/.test(n.material.name)&&(n.material=new bt({color:Gg.clone().multiplyScalar(3),toneMapped:!1}),n.castShadow=!1)})}),oo("assets/city/barrel_stove.glb",r_,(a,e)=>{a.scale.setScalar(Qe),a.position.set(e.x,.35,e.z);let n=new Le(new ti(1.6,2.4),vl(xl,new se(1,.45,.12),.9));n.position.set(e.x,.35+.86*Qe+.9,e.z),Ye.add(n),e.fire=n;let i=new Bi(16742954,60,22,1.8);i.position.set(e.x,3,e.z),Ye.add(i),e.light=i})}function hw(){let a=fl.filter(()=>it()<.45);if(!a.length)return;let e=document.createElement("canvas");e.width=128,e.height=64;let n=e.getContext("2d");n.fillStyle="#3b2b20",n.fillRect(0,0,128,64);for(let d=0;d<128;d+=8)n.fillStyle=`rgba(0,0,0,${.15+Math.random()*.25})`,n.fillRect(d,0,1.5,64),n.fillStyle=`rgba(120,90,60,${Math.random()*.25})`,n.fillRect(d+2,0,4,64);n.fillStyle="#15110e",[10,30,50].forEach(d=>n.fillRect(0,d,128,2));let i=new xt({map:new Ws(e),roughness:.9}),r=new xt({color:1842464,roughness:.6,metalness:.6});i.map.colorSpace=nt,i.map.wrapS=fi,i.map.repeat.x=3;let s=1.7*Qe,o=3.6*Qe,c=2.6*Qe,u=new di(new sr(s,s,o,20),i,a.length),f=new di(new _c(s*1.08,1.3*Qe,20),i,a.length),l=new di(new dn(.22*Qe,c,.22*Qe),r,a.length*4),h=new we;a.forEach((d,p)=>{let _=d.sd*(Zt+5+it()*4),b=Sr(d.k0)+Jn/2-d.cols*Jn*(.25+it()*.5),m=d.H*Qe;u.setMatrixAt(p,h.makeTranslation(_,m+c+o/2,b)),f.setMatrixAt(p,h.makeTranslation(_,m+c+o+.65*Qe,b)),[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([g,v],x)=>l.setMatrixAt(p*4+x,h.makeTranslation(_+g*s*.7,m+c/2,b+v*s*.7)))}),[u,f,l].forEach(d=>{d.castShadow=!0,d.receiveShadow=!0,d.computeBoundingSphere(),Ye.add(d)})}var i_=[];[-30,-86,-122].forEach((a,e)=>{let n=new Le(new Xs(.9,20),new xt({color:1579034,roughness:.5,metalness:.6}));n.rotation.x=-Math.PI/2,n.position.set(e%2?3.5:-3.5,.04,a),Ye.add(n);for(let i=0;i<7;i++){let r=new Le(new ti(1,1),vl(xl,new se(.55,.5,.52),.35));r.position.copy(n.position),r.userData={x0:n.position.x,z0:n.position.z,t:i/7},Ye.add(r),i_.push(r)}});[["W 4 ST",-1,-18],["BROADWAY",1,-70],["BLEECKER ST",-1,-112]].forEach(([a,e,n])=>{let i=new Le(new sr(.07,.07,6.2,8),new xt({color:1714719,roughness:.5,metalness:.5}));i.position.set(e*(si+.8),3.1+.35,n),Ye.add(i);let r=fa(a,.62,{fg:"#f4f4ee",glow:"rgba(0,0,0,0)",color:new se(.9,.9,.9)});r.material.toneMapped=!0;let s=new Le(new dn(r.geometry.parameters.width*.92,.56,.06),new xt({color:1993276,roughness:.45,metalness:.2}));s.position.set(e*(si+.8),6.3,n),s.rotation.y=Math.PI/2,r.position.set(0,0,.035),s.add(r);let o=r.clone();o.position.z=-.035,o.rotation.y=Math.PI,s.add(o),Ye.add(s)});var r_=[{x:-(Zt-2.5),z:-52},{x:Zt-3,z:-128}],Cf=new xt({color:4862760,roughness:.85}),Eg=new xt({color:921361,roughness:.45,metalness:.7}),Rg=new xt({color:2824722,roughness:.55}),fw=new xt({color:11569738,roughness:.3,metalness:.9});function dw(a){let e=Qe,n=Bf*e,i=(b,m,g,v,x,M,w)=>{let T=new Le(new dn(b,m,g),v);return T.position.set(x,M,w),T.castShadow=T.receiveShadow=!0,a.add(T),T},r=5,s=.3*e,o=.15*e,c=(n-.35)/r,u=2.3*e;for(let b=0;b<r;b++){let m=n-b*c;i(u,m,s,Cf,0,m/2,o+(b+.5)*s)}let f=r*s,l=Math.atan2(n-.35,f);for(let b of[-1,1]){let m=b*(u/2-.08*e),g=Math.hypot(f,n-.35),v=i(.07*e,.07*e,g,Eg,m,(n+.35)/2+.95*e,o+f/2);v.rotation.x=l;for(let x=0;x<r;x++){let M=o+(x+.5)*s,w=n-x*c;i(.035*e,.95*e,.035*e,Eg,m,w+.47*e,M)}}let h=1.4*e,d=2.25*e,p=n;for(let b of[-1,1])i(.3*e,d+.42*e,.3*e,Cf,b*(h/2+.15*e),p+(d+.42*e)/2,.15*e);i(h+.9*e,.24*e,.4*e,Cf,0,p+d+.54*e,.2*e);let _=i(h,.34*e,.06*e,ul,0,p+d+.2*e,.04*e);for(let b of[-1,1]){let m=i(h/2-.03*e,d,.1*e,Rg,b*(h/4),p+d/2,.05*e);for(let v of[.3,.72])i(h/2-.22*e,d*.3,.04*e,Rg,b*(h/4),p+d*v,.12*e);let g=new Le(new Wr(.05*e,10,8),fw);g.position.set(b*.12*e,p+d*.48,.14*e),a.add(g)}a.userData.lintel.visible=!1,a.userData.light.position.set(0,n+1.2*e,1.6*e),a.userData.sign.position.y=p+d+1.6*e,a.userData.frag.position.y=n+1.2*e,a.userData.fragY=n+1.2*e}var ri=[],Yi=new Set;try{Yi=new Set(JSON.parse(store.get("visited")||"[]"))}catch{}var ul=new bt({color:ga,toneMapped:!1});function pw(a,e){let n=new Ln;n.userData.i=e,n.position.set(a.side*Zt,0,a.z),n.rotation.y=a.side<0?Math.PI/2:-Math.PI/2;let i=2.2*Qe,r=2.9*Qe,s=new Le(new dn(i*.9,.12,.12),ul);s.position.set(0,r+.5,.3),n.add(s),n.userData.lintel=s;let o=new Bi(16719904,30,14,1.6);o.position.set(0,2.2,2.5),n.add(o),n.userData.light=o;let c=fa(`0${e+1} \xB7 ${ii("names")[e]}`,1.25);c.position.set(0,r+1.5,.5),n.add(c),n.userData.sign=c;let u=a.floors*3*Qe;if(a.kind==="servers"||a.kind==="antenna"){let d=a.kind==="antenna"?24:12,p=new Le(new sr(.12,.2,d,8),new xt({color:2369068,metalness:.7,roughness:.4}));p.position.set(0,u+d/2,-6),n.add(p);let _=new Le(new Wr(.5,12,12),ul);_.position.set(0,u+d+.3,-6),n.add(_),n.userData.blink=_}if(a.kind==="files"){let d=fa(L==="fr"?"CONFIDENTIEL":"CLASSIFIED",1,{fg:"#ff6a6a",color:ga.clone().multiplyScalar(.45)});d.position.set(-Jn,3.6*Qe,.6),d.rotation.z=.08,n.add(d)}if(a.kind==="arcade"){let d=fa("\u25C6 OPEN 24/7 \u25C6",1.3,{fg:"#ff6a6a",color:ga.clone().multiplyScalar(.6)});d.position.set(0,u-2.5,.6),n.add(d),n.userData.flicker=d}if(a.kind==="uni"){let d=fa("EST. 2021 \xB7 M2 INFO",.9,{fg:"#ffffff",color:new se(1.4,1.3,1.2)});d.position.set(0,u-1.6,.6),n.add(d)}let f=new Le(new dn(a.w,u,2),new bt({visible:!1}));f.position.set(0,u/2,0),n.add(f);let l=new Le(new bc(.5,0),ul);l.position.set(0,3,3.6),n.add(l),n.userData.frag=l,Yi.has(a.page)&&l.scale.setScalar(0);let h={emissiveIntensity:0};n.userData.door=h,Ye.add(n),ri.push(n),jg(vl(xl,new se(1,.1,.1),.45),8,8,a.side*(Zt-3),a.z)}function mw(){ri.forEach((a,e)=>{let n=a.userData.sign,i=fa(`0${e+1} \xB7 ${ii("names")[e]}`,1.25);i.position.copy(n.position),a.remove(n),a.add(i),a.userData.sign=i})}Xt.forEach(pw);function gw(a,e){return a.onBeforeCompile=n=>{n.uniforms.rimC={value:e},n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 rimC;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += rimC * pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);`)},a}var Xi=new Ln;Ye.add(Xi);var s_=new Bi(16765600,10,12,1.5);s_.position.set(1.5,6,3);Xi.add(s_);var dl=null,bn={},uo="";zf("assets/models/hero.glb").then(a=>{if(!a)return;let e=a.scene;e.scale.setScalar(Qe),e.traverse(n=>{n.isMesh&&(n.castShadow=!0,n.frustumCulled=!1,gw(n.material,new se(.16,.03,.04)),n.material.transparent&&(n.material.depthWrite=!1))}),Xi.add(e),dl=new Ec(e),a.animations.forEach(n=>bn[n.name]=dl.clipAction(n)),bn.agree&&(bn.agree.setLoop(Qu),bn.agree.clampWhenFinished=!1),a_("idle",0),gn.from(e.scale,{x:.001,y:.001,z:.001,duration:.9,ease:"back.out(1.7)"})});function a_(a,e=.25){if(uo===a||!bn[a])return;let n=bn[a].reset().play(),i=bn[uo];i&&n.crossFadeFrom(i,e,!0),uo=a}function _w(){bn.agree&&(bn.agree.reset().setEffectiveWeight(1).fadeIn(.15).play(),setTimeout(()=>bn.agree.fadeOut(.3),1300))}var pl=new Le(new Xs(1,32),new bt({map:xl,color:0,transparent:!0,opacity:.7,depthWrite:!1}));pl.rotation.x=-Math.PI/2;Ye.add(pl);var os=document.createElement("figure");os.className="outfit-card";os.innerHTML="<img alt=''>";wr.appendChild(os);var Nf="who";function bw(a,e){a!==Nf&&(Nf=a,os.firstChild.src=Hg[a],gn.fromTo(os,{rotate:-6,scale:.9},{rotate:0,scale:1,duration:.5,ease:"back.out(2)"})),os.classList.toggle("show",e)}os.firstChild.src=Hg.who;var Gf=Tr?700:1800,ho=new Float32Array(Gf*6);for(let a=0;a<Gf;a++){let e=(it()-.5)*70,n=it()*30,i=(it()-.5)*70;ho.set([e,n,i,e+.05,n-.9,i],a*6)}var Hf=new Ot;Hf.setAttribute("position",new Ct(ho,3));var Vf=new Vs(Hf,new Vr({color:9279403,transparent:!0,opacity:.3,depthWrite:!1}));Vf.frustumCulled=!1;Ye.add(Vf);var Si={amb:new as.Howl({src:["assets/sfx/ambiance.mp3"],loop:!0,volume:0}),hum:new as.Howl({src:["assets/sfx/serveurs.mp3"],loop:!0,volume:0}),step:new as.Howl({src:["assets/sfx/pas.mp3"],volume:.3}),door:new as.Howl({src:["assets/sfx/porte.mp3"],volume:.6})},po=!1;function xw(){let a=gl&&soundOn&&!still&&current==="home";a!==po&&(po=a,as.Howler.mute(!a),a&&(Si.amb.playing()||(Si.amb.play(),Si.hum.play()),Si.amb.fade(Si.amb.volume(),.45,1500)))}var Xe=new D(hl.x,0,hl.z),yi=0,fo=.18,ml=Math.PI,pt=-1,gl=!1,Cg=!1,Pg=0,ss=null,da=null,_a=!1,Lg=0,sl=0,vw=0,ni={k:1,e:0},Mr=new Set,Ar={x:0,y:0};function cs(a,e=2600){pa.textContent=a,pa.hidden=!1,clearTimeout(cs.t),e&&(cs.t=setTimeout(()=>{pt<0&&(pa.hidden=!0)},e))}function o_(a,e){let n=Xt[a];ss=new D(n.dx,0,n.dz),da=e?a:null}function Wf(a){if(_a)return;_a=!0,Mr.clear(),Ar.x=Ar.y=0,ss=null,da=null;let e=Xt[a],n=ri[a],i=!Yi.has(e.page);Yi.add(e.page),store.set("visited",JSON.stringify([...Yi])),Sl(),po&&Si.door.play(),ml=e.side<0?-Math.PI/2:Math.PI/2,i&&(gn.to(n.userData.frag.scale,{x:0,y:0,z:0,duration:.5,ease:"back.in(2)"}),gn.to(n.userData.frag.rotation,{y:"+=8",duration:.5}),cs(`\u25C6 ${ii("got")} \xB7 ${Yi.size}/5`,1600)),gn.to(n.userData.light,{intensity:160,duration:.6,yoyo:!0,repeat:1}),gn.fromTo(ni,{e:0},{e:1,duration:.85,ease:"power2.in",onComplete:()=>{go(e.page)}})}function Sl(){$$("#map li").forEach((a,e)=>{a.classList.toggle("done",Yi.has(Xt[e].page)),a.classList.toggle("here",e===pt)}),$("#questN").textContent=`${Yi.size}/5`}$("#map").innerHTML=Xt.map((a,e)=>`<li data-i="${e}"><b>0${e+1}</b></li>`).join("");$$("#map li").forEach(a=>a.addEventListener("click",()=>o_(+a.dataset.i,!0)));var _l={ArrowUp:"f",z:"f",w:"f",Z:"f",W:"f",ArrowDown:"b",s:"b",S:"b",ArrowLeft:"l",q:"l",a:"l",Q:"l",A:"l",ArrowRight:"r",d:"r",D:"r"},Xf=!1;addEventListener("keydown",a=>{Xf=a.shiftKey,!(current!=="home"||!introDone||a.target.tagName==="INPUT")&&(_l[a.key]&&(Mr.add(_l[a.key]),a.preventDefault()),["Enter"," ","e","E"].includes(a.key)&&pt>=0&&(a.preventDefault(),Wf(pt)))});addEventListener("keyup",a=>{Xf=a.shiftKey,_l[a.key]&&Mr.delete(_l[a.key])});var qf=At.domElement,Mi=null;qf.addEventListener("pointerdown",a=>{Mi={x:a.clientX,y:a.clientY,moved:0}});addEventListener("pointermove",a=>{if(!Mi||current!=="home")return;let e=a.clientX-Mi.x,n=a.clientY-Mi.y;Mi.x=a.clientX,Mi.y=a.clientY,Mi.moved+=Math.abs(e)+Math.abs(n),yi-=e*.005,fo=Math.max(.02,Math.min(.75,fo+n*.003))});addEventListener("pointerup",a=>{Mi&&Mi.moved<6&&a.target===qf&&yw(a.clientX,a.clientY),Mi=null});var Ig=new Rc,Dg=new me;function yw(a,e){let n=qf.getBoundingClientRect();Dg.set((a-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),Ig.setFromCamera(Dg,_n);let i=Ig.intersectObjects(ri,!0)[0];if(i){let r=i.object;for(;r&&r.userData.i===void 0;)r=r.parent;r&&o_(r.userData.i,!0)}}var ai=document.createElement("div");ai.className="stick-j";ai.innerHTML="<i></i>";wr.appendChild(ai);var bl=null,lo=null;ai.addEventListener("pointerdown",a=>{a.preventDefault(),a.stopPropagation(),bl=a.pointerId;let e=ai.getBoundingClientRect();lo={x:e.left+e.width/2,y:e.top+e.height/2,r:e.width/2},ai.setPointerCapture(bl)});ai.addEventListener("pointermove",a=>{if(a.pointerId!==bl)return;a.stopPropagation();let e=(a.clientX-lo.x)/lo.r,n=(a.clientY-lo.y)/lo.r,i=Math.hypot(e,n);i>1&&(e/=i,n/=i),Ar.x=e,Ar.y=n,ai.firstChild.style.transform=`translate(${e*28}px, ${n*28}px)`});var c_=()=>{bl=null,Ar.x=Ar.y=0,ai.firstChild.style.transform=""};ai.addEventListener("pointerup",c_);ai.addEventListener("pointercancel",c_);$("#padUp").addEventListener("click",()=>{pt>=0&&Wf(pt)});function Tl(){let a=wr.clientWidth||innerWidth,e=wr.clientHeight||innerHeight;At.setSize(a,e,!1),ls.setPixelRatio(At.getPixelRatio()),ls.setSize(a,e),Ff.resolution.set(a/2,e/2),_n.aspect=a/e,_n.updateProjectionMatrix()}addEventListener("resize",Tl);var Og=new D,Ng=new D,kn=new D,ua=new D,al=new D,co=new D,Ug=new D,Fg=new D,Pf=new D,kg=new D,Mw=a=>Math.atan2(Math.sin(a),Math.cos(a)),ol=Ml.map(a=>({p:a,d:0}));function Bg(){cl=!1,Ff.enabled=!1,Zg=90,Ye.fog.density=.02,At.setPixelRatio(navigator.webdriver?.5:Math.min(1,At.getPixelRatio())),At.shadowMap.enabled=!1,Ye.traverse(a=>{a.material&&[].concat(a.material).forEach(e=>e.needsUpdate=!0)}),Tl()}function l_(a){requestAnimationFrame(l_);let e=(a-Pg)/1e3||0,n=Math.min(.25,e);if(Pg=a,xw(),current!=="home"||!introDone)return;cl&&(Tr||navigator.webdriver)&&Bg(),cl&&e>0&&(sl+=e>.04?1:-.5,sl=Math.max(0,sl),++vw>30&&sl>20&&Bg());for(let _ of Jg)_.visible=Math.abs(_.userData.z-Xe.z)<Zg;Og.set(-Math.sin(yi),0,-Math.cos(yi)),Ng.set(Math.cos(yi),0,-Math.sin(yi));let i=(Mr.has("f")?1:0)-(Mr.has("b")?1:0)-Ar.y,r=(Mr.has("r")?1:0)-(Mr.has("l")?1:0)+Ar.x;kn.set(0,0,0).addScaledVector(Og,i).addScaledVector(Ng,r);let s=Math.min(1,kn.length());if(_a)kn.set(0,0,0);else if(kn.lengthSq()>.01)ss=null,da=null;else if(ss&&(kn.subVectors(ss,Xe),kn.y=0,kn.length()<.4&&(kn.set(0,0,0),ss=null,da!==null))){let _=da;da=null,Wf(_)}let o=kn.lengthSq()>.01,c=o&&!Xf&&(ss||s>.6);o&&(kn.normalize(),Xe.addScaledVector(kn,(c?zT:GT)*n),Xe.x=Math.max(-Zt+1.2,Math.min(Zt-1.2,Xe.x)),Xe.z=Math.max(ba,Math.min(mo-4,Xe.z)),ml=Math.atan2(kn.x,kn.z),gl&&!Cg&&(Cg=!0,wr.classList.add("moved")));let u=Math.abs(Xe.x)>si+.2?.35:0;if(Xi.position.set(Xe.x,Xi.position.y+(u-Xi.position.y)*Math.min(1,n*14),Xe.z),Xi.rotation.y+=Mw(ml-Xi.rotation.y)*Math.min(1,n*12),a_(o?c?"run":"walk":"idle"),dl){bn.run&&(bn.run.timeScale=1.05),bn.walk&&(bn.walk.timeScale=1.1),dl.update(still?0:n);let _=bn[uo],b=_&&_.getClip();if(o&&b){let m=_.time/b.duration*2%1;m<Lg&&po&&(Si.step.rate(.9+Math.random()*.2),Si.step.play()),Lg=m}}pl.position.set(Xe.x,Xi.position.y+.05,Xe.z),pl.scale.setScalar(o?1.3:1.5),ji.position.set(Xe.x+25,70,Xe.z+30),ji.target.position.copy(Xe),ol.forEach(_=>_.d=Math.abs(_.p.z-Xe.z)+Math.abs(_.p.x-Xe.x)*.3),ol.sort((_,b)=>_.d-b.d),qg.forEach((_,b)=>_.position.set(ol[b].p.x,3.5*Qe,ol[b].p.z));let f=11*(_n.aspect<.8?1.4:1);if(ua.set(Xe.x+Math.sin(yi)*Math.cos(fo)*f,1.6+Math.sin(fo)*f+2,Xe.z+Math.cos(yi)*Math.cos(fo)*f),ua.x=Math.max(-Zt+.8,Math.min(Zt-.8,ua.x)),al.set(Xe.x-Math.sin(yi)*4,Lf*.85,Xe.z-Math.cos(yi)*4),ni.k>0&&(Ug.set(Xe.x+4,62,Xe.z+46),Fg.set(0,6,-90),ua.lerp(Ug,ni.k),al.lerp(Fg,ni.k)),ni.e>0&&pt>=0){let _=Xt[pt];Pf.set(_.side*Zt,2.6,_.z),kg.set(-_.side*6,1.5,0).add(Pf),ua.lerp(kg,ni.e),al.lerp(Pf,ni.e)}_n.position.lerp(ua,ni.k>0||ni.e>0?1:Math.min(1,n*4)),_n.lookAt(al);let l=-1,h=-1,d=1e9;if(Xt.forEach((_,b)=>{Math.abs(Xe.z-_.z)<_.w/2+2&&Math.sign(Xe.x)===_.side&&(l=b);let g=Math.hypot(Xe.x-_.dx,Xe.z-_.dz);g<4.5&&g<d&&(d=g,h=b)}),bw(l>=0?Xt[l].outfit:"who",l>=0),h!==pt&&!_a&&(pt>=0&&(gn.to(ri[pt].userData.light,{intensity:40,duration:.4}),gn.to(ri[pt].userData.sign.scale,{x:1,y:1,duration:.3})),pt=h,$("#padUp").hidden=pt<0,pt>=0?(cs(`\u25B2 ${t(Xt[pt].page)} \xB7 ${ii("enter")}`,0),_w(),gn.to(ri[pt].userData.light,{intensity:90,duration:.4}),gn.to(ri[pt].userData.sign.scale,{x:1.15,y:1.15,duration:.5,ease:"back.out(3)"})):pa.hidden=!0,Sl()),po){let _=Xt[2],b=Math.hypot(Xe.x-_.dx,Xe.z-_.z);Si.hum.volume(Math.max(0,1-b/28)*.5),co.set(_.side*Zt,4,_.z).project(_n),Si.hum.stereo(Math.max(-1,Math.min(1,co.x))*.8)}co.set(Xe.x,Lf+1.3,Xe.z).project(_n),pa.style.left=(co.x+1)/2*100+"%",pa.style.top=(1-co.y)/2*100+"%";let p=a/1e3;if(Vg.uniforms.time.value=p,!still){Vf.position.set(Math.round(Xe.x/70)*70,0,Math.round(Xe.z/70)*70);for(let _=0;_<Gf;_++){let b=_*6,m=ho[b+1]-n*28;m<0&&(m+=30),ho[b+1]=m,ho[b+4]=m-.9}Hf.attributes.position.needsUpdate=!0,Kg.forEach(_=>_.visible=Math.sin(p*2+_.userData.ph)>0),i_.forEach(_=>{let b=_.userData.t=(_.userData.t+n*.18)%1;_.position.set(_.userData.x0+Math.sin(b*5+_.userData.z0)*.6,.3+b*7,_.userData.z0+b*1.2),_.scale.setScalar(1.2+b*5),_.material.opacity=.32*Math.sin(b*Math.PI),_.lookAt(_n.position)}),r_.forEach(_=>{if(!_.fire)return;let b=.75+Math.sin(p*13+_.z)*.12+Math.random()*.13;_.fire.material.opacity=b,_.light.intensity=60*b,_.fire.lookAt(_n.position.x,_.fire.position.y,_n.position.z)}),ri.forEach(_=>{_.userData.blink&&(_.userData.blink.visible=Math.floor(p*1.5)%2===0),_.userData.flicker&&(_.userData.flicker.material.opacity=Math.random()<.03?.15:1);let b=_.userData.frag;b.rotation.y+=n*1.6,b.position.y=(_.userData.fragY||3)+Math.sin(p*2+_.userData.i)*.35})}cl?ls.render():At.render(Ye,_n)}window.world={start(){gl||(gl=!0,gn.fromTo(ni,{k:1},{k:0,duration:still?0:3.6,ease:"power3.inOut",delay:.2}),gn.from("#world .hud > *, #helpW",{y:-16,opacity:0,duration:.8,stagger:.12,delay:1.8,ease:"power2.out",clearProps:"all"}),setTimeout(()=>cs(ii("hello"),3200),2800))},onView(a){a==="home"&&(Mr.clear(),Tl(),Sl(),_a&&(_a=!1,ni.e=0,pt>=0&&(Xe.x=Xt[pt].dx*.8,ml=Xt[pt].side<0?Math.PI/2:-Math.PI/2)),Yi.size===5&&setTimeout(()=>cs(ii("done"),4e3),600))},relabel(){ri.length&&(mw(),$("#helpW").textContent=ii(Tr?"helpT":"helpW"),$("#padUp").textContent=ii("enterBtn"),$$("#home [data-i='quest']").forEach(a=>a.textContent=ii("quest")),pt>=0&&cs(`\u25B2 ${t(Xt[pt].page)} \xB7 ${ii("enter")}`,0))},get x(){return Xe.x},get z(){return Xe.z},get near(){return pt},get outfit(){return Nf},get anim(){return uo},places:Xt,teleport(a){let e=Xt[a];Xe.set(e.dx*.8,0,e.dz+1)},look(a){yi=a}};Xe.set(hl.x,0,hl.z);_n.position.set(4,62,50);Tl();world.relabel();Sl();introDone&&world.start();Promise.all(n_).then(()=>setTimeout(()=>{introDone||!At.compileAsync||At.compileAsync(Ye,_n).catch(()=>{})},0));requestAnimationFrame(l_);})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
