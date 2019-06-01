import React from 'react';
import { shallow } from 'enzyme';
import Sidenav from '../../src/client/components/js/Sidenav';

describe('Testing <Sidenav />', () => {
  const fnClick = jest.fn();
  const fnChange = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Sidenav
      toggleNewTaskPopup={fnClick}
      filters={{
        showTasks: 'both',
      }}
      handleFilterShowTasks={fnChange}
    />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should populate "select" based on provided props', () => {
    const select = wrapper.find('select');

    expect(select.props().value).toEqual('both');
  });

  it('Should call "handleFilterShowTasks" on change', () => {
    const event = {
      target:
      { value: '' },
    };
    const select = wrapper.find('select');
    select.simulate('change', event);

    expect(fnChange).toHaveBeenCalledTimes(1);
  });

  it('Should call "toggleNewTaskPopup" on button click', () => {
    const button = wrapper.find('button');
    button.simulate('click');

    expect(fnClick).toHaveBeenCalledTimes(1);
  });
});
