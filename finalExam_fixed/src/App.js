import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Goals from './components/Goals';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Login</Link> | <Link to="/tasks">Tasks</Link> | <Link to="/goals">Goals</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login onLogin={() => setAuthenticated(true)} />} />
        <Route path="/tasks" element={authenticated ? <Tasks /> : <Navigate to="/" />} />
        <Route path="/goals" element={authenticated ? <Goals /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
