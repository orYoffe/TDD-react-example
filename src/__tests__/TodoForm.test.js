import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TodoForm from '../TodoForm';

const addTodo = jest.fn();
const getInstance = (withEnzyme) => {
  const testRenderer = withEnzyme ? shallow(<TodoForm addTodo={addTodo} />) : TestRenderer.create(<TodoForm addTodo={addTodo} />);

  return testRenderer;
};

describe('TodoForm component', () => {
  it('renders a form', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('form').type).toEqual('form');
  });

  it('renders the proper title', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('h3').children).toEqual(['Write a Todo...']);
  });

  it('renders a proper input with the right placeholder', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('input').props.placeholder).toEqual('Clean socks..');
    expect(testRenderer.root.findByType('input').props.value).toEqual('');
  });

  it('renders a proper button with the right text', () => {
    const testRenderer = getInstance();
    expect(testRenderer.root.findByType('button').children).toEqual(['Add']);
  });

  it('form calls addTodo function when add button clicked', () => {
    addTodo.mock.calls = [];
    const newTodoValue = 'new value';
    const testRenderer = getInstance(true);

    testRenderer.find('input').simulate('change', { target: { value: newTodoValue }});
    testRenderer.find('button').simulate('click');
    expect(addTodo).toBeCalledWith(newTodoValue);
  });

  it('input text removed after Todo was added', () => {
    const newTodoValue = 'new value';
    const testRenderer = getInstance(true);

    testRenderer.find('input').simulate('change', { target: { value: newTodoValue }});
    testRenderer.find('button').simulate('click');
    expect(testRenderer.find('input').props().value).toEqual('');
  });
});
