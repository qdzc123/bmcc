import React, { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:4000/tasks', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(setTasks);
  }, [token]);

  const addTask = () => {
    fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(task => {
        setTasks([...tasks, task]);
        setTitle('');
      });
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => <li key={task.id}>{task.title}</li>)}
      </ul>
    </div>
  );
}

export default Tasks;
