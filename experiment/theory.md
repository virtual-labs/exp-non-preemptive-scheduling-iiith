# Scheduling in OS
## Introduction 
By now you must have already realized that an Operating system (OS) is not a monolithic system and rather a complex and meticulous synchronization of various subsystems (Process Management subsytem, Memory management subsytem, I/O management subsystem etc..) that provide services to the user and applications. In the previous [Context Switching](https://virtual-labs.github.io/exp-context-switching-iiith/theory.html) experiment we have already seen Process Management sussystem, Error handling subsystem and I/O management subsystem working together to make a successful context switch between two processes.

Similar to that of context switching, the mechanism of **scheduling** is also a part of 'Process Management Subsystem'. However, while context switching is responsible to **store, restore and load** the new context on the Central Processing Unit (CPU), scheduling is responsible for **selecting** or handing the over the next process ready to be executed on the CPU. We will discuss more about this in the following sections.

## Scheduling and Scheduler

Before diving into the topic of scheduling, let us first clearly understand what scheduling and scheduler means. 

**Scheduling** is the overall concept and process of determining the order in which processes or tasks are executed on the CPU. It encompasses the strategies and algorithms used to make decisions about when and for how long each process runs on the CPU. It ensures fairness, optimizing resource utilization, and achieving specific system performance goals.

**Scheduler** is the actual *software entity* responsible for executing the software policies defined by the OS. The scheduler code is implemented as a part of the kernel code.

> Note: The objective of this experiment is to understand process of scheduling and we won't go into in-depth analysis of the scheduling algorithms used by the operating systems.

-----------------

### The scheduler performs the following tasks:

* **Selecting Processes:** It decides which process from the pool of ready processes should be granted access to the CPU. The specific scheduling algorithm used determines the selection criteria.

* **Enforcing Priorities:** If priority-based scheduling is in use, the scheduler ensures that higher-priority processes are given precedence over lower-priority ones.

* **Allocating CPU Time:** The scheduler determines how much CPU time each process is allowed to use. In a preemptive scheduling system, it can interrupt the currently running process to allocate CPU time to a higher-priority process.

* **Managing the Ready Queue:** It maintains a ready queue or a list of processes that are in a state to execute and selects processes from this queue for execution.

> **Note:** Context switching is not a subpart of scheduling or a job done by the scheduler. It is an independent mechanism which aids the OS to implement the decision (which process to run next) made by the scheduler.

## Why do we need scheduling?

We now have a basic understanding of what scheduler is. But why is it important in process management? 

Almost all programs have some alternating cycle of CPU usage and waiting for I/O of some kind.
In a simple system running a single process, the time spent waiting for I/O is wasted, and those CPU cycles are lost forever. A scheduling system allows one process to use the CPU while another is waiting for I/O, thereby making full use of otherwise lost CPU cycles.

**CPU-I/O Burst Cycle**

Almost all processes alternate between two important time periods in a continuing cycle:
* A CPU burst (running state) of performing calculations, and
* An I/O burst (waiting state), waiting for data transfer in or out of the system.

There is also a ready state where the process is ready to use the CPU resources but let us just look at how the process execution flow looks like if no other process is allowed to compete for the CPU resources before the current process executes till it's completion. Below figure shows a simple alternating CPU and I/O burst cycle.

![CPU I/O Burst cycle](./images/CPU_IO_cycle.png)

Let us have a deeper look at this CPU-I/O burst cycles. Use the below command and run it on your linux machine to get a deeper view of how processes utilize I/O systems and CPU.
```
iostat
```
In case the above command is not found on your system, then first install it using `sudo apt install sysstat` and then run the above command again.

The `iostat` command displays two reports. CPU utilization report and Device utilization report.

**CPU Utilization Report**

For multiprocessor systems, the CPU values are global averages among all processors. Below is a CPU utilization report generated on a linux machine.

![cpu utilization report](./images/cpu_report.png)

What does the above report indicate?

<table>
  <tr>
    <td>%user</td>
    <td>Percentage of CPU utilization while executing at user level.</td>
  </tr>
  <tr>
    <td>%nice</td>
    <td>Percentage of CPU utilization while executing at user level with nice priority.</td>
  <tr>
    <td>%system</td>
    <td>Percentage of CPU utilization while executing at kernel level.</td>
  </tr>
  <tr>
    <td>%iowait</td>
    <td>Percentage of time that the CPU or CPUs were idle due to an I/O request.</td>
  </tr>
  <tr>
    <td>%steal</td>
    <td>-</td>
  <tr>
    <td>%idle</td>
    <td>Percentage of time that the CPU or CPUs on idle time (no processes, and not waiting on a disk read/write).</td>
  </tr>
</table>

**Device Utilization report**

A loop device is a virtual or pseudo-device in Unix-like operating systems that allows a computer file to be accessed as a block device. A loop device maps its data blocks to the blocks of a regular file in a filesystem or to another block device.

### Step-by-step flow of scheduling mechanism
Some processes demand immediate attention by the OS (Example: Interrupts). The currently running process on the CPU, no matter whether it is a user process or a kernel process, will be replaced by the interrupt handler to deal with the interrupt. 

You might think that the process will resume it's execution after the CPU executes the interupt handler. Yes, its true! But the resumption of the process execution doesn't necessarily happen immediately after interrupt handling. 

The previous process, let's say 'P', when swapped out of the CPU, goes and waits in the ready queue for the CPU to handle the interrupt. And this ready queue doesn't contain only one process 'P' waiting in it. There are many other programs waiting for the CPU. This is where the **scheduler** comes into play. Whenever the CPU becomes idle, it is the job of the CPU Scheduler ( a.k.a. the short-term scheduler ) to select another process from the ready queue to run next. It manages the ready queue, i.e., it lines up all the processes waiting in a queue using the scheduling algorithm defined by the OS and rearranges the queue in such a way that the first index of the queue is the next process to be executed on the CPU. There are various algorithms that the OS prefers to prioritize one process over another. They will be discussed in later sections.

> Note: As we have mentioned previously, scheduling only a concept and scheduler is the one that implements it. And scheduler is a software module and it has to run on the CPU to schedule the processes in the ready queue.

There are two major kinds of scheduling, preemptive and non-preemptive. But before that, there are few terminologies we need to be familiar with.
Almost all programs have some alternating cycle of CPU number crunching and waiting for I/O of some kind. ( Even a simple fetch from memory takes a long time relative to CPU speeds. )
In a simple system running a single process, the time spent waiting for I/O is wasted, and those CPU cycles are lost forever.

* **Burst Time:** 
## Types of scheduling

**Non-preemptive scheduling:** The simplest case of process execution is where the processes run till completion. Then the scheduler runs on the CPU and chooses the earliest arriving process. This is basically the **first-come-first-serve (FCFS)** idea. In this kind of process, there is no chance that any arrival of a new process can halt the current process's execution and replace it. Every new incoming process has to wait in the ready queue before the scheduler finally permits it to use the CPU. This kind of scheduling is called non-preemptive scheduling. Few other examples of non-preemptive scheduling are Shortest-job first(SJF) and Priority scheduling.

-------------

**Preemptive scheduling:** Preemptive cpu scheduling algorithms may take the cpu away from a running process BEFORE it has finished its current cpu burst.


