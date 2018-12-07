import React from 'react';

const TodoItem = ({
  title,
  removeTodo,
}) => (
  <div className="TodoItem">
    <h4>{title}</h4>
    {/* eslint-disable-next-line */}
    <button onClick={removeTodo}>✅</button>
  </div>
);

export default TodoItem;
