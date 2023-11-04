# Scheduling in OS
## Introdcution
By now you must have already realized that an Operating system is not a monolithic system and rather a complex and meticulous synchronization of various subsystems (Process Management subsytem, Memory management subsytem, I/O management subsystem etc..) that provide services to the user and applications. In the previous [Context Switching](https://virtual-labs.github.io/exp-context-switching-iiith/theory.html) experiment we have already seen Process Management sussystem, Error handling subsystem and I/O management subsystem working together to make a successful context switch between two processes.

Similar to that of context switching, the mechanism of **scheduling** is also a part of 'Process Management Subsystem'. However, while context switching is responsible to **store, restore and load** the new context on the Central Processing Unit (CPU), scheduling is responsible for **selecting** or handing the over the next process ready to be executed on the CPU. We will discuss more about this in the following sections.

## Scheduling and Scheduler

