import React, { useState, useEffect } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      label: 'HTML, CSS',
      completed: true,
      editing: false,
      time: new Date(),
      totalSeconds: 60,
      isRunning: false,
      elapsedTime: 0,
    },
    {
      id: 2,
      label: 'JS',
      completed: true,
      editing: false,
      time: new Date(),
      totalSeconds: 120,
      isRunning: false,
      elapsedTime: 0,
    },
    {
      id: 3,
      label: 'React',
      completed: false,
      editing: false,
      time: new Date(),
      totalSeconds: 0,
      isRunning: false,
      elapsedTime: 120,
    },
  ]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.isRunning) {
            if (todo.elapsedTime > 0) {
              return { ...todo, elapsedTime: todo.elapsedTime - 1 };
            }
            return { ...todo, elapsedTime: 0, isRunning: false };
          }
          return todo;
        })
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const addTask = (label, totalSeconds) => {
    const newTask = {
      id: Date.now(),
      label,
      completed: false,
      editing: false,
      time: new Date(),
      totalSeconds: totalSeconds || 0,
      isRunning: false,
      elapsedTime: totalSeconds || 0,
    };
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              totalSeconds: 0,
              isRunning: false,
              elapsedTime: 0,
              timerDirection: 'down',
            }
          : todo
      )
    );
  };

  const editTask = (id) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, editing: !todo.editing } : todo)));
  };

  const deleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const changeTaskLabel = (id, newLabel) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, label: newLabel } : todo)));
  };

  const removeCompletedTasks = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  const toggleTimer = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          if (todo.elapsedTime === 0) {
            return { ...todo, isRunning: false };
          }
          return { ...todo, isRunning: !todo.isRunning };
        }
        return todo;
      })
    );
  };

  const filteredTodos = getFilteredTodos();

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredTodos}
          onToggleCompleted={toggleCompleted}
          onEdit={editTask}
          onDelete={deleteTask}
          onLabelChange={changeTaskLabel}
          toggleTimer={toggleTimer}
        />
        <Footer todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={removeCompletedTasks} />
      </section>
    </section>
  );
};

export default App;
