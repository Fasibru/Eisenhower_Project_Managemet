import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/client/components/js/App';

describe('Testing App', () => {
  it('Renders correctly', () => {
    const app = renderer
      .create(<App />);

    expect(app).toMatchSnapshot();
  });
});
