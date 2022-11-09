export { Process, initialize_processes };

interface IOTime {
    start_time: number
    ticks: number
}

interface Process {
    id: number
    start_time: number
    io: IOTime
    ticks: number
    cur_ticks: number
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function create_process(id: number): Process {
    const ticks: number = getRandomInt(2, 5);
    return {
        "id": id,
        "ticks": ticks,
        "start_time": getRandomInt(0, 10),
        "cur_ticks": 0,
        "io": {
            "start_time": getRandomInt(1, ticks - 1),
            "ticks": getRandomInt(1, 3)
        }
    }
}

function initialize_processes(n: number): Process[] {
    let processes = [];
    for (let i = 0; i < n; i++) {
        processes.push(create_process(i));
    }
    processes.sort((p1, p2) => p1.start_time - p2.start_time);
    return processes;
}
