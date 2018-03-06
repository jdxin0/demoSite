/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-ie8compat-dontmin
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
  "name": "IE8 compat mode",
  "property": "ie8compat",
  "authors": ["Erich Ocean"]
}
!*/

!function(n,e,o){function t(n,e){return typeof n===e}var s=[],a={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var o=this;setTimeout(function(){e(o[n])},0)},addTest:function(n,e,o){s.push({name:n,fn:e,options:o})},addAsyncTest:function(n){s.push({name:null,fn:n})}},i=function(){};i.prototype=a,i=new i,i.addTest("ie8compat",!n.addEventListener&&!!e.documentMode&&7===e.documentMode);var f=[];!function(){var n,e,o,a,r,d,l;for(var u in s)if(s.hasOwnProperty(u)){if(n=[],e=s[u],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)n.push(e.options.aliases[o].toLowerCase());for(a=t(e.fn,"function")?e.fn():e.fn,r=0;r<n.length;r++)d=n[r],l=d.split("."),1===l.length?i[l[0]]=a:(!i[l[0]]||i[l[0]]instanceof Boolean||(i[l[0]]=new Boolean(i[l[0]])),i[l[0]][l[1]]=a),f.push((a?"":"no-")+l.join("-"))}}(),delete a.addTest,delete a.addAsyncTest;for(var r=0;r<i._q.length;r++)i._q[r]();n.Modernizr=i}(window,document);