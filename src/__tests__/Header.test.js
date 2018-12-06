import React from 'react';
import TestRenderer from 'react-test-renderer';
import Header from '../Header';

describe('Header component', () => {
  it('renders the proper title', () => {
    const testRenderer = TestRenderer.create(<Header />);

    expect(testRenderer.root.findByType('h1').children).toEqual('Typescript TDD TODO Example App');
  });
});
