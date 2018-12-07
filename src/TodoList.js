import  React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
  todoItems,
  removeTodo,
}) => {
  return (
    <div className="TodoList">
      <h3>Todo list</h3>
      <div>
        {(todoItems && todoItems.length) ? (
          todoItems.map(i => (
            <TodoItem
              key={`TodoItem_${i.id}`}
              title={i.title}
              id={i.id}
              removeTodo={() => removeTodo(i.id)}
            />
          ))) : (
          <p>You have no Todo items in the list.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
