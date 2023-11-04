# Scheduling in OS
## Introdcution
By now you must have already realized that an Operating system (OS) is not a monolithic system and rather a complex and meticulous synchronization of various subsystems (Process Management subsytem, Memory management subsytem, I/O management subsystem etc..) that provide services to the user and applications. In the previous [Context Switching](https://virtual-labs.github.io/exp-context-switching-iiith/theory.html) experiment we have already seen Process Management sussystem, Error handling subsystem and I/O management subsystem working together to make a successful context switch between two processes.

Similar to that of context switching, the mechanism of **scheduling** is also a part of 'Process Management Subsystem'. However, while context switching is responsible to **store, restore and load** the new context on the Central Processing Unit (CPU), scheduling is responsible for **selecting** or handing the over the next process ready to be executed on the CPU. We will discuss more about this in the following sections.

## Scheduling and Scheduler

Before diving into the topic of scheduling, let us first clearly understand what scheduling and scheduler means. 

**Scheduling** is the overall concept and process of determining the order in which processes or tasks are executed on the CPU. It encompasses the strategies and algorithms used to make decisions about when and for how long each process runs on the CPU. It ensures fairness, optimizing resource utilization, and achieving specific system performance goals.

**Scheduler** is the actual *software entity* responsible for executing the software policies defined by the OS. The scheduler code is implemented as a part of the kernel code.

-----------------
### Key aspects of scheduling include:

* Process Prioritization: Each process is assigned a priority or a scheduling class, which determines its relative importance in the scheduling algorithm.

* Scheduling Algorithms: Various scheduling algorithms, such as First-Come-First-Serve (FCFS), Round Robin, Priority Scheduling, and Shortest Job First (SJF), are used to decide which process should run next. These algorithms are responsible for making the actual scheduling decisions based on process priorities, runtimes, and other criteria.
