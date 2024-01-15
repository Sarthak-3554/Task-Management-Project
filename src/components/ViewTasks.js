// ViewTasks.js

import React, { useState } from 'react';
import './ViewTasks.css';

function ViewTasks({ taskList }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterTasks = () => {
    return taskList.filter((task) => {
      const isDateMatch = selectedDate ? task.taskDate === selectedDate : true;
      const isCategoryMatch =
        selectedCategory ? task.status === selectedCategory : true;

      return isDateMatch && isCategoryMatch;
    });
  };

  return (
    <div className="view-tasks-container">
      <h2>View Tasks</h2>
      <div className="filters-container">
        <div className="filter">
          <label>Select Date:</label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="filter">
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>
      <div className="task-list">
        {filterTasks().map((task, index) => (
          <div key={index} className="task-item">
            <div>
              <strong>Date:</strong> {task.taskDate}
            </div>
            <div>
              <strong>Start Time:</strong> {task.startTime}
            </div>
            <div>
              <strong>End Time:</strong> {task.endTime}
            </div>
            <div>
              <strong>Description:</strong> {task.description}
            </div>
            {/* Render additional task details */}
            <div>
              <strong>Status:</strong> {task.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTasks;
