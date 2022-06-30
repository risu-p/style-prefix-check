/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/minimist/index.js":
/*!****************************************!*\
  !*** ./node_modules/minimist/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("module.exports = function (args, opts) {\n    if (!opts) opts = {};\n    \n    var flags = { bools : {}, strings : {}, unknownFn: null };\n\n    if (typeof opts['unknown'] === 'function') {\n        flags.unknownFn = opts['unknown'];\n    }\n\n    if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {\n      flags.allBools = true;\n    } else {\n      [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {\n          flags.bools[key] = true;\n      });\n    }\n    \n    var aliases = {};\n    Object.keys(opts.alias || {}).forEach(function (key) {\n        aliases[key] = [].concat(opts.alias[key]);\n        aliases[key].forEach(function (x) {\n            aliases[x] = [key].concat(aliases[key].filter(function (y) {\n                return x !== y;\n            }));\n        });\n    });\n\n    [].concat(opts.string).filter(Boolean).forEach(function (key) {\n        flags.strings[key] = true;\n        if (aliases[key]) {\n            flags.strings[aliases[key]] = true;\n        }\n     });\n\n    var defaults = opts['default'] || {};\n    \n    var argv = { _ : [] };\n    Object.keys(flags.bools).forEach(function (key) {\n        setArg(key, defaults[key] === undefined ? false : defaults[key]);\n    });\n    \n    var notFlags = [];\n\n    if (args.indexOf('--') !== -1) {\n        notFlags = args.slice(args.indexOf('--')+1);\n        args = args.slice(0, args.indexOf('--'));\n    }\n\n    function argDefined(key, arg) {\n        return (flags.allBools && /^--[^=]+$/.test(arg)) ||\n            flags.strings[key] || flags.bools[key] || aliases[key];\n    }\n\n    function setArg (key, val, arg) {\n        if (arg && flags.unknownFn && !argDefined(key, arg)) {\n            if (flags.unknownFn(arg) === false) return;\n        }\n\n        var value = !flags.strings[key] && isNumber(val)\n            ? Number(val) : val\n        ;\n        setKey(argv, key.split('.'), value);\n        \n        (aliases[key] || []).forEach(function (x) {\n            setKey(argv, x.split('.'), value);\n        });\n    }\n\n    function setKey (obj, keys, value) {\n        var o = obj;\n        for (var i = 0; i < keys.length-1; i++) {\n            var key = keys[i];\n            if (key === '__proto__') return;\n            if (o[key] === undefined) o[key] = {};\n            if (o[key] === Object.prototype || o[key] === Number.prototype\n                || o[key] === String.prototype) o[key] = {};\n            if (o[key] === Array.prototype) o[key] = [];\n            o = o[key];\n        }\n\n        var key = keys[keys.length - 1];\n        if (key === '__proto__') return;\n        if (o === Object.prototype || o === Number.prototype\n            || o === String.prototype) o = {};\n        if (o === Array.prototype) o = [];\n        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {\n            o[key] = value;\n        }\n        else if (Array.isArray(o[key])) {\n            o[key].push(value);\n        }\n        else {\n            o[key] = [ o[key], value ];\n        }\n    }\n    \n    function aliasIsBoolean(key) {\n      return aliases[key].some(function (x) {\n          return flags.bools[x];\n      });\n    }\n\n    for (var i = 0; i < args.length; i++) {\n        var arg = args[i];\n        \n        if (/^--.+=/.test(arg)) {\n            // Using [\\s\\S] instead of . because js doesn't support the\n            // 'dotall' regex modifier. See:\n            // http://stackoverflow.com/a/1068308/13216\n            var m = arg.match(/^--([^=]+)=([\\s\\S]*)$/);\n            var key = m[1];\n            var value = m[2];\n            if (flags.bools[key]) {\n                value = value !== 'false';\n            }\n            setArg(key, value, arg);\n        }\n        else if (/^--no-.+/.test(arg)) {\n            var key = arg.match(/^--no-(.+)/)[1];\n            setArg(key, false, arg);\n        }\n        else if (/^--.+/.test(arg)) {\n            var key = arg.match(/^--(.+)/)[1];\n            var next = args[i + 1];\n            if (next !== undefined && !/^-/.test(next)\n            && !flags.bools[key]\n            && !flags.allBools\n            && (aliases[key] ? !aliasIsBoolean(key) : true)) {\n                setArg(key, next, arg);\n                i++;\n            }\n            else if (/^(true|false)$/.test(next)) {\n                setArg(key, next === 'true', arg);\n                i++;\n            }\n            else {\n                setArg(key, flags.strings[key] ? '' : true, arg);\n            }\n        }\n        else if (/^-[^-]+/.test(arg)) {\n            var letters = arg.slice(1,-1).split('');\n            \n            var broken = false;\n            for (var j = 0; j < letters.length; j++) {\n                var next = arg.slice(j+2);\n                \n                if (next === '-') {\n                    setArg(letters[j], next, arg)\n                    continue;\n                }\n                \n                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {\n                    setArg(letters[j], next.split('=')[1], arg);\n                    broken = true;\n                    break;\n                }\n                \n                if (/[A-Za-z]/.test(letters[j])\n                && /-?\\d+(\\.\\d*)?(e-?\\d+)?$/.test(next)) {\n                    setArg(letters[j], next, arg);\n                    broken = true;\n                    break;\n                }\n                \n                if (letters[j+1] && letters[j+1].match(/\\W/)) {\n                    setArg(letters[j], arg.slice(j+2), arg);\n                    broken = true;\n                    break;\n                }\n                else {\n                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);\n                }\n            }\n            \n            var key = arg.slice(-1)[0];\n            if (!broken && key !== '-') {\n                if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])\n                && !flags.bools[key]\n                && (aliases[key] ? !aliasIsBoolean(key) : true)) {\n                    setArg(key, args[i+1], arg);\n                    i++;\n                }\n                else if (args[i+1] && /^(true|false)$/.test(args[i+1])) {\n                    setArg(key, args[i+1] === 'true', arg);\n                    i++;\n                }\n                else {\n                    setArg(key, flags.strings[key] ? '' : true, arg);\n                }\n            }\n        }\n        else {\n            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {\n                argv._.push(\n                    flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)\n                );\n            }\n            if (opts.stopEarly) {\n                argv._.push.apply(argv._, args.slice(i + 1));\n                break;\n            }\n        }\n    }\n    \n    Object.keys(defaults).forEach(function (key) {\n        if (!hasKey(argv, key.split('.'))) {\n            setKey(argv, key.split('.'), defaults[key]);\n            \n            (aliases[key] || []).forEach(function (x) {\n                setKey(argv, x.split('.'), defaults[key]);\n            });\n        }\n    });\n    \n    if (opts['--']) {\n        argv['--'] = new Array();\n        notFlags.forEach(function(key) {\n            argv['--'].push(key);\n        });\n    }\n    else {\n        notFlags.forEach(function(key) {\n            argv._.push(key);\n        });\n    }\n\n    return argv;\n};\n\nfunction hasKey (obj, keys) {\n    var o = obj;\n    keys.slice(0,-1).forEach(function (key) {\n        o = (o[key] || {});\n    });\n\n    var key = keys[keys.length - 1];\n    return key in o;\n}\n\nfunction isNumber (x) {\n    if (typeof x === 'number') return true;\n    if (/^0x[0-9a-f]+$/i.test(x)) return true;\n    return /^[-+]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(e[-+]?\\d+)?$/.test(x);\n}\n\n\n\n//# sourceURL=webpack://style-prefix-check/./node_modules/minimist/index.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! minimist */ \"./node_modules/minimist/index.js\");\n/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(minimist__WEBPACK_IMPORTED_MODULE_2__);\n/**\n * 检查所有 less 文件，@prefix 定义是否有重名\n */\n\n\n\nconsole.log('\\x1b[33mprefix检查开始...\\x1b[0m');\nvar argv = minimist__WEBPACK_IMPORTED_MODULE_2___default()(process.argv.slice(2));\n/**\n * 读取参数\n */\nvar dir = argv['dir'] || '';\nif (!dir) {\n    console.log('\\x1B[31m请传入参数--dir（如：--dir=src）\\x1b[0m');\n    process.exit(1);\n}\nvar PATH = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(dir);\n// less文件匹配符\nvar LESS_REG_EXP = new RegExp('.less$');\n// 匹配当前文件中，所有的 @prefix: ~ 定义\nvar PREFIX_REG_EXP = new RegExp('@prefix: *~ *[\\'\"](.*?)[\\'\"];', 'g');\n// 利用非全局匹配，获取到子表达式，即 prefix 的具体名字\nvar PREFIX_NAME_REG_EXP = new RegExp('@prefix: *~ *[\\'\"](.*?)[\\'\"];');\nvar lessFileWithoutPrefix = [];\nvar lessFileWithPrefix = [];\n/* 遍历所有文件 */\nvar walkDir = function (path) {\n    var files = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(path);\n    files.forEach(function (file) {\n        var absPath = path + \"/\" + file;\n        /* 如果是目录，则递归调用 */\n        if (isDirectory(absPath)) {\n            walkDir(absPath);\n        }\n        else {\n            /* 如果是.less */\n            if (LESS_REG_EXP.test(file)) {\n                var content = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(absPath, 'utf8');\n                var match = content.match(PREFIX_REG_EXP);\n                /* 检测是否有@prefix: ~定义 */\n                if (match) {\n                    // 提取出具体的prefix名称\n                    match.forEach(function (str, index) {\n                        var nameMatch = str.match(PREFIX_NAME_REG_EXP);\n                        if (nameMatch && nameMatch[1]) {\n                            // match结果的[1]位，即为子表达式\n                            lessFileWithPrefix.push({\n                                path: absPath,\n                                prefix: nameMatch[1] || '',\n                            });\n                        }\n                    });\n                }\n                else {\n                    lessFileWithoutPrefix.push(absPath);\n                }\n            }\n        }\n    });\n};\n/* 检查路径是否是目录 */\nvar isDirectory = function (path) { return fs__WEBPACK_IMPORTED_MODULE_0___default().lstatSync(path).isDirectory(); };\nwalkDir(PATH);\n/* prefix提取完成，判断是否有重名 */\nvar duplicatePrefixArr = [];\nvar prefixMap = {};\nlessFileWithPrefix.forEach(function (item) {\n    var prefix = item.prefix;\n    if (!prefixMap[prefix]) {\n        prefixMap[prefix] = 1; // 该prefix存在\n    }\n    else if (prefixMap[prefix] === 1) {\n        duplicatePrefixArr.push(prefix);\n        prefixMap[prefix] = 2; // 该prefix已经记录过重复了\n    }\n});\nif (duplicatePrefixArr.length) {\n    console.log('\\x1B[31m以下prefix重复，请修改：\\x1b[0m');\n    duplicatePrefixArr.forEach(function (prefix) {\n        console.log(\"\\u001B[0m\" + prefix + \"\\u001B[0m\");\n    });\n    process.exit(1);\n}\nelse {\n    console.log(\"\\u001B[32mprefix\\u68C0\\u67E5\\u901A\\u8FC7\\uFF0C\\u672A\\u91CD\\u590D\\u001B[0m\");\n}\n\n\n//# sourceURL=webpack://style-prefix-check/./src/index.ts?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;