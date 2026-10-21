(()=>{var o_=Object.create;var jf=Object.defineProperty;var c_=Object.getOwnPropertyDescriptor;var l_=Object.getOwnPropertyNames;var u_=Object.getPrototypeOf,h_=Object.prototype.hasOwnProperty;var f_=(a,e)=>()=>(e||a((e={exports:{}}).exports,e),e.exports);var d_=(a,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of l_(e))!h_.call(a,r)&&r!==n&&jf(a,r,{get:()=>e[r],enumerable:!(i=c_(e,r))||i.enumerable});return a};var p_=(a,e,n)=>(n=a!=null?o_(u_(a)):{},d_(e||!a||!a.__esModule?jf(n,"default",{value:a,enumerable:!0}):n,a));var bg=f_(il=>{(function(){"use strict";var a=function(){this.init()};a.prototype={init:function(){var c=this||e;return c._counter=1e3,c._html5AudioPool=[],c.html5PoolSize=10,c._codecs={},c._howls=[],c._muted=!1,c._volume=1,c._canPlayEvent="canplaythrough",c._navigator=typeof window!="undefined"&&window.navigator?window.navigator:null,c.masterGain=null,c.noAudio=!1,c.usingWebAudio=!0,c.autoSuspend=!0,c.ctx=null,c.autoUnlock=!0,c._setup(),c},volume:function(c){var f=this||e;if(c=parseFloat(c),f.ctx||h(),typeof c!="undefined"&&c>=0&&c<=1){if(f._volume=c,f._muted)return f;f.usingWebAudio&&f.masterGain.gain.setValueAtTime(c,e.ctx.currentTime);for(var d=0;d<f._howls.length;d++)if(!f._howls[d]._webAudio)for(var p=f._howls[d]._getSoundIds(),_=0;_<p.length;_++){var b=f._howls[d]._soundById(p[_]);b&&b._node&&(b._node.volume=b._volume*c)}return f}return f._volume},mute:function(c){var f=this||e;f.ctx||h(),f._muted=c,f.usingWebAudio&&f.masterGain.gain.setValueAtTime(c?0:f._volume,e.ctx.currentTime);for(var d=0;d<f._howls.length;d++)if(!f._howls[d]._webAudio)for(var p=f._howls[d]._getSoundIds(),_=0;_<p.length;_++){var b=f._howls[d]._soundById(p[_]);b&&b._node&&(b._node.muted=c?!0:b._muted)}return f},stop:function(){for(var c=this||e,f=0;f<c._howls.length;f++)c._howls[f].stop();return c},unload:function(){for(var c=this||e,f=c._howls.length-1;f>=0;f--)c._howls[f].unload();return c.usingWebAudio&&c.ctx&&typeof c.ctx.close!="undefined"&&(c.ctx.close(),c.ctx=null,h()),c},codecs:function(c){return(this||e)._codecs[c.replace(/^x-/,"")]},_setup:function(){var c=this||e;if(c.state=c.ctx&&c.ctx.state||"suspended",c._autoSuspend(),!c.usingWebAudio)if(typeof Audio!="undefined")try{var f=new Audio;typeof f.oncanplaythrough=="undefined"&&(c._canPlayEvent="canplay")}catch{c.noAudio=!0}else c.noAudio=!0;try{var f=new Audio;f.muted&&(c.noAudio=!0)}catch{}return c.noAudio||c._setupCodecs(),c},_setupCodecs:function(){var c=this||e,f=null;try{f=typeof Audio!="undefined"?new Audio:null}catch{return c}if(!f||typeof f.canPlayType!="function")return c;var d=f.canPlayType("audio/mpeg;").replace(/^no$/,""),p=c._navigator?c._navigator.userAgent:"",_=p.match(/OPR\/(\d+)/g),b=_&&parseInt(_[0].split("/")[1],10)<33,m=p.indexOf("Safari")!==-1&&p.indexOf("Chrome")===-1,g=p.match(/Version\/(.*?) /),v=m&&g&&parseInt(g[1],10)<15;return c._codecs={mp3:!!(!b&&(d||f.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!d,opus:!!f.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!f.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!f.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(f.canPlayType('audio/wav; codecs="1"')||f.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!f.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!f.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(f.canPlayType("audio/x-m4a;")||f.canPlayType("audio/m4a;")||f.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(f.canPlayType("audio/x-m4b;")||f.canPlayType("audio/m4b;")||f.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(f.canPlayType("audio/x-mp4;")||f.canPlayType("audio/mp4;")||f.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!v&&f.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!v&&f.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!f.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(f.canPlayType("audio/x-flac;")||f.canPlayType("audio/flac;")).replace(/^no$/,"")},c},_unlockAudio:function(){var c=this||e;if(!(c._audioUnlocked||!c.ctx)){c._audioUnlocked=!1,c.autoUnlock=!1,!c._mobileUnloaded&&c.ctx.sampleRate!==44100&&(c._mobileUnloaded=!0,c.unload()),c._scratchBuffer=c.ctx.createBuffer(1,1,22050);var f=function(d){for(;c._html5AudioPool.length<c.html5PoolSize;)try{var p=new Audio;p._unlocked=!0,c._releaseHtml5Audio(p)}catch{c.noAudio=!0;break}for(var _=0;_<c._howls.length;_++)if(!c._howls[_]._webAudio)for(var b=c._howls[_]._getSoundIds(),m=0;m<b.length;m++){var g=c._howls[_]._soundById(b[m]);g&&g._node&&!g._node._unlocked&&(g._node._unlocked=!0,g._node.load())}c._autoResume();var v=c.ctx.createBufferSource();v.buffer=c._scratchBuffer,v.connect(c.ctx.destination),typeof v.start=="undefined"?v.noteOn(0):v.start(0),typeof c.ctx.resume=="function"&&c.ctx.resume(),v.onended=function(){v.disconnect(0),c._audioUnlocked=!0,document.removeEventListener("touchstart",f,!0),document.removeEventListener("touchend",f,!0),document.removeEventListener("click",f,!0),document.removeEventListener("keydown",f,!0);for(var x=0;x<c._howls.length;x++)c._howls[x]._emit("unlock")}};return document.addEventListener("touchstart",f,!0),document.addEventListener("touchend",f,!0),document.addEventListener("click",f,!0),document.addEventListener("keydown",f,!0),c}},_obtainHtml5Audio:function(){var c=this||e;if(c._html5AudioPool.length)return c._html5AudioPool.pop();var f=new Audio().play();return f&&typeof Promise!="undefined"&&(f instanceof Promise||typeof f.then=="function")&&f.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(c){var f=this||e;return c._unlocked&&f._html5AudioPool.push(c),f},_autoSuspend:function(){var c=this;if(!(!c.autoSuspend||!c.ctx||typeof c.ctx.suspend=="undefined"||!e.usingWebAudio)){for(var f=0;f<c._howls.length;f++)if(c._howls[f]._webAudio){for(var d=0;d<c._howls[f]._sounds.length;d++)if(!c._howls[f]._sounds[d]._paused)return c}return c._suspendTimer&&clearTimeout(c._suspendTimer),c._suspendTimer=setTimeout(function(){if(c.autoSuspend){c._suspendTimer=null,c.state="suspending";var p=function(){c.state="suspended",c._resumeAfterSuspend&&(delete c._resumeAfterSuspend,c._autoResume())};c.ctx.suspend().then(p,p)}},3e4),c}},_autoResume:function(){var c=this;if(!(!c.ctx||typeof c.ctx.resume=="undefined"||!e.usingWebAudio))return c.state==="running"&&c.ctx.state!=="interrupted"&&c._suspendTimer?(clearTimeout(c._suspendTimer),c._suspendTimer=null):c.state==="suspended"||c.state==="running"&&c.ctx.state==="interrupted"?(c.ctx.resume().then(function(){c.state="running";for(var f=0;f<c._howls.length;f++)c._howls[f]._emit("resume")}),c._suspendTimer&&(clearTimeout(c._suspendTimer),c._suspendTimer=null)):c.state==="suspending"&&(c._resumeAfterSuspend=!0),c}};var e=new a,n=function(c){var f=this;if(!c.src||c.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}f.init(c)};n.prototype={init:function(c){var f=this;return e.ctx||h(),f._autoplay=c.autoplay||!1,f._format=typeof c.format!="string"?c.format:[c.format],f._html5=c.html5||!1,f._muted=c.mute||!1,f._loop=c.loop||!1,f._pool=c.pool||5,f._preload=typeof c.preload=="boolean"||c.preload==="metadata"?c.preload:!0,f._rate=c.rate||1,f._sprite=c.sprite||{},f._src=typeof c.src!="string"?c.src:[c.src],f._volume=c.volume!==void 0?c.volume:1,f._xhr={method:c.xhr&&c.xhr.method?c.xhr.method:"GET",headers:c.xhr&&c.xhr.headers?c.xhr.headers:null,withCredentials:c.xhr&&c.xhr.withCredentials?c.xhr.withCredentials:!1},f._duration=0,f._state="unloaded",f._sounds=[],f._endTimers={},f._queue=[],f._playLock=!1,f._onend=c.onend?[{fn:c.onend}]:[],f._onfade=c.onfade?[{fn:c.onfade}]:[],f._onload=c.onload?[{fn:c.onload}]:[],f._onloaderror=c.onloaderror?[{fn:c.onloaderror}]:[],f._onplayerror=c.onplayerror?[{fn:c.onplayerror}]:[],f._onpause=c.onpause?[{fn:c.onpause}]:[],f._onplay=c.onplay?[{fn:c.onplay}]:[],f._onstop=c.onstop?[{fn:c.onstop}]:[],f._onmute=c.onmute?[{fn:c.onmute}]:[],f._onvolume=c.onvolume?[{fn:c.onvolume}]:[],f._onrate=c.onrate?[{fn:c.onrate}]:[],f._onseek=c.onseek?[{fn:c.onseek}]:[],f._onunlock=c.onunlock?[{fn:c.onunlock}]:[],f._onresume=[],f._webAudio=e.usingWebAudio&&!f._html5,typeof e.ctx!="undefined"&&e.ctx&&e.autoUnlock&&e._unlockAudio(),e._howls.push(f),f._autoplay&&f._queue.push({event:"play",action:function(){f.play()}}),f._preload&&f._preload!=="none"&&f.load(),f},load:function(){var c=this,f=null;if(e.noAudio){c._emit("loaderror",null,"No audio support.");return}typeof c._src=="string"&&(c._src=[c._src]);for(var d=0;d<c._src.length;d++){var p,_;if(c._format&&c._format[d])p=c._format[d];else{if(_=c._src[d],typeof _!="string"){c._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}p=/^data:audio\/([^;,]+);/i.exec(_),p||(p=/\.([^.]+)$/.exec(_.split("?",1)[0])),p&&(p=p[1].toLowerCase())}if(p||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),p&&e.codecs(p)){f=c._src[d];break}}if(!f){c._emit("loaderror",null,"No codec support for selected audio sources.");return}return c._src=f,c._state="loading",window.location.protocol==="https:"&&f.slice(0,5)==="http:"&&(c._html5=!0,c._webAudio=!1),new i(c),c._webAudio&&s(c),c},play:function(c,f){var d=this,p=null;if(typeof c=="number")p=c,c=null;else{if(typeof c=="string"&&d._state==="loaded"&&!d._sprite[c])return null;if(typeof c=="undefined"&&(c="__default",!d._playLock)){for(var _=0,b=0;b<d._sounds.length;b++)d._sounds[b]._paused&&!d._sounds[b]._ended&&(_++,p=d._sounds[b]._id);_===1?c=null:p=null}}var m=p?d._soundById(p):d._inactiveSound();if(!m)return null;if(p&&!c&&(c=m._sprite||"__default"),d._state!=="loaded"){m._sprite=c,m._ended=!1;var g=m._id;return d._queue.push({event:"play",action:function(){d.play(g)}}),g}if(p&&!m._paused)return f||d._loadQueue("play"),m._id;d._webAudio&&e._autoResume();var v=Math.max(0,m._seek>0?m._seek:d._sprite[c][0]/1e3),x=Math.max(0,(d._sprite[c][0]+d._sprite[c][1])/1e3-v),M=x*1e3/Math.abs(m._rate),w=d._sprite[c][0]/1e3,T=(d._sprite[c][0]+d._sprite[c][1])/1e3;m._sprite=c,m._ended=!1;var A=function(){m._paused=!1,m._seek=v,m._start=w,m._stop=T,m._loop=!!(m._loop||d._sprite[c][2])};if(v>=T){d._ended(m);return}var C=m._node;if(d._webAudio){var y=function(){d._playLock=!1,A(),d._refreshBuffer(m);var V=m._muted||d._muted?0:m._volume;C.gain.setValueAtTime(V,e.ctx.currentTime),m._playStart=e.ctx.currentTime,typeof C.bufferSource.start=="undefined"?m._loop?C.bufferSource.noteGrainOn(0,v,86400):C.bufferSource.noteGrainOn(0,v,x):m._loop?C.bufferSource.start(0,v,86400):C.bufferSource.start(0,v,x),M!==1/0&&(d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),M)),f||setTimeout(function(){d._emit("play",m._id),d._loadQueue()},0)};e.state==="running"&&e.ctx.state!=="interrupted"?y():(d._playLock=!0,d.once("resume",y),d._clearTimer(m._id))}else{var S=function(){C.currentTime=v,C.muted=m._muted||d._muted||e._muted||C.muted,C.volume=m._volume*e.volume(),C.playbackRate=m._rate;try{var V=C.play();if(V&&typeof Promise!="undefined"&&(V instanceof Promise||typeof V.then=="function")?(d._playLock=!0,A(),V.then(function(){d._playLock=!1,C._unlocked=!0,f?d._loadQueue():d._emit("play",m._id)}).catch(function(){d._playLock=!1,d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),m._ended=!0,m._paused=!0})):f||(d._playLock=!1,A(),d._emit("play",m._id)),C.playbackRate=m._rate,C.paused){d._emit("playerror",m._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}c!=="__default"||m._loop?d._endTimers[m._id]=setTimeout(d._ended.bind(d,m),M):(d._endTimers[m._id]=function(){d._ended(m),C.removeEventListener("ended",d._endTimers[m._id],!1)},C.addEventListener("ended",d._endTimers[m._id],!1))}catch(I){d._emit("playerror",m._id,I)}};C.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(C.src=d._src,C.load());var N=window&&window.ejecta||!C.readyState&&e._navigator.isCocoonJS;if(C.readyState>=3||N)S();else{d._playLock=!0,d._state="loading";var F=function(){d._state="loaded",S(),C.removeEventListener(e._canPlayEvent,F,!1)};C.addEventListener(e._canPlayEvent,F,!1),d._clearTimer(m._id)}}return m._id},pause:function(c){var f=this;if(f._state!=="loaded"||f._playLock)return f._queue.push({event:"pause",action:function(){f.pause(c)}}),f;for(var d=f._getSoundIds(c),p=0;p<d.length;p++){f._clearTimer(d[p]);var _=f._soundById(d[p]);if(_&&!_._paused&&(_._seek=f.seek(d[p]),_._rateSeek=0,_._paused=!0,f._stopFade(d[p]),_._node))if(f._webAudio){if(!_._node.bufferSource)continue;typeof _._node.bufferSource.stop=="undefined"?_._node.bufferSource.noteOff(0):_._node.bufferSource.stop(0),f._cleanBuffer(_._node)}else(!isNaN(_._node.duration)||_._node.duration===1/0)&&_._node.pause();arguments[1]||f._emit("pause",_?_._id:null)}return f},stop:function(c,f){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"stop",action:function(){d.stop(c)}}),d;for(var p=d._getSoundIds(c),_=0;_<p.length;_++){d._clearTimer(p[_]);var b=d._soundById(p[_]);b&&(b._seek=b._start||0,b._rateSeek=0,b._paused=!0,b._ended=!0,d._stopFade(p[_]),b._node&&(d._webAudio?b._node.bufferSource&&(typeof b._node.bufferSource.stop=="undefined"?b._node.bufferSource.noteOff(0):b._node.bufferSource.stop(0),d._cleanBuffer(b._node)):(!isNaN(b._node.duration)||b._node.duration===1/0)&&(b._node.currentTime=b._start||0,b._node.pause(),b._node.duration===1/0&&d._clearSound(b._node))),f||d._emit("stop",b._id))}return d},mute:function(c,f){var d=this;if(d._state!=="loaded"||d._playLock)return d._queue.push({event:"mute",action:function(){d.mute(c,f)}}),d;if(typeof f=="undefined")if(typeof c=="boolean")d._muted=c;else return d._muted;for(var p=d._getSoundIds(f),_=0;_<p.length;_++){var b=d._soundById(p[_]);b&&(b._muted=c,b._interval&&d._stopFade(b._id),d._webAudio&&b._node?b._node.gain.setValueAtTime(c?0:b._volume,e.ctx.currentTime):b._node&&(b._node.muted=e._muted?!0:c),d._emit("mute",b._id))}return d},volume:function(){var c=this,f=arguments,d,p;if(f.length===0)return c._volume;if(f.length===1||f.length===2&&typeof f[1]=="undefined"){var _=c._getSoundIds(),b=_.indexOf(f[0]);b>=0?p=parseInt(f[0],10):d=parseFloat(f[0])}else f.length>=2&&(d=parseFloat(f[0]),p=parseInt(f[1],10));var m;if(typeof d!="undefined"&&d>=0&&d<=1){if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"volume",action:function(){c.volume.apply(c,f)}}),c;typeof p=="undefined"&&(c._volume=d),p=c._getSoundIds(p);for(var g=0;g<p.length;g++)m=c._soundById(p[g]),m&&(m._volume=d,f[2]||c._stopFade(p[g]),c._webAudio&&m._node&&!m._muted?m._node.gain.setValueAtTime(d,e.ctx.currentTime):m._node&&!m._muted&&(m._node.volume=d*e.volume()),c._emit("volume",m._id))}else return m=p?c._soundById(p):c._sounds[0],m?m._volume:0;return c},fade:function(c,f,d,p){var _=this;if(_._state!=="loaded"||_._playLock)return _._queue.push({event:"fade",action:function(){_.fade(c,f,d,p)}}),_;c=Math.min(Math.max(0,parseFloat(c)),1),f=Math.min(Math.max(0,parseFloat(f)),1),d=parseFloat(d),_.volume(c,p);for(var b=_._getSoundIds(p),m=0;m<b.length;m++){var g=_._soundById(b[m]);if(g){if(p||_._stopFade(b[m]),_._webAudio&&!g._muted){var v=e.ctx.currentTime,x=v+d/1e3;g._volume=c,g._node.gain.setValueAtTime(c,v),g._node.gain.linearRampToValueAtTime(f,x)}_._startFadeInterval(g,c,f,d,b[m],typeof p=="undefined")}}return _},_startFadeInterval:function(c,f,d,p,_,b){var m=this,g=f,v=d-f,x=Math.abs(v/.01),M=Math.max(4,x>0?p/x:p),w=Date.now();c._fadeTo=d,c._interval=setInterval(function(){var T=(Date.now()-w)/p;w=Date.now(),g+=v*T,g=Math.round(g*100)/100,v<0?g=Math.max(d,g):g=Math.min(d,g),m._webAudio?c._volume=g:m.volume(g,c._id,!0),b&&(m._volume=g),(d<f&&g<=d||d>f&&g>=d)&&(clearInterval(c._interval),c._interval=null,c._fadeTo=null,m.volume(d,c._id),m._emit("fade",c._id))},M)},_stopFade:function(c){var f=this,d=f._soundById(c);return d&&d._interval&&(f._webAudio&&d._node.gain.cancelScheduledValues(e.ctx.currentTime),clearInterval(d._interval),d._interval=null,f.volume(d._fadeTo,c),d._fadeTo=null,f._emit("fade",c)),f},loop:function(){var c=this,f=arguments,d,p,_;if(f.length===0)return c._loop;if(f.length===1)if(typeof f[0]=="boolean")d=f[0],c._loop=d;else return _=c._soundById(parseInt(f[0],10)),_?_._loop:!1;else f.length===2&&(d=f[0],p=parseInt(f[1],10));for(var b=c._getSoundIds(p),m=0;m<b.length;m++)_=c._soundById(b[m]),_&&(_._loop=d,c._webAudio&&_._node&&_._node.bufferSource&&(_._node.bufferSource.loop=d,d&&(_._node.bufferSource.loopStart=_._start||0,_._node.bufferSource.loopEnd=_._stop,c.playing(b[m])&&(c.pause(b[m],!0),c.play(b[m],!0)))));return c},rate:function(){var c=this,f=arguments,d,p;if(f.length===0)p=c._sounds[0]._id;else if(f.length===1){var _=c._getSoundIds(),b=_.indexOf(f[0]);b>=0?p=parseInt(f[0],10):d=parseFloat(f[0])}else f.length===2&&(d=parseFloat(f[0]),p=parseInt(f[1],10));var m;if(typeof d=="number"){if(c._state!=="loaded"||c._playLock)return c._queue.push({event:"rate",action:function(){c.rate.apply(c,f)}}),c;typeof p=="undefined"&&(c._rate=d),p=c._getSoundIds(p);for(var g=0;g<p.length;g++)if(m=c._soundById(p[g]),m){c.playing(p[g])&&(m._rateSeek=c.seek(p[g]),m._playStart=c._webAudio?e.ctx.currentTime:m._playStart),m._rate=d,c._webAudio&&m._node&&m._node.bufferSource?m._node.bufferSource.playbackRate.setValueAtTime(d,e.ctx.currentTime):m._node&&(m._node.playbackRate=d);var v=c.seek(p[g]),x=(c._sprite[m._sprite][0]+c._sprite[m._sprite][1])/1e3-v,M=x*1e3/Math.abs(m._rate);(c._endTimers[p[g]]||!m._paused)&&(c._clearTimer(p[g]),c._endTimers[p[g]]=setTimeout(c._ended.bind(c,m),M)),c._emit("rate",m._id)}}else return m=c._soundById(p),m?m._rate:c._rate;return c},seek:function(){var c=this,f=arguments,d,p;if(f.length===0)c._sounds.length&&(p=c._sounds[0]._id);else if(f.length===1){var _=c._getSoundIds(),b=_.indexOf(f[0]);b>=0?p=parseInt(f[0],10):c._sounds.length&&(p=c._sounds[0]._id,d=parseFloat(f[0]))}else f.length===2&&(d=parseFloat(f[0]),p=parseInt(f[1],10));if(typeof p=="undefined")return 0;if(typeof d=="number"&&(c._state!=="loaded"||c._playLock))return c._queue.push({event:"seek",action:function(){c.seek.apply(c,f)}}),c;var m=c._soundById(p);if(m)if(typeof d=="number"&&d>=0){var g=c.playing(p);g&&c.pause(p,!0),m._seek=d,m._ended=!1,c._clearTimer(p),!c._webAudio&&m._node&&!isNaN(m._node.duration)&&(m._node.currentTime=d);var v=function(){g&&c.play(p,!0),c._emit("seek",p)};if(g&&!c._webAudio){var x=function(){c._playLock?setTimeout(x,0):v()};setTimeout(x,0)}else v()}else if(c._webAudio){var M=c.playing(p)?e.ctx.currentTime-m._playStart:0,w=m._rateSeek?m._rateSeek-m._seek:0;return m._seek+(w+M*Math.abs(m._rate))}else return m._node.currentTime;return c},playing:function(c){var f=this;if(typeof c=="number"){var d=f._soundById(c);return d?!d._paused:!1}for(var p=0;p<f._sounds.length;p++)if(!f._sounds[p]._paused)return!0;return!1},duration:function(c){var f=this,d=f._duration,p=f._soundById(c);return p&&(d=f._sprite[p._sprite][1]/1e3),d},state:function(){return this._state},unload:function(){for(var c=this,f=c._sounds,d=0;d<f.length;d++)f[d]._paused||c.stop(f[d]._id),c._webAudio||(c._clearSound(f[d]._node),f[d]._node.removeEventListener("error",f[d]._errorFn,!1),f[d]._node.removeEventListener(e._canPlayEvent,f[d]._loadFn,!1),f[d]._node.removeEventListener("ended",f[d]._endFn,!1),e._releaseHtml5Audio(f[d]._node)),delete f[d]._node,c._clearTimer(f[d]._id);var p=e._howls.indexOf(c);p>=0&&e._howls.splice(p,1);var _=!0;for(d=0;d<e._howls.length;d++)if(e._howls[d]._src===c._src||c._src.indexOf(e._howls[d]._src)>=0){_=!1;break}return r&&_&&delete r[c._src],e.noAudio=!1,c._state="unloaded",c._sounds=[],c=null,null},on:function(c,f,d,p){var _=this,b=_["_on"+c];return typeof f=="function"&&b.push(p?{id:d,fn:f,once:p}:{id:d,fn:f}),_},off:function(c,f,d){var p=this,_=p["_on"+c],b=0;if(typeof f=="number"&&(d=f,f=null),f||d)for(b=0;b<_.length;b++){var m=d===_[b].id;if(f===_[b].fn&&m||!f&&m){_.splice(b,1);break}}else if(c)p["_on"+c]=[];else{var g=Object.keys(p);for(b=0;b<g.length;b++)g[b].indexOf("_on")===0&&Array.isArray(p[g[b]])&&(p[g[b]]=[])}return p},once:function(c,f,d){var p=this;return p.on(c,f,d,1),p},_emit:function(c,f,d){for(var p=this,_=p["_on"+c],b=_.length-1;b>=0;b--)(!_[b].id||_[b].id===f||c==="load")&&(setTimeout(function(m){m.call(this,f,d)}.bind(p,_[b].fn),0),_[b].once&&p.off(c,_[b].fn,_[b].id));return p._loadQueue(c),p},_loadQueue:function(c){var f=this;if(f._queue.length>0){var d=f._queue[0];d.event===c&&(f._queue.shift(),f._loadQueue()),c||d.action()}return f},_ended:function(c){var f=this,d=c._sprite;if(!f._webAudio&&c._node&&!c._node.paused&&!c._node.ended&&c._node.currentTime<c._stop)return setTimeout(f._ended.bind(f,c),100),f;var p=!!(c._loop||f._sprite[d][2]);if(f._emit("end",c._id),!f._webAudio&&p&&f.stop(c._id,!0).play(c._id),f._webAudio&&p){f._emit("play",c._id),c._seek=c._start||0,c._rateSeek=0,c._playStart=e.ctx.currentTime;var _=(c._stop-c._start)*1e3/Math.abs(c._rate);f._endTimers[c._id]=setTimeout(f._ended.bind(f,c),_)}return f._webAudio&&!p&&(c._paused=!0,c._ended=!0,c._seek=c._start||0,c._rateSeek=0,f._clearTimer(c._id),f._cleanBuffer(c._node),e._autoSuspend()),!f._webAudio&&!p&&f.stop(c._id,!0),f},_clearTimer:function(c){var f=this;if(f._endTimers[c]){if(typeof f._endTimers[c]!="function")clearTimeout(f._endTimers[c]);else{var d=f._soundById(c);d&&d._node&&d._node.removeEventListener("ended",f._endTimers[c],!1)}delete f._endTimers[c]}return f},_soundById:function(c){for(var f=this,d=0;d<f._sounds.length;d++)if(c===f._sounds[d]._id)return f._sounds[d];return null},_inactiveSound:function(){var c=this;c._drain();for(var f=0;f<c._sounds.length;f++)if(c._sounds[f]._ended)return c._sounds[f].reset();return new i(c)},_drain:function(){var c=this,f=c._pool,d=0,p=0;if(!(c._sounds.length<f)){for(p=0;p<c._sounds.length;p++)c._sounds[p]._ended&&d++;for(p=c._sounds.length-1;p>=0;p--){if(d<=f)return;c._sounds[p]._ended&&(c._webAudio&&c._sounds[p]._node&&c._sounds[p]._node.disconnect(0),c._sounds.splice(p,1),d--)}}},_getSoundIds:function(c){var f=this;if(typeof c=="undefined"){for(var d=[],p=0;p<f._sounds.length;p++)d.push(f._sounds[p]._id);return d}else return[c]},_refreshBuffer:function(c){var f=this;return c._node.bufferSource=e.ctx.createBufferSource(),c._node.bufferSource.buffer=r[f._src],c._panner?c._node.bufferSource.connect(c._panner):c._node.bufferSource.connect(c._node),c._node.bufferSource.loop=c._loop,c._loop&&(c._node.bufferSource.loopStart=c._start||0,c._node.bufferSource.loopEnd=c._stop||0),c._node.bufferSource.playbackRate.setValueAtTime(c._rate,e.ctx.currentTime),f},_cleanBuffer:function(c){var f=this,d=e._navigator&&e._navigator.vendor.indexOf("Apple")>=0;if(!c.bufferSource)return f;if(e._scratchBuffer&&c.bufferSource&&(c.bufferSource.onended=null,c.bufferSource.disconnect(0),d))try{c.bufferSource.buffer=e._scratchBuffer}catch{}return c.bufferSource=null,f},_clearSound:function(c){var f=/MSIE |Trident\//.test(e._navigator&&e._navigator.userAgent);f||(c.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var i=function(c){this._parent=c,this.init()};i.prototype={init:function(){var c=this,f=c._parent;return c._muted=f._muted,c._loop=f._loop,c._volume=f._volume,c._rate=f._rate,c._seek=0,c._paused=!0,c._ended=!0,c._sprite="__default",c._id=++e._counter,f._sounds.push(c),c.create(),c},create:function(){var c=this,f=c._parent,d=e._muted||c._muted||c._parent._muted?0:c._volume;return f._webAudio?(c._node=typeof e.ctx.createGain=="undefined"?e.ctx.createGainNode():e.ctx.createGain(),c._node.gain.setValueAtTime(d,e.ctx.currentTime),c._node.paused=!0,c._node.connect(e.masterGain)):e.noAudio||(c._node=e._obtainHtml5Audio(),c._errorFn=c._errorListener.bind(c),c._node.addEventListener("error",c._errorFn,!1),c._loadFn=c._loadListener.bind(c),c._node.addEventListener(e._canPlayEvent,c._loadFn,!1),c._endFn=c._endListener.bind(c),c._node.addEventListener("ended",c._endFn,!1),c._node.src=f._src,c._node.preload=f._preload===!0?"auto":f._preload,c._node.volume=d*e.volume(),c._node.load()),c},reset:function(){var c=this,f=c._parent;return c._muted=f._muted,c._loop=f._loop,c._volume=f._volume,c._rate=f._rate,c._seek=0,c._rateSeek=0,c._paused=!0,c._ended=!0,c._sprite="__default",c._id=++e._counter,c},_errorListener:function(){var c=this;c._parent._emit("loaderror",c._id,c._node.error?c._node.error.code:0),c._node.removeEventListener("error",c._errorFn,!1)},_loadListener:function(){var c=this,f=c._parent;f._duration=Math.ceil(c._node.duration*10)/10,Object.keys(f._sprite).length===0&&(f._sprite={__default:[0,f._duration*1e3]}),f._state!=="loaded"&&(f._state="loaded",f._emit("load"),f._loadQueue()),c._node.removeEventListener(e._canPlayEvent,c._loadFn,!1)},_endListener:function(){var c=this,f=c._parent;f._duration===1/0&&(f._duration=Math.ceil(c._node.duration*10)/10,f._sprite.__default[1]===1/0&&(f._sprite.__default[1]=f._duration*1e3),f._ended(c)),c._node.removeEventListener("ended",c._endFn,!1)}};var r={},s=function(c){var f=c._src;if(r[f]){c._duration=r[f].duration,u(c);return}if(/^data:[^;]+;base64,/.test(f)){for(var d=atob(f.split(",")[1]),p=new Uint8Array(d.length),_=0;_<d.length;++_)p[_]=d.charCodeAt(_);l(p.buffer,c)}else{var b=new XMLHttpRequest;b.open(c._xhr.method,f,!0),b.withCredentials=c._xhr.withCredentials,b.responseType="arraybuffer",c._xhr.headers&&Object.keys(c._xhr.headers).forEach(function(m){b.setRequestHeader(m,c._xhr.headers[m])}),b.onload=function(){var m=(b.status+"")[0];if(m!=="0"&&m!=="2"&&m!=="3"){c._emit("loaderror",null,"Failed loading audio file with status: "+b.status+".");return}l(b.response,c)},b.onerror=function(){c._webAudio&&(c._html5=!0,c._webAudio=!1,c._sounds=[],delete r[f],c.load())},o(b)}},o=function(c){try{c.send()}catch{c.onerror()}},l=function(c,f){var d=function(){f._emit("loaderror",null,"Decoding audio data failed.")},p=function(_){_&&f._sounds.length>0?(r[f._src]=_,u(f,_)):d()};typeof Promise!="undefined"&&e.ctx.decodeAudioData.length===1?e.ctx.decodeAudioData(c).then(p).catch(d):e.ctx.decodeAudioData(c,p,d)},u=function(c,f){f&&!c._duration&&(c._duration=f.duration),Object.keys(c._sprite).length===0&&(c._sprite={__default:[0,c._duration*1e3]}),c._state!=="loaded"&&(c._state="loaded",c._emit("load"),c._loadQueue())},h=function(){if(e.usingWebAudio){try{typeof AudioContext!="undefined"?e.ctx=new AudioContext:typeof webkitAudioContext!="undefined"?e.ctx=new webkitAudioContext:e.usingWebAudio=!1}catch{e.usingWebAudio=!1}e.ctx||(e.usingWebAudio=!1);var c=/iP(hone|od|ad)/.test(e._navigator&&e._navigator.platform),f=e._navigator&&e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),d=f?parseInt(f[1],10):null;if(c&&d&&d<9){var p=/safari/.test(e._navigator&&e._navigator.userAgent.toLowerCase());e._navigator&&!p&&(e.usingWebAudio=!1)}e.usingWebAudio&&(e.masterGain=typeof e.ctx.createGain=="undefined"?e.ctx.createGainNode():e.ctx.createGain(),e.masterGain.gain.setValueAtTime(e._muted?0:e._volume,e.ctx.currentTime),e.masterGain.connect(e.ctx.destination)),e._setup()}};typeof define=="function"&&define.amd&&define([],function(){return{Howler:e,Howl:n}}),typeof il!="undefined"&&(il.Howler=e,il.Howl=n),typeof global!="undefined"?(global.HowlerGlobal=a,global.Howler=e,global.Howl=n,global.Sound=i):typeof window!="undefined"&&(window.HowlerGlobal=a,window.Howler=e,window.Howl=n,window.Sound=i)})();(function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,i){var r=this;if(!r.ctx||!r.ctx.listener)return r;if(n=typeof n!="number"?r._pos[1]:n,i=typeof i!="number"?r._pos[2]:i,typeof e=="number")r._pos=[e,n,i],typeof r.ctx.listener.positionX!="undefined"?(r.ctx.listener.positionX.setTargetAtTime(r._pos[0],Howler.ctx.currentTime,.1),r.ctx.listener.positionY.setTargetAtTime(r._pos[1],Howler.ctx.currentTime,.1),r.ctx.listener.positionZ.setTargetAtTime(r._pos[2],Howler.ctx.currentTime,.1)):r.ctx.listener.setPosition(r._pos[0],r._pos[1],r._pos[2]);else return r._pos;return r},HowlerGlobal.prototype.orientation=function(e,n,i,r,s,o){var l=this;if(!l.ctx||!l.ctx.listener)return l;var u=l._orientation;if(n=typeof n!="number"?u[1]:n,i=typeof i!="number"?u[2]:i,r=typeof r!="number"?u[3]:r,s=typeof s!="number"?u[4]:s,o=typeof o!="number"?u[5]:o,typeof e=="number")l._orientation=[e,n,i,r,s,o],typeof l.ctx.listener.forwardX!="undefined"?(l.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),l.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),l.ctx.listener.forwardZ.setTargetAtTime(i,Howler.ctx.currentTime,.1),l.ctx.listener.upX.setTargetAtTime(r,Howler.ctx.currentTime,.1),l.ctx.listener.upY.setTargetAtTime(s,Howler.ctx.currentTime,.1),l.ctx.listener.upZ.setTargetAtTime(o,Howler.ctx.currentTime,.1)):l.ctx.listener.setOrientation(e,n,i,r,s,o);else return u;return l},Howl.prototype.init=function(e){return function(n){var i=this;return i._orientation=n.orientation||[1,0,0],i._stereo=n.stereo||null,i._pos=n.pos||null,i._pannerAttr={coneInnerAngle:typeof n.coneInnerAngle!="undefined"?n.coneInnerAngle:360,coneOuterAngle:typeof n.coneOuterAngle!="undefined"?n.coneOuterAngle:360,coneOuterGain:typeof n.coneOuterGain!="undefined"?n.coneOuterGain:0,distanceModel:typeof n.distanceModel!="undefined"?n.distanceModel:"inverse",maxDistance:typeof n.maxDistance!="undefined"?n.maxDistance:1e4,panningModel:typeof n.panningModel!="undefined"?n.panningModel:"HRTF",refDistance:typeof n.refDistance!="undefined"?n.refDistance:1,rolloffFactor:typeof n.rolloffFactor!="undefined"?n.rolloffFactor:1},i._onstereo=n.onstereo?[{fn:n.onstereo}]:[],i._onpos=n.onpos?[{fn:n.onpos}]:[],i._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}}(Howl.prototype.init),Howl.prototype.stereo=function(e,n){var i=this;if(!i._webAudio)return i;if(i._state!=="loaded")return i._queue.push({event:"stereo",action:function(){i.stereo(e,n)}}),i;var r=typeof Howler.ctx.createStereoPanner=="undefined"?"spatial":"stereo";if(typeof n=="undefined")if(typeof e=="number")i._stereo=e,i._pos=[e,0,0];else return i._stereo;for(var s=i._getSoundIds(n),o=0;o<s.length;o++){var l=i._soundById(s[o]);if(l)if(typeof e=="number")l._stereo=e,l._pos=[e,0,0],l._node&&(l._pannerAttr.panningModel="equalpower",(!l._panner||!l._panner.pan)&&a(l,r),r==="spatial"?typeof l._panner.positionX!="undefined"?(l._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),l._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),l._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):l._panner.setPosition(e,0,0):l._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),i._emit("stereo",l._id);else return l._stereo}return i},Howl.prototype.pos=function(e,n,i,r){var s=this;if(!s._webAudio)return s;if(s._state!=="loaded")return s._queue.push({event:"pos",action:function(){s.pos(e,n,i,r)}}),s;if(n=typeof n!="number"?0:n,i=typeof i!="number"?-.5:i,typeof r=="undefined")if(typeof e=="number")s._pos=[e,n,i];else return s._pos;for(var o=s._getSoundIds(r),l=0;l<o.length;l++){var u=s._soundById(o[l]);if(u)if(typeof e=="number")u._pos=[e,n,i],u._node&&((!u._panner||u._panner.pan)&&a(u,"spatial"),typeof u._panner.positionX!="undefined"?(u._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setPosition(e,n,i)),s._emit("pos",u._id);else return u._pos}return s},Howl.prototype.orientation=function(e,n,i,r){var s=this;if(!s._webAudio)return s;if(s._state!=="loaded")return s._queue.push({event:"orientation",action:function(){s.orientation(e,n,i,r)}}),s;if(n=typeof n!="number"?s._orientation[1]:n,i=typeof i!="number"?s._orientation[2]:i,typeof r=="undefined")if(typeof e=="number")s._orientation=[e,n,i];else return s._orientation;for(var o=s._getSoundIds(r),l=0;l<o.length;l++){var u=s._soundById(o[l]);if(u)if(typeof e=="number")u._orientation=[e,n,i],u._node&&(u._panner||(u._pos||(u._pos=s._pos||[0,0,-.5]),a(u,"spatial")),typeof u._panner.orientationX!="undefined"?(u._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(n,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(i,Howler.ctx.currentTime)):u._panner.setOrientation(e,n,i)),s._emit("orientation",u._id);else return u._orientation}return s},Howl.prototype.pannerAttr=function(){var e=this,n=arguments,i,r,s;if(!e._webAudio)return e;if(n.length===0)return e._pannerAttr;if(n.length===1)if(typeof n[0]=="object")i=n[0],typeof r=="undefined"&&(i.pannerAttr||(i.pannerAttr={coneInnerAngle:i.coneInnerAngle,coneOuterAngle:i.coneOuterAngle,coneOuterGain:i.coneOuterGain,distanceModel:i.distanceModel,maxDistance:i.maxDistance,refDistance:i.refDistance,rolloffFactor:i.rolloffFactor,panningModel:i.panningModel}),e._pannerAttr={coneInnerAngle:typeof i.pannerAttr.coneInnerAngle!="undefined"?i.pannerAttr.coneInnerAngle:e._coneInnerAngle,coneOuterAngle:typeof i.pannerAttr.coneOuterAngle!="undefined"?i.pannerAttr.coneOuterAngle:e._coneOuterAngle,coneOuterGain:typeof i.pannerAttr.coneOuterGain!="undefined"?i.pannerAttr.coneOuterGain:e._coneOuterGain,distanceModel:typeof i.pannerAttr.distanceModel!="undefined"?i.pannerAttr.distanceModel:e._distanceModel,maxDistance:typeof i.pannerAttr.maxDistance!="undefined"?i.pannerAttr.maxDistance:e._maxDistance,refDistance:typeof i.pannerAttr.refDistance!="undefined"?i.pannerAttr.refDistance:e._refDistance,rolloffFactor:typeof i.pannerAttr.rolloffFactor!="undefined"?i.pannerAttr.rolloffFactor:e._rolloffFactor,panningModel:typeof i.pannerAttr.panningModel!="undefined"?i.pannerAttr.panningModel:e._panningModel});else return s=e._soundById(parseInt(n[0],10)),s?s._pannerAttr:e._pannerAttr;else n.length===2&&(i=n[0],r=parseInt(n[1],10));for(var o=e._getSoundIds(r),l=0;l<o.length;l++)if(s=e._soundById(o[l]),s){var u=s._pannerAttr;u={coneInnerAngle:typeof i.coneInnerAngle!="undefined"?i.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:typeof i.coneOuterAngle!="undefined"?i.coneOuterAngle:u.coneOuterAngle,coneOuterGain:typeof i.coneOuterGain!="undefined"?i.coneOuterGain:u.coneOuterGain,distanceModel:typeof i.distanceModel!="undefined"?i.distanceModel:u.distanceModel,maxDistance:typeof i.maxDistance!="undefined"?i.maxDistance:u.maxDistance,refDistance:typeof i.refDistance!="undefined"?i.refDistance:u.refDistance,rolloffFactor:typeof i.rolloffFactor!="undefined"?i.rolloffFactor:u.rolloffFactor,panningModel:typeof i.panningModel!="undefined"?i.panningModel:u.panningModel};var h=s._panner;h||(s._pos||(s._pos=e._pos||[0,0,-.5]),a(s,"spatial"),h=s._panner),h.coneInnerAngle=u.coneInnerAngle,h.coneOuterAngle=u.coneOuterAngle,h.coneOuterGain=u.coneOuterGain,h.distanceModel=u.distanceModel,h.maxDistance=u.maxDistance,h.refDistance=u.refDistance,h.rolloffFactor=u.rolloffFactor,h.panningModel=u.panningModel}return e},Sound.prototype.init=function(e){return function(){var n=this,i=n._parent;n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,e.call(this),n._stereo?i.stereo(n._stereo):n._pos&&i.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,i=n._parent;return n._orientation=i._orientation,n._stereo=i._stereo,n._pos=i._pos,n._pannerAttr=i._pannerAttr,n._stereo?i.stereo(n._stereo):n._pos?i.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,i._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var a=function(e,n){n=n||"spatial",n==="spatial"?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,typeof e._panner.positionX!="undefined"?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),typeof e._panner.orientationX!="undefined"?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}})()});var Fu="160";var m_=0,Kf=1,g_=2;var Dp=1,ku=2,Ri=3,oi=0,$t=1,_n=2;var ai=0,Cs=1,Or=2,Jf=3,Zf=4,__=5,Cr=100,b_=101,x_=102,Qf=103,$f=104,v_=200,y_=201,M_=202,S_=203,tu=204,nu=205,T_=206,w_=207,A_=208,E_=209,R_=210,C_=211,P_=212,L_=213,I_=214,D_=0,O_=1,N_=2,Yo=3,U_=4,F_=5,k_=6,B_=7,Op=0,z_=1,G_=2,tr=0,Bu=1,zu=2,Gu=3,Ha=4,H_=5,Hu=6,ed="attached",V_="detached",Np=300,Is=301,Ds=302,Ra=303,iu=304,Rc=306,Ii=1e3,hn=1001,Ca=1002,Dt=1003,jo=1004;var Sa=1005;var wt=1006,Vu=1007;var Di=1008;var nr=1009,W_=1010,X_=1011,Wu=1012,Up=1013,$i=1014,Cn=1015,Gt=1016,Fp=1017,kp=1018,Lr=1020,q_=1021,zn=1023,Y_=1024,j_=1025,Ir=1026,Os=1027,K_=1028,Bp=1029,J_=1030,zp=1031,Gp=1033,Ml=33776,Sl=33777,Tl=33778,wl=33779,td=35840,nd=35841,id=35842,rd=35843,Hp=36196,sd=37492,ad=37496,od=37808,cd=37809,ld=37810,ud=37811,hd=37812,fd=37813,dd=37814,pd=37815,md=37816,gd=37817,_d=37818,bd=37819,xd=37820,vd=37821,Al=36492,yd=36494,Md=36495,Z_=36283,Sd=36284,Td=36285,wd=36286,Xu=2200,Q_=2201,$_=2202,Ns=2300,Nr=2301,El=2302,Ts=2400,ws=2401,Ko=2402,qu=2500,e0=2501,Vp=0,Cc=1,Va=2,Wp=3e3,Dr=3001,t0=3200,n0=3201,Xp=0,i0=1,Gn="",it="srgb",Et="srgb-linear",Yu="display-p3",Pc="display-p3-linear",Jo="linear",tt="srgb",Zo="rec709",Qo="p3";var os=7680;var Ad=519,r0=512,s0=513,a0=514,qp=515,o0=516,c0=517,l0=518,u0=519,ru=35044;var Ed="300 es",su=1035,Li=2e3,$o=2001,Oi=class{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rd=1234567,Ta=Math.PI/180,Us=180/Math.PI;function $n(){let a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[a&255]+Zt[a>>8&255]+Zt[a>>16&255]+Zt[a>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[n&63|128]+Zt[n>>8&255]+"-"+Zt[n>>16&255]+Zt[n>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Xt(a,e,n){return Math.max(e,Math.min(n,a))}function ju(a,e){return(a%e+e)%e}function h0(a,e,n,i,r){return i+(a-e)*(r-i)/(n-e)}function f0(a,e,n){return a!==e?(n-a)/(e-a):0}function wa(a,e,n){return(1-n)*a+n*e}function d0(a,e,n,i){return wa(a,e,1-Math.exp(-n*i))}function p0(a,e=1){return e-Math.abs(ju(a,e*2)-e)}function m0(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*(3-2*a))}function g0(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*a*(a*(a*6-15)+10))}function _0(a,e){return a+Math.floor(Math.random()*(e-a+1))}function b0(a,e){return a+Math.random()*(e-a)}function x0(a){return a*(.5-Math.random())}function v0(a){a!==void 0&&(Rd=a);let e=Rd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function y0(a){return a*Ta}function M0(a){return a*Us}function au(a){return(a&a-1)===0&&a!==0}function S0(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function ec(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function T0(a,e,n,i,r){let s=Math.cos,o=Math.sin,l=s(n/2),u=o(n/2),h=s((e+i)/2),c=o((e+i)/2),f=s((e-i)/2),d=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":a.set(l*c,u*f,u*d,l*h);break;case"YZY":a.set(u*d,l*c,u*f,l*h);break;case"ZXZ":a.set(u*f,u*d,l*c,l*h);break;case"XZX":a.set(l*c,u*_,u*p,l*h);break;case"YXY":a.set(u*p,l*c,u*_,l*h);break;case"ZYZ":a.set(u*_,u*p,l*c,l*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function si(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function et(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}var Yp={DEG2RAD:Ta,RAD2DEG:Us,generateUUID:$n,clamp:Xt,euclideanModulo:ju,mapLinear:h0,inverseLerp:f0,lerp:wa,damp:d0,pingpong:p0,smoothstep:m0,smootherstep:g0,randInt:_0,randFloat:b0,randFloatSpread:x0,seededRandom:v0,degToRad:y0,radToDeg:M0,isPowerOfTwo:au,ceilPowerOfTwo:S0,floorPowerOfTwo:ec,setQuaternionFromProperEuler:T0,normalize:et,denormalize:si},me=class a{constructor(e=0,n=0){a.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){let i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ve=class a{constructor(e,n,i,r,s,o,l,u,h){a.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,l,u,h)}set(e,n,i,r,s,o,l,u,h){let c=this.elements;return c[0]=e,c[1]=r,c[2]=l,c[3]=n,c[4]=s,c[5]=u,c[6]=i,c[7]=o,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,s=this.elements,o=i[0],l=i[3],u=i[6],h=i[1],c=i[4],f=i[7],d=i[2],p=i[5],_=i[8],b=r[0],m=r[3],g=r[6],v=r[1],x=r[4],M=r[7],w=r[2],T=r[5],A=r[8];return s[0]=o*b+l*v+u*w,s[3]=o*m+l*x+u*T,s[6]=o*g+l*M+u*A,s[1]=h*b+c*v+f*w,s[4]=h*m+c*x+f*T,s[7]=h*g+c*M+f*A,s[2]=d*b+p*v+_*w,s[5]=d*m+p*x+_*T,s[8]=d*g+p*M+_*A,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],l=e[5],u=e[6],h=e[7],c=e[8];return n*o*c-n*l*h-i*s*c+i*l*u+r*s*h-r*o*u}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],l=e[5],u=e[6],h=e[7],c=e[8],f=c*o-l*h,d=l*u-c*s,p=h*s-o*u,_=n*f+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/_;return e[0]=f*b,e[1]=(r*h-c*i)*b,e[2]=(l*i-r*o)*b,e[3]=d*b,e[4]=(c*n-r*u)*b,e[5]=(r*s-l*n)*b,e[6]=p*b,e[7]=(i*u-h*n)*b,e[8]=(o*n-i*s)*b,this}transpose(){let e,n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,l){let u=Math.cos(s),h=Math.sin(s);return this.set(i*u,i*h,-i*(u*o+h*l)+o+e,-r*h,r*u,-r*(-h*o+u*l)+l+n,0,0,1),this}scale(e,n){return this.premultiply(Rl.makeScale(e,n)),this}rotate(e){return this.premultiply(Rl.makeRotation(-e)),this}translate(e,n){return this.premultiply(Rl.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Rl=new Ve;function jp(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function Pa(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function w0(){let a=Pa("canvas");return a.style.display="block",a}var Cd={};function Aa(a){a in Cd||(Cd[a]=!0,console.warn(a))}var Pd=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ld=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xo={[Et]:{transfer:Jo,primaries:Zo,toReference:a=>a,fromReference:a=>a},[it]:{transfer:tt,primaries:Zo,toReference:a=>a.convertSRGBToLinear(),fromReference:a=>a.convertLinearToSRGB()},[Pc]:{transfer:Jo,primaries:Qo,toReference:a=>a.applyMatrix3(Ld),fromReference:a=>a.applyMatrix3(Pd)},[Yu]:{transfer:tt,primaries:Qo,toReference:a=>a.convertSRGBToLinear().applyMatrix3(Ld),fromReference:a=>a.applyMatrix3(Pd).convertLinearToSRGB()}},A0=new Set([Et,Pc]),Je={enabled:!0,_workingColorSpace:Et,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(a){if(!A0.has(a))throw new Error(`Unsupported working color space, "${a}".`);this._workingColorSpace=a},convert:function(a,e,n){if(this.enabled===!1||e===n||!e||!n)return a;let i=xo[e].toReference,r=xo[n].fromReference;return r(i(a))},fromWorkingColorSpace:function(a,e){return this.convert(a,this._workingColorSpace,e)},toWorkingColorSpace:function(a,e){return this.convert(a,e,this._workingColorSpace)},getPrimaries:function(a){return xo[a].primaries},getTransfer:function(a){return a===Gn?Jo:xo[a].transfer}};function Ps(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Cl(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}var cs,tc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{cs===void 0&&(cs=Pa("canvas")),cs.width=e.width,cs.height=e.height;let i=cs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=cs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let n=Pa("canvas");n.width=e.width,n.height=e.height;let i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ps(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){let n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ps(n[i]/255)*255):n[i]=Ps(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},E0=0,nc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=$n(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?s.push(Pl(r[o].image)):s.push(Pl(r[o]))}else s=Pl(r);i.url=s}return n||(e.images[this.uuid]=i),i}};function Pl(a){return typeof HTMLImageElement!="undefined"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&a instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&a instanceof ImageBitmap?tc.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var R0=0,qt=class a extends Oi{constructor(e=a.DEFAULT_IMAGE,n=a.DEFAULT_MAPPING,i=hn,r=hn,s=wt,o=Di,l=zn,u=nr,h=a.DEFAULT_ANISOTROPY,c=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=$n(),this.name="",this.source=new nc(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=u,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(Aa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===Dr?it:Gn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Np)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ii:e.x=e.x-Math.floor(e.x);break;case hn:e.x=e.x<0?0:1;break;case Ca:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ii:e.y=e.y-Math.floor(e.y);break;case hn:e.y=e.y<0?0:1;break;case Ca:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Aa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===it?Dr:Wp}set encoding(e){Aa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Dr?it:Gn}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Np;qt.DEFAULT_ANISOTROPY=1;var rt=class a{constructor(e=0,n=0,i=0,r=1){a.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s,u=e.elements,h=u[0],c=u[4],f=u[8],d=u[1],p=u[5],_=u[9],b=u[2],m=u[6],g=u[10];if(Math.abs(c-d)<.01&&Math.abs(f-b)<.01&&Math.abs(_-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+b)<.1&&Math.abs(_+m)<.1&&Math.abs(h+p+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let x=(h+1)/2,M=(p+1)/2,w=(g+1)/2,T=(c+d)/4,A=(f+b)/4,C=(_+m)/4;return x>M&&x>w?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=T/i,s=A/i):M>w?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=T/r,s=C/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=C/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-_)*(m-_)+(f-b)*(f-b)+(d-c)*(d-c));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(f-b)/v,this.z=(d-c)/v,this.w=Math.acos((h+p+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ou=class extends Oi{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new rt(0,0,e,n),this.scissorTest=!1,this.viewport=new rt(0,0,e,n);let r={width:e,height:n,depth:1};i.encoding!==void 0&&(Aa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Dr?it:Gn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new qt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let n=Object.assign({},e.texture.image);return this.texture.source=new nc(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yt=class extends ou{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}},ic=class extends qt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cu=class extends qt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var en=class{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,l){let u=i[r+0],h=i[r+1],c=i[r+2],f=i[r+3],d=s[o+0],p=s[o+1],_=s[o+2],b=s[o+3];if(l===0){e[n+0]=u,e[n+1]=h,e[n+2]=c,e[n+3]=f;return}if(l===1){e[n+0]=d,e[n+1]=p,e[n+2]=_,e[n+3]=b;return}if(f!==b||u!==d||h!==p||c!==_){let m=1-l,g=u*d+h*p+c*_+f*b,v=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let w=Math.sqrt(x),T=Math.atan2(w,g*v);m=Math.sin(m*T)/w,l=Math.sin(l*T)/w}let M=l*v;if(u=u*m+d*M,h=h*m+p*M,c=c*m+_*M,f=f*m+b*M,m===1-l){let w=1/Math.sqrt(u*u+h*h+c*c+f*f);u*=w,h*=w,c*=w,f*=w}}e[n]=u,e[n+1]=h,e[n+2]=c,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){let l=i[r],u=i[r+1],h=i[r+2],c=i[r+3],f=s[o],d=s[o+1],p=s[o+2],_=s[o+3];return e[n]=l*_+c*f+u*p-h*d,e[n+1]=u*_+c*d+h*f-l*p,e[n+2]=h*_+c*p+l*d-u*f,e[n+3]=c*_-l*f-u*d-h*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){let i=e._x,r=e._y,s=e._z,o=e._order,l=Math.cos,u=Math.sin,h=l(i/2),c=l(r/2),f=l(s/2),d=u(i/2),p=u(r/2),_=u(s/2);switch(o){case"XYZ":this._x=d*c*f+h*p*_,this._y=h*p*f-d*c*_,this._z=h*c*_+d*p*f,this._w=h*c*f-d*p*_;break;case"YXZ":this._x=d*c*f+h*p*_,this._y=h*p*f-d*c*_,this._z=h*c*_-d*p*f,this._w=h*c*f+d*p*_;break;case"ZXY":this._x=d*c*f-h*p*_,this._y=h*p*f+d*c*_,this._z=h*c*_+d*p*f,this._w=h*c*f-d*p*_;break;case"ZYX":this._x=d*c*f-h*p*_,this._y=h*p*f+d*c*_,this._z=h*c*_-d*p*f,this._w=h*c*f+d*p*_;break;case"YZX":this._x=d*c*f+h*p*_,this._y=h*p*f+d*c*_,this._z=h*c*_-d*p*f,this._w=h*c*f-d*p*_;break;case"XZY":this._x=d*c*f-h*p*_,this._y=h*p*f-d*c*_,this._z=h*c*_+d*p*f,this._w=h*c*f+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){let i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],l=n[5],u=n[9],h=n[2],c=n[6],f=n[10],d=i+l+f;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-u)*p,this._y=(s-h)*p,this._z=(o-r)*p}else if(i>l&&i>f){let p=2*Math.sqrt(1+i-l-f);this._w=(c-u)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+h)/p}else if(l>f){let p=2*Math.sqrt(1+l-i-f);this._w=(s-h)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(u+c)/p}else{let p=2*Math.sqrt(1+f-i-l);this._w=(o-r)/p,this._x=(s+h)/p,this._y=(u+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,n){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,l=n._x,u=n._y,h=n._z,c=n._w;return this._x=i*c+o*l+r*h-s*u,this._y=r*c+o*u+s*l-i*h,this._z=s*c+o*h+i*u-r*l,this._w=o*c-i*l-r*u-s*h,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,l=o*e._w+i*e._x+r*e._y+s*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let u=1-l*l;if(u<=Number.EPSILON){let p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}let h=Math.sqrt(u),c=Math.atan2(h,l),f=Math.sin((1-n)*c)/h,d=Math.sin(n*c)/h;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){let e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class a{constructor(e=0,n=0,i=0){a.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Id.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Id.setFromAxisAngle(e,n))}applyMatrix3(e){let n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,l=e.z,u=e.w,h=2*(o*r-l*i),c=2*(l*n-s*r),f=2*(s*i-o*n);return this.x=n+u*h+o*f-l*c,this.y=i+u*c+l*h-s*f,this.z=r+u*f+s*c-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){let i=e.x,r=e.y,s=e.z,o=n.x,l=n.y,u=n.z;return this.x=r*u-s*l,this.y=s*o-i*u,this.z=i*l-r*o,this}projectOnVector(e){let n=e.lengthSq();if(n===0)return this.set(0,0,0);let i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ll.copy(this).projectOnVector(e),this.sub(Ll)}reflect(e){return this.sub(Ll.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(e)/n;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){let r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){let n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){let n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ll=new D,Id=new en,bn=class{constructor(e=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Jn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Jn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){let i=Jn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=s.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Jn):Jn.fromBufferAttribute(s,o),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ga),yo.subVectors(this.max,ga),ls.subVectors(e.a,ga),us.subVectors(e.b,ga),hs.subVectors(e.c,ga),ji.subVectors(us,ls),Ki.subVectors(hs,us),Tr.subVectors(ls,hs);let n=[0,-ji.z,ji.y,0,-Ki.z,Ki.y,0,-Tr.z,Tr.y,ji.z,0,-ji.x,Ki.z,0,-Ki.x,Tr.z,0,-Tr.x,-ji.y,ji.x,0,-Ki.y,Ki.x,0,-Tr.y,Tr.x,0];return!Il(n,ls,us,hs,yo)||(n=[1,0,0,0,1,0,0,0,1],!Il(n,ls,us,hs,yo))?!1:(Mo.crossVectors(ji,Ki),n=[Mo.x,Mo.y,Mo.z],Il(n,ls,us,hs,yo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Mi=[new D,new D,new D,new D,new D,new D,new D,new D],Jn=new D,vo=new bn,ls=new D,us=new D,hs=new D,ji=new D,Ki=new D,Tr=new D,ga=new D,yo=new D,Mo=new D,wr=new D;function Il(a,e,n,i,r){for(let s=0,o=a.length-3;s<=o;s+=3){wr.fromArray(a,s);let l=r.x*Math.abs(wr.x)+r.y*Math.abs(wr.y)+r.z*Math.abs(wr.z),u=e.dot(wr),h=n.dot(wr),c=i.dot(wr);if(Math.max(-Math.max(u,h,c),Math.min(u,h,c))>l)return!1}return!0}var C0=new bn,_a=new D,Dl=new D,Ln=class{constructor(e=new D,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){let i=this.center;n!==void 0?i.copy(n):C0.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){let i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_a.subVectors(e,this.center);let n=_a.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(_a,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_a.copy(e.center).add(Dl)),this.expandByPoint(_a.copy(e.center).sub(Dl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Si=new D,Ol=new D,So=new D,Ji=new D,Nl=new D,To=new D,Ul=new D,Ur=class{constructor(e=new D,n=new D(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let n=Si.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,n),Si.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Ol.copy(e).add(n).multiplyScalar(.5),So.copy(n).sub(e).normalize(),Ji.copy(this.origin).sub(Ol);let s=e.distanceTo(n)*.5,o=-this.direction.dot(So),l=Ji.dot(this.direction),u=-Ji.dot(So),h=Ji.lengthSq(),c=Math.abs(1-o*o),f,d,p,_;if(c>0)if(f=o*u-l,d=o*l-u,_=s*c,f>=0)if(d>=-_)if(d<=_){let b=1/c;f*=b,d*=b,p=f*(f+o*d+2*l)+d*(o*f+d+2*u)+h}else d=s,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*u)+h;else d=-s,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*u)+h;else d<=-_?(f=Math.max(0,-(-o*s+l)),d=f>0?-s:Math.min(Math.max(-s,-u),s),p=-f*f+d*(d+2*u)+h):d<=_?(f=0,d=Math.min(Math.max(-s,-u),s),p=d*(d+2*u)+h):(f=Math.max(0,-(o*s+l)),d=f>0?s:Math.min(Math.max(-s,-u),s),p=-f*f+d*(d+2*u)+h);else d=o>0?-s:s,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*u)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ol).addScaledVector(So,d),p}intersectSphere(e,n){Si.subVectors(e.center,this.origin);let i=Si.dot(this.direction),r=Si.dot(Si)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),l=i-o,u=i+o;return u<0?null:l<0?this.at(u,n):this.at(l,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){let i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){let n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,l,u,h=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return h>=0?(i=(e.min.x-d.x)*h,r=(e.max.x-d.x)*h):(i=(e.max.x-d.x)*h,r=(e.min.x-d.x)*h),c>=0?(s=(e.min.y-d.y)*c,o=(e.max.y-d.y)*c):(s=(e.max.y-d.y)*c,o=(e.min.y-d.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(l=(e.min.z-d.z)*f,u=(e.max.z-d.z)*f):(l=(e.max.z-d.z)*f,u=(e.min.z-d.z)*f),i>u||l>r)||((l>i||i!==i)&&(i=l),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,n,i,r,s){Nl.subVectors(n,e),To.subVectors(i,e),Ul.crossVectors(Nl,To);let o=this.direction.dot(Ul),l;if(o>0){if(r)return null;l=1}else if(o<0)l=-1,o=-o;else return null;Ji.subVectors(this.origin,e);let u=l*this.direction.dot(To.crossVectors(Ji,To));if(u<0)return null;let h=l*this.direction.dot(Nl.cross(Ji));if(h<0||u+h>o)return null;let c=-l*Ji.dot(Ul);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ae=class a{constructor(e,n,i,r,s,o,l,u,h,c,f,d,p,_,b,m){a.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,l,u,h,c,f,d,p,_,b,m)}set(e,n,i,r,s,o,l,u,h,c,f,d,p,_,b,m){let g=this.elements;return g[0]=e,g[4]=n,g[8]=i,g[12]=r,g[1]=s,g[5]=o,g[9]=l,g[13]=u,g[2]=h,g[6]=c,g[10]=f,g[14]=d,g[3]=p,g[7]=_,g[11]=b,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new a().fromArray(this.elements)}copy(e){let n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){let n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){let n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){let n=this.elements,i=e.elements,r=1/fs.setFromMatrixColumn(e,0).length(),s=1/fs.setFromMatrixColumn(e,1).length(),o=1/fs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){let n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r),c=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){let d=o*c,p=o*f,_=l*c,b=l*f;n[0]=u*c,n[4]=-u*f,n[8]=h,n[1]=p+_*h,n[5]=d-b*h,n[9]=-l*u,n[2]=b-d*h,n[6]=_+p*h,n[10]=o*u}else if(e.order==="YXZ"){let d=u*c,p=u*f,_=h*c,b=h*f;n[0]=d+b*l,n[4]=_*l-p,n[8]=o*h,n[1]=o*f,n[5]=o*c,n[9]=-l,n[2]=p*l-_,n[6]=b+d*l,n[10]=o*u}else if(e.order==="ZXY"){let d=u*c,p=u*f,_=h*c,b=h*f;n[0]=d-b*l,n[4]=-o*f,n[8]=_+p*l,n[1]=p+_*l,n[5]=o*c,n[9]=b-d*l,n[2]=-o*h,n[6]=l,n[10]=o*u}else if(e.order==="ZYX"){let d=o*c,p=o*f,_=l*c,b=l*f;n[0]=u*c,n[4]=_*h-p,n[8]=d*h+b,n[1]=u*f,n[5]=b*h+d,n[9]=p*h-_,n[2]=-h,n[6]=l*u,n[10]=o*u}else if(e.order==="YZX"){let d=o*u,p=o*h,_=l*u,b=l*h;n[0]=u*c,n[4]=b-d*f,n[8]=_*f+p,n[1]=f,n[5]=o*c,n[9]=-l*c,n[2]=-h*c,n[6]=p*f+_,n[10]=d-b*f}else if(e.order==="XZY"){let d=o*u,p=o*h,_=l*u,b=l*h;n[0]=u*c,n[4]=-f,n[8]=h*c,n[1]=d*f+b,n[5]=o*c,n[9]=p*f-_,n[2]=_*f-p,n[6]=l*c,n[10]=b*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(P0,e,L0)}lookAt(e,n,i){let r=this.elements;return En.subVectors(e,n),En.lengthSq()===0&&(En.z=1),En.normalize(),Zi.crossVectors(i,En),Zi.lengthSq()===0&&(Math.abs(i.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Zi.crossVectors(i,En)),Zi.normalize(),wo.crossVectors(En,Zi),r[0]=Zi.x,r[4]=wo.x,r[8]=En.x,r[1]=Zi.y,r[5]=wo.y,r[9]=En.y,r[2]=Zi.z,r[6]=wo.z,r[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){let i=e.elements,r=n.elements,s=this.elements,o=i[0],l=i[4],u=i[8],h=i[12],c=i[1],f=i[5],d=i[9],p=i[13],_=i[2],b=i[6],m=i[10],g=i[14],v=i[3],x=i[7],M=i[11],w=i[15],T=r[0],A=r[4],C=r[8],y=r[12],S=r[1],N=r[5],F=r[9],V=r[13],I=r[2],U=r[6],k=r[10],Y=r[14],K=r[3],j=r[7],J=r[11],Q=r[15];return s[0]=o*T+l*S+u*I+h*K,s[4]=o*A+l*N+u*U+h*j,s[8]=o*C+l*F+u*k+h*J,s[12]=o*y+l*V+u*Y+h*Q,s[1]=c*T+f*S+d*I+p*K,s[5]=c*A+f*N+d*U+p*j,s[9]=c*C+f*F+d*k+p*J,s[13]=c*y+f*V+d*Y+p*Q,s[2]=_*T+b*S+m*I+g*K,s[6]=_*A+b*N+m*U+g*j,s[10]=_*C+b*F+m*k+g*J,s[14]=_*y+b*V+m*Y+g*Q,s[3]=v*T+x*S+M*I+w*K,s[7]=v*A+x*N+M*U+w*j,s[11]=v*C+x*F+M*k+w*J,s[15]=v*y+x*V+M*Y+w*Q,this}multiplyScalar(e){let n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){let e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],l=e[5],u=e[9],h=e[13],c=e[2],f=e[6],d=e[10],p=e[14],_=e[3],b=e[7],m=e[11],g=e[15];return _*(+s*u*f-r*h*f-s*l*d+i*h*d+r*l*p-i*u*p)+b*(+n*u*p-n*h*d+s*o*d-r*o*p+r*h*c-s*u*c)+m*(+n*h*f-n*l*p-s*o*f+i*o*p+s*l*c-i*h*c)+g*(-r*l*c-n*u*f+n*l*d+r*o*f-i*o*d+i*u*c)}transpose(){let e=this.elements,n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){let e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],l=e[5],u=e[6],h=e[7],c=e[8],f=e[9],d=e[10],p=e[11],_=e[12],b=e[13],m=e[14],g=e[15],v=f*m*h-b*d*h+b*u*p-l*m*p-f*u*g+l*d*g,x=_*d*h-c*m*h-_*u*p+o*m*p+c*u*g-o*d*g,M=c*b*h-_*f*h+_*l*p-o*b*p-c*l*g+o*f*g,w=_*f*u-c*b*u-_*l*d+o*b*d+c*l*m-o*f*m,T=n*v+i*x+r*M+s*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return e[0]=v*A,e[1]=(b*d*s-f*m*s-b*r*p+i*m*p+f*r*g-i*d*g)*A,e[2]=(l*m*s-b*u*s+b*r*h-i*m*h-l*r*g+i*u*g)*A,e[3]=(f*u*s-l*d*s-f*r*h+i*d*h+l*r*p-i*u*p)*A,e[4]=x*A,e[5]=(c*m*s-_*d*s+_*r*p-n*m*p-c*r*g+n*d*g)*A,e[6]=(_*u*s-o*m*s-_*r*h+n*m*h+o*r*g-n*u*g)*A,e[7]=(o*d*s-c*u*s+c*r*h-n*d*h-o*r*p+n*u*p)*A,e[8]=M*A,e[9]=(_*f*s-c*b*s-_*i*p+n*b*p+c*i*g-n*f*g)*A,e[10]=(o*b*s-_*l*s+_*i*h-n*b*h-o*i*g+n*l*g)*A,e[11]=(c*l*s-o*f*s-c*i*h+n*f*h+o*i*p-n*l*p)*A,e[12]=w*A,e[13]=(c*b*r-_*f*r+_*i*d-n*b*d-c*i*m+n*f*m)*A,e[14]=(_*l*r-o*b*r-_*i*u+n*b*u+o*i*m-n*l*m)*A,e[15]=(o*f*r-c*l*r+c*i*u-n*f*u-o*i*d+n*l*d)*A,this}scale(e){let n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){let n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){let n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){let i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,l=e.y,u=e.z,h=s*o,c=s*l;return this.set(h*o+i,h*l-r*u,h*u+r*l,0,h*l+r*u,c*l+i,c*u-r*o,0,h*u-r*l,c*u+r*o,s*u*u+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){let r=this.elements,s=n._x,o=n._y,l=n._z,u=n._w,h=s+s,c=o+o,f=l+l,d=s*h,p=s*c,_=s*f,b=o*c,m=o*f,g=l*f,v=u*h,x=u*c,M=u*f,w=i.x,T=i.y,A=i.z;return r[0]=(1-(b+g))*w,r[1]=(p+M)*w,r[2]=(_-x)*w,r[3]=0,r[4]=(p-M)*T,r[5]=(1-(d+g))*T,r[6]=(m+v)*T,r[7]=0,r[8]=(_+x)*A,r[9]=(m-v)*A,r[10]=(1-(d+b))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){let r=this.elements,s=fs.set(r[0],r[1],r[2]).length(),o=fs.set(r[4],r[5],r[6]).length(),l=fs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Zn.copy(this);let h=1/s,c=1/o,f=1/l;return Zn.elements[0]*=h,Zn.elements[1]*=h,Zn.elements[2]*=h,Zn.elements[4]*=c,Zn.elements[5]*=c,Zn.elements[6]*=c,Zn.elements[8]*=f,Zn.elements[9]*=f,Zn.elements[10]*=f,n.setFromRotationMatrix(Zn),i.x=s,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,o,l=Li){let u=this.elements,h=2*s/(n-e),c=2*s/(i-r),f=(n+e)/(n-e),d=(i+r)/(i-r),p,_;if(l===Li)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(l===$o)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return u[0]=h,u[4]=0,u[8]=f,u[12]=0,u[1]=0,u[5]=c,u[9]=d,u[13]=0,u[2]=0,u[6]=0,u[10]=p,u[14]=_,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,n,i,r,s,o,l=Li){let u=this.elements,h=1/(n-e),c=1/(i-r),f=1/(o-s),d=(n+e)*h,p=(i+r)*c,_,b;if(l===Li)_=(o+s)*f,b=-2*f;else if(l===$o)_=s*f,b=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return u[0]=2*h,u[4]=0,u[8]=0,u[12]=-d,u[1]=0,u[5]=2*c,u[9]=0,u[13]=-p,u[2]=0,u[6]=0,u[10]=b,u[14]=-_,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){let n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){let i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}},fs=new D,Zn=new Ae,P0=new D(0,0,0),L0=new D(1,1,1),Zi=new D,wo=new D,En=new D,Dd=new Ae,Od=new en,rc=class a{constructor(e=0,n=0,i=0,r=a.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],l=r[8],u=r[1],h=r[5],c=r[9],f=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Dd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dd,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Od.setFromEuler(this),this.setFromQuaternion(Od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rc.DEFAULT_ORDER="XYZ";var La=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},I0=0,Nd=new D,ds=new en,Ti=new Ae,Ao=new D,ba=new D,D0=new D,O0=new en,Ud=new D(1,0,0),Fd=new D(0,1,0),kd=new D(0,0,1),N0={type:"added"},U0={type:"removed"},gt=class a extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=a.DEFAULT_UP.clone();let e=new D,n=new rc,i=new en,r=new D(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Ve}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=a.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=a.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ds.setFromAxisAngle(e,n),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,n){return ds.setFromAxisAngle(e,n),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(Ud,e)}rotateY(e){return this.rotateOnAxis(Fd,e)}rotateZ(e){return this.rotateOnAxis(kd,e)}translateOnAxis(e,n){return Nd.copy(e).applyQuaternion(this.quaternion),this.position.add(Nd.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Ud,e)}translateY(e){return this.translateOnAxis(Fd,e)}translateZ(e){return this.translateOnAxis(kd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ao.copy(e):Ao.set(e,n,i);let r=this.parent;this.updateWorldMatrix(!0,!1),ba.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(ba,Ao,this.up):Ti.lookAt(Ao,ba,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),ds.setFromRotationMatrix(Ti),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(N0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(U0)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ba,e,D0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ba,O0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,r=n.length;i<r;i++){let s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++){let l=r[s];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(l,u){return l[u.uuid]===void 0&&(l[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let u=l.shapes;if(Array.isArray(u))for(let h=0,c=u.length;h<c;h++){let f=u[h];s(e.shapes,f)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let u=0,h=this.material.length;u<h;u++)l.push(s(e.materials,this.material[u]));r.material=l}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){let u=this.animations[l];r.animations.push(s(e.animations,u))}}if(n){let l=o(e.geometries),u=o(e.materials),h=o(e.textures),c=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),_=o(e.nodes);l.length>0&&(i.geometries=l),u.length>0&&(i.materials=u),h.length>0&&(i.textures=h),c.length>0&&(i.images=c),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(l){let u=[];for(let h in l){let c=l[h];delete c.metadata,u.push(c)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};gt.DEFAULT_UP=new D(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qn=new D,wi=new D,Fl=new D,Ai=new D,ps=new D,ms=new D,Bd=new D,kl=new D,Bl=new D,zl=new D,Eo=!1,As=class a{constructor(e=new D,n=new D,i=new D){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Qn.subVectors(e,n),r.cross(Qn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Qn.subVectors(r,n),wi.subVectors(i,n),Fl.subVectors(e,n);let o=Qn.dot(Qn),l=Qn.dot(wi),u=Qn.dot(Fl),h=wi.dot(wi),c=wi.dot(Fl),f=o*h-l*l;if(f===0)return s.set(0,0,0),null;let d=1/f,p=(h*u-l*c)*d,_=(o*c-l*u)*d;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getUV(e,n,i,r,s,o,l,u){return Eo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Eo=!0),this.getInterpolation(e,n,i,r,s,o,l,u)}static getInterpolation(e,n,i,r,s,o,l,u){return this.getBarycoord(e,n,i,r,Ai)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,Ai.x),u.addScaledVector(o,Ai.y),u.addScaledVector(l,Ai.z),u)}static isFrontFacing(e,n,i,r){return Qn.subVectors(i,n),wi.subVectors(e,n),Qn.cross(wi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Qn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return a.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return a.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return Eo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Eo=!0),a.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return a.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return a.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return a.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){let i=this.a,r=this.b,s=this.c,o,l;ps.subVectors(r,i),ms.subVectors(s,i),kl.subVectors(e,i);let u=ps.dot(kl),h=ms.dot(kl);if(u<=0&&h<=0)return n.copy(i);Bl.subVectors(e,r);let c=ps.dot(Bl),f=ms.dot(Bl);if(c>=0&&f<=c)return n.copy(r);let d=u*f-c*h;if(d<=0&&u>=0&&c<=0)return o=u/(u-c),n.copy(i).addScaledVector(ps,o);zl.subVectors(e,s);let p=ps.dot(zl),_=ms.dot(zl);if(_>=0&&p<=_)return n.copy(s);let b=p*h-u*_;if(b<=0&&h>=0&&_<=0)return l=h/(h-_),n.copy(i).addScaledVector(ms,l);let m=c*_-p*f;if(m<=0&&f-c>=0&&p-_>=0)return Bd.subVectors(s,r),l=(f-c)/(f-c+(p-_)),n.copy(r).addScaledVector(Bd,l);let g=1/(m+b+d);return o=b*g,l=d*g,n.copy(i).addScaledVector(ps,o).addScaledVector(ms,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qi={h:0,s:0,l:0},Ro={h:0,s:0,l:0};function Gl(a,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?a+(e-a)*6*n:n<1/2?e:n<2/3?a+(e-a)*6*(2/3-n):a}var oe=class{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Je.workingColorSpace){return this.r=e,this.g=n,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Je.workingColorSpace){if(e=ju(e,1),n=Xt(n,0,1),i=Xt(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Gl(o,s,e+1/3),this.g=Gl(o,s,e),this.b=Gl(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,n=it){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=it){let i=Kp[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}copyLinearToSRGB(e){return this.r=Cl(e.r),this.g=Cl(e.g),this.b=Cl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return Je.fromWorkingColorSpace(Qt.copy(this),e),Math.round(Xt(Qt.r*255,0,255))*65536+Math.round(Xt(Qt.g*255,0,255))*256+Math.round(Xt(Qt.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Je.workingColorSpace){Je.fromWorkingColorSpace(Qt.copy(this),n);let i=Qt.r,r=Qt.g,s=Qt.b,o=Math.max(i,r,s),l=Math.min(i,r,s),u,h,c=(l+o)/2;if(l===o)u=0,h=0;else{let f=o-l;switch(h=c<=.5?f/(o+l):f/(2-o-l),o){case i:u=(r-s)/f+(r<s?6:0);break;case r:u=(s-i)/f+2;break;case s:u=(i-r)/f+4;break}u/=6}return e.h=u,e.s=h,e.l=c,e}getRGB(e,n=Je.workingColorSpace){return Je.fromWorkingColorSpace(Qt.copy(this),n),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=it){Je.fromWorkingColorSpace(Qt.copy(this),e);let n=Qt.r,i=Qt.g,r=Qt.b;return e!==it?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Qi),this.setHSL(Qi.h+e,Qi.s+n,Qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Qi),e.getHSL(Ro);let i=wa(Qi.h,Ro.h,n),r=wa(Qi.s,Ro.s,n),s=wa(Qi.l,Ro.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qt=new oe;oe.NAMES=Kp;var F0=0,In=class extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=$n(),this.name="",this.type="Material",this.blending=Cs,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tu,this.blendDst=nu,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=Yo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ad,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){let n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==tu&&(i.blendSrc=this.blendSrc),this.blendDst!==nu&&(i.blendDst=this.blendDst),this.blendEquation!==Cr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Yo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ad&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let l in s){let u=s[l];delete u.metadata,o.push(u)}return o}if(n){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let n=e.clippingPlanes,i=null;if(n!==null){let r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},_t=class extends In{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Op,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pi=k0();function k0(){let a=new ArrayBuffer(4),e=new Float32Array(a),n=new Uint32Array(a),i=new Uint32Array(512),r=new Uint32Array(512);for(let u=0;u<256;++u){let h=u-127;h<-27?(i[u]=0,i[u|256]=32768,r[u]=24,r[u|256]=24):h<-14?(i[u]=1024>>-h-14,i[u|256]=1024>>-h-14|32768,r[u]=-h-1,r[u|256]=-h-1):h<=15?(i[u]=h+15<<10,i[u|256]=h+15<<10|32768,r[u]=13,r[u|256]=13):h<128?(i[u]=31744,i[u|256]=64512,r[u]=24,r[u|256]=24):(i[u]=31744,i[u|256]=64512,r[u]=13,r[u|256]=13)}let s=new Uint32Array(2048),o=new Uint32Array(64),l=new Uint32Array(64);for(let u=1;u<1024;++u){let h=u<<13,c=0;for(;!(h&8388608);)h<<=1,c-=8388608;h&=-8388609,c+=947912704,s[u]=h|c}for(let u=1024;u<2048;++u)s[u]=939524096+(u-1024<<13);for(let u=1;u<31;++u)o[u]=u<<23;o[31]=1199570944,o[32]=2147483648;for(let u=33;u<63;++u)o[u]=2147483648+(u-32<<23);o[63]=3347054592;for(let u=1;u<64;++u)u!==32&&(l[u]=1024);return{floatView:e,uint32View:n,baseTable:i,shiftTable:r,mantissaTable:s,exponentTable:o,offsetTable:l}}function B0(a){Math.abs(a)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),a=Xt(a,-65504,65504),Pi.floatView[0]=a;let e=Pi.uint32View[0],n=e>>23&511;return Pi.baseTable[n]+((e&8388607)>>Pi.shiftTable[n])}function z0(a){let e=a>>10;return Pi.uint32View[0]=Pi.mantissaTable[Pi.offsetTable[e]+(a&1023)]+Pi.exponentTable[e],Pi.floatView[0]}var Wa={toHalfFloat:B0,fromHalfFloat:z0},Lt=new D,Co=new me,At=class{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=ru,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Co.fromBufferAttribute(this,n),Co.applyMatrix3(e),this.setXY(n,Co.x,Co.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix3(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix4(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyNormalMatrix(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.transformDirection(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=si(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=et(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=si(n,this.array)),n}setX(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=si(n,this.array)),n}setY(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=si(n,this.array)),n}setZ(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=si(n,this.array)),n}setW(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ru&&(e.usage=this.usage),e}};var sc=class extends At{constructor(e,n,i){super(new Uint16Array(e),n,i)}};var ac=class extends At{constructor(e,n,i){super(new Uint32Array(e),n,i)}};var st=class extends At{constructor(e,n,i){super(new Float32Array(e),n,i)}};var G0=0,Bn=new Ae,Hl=new gt,gs=new D,Rn=new bn,xa=new bn,zt=new D,It=class a extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jp(e)?ac:sc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,n,i){return Bn.makeTranslation(e,n,i),this.applyMatrix4(Bn),this}scale(e,n,i){return Bn.makeScale(e,n,i),this.applyMatrix4(Bn),this}lookAt(e){return Hl.lookAt(e),Hl.updateMatrix(),this.applyMatrix4(Hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){let n=[];for(let i=0,r=e.length;i<r;i++){let s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new st(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bn);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){let s=n[i];Rn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);let e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){let i=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){let l=n[s];xa.setFromBufferAttribute(l),this.morphTargetsRelative?(zt.addVectors(Rn.min,xa.min),Rn.expandByPoint(zt),zt.addVectors(Rn.max,xa.max),Rn.expandByPoint(zt)):(Rn.expandByPoint(xa.min),Rn.expandByPoint(xa.max))}Rn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,o=n.length;s<o;s++){let l=n[s],u=this.morphTargetsRelative;for(let h=0,c=l.count;h<c;h++)zt.fromBufferAttribute(l,h),u&&(gs.fromBufferAttribute(e,h),zt.add(gs)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,l=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*l),4));let u=this.getAttribute("tangent").array,h=[],c=[];for(let S=0;S<l;S++)h[S]=new D,c[S]=new D;let f=new D,d=new D,p=new D,_=new me,b=new me,m=new me,g=new D,v=new D;function x(S,N,F){f.fromArray(r,S*3),d.fromArray(r,N*3),p.fromArray(r,F*3),_.fromArray(o,S*2),b.fromArray(o,N*2),m.fromArray(o,F*2),d.sub(f),p.sub(f),b.sub(_),m.sub(_);let V=1/(b.x*m.y-m.x*b.y);isFinite(V)&&(g.copy(d).multiplyScalar(m.y).addScaledVector(p,-b.y).multiplyScalar(V),v.copy(p).multiplyScalar(b.x).addScaledVector(d,-m.x).multiplyScalar(V),h[S].add(g),h[N].add(g),h[F].add(g),c[S].add(v),c[N].add(v),c[F].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let S=0,N=M.length;S<N;++S){let F=M[S],V=F.start,I=F.count;for(let U=V,k=V+I;U<k;U+=3)x(i[U+0],i[U+1],i[U+2])}let w=new D,T=new D,A=new D,C=new D;function y(S){A.fromArray(s,S*3),C.copy(A);let N=h[S];w.copy(N),w.sub(A.multiplyScalar(A.dot(N))).normalize(),T.crossVectors(C,N);let V=T.dot(c[S])<0?-1:1;u[S*4]=w.x,u[S*4+1]=w.y,u[S*4+2]=w.z,u[S*4+3]=V}for(let S=0,N=M.length;S<N;++S){let F=M[S],V=F.start,I=F.count;for(let U=V,k=V+I;U<k;U+=3)y(i[U+0]),y(i[U+1]),y(i[U+2])}}computeVertexNormals(){let e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new At(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let r=new D,s=new D,o=new D,l=new D,u=new D,h=new D,c=new D,f=new D;if(e)for(let d=0,p=e.count;d<p;d+=3){let _=e.getX(d+0),b=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,b),o.fromBufferAttribute(n,m),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,b),h.fromBufferAttribute(i,m),l.add(c),u.add(c),h.add(c),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(b,u.x,u.y,u.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(l,u){let h=l.array,c=l.itemSize,f=l.normalized,d=new h.constructor(u.length*c),p=0,_=0;for(let b=0,m=u.length;b<m;b++){l.isInterleavedBufferAttribute?p=u[b]*l.data.stride+l.offset:p=u[b]*c;for(let g=0;g<c;g++)d[_++]=h[p++]}return new At(d,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new a,i=this.index.array,r=this.attributes;for(let l in r){let u=r[l],h=e(u,i);n.setAttribute(l,h)}let s=this.morphAttributes;for(let l in s){let u=[],h=s[l];for(let c=0,f=h.length;c<f;c++){let d=h[c],p=e(d,i);u.push(p)}n.morphAttributes[l]=u}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];n.addGroup(h.start,h.count,h.materialIndex)}return n}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let u=this.parameters;for(let h in u)u[h]!==void 0&&(e[h]=u[h]);return e}e.data={attributes:{}};let n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let u in i){let h=i[u];e.data.attributes[u]=h.toJSON(e.data)}let r={},s=!1;for(let u in this.morphAttributes){let h=this.morphAttributes[u],c=[];for(let f=0,d=h.length;f<d;f++){let p=h[f];c.push(p.toJSON(e.data))}c.length>0&&(r[u]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(n));let r=e.attributes;for(let h in r){let c=r[h];this.setAttribute(h,c.clone(n))}let s=e.morphAttributes;for(let h in s){let c=[],f=s[h];for(let d=0,p=f.length;d<p;d++)c.push(f[d].clone(n));this.morphAttributes[h]=c}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let h=0,c=o.length;h<c;h++){let f=o[h];this.addGroup(f.start,f.count,f.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},zd=new Ae,Ar=new Ur,Po=new Ln,Gd=new D,_s=new D,bs=new D,xs=new D,Vl=new D,Lo=new D,Io=new me,Do=new me,Oo=new me,Hd=new D,Vd=new D,Wd=new D,No=new D,Uo=new D,qe=class extends gt{constructor(e=new It,n=new _t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,n){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);let l=this.morphTargetInfluences;if(s&&l){Lo.set(0,0,0);for(let u=0,h=s.length;u<h;u++){let c=l[u],f=s[u];c!==0&&(Vl.fromBufferAttribute(f,e),o?Lo.addScaledVector(Vl,c):Lo.addScaledVector(Vl.sub(n),c))}n.add(Lo)}return n}raycast(e,n){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Po.copy(i.boundingSphere),Po.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(Po.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(Po,Gd)===null||Ar.origin.distanceToSquared(Gd)>(e.far-e.near)**2))&&(zd.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(zd),!(i.boundingBox!==null&&Ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ar)))}_computeIntersections(e,n,i){let r,s=this.geometry,o=this.material,l=s.index,u=s.attributes.position,h=s.attributes.uv,c=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(l!==null)if(Array.isArray(o))for(let _=0,b=d.length;_<b;_++){let m=d[_],g=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,w=x;M<w;M+=3){let T=l.getX(M),A=l.getX(M+1),C=l.getX(M+2);r=Fo(this,g,e,i,h,c,f,T,A,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{let _=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let m=_,g=b;m<g;m+=3){let v=l.getX(m),x=l.getX(m+1),M=l.getX(m+2);r=Fo(this,o,e,i,h,c,f,v,x,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(u!==void 0)if(Array.isArray(o))for(let _=0,b=d.length;_<b;_++){let m=d[_],g=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(u.count,Math.min(m.start+m.count,p.start+p.count));for(let M=v,w=x;M<w;M+=3){let T=M,A=M+1,C=M+2;r=Fo(this,g,e,i,h,c,f,T,A,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{let _=Math.max(0,p.start),b=Math.min(u.count,p.start+p.count);for(let m=_,g=b;m<g;m+=3){let v=m,x=m+1,M=m+2;r=Fo(this,o,e,i,h,c,f,v,x,M),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}};function H0(a,e,n,i,r,s,o,l){let u;if(e.side===$t?u=i.intersectTriangle(o,s,r,!0,l):u=i.intersectTriangle(r,s,o,e.side===oi,l),u===null)return null;Uo.copy(l),Uo.applyMatrix4(a.matrixWorld);let h=n.ray.origin.distanceTo(Uo);return h<n.near||h>n.far?null:{distance:h,point:Uo.clone(),object:a}}function Fo(a,e,n,i,r,s,o,l,u,h){a.getVertexPosition(l,_s),a.getVertexPosition(u,bs),a.getVertexPosition(h,xs);let c=H0(a,e,n,i,_s,bs,xs,No);if(c){r&&(Io.fromBufferAttribute(r,l),Do.fromBufferAttribute(r,u),Oo.fromBufferAttribute(r,h),c.uv=As.getInterpolation(No,_s,bs,xs,Io,Do,Oo,new me)),s&&(Io.fromBufferAttribute(s,l),Do.fromBufferAttribute(s,u),Oo.fromBufferAttribute(s,h),c.uv1=As.getInterpolation(No,_s,bs,xs,Io,Do,Oo,new me),c.uv2=c.uv1),o&&(Hd.fromBufferAttribute(o,l),Vd.fromBufferAttribute(o,u),Wd.fromBufferAttribute(o,h),c.normal=As.getInterpolation(No,_s,bs,xs,Hd,Vd,Wd,new D),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));let f={a:l,b:u,c:h,normal:new D,materialIndex:0};As.getNormal(_s,bs,xs,f.normal),c.face=f}return c}var Hn=class a extends It{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let l=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let u=[],h=[],c=[],f=[],d=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(u),this.setAttribute("position",new st(h,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(f,2));function _(b,m,g,v,x,M,w,T,A,C,y){let S=M/A,N=w/C,F=M/2,V=w/2,I=T/2,U=A+1,k=C+1,Y=0,K=0,j=new D;for(let J=0;J<k;J++){let Q=J*N-V;for(let re=0;re<U;re++){let X=re*S-F;j[b]=X*v,j[m]=Q*x,j[g]=I,h.push(j.x,j.y,j.z),j[b]=0,j[m]=0,j[g]=T>0?1:-1,c.push(j.x,j.y,j.z),f.push(re/A),f.push(1-J/C),Y+=1}}for(let J=0;J<C;J++)for(let Q=0;Q<A;Q++){let re=d+Q+U*J,X=d+Q+U*(J+1),Z=d+(Q+1)+U*(J+1),ce=d+(Q+1)+U*J;u.push(re,X,ce),u.push(X,Z,ce),K+=6}l.addGroup(p,K,y),p+=K,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Fs(a){let e={};for(let n in a){e[n]={};for(let i in a[n]){let r=a[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function un(a){let e={};for(let n=0;n<a.length;n++){let i=Fs(a[n]);for(let r in i)e[r]=i[r]}return e}function V0(a){let e=[];for(let n=0;n<a.length;n++)e.push(a[n].clone());return e}function Jp(a){return a.getRenderTarget()===null?a.outputColorSpace:Je.workingColorSpace}var cr={clone:Fs,merge:un},W0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,X0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rt=class extends In{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=W0,this.fragmentShader=X0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=V0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},oc=class extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=Li}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ot=class extends oc{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let n=.5*this.getFilmHeight()/e;this.fov=Us*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Us*2*Math.atan(Math.tan(Ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,n=e*Math.tan(Ta*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let u=o.fullWidth,h=o.fullHeight;s+=o.offsetX*r/u,n-=o.offsetY*i/h,r*=o.width/u,i*=o.height/h}let l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},vs=-90,ys=1,lu=class extends gt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ot(vs,ys,e,n);r.layers=this.layers,this.add(r);let s=new Ot(vs,ys,e,n);s.layers=this.layers,this.add(s);let o=new Ot(vs,ys,e,n);o.layers=this.layers,this.add(o);let l=new Ot(vs,ys,e,n);l.layers=this.layers,this.add(l);let u=new Ot(vs,ys,e,n);u.layers=this.layers,this.add(u);let h=new Ot(vs,ys,e,n);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,l,u]=n;for(let h of n)this.remove(h);if(e===Li)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===$o)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let h of n)this.add(h),h.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,l,u,h,c]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,l),e.setRenderTarget(i,3,r),e.render(n,u),e.setRenderTarget(i,4,r),e.render(n,h),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,r),e.render(n,c),e.setRenderTarget(f,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},cc=class extends qt{constructor(e,n,i,r,s,o,l,u,h,c){e=e!==void 0?e:[],n=n!==void 0?n:Is,super(e,n,i,r,s,o,l,u,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},uu=class extends Yt{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(Aa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Dr?it:Gn),this.texture=new cc(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:wt}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Hn(5,5,5),s=new Rt({name:"CubemapFromEquirect",uniforms:Fs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:ai});s.uniforms.tEquirect.value=n;let o=new qe(r,s),l=n.minFilter;return n.minFilter===Di&&(n.minFilter=wt),new lu(1,10,this).update(e,o),n.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}},Wl=new D,q0=new D,Y0=new Ve,Ci=class{constructor(e=new D(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){let r=Wl.subVectors(i,n).cross(q0.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){let i=e.delta(Wl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){let i=n||Y0.getNormalMatrix(e),r=this.coplanarPoint(Wl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Er=new Ln,ko=new D,Ia=class{constructor(e=new Ci,n=new Ci,i=new Ci,r=new Ci,s=new Ci,o=new Ci){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){let l=this.planes;return l[0].copy(e),l[1].copy(n),l[2].copy(i),l[3].copy(r),l[4].copy(s),l[5].copy(o),this}copy(e){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Li){let i=this.planes,r=e.elements,s=r[0],o=r[1],l=r[2],u=r[3],h=r[4],c=r[5],f=r[6],d=r[7],p=r[8],_=r[9],b=r[10],m=r[11],g=r[12],v=r[13],x=r[14],M=r[15];if(i[0].setComponents(u-s,d-h,m-p,M-g).normalize(),i[1].setComponents(u+s,d+h,m+p,M+g).normalize(),i[2].setComponents(u+o,d+c,m+_,M+v).normalize(),i[3].setComponents(u-o,d-c,m-_,M-v).normalize(),i[4].setComponents(u-l,d-f,m-b,M-x).normalize(),n===Li)i[5].setComponents(u+l,d+f,m+b,M+x).normalize();else if(n===$o)i[5].setComponents(l,f,b,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Er.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Er)}intersectsSprite(e){return Er.center.set(0,0,0),Er.radius=.7071067811865476,Er.applyMatrix4(e.matrixWorld),this.intersectsSphere(Er)}intersectsSphere(e){let n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let n=this.planes;for(let i=0;i<6;i++){let r=n[i];if(ko.x=r.normal.x>0?e.max.x:e.min.x,ko.y=r.normal.y>0?e.max.y:e.min.y,ko.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ko)<0)return!1}return!0}containsPoint(e){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Zp(){let a=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=a.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=a.requestAnimationFrame(r),e=!0)},stop:function(){a.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){a=s}}}function j0(a,e){let n=e.isWebGL2,i=new WeakMap;function r(h,c){let f=h.array,d=h.usage,p=f.byteLength,_=a.createBuffer();a.bindBuffer(c,_),a.bufferData(c,f,d),h.onUploadCallback();let b;if(f instanceof Float32Array)b=a.FLOAT;else if(f instanceof Uint16Array)if(h.isFloat16BufferAttribute)if(n)b=a.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else b=a.UNSIGNED_SHORT;else if(f instanceof Int16Array)b=a.SHORT;else if(f instanceof Uint32Array)b=a.UNSIGNED_INT;else if(f instanceof Int32Array)b=a.INT;else if(f instanceof Int8Array)b=a.BYTE;else if(f instanceof Uint8Array)b=a.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)b=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:b,bytesPerElement:f.BYTES_PER_ELEMENT,version:h.version,size:p}}function s(h,c,f){let d=c.array,p=c._updateRange,_=c.updateRanges;if(a.bindBuffer(f,h),p.count===-1&&_.length===0&&a.bufferSubData(f,0,d),_.length!==0){for(let b=0,m=_.length;b<m;b++){let g=_[b];n?a.bufferSubData(f,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count):a.bufferSubData(f,g.start*d.BYTES_PER_ELEMENT,d.subarray(g.start,g.start+g.count))}c.clearUpdateRanges()}p.count!==-1&&(n?a.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):a.bufferSubData(f,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),i.get(h)}function l(h){h.isInterleavedBufferAttribute&&(h=h.data);let c=i.get(h);c&&(a.deleteBuffer(c.buffer),i.delete(h))}function u(h,c){if(h.isGLBufferAttribute){let d=i.get(h);(!d||d.version<h.version)&&i.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}h.isInterleavedBufferAttribute&&(h=h.data);let f=i.get(h);if(f===void 0)i.set(h,r(h,c));else if(f.version<h.version){if(f.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,h,c),f.version=h.version}}return{get:o,remove:l,update:u}}var ci=class a extends It{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};let s=e/2,o=n/2,l=Math.floor(i),u=Math.floor(r),h=l+1,c=u+1,f=e/l,d=n/u,p=[],_=[],b=[],m=[];for(let g=0;g<c;g++){let v=g*d-o;for(let x=0;x<h;x++){let M=x*f-s;_.push(M,-v,0),b.push(0,0,1),m.push(x/l),m.push(1-g/u)}}for(let g=0;g<u;g++)for(let v=0;v<l;v++){let x=v+h*g,M=v+h*(g+1),w=v+1+h*(g+1),T=v+1+h*g;p.push(x,M,T),p.push(M,w,T)}this.setIndex(p),this.setAttribute("position",new st(_,3)),this.setAttribute("normal",new st(b,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.width,e.height,e.widthSegments,e.heightSegments)}},K0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,J0=`#ifdef USE_ALPHAHASH
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
#endif`,Z0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Q0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,eb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tb=`#ifdef USE_AOMAP
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
#endif`,nb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ib=`#ifdef USE_BATCHING
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
#endif`,rb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,sb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ab=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ob=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cb=`#ifdef USE_IRIDESCENCE
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
#endif`,lb=`#ifdef USE_BUMPMAP
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
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,db=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,_b=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,bb=`#define PI 3.141592653589793
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
} // validated`,xb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vb=`vec3 transformedNormal = objectNormal;
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
#endif`,yb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ab=`
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
}`,Eb=`#ifdef USE_ENVMAP
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
#endif`,Rb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cb=`#ifdef USE_ENVMAP
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
#endif`,Pb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lb=`#ifdef USE_ENVMAP
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
#endif`,Ib=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Db=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ob=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ub=`#ifdef USE_GRADIENTMAP
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
}`,Fb=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,kb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gb=`uniform bool receiveShadow;
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
#endif`,Hb=`#ifdef USE_ENVMAP
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
#endif`,Vb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yb=`PhysicalMaterial material;
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
#endif`,jb=`struct PhysicalMaterial {
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
}`,Kb=`
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
#endif`,Jb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qb=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$b=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ex=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,tx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,nx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ix=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sx=`#if defined( USE_POINTS_UV )
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
#endif`,ax=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ox=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lx=`#ifdef USE_MORPHNORMALS
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
#endif`,ux=`#ifdef USE_MORPHTARGETS
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
#endif`,hx=`#ifdef USE_MORPHTARGETS
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
#endif`,fx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,px=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_x=`#ifdef USE_NORMALMAP
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
#endif`,bx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ax=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ex=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Px=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ix=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dx=`float getShadowMask() {
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
}`,Ox=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nx=`#ifdef USE_SKINNING
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
#endif`,Ux=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fx=`#ifdef USE_SKINNING
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
#endif`,kx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hx=`#ifdef USE_TRANSMISSION
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
#endif`,Vx=`#ifdef USE_TRANSMISSION
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
#endif`,Wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kx=`uniform sampler2D t2D;
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
}`,Jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$x=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ev=`#include <common>
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
}`,tv=`#if DEPTH_PACKING == 3200
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
}`,nv=`#define DISTANCE
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
}`,iv=`#define DISTANCE
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
}`,rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`uniform float scale;
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
}`,ov=`uniform vec3 diffuse;
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
}`,cv=`#include <common>
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
}`,lv=`uniform vec3 diffuse;
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
}`,uv=`#define LAMBERT
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
}`,hv=`#define LAMBERT
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
}`,fv=`#define MATCAP
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
}`,dv=`#define MATCAP
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
}`,pv=`#define NORMAL
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
}`,mv=`#define NORMAL
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
}`,gv=`#define PHONG
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
}`,_v=`#define PHONG
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
}`,bv=`#define STANDARD
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
}`,xv=`#define STANDARD
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
}`,vv=`#define TOON
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
}`,yv=`#define TOON
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
}`,Mv=`uniform float size;
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
}`,Sv=`uniform vec3 diffuse;
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
}`,Tv=`#include <common>
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
}`,wv=`uniform vec3 color;
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
}`,Av=`uniform float rotation;
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
}`,Ev=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:K0,alphahash_pars_fragment:J0,alphamap_fragment:Z0,alphamap_pars_fragment:Q0,alphatest_fragment:$0,alphatest_pars_fragment:eb,aomap_fragment:tb,aomap_pars_fragment:nb,batching_pars_vertex:ib,batching_vertex:rb,begin_vertex:sb,beginnormal_vertex:ab,bsdfs:ob,iridescence_fragment:cb,bumpmap_pars_fragment:lb,clipping_planes_fragment:ub,clipping_planes_pars_fragment:hb,clipping_planes_pars_vertex:fb,clipping_planes_vertex:db,color_fragment:pb,color_pars_fragment:mb,color_pars_vertex:gb,color_vertex:_b,common:bb,cube_uv_reflection_fragment:xb,defaultnormal_vertex:vb,displacementmap_pars_vertex:yb,displacementmap_vertex:Mb,emissivemap_fragment:Sb,emissivemap_pars_fragment:Tb,colorspace_fragment:wb,colorspace_pars_fragment:Ab,envmap_fragment:Eb,envmap_common_pars_fragment:Rb,envmap_pars_fragment:Cb,envmap_pars_vertex:Pb,envmap_physical_pars_fragment:Hb,envmap_vertex:Lb,fog_vertex:Ib,fog_pars_vertex:Db,fog_fragment:Ob,fog_pars_fragment:Nb,gradientmap_pars_fragment:Ub,lightmap_fragment:Fb,lightmap_pars_fragment:kb,lights_lambert_fragment:Bb,lights_lambert_pars_fragment:zb,lights_pars_begin:Gb,lights_toon_fragment:Vb,lights_toon_pars_fragment:Wb,lights_phong_fragment:Xb,lights_phong_pars_fragment:qb,lights_physical_fragment:Yb,lights_physical_pars_fragment:jb,lights_fragment_begin:Kb,lights_fragment_maps:Jb,lights_fragment_end:Zb,logdepthbuf_fragment:Qb,logdepthbuf_pars_fragment:$b,logdepthbuf_pars_vertex:ex,logdepthbuf_vertex:tx,map_fragment:nx,map_pars_fragment:ix,map_particle_fragment:rx,map_particle_pars_fragment:sx,metalnessmap_fragment:ax,metalnessmap_pars_fragment:ox,morphcolor_vertex:cx,morphnormal_vertex:lx,morphtarget_pars_vertex:ux,morphtarget_vertex:hx,normal_fragment_begin:fx,normal_fragment_maps:dx,normal_pars_fragment:px,normal_pars_vertex:mx,normal_vertex:gx,normalmap_pars_fragment:_x,clearcoat_normal_fragment_begin:bx,clearcoat_normal_fragment_maps:xx,clearcoat_pars_fragment:vx,iridescence_pars_fragment:yx,opaque_fragment:Mx,packing:Sx,premultiplied_alpha_fragment:Tx,project_vertex:wx,dithering_fragment:Ax,dithering_pars_fragment:Ex,roughnessmap_fragment:Rx,roughnessmap_pars_fragment:Cx,shadowmap_pars_fragment:Px,shadowmap_pars_vertex:Lx,shadowmap_vertex:Ix,shadowmask_pars_fragment:Dx,skinbase_vertex:Ox,skinning_pars_vertex:Nx,skinning_vertex:Ux,skinnormal_vertex:Fx,specularmap_fragment:kx,specularmap_pars_fragment:Bx,tonemapping_fragment:zx,tonemapping_pars_fragment:Gx,transmission_fragment:Hx,transmission_pars_fragment:Vx,uv_pars_fragment:Wx,uv_pars_vertex:Xx,uv_vertex:qx,worldpos_vertex:Yx,background_vert:jx,background_frag:Kx,backgroundCube_vert:Jx,backgroundCube_frag:Zx,cube_vert:Qx,cube_frag:$x,depth_vert:ev,depth_frag:tv,distanceRGBA_vert:nv,distanceRGBA_frag:iv,equirect_vert:rv,equirect_frag:sv,linedashed_vert:av,linedashed_frag:ov,meshbasic_vert:cv,meshbasic_frag:lv,meshlambert_vert:uv,meshlambert_frag:hv,meshmatcap_vert:fv,meshmatcap_frag:dv,meshnormal_vert:pv,meshnormal_frag:mv,meshphong_vert:gv,meshphong_frag:_v,meshphysical_vert:bv,meshphysical_frag:xv,meshtoon_vert:vv,meshtoon_frag:yv,points_vert:Mv,points_frag:Sv,shadow_vert:Tv,shadow_frag:wv,sprite_vert:Av,sprite_frag:Ev},ae={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},ri={basic:{uniforms:un([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:un([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new oe(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:un([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:un([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:un([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new oe(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:un([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:un([ae.points,ae.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:un([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:un([ae.common,ae.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:un([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:un([ae.sprite,ae.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:un([ae.common,ae.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:un([ae.lights,ae.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};ri.physical={uniforms:un([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};var Bo={r:0,b:0,g:0};function Rv(a,e,n,i,r,s,o){let l=new oe(0),u=s===!0?0:1,h,c,f=null,d=0,p=null;function _(m,g){let v=!1,x=g.isScene===!0?g.background:null;x&&x.isTexture&&(x=(g.backgroundBlurriness>0?n:e).get(x)),x===null?b(l,u):x&&x.isColor&&(b(x,1),v=!0);let M=a.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(a.autoClear||v)&&a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Rc)?(c===void 0&&(c=new qe(new Hn(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Fs(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=Je.getTransfer(x.colorSpace)!==tt,(f!==x||d!==x.version||p!==a.toneMapping)&&(c.material.needsUpdate=!0,f=x,d=x.version,p=a.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(h===void 0&&(h=new qe(new ci(2,2),new Rt({name:"BackgroundMaterial",uniforms:Fs(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(h)),h.material.uniforms.t2D.value=x,h.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,h.material.toneMapped=Je.getTransfer(x.colorSpace)!==tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),h.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||d!==x.version||p!==a.toneMapping)&&(h.material.needsUpdate=!0,f=x,d=x.version,p=a.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null))}function b(m,g){m.getRGB(Bo,Jp(a)),i.buffers.color.setClear(Bo.r,Bo.g,Bo.b,g,o)}return{getClearColor:function(){return l},setClearColor:function(m,g=1){l.set(m),u=g,b(l,u)},getClearAlpha:function(){return u},setClearAlpha:function(m){u=m,b(l,u)},render:_}}function Cv(a,e,n,i){let r=a.getParameter(a.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,l={},u=m(null),h=u,c=!1;function f(I,U,k,Y,K){let j=!1;if(o){let J=b(Y,k,U);h!==J&&(h=J,p(h.object)),j=g(I,Y,k,K),j&&v(I,Y,k,K)}else{let J=U.wireframe===!0;(h.geometry!==Y.id||h.program!==k.id||h.wireframe!==J)&&(h.geometry=Y.id,h.program=k.id,h.wireframe=J,j=!0)}K!==null&&n.update(K,a.ELEMENT_ARRAY_BUFFER),(j||c)&&(c=!1,C(I,U,k,Y),K!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,n.get(K).buffer))}function d(){return i.isWebGL2?a.createVertexArray():s.createVertexArrayOES()}function p(I){return i.isWebGL2?a.bindVertexArray(I):s.bindVertexArrayOES(I)}function _(I){return i.isWebGL2?a.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function b(I,U,k){let Y=k.wireframe===!0,K=l[I.id];K===void 0&&(K={},l[I.id]=K);let j=K[U.id];j===void 0&&(j={},K[U.id]=j);let J=j[Y];return J===void 0&&(J=m(d()),j[Y]=J),J}function m(I){let U=[],k=[],Y=[];for(let K=0;K<r;K++)U[K]=0,k[K]=0,Y[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:Y,object:I,attributes:{},index:null}}function g(I,U,k,Y){let K=h.attributes,j=U.attributes,J=0,Q=k.getAttributes();for(let re in Q)if(Q[re].location>=0){let Z=K[re],ce=j[re];if(ce===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(ce=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(ce=I.instanceColor)),Z===void 0||Z.attribute!==ce||ce&&Z.data!==ce.data)return!0;J++}return h.attributesNum!==J||h.index!==Y}function v(I,U,k,Y){let K={},j=U.attributes,J=0,Q=k.getAttributes();for(let re in Q)if(Q[re].location>=0){let Z=j[re];Z===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor));let ce={};ce.attribute=Z,Z&&Z.data&&(ce.data=Z.data),K[re]=ce,J++}h.attributes=K,h.attributesNum=J,h.index=Y}function x(){let I=h.newAttributes;for(let U=0,k=I.length;U<k;U++)I[U]=0}function M(I){w(I,0)}function w(I,U){let k=h.newAttributes,Y=h.enabledAttributes,K=h.attributeDivisors;k[I]=1,Y[I]===0&&(a.enableVertexAttribArray(I),Y[I]=1),K[I]!==U&&((i.isWebGL2?a:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,U),K[I]=U)}function T(){let I=h.newAttributes,U=h.enabledAttributes;for(let k=0,Y=U.length;k<Y;k++)U[k]!==I[k]&&(a.disableVertexAttribArray(k),U[k]=0)}function A(I,U,k,Y,K,j,J){J===!0?a.vertexAttribIPointer(I,U,k,K,j):a.vertexAttribPointer(I,U,k,Y,K,j)}function C(I,U,k,Y){if(i.isWebGL2===!1&&(I.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();let K=Y.attributes,j=k.getAttributes(),J=U.defaultAttributeValues;for(let Q in j){let re=j[Q];if(re.location>=0){let X=K[Q];if(X===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(X=I.instanceColor)),X!==void 0){let Z=X.normalized,ce=X.itemSize,ve=n.get(X);if(ve===void 0)continue;let xe=ve.buffer,De=ve.type,Ne=ve.bytesPerElement,Ee=i.isWebGL2===!0&&(De===a.INT||De===a.UNSIGNED_INT||X.gpuType===Up);if(X.isInterleavedBufferAttribute){let Ke=X.data,z=Ke.stride,an=X.offset;if(Ke.isInstancedInterleavedBuffer){for(let Me=0;Me<re.locationSize;Me++)w(re.location+Me,Ke.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Ke.meshPerAttribute*Ke.count)}else for(let Me=0;Me<re.locationSize;Me++)M(re.location+Me);a.bindBuffer(a.ARRAY_BUFFER,xe);for(let Me=0;Me<re.locationSize;Me++)A(re.location+Me,ce/re.locationSize,De,Z,z*Ne,(an+ce/re.locationSize*Me)*Ne,Ee)}else{if(X.isInstancedBufferAttribute){for(let Ke=0;Ke<re.locationSize;Ke++)w(re.location+Ke,X.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Ke=0;Ke<re.locationSize;Ke++)M(re.location+Ke);a.bindBuffer(a.ARRAY_BUFFER,xe);for(let Ke=0;Ke<re.locationSize;Ke++)A(re.location+Ke,ce/re.locationSize,De,Z,ce*Ne,ce/re.locationSize*Ke*Ne,Ee)}}else if(J!==void 0){let Z=J[Q];if(Z!==void 0)switch(Z.length){case 2:a.vertexAttrib2fv(re.location,Z);break;case 3:a.vertexAttrib3fv(re.location,Z);break;case 4:a.vertexAttrib4fv(re.location,Z);break;default:a.vertexAttrib1fv(re.location,Z)}}}}T()}function y(){F();for(let I in l){let U=l[I];for(let k in U){let Y=U[k];for(let K in Y)_(Y[K].object),delete Y[K];delete U[k]}delete l[I]}}function S(I){if(l[I.id]===void 0)return;let U=l[I.id];for(let k in U){let Y=U[k];for(let K in Y)_(Y[K].object),delete Y[K];delete U[k]}delete l[I.id]}function N(I){for(let U in l){let k=l[U];if(k[I.id]===void 0)continue;let Y=k[I.id];for(let K in Y)_(Y[K].object),delete Y[K];delete k[I.id]}}function F(){V(),c=!0,h!==u&&(h=u,p(h.object))}function V(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:f,reset:F,resetDefaultState:V,dispose:y,releaseStatesOfGeometry:S,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:M,disableUnusedAttributes:T}}function Pv(a,e,n,i){let r=i.isWebGL2,s;function o(c){s=c}function l(c,f){a.drawArrays(s,c,f),n.update(f,s,1)}function u(c,f,d){if(d===0)return;let p,_;if(r)p=a,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,c,f,d),n.update(f,s,d)}function h(c,f,d){if(d===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<d;_++)this.render(c[_],f[_]);else{p.multiDrawArraysWEBGL(s,c,0,f,0,d);let _=0;for(let b=0;b<d;b++)_+=f[b];n.update(_,s,1)}}this.setMode=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=h}function Lv(a,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");i=a.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&a.constructor.name==="WebGL2RenderingContext",l=n.precision!==void 0?n.precision:"highp",u=s(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=o||e.has("WEBGL_draw_buffers"),c=n.logarithmicDepthBuffer===!0,f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),d=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=a.getParameter(a.MAX_TEXTURE_SIZE),_=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),b=a.getParameter(a.MAX_VERTEX_ATTRIBS),m=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),g=a.getParameter(a.MAX_VARYING_VECTORS),v=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,M=o||e.has("OES_texture_float"),w=x&&M,T=o?a.getParameter(a.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:h,getMaxAnisotropy:r,getMaxPrecision:s,precision:l,logarithmicDepthBuffer:c,maxTextures:f,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:b,maxVertexUniforms:m,maxVaryings:g,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:w,maxSamples:T}}function Iv(a){let e=this,n=null,i=0,r=!1,s=!1,o=new Ci,l=new Ve,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=c(f,d,0)},this.setState=function(f,d,p){let _=f.clippingPlanes,b=f.clipIntersection,m=f.clipShadows,g=a.get(f);if(!r||_===null||_.length===0||s&&!m)s?c(null):h();else{let v=s?0:i,x=v*4,M=g.clippingState||null;u.value=M,M=c(_,d,x,p);for(let w=0;w!==x;++w)M[w]=n[w];g.clippingState=M,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function h(){u.value!==n&&(u.value=n,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(f,d,p,_){let b=f!==null?f.length:0,m=null;if(b!==0){if(m=u.value,_!==!0||m===null){let g=p+b*4,v=d.matrixWorldInverse;l.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let x=0,M=p;x!==b;++x,M+=4)o.copy(f[x]).applyMatrix4(v,l),o.normal.toArray(m,M),m[M+3]=o.constant}u.value=m,u.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function Dv(a){let e=new WeakMap;function n(o,l){return l===Ra?o.mapping=Is:l===iu&&(o.mapping=Ds),o}function i(o){if(o&&o.isTexture){let l=o.mapping;if(l===Ra||l===iu)if(e.has(o)){let u=e.get(o).texture;return n(u,o.mapping)}else{let u=o.image;if(u&&u.height>0){let h=new uu(u.height/2);return h.fromEquirectangularTexture(a,o),e.set(o,h),o.addEventListener("dispose",r),n(h.texture,o.mapping)}else return null}}return o}function r(o){let l=o.target;l.removeEventListener("dispose",r);let u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var ir=class extends oc{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,l=r+n,u=r-n;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,o=s+h*this.view.width,l-=c*this.view.offsetY,u=l-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,l,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},Es=4,Xd=[.125,.215,.35,.446,.526,.582],Pr=20,Xl=new ir,qd=new oe,ql=null,Yl=0,jl=0,Rr=(1+Math.sqrt(5))/2,Ms=1/Rr,Yd=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Rr,Ms),new D(0,Rr,-Ms),new D(Ms,0,Rr),new D(-Ms,0,Rr),new D(Rr,Ms,0),new D(-Rr,Ms,0)],ks=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){ql=this._renderer.getRenderTarget(),Yl=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel(),this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ql,Yl,jl),e.scissorTest=!1,zo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Is||e.mapping===Ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ql=this._renderer.getRenderTarget(),Yl=this._renderer.getActiveCubeFace(),jl=this._renderer.getActiveMipmapLevel();let i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Gt,format:zn,colorSpace:Et,depthBuffer:!1},r=jd(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jd(e,n,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ov(s)),this._blurMaterial=Nv(s,e,n)}return r}_compileMaterial(e){let n=new qe(this._lodPlanes[0],e);this._renderer.compile(n,Xl)}_sceneToCubeUV(e,n,i,r){let l=new Ot(90,1,n,i),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,d=c.toneMapping;c.getClearColor(qd),c.toneMapping=tr,c.autoClear=!1;let p=new _t({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),_=new qe(new Hn,p),b=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,b=!0):(p.color.copy(qd),b=!0);for(let g=0;g<6;g++){let v=g%3;v===0?(l.up.set(0,u[g],0),l.lookAt(h[g],0,0)):v===1?(l.up.set(0,0,u[g]),l.lookAt(0,h[g],0)):(l.up.set(0,u[g],0),l.lookAt(0,0,h[g]));let x=this._cubeSize;zo(r,v*x,g>2?x:0,x,x),c.setRenderTarget(r),b&&c.render(_,l),c.render(e,l)}_.geometry.dispose(),_.material.dispose(),c.toneMapping=d,c.autoClear=f,e.background=m}_textureToCubeUV(e,n){let i=this._renderer,r=e.mapping===Is||e.mapping===Ds;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kd());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new qe(this._lodPlanes[0],s),l=s.uniforms;l.envMap.value=e;let u=this._cubeSize;zo(n,0,0,3*u,2*u),i.setRenderTarget(n),i.render(o,Xl)}_applyPMREM(e){let n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Yd[(r-1)%Yd.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,l){let u=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let c=3,f=new qe(this._lodPlanes[r],h),d=h.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Pr-1),b=s/_,m=isFinite(s)?1+Math.floor(c*b):Pr;m>Pr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pr}`);let g=[],v=0;for(let A=0;A<Pr;++A){let C=A/b,y=Math.exp(-C*C/2);g.push(y),A===0?v+=y:A<m&&(v+=2*y)}for(let A=0;A<g.length;A++)g[A]=g[A]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=o==="latitudinal",l&&(d.poleAxis.value=l);let{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-i;let M=this._sizeLods[r],w=3*M*(r>x-Es?r-x+Es:0),T=4*(this._cubeSize-M);zo(n,w,T,3*M,2*M),u.setRenderTarget(n),u.render(f,Xl)}};function Ov(a){let e=[],n=[],i=[],r=a,s=a-Es+1+Xd.length;for(let o=0;o<s;o++){let l=Math.pow(2,r);n.push(l);let u=1/l;o>a-Es?u=Xd[o-a+Es-1]:o===0&&(u=0),i.push(u);let h=1/(l-2),c=-h,f=1+h,d=[c,c,f,c,f,f,c,c,f,f,c,f],p=6,_=6,b=3,m=2,g=1,v=new Float32Array(b*_*p),x=new Float32Array(m*_*p),M=new Float32Array(g*_*p);for(let T=0;T<p;T++){let A=T%3*2/3-1,C=T>2?0:-1,y=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];v.set(y,b*_*T),x.set(d,m*_*T);let S=[T,T,T,T,T,T];M.set(S,g*_*T)}let w=new It;w.setAttribute("position",new At(v,b)),w.setAttribute("uv",new At(x,m)),w.setAttribute("faceIndex",new At(M,g)),e.push(w),r>Es&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function jd(a,e,n){let i=new Yt(a,e,n);return i.texture.mapping=Rc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zo(a,e,n,i,r){a.viewport.set(e,n,i,r),a.scissor.set(e,n,i,r)}function Nv(a,e,n){let i=new Float32Array(Pr),r=new D(0,1,0);return new Rt({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Kd(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Jd(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Ku(){return`

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
	`}function Uv(a){let e=new WeakMap,n=null;function i(l){if(l&&l.isTexture){let u=l.mapping,h=u===Ra||u===iu,c=u===Is||u===Ds;if(h||c)if(l.isRenderTargetTexture&&l.needsPMREMUpdate===!0){l.needsPMREMUpdate=!1;let f=e.get(l);return n===null&&(n=new ks(a)),f=h?n.fromEquirectangular(l,f):n.fromCubemap(l,f),e.set(l,f),f.texture}else{if(e.has(l))return e.get(l).texture;{let f=l.image;if(h&&f&&f.height>0||c&&f&&r(f)){n===null&&(n=new ks(a));let d=h?n.fromEquirectangular(l):n.fromCubemap(l);return e.set(l,d),l.addEventListener("dispose",s),d.texture}else return null}}}return l}function r(l){let u=0,h=6;for(let c=0;c<h;c++)l[c]!==void 0&&u++;return u===h}function s(l){let u=l.target;u.removeEventListener("dispose",s);let h=e.get(u);h!==void 0&&(e.delete(u),h.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Fv(a){let e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=a.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){let r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function kv(a,e,n,i){let r={},s=new WeakMap;function o(f){let d=f.target;d.index!==null&&e.remove(d.index);for(let _ in d.attributes)e.remove(d.attributes[_]);for(let _ in d.morphAttributes){let b=d.morphAttributes[_];for(let m=0,g=b.length;m<g;m++)e.remove(b[m])}d.removeEventListener("dispose",o),delete r[d.id];let p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function l(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function u(f){let d=f.attributes;for(let _ in d)e.update(d[_],a.ARRAY_BUFFER);let p=f.morphAttributes;for(let _ in p){let b=p[_];for(let m=0,g=b.length;m<g;m++)e.update(b[m],a.ARRAY_BUFFER)}}function h(f){let d=[],p=f.index,_=f.attributes.position,b=0;if(p!==null){let v=p.array;b=p.version;for(let x=0,M=v.length;x<M;x+=3){let w=v[x+0],T=v[x+1],A=v[x+2];d.push(w,T,T,A,A,w)}}else if(_!==void 0){let v=_.array;b=_.version;for(let x=0,M=v.length/3-1;x<M;x+=3){let w=x+0,T=x+1,A=x+2;d.push(w,T,T,A,A,w)}}else return;let m=new(jp(d)?ac:sc)(d,1);m.version=b;let g=s.get(f);g&&e.remove(g),s.set(f,m)}function c(f){let d=s.get(f);if(d){let p=f.index;p!==null&&d.version<p.version&&h(f)}else h(f);return s.get(f)}return{get:l,update:u,getWireframeAttribute:c}}function Bv(a,e,n,i){let r=i.isWebGL2,s;function o(p){s=p}let l,u;function h(p){l=p.type,u=p.bytesPerElement}function c(p,_){a.drawElements(s,_,l,p*u),n.update(_,s,1)}function f(p,_,b){if(b===0)return;let m,g;if(r)m=a,g="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](s,_,l,p*u,b),n.update(_,s,b)}function d(p,_,b){if(b===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<b;g++)this.render(p[g]/u,_[g]);else{m.multiDrawElementsWEBGL(s,_,0,l,p,0,b);let g=0;for(let v=0;v<b;v++)g+=_[v];n.update(g,s,1)}}this.setMode=o,this.setIndex=h,this.render=c,this.renderInstances=f,this.renderMultiDraw=d}function zv(a){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,l){switch(n.calls++,o){case a.TRIANGLES:n.triangles+=l*(s/3);break;case a.LINES:n.lines+=l*(s/2);break;case a.LINE_STRIP:n.lines+=l*(s-1);break;case a.LINE_LOOP:n.lines+=l*s;break;case a.POINTS:n.points+=l*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Gv(a,e){return a[0]-e[0]}function Hv(a,e){return Math.abs(e[1])-Math.abs(a[1])}function Vv(a,e,n){let i={},r=new Float32Array(8),s=new WeakMap,o=new rt,l=[];for(let h=0;h<8;h++)l[h]=[h,0];function u(h,c,f){let d=h.morphTargetInfluences;if(e.isWebGL2===!0){let p=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,_=p!==void 0?p.length:0,b=s.get(c);if(b===void 0||b.count!==_){let I=function(){F.dispose(),s.delete(c),c.removeEventListener("dispose",I)};b!==void 0&&b.texture.dispose();let v=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,M=c.morphAttributes.color!==void 0,w=c.morphAttributes.position||[],T=c.morphAttributes.normal||[],A=c.morphAttributes.color||[],C=0;v===!0&&(C=1),x===!0&&(C=2),M===!0&&(C=3);let y=c.attributes.position.count*C,S=1;y>e.maxTextureSize&&(S=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let N=new Float32Array(y*S*4*_),F=new ic(N,y,S,_);F.type=Cn,F.needsUpdate=!0;let V=C*4;for(let U=0;U<_;U++){let k=w[U],Y=T[U],K=A[U],j=y*S*4*U;for(let J=0;J<k.count;J++){let Q=J*V;v===!0&&(o.fromBufferAttribute(k,J),N[j+Q+0]=o.x,N[j+Q+1]=o.y,N[j+Q+2]=o.z,N[j+Q+3]=0),x===!0&&(o.fromBufferAttribute(Y,J),N[j+Q+4]=o.x,N[j+Q+5]=o.y,N[j+Q+6]=o.z,N[j+Q+7]=0),M===!0&&(o.fromBufferAttribute(K,J),N[j+Q+8]=o.x,N[j+Q+9]=o.y,N[j+Q+10]=o.z,N[j+Q+11]=K.itemSize===4?o.w:1)}}b={count:_,texture:F,size:new me(y,S)},s.set(c,b),c.addEventListener("dispose",I)}let m=0;for(let v=0;v<d.length;v++)m+=d[v];let g=c.morphTargetsRelative?1:1-m;f.getUniforms().setValue(a,"morphTargetBaseInfluence",g),f.getUniforms().setValue(a,"morphTargetInfluences",d),f.getUniforms().setValue(a,"morphTargetsTexture",b.texture,n),f.getUniforms().setValue(a,"morphTargetsTextureSize",b.size)}else{let p=d===void 0?0:d.length,_=i[c.id];if(_===void 0||_.length!==p){_=[];for(let x=0;x<p;x++)_[x]=[x,0];i[c.id]=_}for(let x=0;x<p;x++){let M=_[x];M[0]=x,M[1]=d[x]}_.sort(Hv);for(let x=0;x<8;x++)x<p&&_[x][1]?(l[x][0]=_[x][0],l[x][1]=_[x][1]):(l[x][0]=Number.MAX_SAFE_INTEGER,l[x][1]=0);l.sort(Gv);let b=c.morphAttributes.position,m=c.morphAttributes.normal,g=0;for(let x=0;x<8;x++){let M=l[x],w=M[0],T=M[1];w!==Number.MAX_SAFE_INTEGER&&T?(b&&c.getAttribute("morphTarget"+x)!==b[w]&&c.setAttribute("morphTarget"+x,b[w]),m&&c.getAttribute("morphNormal"+x)!==m[w]&&c.setAttribute("morphNormal"+x,m[w]),r[x]=T,g+=T):(b&&c.hasAttribute("morphTarget"+x)===!0&&c.deleteAttribute("morphTarget"+x),m&&c.hasAttribute("morphNormal"+x)===!0&&c.deleteAttribute("morphNormal"+x),r[x]=0)}let v=c.morphTargetsRelative?1:1-g;f.getUniforms().setValue(a,"morphTargetBaseInfluence",v),f.getUniforms().setValue(a,"morphTargetInfluences",r)}}return{update:u}}function Wv(a,e,n,i){let r=new WeakMap;function s(u){let h=i.render.frame,c=u.geometry,f=e.get(u,c);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),r.get(u)!==h&&(n.update(u.instanceMatrix,a.ARRAY_BUFFER),u.instanceColor!==null&&n.update(u.instanceColor,a.ARRAY_BUFFER),r.set(u,h))),u.isSkinnedMesh){let d=u.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function l(u){let h=u.target;h.removeEventListener("dispose",l),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:s,dispose:o}}var lc=class extends qt{constructor(e,n,i,r,s,o,l,u,h,c){if(c=c!==void 0?c:Ir,c!==Ir&&c!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===Ir&&(i=$i),i===void 0&&c===Os&&(i=Lr),super(null,r,s,o,l,u,c,i,h),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=l!==void 0?l:Dt,this.minFilter=u!==void 0?u:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Qp=new qt,$p=new lc(1,1);$p.compareFunction=qp;var em=new ic,tm=new cu,nm=new cc,Zd=[],Qd=[],$d=new Float32Array(16),ep=new Float32Array(9),tp=new Float32Array(4);function qs(a,e,n){let i=a[0];if(i<=0||i>0)return a;let r=e*n,s=Zd[r];if(s===void 0&&(s=new Float32Array(r),Zd[r]=s),e!==0){i.toArray(s,0);for(let o=1,l=0;o!==e;++o)l+=n,a[o].toArray(s,l)}return s}function Nt(a,e){if(a.length!==e.length)return!1;for(let n=0,i=a.length;n<i;n++)if(a[n]!==e[n])return!1;return!0}function Ut(a,e){for(let n=0,i=e.length;n<i;n++)a[n]=e[n]}function Lc(a,e){let n=Qd[e];n===void 0&&(n=new Int32Array(e),Qd[e]=n);for(let i=0;i!==e;++i)n[i]=a.allocateTextureUnit();return n}function Xv(a,e){let n=this.cache;n[0]!==e&&(a.uniform1f(this.addr,e),n[0]=e)}function qv(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;a.uniform2fv(this.addr,e),Ut(n,e)}}function Yv(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Nt(n,e))return;a.uniform3fv(this.addr,e),Ut(n,e)}}function jv(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;a.uniform4fv(this.addr,e),Ut(n,e)}}function Kv(a,e){let n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;a.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(Nt(n,i))return;tp.set(i),a.uniformMatrix2fv(this.addr,!1,tp),Ut(n,i)}}function Jv(a,e){let n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;a.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(Nt(n,i))return;ep.set(i),a.uniformMatrix3fv(this.addr,!1,ep),Ut(n,i)}}function Zv(a,e){let n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;a.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(Nt(n,i))return;$d.set(i),a.uniformMatrix4fv(this.addr,!1,$d),Ut(n,i)}}function Qv(a,e){let n=this.cache;n[0]!==e&&(a.uniform1i(this.addr,e),n[0]=e)}function $v(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;a.uniform2iv(this.addr,e),Ut(n,e)}}function ey(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;a.uniform3iv(this.addr,e),Ut(n,e)}}function ty(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;a.uniform4iv(this.addr,e),Ut(n,e)}}function ny(a,e){let n=this.cache;n[0]!==e&&(a.uniform1ui(this.addr,e),n[0]=e)}function iy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;a.uniform2uiv(this.addr,e),Ut(n,e)}}function ry(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;a.uniform3uiv(this.addr,e),Ut(n,e)}}function sy(a,e){let n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;a.uniform4uiv(this.addr,e),Ut(n,e)}}function ay(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r);let s=this.type===a.SAMPLER_2D_SHADOW?$p:Qp;n.setTexture2D(e||s,r)}function oy(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||tm,r)}function cy(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||nm,r)}function ly(a,e,n){let i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(a.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||em,r)}function uy(a){switch(a){case 5126:return Xv;case 35664:return qv;case 35665:return Yv;case 35666:return jv;case 35674:return Kv;case 35675:return Jv;case 35676:return Zv;case 5124:case 35670:return Qv;case 35667:case 35671:return $v;case 35668:case 35672:return ey;case 35669:case 35673:return ty;case 5125:return ny;case 36294:return iy;case 36295:return ry;case 36296:return sy;case 35678:case 36198:case 36298:case 36306:case 35682:return ay;case 35679:case 36299:case 36307:return oy;case 35680:case 36300:case 36308:case 36293:return cy;case 36289:case 36303:case 36311:case 36292:return ly}}function hy(a,e){a.uniform1fv(this.addr,e)}function fy(a,e){let n=qs(e,this.size,2);a.uniform2fv(this.addr,n)}function dy(a,e){let n=qs(e,this.size,3);a.uniform3fv(this.addr,n)}function py(a,e){let n=qs(e,this.size,4);a.uniform4fv(this.addr,n)}function my(a,e){let n=qs(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,n)}function gy(a,e){let n=qs(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,n)}function _y(a,e){let n=qs(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,n)}function by(a,e){a.uniform1iv(this.addr,e)}function xy(a,e){a.uniform2iv(this.addr,e)}function vy(a,e){a.uniform3iv(this.addr,e)}function yy(a,e){a.uniform4iv(this.addr,e)}function My(a,e){a.uniform1uiv(this.addr,e)}function Sy(a,e){a.uniform2uiv(this.addr,e)}function Ty(a,e){a.uniform3uiv(this.addr,e)}function wy(a,e){a.uniform4uiv(this.addr,e)}function Ay(a,e,n){let i=this.cache,r=e.length,s=Lc(n,r);Nt(i,s)||(a.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Qp,s[o])}function Ey(a,e,n){let i=this.cache,r=e.length,s=Lc(n,r);Nt(i,s)||(a.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||tm,s[o])}function Ry(a,e,n){let i=this.cache,r=e.length,s=Lc(n,r);Nt(i,s)||(a.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||nm,s[o])}function Cy(a,e,n){let i=this.cache,r=e.length,s=Lc(n,r);Nt(i,s)||(a.uniform1iv(this.addr,s),Ut(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||em,s[o])}function Py(a){switch(a){case 5126:return hy;case 35664:return fy;case 35665:return dy;case 35666:return py;case 35674:return my;case 35675:return gy;case 35676:return _y;case 5124:case 35670:return by;case 35667:case 35671:return xy;case 35668:case 35672:return vy;case 35669:case 35673:return yy;case 5125:return My;case 36294:return Sy;case 36295:return Ty;case 36296:return wy;case 35678:case 36198:case 36298:case 36306:case 35682:return Ay;case 35679:case 36299:case 36307:return Ey;case 35680:case 36300:case 36308:case 36293:return Ry;case 36289:case 36303:case 36311:case 36292:return Cy}}var hu=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=uy(n.type)}},fu=class{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Py(n.type)}},du=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let l=r[s];l.setValue(e,n[l.id],i)}}},Kl=/(\w+)(\])?(\[|\.)?/g;function np(a,e){a.seq.push(e),a.map[e.id]=e}function Ly(a,e,n){let i=a.name,r=i.length;for(Kl.lastIndex=0;;){let s=Kl.exec(i),o=Kl.lastIndex,l=s[1],u=s[2]==="]",h=s[3];if(u&&(l=l|0),h===void 0||h==="["&&o+2===r){np(n,h===void 0?new hu(l,a,e):new fu(l,a,e));break}else{let f=n.map[l];f===void 0&&(f=new du(l),np(n,f)),n=f}}}var Ls=class{constructor(e,n){this.seq=[],this.map={};let i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);Ly(s,o,this)}}setValue(e,n,i,r){let s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){let r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){let l=n[s],u=i[l.id];u.needsUpdate!==!1&&l.setValue(e,u.value,r)}}static seqWithValue(e,n){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in n&&i.push(o)}return i}};function ip(a,e,n){let i=a.createShader(e);return a.shaderSource(i,n),a.compileShader(i),i}var Iy=37297,Dy=0;function Oy(a,e){let n=a.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){let l=o+1;i.push(`${l===e?">":" "} ${l}: ${n[o]}`)}return i.join(`
`)}function Ny(a){let e=Je.getPrimaries(Je.workingColorSpace),n=Je.getPrimaries(a),i;switch(e===n?i="":e===Qo&&n===Zo?i="LinearDisplayP3ToLinearSRGB":e===Zo&&n===Qo&&(i="LinearSRGBToLinearDisplayP3"),a){case Et:case Pc:return[i,"LinearTransferOETF"];case it:case Yu:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",a),[i,"LinearTransferOETF"]}}function rp(a,e,n){let i=a.getShaderParameter(e,a.COMPILE_STATUS),r=a.getShaderInfoLog(e).trim();if(i&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+Oy(a.getShaderSource(e),o)}else return r}function Uy(a,e){let n=Ny(e);return`vec4 ${a}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Fy(a,e){let n;switch(e){case Bu:n="Linear";break;case zu:n="Reinhard";break;case Gu:n="OptimizedCineon";break;case Ha:n="ACESFilmic";break;case Hu:n="AgX";break;case H_:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+a+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function ky(a){return[a.extensionDerivatives||a.envMapCubeUVHeight||a.bumpMap||a.normalMapTangentSpace||a.clearcoatNormalMap||a.flatShading||a.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(a.extensionFragDepth||a.logarithmicDepthBuffer)&&a.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",a.extensionDrawBuffers&&a.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(a.extensionShaderTextureLOD||a.envMap||a.transmission)&&a.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Rs).join(`
`)}function By(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Rs).join(`
`)}function zy(a){let e=[];for(let n in a){let i=a[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Gy(a,e){let n={},i=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=a.getActiveAttrib(e,r),o=s.name,l=1;s.type===a.FLOAT_MAT2&&(l=2),s.type===a.FLOAT_MAT3&&(l=3),s.type===a.FLOAT_MAT4&&(l=4),n[o]={type:s.type,location:a.getAttribLocation(e,o),locationSize:l}}return n}function Rs(a){return a!==""}function sp(a,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ap(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Hy=/^[ \t]*#include +<([\w\d./]+)>/gm;function pu(a){return a.replace(Hy,Wy)}var Vy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Wy(a,e){let n=Fe[e];if(n===void 0){let i=Vy.get(e);if(i!==void 0)n=Fe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return pu(n)}var Xy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function op(a){return a.replace(Xy,qy)}function qy(a,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cp(a){let e="precision "+a.precision+` float;
precision `+a.precision+" int;";return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Yy(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===Dp?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===ku?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===Ri&&(e="SHADOWMAP_TYPE_VSM"),e}function jy(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Is:case Ds:e="ENVMAP_TYPE_CUBE";break;case Rc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ky(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case Ds:e="ENVMAP_MODE_REFRACTION";break}return e}function Jy(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case Op:e="ENVMAP_BLENDING_MULTIPLY";break;case z_:e="ENVMAP_BLENDING_MIX";break;case G_:e="ENVMAP_BLENDING_ADD";break}return e}function Zy(a){let e=a.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Qy(a,e,n,i){let r=a.getContext(),s=n.defines,o=n.vertexShader,l=n.fragmentShader,u=Yy(n),h=jy(n),c=Ky(n),f=Jy(n),d=Zy(n),p=n.isWebGL2?"":ky(n),_=By(n),b=zy(s),m=r.createProgram(),g,v,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(Rs).join(`
`),g.length>0&&(g+=`
`),v=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(Rs).join(`
`),v.length>0&&(v+=`
`)):(g=[cp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+u:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),v=[p,cp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+u:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==tr?"#define TONE_MAPPING":"",n.toneMapping!==tr?Fe.tonemapping_pars_fragment:"",n.toneMapping!==tr?Fy("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Uy("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Rs).join(`
`)),o=pu(o),o=sp(o,n),o=ap(o,n),l=pu(l),l=sp(l,n),l=ap(l,n),o=op(o),l=op(l),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Ed?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ed?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let M=x+g+o,w=x+v+l,T=ip(r,r.VERTEX_SHADER,M),A=ip(r,r.FRAGMENT_SHADER,w);r.attachShader(m,T),r.attachShader(m,A),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function C(F){if(a.debug.checkShaderErrors){let V=r.getProgramInfoLog(m).trim(),I=r.getShaderInfoLog(T).trim(),U=r.getShaderInfoLog(A).trim(),k=!0,Y=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(k=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(r,m,T,A);else{let K=rp(r,T,"vertex"),j=rp(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+V+`
`+K+`
`+j)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(I===""||U==="")&&(Y=!1);Y&&(F.diagnostics={runnable:k,programLog:V,vertexShader:{log:I,prefix:g},fragmentShader:{log:U,prefix:v}})}r.deleteShader(T),r.deleteShader(A),y=new Ls(r,m),S=Gy(r,m)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let N=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(m,Iy)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Dy++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}var $y=0,mu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let n=this.materialCache.get(e);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let n=this.materialCache,i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){let n=this.shaderCache,i=n.get(e);return i===void 0&&(i=new gu(e),n.set(e,i)),i}},gu=class{constructor(e){this.id=$y++,this.code=e,this.usedTimes=0}};function eM(a,e,n,i,r,s,o){let l=new La,u=new mu,h=[],c=r.isWebGL2,f=r.logarithmicDepthBuffer,d=r.vertexTextures,p=r.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(y){return y===0?"uv":`uv${y}`}function m(y,S,N,F,V){let I=F.fog,U=V.geometry,k=y.isMeshStandardMaterial?F.environment:null,Y=(y.isMeshStandardMaterial?n:e).get(y.envMap||k),K=Y&&Y.mapping===Rc?Y.image.height:null,j=_[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Q=J!==void 0?J.length:0,re=0;U.morphAttributes.position!==void 0&&(re=1),U.morphAttributes.normal!==void 0&&(re=2),U.morphAttributes.color!==void 0&&(re=3);let X,Z,ce,ve;if(j){let on=ri[j];X=on.vertexShader,Z=on.fragmentShader}else X=y.vertexShader,Z=y.fragmentShader,u.update(y),ce=u.getVertexShaderID(y),ve=u.getFragmentShaderID(y);let xe=a.getRenderTarget(),De=V.isInstancedMesh===!0,Ne=V.isBatchedMesh===!0,Ee=!!y.map,Ke=!!y.matcap,z=!!Y,an=!!y.aoMap,Me=!!y.lightMap,Le=!!y.bumpMap,ge=!!y.normalMap,pt=!!y.displacementMap,ke=!!y.emissiveMap,P=!!y.metalnessMap,E=!!y.roughnessMap,H=y.anisotropy>0,ne=y.clearcoat>0,te=y.iridescence>0,ie=y.sheen>0,_e=y.transmission>0,he=H&&!!y.anisotropyMap,de=ne&&!!y.clearcoatMap,we=ne&&!!y.clearcoatNormalMap,Be=ne&&!!y.clearcoatRoughnessMap,ee=te&&!!y.iridescenceMap,$e=te&&!!y.iridescenceThicknessMap,Xe=ie&&!!y.sheenColorMap,Pe=ie&&!!y.sheenRoughnessMap,ye=!!y.specularMap,pe=!!y.specularColorMap,Ue=!!y.specularIntensityMap,Qe=_e&&!!y.transmissionMap,vt=_e&&!!y.thicknessMap,Ge=!!y.gradientMap,se=!!y.alphaMap,O=y.alphaTest>0,le=!!y.alphaHash,ue=!!y.extensions,Re=!!U.attributes.uv1,Se=!!U.attributes.uv2,ot=!!U.attributes.uv3,ct=tr;return y.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(ct=a.toneMapping),{isWebGL2:c,shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:X,fragmentShader:Z,defines:y.defines,customVertexShaderID:ce,customFragmentShaderID:ve,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ne,instancing:De,instancingColor:De&&V.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:xe===null?a.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Et,map:Ee,matcap:Ke,envMap:z,envMapMode:z&&Y.mapping,envMapCubeUVHeight:K,aoMap:an,lightMap:Me,bumpMap:Le,normalMap:ge,displacementMap:d&&pt,emissiveMap:ke,normalMapObjectSpace:ge&&y.normalMapType===i0,normalMapTangentSpace:ge&&y.normalMapType===Xp,metalnessMap:P,roughnessMap:E,anisotropy:H,anisotropyMap:he,clearcoat:ne,clearcoatMap:de,clearcoatNormalMap:we,clearcoatRoughnessMap:Be,iridescence:te,iridescenceMap:ee,iridescenceThicknessMap:$e,sheen:ie,sheenColorMap:Xe,sheenRoughnessMap:Pe,specularMap:ye,specularColorMap:pe,specularIntensityMap:Ue,transmission:_e,transmissionMap:Qe,thicknessMap:vt,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===Cs,alphaMap:se,alphaTest:O,alphaHash:le,combine:y.combine,mapUv:Ee&&b(y.map.channel),aoMapUv:an&&b(y.aoMap.channel),lightMapUv:Me&&b(y.lightMap.channel),bumpMapUv:Le&&b(y.bumpMap.channel),normalMapUv:ge&&b(y.normalMap.channel),displacementMapUv:pt&&b(y.displacementMap.channel),emissiveMapUv:ke&&b(y.emissiveMap.channel),metalnessMapUv:P&&b(y.metalnessMap.channel),roughnessMapUv:E&&b(y.roughnessMap.channel),anisotropyMapUv:he&&b(y.anisotropyMap.channel),clearcoatMapUv:de&&b(y.clearcoatMap.channel),clearcoatNormalMapUv:we&&b(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&b(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&b(y.iridescenceMap.channel),iridescenceThicknessMapUv:$e&&b(y.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&b(y.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&b(y.sheenRoughnessMap.channel),specularMapUv:ye&&b(y.specularMap.channel),specularColorMapUv:pe&&b(y.specularColorMap.channel),specularIntensityMapUv:Ue&&b(y.specularIntensityMap.channel),transmissionMapUv:Qe&&b(y.transmissionMap.channel),thicknessMapUv:vt&&b(y.thicknessMap.channel),alphaMapUv:se&&b(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ge||H),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Re,vertexUv2s:Se,vertexUv3s:ot,pointsUvs:V.isPoints===!0&&!!U.attributes.uv&&(Ee||se),fog:!!I,useFog:y.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:V.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:re,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:a.shadowMap.enabled&&N.length>0,shadowMapType:a.shadowMap.type,toneMapping:ct,useLegacyLights:a._useLegacyLights,decodeVideoTexture:Ee&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===_n,flipSided:y.side===$t,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ue&&y.extensions.derivatives===!0,extensionFragDepth:ue&&y.extensions.fragDepth===!0,extensionDrawBuffers:ue&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ue&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ue&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:c||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function g(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let N in y.defines)S.push(N),S.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(v(S,y),x(S,y),S.push(a.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function v(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function x(y,S){l.disableAll(),S.isWebGL2&&l.enable(0),S.supportsVertexTextures&&l.enable(1),S.instancing&&l.enable(2),S.instancingColor&&l.enable(3),S.matcap&&l.enable(4),S.envMap&&l.enable(5),S.normalMapObjectSpace&&l.enable(6),S.normalMapTangentSpace&&l.enable(7),S.clearcoat&&l.enable(8),S.iridescence&&l.enable(9),S.alphaTest&&l.enable(10),S.vertexColors&&l.enable(11),S.vertexAlphas&&l.enable(12),S.vertexUv1s&&l.enable(13),S.vertexUv2s&&l.enable(14),S.vertexUv3s&&l.enable(15),S.vertexTangents&&l.enable(16),S.anisotropy&&l.enable(17),S.alphaHash&&l.enable(18),S.batching&&l.enable(19),y.push(l.mask),l.disableAll(),S.fog&&l.enable(0),S.useFog&&l.enable(1),S.flatShading&&l.enable(2),S.logarithmicDepthBuffer&&l.enable(3),S.skinning&&l.enable(4),S.morphTargets&&l.enable(5),S.morphNormals&&l.enable(6),S.morphColors&&l.enable(7),S.premultipliedAlpha&&l.enable(8),S.shadowMapEnabled&&l.enable(9),S.useLegacyLights&&l.enable(10),S.doubleSided&&l.enable(11),S.flipSided&&l.enable(12),S.useDepthPacking&&l.enable(13),S.dithering&&l.enable(14),S.transmission&&l.enable(15),S.sheen&&l.enable(16),S.opaque&&l.enable(17),S.pointsUvs&&l.enable(18),S.decodeVideoTexture&&l.enable(19),y.push(l.mask)}function M(y){let S=_[y.type],N;if(S){let F=ri[S];N=cr.clone(F.uniforms)}else N=y.uniforms;return N}function w(y,S){let N;for(let F=0,V=h.length;F<V;F++){let I=h[F];if(I.cacheKey===S){N=I,++N.usedTimes;break}}return N===void 0&&(N=new Qy(a,S,y,s),h.push(N)),N}function T(y){if(--y.usedTimes===0){let S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function A(y){u.remove(y)}function C(){u.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:M,acquireProgram:w,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:C}}function tM(){let a=new WeakMap;function e(s){let o=a.get(s);return o===void 0&&(o={},a.set(s,o)),o}function n(s){a.delete(s)}function i(s,o,l){a.get(s)[o]=l}function r(){a=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function nM(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function lp(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function up(){let a=[],e=0,n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,d,p,_,b,m){let g=a[e];return g===void 0?(g={id:f.id,object:f,geometry:d,material:p,groupOrder:_,renderOrder:f.renderOrder,z:b,group:m},a[e]=g):(g.id=f.id,g.object=f,g.geometry=d,g.material=p,g.groupOrder=_,g.renderOrder=f.renderOrder,g.z=b,g.group=m),e++,g}function l(f,d,p,_,b,m){let g=o(f,d,p,_,b,m);p.transmission>0?i.push(g):p.transparent===!0?r.push(g):n.push(g)}function u(f,d,p,_,b,m){let g=o(f,d,p,_,b,m);p.transmission>0?i.unshift(g):p.transparent===!0?r.unshift(g):n.unshift(g)}function h(f,d){n.length>1&&n.sort(f||nM),i.length>1&&i.sort(d||lp),r.length>1&&r.sort(d||lp)}function c(){for(let f=e,d=a.length;f<d;f++){let p=a[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:u,finish:c,sort:h}}function iM(){let a=new WeakMap;function e(i,r){let s=a.get(i),o;return s===void 0?(o=new up,a.set(i,[o])):r>=s.length?(o=new up,s.push(o)):o=s[r],o}function n(){a=new WeakMap}return{get:e,dispose:n}}function rM(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new D,color:new oe};break;case"SpotLight":n={position:new D,direction:new D,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new D,color:new oe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new D,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":n={color:new oe,position:new D,halfWidth:new D,halfHeight:new D};break}return a[e.id]=n,n}}}function sM(){let a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=n,n}}}var aM=0;function oM(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function cM(a,e){let n=new rM,i=sM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new D);let s=new D,o=new Ae,l=new Ae;function u(c,f){let d=0,p=0,_=0;for(let F=0;F<9;F++)r.probe[F].set(0,0,0);let b=0,m=0,g=0,v=0,x=0,M=0,w=0,T=0,A=0,C=0,y=0;c.sort(oM);let S=f===!0?Math.PI:1;for(let F=0,V=c.length;F<V;F++){let I=c[F],U=I.color,k=I.intensity,Y=I.distance,K=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=U.r*k*S,p+=U.g*k*S,_+=U.b*k*S;else if(I.isLightProbe){for(let j=0;j<9;j++)r.probe[j].addScaledVector(I.sh.coefficients[j],k);y++}else if(I.isDirectionalLight){let j=n.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity*S),I.castShadow){let J=I.shadow,Q=i.get(I);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,r.directionalShadow[b]=Q,r.directionalShadowMap[b]=K,r.directionalShadowMatrix[b]=I.shadow.matrix,M++}r.directional[b]=j,b++}else if(I.isSpotLight){let j=n.get(I);j.position.setFromMatrixPosition(I.matrixWorld),j.color.copy(U).multiplyScalar(k*S),j.distance=Y,j.coneCos=Math.cos(I.angle),j.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),j.decay=I.decay,r.spot[g]=j;let J=I.shadow;if(I.map&&(r.spotLightMap[A]=I.map,A++,J.updateMatrices(I),I.castShadow&&C++),r.spotLightMatrix[g]=J.matrix,I.castShadow){let Q=i.get(I);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,r.spotShadow[g]=Q,r.spotShadowMap[g]=K,T++}g++}else if(I.isRectAreaLight){let j=n.get(I);j.color.copy(U).multiplyScalar(k),j.halfWidth.set(I.width*.5,0,0),j.halfHeight.set(0,I.height*.5,0),r.rectArea[v]=j,v++}else if(I.isPointLight){let j=n.get(I);if(j.color.copy(I.color).multiplyScalar(I.intensity*S),j.distance=I.distance,j.decay=I.decay,I.castShadow){let J=I.shadow,Q=i.get(I);Q.shadowBias=J.bias,Q.shadowNormalBias=J.normalBias,Q.shadowRadius=J.radius,Q.shadowMapSize=J.mapSize,Q.shadowCameraNear=J.camera.near,Q.shadowCameraFar=J.camera.far,r.pointShadow[m]=Q,r.pointShadowMap[m]=K,r.pointShadowMatrix[m]=I.shadow.matrix,w++}r.point[m]=j,m++}else if(I.isHemisphereLight){let j=n.get(I);j.skyColor.copy(I.color).multiplyScalar(k*S),j.groundColor.copy(I.groundColor).multiplyScalar(k*S),r.hemi[x]=j,x++}}v>0&&(e.isWebGL2?a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):a.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=_;let N=r.hash;(N.directionalLength!==b||N.pointLength!==m||N.spotLength!==g||N.rectAreaLength!==v||N.hemiLength!==x||N.numDirectionalShadows!==M||N.numPointShadows!==w||N.numSpotShadows!==T||N.numSpotMaps!==A||N.numLightProbes!==y)&&(r.directional.length=b,r.spot.length=g,r.rectArea.length=v,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=T+A-C,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=C,r.numLightProbes=y,N.directionalLength=b,N.pointLength=m,N.spotLength=g,N.rectAreaLength=v,N.hemiLength=x,N.numDirectionalShadows=M,N.numPointShadows=w,N.numSpotShadows=T,N.numSpotMaps=A,N.numLightProbes=y,r.version=aM++)}function h(c,f){let d=0,p=0,_=0,b=0,m=0,g=f.matrixWorldInverse;for(let v=0,x=c.length;v<x;v++){let M=c[v];if(M.isDirectionalLight){let w=r.directional[d];w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),d++}else if(M.isSpotLight){let w=r.spot[_];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),_++}else if(M.isRectAreaLight){let w=r.rectArea[b];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),l.identity(),o.copy(M.matrixWorld),o.premultiply(g),l.extractRotation(o),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(l),w.halfHeight.applyMatrix4(l),b++}else if(M.isPointLight){let w=r.point[p];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(g),p++}else if(M.isHemisphereLight){let w=r.hemi[m];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:u,setupView:h,state:r}}function hp(a,e){let n=new cM(a,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function l(f){r.push(f)}function u(f){n.setup(i,f)}function h(f){n.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:u,setupLightsView:h,pushLight:o,pushShadow:l}}function lM(a,e){let n=new WeakMap;function i(s,o=0){let l=n.get(s),u;return l===void 0?(u=new hp(a,e),n.set(s,[u])):o>=l.length?(u=new hp(a,e),l.push(u)):u=l[o],u}function r(){n=new WeakMap}return{get:i,dispose:r}}var _u=class extends In{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},bu=class extends In{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},uM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hM=`uniform sampler2D shadow_pass;
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
}`;function fM(a,e,n){let i=new Ia,r=new me,s=new me,o=new rt,l=new _u({depthPacking:n0}),u=new bu,h={},c=n.maxTextureSize,f={[oi]:$t,[$t]:oi,[_n]:_n},d=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:uM,fragmentShader:hM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let _=new It;_.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new qe(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dp;let g=this.type;this.render=function(T,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let y=a.getRenderTarget(),S=a.getActiveCubeFace(),N=a.getActiveMipmapLevel(),F=a.state;F.setBlending(ai),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=g!==Ri&&this.type===Ri,I=g===Ri&&this.type!==Ri;for(let U=0,k=T.length;U<k;U++){let Y=T[U],K=Y.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);let j=K.getFrameExtents();if(r.multiply(j),s.copy(K.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/j.x),r.x=s.x*j.x,K.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/j.y),r.y=s.y*j.y,K.mapSize.y=s.y)),K.map===null||V===!0||I===!0){let Q=this.type!==Ri?{minFilter:Dt,magFilter:Dt}:{};K.map!==null&&K.map.dispose(),K.map=new Yt(r.x,r.y,Q),K.map.texture.name=Y.name+".shadowMap",K.camera.updateProjectionMatrix()}a.setRenderTarget(K.map),a.clear();let J=K.getViewportCount();for(let Q=0;Q<J;Q++){let re=K.getViewport(Q);o.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),F.viewport(o),K.updateMatrices(Y,Q),i=K.getFrustum(),M(A,C,K.camera,Y,this.type)}K.isPointLightShadow!==!0&&this.type===Ri&&v(K,C),K.needsUpdate=!1}g=this.type,m.needsUpdate=!1,a.setRenderTarget(y,S,N)};function v(T,A){let C=e.update(b);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Yt(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,a.setRenderTarget(T.mapPass),a.clear(),a.renderBufferDirect(A,null,C,d,b,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,a.setRenderTarget(T.map),a.clear(),a.renderBufferDirect(A,null,C,p,b,null)}function x(T,A,C,y){let S=null,N=C.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)S=N;else if(S=C.isPointLight===!0?u:l,a.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let F=S.uuid,V=A.uuid,I=h[F];I===void 0&&(I={},h[F]=I);let U=I[V];U===void 0&&(U=S.clone(),I[V]=U,A.addEventListener("dispose",w)),S=U}if(S.visible=A.visible,S.wireframe=A.wireframe,y===Ri?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:f[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let F=a.properties.get(S);F.light=C}return S}function M(T,A,C,y,S){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===Ri)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,T.matrixWorld);let V=e.update(T),I=T.material;if(Array.isArray(I)){let U=V.groups;for(let k=0,Y=U.length;k<Y;k++){let K=U[k],j=I[K.materialIndex];if(j&&j.visible){let J=x(T,j,y,S);T.onBeforeShadow(a,T,A,C,V,J,K),a.renderBufferDirect(C,null,V,J,T,K),T.onAfterShadow(a,T,A,C,V,J,K)}}}else if(I.visible){let U=x(T,I,y,S);T.onBeforeShadow(a,T,A,C,V,U,null),a.renderBufferDirect(C,null,V,U,T,null),T.onAfterShadow(a,T,A,C,V,U,null)}}let F=T.children;for(let V=0,I=F.length;V<I;V++)M(F[V],A,C,y,S)}function w(T){T.target.removeEventListener("dispose",w);for(let C in h){let y=h[C],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}function dM(a,e,n){let i=n.isWebGL2;function r(){let O=!1,le=new rt,ue=null,Re=new rt(0,0,0,0);return{setMask:function(Se){ue!==Se&&!O&&(a.colorMask(Se,Se,Se,Se),ue=Se)},setLocked:function(Se){O=Se},setClear:function(Se,ot,ct,kt,on){on===!0&&(Se*=kt,ot*=kt,ct*=kt),le.set(Se,ot,ct,kt),Re.equals(le)===!1&&(a.clearColor(Se,ot,ct,kt),Re.copy(le))},reset:function(){O=!1,ue=null,Re.set(-1,0,0,0)}}}function s(){let O=!1,le=null,ue=null,Re=null;return{setTest:function(Se){Se?Ne(a.DEPTH_TEST):Ee(a.DEPTH_TEST)},setMask:function(Se){le!==Se&&!O&&(a.depthMask(Se),le=Se)},setFunc:function(Se){if(ue!==Se){switch(Se){case D_:a.depthFunc(a.NEVER);break;case O_:a.depthFunc(a.ALWAYS);break;case N_:a.depthFunc(a.LESS);break;case Yo:a.depthFunc(a.LEQUAL);break;case U_:a.depthFunc(a.EQUAL);break;case F_:a.depthFunc(a.GEQUAL);break;case k_:a.depthFunc(a.GREATER);break;case B_:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}ue=Se}},setLocked:function(Se){O=Se},setClear:function(Se){Re!==Se&&(a.clearDepth(Se),Re=Se)},reset:function(){O=!1,le=null,ue=null,Re=null}}}function o(){let O=!1,le=null,ue=null,Re=null,Se=null,ot=null,ct=null,kt=null,on=null;return{setTest:function(lt){O||(lt?Ne(a.STENCIL_TEST):Ee(a.STENCIL_TEST))},setMask:function(lt){le!==lt&&!O&&(a.stencilMask(lt),le=lt)},setFunc:function(lt,cn,ii){(ue!==lt||Re!==cn||Se!==ii)&&(a.stencilFunc(lt,cn,ii),ue=lt,Re=cn,Se=ii)},setOp:function(lt,cn,ii){(ot!==lt||ct!==cn||kt!==ii)&&(a.stencilOp(lt,cn,ii),ot=lt,ct=cn,kt=ii)},setLocked:function(lt){O=lt},setClear:function(lt){on!==lt&&(a.clearStencil(lt),on=lt)},reset:function(){O=!1,le=null,ue=null,Re=null,Se=null,ot=null,ct=null,kt=null,on=null}}}let l=new r,u=new s,h=new o,c=new WeakMap,f=new WeakMap,d={},p={},_=new WeakMap,b=[],m=null,g=!1,v=null,x=null,M=null,w=null,T=null,A=null,C=null,y=new oe(0,0,0),S=0,N=!1,F=null,V=null,I=null,U=null,k=null,Y=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,j=0,J=a.getParameter(a.VERSION);J.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(J)[1]),K=j>=1):J.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),K=j>=2);let Q=null,re={},X=a.getParameter(a.SCISSOR_BOX),Z=a.getParameter(a.VIEWPORT),ce=new rt().fromArray(X),ve=new rt().fromArray(Z);function xe(O,le,ue,Re){let Se=new Uint8Array(4),ot=a.createTexture();a.bindTexture(O,ot),a.texParameteri(O,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(O,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let ct=0;ct<ue;ct++)i&&(O===a.TEXTURE_3D||O===a.TEXTURE_2D_ARRAY)?a.texImage3D(le,0,a.RGBA,1,1,Re,0,a.RGBA,a.UNSIGNED_BYTE,Se):a.texImage2D(le+ct,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Se);return ot}let De={};De[a.TEXTURE_2D]=xe(a.TEXTURE_2D,a.TEXTURE_2D,1),De[a.TEXTURE_CUBE_MAP]=xe(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(De[a.TEXTURE_2D_ARRAY]=xe(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),De[a.TEXTURE_3D]=xe(a.TEXTURE_3D,a.TEXTURE_3D,1,1)),l.setClear(0,0,0,1),u.setClear(1),h.setClear(0),Ne(a.DEPTH_TEST),u.setFunc(Yo),ke(!1),P(Kf),Ne(a.CULL_FACE),ge(ai);function Ne(O){d[O]!==!0&&(a.enable(O),d[O]=!0)}function Ee(O){d[O]!==!1&&(a.disable(O),d[O]=!1)}function Ke(O,le){return p[O]!==le?(a.bindFramebuffer(O,le),p[O]=le,i&&(O===a.DRAW_FRAMEBUFFER&&(p[a.FRAMEBUFFER]=le),O===a.FRAMEBUFFER&&(p[a.DRAW_FRAMEBUFFER]=le)),!0):!1}function z(O,le){let ue=b,Re=!1;if(O)if(ue=_.get(le),ue===void 0&&(ue=[],_.set(le,ue)),O.isWebGLMultipleRenderTargets){let Se=O.texture;if(ue.length!==Se.length||ue[0]!==a.COLOR_ATTACHMENT0){for(let ot=0,ct=Se.length;ot<ct;ot++)ue[ot]=a.COLOR_ATTACHMENT0+ot;ue.length=Se.length,Re=!0}}else ue[0]!==a.COLOR_ATTACHMENT0&&(ue[0]=a.COLOR_ATTACHMENT0,Re=!0);else ue[0]!==a.BACK&&(ue[0]=a.BACK,Re=!0);Re&&(n.isWebGL2?a.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function an(O){return m!==O?(a.useProgram(O),m=O,!0):!1}let Me={[Cr]:a.FUNC_ADD,[b_]:a.FUNC_SUBTRACT,[x_]:a.FUNC_REVERSE_SUBTRACT};if(i)Me[Qf]=a.MIN,Me[$f]=a.MAX;else{let O=e.get("EXT_blend_minmax");O!==null&&(Me[Qf]=O.MIN_EXT,Me[$f]=O.MAX_EXT)}let Le={[v_]:a.ZERO,[y_]:a.ONE,[M_]:a.SRC_COLOR,[tu]:a.SRC_ALPHA,[R_]:a.SRC_ALPHA_SATURATE,[A_]:a.DST_COLOR,[T_]:a.DST_ALPHA,[S_]:a.ONE_MINUS_SRC_COLOR,[nu]:a.ONE_MINUS_SRC_ALPHA,[E_]:a.ONE_MINUS_DST_COLOR,[w_]:a.ONE_MINUS_DST_ALPHA,[C_]:a.CONSTANT_COLOR,[P_]:a.ONE_MINUS_CONSTANT_COLOR,[L_]:a.CONSTANT_ALPHA,[I_]:a.ONE_MINUS_CONSTANT_ALPHA};function ge(O,le,ue,Re,Se,ot,ct,kt,on,lt){if(O===ai){g===!0&&(Ee(a.BLEND),g=!1);return}if(g===!1&&(Ne(a.BLEND),g=!0),O!==__){if(O!==v||lt!==N){if((x!==Cr||T!==Cr)&&(a.blendEquation(a.FUNC_ADD),x=Cr,T=Cr),lt)switch(O){case Cs:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Or:a.blendFunc(a.ONE,a.ONE);break;case Jf:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Zf:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Cs:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Or:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case Jf:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Zf:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,w=null,A=null,C=null,y.set(0,0,0),S=0,v=O,N=lt}return}Se=Se||le,ot=ot||ue,ct=ct||Re,(le!==x||Se!==T)&&(a.blendEquationSeparate(Me[le],Me[Se]),x=le,T=Se),(ue!==M||Re!==w||ot!==A||ct!==C)&&(a.blendFuncSeparate(Le[ue],Le[Re],Le[ot],Le[ct]),M=ue,w=Re,A=ot,C=ct),(kt.equals(y)===!1||on!==S)&&(a.blendColor(kt.r,kt.g,kt.b,on),y.copy(kt),S=on),v=O,N=!1}function pt(O,le){O.side===_n?Ee(a.CULL_FACE):Ne(a.CULL_FACE);let ue=O.side===$t;le&&(ue=!ue),ke(ue),O.blending===Cs&&O.transparent===!1?ge(ai):ge(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),u.setFunc(O.depthFunc),u.setTest(O.depthTest),u.setMask(O.depthWrite),l.setMask(O.colorWrite);let Re=O.stencilWrite;h.setTest(Re),Re&&(h.setMask(O.stencilWriteMask),h.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),h.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),H(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Ne(a.SAMPLE_ALPHA_TO_COVERAGE):Ee(a.SAMPLE_ALPHA_TO_COVERAGE)}function ke(O){F!==O&&(O?a.frontFace(a.CW):a.frontFace(a.CCW),F=O)}function P(O){O!==m_?(Ne(a.CULL_FACE),O!==V&&(O===Kf?a.cullFace(a.BACK):O===g_?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Ee(a.CULL_FACE),V=O}function E(O){O!==I&&(K&&a.lineWidth(O),I=O)}function H(O,le,ue){O?(Ne(a.POLYGON_OFFSET_FILL),(U!==le||k!==ue)&&(a.polygonOffset(le,ue),U=le,k=ue)):Ee(a.POLYGON_OFFSET_FILL)}function ne(O){O?Ne(a.SCISSOR_TEST):Ee(a.SCISSOR_TEST)}function te(O){O===void 0&&(O=a.TEXTURE0+Y-1),Q!==O&&(a.activeTexture(O),Q=O)}function ie(O,le,ue){ue===void 0&&(Q===null?ue=a.TEXTURE0+Y-1:ue=Q);let Re=re[ue];Re===void 0&&(Re={type:void 0,texture:void 0},re[ue]=Re),(Re.type!==O||Re.texture!==le)&&(Q!==ue&&(a.activeTexture(ue),Q=ue),a.bindTexture(O,le||De[O]),Re.type=O,Re.texture=le)}function _e(){let O=re[Q];O!==void 0&&O.type!==void 0&&(a.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function he(){try{a.compressedTexImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{a.compressedTexImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function we(){try{a.texSubImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Be(){try{a.texSubImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $e(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xe(){try{a.texStorage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pe(){try{a.texStorage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{a.texImage2D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pe(){try{a.texImage3D.apply(a,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ue(O){ce.equals(O)===!1&&(a.scissor(O.x,O.y,O.z,O.w),ce.copy(O))}function Qe(O){ve.equals(O)===!1&&(a.viewport(O.x,O.y,O.z,O.w),ve.copy(O))}function vt(O,le){let ue=f.get(le);ue===void 0&&(ue=new WeakMap,f.set(le,ue));let Re=ue.get(O);Re===void 0&&(Re=a.getUniformBlockIndex(le,O.name),ue.set(O,Re))}function Ge(O,le){let Re=f.get(le).get(O);c.get(le)!==Re&&(a.uniformBlockBinding(le,Re,O.__bindingPointIndex),c.set(le,Re))}function se(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),i===!0&&(a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null)),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),d={},Q=null,re={},p={},_=new WeakMap,b=[],m=null,g=!1,v=null,x=null,M=null,w=null,T=null,A=null,C=null,y=new oe(0,0,0),S=0,N=!1,F=null,V=null,I=null,U=null,k=null,ce.set(0,0,a.canvas.width,a.canvas.height),ve.set(0,0,a.canvas.width,a.canvas.height),l.reset(),u.reset(),h.reset()}return{buffers:{color:l,depth:u,stencil:h},enable:Ne,disable:Ee,bindFramebuffer:Ke,drawBuffers:z,useProgram:an,setBlending:ge,setMaterial:pt,setFlipSided:ke,setCullFace:P,setLineWidth:E,setPolygonOffset:H,setScissorTest:ne,activeTexture:te,bindTexture:ie,unbindTexture:_e,compressedTexImage2D:he,compressedTexImage3D:de,texImage2D:ye,texImage3D:pe,updateUBOMapping:vt,uniformBlockBinding:Ge,texStorage2D:Xe,texStorage3D:Pe,texSubImage2D:we,texSubImage3D:Be,compressedTexSubImage2D:ee,compressedTexSubImage3D:$e,scissor:Ue,viewport:Qe,reset:se}}function pM(a,e,n,i,r,s,o){let l=r.isWebGL2,u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new WeakMap,f,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,E){return p?new OffscreenCanvas(P,E):Pa("canvas")}function b(P,E,H,ne){let te=1;if((P.width>ne||P.height>ne)&&(te=ne/Math.max(P.width,P.height)),te<1||E===!0)if(typeof HTMLImageElement!="undefined"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&P instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&P instanceof ImageBitmap){let ie=E?ec:Math.floor,_e=ie(te*P.width),he=ie(te*P.height);f===void 0&&(f=_(_e,he));let de=H?_(_e,he):f;return de.width=_e,de.height=he,de.getContext("2d").drawImage(P,0,0,_e,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+_e+"x"+he+")."),de}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function m(P){return au(P.width)&&au(P.height)}function g(P){return l?!1:P.wrapS!==hn||P.wrapT!==hn||P.minFilter!==Dt&&P.minFilter!==wt}function v(P,E){return P.generateMipmaps&&E&&P.minFilter!==Dt&&P.minFilter!==wt}function x(P){a.generateMipmap(P)}function M(P,E,H,ne,te=!1){if(l===!1)return E;if(P!==null){if(a[P]!==void 0)return a[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ie=E;if(E===a.RED&&(H===a.FLOAT&&(ie=a.R32F),H===a.HALF_FLOAT&&(ie=a.R16F),H===a.UNSIGNED_BYTE&&(ie=a.R8)),E===a.RED_INTEGER&&(H===a.UNSIGNED_BYTE&&(ie=a.R8UI),H===a.UNSIGNED_SHORT&&(ie=a.R16UI),H===a.UNSIGNED_INT&&(ie=a.R32UI),H===a.BYTE&&(ie=a.R8I),H===a.SHORT&&(ie=a.R16I),H===a.INT&&(ie=a.R32I)),E===a.RG&&(H===a.FLOAT&&(ie=a.RG32F),H===a.HALF_FLOAT&&(ie=a.RG16F),H===a.UNSIGNED_BYTE&&(ie=a.RG8)),E===a.RGBA){let _e=te?Jo:Je.getTransfer(ne);H===a.FLOAT&&(ie=a.RGBA32F),H===a.HALF_FLOAT&&(ie=a.RGBA16F),H===a.UNSIGNED_BYTE&&(ie=_e===tt?a.SRGB8_ALPHA8:a.RGBA8),H===a.UNSIGNED_SHORT_4_4_4_4&&(ie=a.RGBA4),H===a.UNSIGNED_SHORT_5_5_5_1&&(ie=a.RGB5_A1)}return(ie===a.R16F||ie===a.R32F||ie===a.RG16F||ie===a.RG32F||ie===a.RGBA16F||ie===a.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function w(P,E,H){return v(P,H)===!0||P.isFramebufferTexture&&P.minFilter!==Dt&&P.minFilter!==wt?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function T(P){return P===Dt||P===jo||P===Sa?a.NEAREST:a.LINEAR}function A(P){let E=P.target;E.removeEventListener("dispose",A),y(E),E.isVideoTexture&&c.delete(E)}function C(P){let E=P.target;E.removeEventListener("dispose",C),N(E)}function y(P){let E=i.get(P);if(E.__webglInit===void 0)return;let H=P.source,ne=d.get(H);if(ne){let te=ne[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(P),Object.keys(ne).length===0&&d.delete(H)}i.remove(P)}function S(P){let E=i.get(P);a.deleteTexture(E.__webglTexture);let H=P.source,ne=d.get(H);delete ne[E.__cacheKey],o.memory.textures--}function N(P){let E=P.texture,H=i.get(P),ne=i.get(E);if(ne.__webglTexture!==void 0&&(a.deleteTexture(ne.__webglTexture),o.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(H.__webglFramebuffer[te]))for(let ie=0;ie<H.__webglFramebuffer[te].length;ie++)a.deleteFramebuffer(H.__webglFramebuffer[te][ie]);else a.deleteFramebuffer(H.__webglFramebuffer[te]);H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer[te])}else{if(Array.isArray(H.__webglFramebuffer))for(let te=0;te<H.__webglFramebuffer.length;te++)a.deleteFramebuffer(H.__webglFramebuffer[te]);else a.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&a.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&a.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let te=0;te<H.__webglColorRenderbuffer.length;te++)H.__webglColorRenderbuffer[te]&&a.deleteRenderbuffer(H.__webglColorRenderbuffer[te]);H.__webglDepthRenderbuffer&&a.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let te=0,ie=E.length;te<ie;te++){let _e=i.get(E[te]);_e.__webglTexture&&(a.deleteTexture(_e.__webglTexture),o.memory.textures--),i.remove(E[te])}i.remove(E),i.remove(P)}let F=0;function V(){F=0}function I(){let P=F;return P>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),F+=1,P}function U(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function k(P,E){let H=i.get(P);if(P.isVideoTexture&&pt(P),P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){let ne=P.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(H,P,E);return}}n.bindTexture(a.TEXTURE_2D,H.__webglTexture,a.TEXTURE0+E)}function Y(P,E){let H=i.get(P);if(P.version>0&&H.__version!==P.version){ce(H,P,E);return}n.bindTexture(a.TEXTURE_2D_ARRAY,H.__webglTexture,a.TEXTURE0+E)}function K(P,E){let H=i.get(P);if(P.version>0&&H.__version!==P.version){ce(H,P,E);return}n.bindTexture(a.TEXTURE_3D,H.__webglTexture,a.TEXTURE0+E)}function j(P,E){let H=i.get(P);if(P.version>0&&H.__version!==P.version){ve(H,P,E);return}n.bindTexture(a.TEXTURE_CUBE_MAP,H.__webglTexture,a.TEXTURE0+E)}let J={[Ii]:a.REPEAT,[hn]:a.CLAMP_TO_EDGE,[Ca]:a.MIRRORED_REPEAT},Q={[Dt]:a.NEAREST,[jo]:a.NEAREST_MIPMAP_NEAREST,[Sa]:a.NEAREST_MIPMAP_LINEAR,[wt]:a.LINEAR,[Vu]:a.LINEAR_MIPMAP_NEAREST,[Di]:a.LINEAR_MIPMAP_LINEAR},re={[r0]:a.NEVER,[u0]:a.ALWAYS,[s0]:a.LESS,[qp]:a.LEQUAL,[a0]:a.EQUAL,[l0]:a.GEQUAL,[o0]:a.GREATER,[c0]:a.NOTEQUAL};function X(P,E,H){if(H?(a.texParameteri(P,a.TEXTURE_WRAP_S,J[E.wrapS]),a.texParameteri(P,a.TEXTURE_WRAP_T,J[E.wrapT]),(P===a.TEXTURE_3D||P===a.TEXTURE_2D_ARRAY)&&a.texParameteri(P,a.TEXTURE_WRAP_R,J[E.wrapR]),a.texParameteri(P,a.TEXTURE_MAG_FILTER,Q[E.magFilter]),a.texParameteri(P,a.TEXTURE_MIN_FILTER,Q[E.minFilter])):(a.texParameteri(P,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(P,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),(P===a.TEXTURE_3D||P===a.TEXTURE_2D_ARRAY)&&a.texParameteri(P,a.TEXTURE_WRAP_R,a.CLAMP_TO_EDGE),(E.wrapS!==hn||E.wrapT!==hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),a.texParameteri(P,a.TEXTURE_MAG_FILTER,T(E.magFilter)),a.texParameteri(P,a.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==Dt&&E.minFilter!==wt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(a.texParameteri(P,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(P,a.TEXTURE_COMPARE_FUNC,re[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let ne=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===Dt||E.minFilter!==Sa&&E.minFilter!==Di||E.type===Cn&&e.has("OES_texture_float_linear")===!1||l===!1&&E.type===Gt&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(a.texParameterf(P,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function Z(P,E){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",A));let ne=E.source,te=d.get(ne);te===void 0&&(te={},d.set(ne,te));let ie=U(E);if(ie!==P.__cacheKey){te[ie]===void 0&&(te[ie]={texture:a.createTexture(),usedTimes:0},o.memory.textures++,H=!0),te[ie].usedTimes++;let _e=te[P.__cacheKey];_e!==void 0&&(te[P.__cacheKey].usedTimes--,_e.usedTimes===0&&S(E)),P.__cacheKey=ie,P.__webglTexture=te[ie].texture}return H}function ce(P,E,H){let ne=a.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ne=a.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ne=a.TEXTURE_3D);let te=Z(P,E),ie=E.source;n.bindTexture(ne,P.__webglTexture,a.TEXTURE0+H);let _e=i.get(ie);if(ie.version!==_e.__version||te===!0){n.activeTexture(a.TEXTURE0+H);let he=Je.getPrimaries(Je.workingColorSpace),de=E.colorSpace===Gn?null:Je.getPrimaries(E.colorSpace),we=E.colorSpace===Gn||he===de?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let Be=g(E)&&m(E.image)===!1,ee=b(E.image,Be,!1,r.maxTextureSize);ee=ke(E,ee);let $e=m(ee)||l,Xe=s.convert(E.format,E.colorSpace),Pe=s.convert(E.type),ye=M(E.internalFormat,Xe,Pe,E.colorSpace,E.isVideoTexture);X(ne,E,$e);let pe,Ue=E.mipmaps,Qe=l&&E.isVideoTexture!==!0&&ye!==Hp,vt=_e.__version===void 0||te===!0,Ge=w(E,ee,$e);if(E.isDepthTexture)ye=a.DEPTH_COMPONENT,l?E.type===Cn?ye=a.DEPTH_COMPONENT32F:E.type===$i?ye=a.DEPTH_COMPONENT24:E.type===Lr?ye=a.DEPTH24_STENCIL8:ye=a.DEPTH_COMPONENT16:E.type===Cn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Ir&&ye===a.DEPTH_COMPONENT&&E.type!==Wu&&E.type!==$i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=$i,Pe=s.convert(E.type)),E.format===Os&&ye===a.DEPTH_COMPONENT&&(ye=a.DEPTH_STENCIL,E.type!==Lr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Lr,Pe=s.convert(E.type))),vt&&(Qe?n.texStorage2D(a.TEXTURE_2D,1,ye,ee.width,ee.height):n.texImage2D(a.TEXTURE_2D,0,ye,ee.width,ee.height,0,Xe,Pe,null));else if(E.isDataTexture)if(Ue.length>0&&$e){Qe&&vt&&n.texStorage2D(a.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let se=0,O=Ue.length;se<O;se++)pe=Ue[se],Qe?n.texSubImage2D(a.TEXTURE_2D,se,0,0,pe.width,pe.height,Xe,Pe,pe.data):n.texImage2D(a.TEXTURE_2D,se,ye,pe.width,pe.height,0,Xe,Pe,pe.data);E.generateMipmaps=!1}else Qe?(vt&&n.texStorage2D(a.TEXTURE_2D,Ge,ye,ee.width,ee.height),n.texSubImage2D(a.TEXTURE_2D,0,0,0,ee.width,ee.height,Xe,Pe,ee.data)):n.texImage2D(a.TEXTURE_2D,0,ye,ee.width,ee.height,0,Xe,Pe,ee.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Qe&&vt&&n.texStorage3D(a.TEXTURE_2D_ARRAY,Ge,ye,Ue[0].width,Ue[0].height,ee.depth);for(let se=0,O=Ue.length;se<O;se++)pe=Ue[se],E.format!==zn?Xe!==null?Qe?n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,ee.depth,Xe,pe.data,0,0):n.compressedTexImage3D(a.TEXTURE_2D_ARRAY,se,ye,pe.width,pe.height,ee.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?n.texSubImage3D(a.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,ee.depth,Xe,Pe,pe.data):n.texImage3D(a.TEXTURE_2D_ARRAY,se,ye,pe.width,pe.height,ee.depth,0,Xe,Pe,pe.data)}else{Qe&&vt&&n.texStorage2D(a.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let se=0,O=Ue.length;se<O;se++)pe=Ue[se],E.format!==zn?Xe!==null?Qe?n.compressedTexSubImage2D(a.TEXTURE_2D,se,0,0,pe.width,pe.height,Xe,pe.data):n.compressedTexImage2D(a.TEXTURE_2D,se,ye,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?n.texSubImage2D(a.TEXTURE_2D,se,0,0,pe.width,pe.height,Xe,Pe,pe.data):n.texImage2D(a.TEXTURE_2D,se,ye,pe.width,pe.height,0,Xe,Pe,pe.data)}else if(E.isDataArrayTexture)Qe?(vt&&n.texStorage3D(a.TEXTURE_2D_ARRAY,Ge,ye,ee.width,ee.height,ee.depth),n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,Xe,Pe,ee.data)):n.texImage3D(a.TEXTURE_2D_ARRAY,0,ye,ee.width,ee.height,ee.depth,0,Xe,Pe,ee.data);else if(E.isData3DTexture)Qe?(vt&&n.texStorage3D(a.TEXTURE_3D,Ge,ye,ee.width,ee.height,ee.depth),n.texSubImage3D(a.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,Xe,Pe,ee.data)):n.texImage3D(a.TEXTURE_3D,0,ye,ee.width,ee.height,ee.depth,0,Xe,Pe,ee.data);else if(E.isFramebufferTexture){if(vt)if(Qe)n.texStorage2D(a.TEXTURE_2D,Ge,ye,ee.width,ee.height);else{let se=ee.width,O=ee.height;for(let le=0;le<Ge;le++)n.texImage2D(a.TEXTURE_2D,le,ye,se,O,0,Xe,Pe,null),se>>=1,O>>=1}}else if(Ue.length>0&&$e){Qe&&vt&&n.texStorage2D(a.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let se=0,O=Ue.length;se<O;se++)pe=Ue[se],Qe?n.texSubImage2D(a.TEXTURE_2D,se,0,0,Xe,Pe,pe):n.texImage2D(a.TEXTURE_2D,se,ye,Xe,Pe,pe);E.generateMipmaps=!1}else Qe?(vt&&n.texStorage2D(a.TEXTURE_2D,Ge,ye,ee.width,ee.height),n.texSubImage2D(a.TEXTURE_2D,0,0,0,Xe,Pe,ee)):n.texImage2D(a.TEXTURE_2D,0,ye,Xe,Pe,ee);v(E,$e)&&x(ne),_e.__version=ie.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function ve(P,E,H){if(E.image.length!==6)return;let ne=Z(P,E),te=E.source;n.bindTexture(a.TEXTURE_CUBE_MAP,P.__webglTexture,a.TEXTURE0+H);let ie=i.get(te);if(te.version!==ie.__version||ne===!0){n.activeTexture(a.TEXTURE0+H);let _e=Je.getPrimaries(Je.workingColorSpace),he=E.colorSpace===Gn?null:Je.getPrimaries(E.colorSpace),de=E.colorSpace===Gn||_e===he?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);let we=E.isCompressedTexture||E.image[0].isCompressedTexture,Be=E.image[0]&&E.image[0].isDataTexture,ee=[];for(let se=0;se<6;se++)!we&&!Be?ee[se]=b(E.image[se],!1,!0,r.maxCubemapSize):ee[se]=Be?E.image[se].image:E.image[se],ee[se]=ke(E,ee[se]);let $e=ee[0],Xe=m($e)||l,Pe=s.convert(E.format,E.colorSpace),ye=s.convert(E.type),pe=M(E.internalFormat,Pe,ye,E.colorSpace),Ue=l&&E.isVideoTexture!==!0,Qe=ie.__version===void 0||ne===!0,vt=w(E,$e,Xe);X(a.TEXTURE_CUBE_MAP,E,Xe);let Ge;if(we){Ue&&Qe&&n.texStorage2D(a.TEXTURE_CUBE_MAP,vt,pe,$e.width,$e.height);for(let se=0;se<6;se++){Ge=ee[se].mipmaps;for(let O=0;O<Ge.length;O++){let le=Ge[O];E.format!==zn?Pe!==null?Ue?n.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O,0,0,le.width,le.height,Pe,le.data):n.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O,pe,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O,0,0,le.width,le.height,Pe,ye,le.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O,pe,le.width,le.height,0,Pe,ye,le.data)}}}else{Ge=E.mipmaps,Ue&&Qe&&(Ge.length>0&&vt++,n.texStorage2D(a.TEXTURE_CUBE_MAP,vt,pe,ee[0].width,ee[0].height));for(let se=0;se<6;se++)if(Be){Ue?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ee[se].width,ee[se].height,Pe,ye,ee[se].data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,pe,ee[se].width,ee[se].height,0,Pe,ye,ee[se].data);for(let O=0;O<Ge.length;O++){let ue=Ge[O].image[se].image;Ue?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O+1,0,0,ue.width,ue.height,Pe,ye,ue.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O+1,pe,ue.width,ue.height,0,Pe,ye,ue.data)}}else{Ue?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Pe,ye,ee[se]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,pe,Pe,ye,ee[se]);for(let O=0;O<Ge.length;O++){let le=Ge[O];Ue?n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O+1,0,0,Pe,ye,le.image[se]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+se,O+1,pe,Pe,ye,le.image[se])}}}v(E,Xe)&&x(a.TEXTURE_CUBE_MAP),ie.__version=te.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function xe(P,E,H,ne,te,ie){let _e=s.convert(H.format,H.colorSpace),he=s.convert(H.type),de=M(H.internalFormat,_e,he,H.colorSpace);if(!i.get(E).__hasExternalTextures){let Be=Math.max(1,E.width>>ie),ee=Math.max(1,E.height>>ie);te===a.TEXTURE_3D||te===a.TEXTURE_2D_ARRAY?n.texImage3D(te,ie,de,Be,ee,E.depth,0,_e,he,null):n.texImage2D(te,ie,de,Be,ee,0,_e,he,null)}n.bindFramebuffer(a.FRAMEBUFFER,P),ge(E)?u.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ne,te,i.get(H).__webglTexture,0,Le(E)):(te===a.TEXTURE_2D||te>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,ne,te,i.get(H).__webglTexture,ie),n.bindFramebuffer(a.FRAMEBUFFER,null)}function De(P,E,H){if(a.bindRenderbuffer(a.RENDERBUFFER,P),E.depthBuffer&&!E.stencilBuffer){let ne=l===!0?a.DEPTH_COMPONENT24:a.DEPTH_COMPONENT16;if(H||ge(E)){let te=E.depthTexture;te&&te.isDepthTexture&&(te.type===Cn?ne=a.DEPTH_COMPONENT32F:te.type===$i&&(ne=a.DEPTH_COMPONENT24));let ie=Le(E);ge(E)?u.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ie,ne,E.width,E.height):a.renderbufferStorageMultisample(a.RENDERBUFFER,ie,ne,E.width,E.height)}else a.renderbufferStorage(a.RENDERBUFFER,ne,E.width,E.height);a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,P)}else if(E.depthBuffer&&E.stencilBuffer){let ne=Le(E);H&&ge(E)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,ne,a.DEPTH24_STENCIL8,E.width,E.height):ge(E)?u.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ne,a.DEPTH24_STENCIL8,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_STENCIL,E.width,E.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,P)}else{let ne=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let te=0;te<ne.length;te++){let ie=ne[te],_e=s.convert(ie.format,ie.colorSpace),he=s.convert(ie.type),de=M(ie.internalFormat,_e,he,ie.colorSpace),we=Le(E);H&&ge(E)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,we,de,E.width,E.height):ge(E)?u.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,we,de,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,de,E.width,E.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Ne(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(a.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),k(E.depthTexture,0);let ne=i.get(E.depthTexture).__webglTexture,te=Le(E);if(E.depthTexture.format===Ir)ge(E)?u.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,ne,0,te):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,ne,0);else if(E.depthTexture.format===Os)ge(E)?u.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,ne,0,te):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ee(P){let E=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Ne(E.__webglFramebuffer,P)}else if(H){E.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer[ne]),E.__webglDepthbuffer[ne]=a.createRenderbuffer(),De(E.__webglDepthbuffer[ne],P,!1)}else n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=a.createRenderbuffer(),De(E.__webglDepthbuffer,P,!1);n.bindFramebuffer(a.FRAMEBUFFER,null)}function Ke(P,E,H){let ne=i.get(P);E!==void 0&&xe(ne.__webglFramebuffer,P,P.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),H!==void 0&&Ee(P)}function z(P){let E=P.texture,H=i.get(P),ne=i.get(E);P.addEventListener("dispose",C),P.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=a.createTexture()),ne.__version=E.version,o.memory.textures++);let te=P.isWebGLCubeRenderTarget===!0,ie=P.isWebGLMultipleRenderTargets===!0,_e=m(P)||l;if(te){H.__webglFramebuffer=[];for(let he=0;he<6;he++)if(l&&E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[he]=[];for(let de=0;de<E.mipmaps.length;de++)H.__webglFramebuffer[he][de]=a.createFramebuffer()}else H.__webglFramebuffer[he]=a.createFramebuffer()}else{if(l&&E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let he=0;he<E.mipmaps.length;he++)H.__webglFramebuffer[he]=a.createFramebuffer()}else H.__webglFramebuffer=a.createFramebuffer();if(ie)if(r.drawBuffers){let he=P.texture;for(let de=0,we=he.length;de<we;de++){let Be=i.get(he[de]);Be.__webglTexture===void 0&&(Be.__webglTexture=a.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(l&&P.samples>0&&ge(P)===!1){let he=ie?E:[E];H.__webglMultisampledFramebuffer=a.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(a.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let de=0;de<he.length;de++){let we=he[de];H.__webglColorRenderbuffer[de]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,H.__webglColorRenderbuffer[de]);let Be=s.convert(we.format,we.colorSpace),ee=s.convert(we.type),$e=M(we.internalFormat,Be,ee,we.colorSpace,P.isXRRenderTarget===!0),Xe=Le(P);a.renderbufferStorageMultisample(a.RENDERBUFFER,Xe,$e,P.width,P.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+de,a.RENDERBUFFER,H.__webglColorRenderbuffer[de])}a.bindRenderbuffer(a.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=a.createRenderbuffer(),De(H.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(a.FRAMEBUFFER,null)}}if(te){n.bindTexture(a.TEXTURE_CUBE_MAP,ne.__webglTexture),X(a.TEXTURE_CUBE_MAP,E,_e);for(let he=0;he<6;he++)if(l&&E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)xe(H.__webglFramebuffer[he][de],P,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+he,de);else xe(H.__webglFramebuffer[he],P,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);v(E,_e)&&x(a.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ie){let he=P.texture;for(let de=0,we=he.length;de<we;de++){let Be=he[de],ee=i.get(Be);n.bindTexture(a.TEXTURE_2D,ee.__webglTexture),X(a.TEXTURE_2D,Be,_e),xe(H.__webglFramebuffer,P,Be,a.COLOR_ATTACHMENT0+de,a.TEXTURE_2D,0),v(Be,_e)&&x(a.TEXTURE_2D)}n.unbindTexture()}else{let he=a.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(l?he=P.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(he,ne.__webglTexture),X(he,E,_e),l&&E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)xe(H.__webglFramebuffer[de],P,E,a.COLOR_ATTACHMENT0,he,de);else xe(H.__webglFramebuffer,P,E,a.COLOR_ATTACHMENT0,he,0);v(E,_e)&&x(he),n.unbindTexture()}P.depthBuffer&&Ee(P)}function an(P){let E=m(P)||l,H=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ne=0,te=H.length;ne<te;ne++){let ie=H[ne];if(v(ie,E)){let _e=P.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D,he=i.get(ie).__webglTexture;n.bindTexture(_e,he),x(_e),n.unbindTexture()}}}function Me(P){if(l&&P.samples>0&&ge(P)===!1){let E=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],H=P.width,ne=P.height,te=a.COLOR_BUFFER_BIT,ie=[],_e=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,he=i.get(P),de=P.isWebGLMultipleRenderTargets===!0;if(de)for(let we=0;we<E.length;we++)n.bindFramebuffer(a.FRAMEBUFFER,he.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.RENDERBUFFER,null),n.bindFramebuffer(a.FRAMEBUFFER,he.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.TEXTURE_2D,null,0);n.bindFramebuffer(a.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let we=0;we<E.length;we++){ie.push(a.COLOR_ATTACHMENT0+we),P.depthBuffer&&ie.push(_e);let Be=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(Be===!1&&(P.depthBuffer&&(te|=a.DEPTH_BUFFER_BIT),P.stencilBuffer&&(te|=a.STENCIL_BUFFER_BIT)),de&&a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,he.__webglColorRenderbuffer[we]),Be===!0&&(a.invalidateFramebuffer(a.READ_FRAMEBUFFER,[_e]),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[_e])),de){let ee=i.get(E[we]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,ee,0)}a.blitFramebuffer(0,0,H,ne,0,0,H,ne,te,a.NEAREST),h&&a.invalidateFramebuffer(a.READ_FRAMEBUFFER,ie)}if(n.bindFramebuffer(a.READ_FRAMEBUFFER,null),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),de)for(let we=0;we<E.length;we++){n.bindFramebuffer(a.FRAMEBUFFER,he.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.RENDERBUFFER,he.__webglColorRenderbuffer[we]);let Be=i.get(E[we]).__webglTexture;n.bindFramebuffer(a.FRAMEBUFFER,he.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+we,a.TEXTURE_2D,Be,0)}n.bindFramebuffer(a.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function Le(P){return Math.min(r.maxSamples,P.samples)}function ge(P){let E=i.get(P);return l&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function pt(P){let E=o.render.frame;c.get(P)!==E&&(c.set(P,E),P.update())}function ke(P,E){let H=P.colorSpace,ne=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===su||H!==Et&&H!==Gn&&(Je.getTransfer(H)===tt?l===!1?e.has("EXT_sRGB")===!0&&ne===zn?(P.format=su,P.minFilter=wt,P.generateMipmaps=!1):E=tc.sRGBToLinear(E):(ne!==zn||te!==nr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}this.allocateTextureUnit=I,this.resetTextureUnits=V,this.setTexture2D=k,this.setTexture2DArray=Y,this.setTexture3D=K,this.setTextureCube=j,this.rebindTextures=Ke,this.setupRenderTarget=z,this.updateRenderTargetMipmap=an,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ge}function mM(a,e,n){let i=n.isWebGL2;function r(s,o=Gn){let l,u=Je.getTransfer(o);if(s===nr)return a.UNSIGNED_BYTE;if(s===Fp)return a.UNSIGNED_SHORT_4_4_4_4;if(s===kp)return a.UNSIGNED_SHORT_5_5_5_1;if(s===W_)return a.BYTE;if(s===X_)return a.SHORT;if(s===Wu)return a.UNSIGNED_SHORT;if(s===Up)return a.INT;if(s===$i)return a.UNSIGNED_INT;if(s===Cn)return a.FLOAT;if(s===Gt)return i?a.HALF_FLOAT:(l=e.get("OES_texture_half_float"),l!==null?l.HALF_FLOAT_OES:null);if(s===q_)return a.ALPHA;if(s===zn)return a.RGBA;if(s===Y_)return a.LUMINANCE;if(s===j_)return a.LUMINANCE_ALPHA;if(s===Ir)return a.DEPTH_COMPONENT;if(s===Os)return a.DEPTH_STENCIL;if(s===su)return l=e.get("EXT_sRGB"),l!==null?l.SRGB_ALPHA_EXT:null;if(s===K_)return a.RED;if(s===Bp)return a.RED_INTEGER;if(s===J_)return a.RG;if(s===zp)return a.RG_INTEGER;if(s===Gp)return a.RGBA_INTEGER;if(s===Ml||s===Sl||s===Tl||s===wl)if(u===tt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(s===Ml)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Sl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Tl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===wl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(s===Ml)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Sl)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Tl)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===wl)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===td||s===nd||s===id||s===rd)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(s===td)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===nd)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===id)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===rd)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Hp)return l=e.get("WEBGL_compressed_texture_etc1"),l!==null?l.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===sd||s===ad)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(s===sd)return u===tt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(s===ad)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===od||s===cd||s===ld||s===ud||s===hd||s===fd||s===dd||s===pd||s===md||s===gd||s===_d||s===bd||s===xd||s===vd)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(s===od)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===cd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ld)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ud)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===hd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===fd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===dd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===pd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===md)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===gd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===_d)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===bd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===xd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===vd)return u===tt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Al||s===yd||s===Md)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(s===Al)return u===tt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===yd)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Md)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Z_||s===Sd||s===Td||s===wd)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(s===Al)return l.COMPRESSED_RED_RGTC1_EXT;if(s===Sd)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Td)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===wd)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Lr?i?a.UNSIGNED_INT_24_8:(l=e.get("WEBGL_depth_texture"),l!==null?l.UNSIGNED_INT_24_8_WEBGL:null):a[s]!==void 0?a[s]:null}return{convert:r}}var xu=class extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Pn=class extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}},gM={type:"move"},Ea=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let n=this._hand;if(n)for(let i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null,l=this._targetRay,u=this._grip,h=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(let b of e.hand.values()){let m=n.getJointPose(b,i),g=this._getHandJoint(h,b);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let c=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],d=c.position.distanceTo(f.position),p=.02,_=.005;h.inputState.pinching&&d>p+_?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&d<=p-_&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1));l!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(gM)))}return l!==null&&(l.visible=r!==null),u!==null&&(u.visible=s!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){let i=new Pn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}},vu=class extends Oi{constructor(e,n){super();let i=this,r=null,s=1,o=null,l="local-floor",u=1,h=null,c=null,f=null,d=null,p=null,_=null,b=n.getContextAttributes(),m=null,g=null,v=[],x=[],M=new me,w=null,T=new Ot;T.layers.enable(1),T.viewport=new rt;let A=new Ot;A.layers.enable(2),A.viewport=new rt;let C=[T,A],y=new xu;y.layers.enable(1),y.layers.enable(2);let S=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=v[X];return Z===void 0&&(Z=new Ea,v[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=v[X];return Z===void 0&&(Z=new Ea,v[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=v[X];return Z===void 0&&(Z=new Ea,v[X]=Z),Z.getHandSpace()};function F(X){let Z=x.indexOf(X.inputSource);if(Z===-1)return;let ce=v[Z];ce!==void 0&&(ce.update(X.inputSource,X.frame,h||o),ce.dispatchEvent({type:X.type,data:X.inputSource}))}function V(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",I);for(let X=0;X<v.length;X++){let Z=x[X];Z!==null&&(x[X]=null,v[X].disconnect(Z))}S=null,N=null,e.setRenderTarget(m),p=null,d=null,f=null,r=null,g=null,re.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){l=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(X){h=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",V),r.addEventListener("inputsourceschange",I),b.xrCompatible!==!0&&await n.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Z={antialias:r.renderState.layers===void 0?b.antialias:!0,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,Z),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),g=new Yt(p.framebufferWidth,p.framebufferHeight,{format:zn,type:nr,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil})}else{let Z=null,ce=null,ve=null;b.depth&&(ve=b.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Z=b.stencil?Os:Ir,ce=b.stencil?Lr:$i);let xe={colorFormat:n.RGBA8,depthFormat:ve,scaleFactor:s};f=new XRWebGLBinding(r,n),d=f.createProjectionLayer(xe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),g=new Yt(d.textureWidth,d.textureHeight,{format:zn,type:nr,depthTexture:new lc(d.textureWidth,d.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0});let De=e.properties.get(g);De.__ignoreDepthValues=d.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(u),h=null,o=await r.requestReferenceSpace(l),re.setContext(r),re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function I(X){for(let Z=0;Z<X.removed.length;Z++){let ce=X.removed[Z],ve=x.indexOf(ce);ve>=0&&(x[ve]=null,v[ve].disconnect(ce))}for(let Z=0;Z<X.added.length;Z++){let ce=X.added[Z],ve=x.indexOf(ce);if(ve===-1){for(let De=0;De<v.length;De++)if(De>=x.length){x.push(ce),ve=De;break}else if(x[De]===null){x[De]=ce,ve=De;break}if(ve===-1)break}let xe=v[ve];xe&&xe.connect(ce)}}let U=new D,k=new D;function Y(X,Z,ce){U.setFromMatrixPosition(Z.matrixWorld),k.setFromMatrixPosition(ce.matrixWorld);let ve=U.distanceTo(k),xe=Z.projectionMatrix.elements,De=ce.projectionMatrix.elements,Ne=xe[14]/(xe[10]-1),Ee=xe[14]/(xe[10]+1),Ke=(xe[9]+1)/xe[5],z=(xe[9]-1)/xe[5],an=(xe[8]-1)/xe[0],Me=(De[8]+1)/De[0],Le=Ne*an,ge=Ne*Me,pt=ve/(-an+Me),ke=pt*-an;Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ke),X.translateZ(pt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();let P=Ne+pt,E=Ee+pt,H=Le-ke,ne=ge+(ve-ke),te=Ke*Ee/E*P,ie=z*Ee/E*P;X.projectionMatrix.makePerspective(H,ne,te,ie,P,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function K(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;y.near=A.near=T.near=X.near,y.far=A.far=T.far=X.far,(S!==y.near||N!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,N=y.far);let Z=X.parent,ce=y.cameras;K(y,Z);for(let ve=0;ve<ce.length;ve++)K(ce[ve],Z);ce.length===2?Y(y,T,A):y.projectionMatrix.copy(T.projectionMatrix),j(X,y,Z)};function j(X,Z,ce){ce===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(ce.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Us*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return u},this.setFoveation=function(X){u=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let J=null;function Q(X,Z){if(c=Z.getViewerPose(h||o),_=Z,c!==null){let ce=c.views;p!==null&&(e.setRenderTargetFramebuffer(g,p.framebuffer),e.setRenderTarget(g));let ve=!1;ce.length!==y.cameras.length&&(y.cameras.length=0,ve=!0);for(let xe=0;xe<ce.length;xe++){let De=ce[xe],Ne=null;if(p!==null)Ne=p.getViewport(De);else{let Ke=f.getViewSubImage(d,De);Ne=Ke.viewport,xe===0&&(e.setRenderTargetTextures(g,Ke.colorTexture,d.ignoreDepthValues?void 0:Ke.depthStencilTexture),e.setRenderTarget(g))}let Ee=C[xe];Ee===void 0&&(Ee=new Ot,Ee.layers.enable(xe),Ee.viewport=new rt,C[xe]=Ee),Ee.matrix.fromArray(De.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(De.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),xe===0&&(y.matrix.copy(Ee.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ve===!0&&y.cameras.push(Ee)}}for(let ce=0;ce<v.length;ce++){let ve=x[ce],xe=v[ce];ve!==null&&xe!==void 0&&xe.update(ve,Z,h||o)}J&&J(X,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),_=null}let re=new Zp;re.setAnimationLoop(Q),this.setAnimationLoop=function(X){J=X},this.dispose=function(){}}};function _M(a,e){function n(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Jp(a)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,v,x,M){g.isMeshBasicMaterial||g.isMeshLambertMaterial?s(m,g):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),c(m,g)):g.isMeshStandardMaterial?(s(m,g),d(m,g),g.isMeshPhysicalMaterial&&p(m,g,M)):g.isMeshMatcapMaterial?(s(m,g),_(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),b(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&l(m,g)):g.isPointsMaterial?u(m,g,v,x):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,n(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===$t&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,n(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===$t&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,n(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,n(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let v=e.get(g).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap){m.lightMap.value=g.lightMap;let x=a._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=g.lightMapIntensity*x,n(g.lightMap,m.lightMapTransform)}g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform))}function l(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function u(m,g,v,x){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=x*.5,g.map&&(m.map.value=g.map,n(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,n(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,n(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,m.roughnessMapTransform)),e.get(g).envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function p(m,g,v){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===$t&&m.clearcoatNormalScale.value.negate())),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,g){g.matcap&&(m.matcap.value=g.matcap)}function b(m,g){let v=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function bM(a,e,n,i){let r={},s={},o=[],l=n.isWebGL2?a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS):0;function u(v,x){let M=x.program;i.uniformBlockBinding(v,M)}function h(v,x){let M=r[v.id];M===void 0&&(_(v),M=c(v),r[v.id]=M,v.addEventListener("dispose",m));let w=x.program;i.updateUBOMapping(v,w);let T=e.render.frame;s[v.id]!==T&&(d(v),s[v.id]=T)}function c(v){let x=f();v.__bindingPointIndex=x;let M=a.createBuffer(),w=v.__size,T=v.usage;return a.bindBuffer(a.UNIFORM_BUFFER,M),a.bufferData(a.UNIFORM_BUFFER,w,T),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,x,M),M}function f(){for(let v=0;v<l;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let x=r[v.id],M=v.uniforms,w=v.__cache;a.bindBuffer(a.UNIFORM_BUFFER,x);for(let T=0,A=M.length;T<A;T++){let C=Array.isArray(M[T])?M[T]:[M[T]];for(let y=0,S=C.length;y<S;y++){let N=C[y];if(p(N,T,y,w)===!0){let F=N.__offset,V=Array.isArray(N.value)?N.value:[N.value],I=0;for(let U=0;U<V.length;U++){let k=V[U],Y=b(k);typeof k=="number"||typeof k=="boolean"?(N.__data[0]=k,a.bufferSubData(a.UNIFORM_BUFFER,F+I,N.__data)):k.isMatrix3?(N.__data[0]=k.elements[0],N.__data[1]=k.elements[1],N.__data[2]=k.elements[2],N.__data[3]=0,N.__data[4]=k.elements[3],N.__data[5]=k.elements[4],N.__data[6]=k.elements[5],N.__data[7]=0,N.__data[8]=k.elements[6],N.__data[9]=k.elements[7],N.__data[10]=k.elements[8],N.__data[11]=0):(k.toArray(N.__data,I),I+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,F,N.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function p(v,x,M,w){let T=v.value,A=x+"_"+M;if(w[A]===void 0)return typeof T=="number"||typeof T=="boolean"?w[A]=T:w[A]=T.clone(),!0;{let C=w[A];if(typeof T=="number"||typeof T=="boolean"){if(C!==T)return w[A]=T,!0}else if(C.equals(T)===!1)return C.copy(T),!0}return!1}function _(v){let x=v.uniforms,M=0,w=16;for(let A=0,C=x.length;A<C;A++){let y=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,N=y.length;S<N;S++){let F=y[S],V=Array.isArray(F.value)?F.value:[F.value];for(let I=0,U=V.length;I<U;I++){let k=V[I],Y=b(k),K=M%w;K!==0&&w-K<Y.boundary&&(M+=w-K),F.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=Y.storage}}}let T=M%w;return T>0&&(M+=w-T),v.__size=M,v.__cache={},this}function b(v){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){let x=v.target;x.removeEventListener("dispose",m);let M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),a.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function g(){for(let v in r)a.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:u,update:h,dispose:g}}var Da=class{constructor(e={}){let{canvas:n=w0(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:l=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;let p=new Uint32Array(4),_=new Int32Array(4),b=null,m=null,g=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=it,this._useLegacyLights=!1,this.toneMapping=tr,this.toneMappingExposure=1;let x=this,M=!1,w=0,T=0,A=null,C=-1,y=null,S=new rt,N=new rt,F=null,V=new oe(0),I=0,U=n.width,k=n.height,Y=1,K=null,j=null,J=new rt(0,0,U,k),Q=new rt(0,0,U,k),re=!1,X=new Ia,Z=!1,ce=!1,ve=null,xe=new Ae,De=new me,Ne=new D,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ke(){return A===null?Y:1}let z=i;function an(R,B){for(let W=0;W<R.length;W++){let q=R[W],G=n.getContext(q,B);if(G!==null)return G}return null}try{let R={alpha:!0,depth:r,stencil:s,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Fu}`),n.addEventListener("webglcontextlost",se,!1),n.addEventListener("webglcontextrestored",O,!1),n.addEventListener("webglcontextcreationerror",le,!1),z===null){let B=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&B.shift(),z=an(B,R),z===null)throw an(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Me,Le,ge,pt,ke,P,E,H,ne,te,ie,_e,he,de,we,Be,ee,$e,Xe,Pe,ye,pe,Ue,Qe;function vt(){Me=new Fv(z),Le=new Lv(z,Me,e),Me.init(Le),pe=new mM(z,Me,Le),ge=new dM(z,Me,Le),pt=new zv(z),ke=new tM,P=new pM(z,Me,ge,ke,Le,pe,pt),E=new Dv(x),H=new Uv(x),ne=new j0(z,Le),Ue=new Cv(z,Me,ne,Le),te=new kv(z,ne,pt,Ue),ie=new Wv(z,te,ne,pt),Xe=new Vv(z,Le,P),Be=new Iv(ke),_e=new eM(x,E,H,Me,Le,Ue,Be),he=new _M(x,ke),de=new iM,we=new lM(Me,Le),$e=new Rv(x,E,H,ge,ie,d,u),ee=new fM(x,ie,Le),Qe=new bM(z,pt,Le,ge),Pe=new Pv(z,Me,pt,Le),ye=new Bv(z,Me,pt,Le),pt.programs=_e.programs,x.capabilities=Le,x.extensions=Me,x.properties=ke,x.renderLists=de,x.shadowMap=ee,x.state=ge,x.info=pt}vt();let Ge=new vu(x,z);this.xr=Ge,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let R=Me.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=Me.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(R){R!==void 0&&(Y=R,this.setSize(U,k,!1))},this.getSize=function(R){return R.set(U,k)},this.setSize=function(R,B,W=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=R,k=B,n.width=Math.floor(R*Y),n.height=Math.floor(B*Y),W===!0&&(n.style.width=R+"px",n.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(U*Y,k*Y).floor()},this.setDrawingBufferSize=function(R,B,W){U=R,k=B,Y=W,n.width=Math.floor(R*W),n.height=Math.floor(B*W),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(S)},this.getViewport=function(R){return R.copy(J)},this.setViewport=function(R,B,W,q){R.isVector4?J.set(R.x,R.y,R.z,R.w):J.set(R,B,W,q),ge.viewport(S.copy(J).multiplyScalar(Y).floor())},this.getScissor=function(R){return R.copy(Q)},this.setScissor=function(R,B,W,q){R.isVector4?Q.set(R.x,R.y,R.z,R.w):Q.set(R,B,W,q),ge.scissor(N.copy(Q).multiplyScalar(Y).floor())},this.getScissorTest=function(){return re},this.setScissorTest=function(R){ge.setScissorTest(re=R)},this.setOpaqueSort=function(R){K=R},this.setTransparentSort=function(R){j=R},this.getClearColor=function(R){return R.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor.apply($e,arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha.apply($e,arguments)},this.clear=function(R=!0,B=!0,W=!0){let q=0;if(R){let G=!1;if(A!==null){let fe=A.texture.format;G=fe===Gp||fe===zp||fe===Bp}if(G){let fe=A.texture.type,be=fe===nr||fe===$i||fe===Wu||fe===Lr||fe===Fp||fe===kp,Te=$e.getClearColor(),Ce=$e.getClearAlpha(),ze=Te.r,Ie=Te.g,Oe=Te.b;be?(p[0]=ze,p[1]=Ie,p[2]=Oe,p[3]=Ce,z.clearBufferuiv(z.COLOR,0,p)):(_[0]=ze,_[1]=Ie,_[2]=Oe,_[3]=Ce,z.clearBufferiv(z.COLOR,0,_))}else q|=z.COLOR_BUFFER_BIT}B&&(q|=z.DEPTH_BUFFER_BIT),W&&(q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",se,!1),n.removeEventListener("webglcontextrestored",O,!1),n.removeEventListener("webglcontextcreationerror",le,!1),de.dispose(),we.dispose(),ke.dispose(),E.dispose(),H.dispose(),ie.dispose(),Ue.dispose(),Qe.dispose(),_e.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",on),Ge.removeEventListener("sessionend",lt),ve&&(ve.dispose(),ve=null),cn.stop()};function se(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let R=pt.autoReset,B=ee.enabled,W=ee.autoUpdate,q=ee.needsUpdate,G=ee.type;vt(),pt.autoReset=R,ee.enabled=B,ee.autoUpdate=W,ee.needsUpdate=q,ee.type=G}function le(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){let B=R.target;B.removeEventListener("dispose",ue),Re(B)}function Re(R){Se(R),ke.remove(R)}function Se(R){let B=ke.get(R).programs;B!==void 0&&(B.forEach(function(W){_e.releaseProgram(W)}),R.isShaderMaterial&&_e.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,W,q,G,fe){B===null&&(B=Ee);let be=G.isMesh&&G.matrixWorld.determinant()<0,Te=i_(R,B,W,q,G);ge.setMaterial(q,be);let Ce=W.index,ze=1;if(q.wireframe===!0){if(Ce=te.getWireframeAttribute(W),Ce===void 0)return;ze=2}let Ie=W.drawRange,Oe=W.attributes.position,Tt=Ie.start*ze,An=(Ie.start+Ie.count)*ze;fe!==null&&(Tt=Math.max(Tt,fe.start*ze),An=Math.min(An,(fe.start+fe.count)*ze)),Ce!==null?(Tt=Math.max(Tt,0),An=Math.min(An,Ce.count)):Oe!=null&&(Tt=Math.max(Tt,0),An=Math.min(An,Oe.count));let Bt=An-Tt;if(Bt<0||Bt===1/0)return;Ue.setup(G,q,Te,W,Ce);let yi,mt=Pe;if(Ce!==null&&(yi=ne.get(Ce),mt=ye,mt.setIndex(yi)),G.isMesh)q.wireframe===!0?(ge.setLineWidth(q.wireframeLinewidth*Ke()),mt.setMode(z.LINES)):mt.setMode(z.TRIANGLES);else if(G.isLine){let He=q.linewidth;He===void 0&&(He=1),ge.setLineWidth(He*Ke()),G.isLineSegments?mt.setMode(z.LINES):G.isLineLoop?mt.setMode(z.LINE_LOOP):mt.setMode(z.LINE_STRIP)}else G.isPoints?mt.setMode(z.POINTS):G.isSprite&&mt.setMode(z.TRIANGLES);if(G.isBatchedMesh)mt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)mt.renderInstances(Tt,Bt,G.count);else if(W.isInstancedBufferGeometry){let He=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,bl=Math.min(W.instanceCount,He);mt.renderInstances(Tt,Bt,bl)}else mt.render(Tt,Bt)};function ot(R,B,W){R.transparent===!0&&R.side===_n&&R.forceSinglePass===!1?(R.side=$t,R.needsUpdate=!0,bo(R,B,W),R.side=oi,R.needsUpdate=!0,bo(R,B,W),R.side=_n):bo(R,B,W)}this.compile=function(R,B,W=null){W===null&&(W=R),m=we.get(W),m.init(),v.push(m),W.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),R!==W&&R.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(x._useLegacyLights);let q=new Set;return R.traverse(function(G){let fe=G.material;if(fe)if(Array.isArray(fe))for(let be=0;be<fe.length;be++){let Te=fe[be];ot(Te,W,G),q.add(Te)}else ot(fe,W,G),q.add(fe)}),v.pop(),m=null,q},this.compileAsync=function(R,B,W=null){let q=this.compile(R,B,W);return new Promise(G=>{function fe(){if(q.forEach(function(be){ke.get(be).currentProgram.isReady()&&q.delete(be)}),q.size===0){G(R);return}setTimeout(fe,10)}Me.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ct=null;function kt(R){ct&&ct(R)}function on(){cn.stop()}function lt(){cn.start()}let cn=new Zp;cn.setAnimationLoop(kt),typeof self!="undefined"&&cn.setContext(self),this.setAnimationLoop=function(R){ct=R,Ge.setAnimationLoop(R),R===null?cn.stop():cn.start()},Ge.addEventListener("sessionstart",on),Ge.addEventListener("sessionend",lt),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(B),B=Ge.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,B,A),m=we.get(R,v.length),m.init(),v.push(m),xe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),X.setFromProjectionMatrix(xe),ce=this.localClippingEnabled,Z=Be.init(this.clippingPlanes,ce),b=de.get(R,g.length),b.init(),g.push(b),ii(R,B,0,x.sortObjects),b.finish(),x.sortObjects===!0&&b.sort(K,j),this.info.render.frame++,Z===!0&&Be.beginShadows();let W=m.state.shadowsArray;if(ee.render(W,R,B),Z===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),$e.render(b,R),m.setupLights(x._useLegacyLights),B.isArrayCamera){let q=B.cameras;for(let G=0,fe=q.length;G<fe;G++){let be=q[G];Hf(b,R,be,be.viewport)}}else Hf(b,R,B);A!==null&&(P.updateMultisampleRenderTarget(A),P.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(x,R,B),Ue.resetDefaultState(),C=-1,y=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,g.pop(),g.length>0?b=g[g.length-1]:b=null};function ii(R,B,W,q){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)W=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||X.intersectsSprite(R)){q&&Ne.setFromMatrixPosition(R.matrixWorld).applyMatrix4(xe);let be=ie.update(R),Te=R.material;Te.visible&&b.push(R,be,Te,W,Ne.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||X.intersectsObject(R))){let be=ie.update(R),Te=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ne.copy(R.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ne.copy(be.boundingSphere.center)),Ne.applyMatrix4(R.matrixWorld).applyMatrix4(xe)),Array.isArray(Te)){let Ce=be.groups;for(let ze=0,Ie=Ce.length;ze<Ie;ze++){let Oe=Ce[ze],Tt=Te[Oe.materialIndex];Tt&&Tt.visible&&b.push(R,be,Tt,W,Ne.z,Oe)}}else Te.visible&&b.push(R,be,Te,W,Ne.z,null)}}let fe=R.children;for(let be=0,Te=fe.length;be<Te;be++)ii(fe[be],B,W,q)}function Hf(R,B,W,q){let G=R.opaque,fe=R.transmissive,be=R.transparent;m.setupLightsView(W),Z===!0&&Be.setGlobalState(x.clippingPlanes,W),fe.length>0&&n_(G,fe,B,W),q&&ge.viewport(S.copy(q)),G.length>0&&_o(G,B,W),fe.length>0&&_o(fe,B,W),be.length>0&&_o(be,B,W),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function n_(R,B,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;let fe=Le.isWebGL2;ve===null&&(ve=new Yt(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?Gt:nr,minFilter:Di,samples:fe?4:0})),x.getDrawingBufferSize(De),fe?ve.setSize(De.x,De.y):ve.setSize(ec(De.x),ec(De.y));let be=x.getRenderTarget();x.setRenderTarget(ve),x.getClearColor(V),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();let Te=x.toneMapping;x.toneMapping=tr,_o(R,W,q),P.updateMultisampleRenderTarget(ve),P.updateRenderTargetMipmap(ve);let Ce=!1;for(let ze=0,Ie=B.length;ze<Ie;ze++){let Oe=B[ze],Tt=Oe.object,An=Oe.geometry,Bt=Oe.material,yi=Oe.group;if(Bt.side===_n&&Tt.layers.test(q.layers)){let mt=Bt.side;Bt.side=$t,Bt.needsUpdate=!0,Vf(Tt,W,q,An,Bt,yi),Bt.side=mt,Bt.needsUpdate=!0,Ce=!0}}Ce===!0&&(P.updateMultisampleRenderTarget(ve),P.updateRenderTargetMipmap(ve)),x.setRenderTarget(be),x.setClearColor(V,I),x.toneMapping=Te}function _o(R,B,W){let q=B.isScene===!0?B.overrideMaterial:null;for(let G=0,fe=R.length;G<fe;G++){let be=R[G],Te=be.object,Ce=be.geometry,ze=q===null?be.material:q,Ie=be.group;Te.layers.test(W.layers)&&Vf(Te,B,W,Ce,ze,Ie)}}function Vf(R,B,W,q,G,fe){R.onBeforeRender(x,B,W,q,G,fe),R.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),G.onBeforeRender(x,B,W,q,R,fe),G.transparent===!0&&G.side===_n&&G.forceSinglePass===!1?(G.side=$t,G.needsUpdate=!0,x.renderBufferDirect(W,B,q,G,R,fe),G.side=oi,G.needsUpdate=!0,x.renderBufferDirect(W,B,q,G,R,fe),G.side=_n):x.renderBufferDirect(W,B,q,G,R,fe),R.onAfterRender(x,B,W,q,G,fe)}function bo(R,B,W){B.isScene!==!0&&(B=Ee);let q=ke.get(R),G=m.state.lights,fe=m.state.shadowsArray,be=G.state.version,Te=_e.getParameters(R,G.state,fe,B,W),Ce=_e.getProgramCacheKey(Te),ze=q.programs;q.environment=R.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(R.isMeshStandardMaterial?H:E).get(R.envMap||q.environment),ze===void 0&&(R.addEventListener("dispose",ue),ze=new Map,q.programs=ze);let Ie=ze.get(Ce);if(Ie!==void 0){if(q.currentProgram===Ie&&q.lightsStateVersion===be)return Xf(R,Te),Ie}else Te.uniforms=_e.getUniforms(R),R.onBuild(W,Te,x),R.onBeforeCompile(Te,x),Ie=_e.acquireProgram(Te,Ce),ze.set(Ce,Ie),q.uniforms=Te.uniforms;let Oe=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Oe.clippingPlanes=Be.uniform),Xf(R,Te),q.needsLights=s_(R),q.lightsStateVersion=be,q.needsLights&&(Oe.ambientLightColor.value=G.state.ambient,Oe.lightProbe.value=G.state.probe,Oe.directionalLights.value=G.state.directional,Oe.directionalLightShadows.value=G.state.directionalShadow,Oe.spotLights.value=G.state.spot,Oe.spotLightShadows.value=G.state.spotShadow,Oe.rectAreaLights.value=G.state.rectArea,Oe.ltc_1.value=G.state.rectAreaLTC1,Oe.ltc_2.value=G.state.rectAreaLTC2,Oe.pointLights.value=G.state.point,Oe.pointLightShadows.value=G.state.pointShadow,Oe.hemisphereLights.value=G.state.hemi,Oe.directionalShadowMap.value=G.state.directionalShadowMap,Oe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Oe.spotShadowMap.value=G.state.spotShadowMap,Oe.spotLightMatrix.value=G.state.spotLightMatrix,Oe.spotLightMap.value=G.state.spotLightMap,Oe.pointShadowMap.value=G.state.pointShadowMap,Oe.pointShadowMatrix.value=G.state.pointShadowMatrix),q.currentProgram=Ie,q.uniformsList=null,Ie}function Wf(R){if(R.uniformsList===null){let B=R.currentProgram.getUniforms();R.uniformsList=Ls.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function Xf(R,B){let W=ke.get(R);W.outputColorSpace=B.outputColorSpace,W.batching=B.batching,W.instancing=B.instancing,W.instancingColor=B.instancingColor,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function i_(R,B,W,q,G){B.isScene!==!0&&(B=Ee),P.resetTextureUnits();let fe=B.fog,be=q.isMeshStandardMaterial?B.environment:null,Te=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Et,Ce=(q.isMeshStandardMaterial?H:E).get(q.envMap||be),ze=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ie=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Oe=!!W.morphAttributes.position,Tt=!!W.morphAttributes.normal,An=!!W.morphAttributes.color,Bt=tr;q.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Bt=x.toneMapping);let yi=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,mt=yi!==void 0?yi.length:0,He=ke.get(q),bl=m.state.lights;if(Z===!0&&(ce===!0||R!==y)){let kn=R===y&&q.id===C;Be.setState(q,R,kn)}let yt=!1;q.version===He.__version?(He.needsLights&&He.lightsStateVersion!==bl.state.version||He.outputColorSpace!==Te||G.isBatchedMesh&&He.batching===!1||!G.isBatchedMesh&&He.batching===!0||G.isInstancedMesh&&He.instancing===!1||!G.isInstancedMesh&&He.instancing===!0||G.isSkinnedMesh&&He.skinning===!1||!G.isSkinnedMesh&&He.skinning===!0||G.isInstancedMesh&&He.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&He.instancingColor===!1&&G.instanceColor!==null||He.envMap!==Ce||q.fog===!0&&He.fog!==fe||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Be.numPlanes||He.numIntersection!==Be.numIntersection)||He.vertexAlphas!==ze||He.vertexTangents!==Ie||He.morphTargets!==Oe||He.morphNormals!==Tt||He.morphColors!==An||He.toneMapping!==Bt||Le.isWebGL2===!0&&He.morphTargetsCount!==mt)&&(yt=!0):(yt=!0,He.__version=q.version);let Mr=He.currentProgram;yt===!0&&(Mr=bo(q,B,G));let qf=!1,ma=!1,xl=!1,Jt=Mr.getUniforms(),Sr=He.uniforms;if(ge.useProgram(Mr.program)&&(qf=!0,ma=!0,xl=!0),q.id!==C&&(C=q.id,ma=!0),qf||y!==R){Jt.setValue(z,"projectionMatrix",R.projectionMatrix),Jt.setValue(z,"viewMatrix",R.matrixWorldInverse);let kn=Jt.map.cameraPosition;kn!==void 0&&kn.setValue(z,Ne.setFromMatrixPosition(R.matrixWorld)),Le.logarithmicDepthBuffer&&Jt.setValue(z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Jt.setValue(z,"isOrthographic",R.isOrthographicCamera===!0),y!==R&&(y=R,ma=!0,xl=!0)}if(G.isSkinnedMesh){Jt.setOptional(z,G,"bindMatrix"),Jt.setOptional(z,G,"bindMatrixInverse");let kn=G.skeleton;kn&&(Le.floatVertexTextures?(kn.boneTexture===null&&kn.computeBoneTexture(),Jt.setValue(z,"boneTexture",kn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Jt.setOptional(z,G,"batchingTexture"),Jt.setValue(z,"batchingTexture",G._matricesTexture,P));let vl=W.morphAttributes;if((vl.position!==void 0||vl.normal!==void 0||vl.color!==void 0&&Le.isWebGL2===!0)&&Xe.update(G,W,Mr),(ma||He.receiveShadow!==G.receiveShadow)&&(He.receiveShadow=G.receiveShadow,Jt.setValue(z,"receiveShadow",G.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Sr.envMap.value=Ce,Sr.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),ma&&(Jt.setValue(z,"toneMappingExposure",x.toneMappingExposure),He.needsLights&&r_(Sr,xl),fe&&q.fog===!0&&he.refreshFogUniforms(Sr,fe),he.refreshMaterialUniforms(Sr,q,Y,k,ve),Ls.upload(z,Wf(He),Sr,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ls.upload(z,Wf(He),Sr,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Jt.setValue(z,"center",G.center),Jt.setValue(z,"modelViewMatrix",G.modelViewMatrix),Jt.setValue(z,"normalMatrix",G.normalMatrix),Jt.setValue(z,"modelMatrix",G.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let kn=q.uniformsGroups;for(let yl=0,a_=kn.length;yl<a_;yl++)if(Le.isWebGL2){let Yf=kn[yl];Qe.update(Yf,Mr),Qe.bind(Yf,Mr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Mr}function r_(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function s_(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,B,W){ke.get(R.texture).__webglTexture=B,ke.get(R.depthTexture).__webglTexture=W;let q=ke.get(R);q.__hasExternalTextures=!0,q.__hasExternalTextures&&(q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,B){let W=ke.get(R);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(R,B=0,W=0){A=R,w=B,T=W;let q=!0,G=null,fe=!1,be=!1;if(R){let Ce=ke.get(R);Ce.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(z.FRAMEBUFFER,null),q=!1):Ce.__webglFramebuffer===void 0?P.setupRenderTarget(R):Ce.__hasExternalTextures&&P.rebindTextures(R,ke.get(R.texture).__webglTexture,ke.get(R.depthTexture).__webglTexture);let ze=R.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(be=!0);let Ie=ke.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ie[B])?G=Ie[B][W]:G=Ie[B],fe=!0):Le.isWebGL2&&R.samples>0&&P.useMultisampledRTT(R)===!1?G=ke.get(R).__webglMultisampledFramebuffer:Array.isArray(Ie)?G=Ie[W]:G=Ie,S.copy(R.viewport),N.copy(R.scissor),F=R.scissorTest}else S.copy(J).multiplyScalar(Y).floor(),N.copy(Q).multiplyScalar(Y).floor(),F=re;if(ge.bindFramebuffer(z.FRAMEBUFFER,G)&&Le.drawBuffers&&q&&ge.drawBuffers(R,G),ge.viewport(S),ge.scissor(N),ge.setScissorTest(F),fe){let Ce=ke.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ce.__webglTexture,W)}else if(be){let Ce=ke.get(R.texture),ze=B||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ce.__webglTexture,W||0,ze)}C=-1},this.readRenderTargetPixels=function(R,B,W,q,G,fe,be){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=ke.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){ge.bindFramebuffer(z.FRAMEBUFFER,Te);try{let Ce=R.texture,ze=Ce.format,Ie=Ce.type;if(ze!==zn&&pe.convert(ze)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Oe=Ie===Gt&&(Me.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Ie!==nr&&pe.convert(Ie)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Cn&&(Le.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-q&&W>=0&&W<=R.height-G&&z.readPixels(B,W,q,G,pe.convert(ze),pe.convert(Ie),fe)}finally{let Ce=A!==null?ke.get(A).__webglFramebuffer:null;ge.bindFramebuffer(z.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(R,B,W=0){let q=Math.pow(2,-W),G=Math.floor(B.image.width*q),fe=Math.floor(B.image.height*q);P.setTexture2D(B,0),z.copyTexSubImage2D(z.TEXTURE_2D,W,0,0,R.x,R.y,G,fe),ge.unbindTexture()},this.copyTextureToTexture=function(R,B,W,q=0){let G=B.image.width,fe=B.image.height,be=pe.convert(W.format),Te=pe.convert(W.type);P.setTexture2D(W,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,W.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,W.unpackAlignment),B.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,q,R.x,R.y,G,fe,be,Te,B.image.data):B.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,q,R.x,R.y,B.mipmaps[0].width,B.mipmaps[0].height,be,B.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,q,R.x,R.y,be,Te,B.image),q===0&&W.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(R,B,W,q,G=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let fe=R.max.x-R.min.x+1,be=R.max.y-R.min.y+1,Te=R.max.z-R.min.z+1,Ce=pe.convert(q.format),ze=pe.convert(q.type),Ie;if(q.isData3DTexture)P.setTexture3D(q,0),Ie=z.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)P.setTexture2DArray(q,0),Ie=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,q.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,q.unpackAlignment);let Oe=z.getParameter(z.UNPACK_ROW_LENGTH),Tt=z.getParameter(z.UNPACK_IMAGE_HEIGHT),An=z.getParameter(z.UNPACK_SKIP_PIXELS),Bt=z.getParameter(z.UNPACK_SKIP_ROWS),yi=z.getParameter(z.UNPACK_SKIP_IMAGES),mt=W.isCompressedTexture?W.mipmaps[G]:W.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,mt.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,mt.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,R.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,R.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,R.min.z),W.isDataTexture||W.isData3DTexture?z.texSubImage3D(Ie,G,B.x,B.y,B.z,fe,be,Te,Ce,ze,mt.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(Ie,G,B.x,B.y,B.z,fe,be,Te,Ce,mt.data)):z.texSubImage3D(Ie,G,B.x,B.y,B.z,fe,be,Te,Ce,ze,mt),z.pixelStorei(z.UNPACK_ROW_LENGTH,Oe),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Tt),z.pixelStorei(z.UNPACK_SKIP_PIXELS,An),z.pixelStorei(z.UNPACK_SKIP_ROWS,Bt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,yi),G===0&&q.generateMipmaps&&z.generateMipmap(Ie),ge.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),ge.unbindTexture()},this.resetState=function(){w=0,T=0,A=null,ge.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let n=this.getContext();n.drawingBufferColorSpace=e===Yu?"display-p3":"srgb",n.unpackColorSpace=Je.workingColorSpace===Pc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===it?Dr:Wp}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Dr?it:Et}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},yu=class extends Da{};yu.prototype.isWebGL1Renderer=!0;var uc=class a{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new oe(e),this.density=n}clone(){return new a(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var hc=class extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}},Oa=class{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=ru,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ln=new D,Na=class a{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)ln.fromBufferAttribute(this,n),ln.applyMatrix4(e),this.setXYZ(n,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)ln.fromBufferAttribute(this,n),ln.applyNormalMatrix(e),this.setXYZ(n,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)ln.fromBufferAttribute(this,n),ln.transformDirection(e),this.setXYZ(n,ln.x,ln.y,ln.z);return this}setX(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=si(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=si(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=si(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=si(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let n=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new At(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new a(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let n=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var fp=new D,dp=new rt,pp=new rt,xM=new D,mp=new Ae,Go=new D,Jl=new Ln,gp=new Ae,Zl=new Ur,fc=class extends qe{constructor(e,n){super(e,n),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ed,this.bindMatrix=new Ae,this.bindMatrixInverse=new Ae,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new bn),this.boundingBox.makeEmpty();let n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Go),this.boundingBox.expandByPoint(Go)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();let n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Go),this.boundingSphere.expandByPoint(Go)}copy(e,n){return super.copy(e,n),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,n){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jl.copy(this.boundingSphere),Jl.applyMatrix4(r),e.ray.intersectsSphere(Jl)!==!1&&(gp.copy(r).invert(),Zl.copy(e.ray).applyMatrix4(gp),!(this.boundingBox!==null&&Zl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,n,Zl)))}getVertexPosition(e,n){return super.getVertexPosition(e,n),this.applyBoneTransform(e,n),n}bind(e,n){this.skeleton=e,n===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),n=this.matrixWorld),this.bindMatrix.copy(n),this.bindMatrixInverse.copy(n).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new rt,n=this.geometry.attributes.skinWeight;for(let i=0,r=n.count;i<r;i++){e.fromBufferAttribute(n,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),n.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ed?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===V_?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,n){let i=this.skeleton,r=this.geometry;dp.fromBufferAttribute(r.attributes.skinIndex,e),pp.fromBufferAttribute(r.attributes.skinWeight,e),fp.copy(n).applyMatrix4(this.bindMatrix),n.set(0,0,0);for(let s=0;s<4;s++){let o=pp.getComponent(s);if(o!==0){let l=dp.getComponent(s);mp.multiplyMatrices(i.bones[l].matrixWorld,i.boneInverses[l]),n.addScaledVector(xM.copy(fp).applyMatrix4(mp),o)}}return n.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,n){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,n)}},Ua=class extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}},dc=class extends qt{constructor(e=null,n=1,i=1,r,s,o,l,u,h=Dt,c=Dt,f,d){super(null,o,l,u,h,c,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_p=new Ae,vM=new Ae,pc=class a{constructor(e=[],n=[]){this.uuid=$n(),this.bones=e.slice(0),this.boneInverses=n,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,n=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),n.length===0)this.calculateInverses();else if(e.length!==n.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new Ae)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,n=this.bones.length;e<n;e++){let i=new Ae;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,n=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let l=e[s]?e[s].matrixWorld:vM;_p.multiplyMatrices(l,n[s]),_p.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new a(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let n=new Float32Array(e*e*4);n.set(this.boneMatrices);let i=new dc(n,e,e,zn,Cn);return i.needsUpdate=!0,this.boneMatrices=n,this.boneTexture=i,this}getBoneByName(e){for(let n=0,i=this.bones.length;n<i;n++){let r=this.bones[n];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,n){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],o=n[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Ua),this.bones.push(o),this.boneInverses.push(new Ae().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let n=this.bones,i=this.boneInverses;for(let r=0,s=n.length;r<s;r++){let o=n[r];e.bones.push(o.uuid);let l=i[r];e.boneInverses.push(l.toArray())}return e}},Fr=class extends At{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ss=new Ae,bp=new Ae,Ho=[],xp=new bn,yM=new Ae,va=new qe,ya=new Ln,kr=class extends qe{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Fr(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,yM)}computeBoundingBox(){let e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Ss),xp.copy(e.boundingBox).applyMatrix4(Ss),this.boundingBox.union(xp)}computeBoundingSphere(){let e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Ss),ya.copy(e.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(ya)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}raycast(e,n){let i=this.matrixWorld,r=this.count;if(va.geometry=this.geometry,va.material=this.material,va.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ya.copy(this.boundingSphere),ya.applyMatrix4(i),e.ray.intersectsSphere(ya)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ss),bp.multiplyMatrices(i,Ss),va.matrixWorld=bp,va.raycast(e,Ho);for(let o=0,l=Ho.length;o<l;o++){let u=Ho[o];u.instanceId=s,u.object=this,n.push(u)}Ho.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new Fr(new Float32Array(this.instanceMatrix.count*3),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Br=class extends In{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},vp=new D,yp=new D,Mp=new Ae,Ql=new Ur,Vo=new Ln,Bs=class extends gt{constructor(e=new It,n=new Br){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)vp.fromBufferAttribute(n,r-1),yp.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=vp.distanceTo(yp);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vo.copy(i.boundingSphere),Vo.applyMatrix4(r),Vo.radius+=s,e.ray.intersectsSphere(Vo)===!1)return;Mp.copy(r).invert(),Ql.copy(e.ray).applyMatrix4(Mp);let l=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=l*l,h=new D,c=new D,f=new D,d=new D,p=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){let g=Math.max(0,o.start),v=Math.min(_.count,o.start+o.count);for(let x=g,M=v-1;x<M;x+=p){let w=_.getX(x),T=_.getX(x+1);if(h.fromBufferAttribute(m,w),c.fromBufferAttribute(m,T),Ql.distanceSqToSegment(h,c,d,f)>u)continue;d.applyMatrix4(this.matrixWorld);let C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||n.push({distance:C,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let g=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=g,M=v-1;x<M;x+=p){if(h.fromBufferAttribute(m,x),c.fromBufferAttribute(m,x+1),Ql.distanceSqToSegment(h,c,d,f)>u)continue;d.applyMatrix4(this.matrixWorld);let T=e.ray.origin.distanceTo(d);T<e.near||T>e.far||n.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}},Sp=new D,Tp=new D,zs=class extends Bs{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Sp.fromBufferAttribute(n,r),Tp.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Sp.distanceTo(Tp);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},mc=class extends Bs{constructor(e,n){super(e,n),this.isLineLoop=!0,this.type="LineLoop"}},Fa=class extends In{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},wp=new Ae,Mu=new Ur,Wo=new Ln,Xo=new D,gc=class extends gt{constructor(e=new It,n=new Fa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(r),Wo.radius+=s,e.ray.intersectsSphere(Wo)===!1)return;wp.copy(r).invert(),Mu.copy(e.ray).applyMatrix4(wp);let l=s/((this.scale.x+this.scale.y+this.scale.z)/3),u=l*l,h=i.index,f=i.attributes.position;if(h!==null){let d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=d,b=p;_<b;_++){let m=h.getX(_);Xo.fromBufferAttribute(f,m),Ap(Xo,m,u,r,e,n,this)}}else{let d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,b=p;_<b;_++)Xo.fromBufferAttribute(f,_),Ap(Xo,_,u,r,e,n,this)}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let l=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}};function Ap(a,e,n,i,r,s,o){let l=Mu.distanceSqToPoint(a);if(l<n){let u=new D;Mu.closestPointToPoint(a,u),u.applyMatrix4(i);let h=r.ray.origin.distanceTo(u);if(h<r.near||h>r.far)return;s.push({distance:h,distanceToRay:Math.sqrt(l),point:u,index:e,face:null,object:o})}}var ka=class extends qt{constructor(e,n,i,r,s,o,l,u,h){super(e,n,i,r,s,o,l,u,h),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ba=class a extends It{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);let s=[],o=[],l=[],u=[],h=new D,c=new me;o.push(0,0,0),l.push(0,0,1),u.push(.5,.5);for(let f=0,d=3;f<=n;f++,d+=3){let p=i+f/n*r;h.x=e*Math.cos(p),h.y=e*Math.sin(p),o.push(h.x,h.y,h.z),l.push(0,0,1),c.x=(o[d]/e+1)/2,c.y=(o[d+1]/e+1)/2,u.push(c.x,c.y)}for(let f=1;f<=n;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radius,e.segments,e.thetaStart,e.thetaLength)}},za=class a extends It{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,l=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:u};let h=this;r=Math.floor(r),s=Math.floor(s);let c=[],f=[],d=[],p=[],_=0,b=[],m=i/2,g=0;v(),o===!1&&(e>0&&x(!0),n>0&&x(!1)),this.setIndex(c),this.setAttribute("position",new st(f,3)),this.setAttribute("normal",new st(d,3)),this.setAttribute("uv",new st(p,2));function v(){let M=new D,w=new D,T=0,A=(n-e)/i;for(let C=0;C<=s;C++){let y=[],S=C/s,N=S*(n-e)+e;for(let F=0;F<=r;F++){let V=F/r,I=V*u+l,U=Math.sin(I),k=Math.cos(I);w.x=N*U,w.y=-S*i+m,w.z=N*k,f.push(w.x,w.y,w.z),M.set(U,A,k).normalize(),d.push(M.x,M.y,M.z),p.push(V,1-S),y.push(_++)}b.push(y)}for(let C=0;C<r;C++)for(let y=0;y<s;y++){let S=b[y][C],N=b[y+1][C],F=b[y+1][C+1],V=b[y][C+1];c.push(S,N,V),c.push(N,F,V),T+=6}h.addGroup(g,T,0),g+=T}function x(M){let w=_,T=new me,A=new D,C=0,y=M===!0?e:n,S=M===!0?1:-1;for(let F=1;F<=r;F++)f.push(0,m*S,0),d.push(0,S,0),p.push(.5,.5),_++;let N=_;for(let F=0;F<=r;F++){let I=F/r*u+l,U=Math.cos(I),k=Math.sin(I);A.x=y*k,A.y=m*S,A.z=y*U,f.push(A.x,A.y,A.z),d.push(0,S,0),T.x=U*.5+.5,T.y=k*.5*S+.5,p.push(T.x,T.y),_++}for(let F=0;F<r;F++){let V=w+F,I=N+F;M===!0?c.push(I,I+1,V):c.push(I+1,I,V),C+=3}h.addGroup(g,C,M===!0?1:2),g+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Su=class a extends It{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};let s=[],o=[];l(r),h(i),c(),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(s.slice(),3)),this.setAttribute("uv",new st(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function l(v){let x=new D,M=new D,w=new D;for(let T=0;T<n.length;T+=3)p(n[T+0],x),p(n[T+1],M),p(n[T+2],w),u(x,M,w,v)}function u(v,x,M,w){let T=w+1,A=[];for(let C=0;C<=T;C++){A[C]=[];let y=v.clone().lerp(M,C/T),S=x.clone().lerp(M,C/T),N=T-C;for(let F=0;F<=N;F++)F===0&&C===T?A[C][F]=y:A[C][F]=y.clone().lerp(S,F/N)}for(let C=0;C<T;C++)for(let y=0;y<2*(T-C)-1;y++){let S=Math.floor(y/2);y%2===0?(d(A[C][S+1]),d(A[C+1][S]),d(A[C][S])):(d(A[C][S+1]),d(A[C+1][S+1]),d(A[C+1][S]))}}function h(v){let x=new D;for(let M=0;M<s.length;M+=3)x.x=s[M+0],x.y=s[M+1],x.z=s[M+2],x.normalize().multiplyScalar(v),s[M+0]=x.x,s[M+1]=x.y,s[M+2]=x.z}function c(){let v=new D;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];let M=m(v)/2/Math.PI+.5,w=g(v)/Math.PI+.5;o.push(M,1-w)}_(),f()}function f(){for(let v=0;v<o.length;v+=6){let x=o[v+0],M=o[v+2],w=o[v+4],T=Math.max(x,M,w),A=Math.min(x,M,w);T>.9&&A<.1&&(x<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),w<.2&&(o[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function p(v,x){let M=v*3;x.x=e[M+0],x.y=e[M+1],x.z=e[M+2]}function _(){let v=new D,x=new D,M=new D,w=new D,T=new me,A=new me,C=new me;for(let y=0,S=0;y<s.length;y+=9,S+=6){v.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),M.set(s[y+6],s[y+7],s[y+8]),T.set(o[S+0],o[S+1]),A.set(o[S+2],o[S+3]),C.set(o[S+4],o[S+5]),w.copy(v).add(x).add(M).divideScalar(3);let N=m(w);b(T,S+0,v,N),b(A,S+2,x,N),b(C,S+4,M,N)}}function b(v,x,M,w){w<0&&v.x===1&&(o[x]=v.x-1),M.x===0&&M.z===0&&(o[x]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.vertices,e.indices,e.radius,e.details)}};var _c=class a extends Su{constructor(e=1,n=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new a(e.radius,e.detail)}};var Gs=class a extends It{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:l},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let u=Math.min(o+l,Math.PI),h=0,c=[],f=new D,d=new D,p=[],_=[],b=[],m=[];for(let g=0;g<=i;g++){let v=[],x=g/i,M=0;g===0&&o===0?M=.5/n:g===i&&u===Math.PI&&(M=-.5/n);for(let w=0;w<=n;w++){let T=w/n;f.x=-e*Math.cos(r+T*s)*Math.sin(o+x*l),f.y=e*Math.cos(o+x*l),f.z=e*Math.sin(r+T*s)*Math.sin(o+x*l),_.push(f.x,f.y,f.z),d.copy(f).normalize(),b.push(d.x,d.y,d.z),m.push(T+M,1-x),v.push(h++)}c.push(v)}for(let g=0;g<i;g++)for(let v=0;v<n;v++){let x=c[g][v+1],M=c[g][v],w=c[g+1][v],T=c[g+1][v+1];(g!==0||o>0)&&p.push(x,M,T),(g!==i-1||u<Math.PI)&&p.push(M,w,T)}this.setIndex(p),this.setAttribute("position",new st(_,3)),this.setAttribute("normal",new st(b,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new a(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var bc=class extends Rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},xn=class extends In{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xp,this.normalScale=new me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vn=class extends xn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new me(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function qo(a,e,n){return!a||!n&&a.constructor===e?a:typeof e.BYTES_PER_ELEMENT=="number"?new e(a):Array.prototype.slice.call(a)}function MM(a){return ArrayBuffer.isView(a)&&!(a instanceof DataView)}function SM(a){function e(r,s){return a[r]-a[s]}let n=a.length,i=new Array(n);for(let r=0;r!==n;++r)i[r]=r;return i.sort(e),i}function Ep(a,e,n){let i=a.length,r=new a.constructor(i);for(let s=0,o=0;o!==i;++s){let l=n[s]*e;for(let u=0;u!==e;++u)r[o++]=a[l+u]}return r}function im(a,e,n,i){let r=1,s=a[0];for(;s!==void 0&&s[i]===void 0;)s=a[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),n.push.apply(n,o)),s=a[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(n,n.length)),s=a[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),n.push(o)),s=a[r++];while(s!==void 0)}var rr=class{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let n=this.parameterPositions,i=this._cachedIndex,r=n[i],s=n[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let l=i+2;;){if(r===void 0){if(e<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===l)break;if(s=r,r=n[++i],e<r)break t}o=n.length;break n}if(!(e>=s)){let l=n[1];e<l&&(i=2,s=l);for(let u=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===u)break;if(r=s,s=n[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let l=i+o>>>1;e<n[l]?o=l:i=l+1}if(r=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)n[o]=i[s+o];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Tu=class extends rr{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ts,endingEnd:Ts}}intervalChanged_(e,n,i){let r=this.parameterPositions,s=e-2,o=e+1,l=r[s],u=r[o];if(l===void 0)switch(this.getSettings_().endingStart){case ws:s=e,l=2*n-i;break;case Ko:s=r.length-2,l=n+r[s]-r[s+1];break;default:s=e,l=i}if(u===void 0)switch(this.getSettings_().endingEnd){case ws:o=e,u=2*i-n;break;case Ko:o=1,u=i+r[1]-r[0];break;default:o=e-1,u=n}let h=(i-n)*.5,c=this.valueSize;this._weightPrev=h/(n-l),this._weightNext=h/(u-i),this._offsetPrev=s*c,this._offsetNext=o*c}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,u=e*l,h=u-l,c=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,_=(i-n)/(r-n),b=_*_,m=b*_,g=-d*m+2*d*b-d*_,v=(1+d)*m+(-1.5-2*d)*b+(-.5+d)*_+1,x=(-1-p)*m+(1.5+p)*b+.5*_,M=p*m-p*b;for(let w=0;w!==l;++w)s[w]=g*o[c+w]+v*o[h+w]+x*o[u+w]+M*o[f+w];return s}},xc=class extends rr{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,u=e*l,h=u-l,c=(i-n)/(r-n),f=1-c;for(let d=0;d!==l;++d)s[d]=o[h+d]*f+o[u+d]*c;return s}},wu=class extends rr{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Wn=class{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qo(n,this.TimeBufferType),this.values=qo(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let n=e.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:qo(e.times,Array),values:qo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new wu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Tu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case Ns:n=this.InterpolantFactoryMethodDiscrete;break;case Nr:n=this.InterpolantFactoryMethodLinear;break;case El:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return Nr;case this.InterpolantFactoryMethodSmooth:return El}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){let n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>n;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let l=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*l,o*l)}return this}validate(){let e=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let l=0;l!==s;l++){let u=i[l];if(typeof u=="number"&&isNaN(u)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,u),e=!1;break}if(o!==null&&o>u){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,u,o),e=!1;break}o=u}if(r!==void 0&&MM(r))for(let l=0,u=r.length;l!==u;++l){let h=r[l];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,h),e=!1;break}}return e}optimize(){let e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===El,s=e.length-1,o=1;for(let l=1;l<s;++l){let u=!1,h=e[l],c=e[l+1];if(h!==c&&(l!==1||h!==e[0]))if(r)u=!0;else{let f=l*i,d=f-i,p=f+i;for(let _=0;_!==i;++_){let b=n[f+_];if(b!==n[d+_]||b!==n[p+_]){u=!0;break}}}if(u){if(l!==o){e[o]=e[l];let f=l*i,d=o*i;for(let p=0;p!==i;++p)n[d+p]=n[f+p]}++o}}if(s>0){e[o]=e[s];for(let l=s*i,u=o*i,h=0;h!==i;++h)n[u+h]=n[l+h];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=n.slice(0,o*i)):(this.times=e,this.values=n),this}clone(){let e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}};Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=Nr;var sr=class extends Wn{};sr.prototype.ValueTypeName="bool";sr.prototype.ValueBufferType=Array;sr.prototype.DefaultInterpolation=Ns;sr.prototype.InterpolantFactoryMethodLinear=void 0;sr.prototype.InterpolantFactoryMethodSmooth=void 0;var vc=class extends Wn{};vc.prototype.ValueTypeName="color";var Ni=class extends Wn{};Ni.prototype.ValueTypeName="number";var Au=class extends rr{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,u=(i-n)/(r-n),h=e*l;for(let c=h+l;h!==c;h+=4)en.slerpFlat(s,0,o,h-l,o,h,u);return s}},li=class extends Wn{InterpolantFactoryMethodLinear(e){return new Au(this.times,this.values,this.getValueSize(),e)}};li.prototype.ValueTypeName="quaternion";li.prototype.DefaultInterpolation=Nr;li.prototype.InterpolantFactoryMethodSmooth=void 0;var ar=class extends Wn{};ar.prototype.ValueTypeName="string";ar.prototype.ValueBufferType=Array;ar.prototype.DefaultInterpolation=Ns;ar.prototype.InterpolantFactoryMethodLinear=void 0;ar.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends Wn{};Ui.prototype.ValueTypeName="vector";var Hs=class{constructor(e,n=-1,i,r=qu){this.name=e,this.tracks=i,this.duration=n,this.blendMode=r,this.uuid=$n(),this.duration<0&&this.resetDuration()}static parse(e){let n=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,l=i.length;o!==l;++o)n.push(wM(i[o]).scale(r));let s=new this(e.name,e.duration,n,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let n=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:n,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=i.length;s!==o;++s)n.push(Wn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,n,i,r){let s=n.length,o=[];for(let l=0;l<s;l++){let u=[],h=[];u.push((l+s-1)%s,l,(l+1)%s),h.push(0,1,0);let c=SM(u);u=Ep(u,1,c),h=Ep(h,1,c),!r&&u[0]===0&&(u.push(s),h.push(h[0])),o.push(new Ni(".morphTargetInfluences["+n[l].name+"]",u,h).scale(1/i))}return new this(e,-1,o)}static findByName(e,n){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===n)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,n,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let l=0,u=e.length;l<u;l++){let h=e[l],c=h.name.match(s);if(c&&c.length>1){let f=c[1],d=r[f];d||(r[f]=d=[]),d.push(h)}}let o=[];for(let l in r)o.push(this.CreateFromMorphTargetSequence(l,r[l],n,i));return o}static parseAnimation(e,n){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(f,d,p,_,b){if(p.length!==0){let m=[],g=[];im(p,m,g,_),m.length!==0&&b.push(new f(d,m,g))}},r=[],s=e.name||"default",o=e.fps||30,l=e.blendMode,u=e.length||-1,h=e.hierarchy||[];for(let f=0;f<h.length;f++){let d=h[f].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},_;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let b=0;b<d[_].morphTargets.length;b++)p[d[_].morphTargets[b]]=-1;for(let b in p){let m=[],g=[];for(let v=0;v!==d[_].morphTargets.length;++v){let x=d[_];m.push(x.time),g.push(x.morphTarget===b?1:0)}r.push(new Ni(".morphTargetInfluence["+b+"]",m,g))}u=p.length*o}else{let p=".bones["+n[f].name+"]";i(Ui,p+".position",d,"pos",r),i(li,p+".quaternion",d,"rot",r),i(Ui,p+".scale",d,"scl",r)}}return r.length===0?null:new this(s,u,r,l)}resetDuration(){let e=this.tracks,n=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];n=Math.max(n,s.times[s.times.length-1])}return this.duration=n,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let n=0;n<this.tracks.length;n++)e=e&&this.tracks[n].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function TM(a){switch(a.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ni;case"vector":case"vector2":case"vector3":case"vector4":return Ui;case"color":return vc;case"quaternion":return li;case"bool":case"boolean":return sr;case"string":return ar}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+a)}function wM(a){if(a.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=TM(a.type);if(a.times===void 0){let n=[],i=[];im(a.keys,n,i,"value"),a.times=n,a.values=i}return e.parse!==void 0?e.parse(a):new e(a.name,a.times,a.values,a.interpolation)}var er={enabled:!1,files:{},add:function(a,e){this.enabled!==!1&&(this.files[a]=e)},get:function(a){if(this.enabled!==!1)return this.files[a]},remove:function(a){delete this.files[a]},clear:function(){this.files={}}},Eu=class{constructor(e,n,i){let r=this,s=!1,o=0,l=0,u,h=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(c){l++,s===!1&&r.onStart!==void 0&&r.onStart(c,o,l),s=!0},this.itemEnd=function(c){o++,r.onProgress!==void 0&&r.onProgress(c,o,l),o===l&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return u?u(c):c},this.setURLModifier=function(c){return u=c,this},this.addHandler=function(c,f){return h.push(c,f),this},this.removeHandler=function(c){let f=h.indexOf(c);return f!==-1&&h.splice(f,2),this},this.getHandler=function(c){for(let f=0,d=h.length;f<d;f+=2){let p=h[f],_=h[f+1];if(p.global&&(p.lastIndex=0),p.test(c))return _}return null}}},AM=new Eu,ui=class{constructor(e){this.manager=e!==void 0?e:AM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ui.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ei={},Ru=class extends Error{constructor(e,n){super(e),this.response=n}},Vs=class extends ui{constructor(e){super(e)}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=er.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(s),this.manager.itemEnd(e)},0),s;if(Ei[e]!==void 0){Ei[e].push({onLoad:n,onProgress:i,onError:r});return}Ei[e]=[],Ei[e].push({onLoad:n,onProgress:i,onError:r});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),l=this.mimeType,u=this.responseType;fetch(o).then(h=>{if(h.status===200||h.status===0){if(h.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||h.body===void 0||h.body.getReader===void 0)return h;let c=Ei[e],f=h.body.getReader(),d=h.headers.get("Content-Length")||h.headers.get("X-File-Size"),p=d?parseInt(d):0,_=p!==0,b=0,m=new ReadableStream({start(g){v();function v(){f.read().then(({done:x,value:M})=>{if(x)g.close();else{b+=M.byteLength;let w=new ProgressEvent("progress",{lengthComputable:_,loaded:b,total:p});for(let T=0,A=c.length;T<A;T++){let C=c[T];C.onProgress&&C.onProgress(w)}g.enqueue(M),v()}})}}});return new Response(m)}else throw new Ru(`fetch for "${h.url}" responded with ${h.status}: ${h.statusText}`,h)}).then(h=>{switch(u){case"arraybuffer":return h.arrayBuffer();case"blob":return h.blob();case"document":return h.text().then(c=>new DOMParser().parseFromString(c,l));case"json":return h.json();default:if(l===void 0)return h.text();{let f=/charset="?([^;"\s]*)"?/i.exec(l),d=f&&f[1]?f[1].toLowerCase():void 0,p=new TextDecoder(d);return h.arrayBuffer().then(_=>p.decode(_))}}}).then(h=>{er.add(e,h);let c=Ei[e];delete Ei[e];for(let f=0,d=c.length;f<d;f++){let p=c[f];p.onLoad&&p.onLoad(h)}}).catch(h=>{let c=Ei[e];if(c===void 0)throw this.manager.itemError(e),h;delete Ei[e];for(let f=0,d=c.length;f<d;f++){let p=c[f];p.onError&&p.onError(h)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Cu=class extends ui{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=er.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;let l=Pa("img");function u(){c(),er.add(e,this),n&&n(this),s.manager.itemEnd(e)}function h(f){c(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function c(){l.removeEventListener("load",u,!1),l.removeEventListener("error",h,!1)}return l.addEventListener("load",u,!1),l.addEventListener("error",h,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),s.manager.itemStart(e),l.src=e,l}};var yc=class extends ui{constructor(e){super(e)}load(e,n,i,r){let s=this,o=new dc,l=new Vs(this.manager);return l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setPath(this.path),l.setWithCredentials(s.withCredentials),l.load(e,function(u){let h;try{h=s.parse(u)}catch(c){if(r!==void 0)r(c);else{console.error(c);return}}h.image!==void 0?o.image=h.image:h.data!==void 0&&(o.image.width=h.width,o.image.height=h.height,o.image.data=h.data),o.wrapS=h.wrapS!==void 0?h.wrapS:hn,o.wrapT=h.wrapT!==void 0?h.wrapT:hn,o.magFilter=h.magFilter!==void 0?h.magFilter:wt,o.minFilter=h.minFilter!==void 0?h.minFilter:wt,o.anisotropy=h.anisotropy!==void 0?h.anisotropy:1,h.colorSpace!==void 0?o.colorSpace=h.colorSpace:h.encoding!==void 0&&(o.encoding=h.encoding),h.flipY!==void 0&&(o.flipY=h.flipY),h.format!==void 0&&(o.format=h.format),h.type!==void 0&&(o.type=h.type),h.mipmaps!==void 0&&(o.mipmaps=h.mipmaps,o.minFilter=Di),h.mipmapCount===1&&(o.minFilter=wt),h.generateMipmaps!==void 0&&(o.generateMipmaps=h.generateMipmaps),o.needsUpdate=!0,n&&n(o,h)},i,r),o}},Ws=class extends ui{constructor(e){super(e)}load(e,n,i,r){let s=new qt,o=new Cu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(l){s.image=l,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}},Xs=class extends gt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}},Mc=class extends Xs{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new oe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}},$l=new Ae,Rp=new D,Cp=new D,Ga=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new me(512,512),this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new me(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let n=this.camera,i=this.matrix;Rp.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rp),Cp.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Cp),n.updateMatrixWorld(),$l.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($l),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply($l)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Pu=class extends Ga{constructor(){super(new Ot(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let n=this.camera,i=Us*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Sc=class extends Xs{constructor(e,n,i=0,r=Math.PI/3,s=0,o=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Pu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Pp=new Ae,Ma=new D,eu=new D,Lu=class extends Ga{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new me(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,n=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Ma.setFromMatrixPosition(e.matrixWorld),i.position.copy(Ma),eu.copy(i.position),eu.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(eu),i.updateMatrixWorld(),r.makeTranslation(-Ma.x,-Ma.y,-Ma.z),Pp.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pp)}},Fi=class extends Xs{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Lu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Iu=class extends Ga{constructor(){super(new ir(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zr=class extends Xs{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Iu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var or=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let n="";for(let i=0,r=e.length;i<r;i++)n+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(n))}catch{return n}}static extractUrlBase(e){let n=e.lastIndexOf("/");return n===-1?"./":e.slice(0,n+1)}static resolveURL(e,n){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(n)&&/^\//.test(e)&&(n=n.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:n+e)}};var Tc=class extends ui{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=er.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(h=>{n&&n(h),s.manager.itemEnd(e)}).catch(h=>{r&&r(h)});return}return setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o}let l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader;let u=fetch(e,l).then(function(h){return h.blob()}).then(function(h){return createImageBitmap(h,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(h){return er.add(e,h),n&&n(h),s.manager.itemEnd(e),h}).catch(function(h){r&&r(h),er.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});er.add(e,u),s.manager.itemStart(e)}};var wc=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Lp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let n=Lp();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}};function Lp(){return(typeof performance=="undefined"?Date:performance).now()}var Du=class{constructor(e,n,i){this.binding=e,this.valueSize=i;let r,s,o;switch(n){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,n){let i=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let l=0;l!==r;++l)i[s+l]=i[l];o=n}else{o+=n;let l=n/o;this._mixBufferRegion(i,s,0,l,r)}this.cumulativeWeight=o}accumulateAdditive(e){let n=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(n,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let n=this.valueSize,i=this.buffer,r=e*n+n,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,l=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let u=n*this._origIndex;this._mixBufferRegion(i,r,u,1-s,n)}o>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*n,1,n);for(let u=n,h=n+n;u!==h;++u)if(i[u]!==i[u+n]){l.setValue(i,r);break}}saveOriginalState(){let e=this.binding,n=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(n,r);for(let s=i,o=r;s!==o;++s)n[s]=n[r+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,n=e+this.valueSize;for(let i=e;i<n;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,n=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[n+i]=this.buffer[e+i]}_select(e,n,i,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[n+o]=e[i+o]}_slerp(e,n,i,r){en.slerpFlat(e,n,e,n,e,i,r)}_slerpAdditive(e,n,i,r,s){let o=this._workIndex*s;en.multiplyQuaternionsFlat(e,o,e,n,e,i),en.slerpFlat(e,n,e,n,e,o,r)}_lerp(e,n,i,r,s){let o=1-r;for(let l=0;l!==s;++l){let u=n+l;e[u]=e[u]*o+e[i+l]*r}}_lerpAdditive(e,n,i,r,s){for(let o=0;o!==s;++o){let l=n+o;e[l]=e[l]+e[i+o]*r}}},Ju="\\[\\]\\.:\\/",EM=new RegExp("["+Ju+"]","g"),Zu="[^"+Ju+"]",RM="[^"+Ju.replace("\\.","")+"]",CM=/((?:WC+[\/:])*)/.source.replace("WC",Zu),PM=/(WCOD+)?/.source.replace("WCOD",RM),LM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zu),IM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zu),DM=new RegExp("^"+CM+PM+LM+IM+"$"),OM=["material","materials","bones","map"],Ou=class{constructor(e,n,i){let r=i||nt.parseTrackName(n);this._targetGroup=e,this._bindings=e.subscribe_(n,r)}getValue(e,n){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,n)}setValue(e,n){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,n)}bind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].bind()}unbind(){let e=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=e.length;n!==i;++n)e[n].unbind()}},nt=class a{constructor(e,n,i){this.path=n,this.parsedPath=i||a.parseTrackName(n),this.node=a.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new a.Composite(e,n,i):new a(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(EM,"")}static parseTrackName(e){let n=DM.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);OM.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let l=s[o];if(l.name===n||l.uuid===n)return l;let u=i(l.children);if(u)return u}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[n++]=i[r]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,r=n.propertyName,s=n.propertyIndex;if(e||(e=a.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===h){h=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(h!==void 0){if(e[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let o=e[r];if(o===void 0){let h=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}u=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(u=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};nt.Composite=Ou;nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray];nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Nu=class{constructor(e,n,i=null,r=n.blendMode){this._mixer=e,this._clip=n,this._localRoot=i,this.blendMode=r;let s=n.tracks,o=s.length,l=new Array(o),u={endingStart:Ts,endingEnd:Ts};for(let h=0;h!==o;++h){let c=s[h].createInterpolant(null);l[h]=c,c.settings=u}this._interpolantSettings=u,this._interpolants=l,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Q_,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,n){return this.loop=e,this.repetitions=n,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,n,i){if(e.fadeOut(n),this.fadeIn(n),i){let r=this._clip.duration,s=e._clip.duration,o=s/r,l=r/s;e.warp(1,o,n),this.warp(l,1,n)}return this}crossFadeTo(e,n,i){return e.crossFadeFrom(this,n,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,n,i){let r=this._mixer,s=r.time,o=this.timeScale,l=this._timeScaleInterpolant;l===null&&(l=r._lendControlInterpolant(),this._timeScaleInterpolant=l);let u=l.parameterPositions,h=l.sampleValues;return u[0]=s,u[1]=s+i,h[0]=e/o,h[1]=n/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,n,i,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let u=(e-s)*i;u<0||i===0?n=0:(this._startTime=null,n=i*u)}n*=this._updateTimeScale(e);let o=this._updateTime(n),l=this._updateWeight(e);if(l>0){let u=this._interpolants,h=this._propertyBindings;switch(this.blendMode){case e0:for(let c=0,f=u.length;c!==f;++c)u[c].evaluate(o),h[c].accumulateAdditive(l);break;case qu:default:for(let c=0,f=u.length;c!==f;++c)u[c].evaluate(o),h[c].accumulate(r,l)}}}_updateWeight(e){let n=0;if(this.enabled){n=this.weight;let i=this._weightInterpolant;if(i!==null){let r=i.evaluate(e)[0];n*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=n,n}_updateTimeScale(e){let n=0;if(!this.paused){n=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let r=i.evaluate(e)[0];n*=r,e>i.parameterPositions[1]&&(this.stopWarping(),n===0?this.paused=!0:this.timeScale=n)}}return this._effectiveTimeScale=n,n}_updateTime(e){let n=this._clip.duration,i=this.loop,r=this.time+e,s=this._loopCount,o=i===$_;if(e===0)return s===-1?r:o&&(s&1)===1?n-r:r;if(i===Xu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=n)r=n;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=n||r<0){let l=Math.floor(r/n);r-=n*l,s+=Math.abs(l);let u=this.repetitions-s;if(u<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?n:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(u===1){let h=e<0;this._setEndings(h,!h,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:l})}}else this.time=r;if(o&&(s&1)===1)return n-r}return r}_setEndings(e,n,i){let r=this._interpolantSettings;i?(r.endingStart=ws,r.endingEnd=ws):(e?r.endingStart=this.zeroSlopeAtStart?ws:Ts:r.endingStart=Ko,n?r.endingEnd=this.zeroSlopeAtEnd?ws:Ts:r.endingEnd=Ko)}_scheduleFading(e,n,i){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let l=o.parameterPositions,u=o.sampleValues;return l[0]=s,u[0]=n,l[1]=s+e,u[1]=i,this}},NM=new Float32Array(1),Ac=class extends Oi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,n){let i=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,l=e._interpolants,u=i.uuid,h=this._bindingsByRootAndName,c=h[u];c===void 0&&(c={},h[u]=c);for(let f=0;f!==s;++f){let d=r[f],p=d.name,_=c[p];if(_!==void 0)++_.referenceCount,o[f]=_;else{if(_=o[f],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,u,p));continue}let b=n&&n._propertyBindings[f].binding.parsedPath;_=new Du(nt.create(i,p,b),d.ValueTypeName,d.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,u,p),o[f]=_}l[f].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,i)}let n=e._propertyBindings;for(let i=0,r=n.length;i!==r;++i){let s=n[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let n=e._propertyBindings;for(let i=0,r=n.length;i!==r;++i){let s=n[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let n=e._cacheIndex;return n!==null&&n<this._nActiveActions}_addInactiveAction(e,n,i){let r=this._actions,s=this._actionsByClip,o=s[n];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[n]=o;else{let l=o.knownActions;e._byClipCacheIndex=l.length,l.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){let n=this._actions,i=n[n.length-1],r=e._cacheIndex;i._cacheIndex=r,n[r]=i,n.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,l=o[s],u=l.knownActions,h=u[u.length-1],c=e._byClipCacheIndex;h._byClipCacheIndex=c,u[c]=h,u.pop(),e._byClipCacheIndex=null;let f=l.actionByRoot,d=(e._localRoot||this._root).uuid;delete f[d],u.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let n=e._propertyBindings;for(let i=0,r=n.length;i!==r;++i){let s=n[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let n=this._actions,i=e._cacheIndex,r=this._nActiveActions++,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_takeBackAction(e){let n=this._actions,i=e._cacheIndex,r=--this._nActiveActions,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_addInactiveBinding(e,n,i){let r=this._bindingsByRootAndName,s=this._bindings,o=r[n];o===void 0&&(o={},r[n]=o),o[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let n=this._bindings,i=e.binding,r=i.rootNode.uuid,s=i.path,o=this._bindingsByRootAndName,l=o[r],u=n[n.length-1],h=e._cacheIndex;u._cacheIndex=h,n[h]=u,n.pop(),delete l[s],Object.keys(l).length===0&&delete o[r]}_lendBinding(e){let n=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_takeBackBinding(e){let n=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,s=n[r];e._cacheIndex=r,n[r]=e,s._cacheIndex=i,n[i]=s}_lendControlInterpolant(){let e=this._controlInterpolants,n=this._nActiveControlInterpolants++,i=e[n];return i===void 0&&(i=new xc(new Float32Array(2),new Float32Array(2),1,NM),i.__cacheIndex=n,e[n]=i),i}_takeBackControlInterpolant(e){let n=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=n[r];e.__cacheIndex=r,n[r]=e,s.__cacheIndex=i,n[i]=s}clipAction(e,n,i){let r=n||this._root,s=r.uuid,o=typeof e=="string"?Hs.findByName(r,e):e,l=o!==null?o.uuid:e,u=this._actionsByClip[l],h=null;if(i===void 0&&(o!==null?i=o.blendMode:i=qu),u!==void 0){let f=u.actionByRoot[s];if(f!==void 0&&f.blendMode===i)return f;h=u.knownActions[0],o===null&&(o=h._clip)}if(o===null)return null;let c=new Nu(this,o,n,i);return this._bindAction(c,h),this._addInactiveAction(c,l,s),c}existingAction(e,n){let i=n||this._root,r=i.uuid,s=typeof e=="string"?Hs.findByName(i,e):e,o=s?s.uuid:e,l=this._actionsByClip[o];return l!==void 0&&l.actionByRoot[r]||null}stopAllAction(){let e=this._actions,n=this._nActiveActions;for(let i=n-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let n=this._actions,i=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let h=0;h!==i;++h)n[h]._update(r,e,s,o);let l=this._bindings,u=this._nActiveBindings;for(let h=0;h!==u;++h)l[h].apply(o);return this}setTime(e){this.time=0;for(let n=0;n<this._actions.length;n++)this._actions[n].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let n=this._actions,i=e.uuid,r=this._actionsByClip,s=r[i];if(s!==void 0){let o=s.knownActions;for(let l=0,u=o.length;l!==u;++l){let h=o[l];this._deactivateAction(h);let c=h._cacheIndex,f=n[n.length-1];h._cacheIndex=null,h._byClipCacheIndex=null,f._cacheIndex=c,n[c]=f,n.pop(),this._removeInactiveBindingsForAction(h)}delete r[i]}}uncacheRoot(e){let n=e.uuid,i=this._actionsByClip;for(let o in i){let l=i[o].actionByRoot,u=l[n];u!==void 0&&(this._deactivateAction(u),this._removeInactiveAction(u))}let r=this._bindingsByRootAndName,s=r[n];if(s!==void 0)for(let o in s){let l=s[o];l.restoreOriginalState(),this._removeInactiveBinding(l)}}uncacheAction(e,n){let i=this.existingAction(e,n);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var Ec=class{constructor(e,n,i=0,r=1/0){this.ray=new Ur(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new La,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,i=[]){return Uu(e,this,i,n),i.sort(Ip),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Uu(e[r],this,i,n);return i.sort(Ip),i}};function Ip(a,e){return a.distance-e.distance}function Uu(a,e,n,i){if(a.layers.test(e.layers)&&a.raycast(e,n),i===!0){let r=a.children;for(let s=0,o=r.length;s<o;s++)Uu(r[s],e,n,!0)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fu}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fu);function Qu(a,e){if(e===Vp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),a;if(e===Va||e===Cc){let n=a.getIndex();if(n===null){let o=[],l=a.getAttribute("position");if(l!==void 0){for(let u=0;u<l.count;u++)o.push(u);a.setIndex(o),n=a.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),a}let i=n.count-2,r=[];if(e===Va)for(let o=1;o<=i;o++)r.push(n.getX(0)),r.push(n.getX(o)),r.push(n.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(n.getX(o)),r.push(n.getX(o+1)),r.push(n.getX(o+2))):(r.push(n.getX(o+2)),r.push(n.getX(o+1)),r.push(n.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=a.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),a}var Ic=class extends ui{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(n){return new sh(n)}),this.register(function(n){return new ph(n)}),this.register(function(n){return new mh(n)}),this.register(function(n){return new gh(n)}),this.register(function(n){return new oh(n)}),this.register(function(n){return new ch(n)}),this.register(function(n){return new lh(n)}),this.register(function(n){return new uh(n)}),this.register(function(n){return new rh(n)}),this.register(function(n){return new hh(n)}),this.register(function(n){return new ah(n)}),this.register(function(n){return new dh(n)}),this.register(function(n){return new fh(n)}),this.register(function(n){return new nh(n)}),this.register(function(n){return new _h(n)}),this.register(function(n){return new bh(n)})}load(e,n,i,r){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let h=or.extractUrlBase(e);o=or.resolveURL(h,this.path)}else o=or.extractUrlBase(e);this.manager.itemStart(e);let l=function(h){r?r(h):console.error(h),s.manager.itemError(e),s.manager.itemEnd(e)},u=new Vs(this.manager);u.setPath(this.path),u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setWithCredentials(this.withCredentials),u.load(e,function(h){try{s.parse(h,o,function(c){n(c),s.manager.itemEnd(e)},l)}catch(c){l(c)}},i,l)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,n,i,r){let s,o={},l={},u=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(u.decode(new Uint8Array(e,0,4))===cm){try{o[Ye.KHR_BINARY_GLTF]=new xh(e)}catch(f){r&&r(f);return}s=JSON.parse(o[Ye.KHR_BINARY_GLTF].content)}else s=JSON.parse(u.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let h=new Ah(s,{path:n||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});h.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){let f=this.pluginCallbacks[c](h);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),l[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let c=0;c<s.extensionsUsed.length;++c){let f=s.extensionsUsed[c],d=s.extensionsRequired||[];switch(f){case Ye.KHR_MATERIALS_UNLIT:o[f]=new ih;break;case Ye.KHR_DRACO_MESH_COMPRESSION:o[f]=new vh(s,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:o[f]=new yh;break;case Ye.KHR_MESH_QUANTIZATION:o[f]=new Mh;break;default:d.indexOf(f)>=0&&l[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}h.setExtensions(o),h.setPlugins(l),h.parse(i,r)}parseAsync(e,n){let i=this;return new Promise(function(r,s){i.parse(e,n,r,s)})}};function FM(){let a={};return{get:function(e){return a[e]},add:function(e,n){a[e]=n},remove:function(e){delete a[e]},removeAll:function(){a={}}}}var Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},nh=class{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,n=this.parser.json.nodes||[];for(let i=0,r=n.length;i<r;i++){let s=n[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let n=this.parser,i="light:"+e,r=n.cache.get(i);if(r)return r;let s=n.json,u=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],h,c=new oe(16777215);u.color!==void 0&&c.setRGB(u.color[0],u.color[1],u.color[2],Et);let f=u.range!==void 0?u.range:0;switch(u.type){case"directional":h=new zr(c),h.target.position.set(0,0,-1),h.add(h.target);break;case"point":h=new Fi(c),h.distance=f;break;case"spot":h=new Sc(c),h.distance=f,u.spot=u.spot||{},u.spot.innerConeAngle=u.spot.innerConeAngle!==void 0?u.spot.innerConeAngle:0,u.spot.outerConeAngle=u.spot.outerConeAngle!==void 0?u.spot.outerConeAngle:Math.PI/4,h.angle=u.spot.outerConeAngle,h.penumbra=1-u.spot.innerConeAngle/u.spot.outerConeAngle,h.target.position.set(0,0,-1),h.add(h.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+u.type)}return h.position.set(0,0,0),h.decay=2,ur(h,u),u.intensity!==void 0&&(h.intensity=u.intensity),h.name=n.createUniqueName(u.name||"light_"+e),r=Promise.resolve(h),n.cache.add(i,r),r}getDependency(e,n){if(e==="light")return this._loadLight(n)}createNodeAttachment(e){let n=this,i=this.parser,s=i.json.nodes[e],l=(s.extensions&&s.extensions[this.name]||{}).light;return l===void 0?null:this._loadLight(l).then(function(u){return i._getNodeRef(n.cache,l,u)})}},ih=class{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return _t}extendParams(e,n,i){let r=[];e.color=new oe(1,1,1),e.opacity=1;let s=n.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Et),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,it))}return Promise.all(r)}},rh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,n){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(n.emissiveIntensity=s),Promise.resolve()}},sh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(n.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(i.assignTexture(n,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(n.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(i.assignTexture(n,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(i.assignTexture(n,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let l=o.clearcoatNormalTexture.scale;n.clearcoatNormalScale=new me(l,l)}return Promise.all(s)}},ah=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(n.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(i.assignTexture(n,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(n.iridescenceIOR=o.iridescenceIor),n.iridescenceThicknessRange===void 0&&(n.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(i.assignTexture(n,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}},oh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];n.sheenColor=new oe(0,0,0),n.sheenRoughness=0,n.sheen=1;let o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){let l=o.sheenColorFactor;n.sheenColor.setRGB(l[0],l[1],l[2],Et)}return o.sheenRoughnessFactor!==void 0&&(n.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(i.assignTexture(n,"sheenColorMap",o.sheenColorTexture,it)),o.sheenRoughnessTexture!==void 0&&s.push(i.assignTexture(n,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}},ch=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(n.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(i.assignTexture(n,"transmissionMap",o.transmissionTexture)),Promise.all(s)}},lh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];n.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(i.assignTexture(n,"thicknessMap",o.thicknessTexture)),n.attenuationDistance=o.attenuationDistance||1/0;let l=o.attenuationColor||[1,1,1];return n.attenuationColor=new oe().setRGB(l[0],l[1],l[2],Et),Promise.all(s)}},uh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return n.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},hh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];n.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(i.assignTexture(n,"specularIntensityMap",o.specularTexture));let l=o.specularColorFactor||[1,1,1];return n.specularColor=new oe().setRGB(l[0],l[1],l[2],Et),o.specularColorTexture!==void 0&&s.push(i.assignTexture(n,"specularColorMap",o.specularColorTexture,it)),Promise.all(s)}},fh=class{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return n.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(i.assignTexture(n,"bumpMap",o.bumpTexture)),Promise.all(s)}},dh=class{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:Vn}extendMaterialParams(e,n){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(n.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(n.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(i.assignTexture(n,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}},ph=class{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){let n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],o=n.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return n.loadTextureImage(e,s.source,o)}},mh=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let n=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[n])return null;let o=s.extensions[n],l=r.images[o.source],u=i.textureLoader;if(l.uri){let h=i.options.manager.getHandler(l.uri);h!==null&&(u=h)}return this.detectSupport().then(function(h){if(h)return i.loadTextureImage(e,o.source,u);if(r.extensionsRequired&&r.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let n=new Image;n.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",n.onload=n.onerror=function(){e(n.height===1)}})),this.isSupported}},gh=class{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let n=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[n])return null;let o=s.extensions[n],l=r.images[o.source],u=i.textureLoader;if(l.uri){let h=i.options.manager.getHandler(l.uri);h!==null&&(u=h)}return this.detectSupport().then(function(h){if(h)return i.loadTextureImage(e,o.source,u);if(r.extensionsRequired&&r.extensionsRequired.indexOf(n)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let n=new Image;n.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",n.onload=n.onerror=function(){e(n.height===1)}})),this.isSupported}},_h=class{constructor(e){this.name=Ye.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let n=this.parser.json,i=n.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(l){let u=r.byteOffset||0,h=r.byteLength||0,c=r.count,f=r.byteStride,d=new Uint8Array(l,u,h);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(c,f,d,r.mode,r.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(c*f);return o.decodeGltfBuffer(new Uint8Array(p),c,f,d,r.mode,r.filter),p})})}else return null}},bh=class{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let n=this.parser.json,i=n.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=n.meshes[i.mesh];for(let h of r.primitives)if(h.mode!==Xn.TRIANGLES&&h.mode!==Xn.TRIANGLE_STRIP&&h.mode!==Xn.TRIANGLE_FAN&&h.mode!==void 0)return null;let o=i.extensions[this.name].attributes,l=[],u={};for(let h in o)l.push(this.parser.getDependency("accessor",o[h]).then(c=>(u[h]=c,u[h])));return l.length<1?null:(l.push(this.parser.createNodeMesh(e)),Promise.all(l).then(h=>{let c=h.pop(),f=c.isGroup?c.children:[c],d=h[0].count,p=[];for(let _ of f){let b=new Ae,m=new D,g=new en,v=new D(1,1,1),x=new kr(_.geometry,_.material,d);for(let M=0;M<d;M++)u.TRANSLATION&&m.fromBufferAttribute(u.TRANSLATION,M),u.ROTATION&&g.fromBufferAttribute(u.ROTATION,M),u.SCALE&&v.fromBufferAttribute(u.SCALE,M),x.setMatrixAt(M,b.compose(m,g,v));for(let M in u)if(M==="_COLOR_0"){let w=u[M];x.instanceColor=new Fr(w.array,w.itemSize,w.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&_.geometry.setAttribute(M,u[M]);gt.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),p.push(x)}return c.isGroup?(c.clear(),c.add(...p),c):p[0]}))}},cm="glTF",Xa=12,rm={JSON:1313821514,BIN:5130562},xh=class{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;let n=new DataView(e,0,Xa),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:n.getUint32(4,!0),length:n.getUint32(8,!0)},this.header.magic!==cm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Xa,s=new DataView(e,Xa),o=0;for(;o<r;){let l=s.getUint32(o,!0);o+=4;let u=s.getUint32(o,!0);if(o+=4,u===rm.JSON){let h=new Uint8Array(e,Xa+o,l);this.content=i.decode(h)}else if(u===rm.BIN){let h=Xa+o;this.body=e.slice(h,h+l)}o+=l}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},vh=class{constructor(e,n){if(!n)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=n,this.dracoLoader.preload()}decodePrimitive(e,n){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,l={},u={},h={};for(let c in o){let f=Th[c]||c.toLowerCase();l[f]=o[c]}for(let c in e.attributes){let f=Th[c]||c.toLowerCase();if(o[c]!==void 0){let d=i.accessors[e.attributes[c]],p=Ys[d.componentType];h[f]=p.name,u[f]=d.normalized===!0}}return n.getDependency("bufferView",s).then(function(c){return new Promise(function(f,d){r.decodeDracoFile(c,function(p){for(let _ in p.attributes){let b=p.attributes[_],m=u[_];m!==void 0&&(b.normalized=m)}f(p)},l,h,Et,d)})})}},yh=class{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,n){return(n.texCoord===void 0||n.texCoord===e.channel)&&n.offset===void 0&&n.rotation===void 0&&n.scale===void 0||(e=e.clone(),n.texCoord!==void 0&&(e.channel=n.texCoord),n.offset!==void 0&&e.offset.fromArray(n.offset),n.rotation!==void 0&&(e.rotation=n.rotation),n.scale!==void 0&&e.repeat.fromArray(n.scale),e.needsUpdate=!0),e}},Mh=class{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}},Dc=class extends rr{constructor(e,n,i,r){super(e,n,i,r)}copySampleValue_(e){let n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)n[o]=i[s+o];return n}interpolate_(e,n,i,r){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,u=l*2,h=l*3,c=r-n,f=(i-n)/c,d=f*f,p=d*f,_=e*h,b=_-h,m=-2*p+3*d,g=p-d,v=1-m,x=g-d+f;for(let M=0;M!==l;M++){let w=o[b+M+l],T=o[b+M+u]*c,A=o[_+M+l],C=o[_+M]*c;s[M]=v*w+x*T+m*A+g*C}return s}},kM=new en,Sh=class extends Dc{interpolate_(e,n,i,r){let s=super.interpolate_(e,n,i,r);return kM.fromArray(s).normalize().toArray(s),s}},Xn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ys={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sm={9728:Dt,9729:wt,9984:jo,9985:Vu,9986:Sa,9987:Di},am={33071:hn,33648:Ca,10497:Ii},$u={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Th={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},lr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},BM={CUBICSPLINE:void 0,LINEAR:Nr,STEP:Ns},eh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function zM(a){return a.DefaultMaterial===void 0&&(a.DefaultMaterial=new xn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:oi})),a.DefaultMaterial}function Gr(a,e,n){for(let i in n.extensions)a[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=n.extensions[i])}function ur(a,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(a.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function GM(a,e,n){let i=!1,r=!1,s=!1;for(let h=0,c=e.length;h<c;h++){let f=e[h];if(f.POSITION!==void 0&&(i=!0),f.NORMAL!==void 0&&(r=!0),f.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(a);let o=[],l=[],u=[];for(let h=0,c=e.length;h<c;h++){let f=e[h];if(i){let d=f.POSITION!==void 0?n.getDependency("accessor",f.POSITION):a.attributes.position;o.push(d)}if(r){let d=f.NORMAL!==void 0?n.getDependency("accessor",f.NORMAL):a.attributes.normal;l.push(d)}if(s){let d=f.COLOR_0!==void 0?n.getDependency("accessor",f.COLOR_0):a.attributes.color;u.push(d)}}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(u)]).then(function(h){let c=h[0],f=h[1],d=h[2];return i&&(a.morphAttributes.position=c),r&&(a.morphAttributes.normal=f),s&&(a.morphAttributes.color=d),a.morphTargetsRelative=!0,a})}function HM(a,e){if(a.updateMorphTargets(),e.weights!==void 0)for(let n=0,i=e.weights.length;n<i;n++)a.morphTargetInfluences[n]=e.weights[n];if(e.extras&&Array.isArray(e.extras.targetNames)){let n=e.extras.targetNames;if(a.morphTargetInfluences.length===n.length){a.morphTargetDictionary={};for(let i=0,r=n.length;i<r;i++)a.morphTargetDictionary[n[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function VM(a){let e,n=a.extensions&&a.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(n?e="draco:"+n.bufferView+":"+n.indices+":"+th(n.attributes):e=a.indices+":"+th(a.attributes)+":"+a.mode,a.targets!==void 0)for(let i=0,r=a.targets.length;i<r;i++)e+=":"+th(a.targets[i]);return e}function th(a){let e="",n=Object.keys(a).sort();for(let i=0,r=n.length;i<r;i++)e+=n[i]+":"+a[n[i]]+";";return e}function wh(a){switch(a){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function WM(a){return a.search(/\.jpe?g($|\?)/i)>0||a.search(/^data\:image\/jpeg/)===0?"image/jpeg":a.search(/\.webp($|\?)/i)>0||a.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var XM=new Ae,Ah=class{constructor(e={},n={}){this.json=e,this.extensions={},this.plugins={},this.options=n,this.cache=new FM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=!1,s=-1;typeof navigator!="undefined"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,s=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||i||r&&s<98?this.textureLoader=new Ws(this.options.manager):this.textureLoader=new Tc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,n){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){let l={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return Gr(s,l,r),ur(l,r),Promise.all(i._invokeAll(function(u){return u.afterRoot&&u.afterRoot(l)})).then(function(){e(l)})}).catch(n)}_markDefs(){let e=this.json.nodes||[],n=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=n.length;r<s;r++){let o=n[r].joints;for(let l=0,u=o.length;l<u;l++)e[o[l]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,n){n!==void 0&&(e.refs[n]===void 0&&(e.refs[n]=e.uses[n]=0),e.refs[n]++)}_getNodeRef(e,n,i){if(e.refs[n]<=1)return i;let r=i.clone(),s=(o,l)=>{let u=this.associations.get(o);u!=null&&this.associations.set(l,u);for(let[h,c]of o.children.entries())s(c,l.children[h])};return s(i,r),r.name+="_instance_"+e.uses[n]++,r}_invokeOne(e){let n=Object.values(this.plugins);n.push(this);for(let i=0;i<n.length;i++){let r=e(n[i]);if(r)return r}return null}_invokeAll(e){let n=Object.values(this.plugins);n.unshift(this);let i=[];for(let r=0;r<n.length;r++){let s=e(n[r]);s&&i.push(s)}return i}getDependency(e,n){let i=e+":"+n,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(n);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(n)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(n)});break;case"accessor":r=this.loadAccessor(n);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(n)});break;case"buffer":r=this.loadBuffer(n);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(n)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(n)});break;case"skin":r=this.loadSkin(n);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(n)});break;case"camera":r=this.loadCamera(n);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,n)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let n=this.cache.get(e);if(!n){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];n=Promise.all(r.map(function(s,o){return i.getDependency(e,o)})),this.cache.add(e,n)}return n}loadBuffer(e){let n=this.json.buffers[e],i=this.fileLoader;if(n.type&&n.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+n.type+" buffer type is not supported.");if(n.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,o){i.load(or.resolveURL(n.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+n.uri+'".'))})})}loadBufferView(e){let n=this.json.bufferViews[e];return this.getDependency("buffer",n.buffer).then(function(i){let r=n.byteLength||0,s=n.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let n=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let o=$u[r.type],l=Ys[r.componentType],u=r.normalized===!0,h=new l(r.count*o);return Promise.resolve(new At(h,o,u))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){let l=o[0],u=$u[r.type],h=Ys[r.componentType],c=h.BYTES_PER_ELEMENT,f=c*u,d=r.byteOffset||0,p=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,_=r.normalized===!0,b,m;if(p&&p!==f){let g=Math.floor(d/p),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+g+":"+r.count,x=n.cache.get(v);x||(b=new h(l,g*p,r.count*p/c),x=new Oa(b,p/c),n.cache.add(v,x)),m=new Na(x,u,d%p/c,_)}else l===null?b=new h(r.count*u):b=new h(l,d,r.count*u),m=new At(b,u,_);if(r.sparse!==void 0){let g=$u.SCALAR,v=Ys[r.sparse.indices.componentType],x=r.sparse.indices.byteOffset||0,M=r.sparse.values.byteOffset||0,w=new v(o[1],x,r.sparse.count*g),T=new h(o[2],M,r.sparse.count*u);l!==null&&(m=new At(m.array.slice(),m.itemSize,m.normalized));for(let A=0,C=w.length;A<C;A++){let y=w[A];if(m.setX(y,T[A*u]),u>=2&&m.setY(y,T[A*u+1]),u>=3&&m.setZ(y,T[A*u+2]),u>=4&&m.setW(y,T[A*u+3]),u>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let n=this.json,i=this.options,s=n.textures[e].source,o=n.images[s],l=this.textureLoader;if(o.uri){let u=i.manager.getHandler(o.uri);u!==null&&(l=u)}return this.loadTextureImage(e,s,l)}loadTextureImage(e,n,i){let r=this,s=this.json,o=s.textures[e],l=s.images[n],u=(l.uri||l.bufferView)+":"+o.sampler;if(this.textureCache[u])return this.textureCache[u];let h=this.loadImageSource(n,i).then(function(c){c.flipY=!1,c.name=o.name||l.name||"",c.name===""&&typeof l.uri=="string"&&l.uri.startsWith("data:image/")===!1&&(c.name=l.uri);let d=(s.samplers||{})[o.sampler]||{};return c.magFilter=sm[d.magFilter]||wt,c.minFilter=sm[d.minFilter]||Di,c.wrapS=am[d.wrapS]||Ii,c.wrapT=am[d.wrapT]||Ii,r.associations.set(c,{textures:e}),c}).catch(function(){return null});return this.textureCache[u]=h,h}loadImageSource(e,n){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let o=r.images[e],l=self.URL||self.webkitURL,u=o.uri||"",h=!1;if(o.bufferView!==void 0)u=i.getDependency("bufferView",o.bufferView).then(function(f){h=!0;let d=new Blob([f],{type:o.mimeType});return u=l.createObjectURL(d),u});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let c=Promise.resolve(u).then(function(f){return new Promise(function(d,p){let _=d;n.isImageBitmapLoader===!0&&(_=function(b){let m=new qt(b);m.needsUpdate=!0,d(m)}),n.load(or.resolveURL(f,s.path),_,void 0,p)})}).then(function(f){return h===!0&&l.revokeObjectURL(u),f.userData.mimeType=o.mimeType||WM(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",u),f});return this.sourceCache[e]=c,c}assignTexture(e,n,i,r){let s=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),s.extensions[Ye.KHR_TEXTURE_TRANSFORM]){let l=i.extensions!==void 0?i.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(l){let u=s.associations.get(o);o=s.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(o,l),s.associations.set(o,u)}}return r!==void 0&&(o.colorSpace=r),e[n]=o,o})}assignFinalMaterial(e){let n=e.geometry,i=e.material,r=n.attributes.tangent===void 0,s=n.attributes.color!==void 0,o=n.attributes.normal===void 0;if(e.isPoints){let l="PointsMaterial:"+i.uuid,u=this.cache.get(l);u||(u=new Fa,In.prototype.copy.call(u,i),u.color.copy(i.color),u.map=i.map,u.sizeAttenuation=!1,this.cache.add(l,u)),i=u}else if(e.isLine){let l="LineBasicMaterial:"+i.uuid,u=this.cache.get(l);u||(u=new Br,In.prototype.copy.call(u,i),u.color.copy(i.color),u.map=i.map,this.cache.add(l,u)),i=u}if(r||s||o){let l="ClonedMaterial:"+i.uuid+":";r&&(l+="derivative-tangents:"),s&&(l+="vertex-colors:"),o&&(l+="flat-shading:");let u=this.cache.get(l);u||(u=i.clone(),s&&(u.vertexColors=!0),o&&(u.flatShading=!0),r&&(u.normalScale&&(u.normalScale.y*=-1),u.clearcoatNormalScale&&(u.clearcoatNormalScale.y*=-1)),this.cache.add(l,u),this.associations.set(u,this.associations.get(i))),i=u}e.material=i}getMaterialType(){return xn}loadMaterial(e){let n=this,i=this.json,r=this.extensions,s=i.materials[e],o,l={},u=s.extensions||{},h=[];if(u[Ye.KHR_MATERIALS_UNLIT]){let f=r[Ye.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),h.push(f.extendParams(l,s,n))}else{let f=s.pbrMetallicRoughness||{};if(l.color=new oe(1,1,1),l.opacity=1,Array.isArray(f.baseColorFactor)){let d=f.baseColorFactor;l.color.setRGB(d[0],d[1],d[2],Et),l.opacity=d[3]}f.baseColorTexture!==void 0&&h.push(n.assignTexture(l,"map",f.baseColorTexture,it)),l.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,l.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(h.push(n.assignTexture(l,"metalnessMap",f.metallicRoughnessTexture)),h.push(n.assignTexture(l,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),h.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,l)})))}s.doubleSided===!0&&(l.side=_n);let c=s.alphaMode||eh.OPAQUE;if(c===eh.BLEND?(l.transparent=!0,l.depthWrite=!1):(l.transparent=!1,c===eh.MASK&&(l.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==_t&&(h.push(n.assignTexture(l,"normalMap",s.normalTexture)),l.normalScale=new me(1,1),s.normalTexture.scale!==void 0)){let f=s.normalTexture.scale;l.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==_t&&(h.push(n.assignTexture(l,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(l.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==_t){let f=s.emissiveFactor;l.emissive=new oe().setRGB(f[0],f[1],f[2],Et)}return s.emissiveTexture!==void 0&&o!==_t&&h.push(n.assignTexture(l,"emissiveMap",s.emissiveTexture,it)),Promise.all(h).then(function(){let f=new o(l);return s.name&&(f.name=s.name),ur(f,s),n.associations.set(f,{materials:e}),s.extensions&&Gr(r,f,s),f})}createUniqueName(e){let n=nt.sanitizeNodeName(e||"");return n in this.nodeNamesUsed?n+"_"+ ++this.nodeNamesUsed[n]:(this.nodeNamesUsed[n]=0,n)}loadGeometries(e){let n=this,i=this.extensions,r=this.primitiveCache;function s(l){return i[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l,n).then(function(u){return om(u,l,n)})}let o=[];for(let l=0,u=e.length;l<u;l++){let h=e[l],c=VM(h),f=r[c];if(f)o.push(f.promise);else{let d;h.extensions&&h.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?d=s(h):d=om(new It,h,n),r[c]={primitive:h,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let n=this,i=this.json,r=this.extensions,s=i.meshes[e],o=s.primitives,l=[];for(let u=0,h=o.length;u<h;u++){let c=o[u].material===void 0?zM(this.cache):this.getDependency("material",o[u].material);l.push(c)}return l.push(n.loadGeometries(o)),Promise.all(l).then(function(u){let h=u.slice(0,u.length-1),c=u[u.length-1],f=[];for(let p=0,_=c.length;p<_;p++){let b=c[p],m=o[p],g,v=h[p];if(m.mode===Xn.TRIANGLES||m.mode===Xn.TRIANGLE_STRIP||m.mode===Xn.TRIANGLE_FAN||m.mode===void 0)g=s.isSkinnedMesh===!0?new fc(b,v):new qe(b,v),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Xn.TRIANGLE_STRIP?g.geometry=Qu(g.geometry,Cc):m.mode===Xn.TRIANGLE_FAN&&(g.geometry=Qu(g.geometry,Va));else if(m.mode===Xn.LINES)g=new zs(b,v);else if(m.mode===Xn.LINE_STRIP)g=new Bs(b,v);else if(m.mode===Xn.LINE_LOOP)g=new mc(b,v);else if(m.mode===Xn.POINTS)g=new gc(b,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&HM(g,s),g.name=n.createUniqueName(s.name||"mesh_"+e),ur(g,s),m.extensions&&Gr(r,g,m),n.assignFinalMaterial(g),f.push(g)}for(let p=0,_=f.length;p<_;p++)n.associations.set(f[p],{meshes:e,primitives:p});if(f.length===1)return s.extensions&&Gr(r,f[0],s),f[0];let d=new Pn;s.extensions&&Gr(r,d,s),n.associations.set(d,{meshes:e});for(let p=0,_=f.length;p<_;p++)d.add(f[p]);return d})}loadCamera(e){let n,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?n=new Ot(Yp.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(n=new ir(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(n.name=this.createUniqueName(i.name)),ur(n,i),Promise.resolve(n)}loadSkin(e){let n=this.json.skins[e],i=[];for(let r=0,s=n.joints.length;r<s;r++)i.push(this._loadNodeShallow(n.joints[r]));return n.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",n.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),o=r,l=[],u=[];for(let h=0,c=o.length;h<c;h++){let f=o[h];if(f){l.push(f);let d=new Ae;s!==null&&d.fromArray(s.array,h*16),u.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',n.joints[h])}return new pc(l,u)})}loadAnimation(e){let n=this.json,i=this,r=n.animations[e],s=r.name?r.name:"animation_"+e,o=[],l=[],u=[],h=[],c=[];for(let f=0,d=r.channels.length;f<d;f++){let p=r.channels[f],_=r.samplers[p.sampler],b=p.target,m=b.node,g=r.parameters!==void 0?r.parameters[_.input]:_.input,v=r.parameters!==void 0?r.parameters[_.output]:_.output;b.node!==void 0&&(o.push(this.getDependency("node",m)),l.push(this.getDependency("accessor",g)),u.push(this.getDependency("accessor",v)),h.push(_),c.push(b))}return Promise.all([Promise.all(o),Promise.all(l),Promise.all(u),Promise.all(h),Promise.all(c)]).then(function(f){let d=f[0],p=f[1],_=f[2],b=f[3],m=f[4],g=[];for(let v=0,x=d.length;v<x;v++){let M=d[v],w=p[v],T=_[v],A=b[v],C=m[v];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let y=i._createAnimationTracks(M,w,T,A,C);if(y)for(let S=0;S<y.length;S++)g.push(y[S])}return new Hs(s,void 0,g)})}createNodeMesh(e){let n=this.json,i=this,r=n.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let o=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(l){if(l.isMesh)for(let u=0,h=r.weights.length;u<h;u++)l.morphTargetInfluences[u]=r.weights[u]}),o})}loadNode(e){let n=this.json,i=this,r=n.nodes[e],s=i._loadNodeShallow(e),o=[],l=r.children||[];for(let h=0,c=l.length;h<c;h++)o.push(i.getDependency("node",l[h]));let u=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),u]).then(function(h){let c=h[0],f=h[1],d=h[2];d!==null&&c.traverse(function(p){p.isSkinnedMesh&&p.bind(d,XM)});for(let p=0,_=f.length;p<_;p++)c.add(f[p]);return c})}_loadNodeShallow(e){let n=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=n.nodes[e],o=s.name?r.createUniqueName(s.name):"",l=[],u=r._invokeOne(function(h){return h.createNodeMesh&&h.createNodeMesh(e)});return u&&l.push(u),s.camera!==void 0&&l.push(r.getDependency("camera",s.camera).then(function(h){return r._getNodeRef(r.cameraCache,s.camera,h)})),r._invokeAll(function(h){return h.createNodeAttachment&&h.createNodeAttachment(e)}).forEach(function(h){l.push(h)}),this.nodeCache[e]=Promise.all(l).then(function(h){let c;if(s.isBone===!0?c=new Ua:h.length>1?c=new Pn:h.length===1?c=h[0]:c=new gt,c!==h[0])for(let f=0,d=h.length;f<d;f++)c.add(h[f]);if(s.name&&(c.userData.name=s.name,c.name=o),ur(c,s),s.extensions&&Gr(i,c,s),s.matrix!==void 0){let f=new Ae;f.fromArray(s.matrix),c.applyMatrix4(f)}else s.translation!==void 0&&c.position.fromArray(s.translation),s.rotation!==void 0&&c.quaternion.fromArray(s.rotation),s.scale!==void 0&&c.scale.fromArray(s.scale);return r.associations.has(c)||r.associations.set(c,{}),r.associations.get(c).nodes=e,c}),this.nodeCache[e]}loadScene(e){let n=this.extensions,i=this.json.scenes[e],r=this,s=new Pn;i.name&&(s.name=r.createUniqueName(i.name)),ur(s,i),i.extensions&&Gr(n,s,i);let o=i.nodes||[],l=[];for(let u=0,h=o.length;u<h;u++)l.push(r.getDependency("node",o[u]));return Promise.all(l).then(function(u){for(let c=0,f=u.length;c<f;c++)s.add(u[c]);let h=c=>{let f=new Map;for(let[d,p]of r.associations)(d instanceof In||d instanceof qt)&&f.set(d,p);return c.traverse(d=>{let p=r.associations.get(d);p!=null&&f.set(d,p)}),f};return r.associations=h(s),s})}_createAnimationTracks(e,n,i,r,s){let o=[],l=e.name?e.name:e.uuid,u=[];lr[s.path]===lr.weights?e.traverse(function(d){d.morphTargetInfluences&&u.push(d.name?d.name:d.uuid)}):u.push(l);let h;switch(lr[s.path]){case lr.weights:h=Ni;break;case lr.rotation:h=li;break;case lr.position:case lr.scale:h=Ui;break;default:switch(i.itemSize){case 1:h=Ni;break;case 2:case 3:default:h=Ui;break}break}let c=r.interpolation!==void 0?BM[r.interpolation]:Nr,f=this._getArrayFromAccessor(i);for(let d=0,p=u.length;d<p;d++){let _=new h(u[d]+"."+lr[s.path],n.array,f,c);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let n=e.array;if(e.normalized){let i=wh(n.constructor),r=new Float32Array(n.length);for(let s=0,o=n.length;s<o;s++)r[s]=n[s]*i;n=r}return n}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof li?Sh:Dc;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function qM(a,e,n){let i=e.attributes,r=new bn;if(i.POSITION!==void 0){let l=n.json.accessors[i.POSITION],u=l.min,h=l.max;if(u!==void 0&&h!==void 0){if(r.set(new D(u[0],u[1],u[2]),new D(h[0],h[1],h[2])),l.normalized){let c=wh(Ys[l.componentType]);r.min.multiplyScalar(c),r.max.multiplyScalar(c)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let l=new D,u=new D;for(let h=0,c=s.length;h<c;h++){let f=s[h];if(f.POSITION!==void 0){let d=n.json.accessors[f.POSITION],p=d.min,_=d.max;if(p!==void 0&&_!==void 0){if(u.setX(Math.max(Math.abs(p[0]),Math.abs(_[0]))),u.setY(Math.max(Math.abs(p[1]),Math.abs(_[1]))),u.setZ(Math.max(Math.abs(p[2]),Math.abs(_[2]))),d.normalized){let b=wh(Ys[d.componentType]);u.multiplyScalar(b)}l.max(u)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(l)}a.boundingBox=r;let o=new Ln;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,a.boundingSphere=o}function om(a,e,n){let i=e.attributes,r=[];function s(o,l){return n.getDependency("accessor",o).then(function(u){a.setAttribute(l,u)})}for(let o in i){let l=Th[o]||o.toLowerCase();l in a.attributes||r.push(s(i[o],l))}if(e.indices!==void 0&&!a.index){let o=n.getDependency("accessor",e.indices).then(function(l){a.setIndex(l)});r.push(o)}return Je.workingColorSpace!==Et&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),ur(a,e),qM(a,e,n),Promise.all(r).then(function(){return e.targets!==void 0?GM(a,e.targets,n):a})}var Oc=class extends yc{constructor(e){super(e),this.type=Gt}parse(e){let o=function(C,y){switch(C){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(y||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(y||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(y||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(y||""))}},c=`
`,f=function(C,y,S){y=y||1024;let F=C.pos,V=-1,I=0,U="",k=String.fromCharCode.apply(null,new Uint16Array(C.subarray(F,F+128)));for(;0>(V=k.indexOf(c))&&I<y&&F<C.byteLength;)U+=k,I+=k.length,F+=128,k+=String.fromCharCode.apply(null,new Uint16Array(C.subarray(F,F+128)));return-1<V?(S!==!1&&(C.pos+=I+V+1),U+k.slice(0,V)):!1},d=function(C){let y=/^#\?(\S+)/,S=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,N=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,F=/^\s*FORMAT=(\S+)\s*$/,V=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,I={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},U,k;for((C.pos>=C.byteLength||!(U=f(C)))&&o(1,"no header found"),(k=U.match(y))||o(3,"bad initial token"),I.valid|=1,I.programtype=k[1],I.string+=U+`
`;U=f(C),U!==!1;){if(I.string+=U+`
`,U.charAt(0)==="#"){I.comments+=U+`
`;continue}if((k=U.match(S))&&(I.gamma=parseFloat(k[1])),(k=U.match(N))&&(I.exposure=parseFloat(k[1])),(k=U.match(F))&&(I.valid|=2,I.format=k[1]),(k=U.match(V))&&(I.valid|=4,I.height=parseInt(k[1],10),I.width=parseInt(k[2],10)),I.valid&2&&I.valid&4)break}return I.valid&2||o(3,"missing format specifier"),I.valid&4||o(3,"missing image size specifier"),I},p=function(C,y,S){let N=y;if(N<8||N>32767||C[0]!==2||C[1]!==2||C[2]&128)return new Uint8Array(C);N!==(C[2]<<8|C[3])&&o(3,"wrong scanline width");let F=new Uint8Array(4*y*S);F.length||o(4,"unable to allocate buffer space");let V=0,I=0,U=4*N,k=new Uint8Array(4),Y=new Uint8Array(U),K=S;for(;K>0&&I<C.byteLength;){I+4>C.byteLength&&o(1),k[0]=C[I++],k[1]=C[I++],k[2]=C[I++],k[3]=C[I++],(k[0]!=2||k[1]!=2||(k[2]<<8|k[3])!=N)&&o(3,"bad rgbe scanline format");let j=0,J;for(;j<U&&I<C.byteLength;){J=C[I++];let re=J>128;if(re&&(J-=128),(J===0||j+J>U)&&o(3,"bad scanline data"),re){let X=C[I++];for(let Z=0;Z<J;Z++)Y[j++]=X}else Y.set(C.subarray(I,I+J),j),j+=J,I+=J}let Q=N;for(let re=0;re<Q;re++){let X=0;F[V]=Y[re+X],X+=N,F[V+1]=Y[re+X],X+=N,F[V+2]=Y[re+X],X+=N,F[V+3]=Y[re+X],V+=4}K--}return F},_=function(C,y,S,N){let F=C[y+3],V=Math.pow(2,F-128)/255;S[N+0]=C[y+0]*V,S[N+1]=C[y+1]*V,S[N+2]=C[y+2]*V,S[N+3]=1},b=function(C,y,S,N){let F=C[y+3],V=Math.pow(2,F-128)/255;S[N+0]=Wa.toHalfFloat(Math.min(C[y+0]*V,65504)),S[N+1]=Wa.toHalfFloat(Math.min(C[y+1]*V,65504)),S[N+2]=Wa.toHalfFloat(Math.min(C[y+2]*V,65504)),S[N+3]=Wa.toHalfFloat(1)},m=new Uint8Array(e);m.pos=0;let g=d(m),v=g.width,x=g.height,M=p(m.subarray(m.pos),v,x),w,T,A;switch(this.type){case Cn:A=M.length/4;let C=new Float32Array(A*4);for(let S=0;S<A;S++)_(M,S*4,C,S*4);w=C,T=Cn;break;case Gt:A=M.length/4;let y=new Uint16Array(A*4);for(let S=0;S<A;S++)b(M,S*4,y,S*4);w=y,T=Gt;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:v,height:x,data:w,header:g.string,gamma:g.gamma,exposure:g.exposure,type:T}}setDataType(e){return this.type=e,this}load(e,n,i,r){function s(o,l){switch(o.type){case Cn:case Gt:o.colorSpace=Et,o.minFilter=wt,o.magFilter=wt,o.generateMipmaps=!1,o.flipY=!0;break}n&&n(o,l)}return super.load(e,s,i,r)}};var lm=function(){"use strict";var a="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",n=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(n)?e:a,s,o=WebAssembly.instantiate(l(r),{}).then(function(g){s=g.instance,s.exports.__wasm_call_ctors()});function l(g){for(var v=new Uint8Array(g.length),x=0;x<g.length;++x){var M=g.charCodeAt(x);v[x]=M>96?M-97:M>64?M-39:M+4}for(var w=0,x=0;x<g.length;++x)v[w++]=v[x]<60?i[v[x]]:(v[x]-60)*64+v[++x];return v.buffer.slice(0,w)}function u(g,v,x,M,w,T){var A=s.exports.sbrk,C=x+3&-4,y=A(C*M),S=A(w.length),N=new Uint8Array(s.exports.memory.buffer);N.set(w,S);var F=g(y,x,M,S,w.length);if(F==0&&T&&T(y,C,M),v.set(N.subarray(y,y+x*M)),A(y-A(0)),F!=0)throw new Error("Malformed buffer data: "+F)}var h={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},c={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},f=[],d=0;function p(g){var v={object:new Worker(g),pending:0,requests:{}};return v.object.onmessage=function(x){var M=x.data;v.pending-=M.count,v.requests[M.id][M.action](M.value),delete v.requests[M.id]},v}function _(g){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(l(r))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+u.toString()+m.toString(),x=new Blob([v],{type:"text/javascript"}),M=URL.createObjectURL(x),w=0;w<g;++w)f[w]=p(M);URL.revokeObjectURL(M)}function b(g,v,x,M,w){for(var T=f[0],A=1;A<f.length;++A)f[A].pending<T.pending&&(T=f[A]);return new Promise(function(C,y){var S=new Uint8Array(x),N=d++;T.pending+=g,T.requests[N]={resolve:C,reject:y},T.object.postMessage({id:N,count:g,size:v,source:S,mode:M,filter:w},[S.buffer])})}function m(g){o.then(function(){var v=g.data;try{var x=new Uint8Array(v.count*v.size);u(s.exports[v.mode],x,v.count,v.size,v.source,s.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:x},[x.buffer])}catch(M){self.postMessage({id:v.id,count:v.count,action:"reject",value:M})}})}return{ready:o,supported:!0,useWorkers:function(g){_(g)},decodeVertexBuffer:function(g,v,x,M,w){u(s.exports.meshopt_decodeVertexBuffer,g,v,x,M,s.exports[h[w]])},decodeIndexBuffer:function(g,v,x,M){u(s.exports.meshopt_decodeIndexBuffer,g,v,x,M)},decodeIndexSequence:function(g,v,x,M){u(s.exports.meshopt_decodeIndexSequence,g,v,x,M)},decodeGltfBuffer:function(g,v,x,M,w,T){u(s.exports[c[w]],g,v,x,M,s.exports[h[T]])},decodeGltfBufferAsync:function(g,v,x,M,w){return f.length>0?b(g,v,x,c[M],h[w]):o.then(function(){var T=new Uint8Array(g*v);return u(s.exports[c[M]],T,g,v,x,s.exports[h[w]]),T})}}}();var Nc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Dn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},YM=new ir(-1,1,1,-1,0,1),Eh=class extends It{constructor(){super(),this.setAttribute("position",new st([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new st([0,2,0,0,2,0],2))}},jM=new Eh,hr=class{constructor(e){this._mesh=new qe(jM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,YM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var js=class extends Dn{constructor(e,n){super(),this.textureID=n!==void 0?n:"tDiffuse",e instanceof Rt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=cr.clone(e.uniforms),this.material=new Rt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new hr(this.material)}render(e,n,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var qa=class extends Dn{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,i){let r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,l;this.inverse?(o=0,l=1):(o=1,l=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(l),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}},Uc=class extends Dn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Fc=class{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){let i=e.getSize(new me);this._width=i.width,this._height=i.height,n=new Yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gt}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new js(Nc),this.copyPass.material.blending=ai,this.clock=new wc}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let n=this.renderer.getRenderTarget(),i=!1;for(let r=0,s=this.passes.length;r<s;r++){let o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){let l=this.renderer.getContext(),u=this.renderer.state.buffers.stencil;u.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),u.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}qa!==void 0&&(o instanceof qa?i=!0:o instanceof Uc&&(i=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){let n=this.renderer.getSize(new me);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;let i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var kc=class extends Dn{constructor(e,n,i=null,r=null,s=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new oe}render(e,n,i){let r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}};var um={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new oe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var Ks=class a extends Dn{constructor(e,n,i,r){super(),this.strength=n!==void 0?n:1,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new me(e.x,e.y):new me(256,256),this.clearColor=new oe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Yt(s,o,{type:Gt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){let d=new Yt(s,o,{type:Gt});d.texture.name="UnrealBloomPass.h"+f,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let p=new Yt(s,o,{type:Gt});p.texture.name="UnrealBloomPass.v"+f,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),o=Math.round(o/2)}let l=um;this.highPassUniforms=cr.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Rt({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];let u=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(u[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new me(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;let h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let c=Nc;this.copyUniforms=cr.clone(c.uniforms),this.blendMaterial=new Rt({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Or,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new oe,this.oldClearAlpha=1,this.basic=new _t,this.fsQuad=new hr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,n){let i=Math.round(e/2),r=Math.round(n/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new me(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,n,i,r,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let l=this.renderTargetBright;for(let u=0;u<this.nMips;u++)this.fsQuad.material=this.separableBlurMaterials[u],this.separableBlurMaterials[u].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[u].uniforms.direction.value=a.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[u]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[u].uniforms.colorTexture.value=this.renderTargetsHorizontal[u].texture,this.separableBlurMaterials[u].uniforms.direction.value=a.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[u]),e.clear(),this.fsQuad.render(e),l=this.renderTargetsVertical[u];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){let n=[];for(let i=0;i<e;i++)n.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new Rt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new me(.5,.5)},direction:{value:new me(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Rt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};Ks.BlurDirectionX=new me(1,0);Ks.BlurDirectionY=new me(0,1);var hm={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Bc=class extends Dn{constructor(){super();let e=hm;this.uniforms=cr.clone(e.uniforms),this.material=new bc({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new hr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,n,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Je.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===zu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Gu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ha?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Hu&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};function ki(a){if(a===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function xm(a,e){a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.__proto__=e}var Sn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Zs={duration:.5,overwrite:!1,delay:0},qh,tn,ft,Yn=1e8,ut=1/Yn,Nh=Math.PI*2,KM=Nh/4,JM=0,vm=Math.sqrt,ZM=Math.cos,QM=Math.sin,Ft=function(e){return typeof e=="string"},Mt=function(e){return typeof e=="function"},zi=function(e){return typeof e=="number"},Kc=function(e){return typeof e=="undefined"},di=function(e){return typeof e=="object"},Mn=function(e){return e!==!1},Yh=function(){return typeof window!="undefined"},zc=function(e){return Mt(e)||Ft(e)},ym=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},nn=Array.isArray,Uh=/(?:-?\.?\d|\.)+/gi,jh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,qr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Rh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Kh=/[+-]=-?[.\d]+/,Mm=/[^,'"\[\]\s]+/gi,$M=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,bt,hi,Fh,Jh,Nn={},Wc={},Sm,Tm=function(e){return(Wc=Xr(e,Nn))&&rn},Jc=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},Qa=function(e,n){return!n&&console.warn(e)},wm=function(e,n){return e&&(Nn[e]=n)&&Wc&&(Wc[e]=n)||Nn},$a=function(){return 0},eS={suppressEvents:!0,isStart:!0,kill:!1},Gc={suppressEvents:!0,kill:!1},tS={suppressEvents:!0},Zh={},dr=[],kh={},Am,vn={},Ch={},fm=30,Hc=[],Qh="",$h=function(e){var n=e[0],i,r;if(di(n)||Mt(n)||(e=[e]),!(i=(n._gsap||{}).harness)){for(r=Hc.length;r--&&!Hc[r].targetTest(n););i=Hc[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new nf(e[r],i)))||e.splice(r,1);return e},pr=function(e){return e._gsap||$h(jn(e))[0]._gsap},ef=function(e,n,i){return(i=e[n])&&Mt(i)?e[n]():Kc(i)&&e.getAttribute&&e.getAttribute(n)||i},fn=function(e,n){return(e=e.split(",")).forEach(n)||e},St=function(e){return Math.round(e*1e5)/1e5||0},Ht=function(e){return Math.round(e*1e7)/1e7||0},Yr=function(e,n){var i=n.charAt(0),r=parseFloat(n.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},nS=function(e,n){for(var i=n.length,r=0;e.indexOf(n[r])<0&&++r<i;);return r<i},Xc=function(){var e=dr.length,n=dr.slice(0),i,r;for(kh={},dr.length=0,i=0;i<e;i++)r=n[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Em=function(e,n,i,r){dr.length&&!tn&&Xc(),e.render(n,i,r||tn&&n<0&&(e._initted||e._startAt)),dr.length&&!tn&&Xc()},Rm=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(Mm).length<2?n:Ft(e)?e.trim():e},Cm=function(e){return e},Kn=function(e,n){for(var i in n)i in e||(e[i]=n[i]);return e},iS=function(e){return function(n,i){for(var r in i)r in n||r==="duration"&&e||r==="ease"||(n[r]=i[r])}},Xr=function(e,n){for(var i in n)e[i]=n[i];return e},dm=function a(e,n){for(var i in n)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=di(n[i])?a(e[i]||(e[i]={}),n[i]):n[i]);return e},qc=function(e,n){var i={},r;for(r in e)r in n||(i[r]=e[r]);return i},Ka=function(e){var n=e.parent||bt,i=e.keyframes?iS(nn(e.keyframes)):Kn;if(Mn(e.inherit))for(;n;)i(e,n.vars.defaults),n=n.parent||n._dp;return e},rS=function(e,n){for(var i=e.length,r=i===n.length;r&&i--&&e[i]===n[i];);return i<0},Pm=function(e,n,i,r,s){i===void 0&&(i="_first"),r===void 0&&(r="_last");var o=e[r],l;if(s)for(l=n[s];o&&o[s]>l;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=e[i],e[i]=n),n._next?n._next._prev=n:e[r]=n,n._prev=o,n.parent=n._dp=e,n},Zc=function(e,n,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=n._prev,o=n._next;s?s._next=o:e[i]===n&&(e[i]=o),o?o._prev=s:e[r]===n&&(e[r]=s),n._next=n._prev=n.parent=null},mr=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Hr=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},sS=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},Bh=function(e,n,i,r){return e._startAt&&(tn?e._startAt.revert(Gc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,r))},aS=function a(e){return!e||e._ts&&a(e.parent)},pm=function(e){return e._repeat?Qs(e._tTime,e=e.duration()+e._rDelay)*e:0},Qs=function(e,n){var i=Math.floor(e/=n);return e&&i===e?i-1:i},Yc=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},Qc=function(e){return e._end=Ht(e._start+(e._tDur/Math.abs(e._ts||e._rts||ut)||0))},$c=function(e,n){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Ht(i._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),Qc(e),i._dirty||Hr(i,e)),e},Lm=function(e,n){var i;if((n._time||!n._dur&&n._initted||n._start<e._time&&(n._dur||!n.add))&&(i=Yc(e.rawTime(),n),(!n._dur||no(0,n.totalDuration(),i)-n._tTime>ut)&&n.render(i,!0)),Hr(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-ut}},fi=function(e,n,i,r){return n.parent&&mr(n),n._start=Ht((zi(i)?i:i||e!==bt?qn(e,i,n):e._time)+n._delay),n._end=Ht(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),Pm(e,n,"_first","_last",e._sort?"_start":0),zh(n)||(e._recent=n),r||Lm(e,n),e._ts<0&&$c(e,e._tTime),e},Im=function(e,n){return(Nn.ScrollTrigger||Jc("scrollTrigger",n))&&Nn.ScrollTrigger.create(n,e)},Dm=function(e,n,i,r,s){if(af(e,n,s),!e._initted)return 1;if(!i&&e._pt&&!tn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Am!==yn.frame)return dr.push(e),e._lazy=[s,r],1},oS=function a(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||a(n))},zh=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},cS=function(e,n,i,r){var s=e.ratio,o=n<0||!n&&(!e._start&&oS(e)&&!(!e._initted&&zh(e))||(e._ts<0||e._dp._ts<0)&&!zh(e))?0:1,l=e._rDelay,u=0,h,c,f;if(l&&e._repeat&&(u=no(0,e._tDur,n),c=Qs(u,l),e._yoyo&&c&1&&(o=1-o),c!==Qs(e._tTime,l)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||tn||r||e._zTime===ut||!n&&e._zTime){if(!e._initted&&Dm(e,n,r,i,u))return;for(f=e._zTime,e._zTime=n||(i?ut:0),i||(i=n&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=u,h=e._pt;h;)h.r(o,h.d),h=h._next;n<0&&Bh(e,n,i,!0),e._onUpdate&&!i&&On(e,"onUpdate"),u&&e._repeat&&!i&&e.parent&&On(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===o&&(o&&mr(e,1),!i&&!tn&&(On(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},lS=function(e,n,i){var r;if(i>n)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>n)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<n)return r;r=r._prev}},$s=function(e,n,i,r){var s=e._repeat,o=Ht(n)||0,l=e._tTime/e._tDur;return l&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ht(o*(s+1)+e._rDelay*s):o,l>0&&!r&&$c(e,e._tTime=e._tDur*l),e.parent&&Qc(e),i||Hr(e.parent,e),e},mm=function(e){return e instanceof jt?Hr(e):$s(e,e._dur)},uS={_start:0,endTime:$a,totalDuration:$a},qn=function a(e,n,i){var r=e.labels,s=e._recent||uS,o=e.duration()>=Yn?s.endTime(!1):e._dur,l,u,h;return Ft(n)&&(isNaN(n)||n in r)?(u=n.charAt(0),h=n.substr(-1)==="%",l=n.indexOf("="),u==="<"||u===">"?(l>=0&&(n=n.replace(/=/,"")),(u==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(h?(l<0?s:i).totalDuration()/100:1)):l<0?(n in r||(r[n]=o),r[n]):(u=parseFloat(n.charAt(l-1)+n.substr(l+1)),h&&i&&(u=u/100*(nn(i)?i[0]:i).totalDuration()),l>1?a(e,n.substr(0,l-1),i)+u:o+u)):n==null?o:+n},Ja=function(e,n,i){var r=zi(n[1]),s=(r?2:1)+(e<2?0:1),o=n[s],l,u;if(r&&(o.duration=n[1]),o.parent=i,e){for(l=o,u=i;u&&!("immediateRender"in l);)l=u.vars.defaults||{},u=Mn(u.vars.inherit)&&u.parent;o.immediateRender=Mn(l.immediateRender),e<2?o.runBackwards=1:o.startAt=n[s-1]}return new Ct(n[0],o,n[s+1])},gr=function(e,n){return e||e===0?n(e):n},no=function(e,n,i){return i<e?e:i>n?n:i},Kt=function(e,n){return!Ft(e)||!(n=$M.exec(e))?"":n[1]},hS=function(e,n,i){return gr(i,function(r){return no(e,n,r)})},Gh=[].slice,Om=function(e,n){return e&&di(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&di(e[0]))&&!e.nodeType&&e!==hi},fS=function(e,n,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Ft(r)&&!n||Om(r,1)?(s=i).push.apply(s,jn(r)):i.push(r)})||i},jn=function(e,n,i){return ft&&!n&&ft.selector?ft.selector(e):Ft(e)&&!i&&(Fh||!ea())?Gh.call((n||Jh).querySelectorAll(e),0):nn(e)?fS(e,i):Om(e)?Gh.call(e,0):e?[e]:[]},Hh=function(e){return e=jn(e)[0]||Qa("Invalid scope")||{},function(n){var i=e.current||e.nativeElement||e;return jn(n,i.querySelectorAll?i:i===e?Qa("Invalid scope")||Jh.createElement("div"):e)}},Nm=function(e){return e.sort(function(){return .5-Math.random()})},Um=function(e){if(Mt(e))return e;var n=di(e)?e:{each:e},i=Vr(n.ease),r=n.from||0,s=parseFloat(n.base)||0,o={},l=r>0&&r<1,u=isNaN(r)||l,h=n.axis,c=r,f=r;return Ft(r)?c=f={center:.5,edges:.5,end:1}[r]||0:!l&&u&&(c=r[0],f=r[1]),function(d,p,_){var b=(_||n).length,m=o[b],g,v,x,M,w,T,A,C,y;if(!m){if(y=n.grid==="auto"?0:(n.grid||[1,Yn])[1],!y){for(A=-Yn;A<(A=_[y++].getBoundingClientRect().left)&&y<b;);y<b&&y--}for(m=o[b]=[],g=u?Math.min(y,b)*c-.5:r%y,v=y===Yn?0:u?b*f/y-.5:r/y|0,A=0,C=Yn,T=0;T<b;T++)x=T%y-g,M=v-(T/y|0),m[T]=w=h?Math.abs(h==="y"?M:x):vm(x*x+M*M),w>A&&(A=w),w<C&&(C=w);r==="random"&&Nm(m),m.max=A-C,m.min=C,m.v=b=(parseFloat(n.amount)||parseFloat(n.each)*(y>b?b-1:h?h==="y"?b/y:y:Math.max(y,b/y))||0)*(r==="edges"?-1:1),m.b=b<0?s-b:s,m.u=Kt(n.amount||n.each)||0,i=i&&b<0?Xm(i):i}return b=(m[d]-m.min)/m.max||0,Ht(m.b+(i?i(b):b)*m.v)+m.u}},Vh=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Ht(Math.round(parseFloat(i)/e)*e*n);return(r-r%1)/n+(zi(i)?0:Kt(i))}},Fm=function(e,n){var i=nn(e),r,s;return!i&&di(e)&&(r=i=e.radius||Yn,e.values?(e=jn(e.values),(s=!zi(e[0]))&&(r*=r)):e=Vh(e.increment)),gr(n,i?Mt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var l=parseFloat(s?o.x:o),u=parseFloat(s?o.y:0),h=Yn,c=0,f=e.length,d,p;f--;)s?(d=e[f].x-l,p=e[f].y-u,d=d*d+p*p):d=Math.abs(e[f]-l),d<h&&(h=d,c=f);return c=!r||h<=r?e[c]:o,s||c===o||zi(o)?c:c+Kt(o)}:Vh(e))},km=function(e,n,i,r){return gr(nn(e)?!n:i===!0?!!(i=0):!r,function(){return nn(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(n-e+i*.99))/i)*i*r)/r})},dS=function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return function(r){return n.reduce(function(s,o){return o(s)},r)}},pS=function(e,n){return function(i){return e(parseFloat(i))+(n||Kt(i))}},mS=function(e,n,i){return zm(e,n,0,1,i)},Bm=function(e,n,i){return gr(i,function(r){return e[~~n(r)]})},gS=function a(e,n,i){var r=n-e;return nn(e)?Bm(e,a(0,e.length),n):gr(i,function(s){return(r+(s-e)%r)%r+e})},_S=function a(e,n,i){var r=n-e,s=r*2;return nn(e)?Bm(e,a(0,e.length-1),n):gr(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},ta=function(e){for(var n=0,i="",r,s,o,l;~(r=e.indexOf("random(",n));)o=e.indexOf(")",r),l=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(l?Mm:Uh),i+=e.substr(n,r-n)+km(l?s:+s[0],l?0:+s[1],+s[2]||1e-5),n=o+1;return i+e.substr(n,e.length-n)},zm=function(e,n,i,r,s){var o=n-e,l=r-i;return gr(s,function(u){return i+((u-e)/o*l||0)})},bS=function a(e,n,i,r){var s=isNaN(e+n)?0:function(p){return(1-p)*e+p*n};if(!s){var o=Ft(e),l={},u,h,c,f,d;if(i===!0&&(r=1)&&(i=null),o)e={p:e},n={p:n};else if(nn(e)&&!nn(n)){for(c=[],f=e.length,d=f-2,h=1;h<f;h++)c.push(a(e[h-1],e[h]));f--,s=function(_){_*=f;var b=Math.min(d,~~_);return c[b](_-b)},i=n}else r||(e=Xr(nn(e)?[]:{},e));if(!c){for(u in n)rf.call(l,e,u,"get",n[u]);s=function(_){return lf(_,l)||(o?e.p:e)}}}return gr(i,s)},gm=function(e,n,i){var r=e.labels,s=Yn,o,l,u;for(o in r)l=r[o]-n,l<0==!!i&&l&&s>(l=Math.abs(l))&&(u=o,s=l);return u},On=function(e,n,i){var r=e.vars,s=r[n],o=ft,l=e._ctx,u,h,c;if(s)return u=r[n+"Params"],h=r.callbackScope||e,i&&dr.length&&Xc(),l&&(ft=l),c=u?s.apply(h,u):s.call(h),ft=o,c},Ya=function(e){return mr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!tn),e.progress()<1&&On(e,"onInterrupt"),e},Js,Gm=[],Hm=function(e){if(e)if(e=!e.name&&e.default||e,Yh()||e.headless){var n=e.name,i=Mt(e),r=n&&!i&&e.init?function(){this._props=[]}:e,s={init:$a,render:lf,add:rf,kill:OS,modifier:DS,rawVars:0},o={targetTest:0,get:0,getSetter:el,aliases:{},register:0};if(ea(),e!==r){if(vn[n])return;Kn(r,Kn(qc(e,s),o)),Xr(r.prototype,Xr(s,qc(e,o))),vn[r.prop=n]=r,e.targetTest&&(Hc.push(r),Zh[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}wm(n,r),e.register&&e.register(rn,r,dn)}else Gm.push(e)},at=255,ja={aqua:[0,at,at],lime:[0,at,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,at],navy:[0,0,128],white:[at,at,at],olive:[128,128,0],yellow:[at,at,0],orange:[at,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[at,0,0],pink:[at,192,203],cyan:[0,at,at],transparent:[at,at,at,0]},Ph=function(e,n,i){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(i-n)*e*6:e<.5?i:e*3<2?n+(i-n)*(2/3-e)*6:n)*at+.5|0},Vm=function(e,n,i){var r=e?zi(e)?[e>>16,e>>8&at,e&at]:0:ja.black,s,o,l,u,h,c,f,d,p,_;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ja[e])r=ja[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),l=e.charAt(3),e="#"+s+s+o+o+l+l+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&at,r&at,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&at,e&at]}else if(e.substr(0,3)==="hsl"){if(r=_=e.match(Uh),!n)u=+r[0]%360/360,h=+r[1]/100,c=+r[2]/100,o=c<=.5?c*(h+1):c+h-c*h,s=c*2-o,r.length>3&&(r[3]*=1),r[0]=Ph(u+1/3,s,o),r[1]=Ph(u,s,o),r[2]=Ph(u-1/3,s,o);else if(~e.indexOf("="))return r=e.match(jh),i&&r.length<4&&(r[3]=1),r}else r=e.match(Uh)||ja.transparent;r=r.map(Number)}return n&&!_&&(s=r[0]/at,o=r[1]/at,l=r[2]/at,f=Math.max(s,o,l),d=Math.min(s,o,l),c=(f+d)/2,f===d?u=h=0:(p=f-d,h=c>.5?p/(2-f-d):p/(f+d),u=f===s?(o-l)/p+(o<l?6:0):f===o?(l-s)/p+2:(s-o)/p+4,u*=60),r[0]=~~(u+.5),r[1]=~~(h*100+.5),r[2]=~~(c*100+.5)),i&&r.length<4&&(r[3]=1),r},Wm=function(e){var n=[],i=[],r=-1;return e.split(Bi).forEach(function(s){var o=s.match(qr)||[];n.push.apply(n,o),i.push(r+=o.length+1)}),n.c=i,n},_m=function(e,n,i){var r="",s=(e+r).match(Bi),o=n?"hsla(":"rgba(",l=0,u,h,c,f;if(!s)return e;if(s=s.map(function(d){return(d=Vm(d,n,1))&&o+(n?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),i&&(c=Wm(e),u=i.c,u.join(r)!==c.c.join(r)))for(h=e.replace(Bi,"1").split(qr),f=h.length-1;l<f;l++)r+=h[l]+(~u.indexOf(l)?s.shift()||o+"0,0,0,0)":(c.length?c:s.length?s:i).shift());if(!h)for(h=e.split(Bi),f=h.length-1;l<f;l++)r+=h[l]+s[l];return r+h[f]},Bi=function(){var a="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ja)a+="|"+e+"\\b";return new RegExp(a+")","gi")}(),xS=/hsl[a]?\(/,tf=function(e){var n=e.join(" "),i;if(Bi.lastIndex=0,Bi.test(n))return i=xS.test(n),e[1]=_m(e[1],i),e[0]=_m(e[0],i,Wm(e[1])),!0},eo,yn=function(){var a=Date.now,e=500,n=33,i=a(),r=i,s=1e3/240,o=s,l=[],u,h,c,f,d,p,_=function b(m){var g=a()-r,v=m===!0,x,M,w,T;if((g>e||g<0)&&(i+=g-n),r+=g,w=r-i,x=w-o,(x>0||v)&&(T=++f.frame,d=w-f.time*1e3,f.time=w=w/1e3,o+=x+(x>=s?4:s-x),M=1),v||(u=h(b)),M)for(p=0;p<l.length;p++)l[p](w,d,T,m)};return f={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){Sm&&(!Fh&&Yh()&&(hi=Fh=window,Jh=hi.document||{},Nn.gsap=rn,(hi.gsapVersions||(hi.gsapVersions=[])).push(rn.version),Tm(Wc||hi.GreenSockGlobals||!hi.gsap&&hi||{}),Gm.forEach(Hm)),c=typeof requestAnimationFrame!="undefined"&&requestAnimationFrame,u&&f.sleep(),h=c||function(m){return setTimeout(m,o-f.time*1e3+1|0)},eo=1,_(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(u),eo=0,h=$a},lagSmoothing:function(m,g){e=m||1/0,n=Math.min(g||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,g,v){var x=g?function(M,w,T,A){m(M,w,T,A),f.remove(x)}:m;return f.remove(m),l[v?"unshift":"push"](x),ea(),x},remove:function(m,g){~(g=l.indexOf(m))&&l.splice(g,1)&&p>=g&&p--},_listeners:l},f}(),ea=function(){return!eo&&yn.wake()},je={},vS=/^[\d.\-M][\d.\-,\s]/,yS=/["']/g,MS=function(e){for(var n={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,l,u,h;s<o;s++)u=i[s],l=s!==o-1?u.lastIndexOf(","):u.length,h=u.substr(0,l),n[r]=isNaN(h)?h.replace(yS,"").trim():+h,r=u.substr(l+1).trim();return n},SS=function(e){var n=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",n);return e.substring(n,~r&&r<i?e.indexOf(")",i+1):i)},TS=function(e){var n=(e+"").split("("),i=je[n[0]];return i&&n.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[MS(n[1])]:SS(e).split(",").map(Rm)):je._CE&&vS.test(e)?je._CE("",e):i},Xm=function(e){return function(n){return 1-e(1-n)}},qm=function a(e,n){for(var i=e._first,r;i;)i instanceof jt?a(i,n):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==n&&(i.timeline?a(i.timeline,n):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=n)),i=i._next},Vr=function(e,n){return e&&(Mt(e)?e:je[e]||TS(e))||n},jr=function(e,n,i,r){i===void 0&&(i=function(u){return 1-n(1-u)}),r===void 0&&(r=function(u){return u<.5?n(u*2)/2:1-n((1-u)*2)/2});var s={easeIn:n,easeOut:i,easeInOut:r},o;return fn(e,function(l){je[l]=Nn[l]=s,je[o=l.toLowerCase()]=i;for(var u in s)je[o+(u==="easeIn"?".in":u==="easeOut"?".out":".inOut")]=je[l+"."+u]=s[u]}),s},Ym=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},Lh=function a(e,n,i){var r=n>=1?n:1,s=(i||(e?.3:.45))/(n<1?n:1),o=s/Nh*(Math.asin(1/r)||0),l=function(c){return c===1?1:r*Math.pow(2,-10*c)*QM((c-o)*s)+1},u=e==="out"?l:e==="in"?function(h){return 1-l(1-h)}:Ym(l);return s=Nh/s,u.config=function(h,c){return a(e,h,c)},u},Ih=function a(e,n){n===void 0&&(n=1.70158);var i=function(o){return o?--o*o*((n+1)*o+n)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:Ym(i);return r.config=function(s){return a(e,s)},r};fn("Linear,Quad,Cubic,Quart,Quint,Strong",function(a,e){var n=e<5?e+1:e;jr(a+",Power"+(n-1),e?function(i){return Math.pow(i,n)}:function(i){return i},function(i){return 1-Math.pow(1-i,n)},function(i){return i<.5?Math.pow(i*2,n)/2:1-Math.pow((1-i)*2,n)/2})});je.Linear.easeNone=je.none=je.Linear.easeIn;jr("Elastic",Lh("in"),Lh("out"),Lh());(function(a,e){var n=1/e,i=2*n,r=2.5*n,s=function(l){return l<n?a*l*l:l<i?a*Math.pow(l-1.5/e,2)+.75:l<r?a*(l-=2.25/e)*l+.9375:a*Math.pow(l-2.625/e,2)+.984375};jr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);jr("Expo",function(a){return a?Math.pow(2,10*(a-1)):0});jr("Circ",function(a){return-(vm(1-a*a)-1)});jr("Sine",function(a){return a===1?1:-ZM(a*KM)+1});jr("Back",Ih("in"),Ih("out"),Ih());je.SteppedEase=je.steps=Nn.SteppedEase={config:function(e,n){e===void 0&&(e=1);var i=1/e,r=e+(n?0:1),s=n?1:0,o=1-ut;return function(l){return((r*no(0,o,l)|0)+s)*i}}};Zs.ease=je["quad.out"];fn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(a){return Qh+=a+","+a+"Params,"});var nf=function(e,n){this.id=JM++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:ef,this.set=n?n.getSetter:el},to=function(){function a(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,$s(this,+n.duration,1,1),this.data=n.data,ft&&(this._ctx=ft,ft.data.push(this)),eo||yn.wake()}var e=a.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,$s(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(ea(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for($c(this,i),!s._dp||s.parent||Lm(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&fi(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===ut||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Em(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+pm(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+pm(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?Qs(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-ut?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?Yc(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-ut?0:this._rts,this.totalTime(no(-Math.abs(this._delay),this._tDur,s),r!==!1),Qc(this),sS(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ea(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ut&&(this._tTime-=ut)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&fi(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Mn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Yc(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=tS);var r=tn;return tn=i,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),tn=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,mm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,mm(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(qn(this,i),Mn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Mn(r))},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-ut:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-ut,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-ut)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this;return new Promise(function(s){var o=Mt(i)?i:Cm,l=function(){var h=r.then;r.then=null,Mt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=h),s(o),r.then=h};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Ya(this)},a}();Kn(to.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ut,_prom:0,_ps:!1,_rts:1});var jt=function(a){xm(e,a);function e(i,r){var s;return i===void 0&&(i={}),s=a.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=Mn(i.sortChildren),bt&&fi(i.parent||bt,ki(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&Im(ki(s),i.scrollTrigger),s}var n=e.prototype;return n.to=function(r,s,o){return Ja(0,arguments,this),this},n.from=function(r,s,o){return Ja(1,arguments,this),this},n.fromTo=function(r,s,o,l){return Ja(2,arguments,this),this},n.set=function(r,s,o){return s.duration=0,s.parent=this,Ka(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ct(r,s,qn(this,o),1),this},n.call=function(r,s,o){return fi(this,Ct.delayedCall(0,r,s),o)},n.staggerTo=function(r,s,o,l,u,h,c){return o.duration=s,o.stagger=o.stagger||l,o.onComplete=h,o.onCompleteParams=c,o.parent=this,new Ct(r,o,qn(this,u)),this},n.staggerFrom=function(r,s,o,l,u,h,c){return o.runBackwards=1,Ka(o).immediateRender=Mn(o.immediateRender),this.staggerTo(r,s,o,l,u,h,c)},n.staggerFromTo=function(r,s,o,l,u,h,c,f){return l.startAt=o,Ka(l).immediateRender=Mn(l.immediateRender),this.staggerTo(r,s,l,u,h,c,f)},n.render=function(r,s,o){var l=this._time,u=this._dirty?this.totalDuration():this._tDur,h=this._dur,c=r<=0?0:Ht(r),f=this._zTime<0!=r<0&&(this._initted||!h),d,p,_,b,m,g,v,x,M,w,T,A;if(this!==bt&&c>u&&r>=0&&(c=u),c!==this._tTime||o||f){if(l!==this._time&&h&&(c+=this._time-l,r+=this._time-l),d=c,M=this._start,x=this._ts,g=!x,f&&(h||(l=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,m=h+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(d=Ht(c%m),c===u?(b=this._repeat,d=h):(b=~~(c/m),b&&b===c/m&&(d=h,b--),d>h&&(d=h)),w=Qs(this._tTime,m),!l&&this._tTime&&w!==b&&this._tTime-w*m-this._dur<=0&&(w=b),T&&b&1&&(d=h-d,A=1),b!==w&&!this._lock){var C=T&&w&1,y=C===(T&&b&1);if(b<w&&(C=!C),l=C?0:c%h?h:c,this._lock=1,this.render(l||(A?0:Ht(b*m)),s,!h)._lock=0,this._tTime=c,!s&&this.parent&&On(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),l&&l!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(h=this._dur,u=this._tDur,y&&(this._lock=2,l=C?h:-1e-4,this.render(l,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!g)return this;qm(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=lS(this,Ht(l),Ht(d)),v&&(c-=d-(d=v._start))),this._tTime=c,this._time=d,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,l=0),!l&&d&&!s&&!b&&(On(this,"onStart"),this._tTime!==c))return this;if(d>=l&&r>=0)for(p=this._first;p;){if(_=p._next,(p._act||d>=p._start)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(d-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(d-p._start)*p._ts,s,o),d!==this._time||!this._ts&&!g){v=0,_&&(c+=this._zTime=-ut);break}}p=_}else{p=this._last;for(var S=r<0?r:d;p;){if(_=p._prev,(p._act||S<=p._end)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(S-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(S-p._start)*p._ts,s,o||tn&&(p._initted||p._startAt)),d!==this._time||!this._ts&&!g){v=0,_&&(c+=this._zTime=S?-ut:ut);break}}p=_}}if(v&&!s&&(this.pause(),v.render(d>=l?0:-ut)._zTime=d>=l?1:-1,this._ts))return this._start=M,Qc(this),this.render(r,s,o);this._onUpdate&&!s&&On(this,"onUpdate",!0),(c===u&&this._tTime>=this.totalDuration()||!c&&l)&&(M===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!h)&&(c===u&&this._ts>0||!c&&this._ts<0)&&mr(this,1),!s&&!(r<0&&!l)&&(c||l||!u)&&(On(this,c===u&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<u&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(r,s){var o=this;if(zi(s)||(s=qn(this,s,r)),!(r instanceof to)){if(nn(r))return r.forEach(function(l){return o.add(l,s)}),this;if(Ft(r))return this.addLabel(r,s);if(Mt(r))r=Ct.delayedCall(0,r);else return this}return this!==r?fi(this,r,s):this},n.getChildren=function(r,s,o,l){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),l===void 0&&(l=-Yn);for(var u=[],h=this._first;h;)h._start>=l&&(h instanceof Ct?s&&u.push(h):(o&&u.push(h),r&&u.push.apply(u,h.getChildren(!0,s,o)))),h=h._next;return u},n.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},n.remove=function(r){return Ft(r)?this.removeLabel(r):Mt(r)?this.killTweensOf(r):(Zc(this,r),r===this._recent&&(this._recent=this._last),Hr(this))},n.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ht(yn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),a.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},n.addLabel=function(r,s){return this.labels[r]=qn(this,s),this},n.removeLabel=function(r){return delete this.labels[r],this},n.addPause=function(r,s,o){var l=Ct.delayedCall(0,s||$a,o);return l.data="isPause",this._hasPause=1,fi(this,l,qn(this,r))},n.removePause=function(r){var s=this._first;for(r=qn(this,r);s;)s._start===r&&s.data==="isPause"&&mr(s),s=s._next},n.killTweensOf=function(r,s,o){for(var l=this.getTweensOf(r,o),u=l.length;u--;)fr!==l[u]&&l[u].kill(r,s);return this},n.getTweensOf=function(r,s){for(var o=[],l=jn(r),u=this._first,h=zi(s),c;u;)u instanceof Ct?nS(u._targets,l)&&(h?(!fr||u._initted&&u._ts)&&u.globalTime(0)<=s&&u.globalTime(u.totalDuration())>s:!s||u.isActive())&&o.push(u):(c=u.getTweensOf(l,s)).length&&o.push.apply(o,c),u=u._next;return o},n.tweenTo=function(r,s){s=s||{};var o=this,l=qn(o,r),u=s,h=u.startAt,c=u.onStart,f=u.onStartParams,d=u.immediateRender,p,_=Ct.to(o,Kn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:l,overwrite:"auto",duration:s.duration||Math.abs((l-(h&&"time"in h?h.time:o._time))/o.timeScale())||ut,onStart:function(){if(o.pause(),!p){var m=s.duration||Math.abs((l-(h&&"time"in h?h.time:o._time))/o.timeScale());_._dur!==m&&$s(_,m,0,1).render(_._time,!0,!0),p=1}c&&c.apply(_,f||[])}},s));return d?_.render(0):_},n.tweenFromTo=function(r,s,o){return this.tweenTo(s,Kn({startAt:{time:qn(this,r)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(r){return r===void 0&&(r=this._time),gm(this,qn(this,r))},n.previousLabel=function(r){return r===void 0&&(r=this._time),gm(this,qn(this,r),1)},n.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+ut)},n.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var l=this._first,u=this.labels,h;l;)l._start>=o&&(l._start+=r,l._end+=r),l=l._next;if(s)for(h in u)u[h]>=o&&(u[h]+=r);return Hr(this)},n.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return a.prototype.invalidate.call(this,r)},n.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Hr(this)},n.totalDuration=function(r){var s=0,o=this,l=o._last,u=Yn,h,c,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;l;)h=l._prev,l._dirty&&l.totalDuration(),c=l._start,c>u&&o._sort&&l._ts&&!o._lock?(o._lock=1,fi(o,l,c-l._delay,1)._lock=0):u=c,c<0&&l._ts&&(s-=c,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=c/o._ts,o._time-=c,o._tTime-=c),o.shiftChildren(-c,!1,-1/0),u=0),l._end>s&&l._ts&&(s=l._end),l=h;$s(o,o===bt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(bt._ts&&(Em(bt,Yc(r,bt)),Am=yn.frame),yn.frame>=fm){fm+=Sn.autoSleep||120;var s=bt._first;if((!s||!s._ts)&&Sn.autoSleep&&yn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||yn.sleep()}}},e}(to);Kn(jt.prototype,{_lock:0,_hasPause:0,_forcing:0});var wS=function(e,n,i,r,s,o,l){var u=new dn(this._pt,e,n,0,1,cf,null,s),h=0,c=0,f,d,p,_,b,m,g,v;for(u.b=i,u.e=r,i+="",r+="",(g=~r.indexOf("random("))&&(r=ta(r)),o&&(v=[i,r],o(v,e,n),i=v[0],r=v[1]),d=i.match(Rh)||[];f=Rh.exec(r);)_=f[0],b=r.substring(h,f.index),p?p=(p+1)%5:b.substr(-5)==="rgba("&&(p=1),_!==d[c++]&&(m=parseFloat(d[c-1])||0,u._pt={_next:u._pt,p:b||c===1?b:",",s:m,c:_.charAt(1)==="="?Yr(m,_)-m:parseFloat(_)-m,m:p&&p<4?Math.round:0},h=Rh.lastIndex);return u.c=h<r.length?r.substring(h,r.length):"",u.fp=l,(Kh.test(r)||g)&&(u.e=0),this._pt=u,u},rf=function(e,n,i,r,s,o,l,u,h,c){Mt(r)&&(r=r(s||0,e,o));var f=e[n],d=i!=="get"?i:Mt(f)?h?e[n.indexOf("set")||!Mt(e["get"+n.substr(3)])?n:"get"+n.substr(3)](h):e[n]():f,p=Mt(f)?h?PS:Jm:of,_;if(Ft(r)&&(~r.indexOf("random(")&&(r=ta(r)),r.charAt(1)==="="&&(_=Yr(d,r)+(Kt(d)||0),(_||_===0)&&(r=_))),!c||d!==r||Wh)return!isNaN(d*r)&&r!==""?(_=new dn(this._pt,e,n,+d||0,r-(d||0),typeof f=="boolean"?IS:Zm,0,p),h&&(_.fp=h),l&&_.modifier(l,this,e),this._pt=_):(!f&&!(n in e)&&Jc(n,r),wS.call(this,e,n,d,r,p,u||Sn.stringFilter,h))},AS=function(e,n,i,r,s){if(Mt(e)&&(e=Za(e,s,n,i,r)),!di(e)||e.style&&e.nodeType||nn(e)||ym(e))return Ft(e)?Za(e,s,n,i,r):e;var o={},l;for(l in e)o[l]=Za(e[l],s,n,i,r);return o},sf=function(e,n,i,r,s,o){var l,u,h,c;if(vn[e]&&(l=new vn[e]).init(s,l.rawVars?n[e]:AS(n[e],r,s,o,i),i,r,o)!==!1&&(i._pt=u=new dn(i._pt,s,e,0,1,l.render,l,0,l.priority),i!==Js))for(h=i._ptLookup[i._targets.indexOf(s)],c=l._props.length;c--;)h[l._props[c]]=u;return l},fr,Wh,af=function a(e,n,i){var r=e.vars,s=r.ease,o=r.startAt,l=r.immediateRender,u=r.lazy,h=r.onUpdate,c=r.runBackwards,f=r.yoyoEase,d=r.keyframes,p=r.autoRevert,_=e._dur,b=e._startAt,m=e._targets,g=e.parent,v=g&&g.data==="nested"?g.vars.targets:m,x=e._overwrite==="auto"&&!qh,M=e.timeline,w,T,A,C,y,S,N,F,V,I,U,k,Y;if(M&&(!d||!s)&&(s="none"),e._ease=Vr(s,Zs.ease),e._yEase=f?Xm(Vr(f===!0?s:f,Zs.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!M&&!!r.runBackwards,!M||d&&!r.stagger){if(F=m[0]?pr(m[0]).harness:0,k=F&&r[F.prop],w=qc(r,Zh),b&&(b._zTime<0&&b.progress(1),n<0&&c&&l&&!p?b.render(-1,!0):b.revert(c&&_?Gc:eS),b._lazy=0),o){if(mr(e._startAt=Ct.set(m,Kn({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!b&&Mn(u),startAt:null,delay:0,onUpdate:h&&function(){return On(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,n<0&&(tn||!l&&!p)&&e._startAt.revert(Gc),l&&_&&n<=0&&i<=0){n&&(e._zTime=n);return}}else if(c&&_&&!b){if(n&&(l=!1),A=Kn({overwrite:!1,data:"isFromStart",lazy:l&&!b&&Mn(u),immediateRender:l,stagger:0,parent:g},w),k&&(A[F.prop]=k),mr(e._startAt=Ct.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,n<0&&(tn?e._startAt.revert(Gc):e._startAt.render(-1,!0)),e._zTime=n,!l)a(e._startAt,ut,ut);else if(!n)return}for(e._pt=e._ptCache=0,u=_&&Mn(u)||u&&!_,T=0;T<m.length;T++){if(y=m[T],N=y._gsap||$h(m)[T]._gsap,e._ptLookup[T]=I={},kh[N.id]&&dr.length&&Xc(),U=v===m?T:v.indexOf(y),F&&(V=new F).init(y,k||w,e,U,v)!==!1&&(e._pt=C=new dn(e._pt,y,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(K){I[K]=C}),V.priority&&(S=1)),!F||k)for(A in w)vn[A]&&(V=sf(A,w,e,U,y,v))?V.priority&&(S=1):I[A]=C=rf.call(e,y,A,"get",w[A],U,v,0,r.stringFilter);e._op&&e._op[T]&&e.kill(y,e._op[T]),x&&e._pt&&(fr=e,bt.killTweensOf(y,I,e.globalTime(n)),Y=!e.parent,fr=0),e._pt&&u&&(kh[N.id]=1)}S&&uf(e),e._onInit&&e._onInit(e)}e._onUpdate=h,e._initted=(!e._op||e._pt)&&!Y,d&&n<=0&&M.render(Yn,!0,!0)},ES=function(e,n,i,r,s,o,l,u){var h=(e._pt&&e._ptCache||(e._ptCache={}))[n],c,f,d,p;if(!h)for(h=e._ptCache[n]=[],d=e._ptLookup,p=e._targets.length;p--;){if(c=d[p][n],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==n&&c.fp!==n;)c=c._next;if(!c)return Wh=1,e.vars[n]="+=0",af(e,l),Wh=0,u?Qa(n+" not eligible for reset"):1;h.push(c)}for(p=h.length;p--;)f=h[p],c=f._pt||f,c.s=(r||r===0)&&!s?r:c.s+(r||0)+o*c.c,c.c=i-c.s,f.e&&(f.e=St(i)+Kt(f.e)),f.b&&(f.b=c.s+Kt(f.b))},RS=function(e,n){var i=e[0]?pr(e[0]).harness:0,r=i&&i.aliases,s,o,l,u;if(!r)return n;s=Xr({},n);for(o in r)if(o in s)for(u=r[o].split(","),l=u.length;l--;)s[u[l]]=s[o];return s},CS=function(e,n,i,r){var s=n.ease||r||"power1.inOut",o,l;if(nn(n))l=i[e]||(i[e]=[]),n.forEach(function(u,h){return l.push({t:h/(n.length-1)*100,v:u,e:s})});else for(o in n)l=i[o]||(i[o]=[]),o==="ease"||l.push({t:parseFloat(e),v:n[o],e:s})},Za=function(e,n,i,r,s){return Mt(e)?e.call(n,i,r,s):Ft(e)&&~e.indexOf("random(")?ta(e):e},jm=Qh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Km={};fn(jm+",id,stagger,delay,duration,paused,scrollTrigger",function(a){return Km[a]=1});var Ct=function(a){xm(e,a);function e(i,r,s,o){var l;typeof r=="number"&&(s.duration=r,r=s,s=null),l=a.call(this,o?r:Ka(r))||this;var u=l.vars,h=u.duration,c=u.delay,f=u.immediateRender,d=u.stagger,p=u.overwrite,_=u.keyframes,b=u.defaults,m=u.scrollTrigger,g=u.yoyoEase,v=r.parent||bt,x=(nn(i)||ym(i)?zi(i[0]):"length"in r)?[i]:jn(i),M,w,T,A,C,y,S,N;if(l._targets=x.length?$h(x):Qa("GSAP target "+i+" not found. https://gsap.com",!Sn.nullTargetWarn)||[],l._ptLookup=[],l._overwrite=p,_||d||zc(h)||zc(c)){if(r=l.vars,M=l.timeline=new jt({data:"nested",defaults:b||{},targets:v&&v.data==="nested"?v.vars.targets:x}),M.kill(),M.parent=M._dp=ki(l),M._start=0,d||zc(h)||zc(c)){if(A=x.length,S=d&&Um(d),di(d))for(C in d)~jm.indexOf(C)&&(N||(N={}),N[C]=d[C]);for(w=0;w<A;w++)T=qc(r,Km),T.stagger=0,g&&(T.yoyoEase=g),N&&Xr(T,N),y=x[w],T.duration=+Za(h,ki(l),w,y,x),T.delay=(+Za(c,ki(l),w,y,x)||0)-l._delay,!d&&A===1&&T.delay&&(l._delay=c=T.delay,l._start+=c,T.delay=0),M.to(y,T,S?S(w,y,x):0),M._ease=je.none;M.duration()?h=c=0:l.timeline=0}else if(_){Ka(Kn(M.vars.defaults,{ease:"none"})),M._ease=Vr(_.ease||r.ease||"none");var F=0,V,I,U;if(nn(_))_.forEach(function(k){return M.to(x,k,">")}),M.duration();else{T={};for(C in _)C==="ease"||C==="easeEach"||CS(C,_[C],T,_.easeEach);for(C in T)for(V=T[C].sort(function(k,Y){return k.t-Y.t}),F=0,w=0;w<V.length;w++)I=V[w],U={ease:I.e,duration:(I.t-(w?V[w-1].t:0))/100*h},U[C]=I.v,M.to(x,U,F),F+=U.duration;M.duration()<h&&M.to({},{duration:h-M.duration()})}}h||l.duration(h=M.duration())}else l.timeline=0;return p===!0&&!qh&&(fr=ki(l),bt.killTweensOf(x),fr=0),fi(v,ki(l),s),r.reversed&&l.reverse(),r.paused&&l.paused(!0),(f||!h&&!_&&l._start===Ht(v._time)&&Mn(f)&&aS(ki(l))&&v.data!=="nested")&&(l._tTime=-ut,l.render(Math.max(0,-c)||0)),m&&Im(ki(l),m),l}var n=e.prototype;return n.render=function(r,s,o){var l=this._time,u=this._tDur,h=this._dur,c=r<0,f=r>u-ut&&!c?u:r<ut?0:r,d,p,_,b,m,g,v,x,M;if(!h)cS(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c){if(d=f,x=this.timeline,this._repeat){if(b=h+this._rDelay,this._repeat<-1&&c)return this.totalTime(b*100+r,s,o);if(d=Ht(f%b),f===u?(_=this._repeat,d=h):(_=~~(f/b),_&&_===Ht(f/b)&&(d=h,_--),d>h&&(d=h)),g=this._yoyo&&_&1,g&&(M=this._yEase,d=h-d),m=Qs(this._tTime,b),d===l&&!o&&this._initted&&_===m)return this._tTime=f,this;_!==m&&(x&&this._yEase&&qm(x,g),this.vars.repeatRefresh&&!g&&!this._lock&&this._time!==b&&this._initted&&(this._lock=o=1,this.render(Ht(b*_),!0).invalidate()._lock=0))}if(!this._initted){if(Dm(this,c?r:d,o,s,f))return this._tTime=0,this;if(l!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(h!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=v=(M||this._ease)(d/h),this._from&&(this.ratio=v=1-v),d&&!l&&!s&&!_&&(On(this,"onStart"),this._tTime!==f))return this;for(p=this._pt;p;)p.r(v,p.d),p=p._next;x&&x.render(r<0?r:x._dur*x._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(c&&Bh(this,r,s,o),On(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&On(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(c&&!this._onUpdate&&Bh(this,r,!0,!0),(r||!h)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&mr(this,1),!s&&!(c&&!l)&&(f||l||g)&&(On(this,f===u?"onComplete":"onReverseComplete",!0),this._prom&&!(f<u&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),a.prototype.invalidate.call(this,r)},n.resetTo=function(r,s,o,l,u){eo||yn.wake(),this._ts||this.play();var h=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||af(this,h),c=this._ease(h/this._dur),ES(this,r,s,o,l,c,h,u)?this.resetTo(r,s,o,l,1):($c(this,0),this.parent||Pm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ya(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,fr&&fr.vars.overwrite!==!0)._first||Ya(this),this.parent&&o!==this.timeline.totalDuration()&&$s(this,this._dur*this.timeline._tDur/o,0,1),this}var l=this._targets,u=r?jn(r):l,h=this._ptLookup,c=this._pt,f,d,p,_,b,m,g;if((!s||s==="all")&&rS(l,u))return s==="all"&&(this._pt=0),Ya(this);for(f=this._op=this._op||[],s!=="all"&&(Ft(s)&&(b={},fn(s,function(v){return b[v]=1}),s=b),s=RS(l,s)),g=l.length;g--;)if(~u.indexOf(l[g])){d=h[g],s==="all"?(f[g]=s,_=d,p={}):(p=f[g]=f[g]||{},_=s);for(b in _)m=d&&d[b],m&&((!("kill"in m.d)||m.d.kill(b)===!0)&&Zc(this,m,"_pt"),delete d[b]),p!=="all"&&(p[b]=1)}return this._initted&&!this._pt&&c&&Ya(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ja(1,arguments)},e.delayedCall=function(r,s,o,l){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:l})},e.fromTo=function(r,s,o){return Ja(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return bt.killTweensOf(r,s,o)},e}(to);Kn(Ct.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});fn("staggerTo,staggerFrom,staggerFromTo",function(a){Ct[a]=function(){var e=new jt,n=Gh.call(arguments,0);return n.splice(a==="staggerFromTo"?5:4,0,0),e[a].apply(e,n)}});var of=function(e,n,i){return e[n]=i},Jm=function(e,n,i){return e[n](i)},PS=function(e,n,i,r){return e[n](r.fp,i)},LS=function(e,n,i){return e.setAttribute(n,i)},el=function(e,n){return Mt(e[n])?Jm:Kc(e[n])&&e.setAttribute?LS:of},Zm=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},IS=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},cf=function(e,n){var i=n._pt,r="";if(!e&&n.b)r=n.b;else if(e===1&&n.e)r=n.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=n.c}n.set(n.t,n.p,r,n)},lf=function(e,n){for(var i=n._pt;i;)i.r(e,i.d),i=i._next},DS=function(e,n,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,n,i),s=o},OS=function(e){for(var n=this._pt,i,r;n;)r=n._next,n.p===e&&!n.op||n.op===e?Zc(this,n,"_pt"):n.dep||(i=1),n=r;return!i},NS=function(e,n,i,r){r.mSet(e,n,r.m.call(r.tween,i,r.mt),r)},uf=function(e){for(var n=e._pt,i,r,s,o;n;){for(i=n._next,r=s;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:o)?n._prev._next=n:s=n,(n._next=r)?r._prev=n:o=n,n=i}e._pt=s},dn=function(){function a(n,i,r,s,o,l,u,h,c){this.t=i,this.s=s,this.c=o,this.p=r,this.r=l||Zm,this.d=u||this,this.set=h||of,this.pr=c||0,this._next=n,n&&(n._prev=this)}var e=a.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=NS,this.m=i,this.mt=s,this.tween=r},a}();fn(Qh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(a){return Zh[a]=1});Nn.TweenMax=Nn.TweenLite=Ct;Nn.TimelineLite=Nn.TimelineMax=jt;bt=new jt({sortChildren:!1,defaults:Zs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Sn.stringFilter=tf;var Wr=[],Vc={},US=[],bm=0,FS=0,Dh=function(e){return(Vc[e]||US).map(function(n){return n()})},Xh=function(){var e=Date.now(),n=[];e-bm>2&&(Dh("matchMediaInit"),Wr.forEach(function(i){var r=i.queries,s=i.conditions,o,l,u,h;for(l in r)o=hi.matchMedia(r[l]).matches,o&&(u=1),o!==s[l]&&(s[l]=o,h=1);h&&(i.revert(),u&&n.push(i))}),Dh("matchMediaRevert"),n.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),bm=e,Dh("matchMedia"))},Qm=function(){function a(n,i){this.selector=i&&Hh(i),this.data=[],this._r=[],this.isReverted=!1,this.id=FS++,n&&this.add(n)}var e=a.prototype;return e.add=function(i,r,s){Mt(i)&&(s=r,r=i,i=Mt);var o=this,l=function(){var h=ft,c=o.selector,f;return h&&h!==o&&h.data.push(o),s&&(o.selector=Hh(s)),ft=o,f=r.apply(o,arguments),Mt(f)&&o._r.push(f),ft=h,o.selector=c,o.isReverted=!1,f};return o.last=l,i===Mt?l(o,function(u){return o.add(null,u)}):i?o[i]=l:l},e.ignore=function(i){var r=ft;ft=null,i(this),ft=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof a?i.push.apply(i,r.getTweens()):r instanceof Ct&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var l=s.getTweens(),u=s.data.length,h;u--;)h=s.data[u],h.data==="isFlip"&&(h.revert(),h.getChildren(!0,!0,!1).forEach(function(c){return l.splice(l.indexOf(c),1)}));for(l.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,f){return f.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),u=s.data.length;u--;)h=s.data[u],h instanceof jt?h.data!=="nested"&&(h.scrollTrigger&&h.scrollTrigger.revert(),h.kill()):!(h instanceof Ct)&&h.revert&&h.revert(i);s._r.forEach(function(c){return c(i,s)}),s.isReverted=!0}():this.data.forEach(function(l){return l.kill&&l.kill()}),this.clear(),r)for(var o=Wr.length;o--;)Wr[o].id===this.id&&Wr.splice(o,1)},e.revert=function(i){this.kill(i||{})},a}(),kS=function(){function a(n){this.contexts=[],this.scope=n,ft&&ft.data.push(this)}var e=a.prototype;return e.add=function(i,r,s){di(i)||(i={matches:i});var o=new Qm(0,s||this.scope),l=o.conditions={},u,h,c;ft&&!o.selector&&(o.selector=ft.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(h in i)h==="all"?c=1:(u=hi.matchMedia(i[h]),u&&(Wr.indexOf(o)<0&&Wr.push(o),(l[h]=u.matches)&&(c=1),u.addListener?u.addListener(Xh):u.addEventListener("change",Xh)));return c&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},a}(),jc={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];n.forEach(function(r){return Hm(r)})},timeline:function(e){return new jt(e)},getTweensOf:function(e,n){return bt.getTweensOf(e,n)},getProperty:function(e,n,i,r){Ft(e)&&(e=jn(e)[0]);var s=pr(e||{}).get,o=i?Cm:Rm;return i==="native"&&(i=""),e&&(n?o((vn[n]&&vn[n].get||s)(e,n,i,r)):function(l,u,h){return o((vn[l]&&vn[l].get||s)(e,l,u,h))})},quickSetter:function(e,n,i){if(e=jn(e),e.length>1){var r=e.map(function(c){return rn.quickSetter(c,n,i)}),s=r.length;return function(c){for(var f=s;f--;)r[f](c)}}e=e[0]||{};var o=vn[n],l=pr(e),u=l.harness&&(l.harness.aliases||{})[n]||n,h=o?function(c){var f=new o;Js._pt=0,f.init(e,i?c+i:c,Js,0,[e]),f.render(1,f),Js._pt&&lf(1,Js)}:l.set(e,u);return o?h:function(c){return h(e,u,i?c+i:c,l,1)}},quickTo:function(e,n,i){var r,s=rn.to(e,Xr((r={},r[n]="+=0.1",r.paused=!0,r),i||{})),o=function(u,h,c){return s.resetTo(n,u,h,c)};return o.tween=s,o},isTweening:function(e){return bt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Vr(e.ease,Zs.ease)),dm(Zs,e||{})},config:function(e){return dm(Sn,e||{})},registerEffect:function(e){var n=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(l){return l&&!vn[l]&&!Nn[l]&&Qa(n+" effect requires "+l+" plugin.")}),Ch[n]=function(l,u,h){return i(jn(l),Kn(u||{},s),h)},o&&(jt.prototype[n]=function(l,u,h){return this.add(Ch[n](l,di(u)?u:(h=u)&&{},this),h)})},registerEase:function(e,n){je[e]=Vr(n)},parseEase:function(e,n){return arguments.length?Vr(e,n):je},getById:function(e){return bt.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var i=new jt(e),r,s;for(i.smoothChildTiming=Mn(e.smoothChildTiming),bt.remove(i),i._dp=0,i._time=i._tTime=bt._time,r=bt._first;r;)s=r._next,(n||!(!r._dur&&r instanceof Ct&&r.vars.onComplete===r._targets[0]))&&fi(i,r,r._start-r._delay),r=s;return fi(bt,i,0),i},context:function(e,n){return e?new Qm(e,n):ft},matchMedia:function(e){return new kS(e)},matchMediaRefresh:function(){return Wr.forEach(function(e){var n=e.conditions,i,r;for(r in n)n[r]&&(n[r]=!1,i=1);i&&e.revert()})||Xh()},addEventListener:function(e,n){var i=Vc[e]||(Vc[e]=[]);~i.indexOf(n)||i.push(n)},removeEventListener:function(e,n){var i=Vc[e],r=i&&i.indexOf(n);r>=0&&i.splice(r,1)},utils:{wrap:gS,wrapYoyo:_S,distribute:Um,random:km,snap:Fm,normalize:mS,getUnit:Kt,clamp:hS,splitColor:Vm,toArray:jn,selector:Hh,mapRange:zm,pipe:dS,unitize:pS,interpolate:bS,shuffle:Nm},install:Tm,effects:Ch,ticker:yn,updateRoot:jt.updateRoot,plugins:vn,globalTimeline:bt,core:{PropTween:dn,globals:wm,Tween:Ct,Timeline:jt,Animation:to,getCache:pr,_removeLinkedListItem:Zc,reverting:function(){return tn},context:function(e){return e&&ft&&(ft.data.push(e),e._ctx=ft),ft},suppressOverwrites:function(e){return qh=e}}};fn("to,from,fromTo,delayedCall,set,killTweensOf",function(a){return jc[a]=Ct[a]});yn.add(jt.updateRoot);Js=jc.to({},{duration:0});var BS=function(e,n){for(var i=e._pt;i&&i.p!==n&&i.op!==n&&i.fp!==n;)i=i._next;return i},zS=function(e,n){var i=e._targets,r,s,o;for(r in n)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=BS(o,r)),o&&o.modifier&&o.modifier(n[r],e,i[s],r))},Oh=function(e,n){return{name:e,rawVars:1,init:function(r,s,o){o._onInit=function(l){var u,h;if(Ft(s)&&(u={},fn(s,function(c){return u[c]=1}),s=u),n){u={};for(h in s)u[h]=n(s[h]);s=u}zS(l,s)}}}},rn=jc.registerPlugin({name:"attr",init:function(e,n,i,r,s){var o,l,u;this.tween=i;for(o in n)u=e.getAttribute(o)||"",l=this.add(e,"setAttribute",(u||0)+"",n[o],r,s,0,0,o),l.op=o,l.b=u,this._props.push(o)},render:function(e,n){for(var i=n._pt;i;)tn?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",init:function(e,n){for(var i=n.length;i--;)this.add(e,i,e[i]||0,n[i],0,0,0,0,0,1)}},Oh("roundProps",Vh),Oh("modifiers"),Oh("snap",Fm))||jc;Ct.version=jt.version=rn.version="3.12.5";Sm=1;Yh()&&ea();var GS=je.Power0,HS=je.Power1,VS=je.Power2,WS=je.Power3,XS=je.Power4,qS=je.Linear,YS=je.Quad,jS=je.Cubic,KS=je.Quart,JS=je.Quint,ZS=je.Strong,QS=je.Elastic,$S=je.Back,eT=je.SteppedEase,tT=je.Bounce,nT=je.Sine,iT=je.Expo,rT=je.Circ;var $m,_r,ia,_f,Qr,sT,eg,bf,aT=function(){return typeof window!="undefined"},Hi={},Zr=180/Math.PI,ra=Math.PI/180,na=Math.atan2,tg=1e8,xf=/([A-Z])/g,oT=/(left|right|width|margin|padding|x)/i,cT=/[\s,\(]\S/,pi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},df=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},lT=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},uT=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},hT=function(e,n){var i=n.s+n.c*e;n.set(n.t,n.p,~~(i+(i<0?-.5:.5))+n.u,n)},cg=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},lg=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},fT=function(e,n,i){return e.style[n]=i},dT=function(e,n,i){return e.style.setProperty(n,i)},pT=function(e,n,i){return e._gsap[n]=i},mT=function(e,n,i){return e._gsap.scaleX=e._gsap.scaleY=i},gT=function(e,n,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},_T=function(e,n,i,r,s){var o=e._gsap;o[n]=i,o.renderTransform(s,o)},xt="transform",Tn=xt+"Origin",bT=function a(e,n){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Hi&&s){if(this.tfm=this.tfm||{},e!=="transform")e=pi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(l){return i.tfm[l]=Gi(r,l)}):this.tfm[e]=o.x?o[e]:Gi(r,e),e===Tn&&(this.tfm.zOrigin=o.zOrigin);else return pi.transform.split(",").forEach(function(l){return a.call(i,l,n)});if(this.props.indexOf(xt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Tn,n,"")),e=xt}(s||n)&&this.props.push(e,n,s[e])},ug=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},xT=function(){var e=this.props,n=this.target,i=n.style,r=n._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?n[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(xf,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=bf(),(!s||!s.isStart)&&!i[xt]&&(ug(i),r.zOrigin&&i[Tn]&&(i[Tn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},hg=function(e,n){var i={target:e,props:[],revert:xT,save:bT};return e._gsap||rn.core.getCache(e),n&&n.split(",").forEach(function(r){return i.save(r)}),i},fg,pf=function(e,n){var i=_r.createElementNS?_r.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):_r.createElement(e);return i&&i.style?i:_r.createElement(e)},mi=function a(e,n,i){var r=getComputedStyle(e);return r[n]||r.getPropertyValue(n.replace(xf,"-$1").toLowerCase())||r.getPropertyValue(n)||!i&&a(e,sa(n)||n,1)||""},ng="O,Moz,ms,Ms,Webkit".split(","),sa=function(e,n,i){var r=n||Qr,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(ng[o]+e in s););return o<0?null:(o===3?"ms":o>=0?ng[o]:"")+e},mf=function(){aT()&&window.document&&($m=window,_r=$m.document,ia=_r.documentElement,Qr=pf("div")||{style:{}},sT=pf("div"),xt=sa(xt),Tn=xt+"Origin",Qr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",fg=!!sa("perspective"),bf=rn.core.reverting,_f=1)},hf=function a(e){var n=pf("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,r=this.nextSibling,s=this.style.cssText,o;if(ia.appendChild(n),n.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=a}catch{}else this._gsapBBox&&(o=this._gsapBBox());return i&&(r?i.insertBefore(this,r):i.appendChild(this)),ia.removeChild(n),this.style.cssText=s,o},ig=function(e,n){for(var i=n.length;i--;)if(e.hasAttribute(n[i]))return e.getAttribute(n[i])},dg=function(e){var n;try{n=e.getBBox()}catch{n=hf.call(e,!0)}return n&&(n.width||n.height)||e.getBBox===hf||(n=hf.call(e,!0)),n&&!n.width&&!n.x&&!n.y?{x:+ig(e,["x","cx","x1"])||0,y:+ig(e,["y","cy","y1"])||0,width:0,height:0}:n},pg=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&dg(e))},$r=function(e,n){if(n){var i=e.style,r;n in Hi&&n!==Tn&&(n=xt),i.removeProperty?(r=n.substr(0,2),(r==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),i.removeProperty(r==="--"?n:n.replace(xf,"-$1").toLowerCase())):i.removeAttribute(n)}},br=function(e,n,i,r,s,o){var l=new dn(e._pt,n,i,0,1,o?lg:cg);return e._pt=l,l.b=r,l.e=s,e._props.push(i),l},rg={deg:1,rad:1,turn:1},vT={grid:1,flex:1},xr=function a(e,n,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",l=Qr.style,u=oT.test(n),h=e.tagName.toLowerCase()==="svg",c=(h?"client":"offset")+(u?"Width":"Height"),f=100,d=r==="px",p=r==="%",_,b,m,g;if(r===o||!s||rg[r]||rg[o])return s;if(o!=="px"&&!d&&(s=a(e,n,i,"px")),g=e.getCTM&&pg(e),(p||o==="%")&&(Hi[n]||~n.indexOf("adius")))return _=g?e.getBBox()[u?"width":"height"]:e[c],St(p?s/_*f:s/100*_);if(l[u?"width":"height"]=f+(d?o:r),b=~n.indexOf("adius")||r==="em"&&e.appendChild&&!h?e:e.parentNode,g&&(b=(e.ownerSVGElement||{}).parentNode),(!b||b===_r||!b.appendChild)&&(b=_r.body),m=b._gsap,m&&p&&m.width&&u&&m.time===yn.time&&!m.uncache)return St(s/m.width*f);if(p&&(n==="height"||n==="width")){var v=e.style[n];e.style[n]=f+r,_=e[c],v?e.style[n]=v:$r(e,n)}else(p||o==="%")&&!vT[mi(b,"display")]&&(l.position=mi(e,"position")),b===e&&(l.position="static"),b.appendChild(Qr),_=Qr[c],b.removeChild(Qr),l.position="absolute";return u&&p&&(m=pr(b),m.time=yn.time,m.width=b[c]),St(d?_*s/f:_&&s?f/_*s:0)},Gi=function(e,n,i,r){var s;return _f||mf(),n in pi&&n!=="transform"&&(n=pi[n],~n.indexOf(",")&&(n=n.split(",")[0])),Hi[n]&&n!=="transform"?(s=so(e,r),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:nl(mi(e,Tn))+" "+s.zOrigin+"px"):(s=e.style[n],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=tl[n]&&tl[n](e,n,i)||mi(e,n)||ef(e,n)||(n==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?xr(e,n,s,i)+i:s},yT=function(e,n,i,r){if(!i||i==="none"){var s=sa(n,e,1),o=s&&mi(e,s,1);o&&o!==i?(n=s,i=o):n==="borderColor"&&(i=mi(e,"borderTopColor"))}var l=new dn(this._pt,e.style,n,0,1,cf),u=0,h=0,c,f,d,p,_,b,m,g,v,x,M,w;if(l.b=i,l.e=r,i+="",r+="",r==="auto"&&(b=e.style[n],e.style[n]=r,r=mi(e,n)||r,b?e.style[n]=b:$r(e,n)),c=[i,r],tf(c),i=c[0],r=c[1],d=i.match(qr)||[],w=r.match(qr)||[],w.length){for(;f=qr.exec(r);)m=f[0],v=r.substring(u,f.index),_?_=(_+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(_=1),m!==(b=d[h++]||"")&&(p=parseFloat(b)||0,M=b.substr((p+"").length),m.charAt(1)==="="&&(m=Yr(p,m)+M),g=parseFloat(m),x=m.substr((g+"").length),u=qr.lastIndex-x.length,x||(x=x||Sn.units[n]||M,u===r.length&&(r+=x,l.e+=x)),M!==x&&(p=xr(e,n,b,x)||0),l._pt={_next:l._pt,p:v||h===1?v:",",s:p,c:g-p,m:_&&_<4||n==="zIndex"?Math.round:0});l.c=u<r.length?r.substring(u,r.length):""}else l.r=n==="display"&&r==="none"?lg:cg;return Kh.test(r)&&(l.e=0),this._pt=l,l},sg={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},MT=function(e){var n=e.split(" "),i=n[0],r=n[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),n[0]=sg[i]||i,n[1]=sg[r]||r,n.join(" ")},ST=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var i=n.t,r=i.style,s=n.u,o=i._gsap,l,u,h;if(s==="all"||s===!0)r.cssText="",u=1;else for(s=s.split(","),h=s.length;--h>-1;)l=s[h],Hi[l]&&(u=1,l=l==="transformOrigin"?Tn:xt),$r(i,l);u&&($r(i,xt),o&&(o.svg&&i.removeAttribute("transform"),so(i,1),o.uncache=1,ug(r)))}},tl={clearProps:function(e,n,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new dn(e._pt,n,i,0,0,ST);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},ro=[1,0,0,1,0,0],mg={},gg=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ag=function(e){var n=mi(e,xt);return gg(n)?ro:n.substr(7).match(jh).map(St)},vf=function(e,n){var i=e._gsap||pr(e),r=e.style,s=ag(e),o,l,u,h;return i.svg&&e.getAttribute("transform")?(u=e.transform.baseVal.consolidate().matrix,s=[u.a,u.b,u.c,u.d,u.e,u.f],s.join(",")==="1,0,0,1,0,0"?ro:s):(s===ro&&!e.offsetParent&&e!==ia&&!i.svg&&(u=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(h=1,l=e.nextElementSibling,ia.appendChild(e)),s=ag(e),u?r.display=u:$r(e,"display"),h&&(l?o.insertBefore(e,l):o?o.appendChild(e):ia.removeChild(e))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},gf=function(e,n,i,r,s,o){var l=e._gsap,u=s||vf(e,!0),h=l.xOrigin||0,c=l.yOrigin||0,f=l.xOffset||0,d=l.yOffset||0,p=u[0],_=u[1],b=u[2],m=u[3],g=u[4],v=u[5],x=n.split(" "),M=parseFloat(x[0])||0,w=parseFloat(x[1])||0,T,A,C,y;i?u!==ro&&(A=p*m-_*b)&&(C=M*(m/A)+w*(-b/A)+(b*v-m*g)/A,y=M*(-_/A)+w*(p/A)-(p*v-_*g)/A,M=C,w=y):(T=dg(e),M=T.x+(~x[0].indexOf("%")?M/100*T.width:M),w=T.y+(~(x[1]||x[0]).indexOf("%")?w/100*T.height:w)),r||r!==!1&&l.smooth?(g=M-h,v=w-c,l.xOffset=f+(g*p+v*b)-g,l.yOffset=d+(g*_+v*m)-v):l.xOffset=l.yOffset=0,l.xOrigin=M,l.yOrigin=w,l.smooth=!!r,l.origin=n,l.originIsAbsolute=!!i,e.style[Tn]="0px 0px",o&&(br(o,l,"xOrigin",h,M),br(o,l,"yOrigin",c,w),br(o,l,"xOffset",f,l.xOffset),br(o,l,"yOffset",d,l.yOffset)),e.setAttribute("data-svg-origin",M+" "+w)},so=function(e,n){var i=e._gsap||new nf(e);if("x"in i&&!n&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",l="deg",u=getComputedStyle(e),h=mi(e,Tn)||"0",c,f,d,p,_,b,m,g,v,x,M,w,T,A,C,y,S,N,F,V,I,U,k,Y,K,j,J,Q,re,X,Z,ce;return c=f=d=b=m=g=v=x=M=0,p=_=1,i.svg=!!(e.getCTM&&pg(e)),u.translate&&((u.translate!=="none"||u.scale!=="none"||u.rotate!=="none")&&(r[xt]=(u.translate!=="none"?"translate3d("+(u.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(u.rotate!=="none"?"rotate("+u.rotate+") ":"")+(u.scale!=="none"?"scale("+u.scale.split(" ").join(",")+") ":"")+(u[xt]!=="none"?u[xt]:"")),r.scale=r.rotate=r.translate="none"),A=vf(e,i.svg),i.svg&&(i.uncache?(K=e.getBBox(),h=i.xOrigin-K.x+"px "+(i.yOrigin-K.y)+"px",Y=""):Y=!n&&e.getAttribute("data-svg-origin"),gf(e,Y||h,!!Y||i.originIsAbsolute,i.smooth!==!1,A)),w=i.xOrigin||0,T=i.yOrigin||0,A!==ro&&(N=A[0],F=A[1],V=A[2],I=A[3],c=U=A[4],f=k=A[5],A.length===6?(p=Math.sqrt(N*N+F*F),_=Math.sqrt(I*I+V*V),b=N||F?na(F,N)*Zr:0,v=V||I?na(V,I)*Zr+b:0,v&&(_*=Math.abs(Math.cos(v*ra))),i.svg&&(c-=w-(w*N+T*V),f-=T-(w*F+T*I))):(ce=A[6],X=A[7],J=A[8],Q=A[9],re=A[10],Z=A[11],c=A[12],f=A[13],d=A[14],C=na(ce,re),m=C*Zr,C&&(y=Math.cos(-C),S=Math.sin(-C),Y=U*y+J*S,K=k*y+Q*S,j=ce*y+re*S,J=U*-S+J*y,Q=k*-S+Q*y,re=ce*-S+re*y,Z=X*-S+Z*y,U=Y,k=K,ce=j),C=na(-V,re),g=C*Zr,C&&(y=Math.cos(-C),S=Math.sin(-C),Y=N*y-J*S,K=F*y-Q*S,j=V*y-re*S,Z=I*S+Z*y,N=Y,F=K,V=j),C=na(F,N),b=C*Zr,C&&(y=Math.cos(C),S=Math.sin(C),Y=N*y+F*S,K=U*y+k*S,F=F*y-N*S,k=k*y-U*S,N=Y,U=K),m&&Math.abs(m)+Math.abs(b)>359.9&&(m=b=0,g=180-g),p=St(Math.sqrt(N*N+F*F+V*V)),_=St(Math.sqrt(k*k+ce*ce)),C=na(U,k),v=Math.abs(C)>2e-4?C*Zr:0,M=Z?1/(Z<0?-Z:Z):0),i.svg&&(Y=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!gg(mi(e,xt)),Y&&e.setAttribute("transform",Y))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(p*=-1,v+=b<=0?180:-180,b+=b<=0?180:-180):(_*=-1,v+=v<=0?180:-180)),n=n||i.uncache,i.x=c-((i.xPercent=c&&(!n&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!n&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=d+o,i.scaleX=St(p),i.scaleY=St(_),i.rotation=St(b)+l,i.rotationX=St(m)+l,i.rotationY=St(g)+l,i.skewX=v+l,i.skewY=x+l,i.transformPerspective=M+o,(i.zOrigin=parseFloat(h.split(" ")[2])||!n&&i.zOrigin||0)&&(r[Tn]=nl(h)),i.xOffset=i.yOffset=0,i.force3D=Sn.force3D,i.renderTransform=i.svg?wT:fg?_g:TT,i.uncache=0,i},nl=function(e){return(e=e.split(" "))[0]+" "+e[1]},ff=function(e,n,i){var r=Kt(n);return St(parseFloat(n)+parseFloat(xr(e,"x",i+"px",r)))+r},TT=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,_g(e,n)},Kr="0deg",io="0px",Jr=") ",_g=function(e,n){var i=n||this,r=i.xPercent,s=i.yPercent,o=i.x,l=i.y,u=i.z,h=i.rotation,c=i.rotationY,f=i.rotationX,d=i.skewX,p=i.skewY,_=i.scaleX,b=i.scaleY,m=i.transformPerspective,g=i.force3D,v=i.target,x=i.zOrigin,M="",w=g==="auto"&&e&&e!==1||g===!0;if(x&&(f!==Kr||c!==Kr)){var T=parseFloat(c)*ra,A=Math.sin(T),C=Math.cos(T),y;T=parseFloat(f)*ra,y=Math.cos(T),o=ff(v,o,A*y*-x),l=ff(v,l,-Math.sin(T)*-x),u=ff(v,u,C*y*-x+x)}m!==io&&(M+="perspective("+m+Jr),(r||s)&&(M+="translate("+r+"%, "+s+"%) "),(w||o!==io||l!==io||u!==io)&&(M+=u!==io||w?"translate3d("+o+", "+l+", "+u+") ":"translate("+o+", "+l+Jr),h!==Kr&&(M+="rotate("+h+Jr),c!==Kr&&(M+="rotateY("+c+Jr),f!==Kr&&(M+="rotateX("+f+Jr),(d!==Kr||p!==Kr)&&(M+="skew("+d+", "+p+Jr),(_!==1||b!==1)&&(M+="scale("+_+", "+b+Jr),v.style[xt]=M||"translate(0, 0)"},wT=function(e,n){var i=n||this,r=i.xPercent,s=i.yPercent,o=i.x,l=i.y,u=i.rotation,h=i.skewX,c=i.skewY,f=i.scaleX,d=i.scaleY,p=i.target,_=i.xOrigin,b=i.yOrigin,m=i.xOffset,g=i.yOffset,v=i.forceCSS,x=parseFloat(o),M=parseFloat(l),w,T,A,C,y;u=parseFloat(u),h=parseFloat(h),c=parseFloat(c),c&&(c=parseFloat(c),h+=c,u+=c),u||h?(u*=ra,h*=ra,w=Math.cos(u)*f,T=Math.sin(u)*f,A=Math.sin(u-h)*-d,C=Math.cos(u-h)*d,h&&(c*=ra,y=Math.tan(h-c),y=Math.sqrt(1+y*y),A*=y,C*=y,c&&(y=Math.tan(c),y=Math.sqrt(1+y*y),w*=y,T*=y)),w=St(w),T=St(T),A=St(A),C=St(C)):(w=f,C=d,T=A=0),(x&&!~(o+"").indexOf("px")||M&&!~(l+"").indexOf("px"))&&(x=xr(p,"x",o,"px"),M=xr(p,"y",l,"px")),(_||b||m||g)&&(x=St(x+_-(_*w+b*A)+m),M=St(M+b-(_*T+b*C)+g)),(r||s)&&(y=p.getBBox(),x=St(x+r/100*y.width),M=St(M+s/100*y.height)),y="matrix("+w+","+T+","+A+","+C+","+x+","+M+")",p.setAttribute("transform",y),v&&(p.style[xt]=y)},AT=function(e,n,i,r,s){var o=360,l=Ft(s),u=parseFloat(s)*(l&&~s.indexOf("rad")?Zr:1),h=u-r,c=r+h+"deg",f,d;return l&&(f=s.split("_")[1],f==="short"&&(h%=o,h!==h%(o/2)&&(h+=h<0?o:-o)),f==="cw"&&h<0?h=(h+o*tg)%o-~~(h/o)*o:f==="ccw"&&h>0&&(h=(h-o*tg)%o-~~(h/o)*o)),e._pt=d=new dn(e._pt,n,i,r,h,lT),d.e=c,d.u="deg",e._props.push(i),d},og=function(e,n){for(var i in n)e[i]=n[i];return e},ET=function(e,n,i){var r=og({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,l,u,h,c,f,d,p,_;r.svg?(h=i.getAttribute("transform"),i.setAttribute("transform",""),o[xt]=n,l=so(i,1),$r(i,xt),i.setAttribute("transform",h)):(h=getComputedStyle(i)[xt],o[xt]=n,l=so(i,1),o[xt]=h);for(u in Hi)h=r[u],c=l[u],h!==c&&s.indexOf(u)<0&&(p=Kt(h),_=Kt(c),f=p!==_?xr(i,u,h,_):parseFloat(h),d=parseFloat(c),e._pt=new dn(e._pt,l,u,f,d-f,df),e._pt.u=_||0,e._props.push(u));og(l,r)};fn("padding,margin,Width,Radius",function(a,e){var n="Top",i="Right",r="Bottom",s="Left",o=(e<3?[n,i,r,s]:[n+s,n+i,r+i,r+s]).map(function(l){return e<2?a+l:"border"+l+a});tl[e>1?"border"+a:a]=function(l,u,h,c,f){var d,p;if(arguments.length<4)return d=o.map(function(_){return Gi(l,_,h)}),p=d.join(" "),p.split(d[0]).length===5?d[0]:p;d=(c+"").split(" "),p={},o.forEach(function(_,b){return p[_]=d[b]=d[b]||d[(b-1)/2|0]}),l.init(u,p,f)}});var yf={name:"css",register:mf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,i,r,s){var o=this._props,l=e.style,u=i.vars.startAt,h,c,f,d,p,_,b,m,g,v,x,M,w,T,A,C;_f||mf(),this.styles=this.styles||hg(e),C=this.styles.props,this.tween=i;for(b in n)if(b!=="autoRound"&&(c=n[b],!(vn[b]&&sf(b,n,i,r,e,s)))){if(p=typeof c,_=tl[b],p==="function"&&(c=c.call(i,r,e,s),p=typeof c),p==="string"&&~c.indexOf("random(")&&(c=ta(c)),_)_(this,e,b,c,i)&&(A=1);else if(b.substr(0,2)==="--")h=(getComputedStyle(e).getPropertyValue(b)+"").trim(),c+="",Bi.lastIndex=0,Bi.test(h)||(m=Kt(h),g=Kt(c)),g?m!==g&&(h=xr(e,b,h,g)+g):m&&(c+=m),this.add(l,"setProperty",h,c,r,s,0,0,b),o.push(b),C.push(b,0,l[b]);else if(p!=="undefined"){if(u&&b in u?(h=typeof u[b]=="function"?u[b].call(i,r,e,s):u[b],Ft(h)&&~h.indexOf("random(")&&(h=ta(h)),Kt(h+"")||h==="auto"||(h+=Sn.units[b]||Kt(Gi(e,b))||""),(h+"").charAt(1)==="="&&(h=Gi(e,b))):h=Gi(e,b),d=parseFloat(h),v=p==="string"&&c.charAt(1)==="="&&c.substr(0,2),v&&(c=c.substr(2)),f=parseFloat(c),b in pi&&(b==="autoAlpha"&&(d===1&&Gi(e,"visibility")==="hidden"&&f&&(d=0),C.push("visibility",0,l.visibility),br(this,l,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),b!=="scale"&&b!=="transform"&&(b=pi[b],~b.indexOf(",")&&(b=b.split(",")[0]))),x=b in Hi,x){if(this.styles.save(b),M||(w=e._gsap,w.renderTransform&&!n.parseTransform||so(e,n.parseTransform),T=n.smoothOrigin!==!1&&w.smooth,M=this._pt=new dn(this._pt,l,xt,0,1,w.renderTransform,w,0,-1),M.dep=1),b==="scale")this._pt=new dn(this._pt,w,"scaleY",w.scaleY,(v?Yr(w.scaleY,v+f):f)-w.scaleY||0,df),this._pt.u=0,o.push("scaleY",b),b+="X";else if(b==="transformOrigin"){C.push(Tn,0,l[Tn]),c=MT(c),w.svg?gf(e,c,0,T,0,this):(g=parseFloat(c.split(" ")[2])||0,g!==w.zOrigin&&br(this,w,"zOrigin",w.zOrigin,g),br(this,l,b,nl(h),nl(c)));continue}else if(b==="svgOrigin"){gf(e,c,1,T,0,this);continue}else if(b in mg){AT(this,w,b,d,v?Yr(d,v+c):c);continue}else if(b==="smoothOrigin"){br(this,w,"smooth",w.smooth,c);continue}else if(b==="force3D"){w[b]=c;continue}else if(b==="transform"){ET(this,c,e);continue}}else b in l||(b=sa(b)||b);if(x||(f||f===0)&&(d||d===0)&&!cT.test(c)&&b in l)m=(h+"").substr((d+"").length),f||(f=0),g=Kt(c)||(b in Sn.units?Sn.units[b]:m),m!==g&&(d=xr(e,b,h,g)),this._pt=new dn(this._pt,x?w:l,b,d,(v?Yr(d,v+f):f)-d,!x&&(g==="px"||b==="zIndex")&&n.autoRound!==!1?hT:df),this._pt.u=g||0,m!==g&&g!=="%"&&(this._pt.b=h,this._pt.r=uT);else if(b in l)yT.call(this,e,b,h,v?v+c:c);else if(b in e)this.add(e,b,h||e[b],v?v+c:c,r,s);else if(b!=="parseTransform"){Jc(b,c);continue}x||(b in l?C.push(b,0,l[b]):C.push(b,1,h||e[b])),o.push(b)}}A&&uf(this)},render:function(e,n){if(n.tween._time||!bf())for(var i=n._pt;i;)i.r(e,i.d),i=i._next;else n.styles.revert()},get:Gi,aliases:pi,getSetter:function(e,n,i){var r=pi[n];return r&&r.indexOf(",")<0&&(n=r),n in Hi&&n!==Tn&&(e._gsap.x||Gi(e,"x"))?i&&eg===i?n==="scale"?mT:pT:(eg=i||{})&&(n==="scale"?gT:_T):e.style&&!Kc(e.style[n])?fT:~n.indexOf("-")?dT:el(e,n)},core:{_removeProperty:$r,_getMatrix:vf}};rn.utils.checkPrefix=sa;rn.core.getStyleSaver=hg;(function(a,e,n,i){var r=fn(a+","+e+","+n,function(s){Hi[s]=1});fn(e,function(s){Sn.units[s]="deg",mg[s]=1}),pi[r[13]]=a+","+e,fn(i,function(s){var o=s.split(":");pi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");fn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(a){Sn.units[a]="px"});rn.registerPlugin(yf);var pn=rn.registerPlugin(yf)||rn,rA=pn.core.Tween;var ts=p_(bg()),RT={fr:{quest:"objectif : r\xE9cup\xE9rer les 5 fragments",enterBtn:"\u25B2 entrer",enter:"entrer",helpW:"ZQSD ou fl\xE8ches pour courir \xB7 Maj pour marcher \xB7 glisser pour regarder \xB7 \u21B5 pour entrer",helpT:"joystick pour marcher \xB7 glisse pour regarder \xB7 touche une porte",hello:"Bienvenue dans mon monde.",done:"Les 5 fragments. Merci d'\xEAtre venu jusqu'ici.",got:"fragment r\xE9cup\xE9r\xE9",names:["DOSSIERS","UNIVERSIT\xC9","SALLE SERVEURS","ARCADE","ANTENNE"]},en:{quest:"objective: collect the 5 fragments",enterBtn:"\u25B2 enter",enter:"enter",helpW:"WASD or arrows to run \xB7 Shift to walk \xB7 drag to look \xB7 \u21B5 to enter",helpT:"joystick to walk \xB7 swipe to look \xB7 tap a door",hello:"Welcome to my world.",done:"All 5 fragments. Thanks for coming this far.",got:"fragment collected",names:["FILES","UNIVERSITY","SERVER ROOM","ARCADE","ANTENNA"]}},ti=a=>RT[L][a];pn.ticker.lagSmoothing(0);var Ig=395018,Lf=1446170,CT=12588574,PT=(a,e)=>new oe(a).multiplyScalar(e),ha=PT(CT,4),Dg=new oe(1,.68,.38),LT=new oe(2.6,2.4,2.2),Og={who:"assets/ink/who.webp",parcours:"assets/ink/parcours.webp",travail:"assets/ink/travail.webp",passions:"assets/ink/passions.webp"},Tf=4,Pt=Tf/1.8,Wi=10,sn=Wi+6,vi=3*Pt,ol={x:0,z:4},IT=11,DT=4.5,pa=-150,mo=14,rs=a=>mo-(a+.5)*vi,Vt=[{page:"s1",outfit:"who",k:4,side:-1,floors:6,kind:"files"},{page:"s2",outfit:"parcours",k:8,side:1,floors:5,kind:"uni"},{page:"s3",outfit:"travail",k:12,side:-1,floors:8,kind:"servers"},{page:"s4",outfit:"passions",k:16,side:1,floors:4,kind:"arcade"},{page:"s5",outfit:"who",k:20,side:-1,floors:6,kind:"antenna"}];Vt.forEach(a=>{a.z=rs(a.k),a.w=3*vi,a.dx=a.side*(sn-2.2),a.dz=a.z});var ss=matchMedia("(hover: none)").matches,fa=$("#world"),la=$("#bubble"),Wt=new Da({antialias:!0,powerPreference:"high-performance"});Wt.setPixelRatio(Math.min(devicePixelRatio||1,ss?1.5:1.75));Wt.setClearColor(Ig);Wt.toneMapping=Ha;Wt.toneMappingExposure=1.15;Wt.shadowMap.enabled=!0;Wt.shadowMap.type=ku;fa.prepend(Wt.domElement);Wt.domElement.className="gl3d";var Ze=new hc;Ze.background=new oe(Ig);Ze.fog=new uc(Lf,.011);var Fn=new Ot(48,1,.1,900),as=new Fc(Wt,new Yt(4,4,{type:Gt,samples:ss?2:4}));as.addPass(new kc(Ze,Fn));var Ng=new Ks(new me(256,256),.7,.55,.95);as.addPass(Ng);as.addPass(new Bc);var Ug=new js({uniforms:{tDiffuse:{value:null},time:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec2 d = vUv - 0.5; float r2 = dot(d, d); vec2 o = d * r2 * 0.012;
      vec3 c = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
      c *= 1.0 - r2 * 1.2;
      c += (h(vUv * 1000.0 + fract(time) * 7.0) - 0.5) * 0.035;
      gl_FragColor = vec4(c, 1.0);
    }`});as.addPass(Ug);var wf=!0,OT=new qe(new Gs(700,32,16),new Rt({side:$t,depthWrite:!1,fog:!1,uniforms:{top:{value:new oe(197639)},mid:{value:new oe(Lf)},glow:{value:new oe(3802891)}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, mid, glow; varying vec3 vP;
    void main(){
      vec3 c = mix(mid, top, pow(max(vP.y, 0.0), 0.5));
      c += glow * pow(max(dot(vP, normalize(vec3(0.0, 0.1, -1.0))), 0.0), 8.0) * 1.8;
      gl_FragColor = vec4(c, 1.0);
    }`}));Ze.add(OT);var Fg=new qe(new Ba(34,64),new _t({color:ha,fog:!1,toneMapped:!1}));Fg.position.set(0,70,-560);Ze.add(Fg);var NT=new ks(Wt);new Oc().load("assets/city/tex/night.hdr",a=>{a.mapping=Ra,Ze.environment=NT.fromEquirectangular(a).texture,a.dispose()});Ze.add(new Mc(3818584,658190,.6));var Yi=new zr(10466008,.9);Yi.castShadow=!0;Yi.shadow.mapSize.set(ss?1024:2048,ss?1024:2048);Object.assign(Yi.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:1,far:220});Yi.shadow.bias=-4e-4;Yi.shadow.normalBias=.05;Ze.add(Yi,Yi.target);var kg=new zr(16724016,.6);kg.position.set(0,30,-200);Ze.add(kg);var UT=ss?4:6,Bg=[];for(let a=0;a<UT;a++){let e=new Fi(16766632,70,30,1.8);Ze.add(e),Bg.push(e)}var FT=Wt.capabilities.getMaxAnisotropy(),kT=new Ws;function ua(a,e,n){let i=kT.load(a);return i.wrapS=i.wrapT=Ii,i.repeat.set(e[0],e[1]),i.anisotropy=FT,n&&(i.colorSpace=it),i}function zg(a,e){let n=document.createElement("canvas");n.width=n.height=a,e(n.getContext("2d"),a);let i=new ka(n);return i.colorSpace=it,i}var If=zg(128,(a,e)=>{let n=a.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=n,a.fillRect(0,0,e,e)}),BT=zg(64,(a,e)=>{let n=a.createLinearGradient(0,0,0,e);n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.5,"rgba(255,255,255,.9)"),n.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=n,a.fillRect(0,0,e,e),a.globalCompositeOperation="destination-in";let i=a.createLinearGradient(0,0,e,0);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(.5,"rgba(0,0,0,1)"),i.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=i,a.fillRect(0,0,e,e)}),Df=(a,e,n)=>new _t({map:a,color:e,transparent:!0,opacity:n,blending:Or,depthWrite:!1,toneMapped:!1});function Gg(a,e,n,i,r){let s=new qe(new ci(e,n),a);return s.rotation.x=-Math.PI/2,s.position.set(i,.05,r),s.renderOrder=2,Ze.add(s),s}function zT(a,e={}){let n=document.createElement("canvas"),i=n.getContext("2d"),r=e.size||64,s=r*.6;i.font=`600 ${r}px "IBM Plex Mono", ui-monospace, monospace`;let o=Math.ceil(i.measureText(a).width)+s*2,l=Math.ceil(r*2.3);n.width=o,n.height=l,i.font=`600 ${r}px "IBM Plex Mono", ui-monospace, monospace`,i.textBaseline="middle",i.shadowColor=e.glow||"#ff3030",i.shadowBlur=r*.35,i.fillStyle=e.fg||"#ffffff",i.fillText(a,s,l/2+2);let u=new ka(n);return u.colorSpace=it,u.anisotropy=4,{t:u,ratio:o/l}}function co(a,e,n={}){let{t:i,ratio:r}=zT(a,n);return new qe(new ci(e*r,e),new _t({map:i,color:n.color||LT,transparent:!0,depthWrite:!1,side:_n,toneMapped:!1}))}function GT(a){return()=>{a|=0,a=a+1831565813|0;let e=Math.imul(a^a>>>15,1|a);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var ht=GT(7),xg=a=>a[Math.floor(ht()*a.length)],Xi=mo-pa+40,Af=(mo+pa)/2,pl=new qe(new ci(Wi*2,Xi),new xn({map:ua("assets/city/tex/asphalt_diff.webp",[3,Xi/7],!0),normalMap:ua("assets/city/tex/asphalt_nor_gl.webp",[3,Xi/7]),roughnessMap:ua("assets/city/tex/asphalt_rough.webp",[3,Xi/7]),roughness:.42,metalness:.1,color:9079440,normalScale:new me(.6,.6)}));pl.rotation.x=-Math.PI/2;pl.position.set(0,0,Af);pl.receiveShadow=!0;Ze.add(pl);var HT=new xn({color:12170146,roughness:.5});for(let a=mo;a>pa;a-=9){let e=new qe(new ci(.35,4),HT);e.rotation.x=-Math.PI/2,e.position.set(0,.02,a),e.receiveShadow=!0,Ze.add(e)}var VT=new xn({map:ua("assets/city/tex/pave_diff.webp",[2,Xi/6],!0),normalMap:ua("assets/city/tex/pave_nor_gl.webp",[2,Xi/6]),roughnessMap:ua("assets/city/tex/pave_rough.webp",[2,Xi/6]),roughness:.6,color:7829372}),WT=new xn({color:3816256,roughness:.7});for(let a of[-1,1]){let e=new qe(new Hn(sn-Wi+2,.35,Xi),VT);e.position.set(a*(Wi+(sn-Wi+2)/2),.175,Af),e.receiveShadow=!0,Ze.add(e);let n=new qe(new Hn(.4,.4,Xi),WT);n.position.set(a*(Wi+.2),.2,Af),n.receiveShadow=!0,Ze.add(n)}var Of=new qe(new ci(1200,1200),new xn({color:723983,roughness:.35}));Of.rotation.x=-Math.PI/2;Of.position.set(0,-.03,-300);Ze.add(Of);var Hg=[];for(let a=0;a<60;a++){let e=60+ht()*180,n=14+ht()*26,i=(ht()-.5)*600,r=-300-ht()*240;if(Math.abs(i)<70)continue;let s=new qe(new Hn(n,e,n),new _t({color:new oe(592141).lerp(new oe(Lf),Math.min(1,(-r-300)/300)),fog:!1}));if(s.position.set(i,e/2-2,r),Ze.add(s),ht()<.5){let o=new qe(new Gs(1,8,8),new _t({color:ha,fog:!1,toneMapped:!1}));o.position.set(i,e+1,r),o.userData.ph=ht()*6,Ze.add(o),Hg.push(o)}}function XT(a){return new Ae().makeTranslation(a*sn,0,0).multiply(new Ae().makeRotationY(a<0?Math.PI/2:-Math.PI/2)).multiply(new Ae().makeScale(Pt,Pt,Pt))}var qT=(a,e)=>a<0?-(rs(e)-vi/2)/Pt:(rs(e)+vi/2)/Pt,mn=(a,e,n,i=0)=>XT(a).multiply(new Ae().makeTranslation(qT(a,e),n,i)),Vg={},Ef=new Map,Wg=[],Xg=170;function wn(a,e,n,i){let r=Vg[a];if(r)for(let s of r){let o=e.clone().multiply(s.rel),l=Math.round(o.elements[14]/40),u=s.key+"|"+l,h=Ef.get(u);h||Ef.set(u,h={p:s,z:l*40,mats:[],cols:[]}),h.mats.push(o),h.cols.push(s.mat===Cf?i||qg:n||YT)}}var YT=new oe(1,1,1),qg=new oe(.035,.04,.05);function vg(a){return a==="red"?ha.clone().multiplyScalar(.3):a?Dg.clone().multiplyScalar(.55+ht()*1.1):qg.clone().multiplyScalar(.6+ht()*.8)}var jT=["centered_small","centered_large","centered_double"],oa=[new oe(.62,.6,.62),new oe(.5,.5,.56),new oe(.42,.42,.48),new oe(.7,.62,.6),new oe(.34,.34,.4)],Yg=[],jg=[],Kg=[];function yg(a,e,n,i,r={}){let s=r.tint||xg(oa),o=r.style||xg(jT),l=i*3;for(let u=0;u<n;u++){let h=e+u;wn("base_standard_01",mn(a,h,0),s),r.door===h?(wn("wall_door_centered_large_01",mn(a,h,0),s),wn("door_centered_large_01",mn(a,h,0))):ht()<.3?(wn("wall_door_centered_small_01",mn(a,h,0),s),wn("door_centered_small_01",mn(a,h,0))):(wn("wall_window_centered_large_01",mn(a,h,0),s),wn("window_centered_large_01",mn(a,h,0),null,vg(ht()<.12?"red":ht()<.7)));for(let c=1;c<i;c++){let f=c===i-1,d=f?"03":c%2?"01":"02";wn(`wall_window_${o}_${d}`,mn(a,h,c*3),s),wn(`window_${o}_${d}`,mn(a,h,c*3),null,vg(r.windows?r.windows(c,u):ht()<.04?"red":ht()<.42)),wn("dado_standard_standard_01",mn(a,h,c*3-.25),s)}wn("cornice_standard_standard_01",mn(a,h,l),s),wn("crown_standard_standard_01",mn(a,h,l+.2),s)}for(let u of[e,e+n]){let h=u===e+n?mn(a,u-1,0).multiply(new Ae().makeTranslation(-3,0,0)):mn(a,u,0);for(let c=0;c<i;c++)wn("wall_pier_standard_01",h.clone().multiply(new Ae().makeTranslation(0,c*3,0)),s);wn("crown_pier_pedestal_01",h.clone().multiply(new Ae().makeTranslation(0,l+.2,0)),s)}Rf.push({sd:a,k0:e,cols:n,H:l,tint:s}),!r.door&&i>=5&&ht()<.45&&Yg.push(mn(a,e+Math.floor(ht()*n),3+3.65,.85)),ht()<.5&&jg.push({sd:a,z:rs(e)+(ht()-.5)*vi})}var Rf=[];function KT(){for(let a of[-1,1]){let e=Vt.filter(n=>n.side===a);for(let n=-2;rs(n)>pa-20;){let i=e.find(l=>l.k-1===n);if(i){yg(a,n,3,i.floors,JT(i)),n+=3;continue}let r=e.find(l=>l.k-1>n),s=r?r.k-1-n:99,o=Math.min(s,2+Math.floor(ht()*3));yg(a,n,o,4+Math.floor(ht()*4)),n+=o,ht()<.25&&Kg.push({sd:a,z:rs(n)+vi/2})}}}function JT(a){let e={door:a.k,tint:[oa[1],oa[0],oa[4],oa[3],oa[2]][Vt.indexOf(a)]};return a.kind==="servers"&&Object.assign(e,{style:"centered_double",windows:(n,i)=>(n+i)%3===0?"red":!1}),a.kind==="uni"&&(e.style="centered_large"),a.kind==="files"&&(e.style="centered_small"),e}var ml=[];for(let a of[-1,1])for(let e=8+(a>0?8:0);e>pa;e-=16)ml.push(new D(a*(Wi+1.2),0,e));var ZT=new Rt({transparent:!0,depthWrite:!1,blending:Or,side:_n,uniforms:{c:{value:new oe(1,.75,.45)}},vertexShader:"varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform vec3 c; varying float vY; void main(){ gl_FragColor = vec4(c * 0.03 * pow(vY, 1.8), 1.0); }"}),QT=Df(BT,new oe(1,.7,.4),.45);ml.forEach(a=>{let e=new qe(new za(.4,4.2,3.4*Pt,24,1,!0),ZT);e.position.set(a.x,1.7*Pt,a.z),Ze.add(e),Gg(QT,1.1,10,a.x-Math.sign(a.x)*2.5,a.z+5)});var $T=new Ic().setMeshoptDecoder(lm),Nf=a=>new Promise(e=>$T.load(a,e,void 0,()=>e(null))),Cf=new _t({color:16777215,toneMapped:!1}),ew=new xn({color:1709331,roughness:.95});function tw(a){return a.traverse(e=>{e.isMesh&&(e.castShadow=e.receiveShadow=!0)}),a}Nf("assets/city/modular_urban_apartments_facade.glb").then(a=>{if(!a)return;a.scene.updateMatrixWorld(!0),a.scene.children.forEach(i=>{i.position.set(0,0,0),i.updateMatrixWorld(!0);let r=[],s=new bn;i.traverse(o=>{if(!o.isMesh)return;let l=o.material;/glass/.test(l.name)?l=Cf:/plaster|trim/.test(l.name)&&(l=l.clone(),l.vertexColors=!1),r.push({key:o.uuid,geo:o.geometry,mat:l,rel:o.matrixWorld.clone()}),o.geometry.computeBoundingBox(),s.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld))}),Vg[i.name]=r,r.bb=s}),KT();for(let i of Ef.values()){let r=new kr(i.p.geo,i.p.mat,i.mats.length);i.mats.forEach((s,o)=>{r.setMatrixAt(o,s),r.setColorAt(o,i.cols[o])}),r.castShadow=i.p.mat!==Cf,r.receiveShadow=!0,r.computeBoundingSphere(),r.userData.z=i.z,Wg.push(r),Ze.add(r)}let e=new Hn(1,1,1),n=new kr(e,ew,Rf.length);Rf.forEach((i,r)=>{let s=rs(i.k0)+vi/2-i.cols*vi/2;n.setMatrixAt(r,new Ae().compose(new D(i.sd*(sn+9),i.H*Pt/2,s),new en,new D(17.6,i.H*Pt-.1,i.cols*vi))),n.setColorAt(r,i.tint)}),n.receiveShadow=!0,Ze.add(n),nw()});function ao(a,e,n){Nf(a).then(i=>{i&&(tw(i.scene),e.forEach((r,s)=>{let o=s?i.scene.clone():i.scene;n(o,r),Ze.add(o)}))})}function nw(){ao("assets/city/modular_fire_escape.glb",Yg,(a,e)=>{a.applyMatrix4(e)}),ao("assets/city/metal_trash_can.glb",jg,(a,e)=>{a.scale.setScalar(Pt),a.position.set(e.sd*(sn-1),.35,e.z),a.rotation.y=ht()*6}),ao("assets/city/fire_hydrant.glb",Kg,(a,e)=>{a.scale.setScalar(Pt),a.position.set(e.sd*(Wi+1.4),.35,e.z),a.rotation.y=e.sd<0?Math.PI/2:-Math.PI/2}),ao("assets/city/street_lamp_01.glb",ml,(a,e)=>{a.scale.setScalar(Pt),a.position.set(e.x,.35,e.z),a.traverse(n=>{n.isMesh&&/glass/.test(n.material.name)&&(n.material=new _t({color:Dg.clone().multiplyScalar(3),toneMapped:!1}),n.castShadow=!1)})}),ao("assets/city/barrel_stove.glb",Jg,(a,e)=>{a.scale.setScalar(Pt),a.position.set(e.x,.35,e.z);let n=new qe(new ci(1.6,2.4),Df(If,new oe(1,.45,.12),.9));n.position.set(e.x,.35+.86*Pt+.9,e.z),Ze.add(n),e.fire=n;let i=new Fi(16742954,60,22,1.8);i.position.set(e.x,3,e.z),Ze.add(i),e.light=i})}var Jg=[{x:-(sn-2.5),z:-52},{x:sn-3,z:-128}],bi=[],qi=new Set;try{qi=new Set(JSON.parse(store.get("visited")||"[]"))}catch{}var Mf=new _t({color:ha,toneMapped:!1});function iw(a,e){let n=new Pn;n.userData.i=e,n.position.set(a.side*sn,0,a.z),n.rotation.y=a.side<0?Math.PI/2:-Math.PI/2;let i=2.2*Pt,r=2.9*Pt,s=.13;[[0,r,i+s,s],[-i/2,r/2,s,r],[i/2,r/2,s,r]].forEach(([d,p,_,b])=>{let m=new qe(new Hn(_,b,s),Mf);m.position.set(d,p+.35,.35),n.add(m)});let o=new Fi(16719904,40,18,1.6);o.position.set(0,4.5,3),n.add(o),n.userData.light=o;let l=co(`0${e+1} \xB7 ${ti("names")[e]}`,1.25);l.position.set(0,r+1.5,.5),n.add(l),n.userData.sign=l;let u=a.floors*3*Pt;if(a.kind==="servers"||a.kind==="antenna"){let d=a.kind==="antenna"?24:12,p=new qe(new za(.12,.2,d,8),new xn({color:2369068,metalness:.7,roughness:.4}));p.position.set(0,u+d/2,-6),n.add(p);let _=new qe(new Gs(.5,12,12),Mf);_.position.set(0,u+d+.3,-6),n.add(_),n.userData.blink=_}if(a.kind==="files"){let d=co(L==="fr"?"CONFIDENTIEL":"CLASSIFIED",1,{fg:"#ff6a6a",color:ha.clone().multiplyScalar(.45)});d.position.set(-vi,3.6*Pt,.6),d.rotation.z=.08,n.add(d)}if(a.kind==="arcade"){let d=co("\u25C6 OPEN 24/7 \u25C6",1.3,{fg:"#ff6a6a",color:ha.clone().multiplyScalar(.6)});d.position.set(0,u-2.5,.6),n.add(d),n.userData.flicker=d}if(a.kind==="uni"){let d=co("EST. 2021 \xB7 M2 INFO",.9,{fg:"#ffffff",color:new oe(1.4,1.3,1.2)});d.position.set(0,u-1.6,.6),n.add(d)}let h=new qe(new Hn(a.w,u,2),new _t({visible:!1}));h.position.set(0,u/2,0),n.add(h);let c=new qe(new _c(.5,0),Mf);c.position.set(0,3,3.6),n.add(c),n.userData.frag=c,qi.has(a.page)&&c.scale.setScalar(0);let f={emissiveIntensity:0};n.userData.door=f,Ze.add(n),bi.push(n),Gg(Df(If,new oe(1,.1,.1),.45),8,8,a.side*(sn-3),a.z)}function rw(){bi.forEach((a,e)=>{let n=a.userData.sign,i=co(`0${e+1} \xB7 ${ti("names")[e]}`,1.25);i.position.copy(n.position),a.remove(n),a.add(i),a.userData.sign=i})}Vt.forEach(iw);function sw(a,e){return a.onBeforeCompile=n=>{n.uniforms.rimC={value:e},n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 rimC;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += rimC * pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 3.0);`)},a}var Vi=new Pn;Ze.add(Vi);var Zg=new Fi(16765600,10,12,1.5);Zg.position.set(1.5,6,3);Vi.add(Zg);var cl=null,gn={},uo="";Nf("assets/models/hero.glb").then(a=>{if(!a)return;let e=a.scene;e.scale.setScalar(Pt),e.traverse(n=>{n.isMesh&&(n.castShadow=!0,n.frustumCulled=!1,sw(n.material,new oe(.16,.03,.04)),n.material.transparent&&(n.material.depthWrite=!1))}),Vi.add(e),cl=new Ac(e),a.animations.forEach(n=>gn[n.name]=cl.clipAction(n)),gn.agree&&(gn.agree.setLoop(Xu),gn.agree.clampWhenFinished=!1),Qg("idle",0),pn.from(e.scale,{x:.001,y:.001,z:.001,duration:.9,ease:"back.out(1.7)"})});function Qg(a,e=.25){if(uo===a||!gn[a])return;let n=gn[a].reset().play(),i=gn[uo];i&&n.crossFadeFrom(i,e,!0),uo=a}function aw(){gn.agree&&(gn.agree.reset().setEffectiveWeight(1).fadeIn(.15).play(),setTimeout(()=>gn.agree.fadeOut(.3),1300))}var ll=new qe(new Ba(1,32),new _t({map:If,color:0,transparent:!0,opacity:.7,depthWrite:!1}));ll.rotation.x=-Math.PI/2;Ze.add(ll);var ns=document.createElement("figure");ns.className="outfit-card";ns.innerHTML="<img alt=''>";fa.appendChild(ns);var Pf="who";function ow(a,e){a!==Pf&&(Pf=a,ns.firstChild.src=Og[a],pn.fromTo(ns,{rotate:-6,scale:.9},{rotate:0,scale:1,duration:.5,ease:"back.out(2)"})),ns.classList.toggle("show",e)}ns.firstChild.src=Og.who;var Uf=ss?700:1800,ho=new Float32Array(Uf*6);for(let a=0;a<Uf;a++){let e=(ht()-.5)*70,n=ht()*30,i=(ht()-.5)*70;ho.set([e,n,i,e+.05,n-.9,i],a*6)}var Ff=new It;Ff.setAttribute("position",new At(ho,3));var kf=new zs(Ff,new Br({color:9279403,transparent:!0,opacity:.3,depthWrite:!1}));kf.frustumCulled=!1;Ze.add(kf);var xi={amb:new ts.Howl({src:["assets/sfx/ambiance.mp3"],loop:!0,volume:0}),hum:new ts.Howl({src:["assets/sfx/serveurs.mp3"],loop:!0,volume:0}),step:new ts.Howl({src:["assets/sfx/pas.mp3"],volume:.3}),door:new ts.Howl({src:["assets/sfx/porte.mp3"],volume:.6})},po=!1;function cw(){let a=hl&&soundOn&&!still&&current==="home";a!==po&&(po=a,ts.Howler.mute(!a),a&&(xi.amb.playing()||(xi.amb.play(),xi.hum.play()),xi.amb.fade(xi.amb.volume(),.45,1500)))}var We=new D(ol.x,0,ol.z),gi=0,fo=.18,ul=Math.PI,dt=-1,hl=!1,Mg=!1,Sg=0,es=null,ca=null,da=!1,Tg=0,rl=0,lw=0,ei={k:1,e:0},vr=new Set,yr={x:0,y:0};function is(a,e=2600){la.textContent=a,la.hidden=!1,clearTimeout(is.t),e&&(is.t=setTimeout(()=>{dt<0&&(la.hidden=!0)},e))}function $g(a,e){let n=Vt[a];es=new D(n.dx,0,n.dz),ca=e?a:null}function Bf(a){if(da)return;da=!0,vr.clear(),yr.x=yr.y=0,es=null,ca=null;let e=Vt[a],n=bi[a],i=!qi.has(e.page);qi.add(e.page),store.set("visited",JSON.stringify([...qi])),gl(),po&&xi.door.play(),ul=e.side<0?-Math.PI/2:Math.PI/2,i&&(pn.to(n.userData.frag.scale,{x:0,y:0,z:0,duration:.5,ease:"back.in(2)"}),pn.to(n.userData.frag.rotation,{y:"+=8",duration:.5}),is(`\u25C6 ${ti("got")} \xB7 ${qi.size}/5`,1600)),pn.to(n.userData.light,{intensity:160,duration:.6,yoyo:!0,repeat:1}),pn.fromTo(ei,{e:0},{e:1,duration:.85,ease:"power2.in",onComplete:()=>{go(e.page)}})}function gl(){$$("#map li").forEach((a,e)=>{a.classList.toggle("done",qi.has(Vt[e].page)),a.classList.toggle("here",e===dt)}),$("#questN").textContent=`${qi.size}/5`}$("#map").innerHTML=Vt.map((a,e)=>`<li data-i="${e}"><b>0${e+1}</b></li>`).join("");$$("#map li").forEach(a=>a.addEventListener("click",()=>$g(+a.dataset.i,!0)));var fl={ArrowUp:"f",z:"f",w:"f",Z:"f",W:"f",ArrowDown:"b",s:"b",S:"b",ArrowLeft:"l",q:"l",a:"l",Q:"l",A:"l",ArrowRight:"r",d:"r",D:"r"},zf=!1;addEventListener("keydown",a=>{zf=a.shiftKey,!(current!=="home"||!introDone||a.target.tagName==="INPUT")&&(fl[a.key]&&(vr.add(fl[a.key]),a.preventDefault()),["Enter"," ","e","E"].includes(a.key)&&dt>=0&&(a.preventDefault(),Bf(dt)))});addEventListener("keyup",a=>{zf=a.shiftKey,fl[a.key]&&vr.delete(fl[a.key])});var Gf=Wt.domElement,_i=null;Gf.addEventListener("pointerdown",a=>{_i={x:a.clientX,y:a.clientY,moved:0}});addEventListener("pointermove",a=>{if(!_i||current!=="home")return;let e=a.clientX-_i.x,n=a.clientY-_i.y;_i.x=a.clientX,_i.y=a.clientY,_i.moved+=Math.abs(e)+Math.abs(n),gi-=e*.005,fo=Math.max(.02,Math.min(.75,fo+n*.003))});addEventListener("pointerup",a=>{_i&&_i.moved<6&&a.target===Gf&&uw(a.clientX,a.clientY),_i=null});var wg=new Ec,Ag=new me;function uw(a,e){let n=Gf.getBoundingClientRect();Ag.set((a-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),wg.setFromCamera(Ag,Fn);let i=wg.intersectObjects(bi,!0)[0];if(i){let r=i.object;for(;r&&r.userData.i===void 0;)r=r.parent;r&&$g(r.userData.i,!0)}}var ni=document.createElement("div");ni.className="stick-j";ni.innerHTML="<i></i>";fa.appendChild(ni);var dl=null,lo=null;ni.addEventListener("pointerdown",a=>{a.preventDefault(),a.stopPropagation(),dl=a.pointerId;let e=ni.getBoundingClientRect();lo={x:e.left+e.width/2,y:e.top+e.height/2,r:e.width/2},ni.setPointerCapture(dl)});ni.addEventListener("pointermove",a=>{if(a.pointerId!==dl)return;a.stopPropagation();let e=(a.clientX-lo.x)/lo.r,n=(a.clientY-lo.y)/lo.r,i=Math.hypot(e,n);i>1&&(e/=i,n/=i),yr.x=e,yr.y=n,ni.firstChild.style.transform=`translate(${e*28}px, ${n*28}px)`});var e_=()=>{dl=null,yr.x=yr.y=0,ni.firstChild.style.transform=""};ni.addEventListener("pointerup",e_);ni.addEventListener("pointercancel",e_);$("#padUp").addEventListener("click",()=>{dt>=0&&Bf(dt)});function _l(){let a=fa.clientWidth||innerWidth,e=fa.clientHeight||innerHeight;Wt.setSize(a,e,!1),as.setPixelRatio(Wt.getPixelRatio()),as.setSize(a,e),Ng.resolution.set(a/2,e/2),Fn.aspect=a/e,Fn.updateProjectionMatrix()}addEventListener("resize",_l);var Eg=new D,Rg=new D,Un=new D,aa=new D,sl=new D,oo=new D,Cg=new D,Pg=new D,Sf=new D,Lg=new D,hw=a=>Math.atan2(Math.sin(a),Math.cos(a)),al=ml.map(a=>({p:a,d:0}));function fw(){wf=!1,Xg=90,Ze.fog.density=.02,Wt.setPixelRatio(Math.min(1,Wt.getPixelRatio())),Wt.shadowMap.enabled=!1,Ze.traverse(a=>{a.material&&[].concat(a.material).forEach(e=>e.needsUpdate=!0)}),_l()}function t_(a){requestAnimationFrame(t_);let e=(a-Sg)/1e3||0,n=Math.min(.25,e);if(Sg=a,cw(),current!=="home"||!introDone)return;wf&&e>0&&(rl+=e>.04?1:-.5,rl=Math.max(0,rl),++lw>30&&rl>20&&fw());for(let _ of Wg)_.visible=Math.abs(_.userData.z-We.z)<Xg;Eg.set(-Math.sin(gi),0,-Math.cos(gi)),Rg.set(Math.cos(gi),0,-Math.sin(gi));let i=(vr.has("f")?1:0)-(vr.has("b")?1:0)-yr.y,r=(vr.has("r")?1:0)-(vr.has("l")?1:0)+yr.x;Un.set(0,0,0).addScaledVector(Eg,i).addScaledVector(Rg,r);let s=Math.min(1,Un.length());if(da)Un.set(0,0,0);else if(Un.lengthSq()>.01)es=null,ca=null;else if(es&&(Un.subVectors(es,We),Un.y=0,Un.length()<.4&&(Un.set(0,0,0),es=null,ca!==null))){let _=ca;ca=null,Bf(_)}let o=Un.lengthSq()>.01,l=o&&!zf&&(es||s>.6);o&&(Un.normalize(),We.addScaledVector(Un,(l?IT:DT)*n),We.x=Math.max(-sn+1.2,Math.min(sn-1.2,We.x)),We.z=Math.max(pa,Math.min(mo-4,We.z)),ul=Math.atan2(Un.x,Un.z),hl&&!Mg&&(Mg=!0,fa.classList.add("moved")));let u=Math.abs(We.x)>Wi+.2?.35:0;if(Vi.position.set(We.x,Vi.position.y+(u-Vi.position.y)*Math.min(1,n*14),We.z),Vi.rotation.y+=hw(ul-Vi.rotation.y)*Math.min(1,n*12),Qg(o?l?"run":"walk":"idle"),cl){gn.run&&(gn.run.timeScale=1.05),gn.walk&&(gn.walk.timeScale=1.1),cl.update(still?0:n);let _=gn[uo],b=_&&_.getClip();if(o&&b){let m=_.time/b.duration*2%1;m<Tg&&po&&(xi.step.rate(.9+Math.random()*.2),xi.step.play()),Tg=m}}ll.position.set(We.x,Vi.position.y+.05,We.z),ll.scale.setScalar(o?1.3:1.5),Yi.position.set(We.x+25,70,We.z+30),Yi.target.position.copy(We),al.forEach(_=>_.d=Math.abs(_.p.z-We.z)+Math.abs(_.p.x-We.x)*.3),al.sort((_,b)=>_.d-b.d),Bg.forEach((_,b)=>_.position.set(al[b].p.x,3.5*Pt,al[b].p.z));let h=11*(Fn.aspect<.8?1.4:1);if(aa.set(We.x+Math.sin(gi)*Math.cos(fo)*h,1.6+Math.sin(fo)*h+2,We.z+Math.cos(gi)*Math.cos(fo)*h),aa.x=Math.max(-sn+.8,Math.min(sn-.8,aa.x)),sl.set(We.x-Math.sin(gi)*4,Tf*.85,We.z-Math.cos(gi)*4),ei.k>0&&(Cg.set(We.x+4,62,We.z+46),Pg.set(0,6,-90),aa.lerp(Cg,ei.k),sl.lerp(Pg,ei.k)),ei.e>0&&dt>=0){let _=Vt[dt];Sf.set(_.side*sn,2.6,_.z),Lg.set(-_.side*6,1.5,0).add(Sf),aa.lerp(Lg,ei.e),sl.lerp(Sf,ei.e)}Fn.position.lerp(aa,ei.k>0||ei.e>0?1:Math.min(1,n*4)),Fn.lookAt(sl);let c=-1,f=-1,d=1e9;if(Vt.forEach((_,b)=>{Math.abs(We.z-_.z)<_.w/2+2&&Math.sign(We.x)===_.side&&(c=b);let g=Math.hypot(We.x-_.dx,We.z-_.dz);g<4.5&&g<d&&(d=g,f=b)}),ow(c>=0?Vt[c].outfit:"who",c>=0),f!==dt&&!da&&(dt>=0&&(pn.to(bi[dt].userData.light,{intensity:40,duration:.4}),pn.to(bi[dt].userData.sign.scale,{x:1,y:1,duration:.3})),dt=f,$("#padUp").hidden=dt<0,dt>=0?(is(`\u25B2 ${t(Vt[dt].page)} \xB7 ${ti("enter")}`,0),aw(),pn.to(bi[dt].userData.light,{intensity:90,duration:.4}),pn.to(bi[dt].userData.sign.scale,{x:1.15,y:1.15,duration:.5,ease:"back.out(3)"})):la.hidden=!0,gl()),po){let _=Vt[2],b=Math.hypot(We.x-_.dx,We.z-_.z);xi.hum.volume(Math.max(0,1-b/28)*.5),oo.set(_.side*sn,4,_.z).project(Fn),xi.hum.stereo(Math.max(-1,Math.min(1,oo.x))*.8)}oo.set(We.x,Tf+1.3,We.z).project(Fn),la.style.left=(oo.x+1)/2*100+"%",la.style.top=(1-oo.y)/2*100+"%";let p=a/1e3;if(Ug.uniforms.time.value=p,!still){kf.position.set(Math.round(We.x/70)*70,0,Math.round(We.z/70)*70);for(let _=0;_<Uf;_++){let b=_*6,m=ho[b+1]-n*28;m<0&&(m+=30),ho[b+1]=m,ho[b+4]=m-.9}Ff.attributes.position.needsUpdate=!0,Hg.forEach(_=>_.visible=Math.sin(p*2+_.userData.ph)>0),Jg.forEach(_=>{if(!_.fire)return;let b=.75+Math.sin(p*13+_.z)*.12+Math.random()*.13;_.fire.material.opacity=b,_.light.intensity=60*b,_.fire.lookAt(Fn.position.x,_.fire.position.y,Fn.position.z)}),bi.forEach(_=>{_.userData.blink&&(_.userData.blink.visible=Math.floor(p*1.5)%2===0),_.userData.flicker&&(_.userData.flicker.material.opacity=Math.random()<.03?.15:1);let b=_.userData.frag;b.rotation.y+=n*1.6,b.position.y=3+Math.sin(p*2+_.userData.i)*.35})}wf?as.render():Wt.render(Ze,Fn)}window.world={start(){hl||(hl=!0,pn.fromTo(ei,{k:1},{k:0,duration:still?0:3.6,ease:"power3.inOut",delay:.2}),pn.from("#world .hud > *, #helpW",{y:-16,opacity:0,duration:.8,stagger:.12,delay:1.8,ease:"power2.out",clearProps:"all"}),setTimeout(()=>is(ti("hello"),3200),2800))},onView(a){a==="home"&&(vr.clear(),_l(),gl(),da&&(da=!1,ei.e=0,dt>=0&&(We.x=Vt[dt].dx*.8,ul=Vt[dt].side<0?Math.PI/2:-Math.PI/2)),qi.size===5&&setTimeout(()=>is(ti("done"),4e3),600))},relabel(){bi.length&&(rw(),$("#helpW").textContent=ti(ss?"helpT":"helpW"),$("#padUp").textContent=ti("enterBtn"),$$("#home [data-i='quest']").forEach(a=>a.textContent=ti("quest")),dt>=0&&is(`\u25B2 ${t(Vt[dt].page)} \xB7 ${ti("enter")}`,0))},get x(){return We.x},get z(){return We.z},get near(){return dt},get outfit(){return Pf},get anim(){return uo},places:Vt,teleport(a){let e=Vt[a];We.set(e.dx*.8,0,e.dz+1)},look(a){gi=a}};We.set(ol.x,0,ol.z);Fn.position.set(4,62,50);_l();world.relabel();gl();introDone&&world.start();requestAnimationFrame(t_);})();
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
