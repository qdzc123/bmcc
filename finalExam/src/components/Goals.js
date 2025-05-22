import React, { useState, useEffect } from 'react';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:4000/goals', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(setGoals);
  }, [token]);

  const addGoal = () => {
    fetch('http://localhost:4000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(goal => {
        setGoals([...goals, goal]);
        setText('');
      });
  };

  return (
    <div>
      <h2>Goals</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Goal text" />
      <button onClick={addGoal}>Add</button>
      <ul>
        {goals.map(goal => <li key={goal.id}>{goal.text}</li>)}
      </ul>
    </div>
  );
}

export default Goals;
