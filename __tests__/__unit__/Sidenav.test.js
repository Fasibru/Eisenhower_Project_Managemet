import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { Sidenav } from '../../src/client/components/js/Sidenav';

import filtersDBFormat from '../../__mocks__/filtersDBFormat.mock.json';

jest.mock('axios');

describe('Testing <Sidenav />', () => {
  const fnClick = jest.fn();
  const fnChange = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Sidenav
      openNewTaskPopup={fnClick}
      filters={filtersDBFormat.data[0]}
      updateFilters={fnChange}
    />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should populate "select" based on provided props', () => {
    // identify node
    const select = wrapper.find('select');

    // Assertions
    expect(select.props().value).toEqual(filtersDBFormat.data[0].showTasks);
  });

  it('Should call "updateFilters" and Axios PUT on change', () => {
    // define event
    const event = {
      target:
      { value: 'both' },
    };

    // identify node and simulate change
    const select = wrapper.find('select');
    select.simulate('change', event);

    // Assertions
    expect(fnChange).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledTimes(1);
  });

  it('Should call "openNewTaskPopup" on button click', () => {
    // identify node and simulate click
    const button = wrapper.find('button');
    button.simulate('click');

    // Assertions
    expect(fnClick).toHaveBeenCalledTimes(1);
  });
});
