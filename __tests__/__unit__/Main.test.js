import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../src/client/components/js/Main';

import multipleTasks from '../../__mocks__/multipleTasksDBFormat.mock.json';

describe('Testing <Main />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Main
      filteredTasks={multipleTasks.data}
    />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should categorize tasks properly', () => {
    // identify DOM elements
    const divCatA = wrapper.find('div').at(0);
    const divCatB = wrapper.find('div').at(1);
    const divCatC = wrapper.find('div').at(2);
    const divCatD = wrapper.find('div').at(3);

    // ASSERTIONS
    // Number of rendered nodes
    expect(divCatA.props().children.length).toEqual(1);
    expect(divCatB.props().children.length).toEqual(1);
    expect(divCatC.props().children.length).toEqual(1);
    expect(divCatD.props().children.length).toEqual(1);

    // Content of rendered nodes
    expect(divCatA.props().children[0].props.task).toEqual(multipleTasks.data[0]);
    expect(divCatB.props().children[0].props.task).toEqual(multipleTasks.data[1]);
    expect(divCatC.props().children[0].props.task).toEqual(multipleTasks.data[2]);
    expect(divCatD.props().children[0].props.task).toEqual(multipleTasks.data[3]);
  });
});
