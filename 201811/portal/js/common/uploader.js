define('js/common/uploader.js', function(require, exports, module){

/**
 * 添加到组件
 * @author: lunardai
 * @lastModified: 2016/12/12
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	MUSIC = music,
	$ = music.$,
	BASE = require('js/common/music/lib/base.js')
	returnCode = require('js/common/music/returncode.js')
	//,SparkMD5 = require('js/common/music/spark_md5.js')
    , $ = music.$
	, User = music.widget.user
	, g_popup = music.popup
	, ua = MUSIC.userAgent
	,statistics = music.statistics
	Tips = require("js/common/music/tips.js"),
	cs ={
		p : function() {
			try{
				window.console && console.log(([].slice.call(arguments)).join('\t'));
			}catch(e){
			}
		}
	};

var uploader = (function(){
	var containerStyle = 'height:0;width:0;margin:0;padding:0;visibility:hidden;overflow:hidden;', id = 'ftnhtml5_uploader_obj', style = 'height:0;width:0;margin:0;padding:0;', useMultiSelect = false, inputObj;
	var g_event = {}, conf = {
		sizeLimit : 209715200/2*5,
		acceptAttr : 'mp4|flv|f4v|webm|m4v|mov|3gp|3g2|rm|rmvb|wmv|avi|asf|mpg|mpeg|mpe|ts|div|dv|divx|vob|dat|mkv|swf|lavf|cpk|dirac|ram|qt|fli|flc|mod'//|mp3|aac|ac3|wav|m4a|ogg'//'accept="video/*"'
	};
	var currentFileKey = '';
	function initObj() {
		 // mac 下诸多不兼容的问题，win 10 下也会有问题，干脆不使用这个属性了
		//if(!tvu.util.userAgent.macs) {
		//    acceptAttr = 'accept="video/*"';
		//}
		var html = '<div style="' + containerStyle + '"><input name="Filedata" type="file" id="' + id + '" style="' + style + '" width="0" height="0"' + (useMultiSelect ? ' multiple="multiple"' : '') + ' /></div>';
		if ($('#'+id).length==0)
		{
			$(document.body).append(html);
		}

		inputObj = document.getElementById(id);
		return !!inputObj;
	}
	function setUploadBtn(o){
		$(document).on('click', o, function(){
			$(inputObj).val('');filelist = [], trynum = 0;
			$(inputObj).click();
		});
	}
	var _chunksize = 2097152/2*5, _filelist_cache = {};
	function onSelect(fileArr) {
		var onefile = fileArr[0];
		currentFileKey = onefile.key || '';
		if (onefile.size == 0)
		{
			//g_event.onSendError && g_event.onSendError(8, currentFileKey);
			MUSIC.popup.show('请勿上传空文件！', 3000, 1);
			return false;
		}
		if (conf.sizeLimit>=onefile.size)
		{
			var filetype = (/\.[^\.]+$/.exec(onefile.name))[0].replace('.', '').toLowerCase(), typeArr = conf.acceptAttr.split('|'), _map = {};
			$.each(typeArr, function(idx, item){
				_map[item] = 1;
			});
			if (filetype in _map)
			{
				var scanWorker = new Worker('//y.qq.com/portal/mv/md5_worker.js');
				scanWorker.postMessage({file:onefile,type:'full',filekey: currentFileKey});
				scanWorker.onmessage=function(evt){
					var data = evt.data;
					if (data.filekey == currentFileKey && data.isFull) {
						if (data.type == 'error')
						{
							beforeSend({file : fileArr[0], md5 : ''});
						}else if (data.newType == 'scan_progress')
						{
							g_event.onScanProcess(data.data.size, data.data.total, currentFileKey);
						}else if (data.newType == 'total_md5sum')
						{
							beforeSend( {file : fileArr[0], md5 : data.data.md5});
							scanWorker.terminate();
						}
					}
				}
				g_event.onSelect(fileArr[0], currentFileKey);
			}else MUSIC.popup.show('暂不支持该格式！', 3000, 1);
		}else MUSIC.popup.show('上传文件大小超过限制！', 3000, 1);
	}
	function onScanProcess(total, scaned){
		g_event.onScanProcess(total, scaned, currentFileKey);
	}
	function beforeSend(fileinfo){
		if (!!fileinfo.md5)
		{
			//scanfile(fileinfo, true);
			var file = fileinfo.file;
			var worker = new Worker('//y.qq.com/portal/mv/md5_worker.js');
			worker.postMessage({file:file, type:'notfull',filekey: currentFileKey});
			worker.onmessage=function(evt){
				var data = evt.data;
				if (data.filekey == currentFileKey && !data.isFull) {
					if (data.newType == 'split_md5sum')
					{
						data.data.gmd = fileinfo.md5;
						filelist.push(data.data);
					_filelist_cache[data.data.pmd] = data.data;
						if (data.data.pidx==0)
						{
							uploadOnePiece(1);
						}
						//console.log(data.stat);
					}
					else if (data.newType == 'total_md5sum'){
						worker.terminate();
					}
				}

			}
			//startUpload(fileinfo);
		}else g_event.onSendError && g_event.onSendError(1, currentFileKey);
	};
	function onSendProcess(total, scaned){
		g_event.onSendProcess(total, scaned, currentFileKey);
	}
	var filelist = [], sending = false, forceStop = false, finishied = {}, trynum = 0, asyncTimer = 2;
	window.adTimer = null;
	function startTimer(){
		if (window.adTimer)
		{
			return;
		}
		window.adTimer = setInterval(function(){
			if (!!filelist&&filelist.length>0)
			{
				uploadOnePiece(-1);
			}else{
				resetFilelist();//g_event.onSendError && g_event.onSendError(7, currentFileKey);
			}
		}, 5*1000 );
	}
	function stopTimer(){
		//return;
		if (window.adTimer)
		{
			clearInterval( window.adTimer );
			window.adTimer = null;
		}
	}

	function resetFilelist(){
		var arr = [];
		$.each(_filelist_cache, function(idx, item){
			if (!((item.pidx+'') in finishied))
			{
				arr.push(item);
			}
		});
		filelist = arr;
	}
	function uploadOnePiece(num, idx) {
		trynum++;
		startTimer();
		if (finishied.length==0)
		{
			g_event.onSendProcess(total, 0);
		}
		if (0)//trynum>500)
		{
			g_event.onSendError && g_event.onSendError(2, currentFileKey);
			return false;
		}
		cs.p('goto uploadOnePiece sending='+sending+' num='+num+' idx='+(idx||'none'));
		if (asyncTimer<=0)//sending)
		{
			//uploadOnePiece(2);
			return false;
		}
		try
		{

			var onefile = filelist.shift();
			if (!onefile)
			{
				resetFilelist();
				//g_event.onSendError && g_event.onSendError(3, currentFileKey);
				return false;
			}
			if (onefile.pidx == undefined || onefile.psize == undefined || onefile.pcnt == undefined) {
				uploadOnePiece(21);
				return;
			}
			if (!!((onefile.pidx+'') in finishied))
			{
				uploadOnePiece(22);
				return false;
			}
			if (!!onefile  && !forceStop && !((onefile.pidx+'') in finishied))
			{
				if (onefile.times <= 3)
				{
					var p = {
						'platform' : "web/pc",
						'cid' : "205361769"
					};
					for (var key in onefile)
					{
						if (!!key)
						{
							if (key == 'data')
							{
								p.data = new Blob([onefile.data])
							}else
							if (key == 'times')
							{
							}else p[key] = onefile[key];
						}
					}
					$('.upload_edit').append('<a style="display:none;" class="mod_btn_green" download="'+p.pmd+'.txt" href="'+URL.createObjectURL(p.data)+'"></a>');

					var formData = new FormData(),
						xhr = new XMLHttpRequest();
					xhr.withCredentials = true;

					for (var key in p) {
						if (typeof p[key] != 'undefined') {
							formData.append(key, p[key]);
						}
					}
					formData.append('dest', conf.source);

					try{
						var url = window.location.protocol+'//c.y.qq.com/mv/fcgi-bin/fcg_ugc_mv_uploader.fcg';
						xhr.open('post', url, true);

						var prot = {
							reportRate : 10, // 成功时返回码上报频率
							data : {plateform:'yqq'}
						};
						prot.startTime = 0;
						prot.endTime = 0;
						prot.url = url;
						prot.url = location.host == 'bk.i.y.qq.com' ? prot.url.replace('i.y.qq.com', 'bk.i.y.qq.com') : prot.url;
						prot.url = prot.url+(prot.url.indexOf('?') > -1 ? '&' : '?') + 'g_tk=' + MUSIC.getACSRFToken();
						xhr.addEventListener('load', function(e) {
							asyncTimer++;
							var isSuccess = false;
							var data;
							try {
								data = JSON.parse(this.responseText);
							}
							catch (e) {
								onefile.times++;
								filelist.push(onefile);
								sending = false;
								uploadOnePiece(7);
							}
							prot.resultArgs = [$.extend(data, {code:data["code"]||0, subcode:data["subcode"]||0})];
							if (this.status != 200) {
								onefile.times++;
								filelist.push(onefile);
								sending = false;
								uploadOnePiece(3);
								//return false;
							}else {
								finishied = {};
								$.each(data.data.finish, function(idx, item){
									finishied[item+''] = 1;
								});
								if (data.code == 0&&((onefile.pidx+'') in finishied))
								{
									var total = onefile.pcnt, cur = data.data.finish.length;
									g_event.onSendProcess(total, cur, currentFileKey);
									cs.p('data.data.finish'+data.data.finish);
									if (!!data.data.vid)
									{
										isSuccess = true;

									} else {
										onefile.times++;
										filelist.push(onefile);
										sending = false;
										uploadOnePiece(4);
									}
								}else {

									onefile.times++;
									filelist.push(onefile);
									sending = false;
									uploadOnePiece(5);

								}
							}
							prot.time = e.total;
							prot.statusCode = prot.code = this.status;

							if (prot.statusCode == 200) {
								prot.code =prot.resultArgs && prot.resultArgs[0] && prot.resultArgs[0].code;
							}
							returnCode.report(prot);
							if (isSuccess && !!data.data.vid) {
								g_event.onSendSuccess(data.data.vid, currentFileKey);
							}
						}, false);

						xhr.addEventListener('error', function(e) {
							onefile.times++;
							filelist.push(onefile);
							sending = false;asyncTimer++;
							uploadOnePiece(6);

							var errorCodeMap = {// 自定义error code映射
								'abort' : 601,			//请求中断
								'error' : 602,			//网络链接或服务端错误
								'parsererror' : 603,	//解析错误或4xx 5xx
								'timeout' : 604			//网络连接超时
							};
							prot.statusCode = prot.code = errorCodeMap[e.type] || 200;
							prot.time = e.total;
							returnCode.report(prot);
						}, false);

						sending = true;
						asyncTimer--;
						xhr.send(formData);

					}catch(e){

						onefile.times++;
						filelist.push(onefile);
						sending = false;asyncTimer++;
						g_event.onSendError && g_event.onSendError(4, currentFileKey);
					}
				}else {
					g_event.onSendError && g_event.onSendError(5, currentFileKey);
				}
			}else {
				if (!forceStop)
				{
					uploadOnePiece(8, onefile.pidx);
				}else {
					cs.p('forceStop');
					return false;
				}
			}
		}
		catch (e)
		{
			g_event.onSendError && g_event.onSendError(6, currentFileKey);
			return false;
		}
	}
	function retryUpload(){
		trynum = 0;
		resetFilelist();
		if (filelist.length>0)
		{
			$.each(filelist, function(idx, item){
				filelist[idx]['times'] = 1;
			});
			uploadOnePiece(9);
		}
	}
	function stopUpload(){
		stopTimer();
		forceStop = true;
		finishied = {};
		currentFileKey = '';
	}
	function bingEvents(){
		$(inputObj).on('change', function(e){
			var fileArr = this.files;
			if (fileArr.length == 0) {
				return;
			}
			sending = forceStop = false;asyncTimer = 2;
			onSelect(fileArr);
		})

	}
	function copyEvents(config){
		$.extend(g_event, {
			onSelect : config.onSelect,
			onScanProcess : config.onScanProcess,
			onSendProcess : config.onSendProcess,
			onSendError : function(e, currentFileKey){
				stopTimer();
				config.onSendError(e, currentFileKey);
			},
			onSendSuccess : function(e, currentFileKey){
				stopTimer();
				config.onSendSuccess(e, currentFileKey);
			}
		});
		conf.sizeLimit = config.sizeLimit||conf.sizeLimit;
		conf.acceptAttr = config.acceptAttr||conf.acceptAttr;
		conf.source = config.source || 'mv';
	}
	function dragEvents(config){
		$(document).on('dragenter', config.dropTarget, function(e){
			e.preventDefault();
			e.stopPropagation();
		}).on('dragover', config.dropTarget, function(e){
			e.preventDefault();
			e.stopPropagation();
		}).on('dragleave', config.dropTarget, function(e){
			e.preventDefault();
			e.stopPropagation();
		}).on('drop', config.dropTarget, function(e){
			$(inputObj).val('');filelist = [],trynum = 0;
			e.preventDefault();
			e.stopPropagation();
			var fileArr;

			fileArr = e.originalEvent.dataTransfer.files;

			if (fileArr.length == 0) {
				return;
			}
			sending = forceStop = false;asyncTimer = 2;
			onSelect(fileArr);
		});
	}
	return {
		init : function(opts){
			initObj();
			setUploadBtn(opts.uploadBtn);
			copyEvents(opts);
			dragEvents(opts);
			bingEvents();
		},
		uploadFile: function (file, opts) {
			this.stopUpload();
			copyEvents(opts);
			_filelist_cache = {}, filelist = [], sending = false, forceStop = false, finishied = {}, trynum = 0, asyncTimer = 2;
			onSelect([file]);
		},
		retryUpload : retryUpload,
		stopUpload : stopUpload
	}
})();

return uploader;

});