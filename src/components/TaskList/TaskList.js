import { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';

import Task from '../Task';

class TaskList extends Component {


  static defaultProps = {
    onToggleCompleted: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onLabelChange: () => {},
  };

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onToggleCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onLabelChange: PropTypes.func,
};

  render(){
    const { todos, onToggleCompleted, onEdit, onDelete, onLabelChange } = this.props;
    return (
      <ul className="todo-list">
      {todos.map(todo => (
          <Task
              key={todo.id}
              {...todo}
              onToggleCompleted={() => onToggleCompleted(todo.id)}
              onEdit={() => onEdit(todo.id)}
              onDelete={() => onDelete(todo.id)}
              onLabelChange={(newLabel) => onLabelChange(todo.id, newLabel)}
          />
      ))}
  </ul>
  );
}
}


export default TaskList;