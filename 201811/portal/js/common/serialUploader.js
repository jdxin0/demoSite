define('js/common/serialUploader.js', function(require, exports, module){

var music = require('js/common/music.js'),
    MUSIC = music,
    $ = music.$,
    sha1 = require('js/common/music/sha1.js'),
    $ = music.$;

var uploader = (function () {
    var file;// 要上传的文件
    var filetype;
    var g_event = {};
    var pieceSize = 1024 * 1024 * 3;
    var conf = {
		businessid : 4,
        sizeLimit: 209715200 / 2 * 5,
        acceptAttr: 'mp4|flv|f4v|webm|m4v|mov|3gp|3g2|rm|rmvb|wmv|avi|asf|mpg|mpeg|mpe|ts|div|dv|divx|vob|dat|mkv|swf|lavf|cpk|dirac|ram|qt|fli|flc|mod'//|mp3|aac|ac3|wav|m4a|ogg'//'accept="video/*"'
    };
    var currentFileKey = '';
    var gsha1 = '';

    /**
     * 计算整个文件的MD5值
     */
    function calculateFileMd5(cb) {
        if (!file) {
            return false;
        }
        var blobSlice = null,
            chunkSize = 1024 * 1024 * 10,                           // read in chunks of 2MB
            chunks = Math.ceil(file.size / chunkSize),
            currentChunk = 0;

        var reader = new FileReader(); //define a Reader
        var hash = sha1.create();

        reader.onload = function (f) {
            try {
                var file_result = reader.result;
                hash.update(file_result);
                currentChunk += 1;
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    gsha1 = hash.hex();
                    hash.finalize();
                    cb && cb();
                }
            }
            catch(e) {
                g_event.onSendError('计算文件SHA1值错误', currentFileKey);
            }
        };
        reader.onerror = function (f) {
            g_event.onSendError('读取文件错误', currentFileKey);
        };


        function loadNext() {
            var start = currentChunk * chunkSize,
                end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            reader.readAsArrayBuffer(file.slice(start, end));
        }
        loadNext();
    }

    /**
     * 获取分片及其SHA1值
     * @param start
     * @param size
     * @param cb
     */
    function getPiece(start, size, cb) {
        var end = start + size >= file.size ? file.size : start + size;
        var reader = new FileReader(); //define a Reader
        var hash = sha1.create();
        reader.onload = function (f) {
            try {
                var file_result = reader.result;
                hash.update(file_result);
                var sha1_hash = hash.hex(file_result);
                hash.finalize();
                cb && cb({
                    data: file_result,
                    psha: sha1_hash,
                    size: end - start,
                    retryNum: 0
                });
            }
            catch(e) {
                g_event.onSendError('计算文件分片SHA1值错误', currentFileKey);
            }
        };
        reader.onerror = function (f) {
            g_event.onSendError('读取文件分片错误', currentFileKey);
        };

        reader.readAsArrayBuffer(file.slice(start, end)); //read file as ArrayBuffer
    }

    function onSelect() {
        currentFileKey = file.key || '';
        if (file.size == 0) {
            MUSIC.popup.show('请勿上传空文件！', 3000, 1);
            return false;
        }
        if (conf.sizeLimit >= file.size) {
            filetype = (/\.[^\.]+$/.exec(file.name))[0].replace('.', '').toLowerCase(), typeArr = conf.acceptAttr.split('|'), _map = {};
            $.each(typeArr, function (idx, item) {
                _map[item] = 1;
            });
            if (filetype in _map) {
                calculateFileMd5(function () {
                    g_event.onSendProcess(file.size, file.size / 10, '扫描文件完成', currentFileKey);
                    queryStartOffset({
                        size: file.size,
                        filetype: filetype
                    }, function (data) {
                        g_event.onSendProcess(file.size, file.size / 5, '准备上传...', currentFileKey);
                        uploadPiece(data.finish, (pieceSize <= data.next_shard_size) ? pieceSize : data.next_shard_size);
                    });
                });

                g_event.onSelect(file, currentFileKey);
            } else {
                MUSIC.popup.show('暂不支持该格式！', 3000, 1);
            }
        } else {
            MUSIC.popup.show('上传文件大小超过限制！', 3000, 1);
        }
    }

    function queryStartOffset(fileInfo, cb) {
        var params = {
            cmd: 0,
            rsha: gsha1,
            gsha: gsha1,
            gsize: fileInfo.size,
            filetype: filetype,
            businessid: conf.businessid || 4
        };

        var formData = new FormData();
        for (var key in params) {
            if (typeof params[key] != 'undefined') {
                formData.append(key, params[key]);
            }
        }

        $.ajax({
            url: location.protocol + '//ugcup.music.qq.com/fcgi-bin/fcg_uploader.fcg',
            type: 'POST',
            cache: false,
            data: formData,
            xhrFields: {
                withCredentials: true
            },
            processData: false,
            contentType: false
        }).done(function(res) {
            if (res && res.code == 0 && res.data) {
                var data = res.data;
                if (data.status == 1) {
                    // 完成了所有分片上传
                    if (data.got) {
                        g_event.onSendSuccess(data.got, currentFileKey);
                    }
                    else {
                        g_event.onSendError && g_event.onSendError('分片上传完成文件vid为空' + res && res.code, currentFileKey);
                    }
                }
                else {
                    cb && cb(res.data);
                }
            }
            else if (res && res.code == 1000) {
                // 登录态失效
                g_user.openLogin();
            }
            else {
                g_event.onSendError && g_event.onSendError('查询文件起始信息失败' + res && res.code, currentFileKey);
            }
        }).fail(function(res) {
            g_event.onSendError && g_event.onSendError('查询文件起始信息失败', currentFileKey);
        });

    }


    function uploadPiece(lastByte, size) {
        function doUpload(piece) {
            if (piece.retryNum < 3) {
                piece.retryNum++;
                var params = {
                    cmd: 1,
                    gsha: gsha1,
                    psha: piece.psha,
                    psin: lastByte,
                    psize: piece.size,
                    gsize: file.size,
                    filetype: filetype,
                    data: new Blob([piece.data]),
                    businessid: conf.businessid || 4
                };

                var formData = new FormData();
                for (var key in params) {
                    if (typeof params[key] != 'undefined') {
                        formData.append(key, params[key]);
                    }
                }

                $.ajax({
                    url: location.protocol + '//ugcup.music.qq.com/fcgi-bin/fcg_uploader.fcg',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    xhrFields: {
                        withCredentials: true
                    },
                    processData: false,
                    contentType: false
                }).done(function(res) {
                    if (res && res.code == 0 && res.data) {
                        var data = res.data;
                        if (data.status == 1) {
                            // 完成了所有分片上传
                            if (data.got) {
                                g_event.onSendSuccess(data.got, currentFileKey);
                            }
                            else {
                                g_event.onSendError && g_event.onSendError('分片上传完成文件vid为空' + res && res.code, currentFileKey);
                            }
                        }
                        else {
                            if (data.finish >= 0 && data.next_shard_size > 0) {
                                g_event.onSendProcess(file.size, data.finish, '正在上传......', currentFileKey);
                                uploadPiece(data.finish, (pieceSize <= data.next_shard_size) ? pieceSize : data.next_shard_size);
                            }
                            else {
                                g_event.onSendError && g_event.onSendError('分片上传下片信息为空' + params.psin + ' ' + res && res.code, currentFileKey);
                            }
                        }
                    }
                    else if (res && res.code == 1000) {
                        // 登录态失效
                        g_user.openLogin();
                    }
                    else {
                        if (piece.retryNum < 3) {
                            doUpload(piece);
                        }
                        else {
                            g_event.onSendError && g_event.onSendError('上传分片文件失败' + params.psin + ' ' + res && res.code, currentFileKey);
                        }
                    }
                }).fail(function(res) {
                    if (piece.retryNum < 3) {
                        doUpload(piece);
                    }
                    else {
                        g_event.onSendError && g_event.onSendError('上传分片文件失败' + params.psin + ' ' + res && res.code, currentFileKey);
                    }
                });
            }
            else {
                g_event.onSendError && g_event.onSendError('上传分片文件失败', currentFileKey);
            }
        }

        getPiece(lastByte, size, doUpload);
    }

    function stopUpload() {
        currentFileKey = '';
    }

    function copyEvents(config) {
        $.extend(g_event, {
            onSelect: config.onSelect,
            onSendProcess: config.onSendProcess,
            onSendError: function (e, currentFileKey) {
                stopUpload();
                config.onSendError && config.onSendError(e, currentFileKey);
            },
            onSendSuccess: function (e, currentFileKey) {
                config.onSendSuccess(e, currentFileKey);
            }
        });
        conf.businessid = config.businessid || conf.businessid;
        conf.sizeLimit = config.sizeLimit || conf.sizeLimit;
        conf.acceptAttr = config.acceptAttr || conf.acceptAttr;
    }

    return {
        uploadFile: function (fileToUpload, options) {
            file = fileToUpload;
            copyEvents(options);
            onSelect();
        },
        stopUpload: stopUpload
    }
})();

return uploader;

});