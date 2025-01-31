import React from 'react';
import PropTypes from 'prop-types';

import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

import './Task.css';

class Task extends React.Component {
  static defaultProps = {
    onToggleCompleted: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onLabelChange: () => {},
  };

  static propTypes = {
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    time: PropTypes.instanceOf(Date),
    onToggleCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onLabelChange: PropTypes.func,
  };

  // Инициализация состояния компонента
  state = { newLabel: this.props.label };

  // Обработка отправки формы редактирования
  editSubmit = (e) => {
    e.preventDefault();
    if (this.state.newLabel.trim()) {
      this.props.onLabelChange(this.state.newLabel); // Сохраняем значение
      this.props.onEdit();
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
          <label>
            <button onClick={this.onClickTask}></button>
            <span className="description">{label}</span>
            <span className="created">{createdAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        <input type="text" className="edit" value={newLabel} onChange={this.editChange} onKeyDown={this.onKeyDown} />
      </li>
    );
  }
}

export default Task;
