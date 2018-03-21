/*!
 * jQuery Migrate - v1.4.1 - 2016-05-19
 * Copyright jQuery Foundation and other contributors
 */

!function(jQuery,window,undefined){function migrateWarn(msg){var console=window.console;warnedAbout[msg]||(warnedAbout[msg]=!0,jQuery.migrateWarnings.push(msg),console&&console.warn&&!jQuery.migrateMute&&(console.warn("JQMIGRATE: "+msg),jQuery.migrateTrace&&console.trace&&console.trace()))}function migrateWarnProp(obj,prop,value,msg){if(Object.defineProperty)try{return void Object.defineProperty(obj,prop,{configurable:!0,enumerable:!0,get:function(){return migrateWarn(msg),value},set:function(newValue){migrateWarn(msg),value=newValue}})}catch(err){}jQuery._definePropertyBroken=!0,obj[prop]=value}jQuery.migrateVersion="1.4.1";var warnedAbout={};jQuery.migrateWarnings=[],window.console&&window.console.log&&window.console.log("JQMIGRATE: Migrate is installed"+(jQuery.migrateMute?"":" with logging active")+", version "+jQuery.migrateVersion),void 0===jQuery.migrateTrace&&(jQuery.migrateTrace=!0),jQuery.migrateReset=function(){warnedAbout={},jQuery.migrateWarnings.length=0},"BackCompat"===document.compatMode&&migrateWarn("jQuery is not compatible with Quirks Mode");var attrFn=jQuery("<input/>",{size:1}).attr("size")&&jQuery.attrFn,oldAttr=jQuery.attr,valueAttrGet=jQuery.attrHooks.value&&jQuery.attrHooks.value.get||function(){return null},valueAttrSet=jQuery.attrHooks.value&&jQuery.attrHooks.value.set||function(){},rnoType=/^(?:input|button)$/i,rnoAttrNodeType=/^[238]$/,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,ruseDefault=/^(?:checked|selected)$/i;migrateWarnProp(jQuery,"attrFn",attrFn||{},"jQuery.attrFn is deprecated"),jQuery.attr=function(elem,name,value,pass){var lowerName=name.toLowerCase(),nType=elem&&elem.nodeType;return pass&&(oldAttr.length<4&&migrateWarn("jQuery.fn.attr( props, pass ) is deprecated"),elem&&!rnoAttrNodeType.test(nType)&&(attrFn?name in attrFn:jQuery.isFunction(jQuery.fn[name])))?jQuery(elem)[name](value):("type"===name&&void 0!==value&&rnoType.test(elem.nodeName)&&elem.parentNode&&migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8"),!jQuery.attrHooks[lowerName]&&rboolean.test(lowerName)&&(jQuery.attrHooks[lowerName]={get:function(elem,name){var attrNode,property=jQuery.prop(elem,name);return!0===property||"boolean"!=typeof property&&(attrNode=elem.getAttributeNode(name))&&!1!==attrNode.nodeValue?name.toLowerCase():void 0},set:function(elem,value,name){var propName;return!1===value?jQuery.removeAttr(elem,name):(propName=jQuery.propFix[name]||name,propName in elem&&(elem[propName]=!0),elem.setAttribute(name,name.toLowerCase())),name}},ruseDefault.test(lowerName)&&migrateWarn("jQuery.fn.attr('"+lowerName+"') might use property instead of attribute")),oldAttr.call(jQuery,elem,name,value))},jQuery.attrHooks.value={get:function(elem,name){var nodeName=(elem.nodeName||"").toLowerCase();return"button"===nodeName?valueAttrGet.apply(this,arguments):("input"!==nodeName&&"option"!==nodeName&&migrateWarn("jQuery.fn.attr('value') no longer gets properties"),name in elem?elem.value:null)},set:function(elem,value){var nodeName=(elem.nodeName||"").toLowerCase();if("button"===nodeName)return valueAttrSet.apply(this,arguments);"input"!==nodeName&&"option"!==nodeName&&migrateWarn("jQuery.fn.attr('value', val) no longer sets properties"),elem.value=value}};var matched,browser,oldInit=jQuery.fn.init,oldFind=jQuery.find,oldParseJSON=jQuery.parseJSON,rspaceAngle=/^\s*</,rattrHashTest=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,rattrHashGlob=/\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,rquickExpr=/^([^<]*)(<[\w\W]+>)([^>]*)$/;jQuery.fn.init=function(selector,context,rootjQuery){var match,ret;return selector&&"string"==typeof selector&&!jQuery.isPlainObject(context)&&(match=rquickExpr.exec(jQuery.trim(selector)))&&match[0]&&(rspaceAngle.test(selector)||migrateWarn("$(html) HTML strings must start with '<' character"),match[3]&&migrateWarn("$(html) HTML text after last tag is ignored"),"#"===match[0].charAt(0)&&(migrateWarn("HTML string cannot start with a '#' character"),jQuery.error("JQMIGRATE: Invalid selector string (XSS)")),context&&context.context&&context.context.nodeType&&(context=context.context),jQuery.parseHTML)?oldInit.call(this,jQuery.parseHTML(match[2],context&&context.ownerDocument||context||document,!0),context,rootjQuery):(ret=oldInit.apply(this,arguments),selector&&void 0!==selector.selector?(ret.selector=selector.selector,ret.context=selector.context):(ret.selector="string"==typeof selector?selector:"",selector&&(ret.context=selector.nodeType?selector:context||document)),ret)},jQuery.fn.init.prototype=jQuery.fn,jQuery.find=function(selector){var args=Array.prototype.slice.call(arguments);if("string"==typeof selector&&rattrHashTest.test(selector))try{document.querySelector(selector)}catch(err1){selector=selector.replace(rattrHashGlob,function(_,attr,op,value){return"["+attr+op+'"'+value+'"]'});try{document.querySelector(selector),migrateWarn("Attribute selector with '#' must be quoted: "+args[0]),args[0]=selector}catch(err2){migrateWarn("Attribute selector with '#' was not fixed: "+args[0])}}return oldFind.apply(this,args)};var findProp;for(findProp in oldFind)Object.prototype.hasOwnProperty.call(oldFind,findProp)&&(jQuery.find[findProp]=oldFind[findProp]);jQuery.parseJSON=function(json){return json?oldParseJSON.apply(this,arguments):(migrateWarn("jQuery.parseJSON requires a valid JSON string"),null)},jQuery.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}},jQuery.browser||(matched=jQuery.uaMatch(navigator.userAgent),browser={},matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0),jQuery.browser=browser),migrateWarnProp(jQuery,"browser",jQuery.browser,"jQuery.browser is deprecated"),jQuery.boxModel=jQuery.support.boxModel="CSS1Compat"===document.compatMode,migrateWarnProp(jQuery,"boxModel",jQuery.boxModel,"jQuery.boxModel is deprecated"),migrateWarnProp(jQuery.support,"boxModel",jQuery.support.boxModel,"jQuery.support.boxModel is deprecated"),jQuery.sub=function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context)}jQuery.extend(!0,jQuerySub,this),jQuerySub.superclass=this,jQuerySub.fn=jQuerySub.prototype=this(),jQuerySub.fn.constructor=jQuerySub,jQuerySub.sub=this.sub,jQuerySub.fn.init=function(selector,context){var instance=jQuery.fn.init.call(this,selector,context,rootjQuerySub);return instance instanceof jQuerySub?instance:jQuerySub(instance)},jQuerySub.fn.init.prototype=jQuerySub.fn;var rootjQuerySub=jQuerySub(document);return migrateWarn("jQuery.sub() is deprecated"),jQuerySub},jQuery.fn.size=function(){return migrateWarn("jQuery.fn.size() is deprecated; use the .length property"),this.length};var internalSwapCall=!1;jQuery.swap&&jQuery.each(["height","width","reliableMarginRight"],function(_,name){var oldHook=jQuery.cssHooks[name]&&jQuery.cssHooks[name].get;oldHook&&(jQuery.cssHooks[name].get=function(){var ret;return internalSwapCall=!0,ret=oldHook.apply(this,arguments),internalSwapCall=!1,ret})}),jQuery.swap=function(elem,options,callback,args){var ret,name,old={};internalSwapCall||migrateWarn("jQuery.swap() is undocumented and deprecated");for(name in options)old[name]=elem.style[name],elem.style[name]=options[name];ret=callback.apply(elem,args||[]);for(name in options)elem.style[name]=old[name];return ret},jQuery.ajaxSetup({converters:{"text json":jQuery.parseJSON}});var oldFnData=jQuery.fn.data;jQuery.fn.data=function(name){var ret,evt,elem=this[0];return!elem||"events"!==name||1!==arguments.length||(ret=jQuery.data(elem,name),evt=jQuery._data(elem,name),void 0!==ret&&ret!==evt||void 0===evt)?oldFnData.apply(this,arguments):(migrateWarn("Use of jQuery.fn.data('events') is deprecated"),evt)};var rscriptType=/\/(java|ecma)script/i;jQuery.clean||(jQuery.clean=function(elems,context,fragment,scripts){context=context||document,context=!context.nodeType&&context[0]||context,context=context.ownerDocument||context,migrateWarn("jQuery.clean() is deprecated");var i,elem,handleScript,jsTags,ret=[];if(jQuery.merge(ret,jQuery.buildFragment(elems,context).childNodes),fragment)for(handleScript=function(elem){if(!elem.type||rscriptType.test(elem.type))return scripts?scripts.push(elem.parentNode?elem.parentNode.removeChild(elem):elem):fragment.appendChild(elem)},i=0;null!=(elem=ret[i]);i++)jQuery.nodeName(elem,"script")&&handleScript(elem)||(fragment.appendChild(elem),"undefined"!=typeof elem.getElementsByTagName&&(jsTags=jQuery.grep(jQuery.merge([],elem.getElementsByTagName("script")),handleScript),ret.splice.apply(ret,[i+1,0].concat(jsTags)),i+=jsTags.length));return ret});var eventAdd=jQuery.event.add,eventRemove=jQuery.event.remove,eventTrigger=jQuery.event.trigger,oldToggle=jQuery.fn.toggle,oldLive=jQuery.fn.live,oldDie=jQuery.fn.die,oldLoad=jQuery.fn.load,ajaxEvents="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",rajaxEvent=new RegExp("\\b(?:"+ajaxEvents+")\\b"),rhoverHack=/(?:^|\s)hover(\.\S+|)\b/,hoverHack=function(events){return"string"!=typeof events||jQuery.event.special.hover?events:(rhoverHack.test(events)&&migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),events&&events.replace(rhoverHack,"mouseenter$1 mouseleave$1"))};jQuery.event.props&&"attrChange"!==jQuery.event.props[0]&&jQuery.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),jQuery.event.dispatch&&migrateWarnProp(jQuery.event,"handle",jQuery.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),jQuery.event.add=function(elem,types,handler,data,selector){elem!==document&&rajaxEvent.test(types)&&migrateWarn("AJAX events should be attached to document: "+types),eventAdd.call(this,elem,hoverHack(types||""),handler,data,selector)},jQuery.event.remove=function(elem,types,handler,selector,mappedTypes){eventRemove.call(this,elem,hoverHack(types)||"",handler,selector,mappedTypes)},jQuery.each(["load","unload","error"],function(_,name){jQuery.fn[name]=function(){var args=Array.prototype.slice.call(arguments,0);return"load"===name&&"string"==typeof args[0]?oldLoad.apply(this,args):(migrateWarn("jQuery.fn."+name+"() is deprecated"),args.splice(0,0,name),arguments.length?this.bind.apply(this,args):(this.triggerHandler.apply(this,args),this))}}),jQuery.fn.toggle=function(fn,fn2){if(!jQuery.isFunction(fn)||!jQuery.isFunction(fn2))return oldToggle.apply(this,arguments);migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;return jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1),event.preventDefault(),args[lastToggle].apply(this,arguments)||!1};for(toggler.guid=guid;i<args.length;)args[i++].guid=guid;return this.click(toggler)},jQuery.fn.live=function(types,data,fn){return migrateWarn("jQuery.fn.live() is deprecated"),oldLive?oldLive.apply(this,arguments):(jQuery(this.context).on(types,this.selector,data,fn),this)},jQuery.fn.die=function(types,fn){return migrateWarn("jQuery.fn.die() is deprecated"),oldDie?oldDie.apply(this,arguments):(jQuery(this.context).off(types,this.selector||"**",fn),this)},jQuery.event.trigger=function(event,data,elem,onlyHandlers){return elem||rajaxEvent.test(event)||migrateWarn("Global events are undocumented and deprecated"),eventTrigger.call(this,event,data,elem||document,onlyHandlers)},jQuery.each(ajaxEvents.split("|"),function(_,name){jQuery.event.special[name]={setup:function(){var elem=this;return elem!==document&&(jQuery.event.add(document,name+"."+jQuery.guid,function(){jQuery.event.trigger(name,Array.prototype.slice.call(arguments,1),elem,!0)}),jQuery._data(this,name,jQuery.guid++)),!1},teardown:function(){return this!==document&&jQuery.event.remove(document,name+"."+jQuery._data(this,name)),!1}}}),jQuery.event.special.ready={setup:function(){this===document&&migrateWarn("'ready' event is deprecated")}};var oldSelf=jQuery.fn.andSelf||jQuery.fn.addBack,oldFnFind=jQuery.fn.find;if(jQuery.fn.andSelf=function(){return migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),oldSelf.apply(this,arguments)},jQuery.fn.find=function(selector){var ret=oldFnFind.apply(this,arguments);return ret.context=this.context,ret.selector=this.selector?this.selector+" "+selector:selector,ret},jQuery.Callbacks){var oldDeferred=jQuery.Deferred,tuples=[["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory")]];jQuery.Deferred=function(func){var deferred=oldDeferred(),promise=deferred.promise();return deferred.pipe=promise.pipe=function(){var fns=arguments;return migrateWarn("deferred.pipe() is deprecated"),jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var fn=jQuery.isFunction(fns[i])&&fns[i];deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);returned&&jQuery.isFunction(returned.promise)?returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify):newDefer[tuple[0]+"With"](this===promise?newDefer.promise():this,fn?[returned]:arguments)})}),fns=null}).promise()},deferred.isResolved=function(){return migrateWarn("deferred.isResolved is deprecated"),"resolved"===deferred.state()},deferred.isRejected=function(){return migrateWarn("deferred.isRejected is deprecated"),"rejected"===deferred.state()},func&&func.call(deferred,deferred),deferred}}}(jQuery,window);