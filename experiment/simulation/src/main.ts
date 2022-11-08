import { Process, initialize_processes } from './helper';

let instruction = document.getElementById("instruction");
instruction.textContent = "Nothing";

let algo: string = "rr";
let score: number = 0;

// document.getElementById("policy-drpdwn").addEventListener("change", function(): void {
//     algo = this.t
// });

// time quantum for Round Robin
const quantum: number = 2; // default value, might have to take it from user later

let current_time: number = 0;
let processes: Process[] = initialize_processes(6);
let ready: Process[] = [];
let io: Process[] = [];
let completed: Process[] = [];
let cpu_proc: Process | null = null;
let prempt: number = 0;
// const cpu_time = 2;

const get_process = (id: number) => {
    const p = document.createElement('p');
    p.classList.add("process");
    p.textContent = `P${id}`;
    return p;
}

function update_ready_queue() {
    const ready_queue = document.querySelector("#ready_queue");
    ready_queue.innerHTML = "";
    ready.forEach((process: Process, index: number) => {
        const sec = document.createElement('section');
        sec.classList.add("queue_element");
        sec.appendChild(get_process(process.id));
        const p = document.createElement('p');
        p.textContent = String(index);
        p.classList.add('q_index');
        sec.appendChild(p);
        ready_queue.appendChild(sec);
    });
}

function update_io_queue() {
    const io_queue = document.querySelector("#io_queue .queue_body");
    io_queue.innerHTML = "";
    io.forEach((process: Process) => {
        const p = document.createElement('p');
        p.textContent = "P" + String(process.id);
        p.classList.add('process');
        io_queue.appendChild(p);
    })
}

function update_complete_pool() {
    const complete_pool = document.querySelector("#complete_pool .queue_body");
    complete_pool.innerHTML = "";
    completed.forEach((process: Process) => {
        const p = document.createElement('p');
        p.textContent = "P" + String(process.id);
        p.classList.add('process');
        complete_pool.appendChild(p);
    })
}


function update_cpu() {
    if (cpu_proc !== null) {
        console.log("pora yedava");
        const cpu_ele = document.querySelector("#cpu .queue_body");
        cpu_ele.innerHTML = "";
        const p = document.createElement('p');
        p.textContent = "P" + String(cpu_proc.id);
        p.classList.add('process');
        cpu_ele.appendChild(p);
    }
    else {
        const cpu_ele = document.querySelector("#cpu .queue_body");
        cpu_ele.innerHTML = "No Process in CPU";
    }
}

function update_instruction() {
    let inst: string = `${current_time} Please Click Advance the clock.`;
    if (completed.length == 6) {
        inst = "Well Done! You have completed running all processes."
    }
    else if (processes.length > 0 && processes[0].start_time <= current_time) {
        inst = `There is a new process P${processes[0].id} request please create it`;
    }
    else if (cpu_proc === null && ready.length > 0) {
        inst = "The CPU is empty. Please select a process in ready queue for execution"
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {
        inst = `The process P${cpu_proc.id} in CPU needs IO. Send it to IO queue by clicking GoTo IO.`
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        inst = `The process P${cpu_proc.id} in CPU completed its work. Kill it by clicking Kill.`
    }
    else if (cpu_proc !== null && prempt == quantum) {
        inst = `The process P${cpu_proc.id} in CPU completed its current cpu time. Prempt it by clicking Prempt.`
    }
    else {
        // io queue
        let flag: Boolean = false;
        for (let index = 0; index < io.length; index++) {
            if (io[index].io.ticks === 0) {
                inst = `The process P${io[index].id} in IO queue got IO. Collect data and send it to ready queue by clicking Collect.`;
                break;
            }
        }
    }
    instruction.textContent = inst;
}

function update() {
    update_instruction();
    update_ready_queue();
    update_cpu();
    update_io_queue();
    update_complete_pool();
}

update();

document.getElementById("advance_clock").onclick = () => {
    current_time = current_time + 1;
    if (cpu_proc !== null) {
        cpu_proc.cur_ticks = cpu_proc.cur_ticks + 1;
        prempt = prempt + 1;
    }
    for (let index = 0; index < io.length; index++) {
        io[index].io.ticks--;
    }
    update();
}

const get_index = () => {
    if (ready.length == 0) return 0;
    let id: number = Number(prompt("Enter the index to insert process: ", ""));
    if (algo == "rr" || algo == "fcfs") {
        score = score + (ready.length === id ? 1 : -1);
        console.log(score);
    }
    return id;
}

document.getElementById("create").onclick = () => {
    if (processes.length > 0 && processes[0].start_time <= current_time) {
        const ind = get_index();
        ready.splice(ind, 0, processes[0]);
        processes.shift();
        update();
    }
}

document.getElementById("prempt").onclick = () => {
    if (cpu_proc !== null && prempt == quantum) {
        const ind = get_index();
        ready.splice(ind, 0, cpu_proc);
        cpu_proc = null;
        prempt = 0;
        update();
    }
}

document.getElementById("goto_io").onclick = () => {
    if (cpu_proc !== null && cpu_proc.cur_ticks <= cpu_proc.io.start_time) {
        io.push(cpu_proc);
        console.log("In Goto IO");
        console.log(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        update();
    }
}

document.getElementById("collect").onclick = () => {
    let process: Process;
    for (let index = 0; index < io.length; index++) {
        if (io[index].io.ticks <= 0) {
            process = io[index];
            break;
        }
    }
    process.io.start_time = -1;
    const ind = get_index();
    ready.splice(ind, 0, process);
    io = io.filter(proc => proc.id !== process.id);
    update();
}

document.getElementById("kill").onclick = () => {
    if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        completed.push(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        update();
    }
}

document.getElementById("load").onclick = () => {
    console.log("hello eswar");
    if (cpu_proc === null && ready.length > 0) {
        cpu_proc = ready.shift();
        update();
    }
}
