// PersonalTasks.js

import React, { useState } from 'react';
import './PersonalTasks.css';

function PersonalTasks({ updateAllTasks }) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    taskName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    status: 'in progress',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleTaskCompleted = () => {
    const updatedTaskList = [...taskList, { ...task }];
    console.log(updatedTaskList);
    setTaskList(updatedTaskList);
    setTask({
      taskName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
      status: 'in progress',
    });

    updateAllTasks(updatedTaskList);
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
    <div className="personal-task-container">
      <h2>Create Personal Task</h2>
      <form>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={task.taskName}
            onChange={handleInputChange}
          />
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
        {taskList.map((taskItem, index) => (
          <div key={index} className="task-item">
            <div>
              <strong>Task Name:</strong> {taskItem.taskName}
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
              aria-label="Delete"
              onClick={() => handleTaskDelete(index)}
            >
              🗑️
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalTasks;
