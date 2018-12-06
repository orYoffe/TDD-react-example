import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../App';
import Header from '../Header';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';
import { getTodos } from '../todoService';

jest.mock('../Header', () => jest.fn(() => 'Header'));
jest.mock('../TodoForm', () => jest.fn(() => 'TodoForm'));
jest.mock('../TodoList', () => jest.fn(() => 'TodoList'));
jest.mock('../todoService', () => ({
  getTodos: () => ([
    { id: '123', title: 'my first todo'},
    { id: '124', title: 'my second todo'},
  ])
}));

describe('App', () => {
  it('renders the proper layout', () => {
    const testRenderer = TestRenderer.create(<App />);

    expect(testRenderer.root.findByType(Header).length).toEqual(1);

    expect(testRenderer.root.findByType(TodoForm).length).toEqual(1);
    expect(typeof testRenderer.root.findByType(TodoForm).props.addTodo).toEqual('function');

    expect(testRenderer.root.findByType(TodoList).length).toEqual(1);
    expect(testRenderer.root.findByType(TodoList).props.todoItems).toEqual(getTodos());
  });
});
