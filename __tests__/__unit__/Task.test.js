import React from 'react';
import { shallow } from 'enzyme';
import Task from '../../src/client/components/js/Task';

describe('Testing <Task />', () => {
  const fnDoubleClick = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Task
      className="test"
      key={1}
      task={{
        _id: '2',
        rank: -999,
        category: 'A',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      populateEditTask={fnDoubleClick}
    />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should populate "title" and "description" based on provided props', () => {
    const pTitle = wrapper.find('p').at(0);
    const pDescription = wrapper.find('p').at(1);

    expect(pTitle.text()).toEqual('Task Title');
    expect(pDescription.text()).toEqual('Task Description');
  });

  it('Should run "populateEditTask" on double click', () => {
    const div = wrapper.find('div');
    div.simulate('doubleClick');

    expect(fnDoubleClick).toHaveBeenCalledTimes(1);
  });
});
