import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

const TaskFilter = ({ filter, onFilterChange }) => {
  TaskFilter.propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func,
  };

  const handleClick = (newFilter) => {
    onFilterChange(newFilter);
  };

  return (
    <ul className="filters">
      <li>
        <button className={filter === 'all' ? 'selected' : ''} onClick={() => handleClick('all')}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'active' ? 'selected' : ''} onClick={() => handleClick('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={filter === 'completed' ? 'selected' : ''} onClick={() => handleClick('completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TaskFilter;
