import React,  { useEffect } from 'react'
import './EntryPage.css'
import { checkTasksAndSendReminders } from "./TaskReminder";

export default function EntryPage() {

  useEffect(() => {
    const fetchTasksAndSendReminders = async () => {
      try {
        const response = await fetch('http://localhost:8000/getTasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        } 
        const tasks = await response.json();
        // console.log(tasks);
        // Call the function to check tasks and send reminders
        checkTasksAndSendReminders(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Call the function to fetch tasks and send reminders
    fetchTasksAndSendReminders();

    // Set up the interval to check tasks and send reminders every minute
    const reminderInterval = setInterval(fetchTasksAndSendReminders, 600000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(reminderInterval);
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="heading">
      <h4>Here the frequent tasks list is to be included and this will be our Home Page/Entry page after the user
        logs In
      </h4>
    </div>
  )
}
