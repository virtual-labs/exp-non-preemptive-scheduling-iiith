
## Why do we need CPU scheduling?
Essentially the purpose of CPU scheduling is to enable multiprocessing by switching the CPU among the processes which makes the computer more productive

In a single processor system we can only run one process at a time and any other process has to wait until the CPU is free.

The main purpose of multi processing is to have some process running at all times so that we are maximizing the computers efficiency

Typically in a single processing system we need to execute the process and even wait for that process to answer I/O calls and wait for these requests to be completed. In this case the CPU would sit idle during this whole process.
But in multiprocessing we put multiple processes in the memory and when one process has to wait the OS pushes forward another process for execution.


## CPU and I/O bursts:
Essentially processes that are being executed shift between the
* CPU execution: when the process is being executed by the CPU
* I/O bursts: when CPU is waiting for the I/O for further execution
These two stages happen in cycles continuously until the process is completed

## CPU scheduler:

* CPU Scheduler: Essentially when the CPU is idle,the OS is supposed to select another process to execute,this is done by the CPU scheduler. Essentially the scheduler chooses a process ready for execution in the memory and allocated the CPU to it

* CPU scheduling makes selections if one of the below situations happens:
  - If the process goes from running -> wait
  - If the process goes from running -> ready
  - If the process goes from waiting -> ready
  - If the process goes from running -> kill

* CPU scheduling can happen in 2 ways:
  - Preemption
  - Non preemption

### Preemption:
Here we give the CPU limited time slots or quantum to execute each process. Meaning the process might not be completely executed before it gets preempted back into the ready state.
### Non preemption:
Here the process holds onto the CPU until its execution gets completed. This means that unless the process gets an I/O call it won't leave the CPU.

### First come first serve (FCFS):
This algorithm simply schedules the process according to their arrival time. The process which comes first in the ready queue will get the CPU first. The lesser the arrival time of the process, the sooner the process will get the CPU. 

### Shortest Job First(SJF):
However, the SJF scheduling algorithm schedules the processes according to their burst time. The process with the lowest burst time, among the list of available processes in the ready queue, is going to be scheduled next.

### Round Robin(RR):
Round Robin scheduling algorithm is one of the most popular scheduling algorithms which can actually be implemented in most of the operating systems. This is the preemptive version of first come first serve scheduling. The Algorithm focuses on Time Sharing. In this algorithm, every process gets executed in a cyclic way. A certain time slice is defined in the system which is called time quantum. Each process present in the ready queue is assigned the CPU for that time quantum, if the execution of the process is completed during that time then the process will terminate else the process will go back to the ready queue and waits for the next turn to complete the execution.



