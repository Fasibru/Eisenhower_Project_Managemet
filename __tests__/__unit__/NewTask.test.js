import React from 'react';
import { shallow } from 'enzyme';
import NewTask from '../../src/client/components/js/NewTask';

describe('Testing <NewTask />', () => {
  const fnClick = jest.fn();
  const fnChange = jest.fn();
  const fnSubmit = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewTask
      toggleNewTaskPopup={fnClick}
      defineNewTask={fnChange}
      submitNewTask={fnSubmit}
      title="props_title"
      description="props_description"
    />);
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should call function on "title", "description", "category", "completed" change', () => {
    const event = {
      target:
      { value: '' },
    };

    const eventChecked = {
      target:
        { checked: true },
    };

    const inputTitle = wrapper.find('input').at(0);
    inputTitle.simulate('change', event);

    const textareaDescription = wrapper.find('textarea').at(0);
    textareaDescription.simulate('change', event);

    const checkboxCompleted = wrapper.find('input[type="checkbox"]');
    checkboxCompleted.simulate('change', eventChecked);

    const radioInput = wrapper.find('input[type="radio"]');
    radioInput.at(0).simulate('change', eventChecked);
    radioInput.at(1).simulate('change', eventChecked);
    radioInput.at(2).simulate('change', eventChecked);
    radioInput.at(3).simulate('change', eventChecked);

    expect(fnChange).toHaveBeenCalledTimes(7);
  });

  it('Should populate "title", "description", "category", "completed" based on props and defaults', () => {
    const inputTitle = wrapper.find('input').at(0);
    const textareaDescription = wrapper.find('textarea').at(0);
    const checkboxCompleted = wrapper.find('input[type="checkbox"]');
    const radioInput = wrapper.find('input[type="radio"]');

    expect(inputTitle.props().value).toEqual('props_title');
    expect(textareaDescription.props().value).toEqual('props_description');
    expect(checkboxCompleted.props().defaultChecked).toEqual(false);

    expect(radioInput.at(0).props().defaultChecked).toBeUndefined();
    expect(radioInput.at(1).props().defaultChecked).toBeUndefined();
    expect(radioInput.at(2).props().defaultChecked).toBeUndefined();
    expect(radioInput.at(3).props().defaultChecked).toBeUndefined();
  });

  it('Close button should call "toggleNewTaskPopup" onClick', () => {
    const buttonClose = wrapper.find('button[type="button"]');
    buttonClose.simulate('click');

    expect(fnClick).toHaveBeenCalled();
  });

  it('Submitting the form should call "submitNewTask"', () => {
    const form = wrapper.find('form');
    form.simulate('submit');

    expect(fnSubmit).toHaveBeenCalled();
  });
});
