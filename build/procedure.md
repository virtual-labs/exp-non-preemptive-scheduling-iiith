### Procedure


1. Select the policy you want to simulate from the below:
* Round Robin
* Shortest Job First(Preemption,Non-preemption)
* First Come First Serve (Non-preemption)
2. We will receive a notification from the instruction box saying that there is a process that needs to be created along with that process's policy. We will click on the create process button  and also specify the index of the ready queue that you would want your process to be and it can be seen that a process has appeared in the ready queue.
2. Click on the Load button to send the process at the top of the ready queue to the CPU.
3. Once we are in the CPU we have 4 different options
* Click Advance_Clock:  We can advance the clock cycle by clicking this button.
* Click Preempt: We might receive an instruction saying that the process in the CPU needs to get preempted so we will have to push the process back to the running queue(to whatever index is specified by the user) by clicking this button.
* Click Go_to_I/O : If we receive an instruction saying the current process has I/O calls then we will need to push the process from the CPU to the I/O queue by clicking the button.
* Click Kill: Once the process is completed we will receive an instruction saying we need to kill the process as it is completed so now the process can be pushed to the completed process queue where it can no longer be accessed.
* Inside the I/O queue we will wait for the instruction saying the process can collect the data ,here we can click the Collect_data which will do so and then send the process back to the running queue at whichever index is specified by the user.

![exp2preempt](https://user-images.githubusercontent.com/110168104/198934532-c3dd6af1-397e-4cfe-aee1-7b6290a44607.jpeg)
