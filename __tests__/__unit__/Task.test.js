import React from 'react';
import { shallow } from 'enzyme';
import { Task } from '../../src/client/components/js/Task';

import singleTask from '../../__mocks__/singleTaskDBFormat.mock.json';

describe('Testing <Task />', () => {
  const fnDoubleClick = jest.fn();
  const fnClick = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Task
      className="test"
      key={1}
      task={singleTask.data}
      openEditTaskPopup={fnClick}
      populateEditTaskForm={fnDoubleClick}
    />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should populate "title" and "description" based on provided props', () => {
    const pTitle = wrapper.find('p').at(0);
    const pDescription = wrapper.find('p').at(1);

    expect(pTitle.text()).toEqual('Test title');
    expect(pDescription.text()).toEqual('Test description');
  });

  it('Should run "populateEditTaskForm" "and openEditTaskPopup" on double click', () => {
    const div = wrapper.find('div');
    div.simulate('doubleClick');

    expect(fnDoubleClick).toHaveBeenCalledTimes(1);
    expect(fnClick).toHaveBeenCalledTimes(1);
  });
});
