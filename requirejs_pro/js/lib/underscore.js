//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

//     Underscore may be freely distributed under the MIT license.

(function(){var root=this,previousUnderscore=root._,breaker={},ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype,push=ArrayProto.push,slice=ArrayProto.slice,concat=ArrayProto.concat,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty,nativeForEach=ArrayProto.forEach,nativeMap=ArrayProto.map,nativeReduce=ArrayProto.reduce,nativeReduceRight=ArrayProto.reduceRight,nativeFilter=ArrayProto.filter,nativeEvery=ArrayProto.every,nativeSome=ArrayProto.some,nativeIndexOf=ArrayProto.indexOf,nativeLastIndexOf=ArrayProto.lastIndexOf,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind,_=function(obj){return obj instanceof _?obj:this instanceof _?void(this._wrapped=obj):new _(obj)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=_),exports._=_):root._=_,_.VERSION="1.6.0";var each=_.each=_.forEach=function(obj,iterator,context){if(null==obj)return obj;if(nativeForEach&&obj.forEach===nativeForEach)obj.forEach(iterator,context);else if(obj.length===+obj.length){for(var i=0,length=obj.length;i<length;i++)if(iterator.call(context,obj[i],i,obj)===breaker)return}else for(var keys=_.keys(obj),i=0,length=keys.length;i<length;i++)if(iterator.call(context,obj[keys[i]],keys[i],obj)===breaker)return;return obj};_.map=_.collect=function(obj,iterator,context){var results=[];return null==obj?results:nativeMap&&obj.map===nativeMap?obj.map(iterator,context):(each(obj,function(value,index,list){results.push(iterator.call(context,value,index,list))}),results)};var reduceError="Reduce of empty array with no initial value";_.reduce=_.foldl=_.inject=function(obj,iterator,memo,context){var initial=arguments.length>2;if(null==obj&&(obj=[]),nativeReduce&&obj.reduce===nativeReduce)return context&&(iterator=_.bind(iterator,context)),initial?obj.reduce(iterator,memo):obj.reduce(iterator);if(each(obj,function(value,index,list){initial?memo=iterator.call(context,memo,value,index,list):(memo=value,initial=!0)}),!initial)throw new TypeError(reduceError);return memo},_.reduceRight=_.foldr=function(obj,iterator,memo,context){var initial=arguments.length>2;if(null==obj&&(obj=[]),nativeReduceRight&&obj.reduceRight===nativeReduceRight)return context&&(iterator=_.bind(iterator,context)),initial?obj.reduceRight(iterator,memo):obj.reduceRight(iterator);var length=obj.length;if(length!==+length){var keys=_.keys(obj);length=keys.length}if(each(obj,function(value,index,list){index=keys?keys[--length]:--length,initial?memo=iterator.call(context,memo,obj[index],index,list):(memo=obj[index],initial=!0)}),!initial)throw new TypeError(reduceError);return memo},_.find=_.detect=function(obj,predicate,context){var result;return any(obj,function(value,index,list){if(predicate.call(context,value,index,list))return result=value,!0}),result},_.filter=_.select=function(obj,predicate,context){var results=[];return null==obj?results:nativeFilter&&obj.filter===nativeFilter?obj.filter(predicate,context):(each(obj,function(value,index,list){predicate.call(context,value,index,list)&&results.push(value)}),results)},_.reject=function(obj,predicate,context){return _.filter(obj,function(value,index,list){return!predicate.call(context,value,index,list)},context)},_.every=_.all=function(obj,predicate,context){predicate||(predicate=_.identity);var result=!0;return null==obj?result:nativeEvery&&obj.every===nativeEvery?obj.every(predicate,context):(each(obj,function(value,index,list){if(!(result=result&&predicate.call(context,value,index,list)))return breaker}),!!result)};var any=_.some=_.any=function(obj,predicate,context){predicate||(predicate=_.identity);var result=!1;return null==obj?result:nativeSome&&obj.some===nativeSome?obj.some(predicate,context):(each(obj,function(value,index,list){if(result||(result=predicate.call(context,value,index,list)))return breaker}),!!result)};_.contains=_.include=function(obj,target){return null!=obj&&(nativeIndexOf&&obj.indexOf===nativeIndexOf?-1!=obj.indexOf(target):any(obj,function(value){return value===target}))},_.invoke=function(obj,method){var args=slice.call(arguments,2),isFunc=_.isFunction(method);return _.map(obj,function(value){return(isFunc?method:value[method]).apply(value,args)})},_.pluck=function(obj,key){return _.map(obj,_.property(key))},_.where=function(obj,attrs){return _.filter(obj,_.matches(attrs))},_.findWhere=function(obj,attrs){return _.find(obj,_.matches(attrs))},_.max=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535)return Math.max.apply(Math,obj);var result=-Infinity,lastComputed=-Infinity;return each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed>lastComputed&&(result=value,lastComputed=computed)}),result},_.min=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535)return Math.min.apply(Math,obj);var result=Infinity,lastComputed=Infinity;return each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed<lastComputed&&(result=value,lastComputed=computed)}),result},_.shuffle=function(obj){var rand,index=0,shuffled=[];return each(obj,function(value){rand=_.random(index++),shuffled[index-1]=shuffled[rand],shuffled[rand]=value}),shuffled},_.sample=function(obj,n,guard){return null==n||guard?(obj.length!==+obj.length&&(obj=_.values(obj)),obj[_.random(obj.length-1)]):_.shuffle(obj).slice(0,Math.max(0,n))};var lookupIterator=function(value){return null==value?_.identity:_.isFunction(value)?value:_.property(value)};_.sortBy=function(obj,iterator,context){return iterator=lookupIterator(iterator),_.pluck(_.map(obj,function(value,index,list){return{value:value,index:index,criteria:iterator.call(context,value,index,list)}}).sort(function(left,right){var a=left.criteria,b=right.criteria;if(a!==b){if(a>b||void 0===a)return 1;if(a<b||void 0===b)return-1}return left.index-right.index}),"value")};var group=function(behavior){return function(obj,iterator,context){var result={};return iterator=lookupIterator(iterator),each(obj,function(value,index){var key=iterator.call(context,value,index,obj);behavior(result,key,value)}),result}};_.groupBy=group(function(result,key,value){_.has(result,key)?result[key].push(value):result[key]=[value]}),_.indexBy=group(function(result,key,value){result[key]=value}),_.countBy=group(function(result,key){_.has(result,key)?result[key]++:result[key]=1}),_.sortedIndex=function(array,obj,iterator,context){iterator=lookupIterator(iterator);for(var value=iterator.call(context,obj),low=0,high=array.length;low<high;){var mid=low+high>>>1;iterator.call(context,array[mid])<value?low=mid+1:high=mid}return low},_.toArray=function(obj){return obj?_.isArray(obj)?slice.call(obj):obj.length===+obj.length?_.map(obj,_.identity):_.values(obj):[]},_.size=function(obj){return null==obj?0:obj.length===+obj.length?obj.length:_.keys(obj).length},_.first=_.head=_.take=function(array,n,guard){if(null!=array)return null==n||guard?array[0]:n<0?[]:slice.call(array,0,n)},_.initial=function(array,n,guard){return slice.call(array,0,array.length-(null==n||guard?1:n))},_.last=function(array,n,guard){if(null!=array)return null==n||guard?array[array.length-1]:slice.call(array,Math.max(array.length-n,0))},_.rest=_.tail=_.drop=function(array,n,guard){return slice.call(array,null==n||guard?1:n)},_.compact=function(array){return _.filter(array,_.identity)};var flatten=function(input,shallow,output){return shallow&&_.every(input,_.isArray)?concat.apply(output,input):(each(input,function(value){_.isArray(value)||_.isArguments(value)?shallow?push.apply(output,value):flatten(value,shallow,output):output.push(value)}),output)};_.flatten=function(array,shallow){return flatten(array,shallow,[])},_.without=function(array){return _.difference(array,slice.call(arguments,1))},_.partition=function(array,predicate){var pass=[],fail=[];return each(array,function(elem){(predicate(elem)?pass:fail).push(elem)}),[pass,fail]},_.uniq=_.unique=function(array,isSorted,iterator,context){_.isFunction(isSorted)&&(context=iterator,iterator=isSorted,isSorted=!1);var initial=iterator?_.map(array,iterator,context):array,results=[],seen=[];return each(initial,function(value,index){(isSorted?index&&seen[seen.length-1]===value:_.contains(seen,value))||(seen.push(value),results.push(array[index]))}),results},_.union=function(){return _.uniq(_.flatten(arguments,!0))},_.intersection=function(array){var rest=slice.call(arguments,1);return _.filter(_.uniq(array),function(item){return _.every(rest,function(other){return _.contains(other,item)})})},_.difference=function(array){var rest=concat.apply(ArrayProto,slice.call(arguments,1));return _.filter(array,function(value){return!_.contains(rest,value)})},_.zip=function(){for(var length=_.max(_.pluck(arguments,"length").concat(0)),results=new Array(length),i=0;i<length;i++)results[i]=_.pluck(arguments,""+i);return results},_.object=function(list,values){if(null==list)return{};for(var result={},i=0,length=list.length;i<length;i++)values?result[list[i]]=values[i]:result[list[i][0]]=list[i][1];return result},_.indexOf=function(array,item,isSorted){if(null==array)return-1;var i=0,length=array.length;if(isSorted){if("number"!=typeof isSorted)return i=_.sortedIndex(array,item),array[i]===item?i:-1;i=isSorted<0?Math.max(0,length+isSorted):isSorted}if(nativeIndexOf&&array.indexOf===nativeIndexOf)return array.indexOf(item,isSorted);for(;i<length;i++)if(array[i]===item)return i;return-1},_.lastIndexOf=function(array,item,from){if(null==array)return-1;var hasIndex=null!=from;if(nativeLastIndexOf&&array.lastIndexOf===nativeLastIndexOf)return hasIndex?array.lastIndexOf(item,from):array.lastIndexOf(item);for(var i=hasIndex?from:array.length;i--;)if(array[i]===item)return i;return-1},_.range=function(start,stop,step){arguments.length<=1&&(stop=start||0,start=0),step=arguments[2]||1;for(var length=Math.max(Math.ceil((stop-start)/step),0),idx=0,range=new Array(length);idx<length;)range[idx++]=start,start+=step;return range};var ctor=function(){};_.bind=function(func,context){var args,bound;if(nativeBind&&func.bind===nativeBind)return nativeBind.apply(func,slice.call(arguments,1));if(!_.isFunction(func))throw new TypeError;return args=slice.call(arguments,2),bound=function(){if(!(this instanceof bound))return func.apply(context,args.concat(slice.call(arguments)));ctor.prototype=func.prototype;var self=new ctor;ctor.prototype=null;var result=func.apply(self,args.concat(slice.call(arguments)));return Object(result)===result?result:self}},_.partial=function(func){var boundArgs=slice.call(arguments,1);return function(){for(var position=0,args=boundArgs.slice(),i=0,length=args.length;i<length;i++)args[i]===_&&(args[i]=arguments[position++]);for(;position<arguments.length;)args.push(arguments[position++]);return func.apply(this,args)}},_.bindAll=function(obj){var funcs=slice.call(arguments,1);if(0===funcs.length)throw new Error("bindAll must be passed function names");return each(funcs,function(f){obj[f]=_.bind(obj[f],obj)}),obj},_.memoize=function(func,hasher){var memo={};return hasher||(hasher=_.identity),function(){var key=hasher.apply(this,arguments);return _.has(memo,key)?memo[key]:memo[key]=func.apply(this,arguments)}},_.delay=function(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(null,args)},wait)},_.defer=function(func){return _.delay.apply(_,[func,1].concat(slice.call(arguments,1)))},_.throttle=function(func,wait,options){var context,args,result,timeout=null,previous=0;options||(options={});var later=function(){previous=!1===options.leading?0:_.now(),timeout=null,result=func.apply(context,args),context=args=null};return function(){var now=_.now();previous||!1!==options.leading||(previous=now);var remaining=wait-(now-previous);return context=this,args=arguments,remaining<=0?(clearTimeout(timeout),timeout=null,previous=now,result=func.apply(context,args),context=args=null):timeout||!1===options.trailing||(timeout=setTimeout(later,remaining)),result}},_.debounce=function(func,wait,immediate){var timeout,args,context,timestamp,result,later=function(){var last=_.now()-timestamp;last<wait?timeout=setTimeout(later,wait-last):(timeout=null,immediate||(result=func.apply(context,args),context=args=null))};return function(){context=this,args=arguments,timestamp=_.now();var callNow=immediate&&!timeout;return timeout||(timeout=setTimeout(later,wait)),callNow&&(result=func.apply(context,args),context=args=null),result}},_.once=function(func){var memo,ran=!1;return function(){return ran?memo:(ran=!0,memo=func.apply(this,arguments),func=null,memo)}},_.wrap=function(func,wrapper){return _.partial(wrapper,func)},_.compose=function(){var funcs=arguments;return function(){for(var args=arguments,i=funcs.length-1;i>=0;i--)args=[funcs[i].apply(this,args)];return args[0]}},_.after=function(times,func){return function(){if(--times<1)return func.apply(this,arguments)}},_.keys=function(obj){if(!_.isObject(obj))return[];if(nativeKeys)return nativeKeys(obj);var keys=[];for(var key in obj)_.has(obj,key)&&keys.push(key);return keys},_.values=function(obj){for(var keys=_.keys(obj),length=keys.length,values=new Array(length),i=0;i<length;i++)values[i]=obj[keys[i]];return values},_.pairs=function(obj){for(var keys=_.keys(obj),length=keys.length,pairs=new Array(length),i=0;i<length;i++)pairs[i]=[keys[i],obj[keys[i]]];return pairs},_.invert=function(obj){for(var result={},keys=_.keys(obj),i=0,length=keys.length;i<length;i++)result[obj[keys[i]]]=keys[i];return result},_.functions=_.methods=function(obj){var names=[];for(var key in obj)_.isFunction(obj[key])&&names.push(key);return names.sort()},_.extend=function(obj){return each(slice.call(arguments,1),function(source){if(source)for(var prop in source)obj[prop]=source[prop]}),obj},_.pick=function(obj){var copy={},keys=concat.apply(ArrayProto,slice.call(arguments,1));return each(keys,function(key){key in obj&&(copy[key]=obj[key])}),copy},_.omit=function(obj){var copy={},keys=concat.apply(ArrayProto,slice.call(arguments,1));for(var key in obj)_.contains(keys,key)||(copy[key]=obj[key]);return copy},_.defaults=function(obj){return each(slice.call(arguments,1),function(source){if(source)for(var prop in source)void 0===obj[prop]&&(obj[prop]=source[prop])}),obj},_.clone=function(obj){return _.isObject(obj)?_.isArray(obj)?obj.slice():_.extend({},obj):obj},_.tap=function(obj,interceptor){return interceptor(obj),obj};var eq=function(a,b,aStack,bStack){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof _&&(a=a._wrapped),b instanceof _&&(b=b._wrapped);var className=toString.call(a);if(className!=toString.call(b))return!1;switch(className){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var length=aStack.length;length--;)if(aStack[length]==a)return bStack[length]==b;var aCtor=a.constructor,bCtor=b.constructor;if(aCtor!==bCtor&&!(_.isFunction(aCtor)&&aCtor instanceof aCtor&&_.isFunction(bCtor)&&bCtor instanceof bCtor)&&"constructor"in a&&"constructor"in b)return!1;aStack.push(a),bStack.push(b);var size=0,result=!0;if("[object Array]"==className){if(size=a.length,result=size==b.length)for(;size--&&(result=eq(a[size],b[size],aStack,bStack)););}else{for(var key in a)if(_.has(a,key)&&(size++,!(result=_.has(b,key)&&eq(a[key],b[key],aStack,bStack))))break;if(result){for(key in b)if(_.has(b,key)&&!size--)break;result=!size}}return aStack.pop(),bStack.pop(),result};_.isEqual=function(a,b){return eq(a,b,[],[])},_.isEmpty=function(obj){if(null==obj)return!0;if(_.isArray(obj)||_.isString(obj))return 0===obj.length;for(var key in obj)if(_.has(obj,key))return!1;return!0},_.isElement=function(obj){return!(!obj||1!==obj.nodeType)},_.isArray=nativeIsArray||function(obj){return"[object Array]"==toString.call(obj)},_.isObject=function(obj){return obj===Object(obj)},each(["Arguments","Function","String","Number","Date","RegExp"],function(name){_["is"+name]=function(obj){return toString.call(obj)=="[object "+name+"]"}}),_.isArguments(arguments)||(_.isArguments=function(obj){return!(!obj||!_.has(obj,"callee"))}),"function"!=typeof/./&&(_.isFunction=function(obj){return"function"==typeof obj}),_.isFinite=function(obj){return isFinite(obj)&&!isNaN(parseFloat(obj))},_.isNaN=function(obj){return _.isNumber(obj)&&obj!=+obj},_.isBoolean=function(obj){return!0===obj||!1===obj||"[object Boolean]"==toString.call(obj)},_.isNull=function(obj){return null===obj},_.isUndefined=function(obj){return void 0===obj},_.has=function(obj,key){return hasOwnProperty.call(obj,key)},_.noConflict=function(){return root._=previousUnderscore,this},_.identity=function(value){return value},_.constant=function(value){return function(){return value}},_.property=function(key){return function(obj){return obj[key]}},_.matches=function(attrs){return function(obj){if(obj===attrs)return!0;for(var key in attrs)if(attrs[key]!==obj[key])return!1;return!0}},_.times=function(n,iterator,context){for(var accum=Array(Math.max(0,n)),i=0;i<n;i++)accum[i]=iterator.call(context,i);return accum},_.random=function(min,max){return null==max&&(max=min,min=0),min+Math.floor(Math.random()*(max-min+1))},_.now=Date.now||function(){return(new Date).getTime()};var entityMap={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};entityMap.unescape=_.invert(entityMap.escape);var entityRegexes={escape:new RegExp("["+_.keys(entityMap.escape).join("")+"]","g"),unescape:new RegExp("("+_.keys(entityMap.unescape).join("|")+")","g")};_.each(["escape","unescape"],function(method){_[method]=function(string){return null==string?"":(""+string).replace(entityRegexes[method],function(match){return entityMap[method][match]})}}),_.result=function(object,property){if(null!=object){var value=object[property];return _.isFunction(value)?value.call(object):value}},_.mixin=function(obj){each(_.functions(obj),function(name){var func=_[name]=obj[name];_.prototype[name]=function(){var args=[this._wrapped];return push.apply(args,arguments),result.call(this,func.apply(_,args))}})};var idCounter=0;_.uniqueId=function(prefix){var id=++idCounter+"";return prefix?prefix+id:id},_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var noMatch=/(.)^/,escapes={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g;_.template=function(text,data,settings){var render;settings=_.defaults({},settings,_.templateSettings);var matcher=new RegExp([(settings.escape||noMatch).source,(settings.interpolate||noMatch).source,(settings.evaluate||noMatch).source].join("|")+"|$","g"),index=0,source="__p+='";text.replace(matcher,function(match,escape,interpolate,evaluate,offset){return source+=text.slice(index,offset).replace(escaper,function(match){return"\\"+escapes[match]}),escape&&(source+="'+\n((__t=("+escape+"))==null?'':_.escape(__t))+\n'"),interpolate&&(source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'"),evaluate&&(source+="';\n"+evaluate+"\n__p+='"),index=offset+match.length,match}),source+="';\n",settings.variable||(source="with(obj||{}){\n"+source+"}\n"),source="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+source+"return __p;\n";try{render=new Function(settings.variable||"obj","_",source)}catch(e){throw e.source=source,e}if(data)return render(data,_);var template=function(data){return render.call(this,data,_)};return template.source="function("+(settings.variable||"obj")+"){\n"+source+"}",template},_.chain=function(obj){return _(obj).chain()};var result=function(obj){return this._chain?_(obj).chain():obj};_.mixin(_),each(["pop","push","reverse","shift","sort","splice","unshift"],function(name){var method=ArrayProto[name];_.prototype[name]=function(){var obj=this._wrapped;return method.apply(obj,arguments),"shift"!=name&&"splice"!=name||0!==obj.length||delete obj[0],result.call(this,obj)}}),each(["concat","join","slice"],function(name){var method=ArrayProto[name];_.prototype[name]=function(){return result.call(this,method.apply(this._wrapped,arguments))}}),_.extend(_.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return _})}).call(this);