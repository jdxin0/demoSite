// 展示loading
function showLoading(goal){
    var _goal = goal || $("body");
    var loading = '<div class="loading_spinner" id="loading_logo"><div class="spinner-container container1">'
                + '<div class="circle1"></div><div class="circle2"></div>'
                + '<div class="circle3"></div><div class="circle4"></div></div>'
                + '<div class="spinner-container container2"><div class="circle1"></div>'
                + '<div class="circle2"></div><div class="circle3"></div>'
                + '<div class="circle4"></div></div><div class="spinner-container container3">'
                + '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div>'
                + '<div class="circle4"></div></div></div>';
    _goal.append(loading);
}
// 直接移除loading
function removeLoading0(){
    $('#loading_logo') && $('#loading_logo').remove();
}
// 延时移除loading
function removeLoading(){
    setTimeout(function(){
        $('#loading_logo') && $('#loading_logo').remove();
    }, 300);
}

function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

function $ajax(url, type, data, dataType, successFn, errorFn , loadingwrap){
    removeLoading0();
    showLoading(loadingwrap);
    $.ajax({
        url : url,
        type: type || 'get',
        data: data || {},
        timeout : 30000,
        dataType: 'json',
        success: function(data){
            $.isFunction(successFn) && successFn(data);
            removeLoading();
        },
        error: function(xhr, errorType, error){
            if (errorType === 'timeout') {
              autoTip('请求超时。');
            } else {
              autoTip('请求异常。');
            }
            $.isFunction(errorFn) && errorFn(xhr, errorType, error);
            removeLoading();
        }
    });
}

// js css 加载
function asyLoadScript(filepath, fileType, callback){
    var container=document.getElementsByTagName('body')[0];
    var node;
    if(fileType == "js"){
        var oJs = document.createElement('script');
        oJs.setAttribute("type","text/javascript");
        oJs.setAttribute("src", filepath);//文件的地址 ,可为绝对及相对路径
        container.appendChild(oJs);//绑定
        node = oJs;
    }else if(fileType == "css"){
        var oCss = document.createElement("link");
        oCss.setAttribute("rel", "stylesheet");
        oCss.setAttribute("type", "text/css");
        oCss.setAttribute("href", filepath);
        container.appendChild(oCss);//绑定
        node = oCss;
    }
    node.onload = function(){
        $.isFunction(callback) && callback();
    }
}


/**************
*  表单验证
*/

/*********策略对象**********/
var strategies = {
	isNonEmpty : function(value , errorMsg) {
		if( value === ''){
			return errorMsg;
		}
	},
	minLength : function(value , length , errorMsg){
		if( value.length < length){
			return errorMsg;
		}
	},
	isMobile : function( value , errorMsg){
		if( !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test( value )){
			return errorMsg;
		}
	},
	isEmail : function(value , errorMsg) {
		if( !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test( value )){
			return errorMsg;
		}
	},
    isQQ : function(value , errorMsg) {
        if( !/^[1-9]([0-9]{5,12})/.test( value )){
            return errorMsg;
        }
    }
}


/*********Validator 类**********/
var Validator = function(){
	this.cache = [];
}

Validator.prototype.add = function( value , rules) {
	 var self = this;

	 for (var i = 0 , rule; rule = rules[ i++ ]; ) {
	 	(function( rule ) {
	 		var strategAry = rule.strategy.split(':');
	 		var errorMsg = rule.errorMsg;

	 		self.cache.push(function(){
	 			var strategy = strategAry.shift();
	 			strategAry.unshift( value );
	 			strategAry.push( errorMsg );
	 			return strategies[strategy].apply( value , strategAry );
	 		});
	 	})( rule );
	 }
};

Validator.prototype.start = function(){
	for (var i = 0 , validatorFunc; validatorFunc = this.cache[i++]; ) {
		var errorMsg = validatorFunc();
		if(errorMsg){
			return errorMsg;
		}
	}
}

// 是否为空
function isEmpty(val){
    return val.trim().length > 0 ? false : true ;
}
//电话
function testPhone(phone) {
  // var regphone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
  //     reg4 = /^400|^800/;
  // return regphone.test(phone) || reg4.test(phone);
  return true;
}
//邮箱
function testEmail(email) {
  var regemail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return regemail.test(email);
}
//网址
function testHttp(phone) {
  var reghttp = /^(http:\/\/)?(https:\/\/)?[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
  return reghttp.test(phone);
}

/*
*  表单验证 end
********************/


//字符长度
//获得字符串实际长度，中文2，英文1
function stringLength(str) {
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if(charCode > 128){
        realLength += 2;
    }else{
        realLength +=1;
    }
  }
  return realLength;
};




$.fn.css3 = function(props) {
    var css = {};
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for(var prop in props)
    {
        // Add the vendor specific versions
        for(var i=0; i<prefixes.length; i++)
            css['-'+prefixes[i]+'-'+prop] = props[prop];
        
        // Add the actual version   
        css[prop] = props[prop];
    }
    
    this.css(css);
    return this;
};

