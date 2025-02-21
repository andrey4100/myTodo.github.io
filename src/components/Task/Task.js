/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

import './Task.css';

const Task = ({ id, label, completed, editing, time, onToggleCompleted, onEdit, onDelete, onLabelChange, isRunning, elapsedTime, toggleTimer }) => {

  const [newLabel, setNewLabel] = useState(label);
  const editInputRef = useRef(null); 


  Task.defaultProps = {
    onToggleCompleted: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onLabelChange: () => {},
  };
  
  Task.propTypes = {
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

  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editing]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (editing && editInputRef.current && !editInputRef.current.contains(event.target)) { // Добавлена проверка editing
      onEdit(id); // Вызываем onEdit, чтобы выйти из режима редактирования
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [editing, onEdit, id]);


  const editSubmit = () => { 
    if (newLabel.trim()) {
      onLabelChange(id, newLabel); 
      onEdit(id); 
    }
  };

  const editChange = (e) => setNewLabel(e.target.value);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      editSubmit(); 
    }
    if (e.key === 'Escape') {
      onEdit(id); 
    }
  };

  const onClickTask = () => {
    onToggleCompleted(id);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const createdAgo = formatDistanceToNow(time, { addSuffix: true, locale: enGB });

  return (
    <li className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} onClick={onClickTask} id={`${id}`} />
        <label>
          <label className="title" onClick={onClickTask}>{label}</label>
          <span className="description">
          <button className="icon icon-play" onClick={() => toggleTimer(id)} disabled={isRunning}></button>
          <button className="icon icon-pause" onClick={() => toggleTimer(id)} disabled={!isRunning}></button>
          {formatTime(elapsedTime)}
          </span>
          <span className="description">{createdAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdit(id)}></button> 
        <button className="icon icon-destroy" onClick={() => onDelete(id)}></button> 
      </div>
      {editing ? (
      <input 
          type="text" 
          className="edit" 
          value={newLabel} 
          onChange={editChange} 
          onKeyDown={onKeyDown}
          ref={editInputRef} 
          />
        ) : null}
    </li>
  )
};

export default Task;
