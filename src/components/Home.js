// Home.js

import React, { useState } from 'react';
import './Home.css';

// Below importing is done to show the dropdown below the task list i.e completed , not completed,in progress
import TaskCategoryDropdown from './TaskCategoryDropdown';

function Home({ updateAllTasks }) {

  const [tasks, setTasks] = useState([]);

  //task form is object used to store the form field.Initially all are empty and can be changed via setTaskForm 
  // variable

  const [taskForm, setTaskForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
    date: '',
    subject: '',
    batch: '',
    class: '',
    description: '',
  });

  function handleTaskFormChange(event) {
    const { name, value } = event.target;
    setTaskForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleCreateTask() {
    const newTask = {
      id: tasks.length + 1,
      ...taskForm,
      status: 'Not Completed',
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskForm({
      name: '',
      startTime: '',
      endTime: '',
      date: '',
      subject: '',
      batch: '',
      class: '',
      description: '',
    });

    updateAllTasks(newTask);
  }

  function handleTaskAction(taskId, action) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: action } : task
    );
    setTasks(updatedTasks);
    updateAllTasks(updatedTasks.find((task) => task.id === taskId));
  }

  // Filter tasks based on their status
  const completedTasks = tasks.filter((task) => task.status === 'Completed');
  const incompleteTasks = tasks.filter((task) => task.status === 'Not Completed');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');

  return (
    <div className="home-container">
      <h2>Create Task</h2>
      <form className="task-form">
        <label>
          Task Name:
          <input type="text" name="name" value={taskForm.name} onChange={handleTaskFormChange} />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={taskForm.startTime} onChange={handleTaskFormChange} />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={taskForm.endTime} onChange={handleTaskFormChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={taskForm.date} onChange={handleTaskFormChange} />
        </label>
        <label>
          Subject:
          <input type="text" name="subject" value={taskForm.subject} onChange={handleTaskFormChange} />
        </label>
        <label>
          Batch:
          <input type="text" name="batch" value={taskForm.batch} onChange={handleTaskFormChange} />
        </label>
        <label>
          Class:
          <input type="text" name="class" value={taskForm.class} onChange={handleTaskFormChange} />
        </label>
        <label>
          Task Description:
          <textarea name="description" value={taskForm.description} onChange={handleTaskFormChange}></textarea>
        </label>
        <button type="button" onClick={handleCreateTask}>
          Create Task
        </button>
      </form>

      <div className="task-list">
        <h3>Task List</h3>

        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div>
              <strong>{task.name}</strong> - {task.startTime} to {task.endTime} on {task.date} - {task.subject} - {task.batch} - {task.class}
            </div>
            <div>{task.description}</div>
            <div>Status: {task.status}</div>
            <div className="task-icons">
              <span onClick={() => handleTaskAction(task.id, 'Completed')}>✅</span>
              <span onClick={() => handleTaskAction(task.id, 'Not Completed')}>❌</span>
              <span onClick={() => handleTaskAction(task.id, 'In Progress')}>🔄</span>
              <span onClick={() => handleTaskAction(task.id, 'Review')}>🗑️</span>
            </div>
          </div>
        ))}
        
      </div>

      <TaskCategoryDropdown categoryTitle="Completed Tasks" tasks={completedTasks} onTaskAction={handleTaskAction} />
      <TaskCategoryDropdown categoryTitle="Incomplete Tasks" tasks={incompleteTasks} onTaskAction={handleTaskAction} />
      <TaskCategoryDropdown categoryTitle="In Progress Tasks" tasks={inProgressTasks} onTaskAction={handleTaskAction} />
    </div>
  );
}

export default Home;
