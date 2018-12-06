import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../App';
import Header from '../Header';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';

const todos = [
  { id: 1, title: 'my first todo'},
  { id: 2, title: 'my second todo'},
];
jest.mock('../Header', () => <div>Header</div>);
jest.mock('../TodoForm', () => <div>TodoForm</div>);
jest.mock('../TodoList', () => <div>TodoList</div>);

describe('App', () => {
  it('renders the proper layout with the proper props', () => {
    const testRenderer = TestRenderer.create(<App todos={todos} />);

    expect(testRenderer.root.findByType(Header).length).toEqual(1);

    expect(testRenderer.root.findByType(TodoForm).length).toEqual(1);
    expect(typeof testRenderer.root.findByType(TodoForm).props.addTodo).toEqual('function');

    expect(testRenderer.root.findByType(TodoList).length).toEqual(1);
    expect(testRenderer.root.findByType(TodoList).props.todoItems).toEqual(todos);
    expect(typeof testRenderer.root.findByType(TodoList).props.addTodo).toEqual('function');
  });

  it('addTodo prop given to TodoForm adds it to the TodoList props', () => {
    const newTodoValue = 'new todo';
    const testRenderer = TestRenderer.create(<App todos={todos} />);

    testRenderer.root.findByType(TodoForm).props.addTodo(newTodoValue);

    expect(testRenderer.root.findByType(TodoList).props.todoItems).toEqual([
      ...todos,
      { id: 3, title: newTodoValue },
    ]);
  });

  it('removeTodo prop given to TodoList removes it to the TodoList props', () => {
    const testRenderer = TestRenderer.create(<App todos={todos} />);

    testRenderer.root.findByType(TodoList).props.removeTodo(1);
    expect(testRenderer.root.findByType(TodoList).props.todoItems).toEqual([todos[1]]);
  });
});
