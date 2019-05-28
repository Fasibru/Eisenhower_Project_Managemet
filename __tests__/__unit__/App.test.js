import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from '../../src/client/components/js/App';
import { data as tasks } from '../../__mocks__/tasks.json';
import data from '../../__mocks__/filters.json';

jest.mock('axios');

describe('Testing <App />', () => {
  // let wrapper;

  // beforeEach(() => {
  //   wrapper = shallow(<App />);
  // });

  // it('Renders correctly', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  it('Fetches "filters" and "tasks" on "componentDidMount"', async () => {
    const responseFilters = data;
    const responseTasks = tasks;
    axios.get.mockResolvedValue(responseFilters);
    // axios.get.mockResolvedValue(responseTasks);

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    console.log(instance.state);
  });
});
