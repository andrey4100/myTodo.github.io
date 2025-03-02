import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';

import './Footer.css';

const Footer = ({ todos, filter, onFilterChange, onClearCompleted }) => {
  Footer.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func,
    onClearCompleted: PropTypes.func,
  };

  const hasCompletedTodos = () => todos.filter((todo) => todo.completed).length > 0;

  const itemsLeft = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = hasCompletedTodos();

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button
        className="clear-completed"
        onClick={hasCompleted ? onClearCompleted : undefined}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
