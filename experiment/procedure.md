### Procedure
We will be covering these policies in the case of priority:
* Round Robin
* Shortest Job First(Preemption,Non-preemption)
* First Come First Serve (Non-preemption)

### Controls:
* Create
* Advance Clock
* Load
* Go_to_I/O
* Kill
* Preempt
* Collect data

![Screenshot from 2022-11-09 09-37-53](https://user-images.githubusercontent.com/110168104/200736401-af3fde1b-98fb-42c4-9c33-4f62d9cb1eea.png)

### Component List:
* Policy selector drop down
* Instruction box
* Ready queue
* CPU
* I/O queue
* Completed queue
* Controls

### Procedure:

1. Select the policy you want to simulate from the below:
   * Round Robin
   * Shortest Job First(Preemption,Non-preemption)
   * First Come First Serve (Non-preemption)
2. You will receive a notification from the instruction box saying that there is a process that needs to be created along with that process's policy.You will click on the create process button  and also specify the index of the ready queue that you would want your process to be and it can be seen that a process has appeared in the ready queue.
3. Click on the Load button to send the process at the top of the ready queue to the CPU.
4. Once you are in the CPU you have 4 different options
   * Click Advance_Clock:  You can advance the clock cycle by clicking this button.
   * Click Preempt: You might receive an instruction saying that the process in the CPU needs to get preempted so you will have to push the process back to the running queue(to whatever index is specified by the user) by clicking this button.
   * Click Go_to_I/O : If we receive an instruction saying the current process has I/O calls then you will need to push the process from the CPU to the I/O queue by clicking the button.
   * Click Kill: Once the process is completed you will receive an instruction saying you need to kill the process as it is completed so now the process can be pushed to the completed process queue where it can no longer be accessed.
5. Inside the I/O queue you will wait for the instruction saying the process can collect the data ,here you can click the Collect_data which will do so and then send the process back to the running queue at whichever index is specified by the user.

* Process has both the PID and the Priority:1,2,3
* Keep in mind that the preemption button should be conciously avoided if you have chosen to execute a non preemptive algorithm
