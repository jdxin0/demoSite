function AQ_SECAPI_ESCAPE(e,n){if("undefined"==typeof e)return"";for(var t=new Array,r=0;r<("undefined"==typeof e?0:e.length);r++)if("&"==e.charAt(r)){var o=[3,4,5,9],i=0;for(var a in o){var c=o[a];if(r+c<=("undefined"==typeof e?0:e.length)){var u=e.substr(r,c).toLowerCase();if(n[u]){t.push(n[u]),r=r+c-1,i=1;break}}}0==i&&t.push(e.charAt(r))}else t.push(e.charAt(r));return t.join("")}function AQ_SECAPI_CheckXss(){for(var e=new Object,n="'\"<>`script:daex/hml;bs64,",t=0;t<n.length;t++){for(var r=n.charAt(t),o=r.charCodeAt(),i=o,a=o.toString(16),c=0;c<7-o.toString().length;c++)i="0"+i;e["&#"+o+";"]=r,e["&#"+i]=r,e["&#x"+a]=r}e["&lt"]="<",e["&gt"]=">",e["&quot"]='"';var u=location.href,s=document.referrer;u=decodeURIComponent(AQ_SECAPI_ESCAPE(u,e)),s=decodeURIComponent(AQ_SECAPI_ESCAPE(s,e));var d=new RegExp("['\"<>`]|script:|data:text/html;base64,");if(d.test(u)||d.test(s)){var p="1.5",f="http://zyjc.sec.qq.com/dom",m=new Image;m.src=f+"?v="+p+"&u="+encodeURIComponent(u)+"&r="+encodeURIComponent(s),-1==window.location.href.indexOf("search.html")&&(u=u.replace(/['\"<>`]|script:/gi,"M")),u=u.replace(/data:text\/html;base64,/gi,"data:text/plain;base64,"),location.href=encodeURI(u)}}AQ_SECAPI_CheckXss(),function(e,n,t){function r(r,i,c){var u,s,d={bid:i,childUrl:t.href,parentUrl:""};try{d.parentUrl=parent.location.href}catch(p){}if(!(Math.random()>r))if(1==c)try{s=parent!=e?a(parent.document,"datapp",d):!1}catch(p){}else{try{u=a(n,"datapt",d),s=parent!=e?a(parent.document,"datapp",d):!1}catch(p){}try{parent!=e&&o(d)}catch(p){}}}function o(e){var n=[];n.push("beframed::url"),i(n,"beframed",e)}function i(e,n,t){var r="1.4",o="http://zyjc.sec.qq.com/cr",i=new Image;return e.push("childUrl::"+encodeURIComponent(t.childUrl)),e.push("parentUrl::"+encodeURIComponent(t.parentUrl)),i.src=o+"?id="+t.bid+"&d="+n+"=v"+r+"|"+e.join("|"),!0}function a(e,n,t){var r=c(e),o=m(e),a=g(e),u=l(e),s=q(e),d=r.concat(o,a,s,u);return"undefined"==typeof d||d.length<=0?!1:(d=v(d),i(d,n,t),void 0)}function c(e){for(var n,t,r,o,i,a=e.getElementsByTagName("script"),c=[],d=0;d<("undefined"==typeof a?0:a.length);d++)n=a[d],(t=n.src)&&c.push(t);return r=u(c,s),o=p("script"),i=f(r,o)}function u(e,n){for(var t=[],r=0;r<("undefined"==typeof e?0:e.length);++r){var o=e[r];n(o)&&t.push(o)}return t}function s(e){var n,t,r,o,i,a=d(e);return a?(n=/^xui.ptlogin2?\.?$/i,t=/(\.|^)(qq|paipai|soso|wenwen|tenpay|macromedia|gtimg|qstatic|qqmail|paipaiimg|qqgames|pengyou|foxmail|qzoneapp|qzone|qplus|imqq|tqapp|tencent|3366|21mmo|taotao|imrworldwide|idqqimg|17roco|expo2010china|fangqq|tencentmind|tencity|yingkebicheng|zhangzhongxing|expovol|otaworld|gzyunxun|heyyo|himoral|himorale|myrtx|qqwinner|redian|sjkx|rtxonline|nbaso|paipai\.500wan|qqjapan|qq\.salewell|sogou|qidian|weiyun|flzhan)\.com$/i,r=/(\.|^)(qq\.com|gtimg|gtimg\.com|qlogo|foxmail\.com|gtimg\.com|url|qpic|tencent\.com|expo2010|expo|himorale\.com|nbaso\.com|qqtest\.com|qq\.ucar|rtx\.com|soso\.com|tcimage)\.cn$/i,o=/(\.|^)(5999|gongyi)\.net$/i,i=/(\.|^)(himorale\.com\.hk|tencent\.com\.hk|qq\.chinacache\.net|qq\.com\.fastcdn\.com|qq\.com\.lxdns\.com|qq\.fastcdn\.com|soso\.com\.lxdns\.com|motu\.pagechoice\.net|ope\.tanx\.com|dap\.gentags\.net)$/i,n.test(a)||t.test(a)||r.test(a)||o.test(a)||i.test(a)?!1:!0):!1}function d(e){var n=/^https?:\/\/([\w\-]+\.[\w\-.]+)/i,t=n.exec(e);if(t)return t[1]}function p(e){return function(n){return e+"::"+encodeURIComponent(n)}}function f(e,n){for(var t,r,o=[],i=0;i<("undefined"==typeof e?0:e.length);++i)t=e[i],r=n(t),o.push(r);return o}function m(e){var n="IFRAME",t=function(e){return e.src},r=p("iframe");return h(e,n,t,s,r)}function l(e){var n="EMBED",t=function(e){return e.src},r=p("embed");return h(e,n,t,s,r)}function h(e,n,t,r,o){var i=e.getElementsByTagName(n),a=f(i,t),c=u(a,r),s=f(c,o);return s}function g(e){var n="FRAME",t=function(e){return e.src},r=p("frame");return h(e,n,t,s,r)}function q(e){var n="IMG",t=function(e){return e.src},r=p("img");return h(e,n,t,s,r)}function v(e){var n=e.slice(0),t=[];n.sort(),t.push(n[0]);for(var r=1;r<("undefined"==typeof n?0:n.length);r+=1)n[r]!=n[r-1]&&t.push(n[r]);return t}e.checkNonTxDomain=r}(window,document,location);try{setTimeout(function(){checkNonTxDomain(.1,100,1)},0)}catch(ign){}try{setTimeout(function(){checkNonTxDomain(.1,100,0)},3e3)}catch(ign){}try{"qqmusic3.cm.com"!=top.location.hostname&&"y.qq.com"!=top.location.hostname&&"c.y.qq.com"!=top.location.hostname&&"n.y.qq.com"!=top.location.hostname&&"i.y.qq.com"!=top.location.hostname&&"www.qqmusic.com"!=top.location.hostname&&window.location.replace("//y.qq.com/download/")}catch(e){}var define,fisDebug,preArgs=[],projectName="yqq",noneStoreIdlist=["js/common/module/music/OFPLite_selector.js"].join("|");!function(e){function n(){try{if(arguments.callee.caller.caller){for(var e,n=arguments.callee.caller.caller,t=[];n;)e=n,t.push(e.toString().replace(/[\t\n\r]/g,"").substring(0,100)+"..."),n=n.caller;return t.join(" --> ")}return""}catch(r){return""}}function t(e,n,t){var r="//stat.y.qq.com/monitor/report_err?platform=yqq&msg="+encodeURIComponent(e)+"&file="+encodeURIComponent(n||"mod.js")+"&line="+(t||0);return s=new Image,s.src=r,s.onload=function(){s=null},!0}function r(e,n){var r=f[e]||(f[e]=[]);if(r.push(n),!g[e])return t("map md5:"+v+", map updateTime:"+y+", Cannot find module `"+e+"`, maybe from `"+C+"`"),!1;C=e;var o=g[e]||{url:e};x++;try{var i="";if(E&&E[e+"?v"]==o.m&&(i=E[e]))return A.push(i),void 0;b.push(o)}catch(a){b.push(o)}}function o(){var e="undefined"==typeof b?0:b.length;if(e)if(1==e)i(b[0].url);else for(var n=0;e>n;n++){var t=b[n],r=1!=fisDebug&&t.pkg?q[t.pkg].url:t.url;r in h||(h[r]=!0,i(r))}}function i(e,n,t){setTimeout(function(){var r=/\.css(?:\?|#|$)/i.test(e),o=d.createElement(r?"link":"script");t&&(o.charset=t),o.onload=o.onerror=o.onreadystatechange=function(){/^(?:loaded|complete|undefined)$/.test(o.readyState)&&(o.onload=o.onerror=o.onreadystatechange=null,r||p.removeChild(o),o=null,n&&n())},r?(o.rel="stylesheet",o.href=e):(o.async=!0,o.crossOrigin=!0,1==fisDebug&&(e=e.replace(/_\w{7}?\.js/,".js")),o.src=e),p.appendChild(o)},0)}function a(e,n){if(e&&n)for(var t in n)e[t]=n[t]}function c(e){document.body.innerHTML+='<b style="position:absolute;right:30px;top:30px;z-index:9999;background:#000;color:#1b1;padding:5px">Debug模式'+e+",请刷新页面</b>"}function u(e){if(e=window.event||e,e.altKey&&123==e.keyCode)if(1==fisDebug)document.cookie="FIS_DEBUG=;path=/;expires=Mon, 26 Jul 1997 05:00:00 GMT;",fisDebug=0,c("关闭");else{var n=new Date;n.setTime(n.getTime()+864e5),document.cookie="FIS_DEBUG=1;path=/;expires="+n.toGMTString(),fisDebug=1,c("开启")}}var s=null;"undefined"!=typeof require&&require.args&&(preArgs=require.args),"undefined"!=typeof require&&"object"!=typeof require&&t("require != undefined",window.location.href,0);var d=document,p=d.getElementsByTagName("head")[0],f={},m={},l={},h={},g={},q={},v=0,y=0,w=document.cookie.match(new RegExp("(?:^|;+|\\s+)FIS_DEBUG=([^;]*)"));fisDebug=w?w[1]:"";var x=0,b=[],A=[],E=!1;try{E=localStorage,E.spt=!0}catch(I){}E=null;var C=null;if(define=function(e,n){m[e]=n;var r=f[e];if(r){for(var o=r.length-1;o>=0;--o)r[o]();delete f[e]}var i=g[e]||{};try{if(E&&E[e+"?v"]!=i.m&&noneStoreIdlist.indexOf(e)<0){var a='define("'+e+'",'+n.toString()+");";a.indexOf("ArsJscov")<0&&(E.setItem(e,a),E.setItem(e+"?v",i.m))}}catch(c){t(c.message||"")}},require=function(e){var n=l[e];if(n)return n.exports;var t=m[e];if(!t)throw Error("module `"+e+"` cannot be required");n=l[e]={exports:{}};var r="function"==typeof t?t.apply(n,[require,n.exports,n]):t;return r&&(n.exports=r),n.exports},require.async=function(n,i){function a(e){for(var n=("undefined"==typeof e?0:e.length)-1;n>=0;--n){var t=e[n];if(!(t in m||t in u)){u[t]=!0,s++,r(t,c);var o=g[t];o&&"deps"in o&&a(o.deps)}}}function c(){if(0==s--){var t,r,o=[];for(t=0,r="undefined"==typeof n?0:n.length;r>t;++t)o[t]=require(n[t]);i&&i.apply(e,o)}}A=[],b=[],"string"==typeof n&&(n=[n]);var u={},s=0;a(n);try{new Function(A.join(""))()}catch(d){t("new Function error: "+(d.name||"")+": "+(d.message||""))}o(),c()},require.resourceMap=function(e){a(g,e.res),a(q,e.pkg),e.md5&&(v=e.md5),e.updatetime&&(y=e.updatetime)},require.load=i,preArgs){for(var k=preArgs.length,S=0;k>S;S+=2)0==preArgs[S]&&require.resourceMap.apply(require,preArgs[S+1]);for(var S=0;k>S;S+=2)1==preArgs[S]&&require.async.apply(require,preArgs[S+1])}document.attachEvent?document.attachEvent("onkeydown",function(){u()}):document.addEventListener&&document.addEventListener("keydown",function(e){u(e)}),1!=window.fisDebug?window.onerror=function(e,r,o){for(var i=arguments.length,a="参数个数："+i+"个",c=0;i>c;c++)a+=" 参数"+(c+1)+"："+arguments[c];window.status=a;var u=n().substring(0,2e3);return""!==u&&(e+="; 堆栈信息："+u),t(e,r,o),!0}:document.body&&(document.body.innerHTML+='<div style="position:absolute;right:30px;top:30px;z-index:9999;background:#000;color:#1b1;padding:5px;" onclick="this.parentNode.removeChild(this)">当前是Debug模式. 点击关闭提示</div>')}(this);