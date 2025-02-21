import React from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';

import Task from '../Task';

const TaskList = ({ todos, onToggleCompleted, onEdit, onDelete, onLabelChange,  toggleTimer }) => {

  TaskList.defaultProps = {
    onToggleCompleted: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onLabelChange: () => {},
  };
  
  TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onToggleCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onLabelChange: PropTypes.func,
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          {...todo}
          onToggleCompleted={onToggleCompleted}
          onEdit={onEdit}
          onDelete={onDelete}
          onLabelChange={onLabelChange}
          toggleTimer={toggleTimer}
        />
      ))}
    </ul>
  );
};



export default TaskList;