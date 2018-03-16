/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-canvas-ie8compat-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*!
{
  "name": "Canvas",
  "property": "canvas",
  "caniuse": "canvas",
  "tags": ["canvas", "graphics"],
  "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
}
!*/

/*!
{
  "name": "IE8 compat mode",
  "property": "ie8compat",
  "authors": ["Erich Ocean"]
}
!*/

!function(window,document,undefined){function is(obj,type){return typeof obj===type}function createElement(){return"function"!=typeof document.createElement?document.createElement(arguments[0]):isSVG?document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0]):document.createElement.apply(document,arguments)}var tests=[],ModernizrProto={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(test,cb){var self=this;setTimeout(function(){cb(self[test])},0)},addTest:function(name,fn,options){tests.push({name:name,fn:fn,options:options})},addAsyncTest:function(fn){tests.push({name:null,fn:fn})}},Modernizr=function(){};Modernizr.prototype=ModernizrProto,Modernizr=new Modernizr;var classes=[],docElement=document.documentElement,isSVG="svg"===docElement.nodeName.toLowerCase();Modernizr.addTest("canvas",function(){var elem=createElement("canvas");return!(!elem.getContext||!elem.getContext("2d"))}),Modernizr.addTest("ie8compat",!window.addEventListener&&!!document.documentMode&&7===document.documentMode),function(){var featureNames,feature,aliasIdx,result,nameIdx,featureName,featureNameSplit;for(var featureIdx in tests)if(tests.hasOwnProperty(featureIdx)){if(featureNames=[],feature=tests[featureIdx],feature.name&&(featureNames.push(feature.name.toLowerCase()),feature.options&&feature.options.aliases&&feature.options.aliases.length))for(aliasIdx=0;aliasIdx<feature.options.aliases.length;aliasIdx++)featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());for(result=is(feature.fn,"function")?feature.fn():feature.fn,nameIdx=0;nameIdx<featureNames.length;nameIdx++)featureName=featureNames[nameIdx],featureNameSplit=featureName.split("."),1===featureNameSplit.length?Modernizr[featureNameSplit[0]]=result:(!Modernizr[featureNameSplit[0]]||Modernizr[featureNameSplit[0]]instanceof Boolean||(Modernizr[featureNameSplit[0]]=new Boolean(Modernizr[featureNameSplit[0]])),Modernizr[featureNameSplit[0]][featureNameSplit[1]]=result),classes.push((result?"":"no-")+featureNameSplit.join("-"))}}(),delete ModernizrProto.addTest,delete ModernizrProto.addAsyncTest;for(var i=0;i<Modernizr._q.length;i++)Modernizr._q[i]();window.Modernizr=Modernizr}(window,document);