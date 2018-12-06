import React from 'react';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import TodoItem from '../TodoItem';

const id = '123';
const title = 'new todo';
const removeTodo = jest.fn();
const getInstance = () => {
  const testRenderer = TestRenderer.create(<TodoItem title={title} id={id} removeTodo={removeTodo} />);

  return testRenderer;
};

describe('TodoItem component', () => {
  it('renders the proper title', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('h4').children).toEqual(title);
  });

  it('renders the remove todo button with the proper text', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('button').children).toEqual('✅');
  });

  it('the remove todo button should call the removeTodo callback with the id', () => {
    removeTodo.mock.calls = [];
    const testRenderer = getInstance();
    ReactTestUtils.Simulate.click(testRenderer.root.findByType('button'));
    expect(removeTodo).hasBeenCalled();
  });
});
