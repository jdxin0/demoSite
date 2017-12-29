/**
 * @class client
 * 客户端相关接口，在这个模块中不要依赖其他的类库或模块，保持独立。
 *
 * 此模块不是纯粹的客户端调用，对客户端接口有部分封装。
 * @since IOS 5.12 Android 5.13
 */
;(function(root, factory) {
    "use strict";
    // console.log(root);
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.clientInterface = factory();
    }

})(this, function() {

    var ua = navigator.userAgent;
    var UA_IOS_REG = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/;
    var UA_ANDROID_REG = /\bAndroid([^;]+)/;
    var UA_WX_REG = /MicroMessenger/;
    var UA_WEIBO_REG = /\bWeibo/;
    var UA_QZONE_REG = /Qzone\//;

    var isIOS = UA_IOS_REG.test(ua);
    var isAndroid = UA_ANDROID_REG.test(ua);
    var isWx = UA_WX_REG.test(ua);
    var isWeibo = UA_WEIBO_REG.test(ua);
    var isQzone = UA_QZONE_REG.test(ua);

    // 简单的扩展函数
    // @param {Object} target 被扩展的对象
    // @param {Object} source 资源对象
    // @return {Object}
    function extend(target, source){
        for(var i in source) {
            if ( source.hasOwnProperty(i) ) {
                target[i] = source[i];
            }
        }

        return target;
    }

    // Android客户端接口回调，callNative和registerMessageListener中会使用
    var callbacks = window.G_callbacks = {
        _id: 0,
        _getId: function () {
            return this._id++;
        }
    };
    var callbackTimeout = 5000;
    // 调用客户端接口
    var callNative = function (name, params, callback) {
        // 兼容两个参数的 callNative(name, callback)
        if (Object.prototype.toString.call(params) === '[object Function]') {
            callback = params;
            params = null;
        }
        if (!window.XLJSWebViewBridge) {
            console.debug(arguments);
            return;
        }
        if (isIOS) {
            XLJSWebViewBridge.sendMessage(name, params, callback);
        } else {
            var callbackName;
            if (callback) {
                var timeout = (function (name) {
                    return setTimeout(function () {
                        console.warn('call ' + name + ' timeout');
                    }, callbackTimeout);
                })(name);
                var callbackKey = '_callback_' + callbacks._getId() + '_' + name;
                callbacks[callbackKey] = function(resp) {
                    clearTimeout(timeout);
                    var data = resp && JSON.parse(resp);
                    console.debug(name + ' callback data:', data);
                    callback.call(this, data);
                };
                callbackName = 'window.G_callbacks.' + callbackKey;
            }
            XLJSWebViewBridge.sendMessage(name, JSON.stringify(params), callbackName);
        }
    };

    // 旧接口，这里只做记录，不提供使用
    var old = {
        /**
         * 提交嗅探结果给客户端，实际名称是getSniffResultList，v58是为区分5.8和5.9而加的
         * @param {Object} params 参数
         * @param {Number} error_code 状态码，1：正常；0：错误，客户端会立即停止嗅探
         * @param {Number} detail_page_url_num 总页面数（用于反馈进度，每次调用会增加进度，此接口在嗅探过程中只有第一次有效）
         * @param {Number} ui_flag 判断显示文件夹还是文件。0：文件，点击嗅探结果播放或者下载；1：文件夹，点击嗅探结果会进入详情页
         * @param {Array} result_list 结果列表
         * @param {Object} result_list.item
         * @param {Object} result_list.item
         */
        getSniffResultList_v58: function(params) {},
        /**
         * 提交嗅探结果给客户端，实际名称是getSniffResultList，v59是为区分5.8和5.9而加的
         * @param {Object} params 参数
         * @param
         */
        getSniffResultList_v59: function(params) {}
    };

    // 记录事件
    /**
     * @event xlNetworkChangeEvent 网络发生变化
     * @param {Object} params 参数，同 client.data.getNetworkInfo
     */

    var clientInterface = {
        /**
         * @property {Boolean}
         * 当前系统是否是IOS（通过UA判断）
         */
        isIOS: isIOS,
        /**
         * @property {Boolean}
         * 当前系统是否是Android（通过UA判断）
         */
        isAndroid: isAndroid,
        /**
         * @property {Boolean}
         * 当前系统是否是微信（通过UA判断）
         */
        isWx: isWx,
        /**
         * @property {Boolean}
         * 当前系统是否是微博（通过UA判断）
         */
        isWeibo: isWeibo,
        /**
         * @property {Boolean}
         * 当前系统是否是QQ空间（通过UA判断）
         */
        isQzone: isQzone,
        /**
         * 监听客户端事件
         * @param {String} eventName 事件名称
         * @param {Function} callback 回调函数
         * @param {Object} callback.data 事件数据
         */
        addEventListener: function(eventName, callback) {
            if (isIOS) {
                XLJSWebViewBridge.registerMessageListener(eventName, callback);
            } else {
                return;
                var callbackKey = '_callback_' + callbacks._getId() + '_event_' + name;
                callbacks[callbackKey] = function(resp) {
                    var data = resp && JSON.parse(resp);
                    console.debug('event "' + eventName + '" callback data:', data);
                    callback.call(this, data);
                };
                var callbackName = 'window.G_callbacks.' + callbackKey;
                XLJSWebViewBridge.registerMessageListener(eventName, callbackName);
            }
        },
        /**
         * 触发事件（客户端监听，暂未实现）
         * @param {String} eventName 事件名称
         * @param {Object} [data] 事件数据
         */
        dispatchEvent: function(eventName, data) {

        },
        /**
         * @class client.data
         * 数据相关接口
         */
        data: {
            /**
             * 请求数据
             * @param {Object} params 参数
             * @param {String} params.url URL
             * @param {String} [params.method] GET或POST，未指定此参数时，若没有指定params参数使用GET，否则使用POST
             * @param {Boolean} [params.cache] 是否缓存（加时间戳）
             * @param {Number} [params.timeout] 超时，单位毫秒，默认30秒
             * @param {Object} [params.data] 请求参数
             * @param {Function} [params.success] 请求成功的回调函数
             * @param {String} params.success.responseText 响应数据
             * @param {Function} [params.error] 请求失败的回调函数
             * @param {Object} params.error.response 请求失败回调函数的参数
             * @param {Boolean} params.error.response.isSuccess 请求是否成功
             * @param {String} params.error.response.responseText 响应数据
             * @param {Number} params.error.response.status HTTP状态码
             * @param {Function} [params.complete] 请求完成的回调函数
             * @param {Object} params.complete.response 请求完成回调函数的参数
             * @param {Boolean} params.complete.response.isSuccess 请求是否成功
             * @param {String} params.complete.response.responseText 响应数据
             * @param {Number} params.complete.response.status HTTP状态码
             */
            httpRequest: function (params) {
                // 本地接口参数
                // {String} url
                // {String} method
                // {Number} timeout
                // {String} postContent post内容
                // {Number} contentEncoding post内容的编码，默认utf-8，可选：1 utf-8, 2 gb2312, 3 gbk
                var nativeParams = {};

                var url = params.url;
                var method = params.method;
                var timeout = parseInt(params.timeout);
                var requestParams = params.data;

                // method未指定，requestParams不为空时使用POST
                if (method !== 'GET' && method !== 'POST') {
                    method = requestParams === undefined ? 'GET' : 'POST';
                }

                var postContent;
                if (method === 'GET' && Object.prototype.toString.call(requestParams) === '[object Object]') {
                    var tempParams = [];
                    for (var key in requestParams) {
                        tempParams.push(key + '=' + requestParams[key]);
                    }
                    if (tempParams.length > 0) {
                        url += (url.indexOf('?') === -1 ? '?' : '&') + tempParams.join('&');
                    }
                    if (!params.cache) {
                        url += (url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
                    }
                } else if (method === 'POST') {
                    if (typeof requestParams === 'string') {
                        postContent = requestParams;
                    } else if (Object.prototype.toString.call(requestParams) === '[object Object]') {
                        var tempParams = [];
                        for (var key in requestParams) {
                            tempParams.push(key + '=' + requestParams[key]);
                        }
                        postContent = tempParams.join('&');
                    }
                }

                nativeParams.url = url;
                nativeParams.method = method;
                nativeParams.timeout = timeout || 30000;
                if (postContent !== undefined) {
                    nativeParams.postContent = postContent;
                }
                callNative('xlHttpRequestForward', nativeParams, function(resp) {
                    if (resp.isSuccess && params.success) {
                        params.success(resp.responseText);
                    } else if (!resp.isSuccess && params.error) {
                        params.error(resp);
                    }
                    if (params.complete) {
                        params.complete(resp);
                    }
                });
            },
            /**
             * 上报统计数据
             *
             *     client.data.reportStatistics({
             *         reportPlat: 0,
             *         hubbleEventId: 'ios_H5_client',
             *         hubbleAttribute1: 'discuss_submit',
             *         hubbleExData: {
             *             url: 'http://.m.sjzhushou.com:8080/video_detail/index.html?id=6647',
             *             is_login: 0
             *         },
             *         umengEventId: 'discuss_submit',
             *         umengExData: {
             *             url: 'http://m.sjzhushou.com:8080/video_detail/index.html?id=6647',
             *             is_login: 0
             *         }
             *     });
             *
             * @param {Object} params 上报参数
             * @param {Number} params.reportPlat 上报平台。 0: 所有平台、 1: Hubble、 2: 友盟
             * @param {String} [params.hubbleEventId] Hubble平台的事件ID，reportPlat为0或1时必需
             * @param {String} [params.hubbleAttribute1] Hubble平台的attribute1
             * @param {Object} [params.hubbleExData] 数据用key-value的形式传递
             * @param {String} [params.umengEventId] 友盟平台的事件ID，reportPlat为0或2时必需
             * @param {Object} [params.umengExData] 数据用key-value的形式传递
             */
            reportStatistics: function (params) {
                var defaultParams = {
                    reportPlat : 0,
                    hubbleEventId : isIOS ? 'ios_H5_client' : 'android_H5_client',
                    hubbleAttribute1 : params.hubbleAttribute1 ? params.hubbleAttribute1 : params.attribute,
                    umengEventId : params.umengEventId ? params.umengEventId : params.attribute
                };

                params = extend(defaultParams, params);

                callNative('xlReportStatistics', params);
            },
            /**
             * 获取用户信息
             * @param params 参数
             * @param {Number} params.forceLogin 0: 未登陆时不登陆, 1: 未登陆时进入登陆界面
             * @param {Object} params.source 登陆来源, params.forceLogin为0时不需要, integralMall: 去积分商城, signIn; 签到, assignment: 去做任务
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {Number} callback.response.isLogin 0: 未登陆, 1: 已登陆
             * @param {Object} callback.response.userInfo 用户信息
             * @param {Number} callback.response.userInfo.avatarURL 头像地址
             * @param {Number} callback.response.userInfo.nickName 昵称
             * @param {Number} callback.response.userInfo.userID 用户ID
             * @param {Number} callback.response.userInfo.vipType VIP类型
             * @param {Number} callback.response.userInfo.vipLevel VIP级别
             * @param {Number} callback.response.userInfo.vipExpirationDate VIP过期时间
             */
            getUserInfo: function (params, callback) {
                callNative('xlGetUserInfo', params, callback);
            },
            /**
             * 分享指定内容到指定的平台
             * @param {Object} params 参数
             * @param {Number} params.sharePlatform 平台, 1: 微信好友, 2: 微信朋友圈, 3: QQ空间, 4: 新浪微博
             * @param {String} params.shareHeadline 标题
             * @param {String} params.shareText 内容
             * @param {String} params.shareImageUrl 图片地址
             * @param {String} params.shareUrl 分享的URL
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {Number} callback.response.result 分享结果，0：成功，1：失败，2：用户取消
             */
            shareTo: function (params, callback) {
                callNative('xlSocialShare', params, callback);
            },
            /**
             * 添加一个下载任务
             * @param {Object} params 参数
             * @param {String} params.name 文件名
             * @param {String} params.url 下载地址
             * @param {String} params.refurl 这个资源来源哪个网站，通常是 window.location.href
             * @param {String} params.from 来源类型
             * public static final int FROM_NONE = 0; // none
                public static final int FROM_TWO_DIMENSIONAL_CODE = 1; // 二维码
                public static final int FROM_WEB_BROSWER = 2; // 浏览器
                public static final int FROM_NORMAL_MANUAL = 3; // 普通手动
                public static final int FROM_NORMAL_HOLD_UP = 4; // 拦截
                public static final int FROM_SNIFFER = 5; // 嗅探
                public static final int FROM_FASTCAMERA = 6;
                public static final int FROM_USER_COUNTS = 7;//商城积分

                public static final int FROM_BT_NORMAL = 9; // BT手动
                public static final int FROM_BT_AUTO = 10; // BT自动
                public static final int FROM_BT_HOLD_UP = 11; // BT拦截
                public static final int FROM_XUNLEI_SCANCODE_NORMAL = 12; // 资源推广二维码迅雷二维码扫描
                public static final int FROM_XUNLEI_SCANCODE_LAUNCH = 13; // 资源推广二维码迅雷启动自动创建任务
                public static final int FROM_XUNLEI_SCANCODE_HOLD_UP = 14; // 资源推广二维码迅雷拦截
                public static final int FROM_XUNLEI_SNCANCODE_ASSIST = 15; // 协同下载
                public static final int FROM_XUNLEI_HUB = 16; // 通过HUB页面下载
                public static final int FROM_CAROUSEL = 17; // 热门资源
                public static final int FROM_WEIBO = 18; // 资源微博
                public static final int FROM_SHAKE = 19; // 摇一摇
                public static final int FROM_PUSH_MSG = 21; // 消息推送
                public static final int FROM_SEARCH = 22; // 搜索
                public static final int FROM_APK_RECOMMEND = 23; // APK联盟
                public static final int FROM_CHANNEL_GAME = 24;//频道-游戏
                public static final int FROM_HOMEPAGE = 25;//homepage
                public static final int FROM_THUNDER7   = 26;   //云列表，2.9版本添加
                public static final int FROM_COPYRIGHT_PAGE = 27;//版权页面，2.10版本添加
                public static final int FROM_LIXIAN = 28;//离线空间
                public static final int FROM_VOD_HISTORY = 29;//云播记录
                public static final int FROM_GROUP = 30;//资源组
                public static final int FROM_THEATER = 31;//院线
                public static final int FROM_BTDIGG = 32;//btdigg
                public static final int FROM_GROUP_DYN_MOVIE = 33;//资源列表——院线预约
                public static final int FROM_GROUP_DYN_TV = 34;//资源组——追剧
                public static final int FROM_GROUP_DYN_RELCOMM = 35;//资源组——相关推荐
                public static final int FROM_FRIEND_GROUP_LIST = 36;//朋友圈
                public static final int FROM_PROMOTION_LIST = 37;
                public static final int FROM_THIRDPART = 38; //第三方调起下载
                public static final int FROM_FLOATWINDOW = 39; //悬浮窗
                public static final int FROM_USERCENTER = 40; //个人中心
                public static final int FROM_NEARBY = 41; //迅雷邻居 5.2版本添加
                public static final int FROM_GUIDE = 43; // 引导图
                public static final int FROM_SPLASH = 42; // 闪屏页

                public static final int FROM_CHANNEL_MASK = 0x800;//频道0xcx
                public static final int FROM_CHANNEL_SUBJECT = 0x801;//专题
                public static final int FROM_CHANNEL_MOVIE = 0x802;//电影
                public static final int FROM_CHANNEL_BOOK = 0x803;//电子书
                public static final int FROM_CHANNEL_TELEPLAY = 0x804;//剧场
                public static final int FROM_CHANNEL_SHORT_VIDEO = 0x805;//短视频
                public static final int FROM_CHANNEL_MV = 0x806;//mv
                public static final int FROM_CHANNEL_CARTOON = 0x807;//动漫
                public static final int FROM_CHANNEL_VARIETY = 0x808;//综艺

                public static final int FROM_UC_ADDON = 0x809;//uc插件
                public static final int FROM_HOMEPAGE_RECOMMAND = 0x810;//首页热门推荐
                public static final int FROM_GAME_CENTER = 0x811;//趣玩游戏中心
                public static final int FROM_HOMEPAGE_ADBANNER = 0x812;//5.0后首页广告栏
                public static final int FROM_HOMEPAGE_HOTWORDAD = 0x813;//5.9后热词广告栏
                public static final int FROM_MOBILE_SETUP = 0x814;
                public static final int FROM_MOBILE_SETPASSWORD = 0x815;
                public static final int FROM_HOME_MEMBER_FREE = 0x816;    //主页 新用户 注册引导 （引导到抽奖页）
                public static final int FROM_HOME_HOT_SPECAIL = 0X817;    //主页 热门专题
                public static final int FROM_USER_CENTER_FEEDBACK = 0x818;         //个人 帮助反馈
                public static final int FROM_FUN_PLAY = 0x819;//趣玩tab
             */
            addDownloadTask: function (params) {
                callNative('xlAddTask', params);
            },
            /**
             * 添加播放记录
             * @param {Object} params 参数
             * @param {String} params.pageUrl 页面URL
             * @param {String} params.title 任务标题
             * @param {String} params.coverImageUrl 图标
             * @param {String} params.createTime 添加时间
             * @param {Number} params.totalVideoLength 视频时长，单位秒
             */
            addPlayRecord: function (params) {
                callNative('xlAddPlayRecord', params);
            },
            /**
             * 获取页面来源
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {String} callback.response.from 页面来源
             */
            getPageFrom: function (callback) {
                callNative('xlGetPageFrom', callback);
            },
            /**
             * 获取页面来源
             * @param {Function} callback 回调函数
             * @param {Object} callback.response 回调函数参数
             * @param {String} callback.response.from 页面来源
             */
            xlLogout: function (callback) {
                callNative('xlLogout', callback);
            },
            /**
             * ios手雷购买
             * @param {String} params.selectedTabIndex 0代表白金 1代表超级
             * @param {String} params.purchaseType 0 代表开通 1代表升级
             * @param {String} params.refer 页面统计码
             */
            xlGoToMemberPurchasePage: function (params){
                callNative('xlGoToMemberPurchasePage', params);
            }
        },
        /**
         * @class client.ui
         * 界面相关接口
         */
        ui: {
            /**
             * 打开一个URL
             * @param {Object} params 参数
             * @param {String} params.title 页面标题
             * @param {String} params.url 要打开的URL
             * @param {Number} params.openType=1 1: 在手雷中按当前方式打开新页面, 2: 在Safari中打开, 3: 在手雷中全屏打开新页面（如嗅探页面）
             * @param {Boolean} params.autoSniffer 是否自动嗅探，openType为3时需要指定
             */
            openUrl: function (params) {
                callNative('xlOpenUrl', params);
            },
            /**
             * 显示加载状态（IOS有回调函数，Android没有，没有实际作用，这里没加上）
             */
            showLoadingView: function () {
                callNative('xlShowLoading');
            },
            /**
             * 显示加载状态（IOS有回调函数，Android没有，没有实际作用，这里没加上）
             */
            hideLoadingView: function () {
                callNative('xlHideLoading');
            },
            /**
             * 显示提示信息（IOS有回调函数，Android没有，没有实际作用，这里没加上）
             * @param msg 提示信息
             */
            showToast: function (msg) {
                callNative('xlShowToast', {
                    message: msg
                });
            },
            /**
             * @params {Object} params 播放参数
             * @params {String} params.url 视频URL
             * @params {String} params.title 标题
             * @params {Number} params.fileSize 视频大小（单位：kb）
             */
            videoPlay: function (params) {
                callNative('xlVideoPlay', params);
            }
        },
        /**
         * @class client.app
         * 应用相关接口
         */
        app: {
            /**
             * 检查App是否安装
             * @param {Object} params 参数
             * @param {Array} params.appSchemas 参数 mqq: QQ, weixin: 微信, weibo: 微博
             * @param {Function} callback 回调函数
             * @param {Object} callback.data 回调函数参数，key为参数appSchemas中的项，value为是否已经安装，Boolean类型
             */
            checkAppInstalled: function (params, callback) {
                callNative('xlCheckAppInstalled', params, callback);
            }
        },
        /**
         * @class client.device
         * 设备相关接口
         */
        device: {
            /**
             * 获取设备信息
             * @param {Function} callback 回调函数
             * @param {Object} callback.data 回调函数参数
             * @param {Number} callback.data.versionCode 版本号，主要用来判断版本，IOS中5.8.1即50801，5.12.1即51201，Android需要客户端给
             * @param {String} callback.data.appVersion APP版本号
             * @param {String} callback.data.systemVersion 系统版本号
             * @param {String} callback.data.productID 产品ID，31: iPhone未越狱, 32: iPhone越狱, 46: iPad未越狱, 47: iPad越狱
             * @param {String} callback.data.peerID 设备唯一ID（IOS中，APP重新安装后会变化）
             * @param {String} callback.data.partnerID 渠道ID
             * @param {String} callback.data.device 设备编码，如iphone 2G, iphone 3G等（仅IOS）
             * @param {Boolean} callback.data.isReview 应用当前是否正在审核（仅IOS）
             */
            getAppMetaData: function(callback) {
                callNative('xlGetAppMetaData', callback);
            },
            /**
             * 获取网络信息
             * @param {Function} callback 回调函数
             * @param {Object} callback.data 回调函数参数
             * @param {Number} callback.data.status 网络状态。0：无网络，1：wifi，2：wwan
             */
            getNetworkInfo: function (callback) {
                callNative('xlGetNetworkInfo', callback);
            }
        },
        /**
         * @class client.event
         * 页面事件（触发客户端操作）
         */
        event: {
            /**
             * 视频播放结束
             */
            videoPlayOver: function () {
                callNative('xlVideoPlayOver');
            },
            /**
             * @params {Object} params 播放参数
             * @params {String} params.url 视频URL
             * @params {String} params.title 标题
             */
            videoPlayReady : function(params) {
                callNative('xlVideoPlayReady', params);
            }
        }
    };
    return clientInterface;

});
