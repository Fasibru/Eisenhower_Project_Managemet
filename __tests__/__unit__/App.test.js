import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/client/components/js/App';

describe('Testing <App />', () => {
  let wrapper;
  let instance;
  const getTasksMock = jest.fn();
  const getFiltersMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<App
      getTasks={getTasksMock}
      getFilters={getFiltersMock}
      newTaskPopup={false}
      editTaskPopup={false}
    />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('Renders correctly without popups', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Calls "getTasks" and "getFilters" in componentDidMount', () => {
    instance.componentDidMount();

    expect(getTasksMock).toHaveBeenCalledTimes(1);
    expect(getFiltersMock).toHaveBeenCalledTimes(1);
  });
});
