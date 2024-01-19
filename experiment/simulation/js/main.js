
//Your JavaScript goes in here
let Previous_States = [];
let State = {
    "Ready":[],
    "Running":null,
    "Waiting":[],
    "Terminated":[],
    "Completed": [],
    "Map":{"id":null,"run_time":null,"burst_time":null},
    "Timer":null,
    "Policy":"FCFS",
    "clickedState":null,
    "time_counter":0
};

let id_counter = 1;

for (i=0;i<Previous_States.length;i++){
    console.log(Previous_States[i]);
}

class Process{
    constructor(burst_time, status){
        this.burst_time = burst_time;
        this.status = status;
        this.mapping = {"run_time":0,"burst_time":burst_time}
        this.id = id_counter;
        id_counter++;
    }
}

function loadUnloadCommand(cmd){
    if(cmd=="schedule"){
        if(State["clickedState"] == "schedule"){
            State["clickedState"] = null;
            UpdateState();
        }
        else if(State["clickedState"] == null){
        State["clickedState"] = "schedule";
            schd_btn = document.getElementById("schd-btn");
            schd_btn.classList.add("btn-loaded");
            // console.log(schd_btn.classList)
        }
        else {
            alert("Please complete the previous command first or unselect it")
        }
    }
    if(cmd=="newProcess"){
        if(State["clickedState"] == "newProcess"){
            State["clickedState"] = null;
            newProcess_btn = document.getElementById("newProcess-btn");
            newProcess_btn.classList.remove("btn-loaded");
        }
        else if(State["clickedState"] == null){
        State["clickedState"] = "newProcess";
        UpdateState();
        }
        else {
            alert("Please complete the previous command first or unselect it")
        }
    }
}

function newProcess() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function CreateProcess(){
    let create_process_input = document.getElementById("burstTime").value;
    document.getElementById("burstTime").value = "";
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
    let process = new Process(create_process_input_int, "Ready");
    Previous_States.push(State);
    State["Ready"].push(process);
    UpdateState();
    UpdateTable();
    newProcess();
}

function UpdateTable(){
    let table = document.getElementById("processes")
    table.innerHTML = "<th>Process ID</th><th>Burst Time</th><th>Remaining time</th><th>Status</th>";
    // console.log(table);
    if(State["Running"] != null) {
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
        cell4.className = "tag-blue";
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
        cell4.className = "tag-grey";
    }
    );
}

function schedule(){
    if(State["Running"] == null) {
        let cpuTable = document.getElementById("CPU")
        let readyTable = document.getElementById("processes")
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
            State["Running"].status = "Running";
            // UpdateState();
        }
        UpdateTable();
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
    let ticker = document.getElementById("ticker");
    let schd_btn = document.getElementById("schd-btn");
    let newProcess_btn = document.getElementById("newProcess-btn");
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
    timer.innerHTML = State["Timer"];
    policy.innerHTML = State["Policy"];
    ticker.innerHTML = State["time_counter"];
    if(State["clickedState"] == "schedule"){
        schd_btn.classList.add("btn-loaded");
    }
    else if(State["clickedState"] == "newProcess"){
        newProcess_btn.classList.add("btn-loaded");
    }
    else if(State["clickedState"] == null){
        schd_btn.classList.remove("btn-loaded");
        newProcess_btn.classList.remove("btn-loaded");
    }
    
}

function Schedule(){
    if(State["Policy"]=="FCFS"){
        FCFS();
    }
    else{
        State["Running"].mapping["run_time"]++;
        State["Timer"]--;
        UpdateState();
        UpdateTable();
        if(State["Running"].mapping["burst_time"] == State["Running"].mapping["run_time"]){
            State["Completed"].push(State["Running"]);
            alert("Process "+State["Running"].id+" Completed");
            State["Running"] = null;
            State["Timer"] = null;
            UpdateState();
            UpdateTable();
            SchedulePolicy();
        }
        else if(State["Timer"] == 0){
            State["Ready"].push(State["Running"]);
            State["Running"] = null;
            State["Timer"] = null;
            alert("Timer Interrupt Occured");
            SchedulePolicy();
        }
        
    }
    
}

function SchedulePolicy(){
    if(State["Policy"]=="FCFS"){
        FCFS();
    }
    else if(State["Policy"]=="SJF"){
        SJF();
    }
    else if(State["Policy"]=="Priority"){
        Priority();
    }
    else if(State["Policy"]=="Round Robin"){
        RoundRobin();
    }
}

function FCFS(){
    if(State["Running"]==null){
        if(State["Ready"].length==0){
            return;
        }
        schedule();
        UpdateState();
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

function Terminate( n = 1 ){
    if(State["Running"] != null) {
        let cpuTable = document.getElementById("CPU")
        tmp = State["Running"];
        if(n==1){
            tmp.status = "Terminated";
            State["Terminated"].push(tmp)
        }
        else {
            tmp.status = "Completed";
            State["Completed"].push(tmp)
        }
        State["Running"] = null;
        cpuTable.deleteRow(0);
        cpuTable.deleteRow(0);            
    }
    UpdateTable();
}

function Tick() {
    if(State["clickedState"] == null){
    if(State["Running"]!=null){
        State["time_counter"]++;
        let ticker = document.getElementById("ticker");
        ticker.innerHTML = State["time_counter"];
        State["Running"].mapping["run_time"]++;
        State["Running"].mapping["burst_time"];
        let cpuTable = document.getElementById("CPU")
        cpuTable.rows[1].cells[1].innerHTML = State["Running"].mapping["burst_time"];
        cpuTable.rows[1].cells[2].innerHTML = State["Running"].mapping["run_time"];
        
        if(State["Running"].mapping["burst_time"]==State["Running"].mapping["run_time"]){
            Terminate(0);
        }
        UpdateTable();
    }
    
    UpdateState();
}
if(State["clickedState"] == "newProcess"){
    CreateProcess();
    State["time_counter"]++;
    State["clickedState"] = null;
    newProcess();
    UpdateTable();
    UpdateState();
}
if(State["clickedState"] == "schedule"){
    schedule();
    State["time_counter"]++;
    State["clickedState"] = null;
    newProcess();
    UpdateTable();
    UpdateState();
}

}