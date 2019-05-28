import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/client/components/js/App';

describe('Testing <App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
