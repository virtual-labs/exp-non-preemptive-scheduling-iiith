//Your JavaScript goes in here
let Previous_States = [];
let State = {
    "Ready":[],
    "Running":null,
    "Waiting":[],
    "Terminated":[],
    "Map":{"id":null,"run_time":null,"burst_time":null},
    "Policy":"FCFS"
};

let id_counter = 1;
let time_counter = 0;

class Process{
    constructor(burst_time){
        this.burst_time = burst_time;
        this.mapping = {"run_time":0,"burst_time":burst_time}
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
    let map=document.getElementById("map");
    let timer = document.getElementById("timer");
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
        map.innerHTML = "";
    }
    else{
        running.innerHTML = State["Running"].id;
        map.innerHTML = State["Running"].id + "->" + State["Running"].mapping["run_time"] + ":" + State["Running"].mapping["burst_time"];
        
    }
    policy.innerHTML = State["Policy"];
    timer
    
}

function Tick(){
    if(State["Running"]==null){
        SchedulePolicy();
    }
}

function FCFS(){
    if(State["Running"]==null){
        if(State["Ready"].length==0){
            return;
        }
        State["Running"] = State["Ready"][0];
        console.log(State["Running"]);
        State["Ready"].shift();
        time_counter++;
        State["Running"].mapping["run_time"]++;
        UpdateState();
        UpdateTable();
    }
    else{
        if(State["Running"].mapping["run_time"] == State["Running"].mapping["burst_time"]){
            State["Terminated"].push(State["Running"]);
            State["Running"] = null;
            UpdateState();
            UpdateTable();
        }
        else{
            time_counter++;
            State["Running"].mapping["run_time"]++;
            UpdateState();
            UpdateTable();
        }
}
}