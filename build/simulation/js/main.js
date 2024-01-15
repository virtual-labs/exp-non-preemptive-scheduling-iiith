//Your JavaScript goes in here
let Previous_States = [];
let State = {
    "Ready":[],
    "Running":null,
    "Waiting":[],
    "Terminated":[],
    "Policy":"FCFS"
};

let id_counter = 1;
let time_counter = 0;

class Process{
    constructor(burst_time){
        this.burst_time = burst_time;
        this.map = [0,burst_time]
        this.id = id_counter;
        id_counter++;
    }
}

function CreateProcess(){
    let create_process_input = document.getElementById("Burst_time_value").value;
    document.getElementById("Burst_time_value").value = "";
    if(create_process_input == ""){
        alert("Please enter a valid number");
        return;
    }
    let create_process_input_int = parseInt(create_process_input);
    if(create_process_input_int < 1){
        alert("Please enter a valid number");
        return;
    }
    if(create_process_input_int > 30){
        alert("Please enter the burst time less than or equal to 30")
        return
    }
    let process = new Process(create_process_input_int);
    Previous_States.push(State);
    State["Ready"].push(process);
    UpdateState();
    UpdateTable();
    console.clear();
    console.log(Previous_States);
}

function UpdateTable(){
    let table = document.getElementById("ready_process")
    table.innerHTML = "<th>Process ID</th><th>Burst Time</th>";
    // console.log(table);
    State["Ready"].forEach((process) => {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = process.id;
        let cell2 = row.insertCell(1);
        cell2.innerHTML = process.burst_time;
    }
    );
}

function UpdateState(){
    let readyQueue= document.getElementById("rQ");
    let waitingQueue = document.getElementById("wQ");
    let TerminatedQueue = document.getElementById("tQ");
    let running = document.getElementById("cpu_p");
    let policy=document.getElementById("schd_p");
    readyQueue.innerHTML = "";
    temp = [];
    State["Ready"].forEach((process)=>{
        temp.push(process.id);
    })
    readyQueue.innerHTML = "[ "+temp.join(",")+" ]";
    waitingQueue.innerHTML = "";
    temp = [];
    State["Waiting"].forEach((process)=>{
        temp.push(process.id);
    })
    waitingQueue.innerHTML = "[ "+temp.join(",")+" ]";
    TerminatedQueue.innerHTML = "";
    temp = [];
    State["Terminated"].forEach((process)=>{
        temp.push(process.id);
    })
    TerminatedQueue.innerHTML = "[ "+temp.join(",")+" ]";
    running.innerHTML = "";
    if(State["Running"] == null){
        running.innerHTML = "None";
    }
    else{
        running.innerHTML = State["Running"].id;
    }
    policy.innerHTML = State["Policy"];
}

function Tick(){
    if(State["Policy"]=="FCFS"){
        FCFS();
    }
}

function FCFS(){
    if(State["Running"]==null){
        
    }
}