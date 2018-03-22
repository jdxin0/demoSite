/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */

/*
 * Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 *
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */


jQuery.fn.pagination=function(maxentries,opts){return opts=jQuery.extend({items_per_page:10,num_display_entries:10,current_page:0,num_edge_entries:0,link_to:"#",prev_text:"Prev",next_text:"Next",ellipse_text:"...",prev_show_always:!0,next_show_always:!0,callback:function(){return!1}},opts||{}),this.each(function(){function numPages(){return Math.ceil(maxentries/opts.items_per_page)}function getInterval(){var ne_half=Math.ceil(opts.num_display_entries/2),np=numPages(),upper_limit=np-opts.num_display_entries;return[current_page>ne_half?Math.max(Math.min(current_page-ne_half,upper_limit),0):0,current_page>ne_half?Math.min(current_page+ne_half,np):Math.min(opts.num_display_entries,np)]}function pageSelected(page_id,evt){current_page=page_id,drawLinks();var continuePropagation=opts.callback(page_id,panel);return continuePropagation||(evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=!0),continuePropagation}function drawLinks(){panel.empty();var interval=getInterval(),np=numPages(),getClickHandler=function(page_id){return function(evt){return pageSelected(page_id,evt)}},appendItem=function(page_id,appendopts){if(page_id=page_id<0?0:page_id<np?page_id:np-1,appendopts=jQuery.extend({text:page_id+1,classes:""},appendopts||{}),page_id==current_page)var lnk=jQuery("<span class='current'>"+appendopts.text+"</span>");else var lnk=jQuery("<a>"+appendopts.text+"</a>").bind("click",getClickHandler(page_id)).attr("href",opts.link_to.replace(/__id__/,page_id));appendopts.classes&&lnk.addClass(appendopts.classes),panel.append(lnk)};if(opts.prev_text&&(current_page>0||opts.prev_show_always)&&appendItem(current_page-1,{text:opts.prev_text,classes:"prev"}),interval[0]>0&&opts.num_edge_entries>0){for(var end=Math.min(opts.num_edge_entries,interval[0]),i=0;i<end;i++)appendItem(i);opts.num_edge_entries<interval[0]&&opts.ellipse_text&&jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel)}for(var i=interval[0];i<interval[1];i++)appendItem(i);if(interval[1]<np&&opts.num_edge_entries>0){np-opts.num_edge_entries>interval[1]&&opts.ellipse_text&&jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);for(var begin=Math.max(np-opts.num_edge_entries,interval[1]),i=begin;i<np;i++)appendItem(i)}opts.next_text&&(current_page<np-1||opts.next_show_always)&&appendItem(current_page+1,{text:opts.next_text,classes:"next"})}var current_page=opts.current_page;maxentries=!maxentries||maxentries<0?1:maxentries,opts.items_per_page=!opts.items_per_page||opts.items_per_page<0?1:opts.items_per_page;var panel=jQuery(this);this.selectPage=function(page_id){pageSelected(page_id)},this.prevPage=function(){return current_page>0&&(pageSelected(current_page-1),!0)},this.nextPage=function(){return current_page<numPages()-1&&(pageSelected(current_page+1),!0)},drawLinks(),opts.callback(current_page,this)})};
//# sourceMappingURL=jquery.pagination.js.map