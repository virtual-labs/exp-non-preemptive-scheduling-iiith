import { Process, initialize_processes } from './helper';

let instruction = document.getElementById("instruction");
instruction.textContent = "Nothing";

let algo: string = "rr";
let score: number = 0;

let log: string[] = [];

document.getElementById("policy").onchange = (e) => {
    algo = (e.target as HTMLSelectElement).value;
    console.log(algo);
    // document.getElementById("policy").style.display = "none";
    // if (algo == "sjfp" || algo == "sjfnp" || algo == "fcfs") {
    //     document.getElementById("rr").style.display = "none";
    // }
    document.getElementById("rr").style.display = "none";
    document.getElementById("sjfp").style.display = "none";
    document.getElementById("sjfnp").style.display = "none";
    document.getElementById("fcfs").style.display = "none";
}

// time quantum for Round Robin
const quantum: number = 3; // default value, might have to take it from user later

let current_time: number = 0;
let processes: Process[] = initialize_processes(6);
let ready: Process[] = [];
let io: Process[] = [];
let completed: Process[] = [];
let cpu_proc: Process | null = null;
let prempt: number = 0;
// const cpu_time = 2;

function create_process_ui(process: Process): HTMLDivElement {
    const d = document.createElement('div');
    let p = document.createElement('p');
    p.textContent = "P" + String(process.id);
    d.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = "Remaining Time: " + String(process.ticks - process.cur_ticks);
    d.appendChild(p2);
    d.classList.add('process');
    return d;
}

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
        sec.appendChild(create_process_ui(process));
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
        // console.log("pora yedava");
        const cpu_ele = document.querySelector("#cpu .queue_body");
        cpu_ele.innerHTML = "";
        // const p = document.createElement('p');
        // p.textContent = "P" + String(cpu_proc.id);
        // p.classList.add('process');
        const d = create_process_ui(cpu_proc);
        cpu_ele.appendChild(d);
    }
    else {
        const cpu_ele = document.querySelector("#cpu .queue_body");
        cpu_ele.innerHTML = "No Process in CPU";
    }
}

function update_instruction() {
    let inst: string = `Advance the clock`;
    if (completed.length == 6) {
        inst = "Well Done! You have completed running all processes."
    }
    else if (processes.length > 0 && processes[0].start_time <= current_time) {
        inst = `There is a create request for a new process P${processes[0].id}`;
    }
    else if (cpu_proc === null && ready.length > 0) {
        // inst = "The CPU is empty. Please select a process in ready queue for execution"
        inst = "";
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {
        inst = `The process P${cpu_proc.id} in CPU needs IO.`
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        inst = `The process P${cpu_proc.id} in CPU hit the termination instruction.`
    }
    else if (cpu_proc !== null && prempt == quantum) {
        inst = `The process P${cpu_proc.id} in CPU completed its current cpu time.`
    }
    else {
        // io queue
        let flag: Boolean = false;
        for (let index = 0; index < io.length; index++) {
            if (io[index].io.ticks === 0) {
                inst = `The process P${io[index].id} in IO queue is done with IO.`;
                break;
            }
        }
    }
    instruction.textContent = inst;
}

function update_clock() {
    document.getElementById("clock_val").textContent = String(current_time);
}

function update() {
    update_instruction();
    update_ready_queue();
    update_cpu();
    update_io_queue();
    update_complete_pool();
    update_clock();
    console.log(log);
}

update();

document.getElementById("advance_clock").onclick = () => {
    // check if the user has done all the required things before advancing the clock
    if (completed.length == 6) {
        alert("You have completed running all processes. Please refresh the page to start again.");
        return;
    }
    else if (processes.length > 0 && processes[0].start_time == current_time) {
        alert("Please create the new process before advancing the clock.");
        return;
    }
    else if (cpu_proc === null && ready.length > 0) {
        alert("The CPU is empty. Please select a process in ready queue for execution");
        return;
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {
        alert("The process in CPU needs IO. Please send it to IO queue by clicking IO.");
        return;
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        alert("The process in CPU completed its work. Please send it to complete pool by clicking Complete.");
        return;
    }
    else if (cpu_proc !== null && prempt == quantum) {
        alert("The process in CPU completed its current cpu time. Please send it to ready queue by clicking Prempt.");
        return;
    }
    else {
        // io queue
        let flag: Boolean = false;
        for (let index = 0; index < io.length; index++) {
            if (io[index].io.ticks === 0) {
                alert(`The process P${io[index].id} in IO queue got IO. Please collect data and send it to ready queue by clicking Collect.`);
                flag = true;
                break;
            }
        }
        if (flag) return;
    }

    current_time = current_time + 1;
    if (cpu_proc !== null) {
        cpu_proc.cur_ticks = cpu_proc.cur_ticks + 1;
        prempt = prempt + 1;
    }
    for (let index = 0; index < io.length; index++) {
        io[index].io.ticks--;
    }
    log.push(`Advance clock to ${current_time}`);
    update();
}

const get_index = () => {
    if (ready.length == 0) return 0;
    let id: number = Number(prompt("Enter the index to insert process: ", ""));
    if (algo == "rr" || algo == "fcfs") {
        score = score + (ready.length === id ? 1 : -1);
        console.log(score);
        // if (ready.length != id) {
        //     alert("Please enter the correct index");
        //     return -1;
        // }
    }
    return id;
}

document.getElementById("create").onclick = () => {
    // check if clicking "create" is valid
    if (processes[0].start_time != current_time) {
        alert("There is no process to create at this time.");
        return;
    }

    if (processes.length > 0 && processes[0].start_time === current_time) {
        const ind = get_index();
        ready.splice(ind, 0, processes[0]);
        processes.shift();
        log.push(`Created process P${ready[ind].id}`);
        update();
    }
}

document.getElementById("prempt").onclick = () => {
    // check if clicking "prempt" is valid
    if (cpu_proc === null) {
        alert("The CPU is empty. There is no process to preempt.");
        return;
    }
    else if (prempt != quantum) {
        alert("The process in CPU has not completed its current cpu time. Please wait for it to complete.");
        return;
    }

    if (cpu_proc !== null && prempt == quantum) {
        const ind = get_index();
        ready.splice(ind, 0, cpu_proc);
        cpu_proc = null;
        prempt = 0;
        log.push(`Prempted process P${ready[ind].id}, and put it in ready queue at index ${ind}.`);
        update();
    }
}

document.getElementById("goto_io").onclick = () => {
    // check if clicking "goto_io" is valid
    if (cpu_proc === null) {
        alert("The CPU is empty. There is no process to send to IO queue.");
        return;
    }
    else if (cpu_proc.cur_ticks != cpu_proc.io.start_time) {
        alert("The process in CPU doesn't need IO now.");
        return;
    }

    if (cpu_proc !== null && cpu_proc.cur_ticks <= cpu_proc.io.start_time) {
        io.push(cpu_proc);
        console.log("In Goto IO");
        console.log(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        log.push(`Sent process P${io[io.length - 1].id} to IO queue.`);
        update();
    }
}

document.getElementById("collect").onclick = () => {
    // check if clicking "collect" is valid
    let flag: Boolean = false;
    for (let index = 0; index < io.length; index++) {
        if (io[index].io.ticks === 0) {
            flag = true;
            break;
        }
    }
    if (!flag) {
        alert("There is no process in IO pool that has completed IO.");
        return;
    }

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
    log.push(`Sent the process P${process.id} from IO queue to ready queue at index ${ind}.`);
    update();
}

document.getElementById("kill").onclick = () => {
    // check if clicking "kill" is valid
    if (cpu_proc === null) {
        alert("There is no process in CPU to terminate.");
        return;
    }
    else if (cpu_proc.cur_ticks != cpu_proc.ticks) {
        alert("The process in CPU has not hit its termination instruction yet.");
        return;
    }

    if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        completed.push(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        log.push(`Terminated process P${completed[completed.length - 1].id}.`);
        update();
    }
}

document.getElementById("load").onclick = () => {
    // check if clicking "load" is valid
    if (cpu_proc !== null) {
        alert("There is already a process running in the CPU.");
        return;
    }
    else if (ready.length === 0) {
        alert("There is no process in ready queue to load into CPU.");
        return;
    }

    // console.log("hello eswar");
    if (cpu_proc === null && ready.length > 0) {
        cpu_proc = ready.shift();
        update();
    }
}
