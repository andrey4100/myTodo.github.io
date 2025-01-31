import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

class App extends Component {
  // Инициализируем состояние компонента
  state = {
    todos: [
        { id: 1, label: 'Изучить HTML, CSS', completed: true, editing: false, time: new Date() },
        { id: 2, label: 'Изучить JS', completed: true, editing: false, time: new Date() },
        { id: 3, label: 'Изучить React', completed: false, editing: false, time: new Date() }
    ],
    filter: 'all'
};
    // Метод для добавления новой задачи (стрелочная функция, чтобы не ипользовать "bind")
    addTask = (label) => {
      const newTask = {
        id: Date.now(),
        label,
        completed: false,
        editing: false,
        time: new Date()
      };
      this.setState(prevState => ({ todos: [...prevState.todos, newTask] }));
    };

    // Метод для переключения статуса выполнения задачи
  toggleCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

    // Метод для переключения статуса редактирования задачи
  editTask = (id) => {
    this.setState(prevState => ({
        todos: prevState.todos.map(todo =>
            todo.id === id ? {...todo, editing: !todo.editing} : todo
        )
    }));
  };

  // Метод для удаления задачи
  deleteTask = (id) => {
    this.setState(prevState => ({ todos: prevState.todos.filter(todo => 
        todo.id !== id) }));
  };

  // Метод для изменения текста таски
  changeTaskLabel = (id, newLabel) => this.setState(prevState => ({
        todos: prevState.todos.map(todo =>
            todo.id === id ? {...todo, label: newLabel} : todo
        )
    }));

  // Метод для изменения фильтра
  setFilter = (filter) => {
    this.setState({ filter });
  };
  
  // Метод для очистки завершенных задач
  removeCompletedTasks = () => {
    this.setState(prevState => ({ todos: prevState.todos.filter(todo => !todo.completed) }));
  };

    // Метод для фильтрации задач
    getFilteredTodos = () => {
      const { todos, filter } = this.state;
      if (filter === 'active') {
          return todos.filter(todo => !todo.completed);
      }
      if (filter === 'completed') {
        return todos.filter(todo => todo.completed);
      } 
      return todos;
  };

  render() {

    const filteredTodos = this.getFilteredTodos();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAddTask={this.addTask}/>
        </header>
        <section className="main">
          <TaskList
            todos={filteredTodos}
            onToggleCompleted={this.toggleCompleted}
            onEdit={this.editTask}
            onDelete={this.deleteTask}
            onLabelChange={this.changeTaskLabel}
          />
          <Footer
          todos={this.state.todos}
          filter={this.state.filter}
          onFilterChange={this.setFilter}
          onClearCompleted={this.removeCompletedTasks}
          />
        </section>
      </section>
    );
  }
}

export default App;