import { Component } from 'react';


import './TaskList.css';

import Task from '../Task';

class TaskList extends Component {

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