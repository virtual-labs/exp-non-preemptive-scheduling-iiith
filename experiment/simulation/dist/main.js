/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialize_processes\": () => (/* binding */ initialize_processes)\n/* harmony export */ });\n\nfunction getRandomInt(min, max) {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive\n}\nfunction create_process(id) {\n    var ticks = getRandomInt(2, 5);\n    return {\n        \"id\": id,\n        \"ticks\": ticks,\n        \"start_time\": getRandomInt(0, 10),\n        \"cur_ticks\": 0,\n        \"io\": {\n            \"start_time\": getRandomInt(1, ticks - 1),\n            \"ticks\": getRandomInt(1, 3)\n        }\n    };\n}\nfunction initialize_processes(n) {\n    var processes = [];\n    for (var i = 0; i < n; i++) {\n        processes.push(create_process(i));\n    }\n    processes.sort(function (p1, p2) { return p1.start_time - p2.start_time; });\n    return processes;\n}\n\n\n//# sourceURL=webpack://context-switching/./src/helper.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.ts\");\n\nvar instruction = document.getElementById(\"instruction\");\ninstruction.textContent = \"Nothing\";\nvar algo = \"rr\";\n// document.getElementById(\"policy-drpdwn\").addEventListener(\"change\", function(): void {\n//     algo = this.t\n// });\n// time quantum for Round Robin\nvar quantum = 2; // default value, might have to take it from user later\nvar current_time = 0;\nvar processes = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.initialize_processes)(6);\nvar ready = [];\nvar io = [];\nvar completed = [];\nvar cpu_proc = null;\nvar prempt = 0;\n// const cpu_time = 2;\nvar get_process = function (id) {\n    var p = document.createElement('p');\n    p.classList.add(\"process\");\n    p.textContent = \"P\".concat(id);\n    return p;\n};\nfunction update_ready_queue() {\n    var ready_queue = document.querySelector(\"#ready_queue\");\n    ready_queue.innerHTML = \"\";\n    ready.forEach(function (process, index) {\n        var sec = document.createElement('section');\n        sec.classList.add(\"queue_element\");\n        sec.appendChild(get_process(process.id));\n        var p = document.createElement('p');\n        p.textContent = String(index);\n        p.classList.add('q_index');\n        sec.appendChild(p);\n        ready_queue.appendChild(sec);\n    });\n}\nfunction update_io_queue() {\n    var io_queue = document.querySelector(\"#io_queue .queue_body\");\n    io_queue.innerHTML = \"\";\n    io.forEach(function (process) {\n        var p = document.createElement('p');\n        p.textContent = \"P\" + String(process.id);\n        p.classList.add('process');\n        io_queue.appendChild(p);\n    });\n}\nfunction update_complete_pool() {\n    var complete_pool = document.querySelector(\"#complete_pool .queue_body\");\n    complete_pool.innerHTML = \"\";\n    completed.forEach(function (process) {\n        var p = document.createElement('p');\n        p.textContent = \"P\" + String(process.id);\n        p.classList.add('process');\n        complete_pool.appendChild(p);\n    });\n}\nfunction update_cpu() {\n    if (cpu_proc !== null) {\n        console.log(\"pora yedava\");\n        var cpu_ele = document.querySelector(\"#cpu .queue_body\");\n        cpu_ele.innerHTML = \"\";\n        var p = document.createElement('p');\n        p.textContent = \"P\" + String(cpu_proc.id);\n        p.classList.add('process');\n        cpu_ele.appendChild(p);\n    }\n    else {\n        var cpu_ele = document.querySelector(\"#cpu .queue_body\");\n        cpu_ele.innerHTML = \"No Process in CPU\";\n    }\n}\nfunction update_instruction() {\n    var inst = \"\".concat(current_time, \" Please Click Advance the clock.\");\n    if (completed.length == 6) {\n        inst = \"Well Done! You have completed running all processes.\";\n    }\n    else if (processes.length > 0 && processes[0].start_time <= current_time) {\n        inst = \"There is a new process P\".concat(processes[0].id, \" request please create it\");\n    }\n    else if (cpu_proc === null && ready.length > 0) {\n        inst = \"The CPU is empty. Please select a process in ready queue for execution\";\n    }\n    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {\n        inst = \"The process P\".concat(cpu_proc.id, \" in CPU needs IO. Send it to IO queue by clicking GoTo IO.\");\n    }\n    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {\n        inst = \"The process P\".concat(cpu_proc.id, \" in CPU completed its work. Kill it by clicking Kill.\");\n    }\n    else if (cpu_proc !== null && prempt == quantum) {\n        inst = \"The process P\".concat(cpu_proc.id, \" in CPU completed its current cpu time. Prempt it by clicking Prempt.\");\n    }\n    else {\n        // io queue\n        var flag = false;\n        for (var index = 0; index < io.length; index++) {\n            if (io[index].io.ticks === 0) {\n                inst = \"The process P\".concat(io[index].id, \" in IO queue got IO. Collect data and send it to ready queue by clicking Collect.\");\n                break;\n            }\n        }\n    }\n    instruction.textContent = inst;\n}\nfunction update() {\n    update_instruction();\n    update_ready_queue();\n    update_cpu();\n    update_io_queue();\n    update_complete_pool();\n}\nupdate();\ndocument.getElementById(\"advance_clock\").onclick = function () {\n    current_time = current_time + 1;\n    if (cpu_proc !== null) {\n        cpu_proc.cur_ticks = cpu_proc.cur_ticks + 1;\n        prempt = prempt + 1;\n    }\n    for (var index = 0; index < io.length; index++) {\n        io[index].io.ticks--;\n    }\n    update();\n};\nvar get_index = function () {\n    if (ready.length == 0)\n        return 0;\n    var id = Number(prompt(\"Enter the index to insert process: \", \"\"));\n    return id;\n};\ndocument.getElementById(\"create\").onclick = function () {\n    if (processes.length > 0 && processes[0].start_time == current_time) {\n        var ind = get_index();\n        ready.splice(ind, 0, processes[0]);\n        processes.shift();\n        update();\n    }\n};\ndocument.getElementById(\"prempt\").onclick = function () {\n    if (cpu_proc !== null && prempt == quantum) {\n        var ind = get_index();\n        ready.splice(ind, 0, cpu_proc);\n        cpu_proc = null;\n        prempt = 0;\n        update();\n    }\n};\ndocument.getElementById(\"goto_io\").onclick = function () {\n    if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {\n        io.push(cpu_proc);\n        console.log(\"In Goto IO\");\n        console.log(cpu_proc);\n        cpu_proc = null;\n        prempt = 0;\n        update();\n    }\n};\ndocument.getElementById(\"collect\").onclick = function () {\n    var process;\n    for (var index = 0; index < io.length; index++) {\n        if (io[index].io.ticks === 0) {\n            process = io[index];\n            break;\n        }\n    }\n    process.io.start_time = -1;\n    var ind = get_index();\n    ready.splice(ind, 0, process);\n    io = io.filter(function (proc) { return proc.id !== process.id; });\n    update();\n};\ndocument.getElementById(\"kill\").onclick = function () {\n    if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {\n        completed.push(cpu_proc);\n        cpu_proc = null;\n        prempt = 0;\n        update();\n    }\n};\ndocument.getElementById(\"load\").onclick = function () {\n    console.log(\"hello eswar\");\n    if (cpu_proc === null && ready.length > 0) {\n        cpu_proc = ready.shift();\n        update();\n    }\n};\n\n\n//# sourceURL=webpack://context-switching/./src/main.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;