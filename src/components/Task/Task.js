import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import './Task.css';

class Task extends React.Component {

  // Инициализация состояния компонента
  state = { newLabel: this.props.label };

  // Обработка отправки формы редактирования
  editSubmit = (e) => {
    e.preventDefault();
    if (this.state.newLabel.trim()) {
        this.props.onLabelChange(this.state.newLabel); // Сохраняем значение
         this.props.onEdit(); //Переключаем состояние редактирования через пропс
    }
};

  // Метод для обработки изменения текстового поля во время редактирования
  editChange = (e) => this.setState({ newLabel: e.target.value });

  // Метод для обработки нажатия клавиши "Enter"
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
        this.editSubmit(e);
    }
  };
  // Метод для обработки клика на таску
  onClickTask = () => {
  this.props.onToggleCompleted(this.props.id);
};

  render() {
    const { label, completed, editing, time, onToggleCompleted, onEdit, onDelete } = this.props;
    const createdAgo = formatDistanceToNow(time, { addSuffix: true, locale: ru });
    const { newLabel } = this.state;
    
    return (
      <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onToggleCompleted}
            id={`${this.props.id}`}
          />
          <label onClick={this.onClickTask}>
            <span className="description" >
              {label}
            </span>
            <span className="created">{createdAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={newLabel}
          onChange={this.editChange}
          onKeyDown={this.onKeyDown}
      />
      </li>
    );
  }
}

export default Task;