### Link your theory in here\


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


