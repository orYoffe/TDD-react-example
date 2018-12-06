import React from 'react';
import TestRenderer from 'react-test-renderer';

import TodoList from '../TodoList';
import TodoItem from '../TodoItem';

const todosData = [
  { id: '123', title: 'my first todo'},
  { id: '124', title: 'my second todo'},
];
const getInstance = (shoudNotHaveTodos) => {
  const testRenderer = TestRenderer.create(<TodoList todoItems={!shoudNotHaveTodos && todosData} />);

  return testRenderer;
};

describe('TodoList component', () => {
  it('renders the proper title', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('h3').children).toEqual('Todo list');
  });

  it('renders an empty list with the proper message when has no todos data', () => {
    const testRenderer = getInstance(false);
    expect(testRenderer.root.findByType('p').children).toEqual('You have no Todo items in the list.');
  });

  it('renders a list with TodoItems for each todo', () => {
    const testRenderer = getInstance();

    expect(testRenderer.root.findByType(TodoItem).length).toEqual(2);
  });
});
