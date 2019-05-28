import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../src/client/components/js/Main';

describe('Testing <Main />', () => {
  const fnMock = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Main
      filteredTasks={[{
        _id: '2',
        rank: -999,
        category: 'A',
        title: 'Task Title A',
        description: 'Task Description A',
        completed: false,
      },
      {
        _id: '21',
        rank: -999,
        category: 'A',
        title: 'Task Title 2A',
        description: 'Task Description 2A',
        completed: false,
      },
      {
        _id: '3',
        rank: -999,
        category: 'B',
        title: 'Task Title B',
        description: 'Task Description B',
        completed: true,
      },
      {
        _id: '4',
        rank: -999,
        category: 'C',
        title: 'Task Title C',
        description: 'Task Description C',
        completed: true,
      },
      {
        _id: '5',
        rank: -999,
        category: 'D',
        title: 'Task Title D',
        description: 'Task Description D',
        completed: true,
      },
      {
        _id: '6',
        rank: -999,
        category: 'E',
        title: 'Task Title Default Cat',
        description: 'Task Description Default Cat',
        completed: true,
      }]}
      populateEditTask={fnMock}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should categorize tasks properly', () => {
    const divCatA = wrapper.find('div').at(0);
    // console.log(divCatA.props().children.length);
    expect(divCatA.props().children.length).toEqual(2);
  });
});
