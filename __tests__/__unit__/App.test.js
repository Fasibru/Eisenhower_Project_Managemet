import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from '../../src/client/components/js/App';
import data from '../../__mocks__/data.json';

jest.mock('axios');

describe('Testing <App />', () => {
  // let wrapper;
  // const createWrapper = () => {
  //   const wrapperApp = shallow(<App />);
  //   return wrapperApp;
  // };

  // beforeEach(async () => {
  //   wrapper = await createWrapper();
  // });

  // it('Renders correctly', async () => {
  //   const wrapper = shallow(<App />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('Fetches "filters" and "tasks" on "componentDidMount"', async () => {
    const response = data;
    axios.get.mockResolvedValue(response);

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
  });
});
