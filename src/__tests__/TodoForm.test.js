import React from 'react';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import TodoForm from '../TodoForm';

const addTodo = jest.fn();
const getInstance = () => {
  const testRenderer = TestRenderer.create(<TodoForm addTodo={addTodo} />);

  return testRenderer;
};

describe('TodoForm component', () => {
  it('renders a form', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('form').length).toEqual(1);
  });

  it('renders the proper title', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('h3').children).toEqual('Write a Todo...');
  });

  it('renders a proper input with the right placeholder', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('input').props.placeholder).toEqual('Clean socks..');
  });

  it('renders a proper button with the right text', () => {
    const testRenderer = getInstance();
    expect(typeof testRenderer.root.findByType('button').children).toEqual('Add');
  });

  it('form calls addTodo function from props when submited', () => {
    addTodo.mock.calls = [];
    const newTodoValue = 'new value';
    const testRenderer = getInstance();
    const input = testRenderer.root.findByType('input');
    const button = testRenderer.root.findByType('button');

    input.props.value = newTodoValue;
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.click(button);
    expect(addTodo).hasBeenCalledWith(newTodoValue);
  });

  it('form calls addTodo function from props when submited', () => {
    addTodo.mock.calls = [];
    const newTodoValue = 'new value';
    const testRenderer = getInstance();
    const input = testRenderer.root.findByType('input');

    input.props.value = newTodoValue;
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
    expect(addTodo).hasBeenCalledWith(newTodoValue);
  });
});
