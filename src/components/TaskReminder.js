// TaskReminder.js
import { toast } from 'react-toastify';

export function checkTasksAndSendReminders(tasks) {
    const currentTime = new Date();
    // console.log(tasks);
    tasks.forEach(task => {
      const startDate = task.date || task.startDate; // Use 'date' if available, otherwise use 'startDate'
      const startTime = new Date(`${startDate} ${task.startTime}`);
      const timeDiff = startTime.getTime() - currentTime.getTime();
  
      if (timeDiff > 0 && timeDiff <= 600000) {
        const taskName = task.taskName || task.session; // Use 'taskName' if available, otherwise use 'session'
        toast(`Reminder: Task "${taskName}" starts in less than 10 minutes!`,{
          autoClose : 5000,
        });
      }
    });
}
