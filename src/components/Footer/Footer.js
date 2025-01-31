import { Component } from 'react';


import TaskFilter from '../TaskFilter';

import './Footer.css';

class Footer extends Component {

  // Метод для проверки наличия завершенных задач
  hasCompletedTodos = () => {
    const { todos } = this.props;
    return todos.filter(todo => todo.completed).length > 0;
  };

  render() {

    const { todos, filter, onFilterChange, onClearCompleted } = this.props;
    const itemsLeft = todos.filter(todo => !todo.completed).length;
    const hasCompleted = this.hasCompletedTodos();

    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange}/>
        <button 
          className="clear-completed"
          onClick={hasCompleted ? onClearCompleted : undefined}
          disabled={!hasCompleted}
          >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
