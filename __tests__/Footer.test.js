import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../src/client/components/js/Footer';

describe('Testing Footer', () => {
  it('Renders correctly', () => {
    const footer = renderer
      .create(<Footer />);

    expect(footer).toMatchSnapshot();
  });
});
