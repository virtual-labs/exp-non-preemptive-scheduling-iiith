
//Your JavaScript goes in here
let Previous_States = [];
let State = {
    "Ready": [],
    "Running": null,
    "Waiting": [],
    "Terminated": [],
    "Completed": [],
    "Map": { "id": null, "run_time": null, "burst_time": null },
    "Timer": null,
    "Policy": null,
    "clickedState": null,
    "time_counter": 0
};
let id_counter = 1;




class Process {
    constructor(burst_time, status) {
        this.burst_time = burst_time;
        this.status = status;
        this.mapping = { "run_time": 0, "burst_time": burst_time }
        this.id = id_counter;
        id_counter++;
    }
}

function UpdatePolicy(){
    let policy = document.getElementById("policy-btn");
    State["Policy"] = policy.value;
    UpdateState();
    // console.log(State["Policy"]);
}

function assemble_msg(FEEDBACK, color) {
    var dialogue = document.getElementById("dialog");
    var tb = dialogue.getElementsByTagName("tbody")[0];
    var row = document.createElement("tr");
    var td = document.createElement("td");
    // Assign class to td
    td.className = "msg";

    var text = "";

    text += FEEDBACK;


    td.innerHTML = text;

    var msgElements = document.getElementsByClassName("msg");

    if (msgElements.length > 0) {
        var prev_msg = msgElements[msgElements.length - 1];
        prev_msg.style.backgroundColor = " #cbc4c2 ";
    }
    td.style.backgroundColor = color;
    row.appendChild(td);
    tb.appendChild(row);
    dialogue.appendChild(tb);
}

function sendalert(message) {

    alertMsg = message;

    document.getElementById("alert-msg").innerHTML = alertMsg;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("boot")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
}

function openTheory() {
    if (document.getElementById("toc").style.display == "none") {
        document.getElementById("toc").style.display = "block";
    } else {
        document.getElementById("toc").style.display = "none";
    }
}

function openContent(toc_id) {
    if (document.getElementById(toc_id).style.display == "none") {
        document.getElementById(toc_id).style.display = "block";
    } else {
        document.getElementById(toc_id).style.display = "none";
    }
}


function loadUnloadCommand(cmd) {
    if (cmd == "schedule") {
        if (State["clickedState"] == "schedule") {
            State["clickedState"] = null;
            UpdateState();
        }
        else if (State["clickedState"] == null) {
            State["clickedState"] = "schedule";
            schd_btn = document.getElementById("schd-btn");
            schd_btn.classList.add("btn-loaded");
            // console.log(schd_btn.classList)
        }
        else {
            sendalertalert("Please complete the previous command first or unselect it")
        }
    }
    if (cmd == "newProcess") {
        if (State["clickedState"] == "newProcess") {
            State["clickedState"] = null;
            newProcess_btn = document.getElementById("newProcess-btn");
            newProcess_btn.classList.remove("btn-loaded");
        }
        else if (State["clickedState"] == null) {
            State["clickedState"] = "newProcess";
            UpdateState();
            newProcess();
        }
        else {
            sendalert("Please complete the previous command first or unselect it")
        }
    }
    if (cmd == "terminate") {
        if (State["clickedState"] == "terminate") {
            State["clickedState"] = null;
            UpdateState();
        }
        else if (State["clickedState"] == null) {
            State["clickedState"] = "terminate";
            UpdateState();
        }
        else {
            sendalert("Please complete the previous command first or unselect it")
        }
    }
}

function ToggleCreateProcess() {
    if (State["clickedState"] == "newProcess") {
        State["clickedState"] = null;
        UpdateState();
        UpdateTable();
    }
    else if (State["clickedState"] == null) {
        let burst_input = document.getElementById("burstTime");
        document.getElementById("myDropdown").classList.toggle("show");
        burst_input.placeholder = "Enter Burst Time (1-30) to create a process with Pid:" + id_counter;

    }
}

function newProcess() {
    document.getElementById("myDropdown").classList.toggle("show");

}

function CreateProcess() {
    let create_process_input = document.getElementById("burstTime").value;
    document.getElementById("burstTime").value = "";
    if (create_process_input == "") {
        sendalert("Please enter a number between 1 to 30");
        return;
    }
    let create_process_input_int = parseInt(create_process_input);
    if (create_process_input_int < 1) {
        sendalert("Please enter a number between 1 to 30");
        return;
    }
    if (create_process_input_int > 30) {
        sendalertalert("Please enter a number between 1 to 30")
        return
    }
    let process = new Process(create_process_input_int, "Ready");
    State["Ready"].push(process);
    UpdateState();
    UpdateTable();
    assemble_msg("New process created successfully!", "green");
}

function UpdateTable() {
    let table = document.getElementById("processes")
    table.innerHTML = "<th>Process ID</th><th>Burst Time</th><th>Remaining time</th><th>Status</th>";
    // console.log(table);
    if (State["Running"] != null) {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = State["Running"].id;
        let cell2 = row.insertCell(1);
        cell2.innerHTML = State["Running"].mapping["burst_time"];
        let cell3 = row.insertCell(2);
        cell3.innerHTML = State["Running"].mapping["burst_time"] - State["Running"].mapping["run_time"];
        let cell4 = row.insertCell(3);
        cell4.innerHTML = State["Running"].status;
        cell4.className = "tag-green";
    }
    State["Ready"].forEach((process) => {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = process.id;
        let cell2 = row.insertCell(1);
        cell2.innerHTML = process.burst_time;
        let cell3 = row.insertCell(2);
        cell3.innerHTML = process.burst_time;
        let cell4 = row.insertCell(3);
        cell4.innerHTML = process.status;
        cell4.className = "tag-orange";
    }
    );
    State["Completed"].forEach((process) => {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = process.id;
        let cell2 = row.insertCell(1);
        cell2.innerHTML = process.burst_time;
        let cell3 = row.insertCell(2);
        cell3.innerHTML = 0;
        let cell4 = row.insertCell(3);
        cell4.innerHTML = process.status;
        cell4.className = "tag-grey";
    }
    );
    State["Terminated"].forEach((process) => {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = process.id;
        let cell2 = row.insertCell(1);
        cell2.innerHTML = process.burst_time;
        let cell3 = row.insertCell(2);
        cell3.innerHTML = 0;
        let cell4 = row.insertCell(3);
        cell4.innerHTML = process.status;
        cell4.className = "tag-red";
    }
    );
}

function schedule() {
    if (State["Running"] == null) {
        let cpuTable = document.getElementById("CPU")
        let readyTable = document.getElementById("processes")
        if (State["Ready"].length != 0) {
            cpuTable.innerHTML = "<th>Process ID</th><th>Burst Time</th><th>Run Time</th>";
            // Add State["Ready"][0] to cpuTable
            let row = cpuTable.insertRow(-1);
            let cell1 = row.insertCell(0);
            cell1.innerHTML = State["Ready"][0].id;

            let cell2 = row.insertCell(1);
            cell2.innerHTML = State["Ready"][0].mapping["burst_time"];
            let cell3 = row.insertCell(2);
            cell3.innerHTML = State["Ready"][0].mapping["run_time"];




            // Remove State["Ready"][0] from State["Ready"] and add to State["Running"]
            assemble_msg("Process with pid " + State["Ready"][0].id + " now running on the CPU!");
            tmp = State["Ready"][0];
            State["Running"] = tmp;

            State["Ready"].shift();
            State["Running"].status = "Running";
            // UpdateState();
        }
        else {
            assemble_msg("No ready processes to be run on the CPU. Please create a new process.", "red");
        }
        UpdateTable();
    }
    else {
        assemble_msg("A process is currently running on the CPU. Either wait for it to complete or terminate that process.", "red");
    }

}

function UpdateState() {
    let readyQueue = document.getElementById("rQ");
    let waitingQueue = document.getElementById("wQ");
    let TerminatedQueue = document.getElementById("tQ");
    let completedQueue = document.getElementById("cQ");
    let running = document.getElementById("cpu_p");
    let policy = document.getElementById("schd_p");
    let map = document.getElementById("map");
    let timer = document.getElementById("timer");
    let ticker = document.getElementById("ticker");
    let schd_btn = document.getElementById("schd-btn");
    let newProcess_btn = document.getElementById("newProcess-btn");
    let end_btn = document.getElementById("end-btn");
    readyQueue.innerHTML = "";
    temp = [];
    State["Ready"].forEach((process) => {
        temp.push(process.id);
    })
    readyQueue.innerHTML = "[ " + temp.join(",") + " ]";
    waitingQueue.innerHTML = "";
    temp = [];
    State["Waiting"].forEach((process) => {
        temp.push(process.id);
    })
    waitingQueue.innerHTML = "[ " + temp.join(",") + " ]";
    TerminatedQueue.innerHTML = "";
    temp = [];
    State["Terminated"].forEach((process) => {
        temp.push(process.id);
    })
    TerminatedQueue.innerHTML = "[ " + temp.join(",") + " ]";
    running.innerHTML = "";
    completedQueue.innerHTML = "";
    temp = [];
    State["Completed"].forEach((process) => {
        temp.push(process.id);
    })
    completedQueue.innerHTML = "[ " + temp.join(",") + " ]";
    if (State["Running"] == null) {
        running.innerHTML = "None";
        map.innerHTML = "-";
    }
    else {
        running.innerHTML = State["Running"].id;
        map.innerHTML = State["Running"].id + "->" + State["Running"].mapping["run_time"] + ":" + State["Running"].mapping["burst_time"];
        State["Map"] = { "id": State["Running"].id, "run_time": State["Running"].mapping["run_time"], "burst_time": State["Running"].mapping["burst_time"] };
    }
    timer.innerHTML = State["Timer"]!=null?State["Timer"]:"-";
    policy.innerHTML = State["Policy"]!=null?State["Policy"]:"None";
    ticker.innerHTML = State["time_counter"];
    if (State["clickedState"] == "schedule") {
        schd_btn.classList.add("btn-loaded");
    }
    else if (State["clickedState"] == "newProcess") {
        newProcess_btn.classList.add("btn-loaded");
    }
    else if (State["clickedState"] == "terminate") {
        end_btn.classList.add("btn-loaded");
    }
    else if (State["clickedState"] == null) {
        schd_btn.classList.remove("btn-loaded");
        newProcess_btn.classList.remove("btn-loaded");
        end_btn.classList.remove("btn-loaded");
    }

}

function Schedule() {
    if (State["Policy"] == "FCFS") {
        FCFS();
    }
    else {
        State["Running"].mapping["run_time"]++;
        State["Timer"]--;
        UpdateState();
        UpdateTable();
        if (State["Running"].mapping["burst_time"] == State["Running"].mapping["run_time"]) {
            State["Completed"].push(State["Running"]);
            alert("Process " + State["Running"].id + " Completed");
            State["Running"] = null;
            State["Timer"] = null;
            UpdateState();
            UpdateTable();
            SchedulePolicy();
        }
        else if (State["Timer"] == 0) {
            State["Ready"].push(State["Running"]);
            State["Running"] = null;
            State["Timer"] = null;
            alert("Timer Interrupt Occured");
            SchedulePolicy();
        }

    }

}

function SchedulePolicy() {
    if (State["Policy"] == "FCFS") {
        FCFS();
    }
    else if (State["Policy"] == "SJF") {
        SJF();
    }
    else if (State["Policy"] == "Priority") {
        Priority();
    }
    else if (State["Policy"] == "Round Robin") {
        RoundRobin();
    }
}

function FCFS() {
    if (State["Running"] == null) {
        if (State["Ready"].length == 0) {
            return;
        }
        schedule();
        UpdateState();
    }
}

function ContextSwitch() {
    if (State["Running"] != null) {
        State["Waiting"].push(State["Running"]);
        State["Running"] = null;
        UpdateState();
        UpdateTable();
    }
}

function Terminate(n = 1) {
    if (State["Running"] != null) {
        let cpuTable = document.getElementById("CPU")
        tmp = State["Running"];
        if (n == 1) {
            tmp.status = "Terminated";
            State["Terminated"].push(tmp)
        }
        else {
            tmp.status = "Completed";
            State["Completed"].push(tmp)
        }
        assemble_msg("Currently running process terminated succesfully", "green");
        State["Running"] = null;
        cpuTable.deleteRow(0);
        cpuTable.deleteRow(0);
    }
    else {
        assemble_msg("No running process to terminate. Please schedule a process.", "red");
    }
    UpdateTable();
}

function Tick() {
    if (State["clickedState"] == null) {
        if (State["Running"] != null) {
            State["time_counter"]++;
            let ticker = document.getElementById("ticker");
            ticker.innerHTML = State["time_counter"];
            State["Running"].mapping["run_time"]++;
            State["Running"].mapping["burst_time"];
            let cpuTable = document.getElementById("CPU")
            cpuTable.rows[1].cells[1].innerHTML = State["Running"].mapping["burst_time"];
            cpuTable.rows[1].cells[2].innerHTML = State["Running"].mapping["run_time"];

            if (State["Running"].mapping["burst_time"] == State["Running"].mapping["run_time"]) {
                Terminate(0);
            }
            UpdateTable();
        }

        UpdateState();
        Previous_States.push(JSON.parse(JSON.stringify(State)));
        UpdatePreviousState();
    }
    else if (State["clickedState"] == "newProcess") {
        CreateProcess();
        State["time_counter"]++;
        State["clickedState"] = null;
        UpdateTable();
        UpdateState();
        Previous_States.push(JSON.parse(JSON.stringify(State)));
        UpdatePreviousState();
    }
    else if (State["clickedState"] == "schedule") {
        schedule();
        State["time_counter"]++;
        State["clickedState"] = null;
        UpdateTable();
        UpdateState();
        Previous_States.push(JSON.parse(JSON.stringify(State)));
        UpdatePreviousState();
    }
    else if (State["clickedState"] == "terminate") {
        Terminate();
        State["time_counter"]++;
        State["clickedState"] = null;
        UpdateTable();
        UpdateState();
        Previous_States.push(JSON.parse(JSON.stringify(State)));
        UpdatePreviousState();
    }
    // console.log(Previous_States);
}

function UpdatePreviousState(){
    let container=document.getElementById("prev_state");
    container.innerHTML = "";
    for(let i=Previous_States.length-1;i>=0;i--){
        let state = Previous_States[i];
        let temp = []
        state["Ready"].forEach((process) => {
           temp.push(process.id) 
        });
        ready = "[ " + temp.join(",") + " ]";
        let running = state["Running"] == null ? "None" : state["Running"].id;
        temp = []
        state["Waiting"].forEach((process) => {
           temp.push(process.id) 
        });
        let waiting = "[ " + temp.join(",") + " ]";
        temp = []
        state["Terminated"].forEach((process) => {
           temp.push(process.id) 
        });
        terminated = "[ " + temp.join(",") + " ]";
        temp=[]
        state["Completed"].forEach((process) => {
           temp.push(process.id) 
        });
        completed = "[ " + temp.join(",") + " ]";
        map = state["Running"]!=null?state["Map"]["id"]+"->"+state["Map"]["run_time"]+":"+state["Map"]["burst_time"]:"";
        timer = state["Timer"]!=null?state["Timer"]:"None";
        let button = document.createElement("button");
        button.className = "collapsible";
        button.innerHTML = "Tick " + (i+1) + " State";
        button.onclick = createToggleFunction(i);
        container.appendChild(button);
        let table = document.createElement("table");
        table.className = "content";
        table.id = "state" + (i+1);
        table.innerHTML = '<tr>    <td class="ts_cell">Ready:</td>    <td class="ts_cell">'+ ready +'</td></tr><tr>    <td class="ts_cell">Waiting for I/O:</td>    <td class="ts_cell">'+waiting+'</td></tr><tr>    <td class="ts_cell">Terminated:</td>    <td class="ts_cell">'+terminated+'</td></tr><tr>    <td class="ts_cell">Completed:</td>    <td class="ts_cell">'+completed+'</td></tr><tr><tr>    <td class="ts_cell">cpu:</td>    <td class="ts_cell">'+running+'</td></tr><tr>    <td class="ts_cell">Map:</td>    <td class="ts_cell">'+map+'</td></tr><tr>    <td class="ts_cell">Timer:</td>    <td class="ts_cell">'+timer+'</td></tr><tr>    <td class="ts_cell">Scheduling policy:</td>    <td class="ts_cell">'+state["Policy"]+'</td></tr>';
        container.appendChild(table);
    }
}

function createToggleFunction(i){
    return function(){
        let content = document.getElementById("state" + (i+1));
        content.classList.toggle("content");
    }
}