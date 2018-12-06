import { getTodos, addTodo, removeTodo } from '../todoService';

describe('todoService', () => {
  it('getTodos gets the todos data', () => {
    const todos = getTodos();

    expect(todos).toEqual([
      { id: '1', title: 'my first todo'},
      { id: '2', title: 'my second todo'},
    ]);
  });

  it('addTodo adds todo to the list and returns with id and data in the list', () => {
    addTodo('my third todo');

    expect(getTodos()).toEqual([
      { id: '1', title: 'my first todo'},
      { id: '2', title: 'my second todo'},
      { id: '3', title: 'my third todo'},
    ]);
  });

  it('removeTodo removes todo item from the list', () => {
    removeTodo('3');

    expect(getTodos()).toEqual([
      { id: '1', title: 'my first todo'},
      { id: '2', title: 'my second todo'},
    ]);
  });
});
