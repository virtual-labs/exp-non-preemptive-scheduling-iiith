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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initialize_processes\": () => (/* binding */ initialize_processes)\n/* harmony export */ });\n\nfunction getRandomInt(min, max) {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive\n}\nfunction create_process(id) {\n    var ticks = getRandomInt(3, 6);\n    var io = {\n        \"start_time\": getRandomInt(1, ticks - 1),\n        \"ticks\": getRandomInt(1, 3)\n    };\n    if (id % 2 == 0) {\n        io = null;\n    }\n    return {\n        \"id\": id,\n        \"ticks\": ticks,\n        \"start_time\": getRandomInt(0, 10),\n        \"cur_ticks\": 0,\n        \"io\": io\n    };\n}\nfunction initialize_processes(n) {\n    var processes = [];\n    for (var i = 0; i < n; i++) {\n        processes.push(create_process(i));\n    }\n    processes.sort(function (p1, p2) { return p1.start_time - p2.start_time; });\n    return processes;\n}\n\n\n//# sourceURL=webpack://cpu-scheduling/./src/helper.ts?");

/***/ }),

/***/ "./src/practice.ts":
/*!*************************!*\
  !*** ./src/practice.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.ts\");\n\nvar instruction = document.getElementById(\"instruction\");\ninstruction.textContent = \"Nothing\";\nvar algo = \"rr\";\nvar score = 0;\nvar log = [];\ndocument.getElementById(\"policy\").onchange = function (e) {\n    algo = e.target.value;\n    console.log(algo);\n    // document.getElementById(\"policy\").style.display = \"none\";\n    // if (algo == \"sjfp\" || algo == \"sjfnp\" || algo == \"fcfs\") {\n    //     document.getElementById(\"rr\").style.display = \"none\";\n    // }\n    document.getElementById(\"rr\").style.display = \"none\";\n    document.getElementById(\"sjfp\").style.display = \"none\";\n    document.getElementById(\"sjfnp\").style.display = \"none\";\n    document.getElementById(\"fcfs\").style.display = \"none\";\n};\n// time quantum for Round Robin\nvar quantum = 3; // default value, might have to take it from user later\nvar current_time = 0;\nvar processes = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.initialize_processes)(6);\nvar ready = [];\nvar io = [];\nvar completed = [];\nvar cpu_proc = null;\nvar prempt = 0;\n// const cpu_time = 2;\nfunction create_process_ui(process) {\n    var d = document.createElement('div');\n    var p = document.createElement('p');\n    p.textContent = \"P\" + String(process.id);\n    d.appendChild(p);\n    var p2 = document.createElement('p');\n    p2.textContent = \"Remaining Time: \" + String(process.ticks - process.cur_ticks);\n    d.appendChild(p2);\n    d.classList.add('process');\n    return d;\n}\nvar get_process = function (id) {\n    var p = document.createElement('p');\n    p.classList.add(\"process\");\n    p.textContent = \"P\".concat(id);\n    return p;\n};\nfunction update_ready_queue() {\n    var ready_queue = document.querySelector(\"#ready_queue\");\n    ready_queue.innerHTML = \"\";\n    ready.forEach(function (process, index) {\n        var sec = document.createElement('section');\n        sec.classList.add(\"queue_element\");\n        sec.appendChild(create_process_ui(process));\n        var p = document.createElement('p');\n        p.textContent = String(index);\n        p.classList.add('q_index');\n        sec.appendChild(p);\n        ready_queue.appendChild(sec);\n    });\n}\nfunction update_io_queue() {\n    var io_queue = document.querySelector(\"#io_queue .queue_body\");\n    io_queue.innerHTML = \"\";\n    io.forEach(function (process) {\n        var p = document.createElement('p');\n        p.textContent = \"P\" + String(process.id);\n        p.classList.add('process');\n        io_queue.appendChild(p);\n    });\n}\nfunction update_complete_pool() {\n    var complete_pool = document.querySelector(\"#complete_pool .queue_body\");\n    complete_pool.innerHTML = \"\";\n    completed.forEach(function (process) {\n        var p = document.createElement('p');\n        p.textContent = \"P\" + String(process.id);\n        p.classList.add('process');\n        complete_pool.appendChild(p);\n    });\n}\nfunction update_cpu() {\n    if (cpu_proc !== null) {\n        // console.log(\"pora yedava\");\n        var cpu_ele = document.querySelector(\"#cpu .queue_body\");\n        cpu_ele.innerHTML = \"\";\n        // const p = document.createElement('p');\n        // p.textContent = \"P\" + String(cpu_proc.id);\n        // p.classList.add('process');\n        var d = create_process_ui(cpu_proc);\n        cpu_ele.appendChild(d);\n    }\n    else {\n        var cpu_ele = document.querySelector(\"#cpu .queue_body\");\n        cpu_ele.innerHTML = \"No Process in CPU\";\n    }\n}\nfunction update_instruction() {\n    var inst = \"Advance the clock\";\n    if (completed.length == 6) {\n        inst = \"Well Done! You have completed running all processes.\";\n    }\n    else if (processes.length > 0 && processes[0].start_time <= current_time) {\n        inst = \"There is a create request for a new process P\".concat(processes[0].id);\n    }\n    else if (cpu_proc === null && ready.length > 0) {\n        // inst = \"The CPU is empty. Please select a process in ready queue for execution\"\n        inst = \"\";\n    }\n    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {\n        inst = \"The process P\".concat(cpu_proc.id, \" in CPU needs IO.\");\n    }\n    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {\n        inst = \"The process P\".concat(cpu_proc.id, \" in CPU hit the termination instruction.\");\n    }\n    else if (cpu_proc !== null && prempt == quantum) {\n        inst = \"The process P\".concat(cpu_proc.id, \" in CPU completed its current cpu time.\");\n    }\n    else {\n        // io queue\n        var flag = false;\n        for (var index = 0; index < io.length; index++) {\n            if (io[index].io.ticks === 0) {\n                inst = \"The process P\".concat(io[index].id, \" in IO queue is done with IO.\");\n                break;\n            }\n        }\n    }\n    instruction.textContent = inst;\n}\nfunction update_clock() {\n    document.getElementById(\"clock_val\").textContent = String(current_time);\n}\nfunction update() {\n    update_instruction();\n    update_ready_queue();\n    update_cpu();\n    update_io_queue();\n    update_complete_pool();\n    update_clock();\n    console.log(log);\n}\nupdate();\ndocument.getElementById(\"advance_clock\").onclick = function () {\n    // check if the user has done all the required things before advancing the clock\n    if (completed.length == 6) {\n        // alert(\"You have completed running all processes. Please refresh the page to start again.\");\n        instruction.textContent = \"You have completed running all processes. Please refresh the page to start again.\";\n        return;\n    }\n    else if (processes.length > 0 && processes[0].start_time == current_time) {\n        // alert(\"Please create the new process before advancing the clock.\");\n        instruction.textContent = \"Think again! There is a create request for the process P\".concat(processes[0].id, \".\");\n        return;\n    }\n    else if (cpu_proc === null && ready.length > 0) {\n        // alert(\"The CPU is empty. Please select a process in ready queue for execution\");\n        instruction.textContent = \"Think again! The CPU is empty.\";\n        return;\n    }\n    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {\n        // alert(\"The process in CPU needs IO. Please send it to IO queue by clicking IO.\");\n        instruction.textContent = \"Think again! The process in CPU needs IO.\";\n        return;\n    }\n    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {\n        // alert(\"The process in CPU completed its work. Please send it to complete pool by clicking Complete.\");\n        instruction.textContent = \"Think again! The process P\".concat(cpu_proc.id, \" in CPU hit the termination instruction.\");\n        return;\n    }\n    else if (cpu_proc !== null && prempt == quantum) {\n        // alert(\"The process in CPU completed its current cpu time. Please send it to ready queue by clicking Prempt.\");\n        instruction.textContent = \"Think again! The process P\".concat(cpu_proc.id, \" in CPU needs to be preempted.\");\n        return;\n    }\n    else {\n        // io queue\n        var flag = false;\n        for (var index = 0; index < io.length; index++) {\n            if (io[index].io.ticks === 0) {\n                // alert(`The process P${io[index].id} in IO queue got IO. Please collect data and send it to ready queue by clicking Collect.`);\n                instruction.textContent = \"Think again! The process P\".concat(io[index].id, \" in IO pool got IO and is waiting to go to ready pool.\");\n                flag = true;\n                break;\n            }\n        }\n        if (flag)\n            return;\n    }\n    current_time = current_time + 1;\n    if (cpu_proc !== null) {\n        cpu_proc.cur_ticks = cpu_proc.cur_ticks + 1;\n        prempt = prempt + 1;\n    }\n    for (var index = 0; index < io.length; index++) {\n        io[index].io.ticks--;\n    }\n    log.push(\"Advance clock to \".concat(current_time));\n    update();\n};\nvar get_index = function () {\n    if (ready.length == 0)\n        return 0;\n    var id = Number(prompt(\"Enter the index to insert process: \", \"\"));\n    if (algo == \"rr\" || algo == \"fcfs\") {\n        score = score + (ready.length === id ? 1 : -1);\n        console.log(score);\n        // if (ready.length != id) {\n        //     alert(\"Please enter the correct index\");\n        //     return -1;\n        // }\n    }\n    return id;\n};\ndocument.getElementById(\"create\").onclick = function () {\n    // check if clicking \"create\" is valid\n    if (processes[0].start_time != current_time) {\n        // alert(\"There is no process to create at this time.\");\n        instruction.textContent = \"Think again! There is no process ready to be created.\";\n        return;\n    }\n    if (processes.length > 0 && processes[0].start_time === current_time) {\n        var ind = get_index();\n        ready.splice(ind, 0, processes[0]);\n        processes.shift();\n        log.push(\"Created process P\".concat(ready[ind].id));\n        update();\n    }\n};\ndocument.getElementById(\"prempt\").onclick = function () {\n    // check if clicking \"prempt\" is valid\n    if (cpu_proc === null) {\n        // alert(\"The CPU is empty. There is no process to preempt.\");\n        instruction.textContent = \"Think again! The CPU is empty.\";\n        return;\n    }\n    else if (prempt != quantum) {\n        // alert(\"The process in CPU has not completed its current cpu time. Please wait for it to complete.\");\n        instruction.textContent = \"Think again! The process P\".concat(cpu_proc.id, \" in CPU doesn't need to be preempted now.\");\n        return;\n    }\n    if (cpu_proc !== null && prempt == quantum) {\n        var ind = get_index();\n        ready.splice(ind, 0, cpu_proc);\n        cpu_proc = null;\n        prempt = 0;\n        log.push(\"Prempted process P\".concat(ready[ind].id, \", and put it in ready queue at index \").concat(ind, \".\"));\n        update();\n    }\n};\ndocument.getElementById(\"goto_io\").onclick = function () {\n    // check if clicking \"goto_io\" is valid\n    if (cpu_proc === null) {\n        // alert(\"The CPU is empty. There is no process to send to IO queue.\");\n        instruction.textContent = \"Think again! The CPU is empty.\";\n        return;\n    }\n    else if (cpu_proc.cur_ticks != cpu_proc.io.start_time) {\n        // alert(\"The process in CPU doesn't need IO now.\");\n        instruction.textContent = \"Think again! The process P\".concat(cpu_proc.id, \" in CPU doesn't need IO now.\");\n        return;\n    }\n    if (cpu_proc !== null && cpu_proc.cur_ticks <= cpu_proc.io.start_time) {\n        io.push(cpu_proc);\n        console.log(\"In Goto IO\");\n        console.log(cpu_proc);\n        cpu_proc = null;\n        prempt = 0;\n        log.push(\"Sent process P\".concat(io[io.length - 1].id, \" to IO queue.\"));\n        update();\n    }\n};\ndocument.getElementById(\"collect\").onclick = function () {\n    // check if clicking \"collect\" is valid\n    var flag = false;\n    for (var index = 0; index < io.length; index++) {\n        if (io[index].io.ticks === 0) {\n            flag = true;\n            break;\n        }\n    }\n    if (!flag) {\n        // alert(\"There is no process in IO pool that has completed IO.\");\n        instruction.textContent = \"Think again! There is no process in IO pool that has completed IO.\";\n        return;\n    }\n    var process;\n    for (var index = 0; index < io.length; index++) {\n        if (io[index].io.ticks <= 0) {\n            process = io[index];\n            break;\n        }\n    }\n    process.io.start_time = -1;\n    var ind = get_index();\n    ready.splice(ind, 0, process);\n    io = io.filter(function (proc) { return proc.id !== process.id; });\n    log.push(\"Sent the process P\".concat(process.id, \" from IO queue to ready queue at index \").concat(ind, \".\"));\n    update();\n};\ndocument.getElementById(\"kill\").onclick = function () {\n    // check if clicking \"kill\" is valid\n    if (cpu_proc === null) {\n        // alert(\"There is no process in CPU to terminate.\");\n        instruction.textContent = \"Think again! The CPU is empty.\";\n        return;\n    }\n    else if (cpu_proc.cur_ticks != cpu_proc.ticks) {\n        // alert(\"The process in CPU has not hit its termination instruction yet.\");\n        instruction.textContent = \"Think again! The process P\".concat(cpu_proc.id, \" in CPU hasn't hit its termination instruction yet.\");\n        return;\n    }\n    if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {\n        completed.push(cpu_proc);\n        cpu_proc = null;\n        prempt = 0;\n        log.push(\"Terminated process P\".concat(completed[completed.length - 1].id, \".\"));\n        update();\n    }\n};\ndocument.getElementById(\"load\").onclick = function () {\n    // check if clicking \"load\" is valid\n    if (cpu_proc !== null) {\n        // alert(\"There is already a process running in the CPU.\");\n        instruction.textContent = \"Think again! There is already a process running in the CPU.\";\n        return;\n    }\n    else if (ready.length === 0) {\n        // alert(\"There is no process in ready queue to load into CPU.\");\n        instruction.textContent = \"Think again! There is no process in ready queue to load into CPU.\";\n        return;\n    }\n    // console.log(\"hello eswar\");\n    if (cpu_proc === null && ready.length > 0) {\n        cpu_proc = ready.shift();\n        update();\n    }\n};\n\n\n//# sourceURL=webpack://cpu-scheduling/./src/practice.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/practice.ts");
/******/ 	
/******/ })()
;