// App.js

import React, { useState } from 'react';
import EntryPage from './components/EntryPage.js';
import Home from './components/Home.js';
import ViewTasks from './components/ViewTasks.js';
import TechnicalTasks from './components/TechnicalTasks.js';
import OtherTasks from './components/OtherTasks.js';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [allTasks, setAllTasks] = useState([]);

  const updateAllTasks = (newTask) => {
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/entry-page" element={<EntryPage />} />
          <Route
            path="/view-tasks"
            element={<ViewTasks taskList={allTasks} />}
          />
          <Route
            path="/create-task"
            element={<Home updateAllTasks={updateAllTasks} />}
          />
          <Route
            path="/technical-tasks"
            element={<TechnicalTasks updateAllTasks={updateAllTasks} />}
          />
          <Route
            path="/other-tasks"
            element={<OtherTasks updateAllTasks={updateAllTasks} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
