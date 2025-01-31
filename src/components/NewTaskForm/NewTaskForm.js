import { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

class NewTaskForm extends Component {

  static propTypes = {
    onAddTask: PropTypes.func,
  };

  // Инициализируем состояние для текстового поля
  state = { text: "" };

    // Метод для обработки отправки формы
    onSubmit = (e) => {
      e.preventDefault(); // Предотвращаем перезагрузку страницы
      if (this.state.text.trim()) {
         // Вызываем метод onAddTask, для добавления задачи
          this.props.onAddTask(this.state.text);
           // Очищаем текстовое поле
          this.setState({ text: "" });
      }
  };

      // Метод для обработки изменения текстового поля
      onLabelChange = (e) => {
        this.setState({ text: e.target.value });
    };


  render() {

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form" >
        <input
            className="new-todo"
            type="text"
            placeholder="What needs to be done?"
            value={this.state.text}
            onChange={this.onLabelChange}
        />
      </form>
    );
  }
}

export default NewTaskForm;