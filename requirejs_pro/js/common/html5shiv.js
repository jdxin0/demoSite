/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */

/**
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */

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

/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */

/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */

//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

//     Underscore may be freely distributed under the MIT license.

/*
 * jQuery css bezier animation support -- Jonah Fox
 * version 0.0.1
 * Released under the MIT license.
 */


!function(window,document){function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement("p"),parent=ownerDocument.getElementsByTagName("head")[0]||ownerDocument.documentElement;return p.innerHTML="x<style>"+cssText+"</style>",parent.insertBefore(p.lastChild,parent.firstChild)}function getElements(){var elements=html5.elements;return"string"==typeof elements?elements.split(" "):elements}function addElements(newElements,ownerDocument){var elements=html5.elements;"string"!=typeof elements&&(elements=elements.join(" ")),"string"!=typeof newElements&&(newElements=newElements.join(" ")),html5.elements=elements+" "+newElements,shivDocument(ownerDocument)}function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];return data||(data={},expanID++,ownerDocument[expando]=expanID,expandoData[expanID]=data),data}function createElement(nodeName,ownerDocument,data){if(ownerDocument||(ownerDocument=document),supportsUnknownElements)return ownerDocument.createElement(nodeName);data||(data=getExpandoData(ownerDocument));var node;return node=data.cache[nodeName]?data.cache[nodeName].cloneNode():saveClones.test(nodeName)?(data.cache[nodeName]=data.createElem(nodeName)).cloneNode():data.createElem(nodeName),!node.canHaveChildren||reSkip.test(nodeName)||node.tagUrn?node:data.frag.appendChild(node)}function createDocumentFragment(ownerDocument,data){if(ownerDocument||(ownerDocument=document),supportsUnknownElements)return ownerDocument.createDocumentFragment();data=data||getExpandoData(ownerDocument);for(var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;i<l;i++)clone.createElement(elems[i]);return clone}function shivMethods(ownerDocument,data){data.cache||(data.cache={},data.createElem=ownerDocument.createElement,data.createFrag=ownerDocument.createDocumentFragment,data.frag=data.createFrag()),ownerDocument.createElement=function(nodeName){return html5.shivMethods?createElement(nodeName,ownerDocument,data):data.createElem(nodeName)},ownerDocument.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+getElements().join().replace(/[\w\-:]+/g,function(nodeName){return data.createElem(nodeName),data.frag.createElement(nodeName),'c("'+nodeName+'")'})+");return n}")(html5,data.frag)}function shivDocument(ownerDocument){ownerDocument||(ownerDocument=document);var data=getExpandoData(ownerDocument);return!html5.shivCSS||supportsHtml5Styles||data.hasCSS||(data.hasCSS=!!addStyleSheet(ownerDocument,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),supportsUnknownElements||shivMethods(ownerDocument,data),ownerDocument}var supportsHtml5Styles,supportsUnknownElements,options=window.html5||{},reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,expando="_html5shiv",expanID=0,expandoData={};!function(){try{var a=document.createElement("a");a.innerHTML="<xyz></xyz>",supportsHtml5Styles="hidden"in a,supportsUnknownElements=1==a.childNodes.length||function(){document.createElement("a");var frag=document.createDocumentFragment();return"undefined"==typeof frag.cloneNode||"undefined"==typeof frag.createDocumentFragment||"undefined"==typeof frag.createElement}()}catch(e){supportsHtml5Styles=!0,supportsUnknownElements=!0}}();var html5={elements:options.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:"3.7.3",shivCSS:!1!==options.shivCSS,supportsUnknownElements:supportsUnknownElements,shivMethods:!1!==options.shivMethods,type:"default",shivDocument:shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment,addElements:addElements};window.html5=html5,shivDocument(document),"object"==typeof module&&module.exports&&(module.exports=html5)}("undefined"!=typeof window?window:this,document);
//# sourceMappingURL=html5shiv.js.map