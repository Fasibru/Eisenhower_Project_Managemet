import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../src/client/components/js/Header';

describe('Testing Header', () => {
  it('Renders correctly', () => {
    const header = renderer
      .create(<Header />);

    expect(header).toMatchSnapshot();
  });
});
