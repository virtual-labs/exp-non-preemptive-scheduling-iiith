### Link your theory in here\


## Why do we need CPU scheduling?
Essentially the purpose of CPU scheduling is to enable multiprocessing by switching the CPU among the processes which makes the computer more productive

In a single processor system we can only run one process at a time and any other process has to wait until the CPU is free.

The main purpose of multi processing is to have some process running at all times so that we are maximizing the computers efficiency

Typically in a single processing system we need to execute the process and even wait for that process to answer I/O calls and wait for these requests to be completed. In this case the CPU would sit idle during this whole process.
But in multiprocessing we put multiple processes in the memory and when one process has to wait the OS pushes forward another process for execution.


