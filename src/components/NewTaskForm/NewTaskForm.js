import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ onAddTask }) => {
  NewTaskForm.propTypes = {
    onAddTask: PropTypes.func,
  };

  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // eslint-disable-next-line radix
      const totalSeconds = parseInt(minutes || 0) * 60 + parseInt(seconds || 0);
      onAddTask(text, totalSeconds);
      setText('');
      setMinutes('');
      setSeconds('');
    }
  };

  const onLabelChange = (e) => setText(e.target.value);
  const onMinutesChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      if (value.length <= 2) {
        setMinutes(value);
      }
    }
  };

  const onSecondsChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      if (value.length <= 2) {
        setSeconds(value);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={onLabelChange}
      />
      <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={onMinutesChange} />
      <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={onSecondsChange} />
      <button type="submit"></button>
    </form>
  );
};

export default NewTaskForm;
