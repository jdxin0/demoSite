define('js/common/music/lib/template.js', function(require, exports, module){

/**
 * @fileOverview  Template Engine
 * @author MUSICWebGroup
 * @version 1.0
 */

var $ = require('js/common/music/jquery.js'),
	trim = $.trim,
	w = window,
	/**
	 * 控制台，用于显示调试信息以及进行一些简单的脚本调试等操作
	 * 
	 * @ignore
	 * @type MUSIC.console
	 */
	cs = {
		/**
		 * 给浏览器输出控制台信息
		 */
		p : function() {
			try{
				w.console && console.log(([].slice.call(arguments)).join('\t'));
			}catch(e){
			}
		}
	},
	EMPTY = '',
	// IE doesn't include non-breaking-space (0xa0) in their \s character
	// class (as required by section 7.2 of the ECMAScript spec), we explicitly
	// include it in the regexp to enforce consistent cross-browser behavior.
	guid = 0,
	TRUE = true,
	FALSE = false,
	MIX_CIRCULAR_DETECTION = "__MIX_CIRCULAR",
	hasEnumBug = !({toString:1}.propertyIsEnumerable('toString')),
	enumProperties = [
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'toString',
		'toLocaleString',
		'valueOf'
	],
	OP = Object.prototype,
	hasOwnProperty = function(o, p) {
		return OP.hasOwnProperty.call(o, p);
	},
	meta = {
		/**
		 * Copies all the properties of s to r.
		 * @name meta.mix
		 * @function
		 * @param {Object} r the augmented object
		 * @param {Object} s the object need to augment
		 * @param {Boolean|Object} [ov=true] whether overwrite existing property or config.
		 * @param {Boolean} [ov.overwrite=true] whether overwrite existing property.
		 * @param {String[]} [ov.whitelist] array of white-list properties
		 * @param {Boolean}[ov.deep=false] whether recursive mix if encounter object.
		 * @param {String[]} [wl] array of white-list properties
		 * @param [deep=false] {Boolean} whether recursive mix if encounter object.
		 * @return {Object} the augmented object
		 * @example
		 * <code>
		 * var t={};
		 * meta.mix({x:{y:2,z:4}},{x:{y:3,a:t}},{deep:true}) => {x:{y:3,z:4,a:{}}} , a!==t
		 * meta.mix({x:{y:2,z:4}},{x:{y:3,a:t}},{deep:true,overwrite:false}) => {x:{y:2,z:4,a:{}}} , a!==t
		 * meta.mix({x:{y:2,z:4}},{x:{y:3,a:t}},1) => {x:{y:3,a:t}}
		 * </code>
		 */
		mix:function (r, s, ov, wl, deep) {
			var cache = [], 
				c,
				i = 0;

			if (typeof ov === 'object') {
				wl = ov['whitelist'];
				deep = ov['deep'];
				ov = ov['overwrite'];
			}
			
			mixInternal(r, s, ov, wl, deep, cache);
			while (c = cache[i++]) {
				delete c[MIX_CIRCULAR_DETECTION];
			}

			return r;
		},
		 /**
		 * Executes the supplied function on each item in the array.
		 * @param object {Object} the object to iterate
		 * @param fn {Function} the function to execute on each item. The function
		 *        receives three arguments: the value, the index, the full array.
		 * @param {Object} [context]
		 */
		each:function (object, fn, context) {
			if (object) {
				var key,
					val,
					i = 0,
					length = object && object.length,
					isObj = length === undefined || $.type(object) === 'function';

				context = context || null;

				if (isObj) {
					for (key in object) {
						// can not use hasOwnProperty
						if (fn.call(context, object[key], key, object) === FALSE) {
							break;
						}
					}
				} else {
					for (val = object[0];
						 i < length && fn.call(context, val, i, object) !== FALSE; val = object[++i]) {
					}
				}
			}

			return object;
		},
		 /*
		 * Generate a global unique id.
		 * @param {String} [pre] guid prefix
		 * @return {String} the guid
		 */
		guid : function(pre) {
			return (pre || EMPTY) + guid++;
		}
	},
	mixInternal = function (r, s, ov, wl, deep, cache) {
		var i = 0, 
			p,
			len;

		if (!s || !r) {
			return r;
		}

		ov === undefined && (ov = true);
		if (wl && (len = wl.length)) {
			for (; i < len; i++) {
				p = wl[i];
				if (p in s) {
					_mix(p, r, s, ov, deep, cache);
				}
			}
		} else {
			s[MIX_CIRCULAR_DETECTION] = r;
			cache.push(s);
			for (p in s) {
				if (p != MIX_CIRCULAR_DETECTION) {
					// no hasOwnProperty judge !
					_mix(p, r, s, ov, deep, cache);
				}
			}

			// fix #101
			if (hasEnumBug) {
				for (; p = enumProperties[i++];) {
					if (hasOwnProperty(s, p)) {
						_mix(p, r, s, ov, deep, cache);
					}
				}
			}
		}
		return r;
	},

	_mix = function (p, r, s, ov, deep, cache) {
		// 要求覆盖
		// 或者目的不存在
		// 或者深度mix
		if (ov || !(p in r) || deep) {
			var target = r[p],
				src = s[p];
			// prevent never-end loop
			if (target === src) {
				return;
			}
			// 来源是数组和对象，并且要求深度 mix
			if (deep && src && ($.isArray(src) || $.isPlainObject(src))) {
				if (src[MIX_CIRCULAR_DETECTION]) {
					r[p] = src[MIX_CIRCULAR_DETECTION];
				} else {
					// 目标值为对象或数组，直接 mix
					// 否则 新建一个和源值类型一样的空数组/对象，递归 mix
					var clone = target && ($.isArray(target) || $.isPlainObject(target)) ?
						target :
						($.isArray(src) ? [] : {});
					// 记录循环标志
					src[MIX_CIRCULAR_DETECTION] = r[p] = clone;
					// 记录被记录了循环标志的对像
					cache.push(src);
					mixInternal(clone, src, ov, undefined, true, cache);
				}
			} else if (src !== undefined && (ov || !(p in r))) {
				r[p] = src;
			}
		}
	},
	templateCache = {},
	// start/end tag mark
	tagStartEnd = {
		'#':'start',
		'@':'start',
		'/':'end'
	},
	
	// static string
	KS_TEMPL_STAT_PARAM = 'KS_TEMPL_STAT_PARAM',
	KS_TEMPL_STAT_PARAM_REG = new RegExp(KS_TEMPL_STAT_PARAM, "g"),
	KS_TEMPL = 'KS_TEMPL',
	KS_DATA = 'KS_DATA_',
	KS_AS = 'as',

	// note : double quote for generated code
	PREFIX = '");',
	SUFFIX = KS_TEMPL + '.push("',

	PARSER_SYNTAX_ERROR = 'Template: Syntax Error. ',
	PARSER_RENDER_ERROR = 'Template: Render Error. ',

	PARSER_PREFIX = 'var ' + KS_TEMPL + '=[],' +
		KS_TEMPL_STAT_PARAM + '=false;with(',

	PARSER_MIDDLE = '||{}){try{' + KS_TEMPL + '.push("',

	PARSER_SUFFIX = '");}catch(e){' + KS_TEMPL + '=["' +
		PARSER_RENDER_ERROR + '" + e.message]}};return ' +
		KS_TEMPL + '.join("");',

	// restore double quote in logic template variable
	restoreQuote = function (str) {
		return str.replace(/\\"/g, '"');
	},

	// escape double quote in template
	escapeQuote = function (str) {
		return str.replace(/"/g, '\\"');
	},

	// build a static parser
	buildParser = function (tpl) {
		var _parser,
			_empty_index;
		return escapeQuote(trim(tpl)
			.replace(/[\r\t\n]/g, ' ')
			// escape escape ... . in case \ is consumed when run tpl parser function
			// '{{y}}\\x{{/y}}' =>tmpl.push('\x'); => tmpl.push('\\x');
			.replace(/\\/g, '\\\\'))
			.replace(/\{\{([#/@]?)(?!\}\})([^}]*)\}\}/g,
			function (all, expr, body) {
				_parser = "";
				// must restore quote , if str is used as code directly
				body = restoreQuote(trim(body));
				// is an expression
				if (expr) {
					_empty_index = body.indexOf(' ');
					body = _empty_index === -1 ?
						[ body, '' ] :
						[
							body.substring(0, _empty_index),
							body.substring(_empty_index)
						];

					var operator = body[0],
						fn,
						args = trim(body[1]),
						opStatement = Statements[operator];

					if (opStatement && tagStartEnd[expr]) {
						// get expression definition function/string
						fn = opStatement[tagStartEnd[expr]];
						_parser = String($.isFunction(fn) ?
							fn.apply(this, args.split(/\s+/)) :
							fn.replace(KS_TEMPL_STAT_PARAM_REG, args));
					}
				}
				// return array directly
				else {
					_parser = KS_TEMPL +
						'.push(' +
						// prevent variable undefined error when look up in with, simple variable substitution
						// with({}){alert(x);} => ReferenceError: x is not defined
						'typeof (' + body + ') ==="undefined"?"":' + body +
						');';
				}
				return PREFIX + _parser + SUFFIX;

			});
	},

	// expression
	Statements = {
		'if':{
			start:'if(typeof (' + KS_TEMPL_STAT_PARAM + ') !=="undefined" && ' + KS_TEMPL_STAT_PARAM + '){',
			end:'}'
		},

		'else':{
			start:'}else{'
		},

		'elseif':{
			start:'}else if(' + KS_TEMPL_STAT_PARAM + '){'
		},

		// meta.each function wrap
		'each':{
			start:function (obj, as, v, k) {
				var _ks_value = '_ks_value',
					_ks_index = '_ks_index';
				if (as === KS_AS && v) {
					_ks_value = v || _ks_value;
					_ks_index = k || _ks_index;
				}
				return 'meta.each(' + obj +
					', function(' + _ks_value +
					', ' + _ks_index + '){';
			},
			end:'});'
		},

		// comments
		'!':{
			start:'/*' + KS_TEMPL_STAT_PARAM + '*/'
		}
	};

	/**
	 * Template
	 * @param {String} tpl template to be rendered.
	 * @return {Object} return this for chain.
	 */
	function Template(tpl) {
		if (!(templateCache[tpl])) {
			var _ks_data = meta.guid(KS_DATA),
				func,
				o,
				_parser = [
					PARSER_PREFIX,
					_ks_data,
					PARSER_MIDDLE,
					o = buildParser(tpl),
					PARSER_SUFFIX
				];

			try {
				func = new Function(_ks_data, _parser.join(""));
			} catch (e) {
				_parser[3] = PREFIX + SUFFIX +
					PARSER_SYNTAX_ERROR + ',' +
					e.message + PREFIX + SUFFIX;
				func = new Function(_ks_data, _parser.join(""));
			}

			templateCache[tpl] = {
				name:_ks_data,
				o:o,
				parser:_parser.join(""),
				render:func
			};
		}
		return templateCache[tpl];
	}

	meta.mix(Template, {
		/**
		 * Logging Compiled Template Codes
		 * @param {String} tpl template string.
		 */
		log:function (tpl) {
			if (tpl in templateCache) {

				cs.p(templateCache[tpl].parser, 'info');
		
			} else {
				Template(tpl);
				this.log(tpl);
			}
		},

		/**
		 * add statement for extending template tags
		 * @param {String} statement tag name.
		 * @param {String} o extent tag object.
		 */
		addStatement:function (statement, o) {
			if (typeof(statement) == "string") {
				Statements[statement] = o;
			} else {
				meta.mix(Statements, statement);
			}
		},
		isValid : function(template){
			return !(!template || !template.o);
		}

	});

	w.meta = meta;

	return Template;



});