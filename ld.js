(function( global, DOC ) {
	var _lyFrame = window.lyFrame,
		_$ = window.$,
		version = '0.0.0',
		hasOwn = Object.prototype.hasOwnProperty,
		slice = [].slice,
		lyFrame = function(selector, context) {
			return new lyFrame.fn.init(selector, context)
		}

	// define prototype of lyFrame
	lyFrame.fn = lyFrame.prototype = {
		lyFrame: version,
		constructor: lyFrame,
		selector: '',
		length: 0,
		toArray: slice.call(this),
	}

	init = lyFrame.fn.init = function(selector, context) {
		// ...
	}
	
	/**
	 * [extend 方法挂载器]
	 * @param  {[obj]} receiver [接收者]
	 * @param  {[obj]} source   [方法集合]
	 * @return {[obj]}          [挂载了source的receiver]
	 */
	lyFrame.extend = lyFrame.fn.extend = function(receiver, source) {
		var args = slice.call(arguments),
			i = 1,
			l = args.length,
			key,
			ride = typeof args[l - 1] === 'boolean' ? args.pop() : true

		if (args.length === 1) {
			receiver = !this.window ? this : {}
			i = 0
		}

		while (source = args[i++]) {
			for (key in source) {
				if (hasOwn.call(source, key) && (ride || !(key in receiver))) {
					receiver[key] = source[key]
				}
			}
		}
		return receiver
	}
	// usage:
	// $.extend({'hehe': 'hehe'})
	// extend(obj1, obj2)
	// extend(obj1, obj2, true) 强制拷贝

	// 挂载方法
	lyFrame.extend({
		isReady: true, // 已加载
		error: function(msg) {
			throw new Error(msg)
		},
		isEmptyObject: function(obj) {
			var i
			for (i in obj) {
				return false
			}
			return true
		}
	})

	lyFrame.fn.extend({
		bind: function(type, data, fn) {
			return this.on(type, null, data, fn)
		}
	})

	/**
	 * [noConflict 换名字，防止命名空间冲突]
	 * @param  { ? } deep [ ? ]
	 * @return { object } [lyFrame]
	 */
	lyFrame.noConflict = function( deep ) {
		if ( window.$ === lyFrame ) {
			window.$ = _$
		}

		if ( deep && window.lyFrame === lyFrame ) {
			window.lyFrame = _lyFrame
		}

		return lyFrame // 把lyFrame返回给要赋给的新命名空间
	}
	// usage：
	// var lydia = lyFrame.noConflict()
	// lydia.extend(xxx)

	window.lyFrame = window.$ = lyFrame
	
	return lyFrame

}(window, window.document))