import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/client/components/js/App';

describe('First React component test with Enzyme', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });
});
