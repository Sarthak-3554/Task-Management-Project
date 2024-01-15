// TechnicalTasks.js

import React, { useState } from 'react';
import './TechnicalTasks.css';

function TechnicalTasks({ updateAllTasks }) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    technicalTask: '',
    taskDate: '',
    startTime: '',
    endTime: '',
    description: '',
    status: 'in progress',
  });

  const technicalTaskOptions = Array.from({ length: 19 }, (_, i) => `abc${i + 1}`);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleTaskCompleted = () => {
    setTaskList([...taskList, { ...task }]);
    setTask({
      technicalTask: '',
      taskDate: '',
      startTime: '',
      endTime: '',
      description: '',
      status: 'in progress',
    });

    updateAllTasks({ ...task, status: 'completed' });
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].status = newStatus;
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList[index]);
  };

  const handleTaskDelete = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    updateAllTasks(updatedTaskList);
  };

  return (
    <div className="technical-tasks-container">
      <h2>Create Technical Task</h2>
      <form>
        <div className="form-group">
          <label>Technical Task:</label>
          <select
            name="technicalTask"
            value={task.technicalTask}
            onChange={handleInputChange}
          >
            <option value="">Select Technical Task</option>
            {technicalTaskOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Task Date:</label>
          <input
            type="date"
            name="taskDate"
            value={task.taskDate}
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
        <ul>
          {taskList.map((taskItem, index) => (
            <li key={index}>
              <div>
                <strong>Technical Task:</strong> {taskItem.technicalTask}
              </div>
              <div>
                <strong>Task Date:</strong> {taskItem.taskDate}
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

export default TechnicalTasks;
