import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:8000';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  // fetch all todos when page loads
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Could not connect to server. Make sure backend is running!');
    }
    setLoading(false);
  };

  const addTodo = async () => {
    if (inputText.trim() === '') {
      alert('Please enter something!');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputText, due_date: dueDate, due_time: dueTime }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setInputText('');
      setDueDate('');
      setDueTime('');
    } catch (err) {
      alert('Error adding todo');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
      });
      const updated = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert('Error updating todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      alert('Error deleting todo');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const formatDue = (date, time) => {
    const parts = [];
    if (date) parts.push(new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
    if (time) {
      const [h, m] = time.split(':');
      const d = new Date();
      d.setHours(h, m);
      parts.push(d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    }
    return parts.join(' · ');
  };

  return (
    <div className="page">
      <div className="card">

        {/* Header */}
        <div className="header">
          <div className="header-icon">✅</div>
          <h1>My Tasks</h1>
          <p>Keep track of everything you need to do</p>
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="progress-section">
            <div className="progress-header">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-num">{todos.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card green">
            <span className="stat-num">{completedCount}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-card orange">
            <span className="stat-num">{todos.length - completedCount}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        {/* Add Task Input */}
        <div className="add-section">
          <div className="input-row">
            <input
              type="text"
              placeholder="What do you need to do?"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="main-input"
            />
            <button onClick={addTodo} className="add-btn" disabled={!inputText.trim()}>
              + Add
            </button>
          </div>
          <div className="datetime-row">
            <div className="dt-field">
              <label>📅 Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="dt-input"
              />
            </div>
            <div className="dt-field">
              <label>🕐 Due Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="dt-input"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`tab-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="loading">Loading your tasks...</div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">🗂️</span>
                <p>{filter === 'completed' ? 'Nothing completed yet!' : 'No tasks here. Add one!'}</p>
              </div>
            )}
            {filteredTodos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
                <button
                  className={`custom-check ${todo.completed ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                  title="Toggle complete"
                >
                  {todo.completed && '✓'}
                </button>
                <div className="todo-body">
                  <span className="todo-title">{todo.title}</span>
                  {(todo.due_date || todo.due_time) && (
                    <span className="due-badge">
                      ⏰ {formatDue(todo.due_date, todo.due_time)}
                    </span>
                  )}
                </div>
                <button className="del-btn" onClick={() => deleteTodo(todo.id)} title="Delete">
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        <footer>Made by Rajvardhan Mall</footer>
      </div>
    </div>
  );
}

export default App;
