import React from 'react';
import TestRenderer from 'react-test-renderer';

import TodoList from '../TodoList';
import TodoItem from '../TodoItem';

jest.mock('../TodoItem', () => () => <div>TodoItem</div>);

const todosData = [
  { id: '123', title: 'my first todo'},
  { id: '124', title: 'my second todo'},
];
const removeTodo = jest.fn();
const getInstance = (shoudNotHaveTodos) => {
  const testRenderer = TestRenderer.create(
    <TodoList removeTodo={removeTodo} todoItems={!shoudNotHaveTodos && todosData} />
  );

  return testRenderer;
};

describe('TodoList component', () => {
  it('renders the proper title', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('h3').children).toEqual(['Todo list']);
  });

  it('renders an empty list with the proper message when has no todos data', () => {
    const testRenderer = getInstance(true);
    expect(testRenderer.root.findByType('p').children).toEqual(['You have no Todo items in the list.']);
  });

  it('renders a list with TodoItems for each todo', () => {
    const testRenderer = getInstance();
    removeTodo.mock.calls = [];

    expect(testRenderer.root.findAllByType(TodoItem).length).toEqual(2);
    expect(testRenderer.root.findAllByType(TodoItem)[0].props.title).toEqual(todosData[0].title);
    expect(testRenderer.root.findAllByType(TodoItem)[0].props.id).toEqual(todosData[0].id);
    testRenderer.root.findAllByType(TodoItem)[0].props.removeTodo();
    expect(removeTodo.mock.calls).toEqual([[todosData[0].id]]);

    removeTodo.mock.calls = [];
    expect(testRenderer.root.findAllByType(TodoItem)[1].props.title).toEqual(todosData[1].title);
    expect(testRenderer.root.findAllByType(TodoItem)[1].props.id).toEqual(todosData[1].id);
    testRenderer.root.findAllByType(TodoItem)[1].props.removeTodo();
    expect(removeTodo.mock.calls).toEqual([[todosData[1].id]]);

  });
});
