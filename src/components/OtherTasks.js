// OtherTasks.js
import React, { useState } from 'react';
import './OtherTasks.css';

function OtherTasks({ updateAllTasks }) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    session: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    subject: '',
    description: '',
    status: 'in progress',
  });

  const sessionOptions = ['conducted', 'attended', 'organised'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleTaskCompleted = () => {
    const existingTask = taskList.find(
      (t) => t.session === task.session && t.startDate === task.startDate
    );

    if (existingTask) {
      // If a task with the same session and start date exists, update its status
      const updatedTaskList = taskList.map((t) =>
        t === existingTask ? { ...t, status: task.status } : t
      );
      setTaskList(updatedTaskList);
      updateAllTasks(updatedTaskList);
    } else {
      // If no existing task is found, add a new task to the list
      const updatedTaskList = [...taskList, { ...task }];
      console.log(updatedTaskList);
      setTaskList(updatedTaskList);
      updateAllTasks(updatedTaskList);
    }

    // Reset the task state
    setTask({
      session: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      subject: '',
      description: '',
      status: 'in progress',
    });
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].status = newStatus;
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  };

  const handleTaskDelete = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  };

  return (
    <div className="other-tasks-container">
      <h2>Create Other Task</h2>
      <form>
        <div className="form-group">
          <label>Session:</label>
          <select
            name="session"
            value={task.session}
            onChange={handleInputChange}
          >
            <option value="">Select Session</option>
            {sessionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={task.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={task.endDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={task.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={task.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={task.subject}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleTaskCompleted}>
            Create Task ✓
          </button>
        </div>
      </form>
      <div className="task-list">
        <h3>Task List</h3>
        <ul>
          {taskList.map((taskItem, index) => (
            <li key={index}>
              <div>
                <strong>Session:</strong> {taskItem.session}
              </div>
              <div>
                <strong>Start Date:</strong> {taskItem.startDate}
              </div>

              <div>
                <strong>End Date:</strong> {taskItem.endDate}
              </div>

              <div>
                <strong>Start Time:</strong> {taskItem.startTime}
              </div>
              <div>
                <strong>End Time:</strong> {taskItem.endTime}
              </div>
              <div>
                <strong>Subject:</strong> {taskItem.subject}
              </div>
              <div>
                <strong>Description:</strong> {taskItem.description}
              </div>
              <div>
                <strong>Status:</strong> {taskItem.status}
              </div>
              <span
                role="img"
                aria-label="Completed"
                onClick={() => handleStatusChange(index, 'completed')}
              >
                ✅
              </span>
              <span
                role="img"
                aria-label="Not Completed"
                onClick={() => handleStatusChange(index, 'not completed')}
              >
                ❌
              </span>
              <span
                role="img"
                aria-label="In Progress"
                onClick={() => handleStatusChange(index, 'in progress')}
              >
                🔄
              </span>
              <span
                role="img"
                aria-label="Update"
                onClick={() => console.log('Update task')}
              >
                ✏️
              </span>
              <span
                role="img"
                aria-label="Delete"
                onClick={() => handleTaskDelete(index)}
              >
                🗑️
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OtherTasks;
