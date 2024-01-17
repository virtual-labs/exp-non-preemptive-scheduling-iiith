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

function schedule(){
    if(State["Running"] == null) {
        let cpuTable = document.getElementById("CPU")
        let readyTable = document.getElementById("ready_process")
        if(State["Ready"].length!=0){
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
            tmp = State["Ready"][0];
            State["Running"] = tmp;
            
            State["Ready"].shift();

            // Delete first two rows of readyTable
            readyTable.deleteRow(0);
            readyTable.deleteRow(0);
            if(State["Ready"].length!=0){
                let readyRow = readyTable.insertRow(0);
                readyRow.innerHTML  = "<th>Process ID</th><th>Burst Time</th>";
            }
            UpdateState();
        }
    }
    
}

function UpdateState(){
    let readyQueue= document.getElementById("rQ");
    let waitingQueue = document.getElementById("wQ");
    let TerminatedQueue = document.getElementById("tQ");
    let running = document.getElementById("cpu_p");
    let policy=document.getElementById("schd_p");
    let map=document.getElementById("map");
    let timer=document.getElementById("timer");
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
    timer.innerHTML = time_counter;
    policy.innerHTML = State["Policy"];
    
}

function Schedule(){
    if(State["Policy"]=="FCFS"){
        FCFS();
    }
}

function FCFS(){
    if(State["Running"]==null){
        if(State["Ready"].length==0){
            return;
        }
        schedule();
    }
}

function ContextSwitch(){
    if(State["Running"]!=null){
        State["Waiting"].push(State["Running"]);
        State["Running"] = null;
        UpdateState();
        UpdateTable();
    }
}

function Terminate(){
    if(State["Running"] != null) {
        let cpuTable = document.getElementById("CPU")
        let table = document.getElementById("terminated_process")
        table.innerHTML = "<th>Process ID</th><th>Burst Time</th>";
        tmp = State["Running"];
        State["Terminated"].push(tmp)
        State["Terminated"].forEach((process) => {
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);
            cell1.innerHTML = process.id;
            let cell2 = row.insertCell(1);
            cell2.innerHTML = process.burst_time;
        }
        );   
        State["Running"] = null;
        cpuTable.deleteRow(0);
        cpuTable.deleteRow(0);            
    }
}

function Tick() {
    
    if(State["Running"]!=null){
        time_counter++;
        State["Running"].mapping["run_time"]++;
        State["Running"].mapping["burst_time"]--;
        let cpuTable = document.getElementById("CPU")
        // Update the second and third cells of the second row of cpuTable
        cpuTable.rows[1].cells[1].innerHTML = State["Running"].mapping["burst_time"];
        cpuTable.rows[1].cells[2].innerHTML = State["Running"].mapping["run_time"];
        
        if(State["Running"].mapping["burst_time"]==0){
            Terminate();
        }
        UpdateState();
    }
    
    UpdateState();
}

