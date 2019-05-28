import React from 'react';
import { shallow } from 'enzyme';
import EditTask from '../../src/client/components/js/EditTask';

describe('Testing <EditTask />', () => {
  const fnClick = jest.fn();
  const fnSubmit = jest.fn();
  const fnChange = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditTask
      toggleEditTaskPopup={fnClick}
      editTask={{
        _id: '2',
        rank: -999,
        category: 'A',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      defineEditTask={fnChange}
      submitEditTask={fnSubmit}
      handleDeleteTask={fnClick}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should populate "title", "description", "category", "completed" correctly from props', () => {
    const inputTitle = wrapper.find('input[name="title"]');
    const textareaDescription = wrapper.find('textarea[name="description"]');
    const radioCategory = wrapper.find('input[type="radio"]');
    const checkboxCompleted = wrapper.find('input[type="checkbox"][name="completed"]');

    expect(inputTitle.props().defaultValue).toEqual('Task Title');
    expect(textareaDescription.props().defaultValue).toEqual('Task Description');
    expect(radioCategory.at(0).props().defaultChecked).toEqual(true);
    expect(radioCategory.at(1).props().defaultChecked).toEqual(false);
    expect(radioCategory.at(2).props().defaultChecked).toEqual(false);
    expect(radioCategory.at(3).props().defaultChecked).toEqual(false);
    expect(checkboxCompleted.props().checked).toEqual(false);
  });

  it('Should call "toggleEditTaskPopup" with "Close" button', () => {
    const buttonClose = wrapper.find('button').at(0);
    buttonClose.simulate('click');

    expect(fnClick).toHaveBeenCalledTimes(1);
  });

  it('Should call "handleDeleteTask" with "Delete" button', () => {
    const buttonDelete = wrapper.find('button').at(1);
    buttonDelete.simulate('click');

    expect(fnClick).toHaveBeenCalledTimes(1);
  });

  it('Should call "defineEditTask" on change', () => {
    const event = {
      target:
        { value: '' },
    };

    const eventChecked = {
      target:
        { checked: true },
    };

    const inputTitle = wrapper.find('input[name="title"]');
    inputTitle.simulate('change', event);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    const textareaDescription = wrapper.find('textarea[name="description"]');
    textareaDescription.simulate('change', event);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    const radioCategory = wrapper.find('input[type="radio"]');
    radioCategory.at(0).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    radioCategory.at(1).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    radioCategory.at(2).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    radioCategory.at(3).simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();

    const checkboxCompleted = wrapper.find('input[type="checkbox"][name="completed"]');
    checkboxCompleted.simulate('change', eventChecked);
    expect(fnChange).toHaveBeenCalledTimes(1);
    fnChange.mockClear();
  });

  it('Handles switch statement correctly', () => {
    const caseA = shallow(<EditTask
      toggleEditTaskPopup={fnClick}
      editTask={{
        _id: '2',
        rank: -999,
        category: 'A',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      defineEditTask={fnChange}
      submitEditTask={fnSubmit}
      handleDeleteTask={fnClick}
    />);

    expect(caseA.find('input[type="radio"][value="A"]').props().defaultChecked).toEqual(true);
    expect(caseA.find('input[type="radio"][value="B"]').props().defaultChecked).toEqual(false);
    expect(caseA.find('input[type="radio"][value="C"]').props().defaultChecked).toEqual(false);
    expect(caseA.find('input[type="radio"][value="D"]').props().defaultChecked).toEqual(false);

    const caseB = shallow(<EditTask
      toggleEditTaskPopup={fnClick}
      editTask={{
        _id: '2',
        rank: -999,
        category: 'B',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      defineEditTask={fnChange}
      submitEditTask={fnSubmit}
      handleDeleteTask={fnClick}
    />);

    expect(caseB.find('input[type="radio"][value="A"]').props().defaultChecked).toEqual(false);
    expect(caseB.find('input[type="radio"][value="B"]').props().defaultChecked).toEqual(true);
    expect(caseB.find('input[type="radio"][value="C"]').props().defaultChecked).toEqual(false);
    expect(caseB.find('input[type="radio"][value="D"]').props().defaultChecked).toEqual(false);

    const caseC = shallow(<EditTask
      toggleEditTaskPopup={fnClick}
      editTask={{
        _id: '2',
        rank: -999,
        category: 'C',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      defineEditTask={fnChange}
      submitEditTask={fnSubmit}
      handleDeleteTask={fnClick}
    />);

    expect(caseC.find('input[type="radio"][value="A"]').props().defaultChecked).toEqual(false);
    expect(caseC.find('input[type="radio"][value="B"]').props().defaultChecked).toEqual(false);
    expect(caseC.find('input[type="radio"][value="C"]').props().defaultChecked).toEqual(true);
    expect(caseC.find('input[type="radio"][value="D"]').props().defaultChecked).toEqual(false);

    const caseD = shallow(<EditTask
      toggleEditTaskPopup={fnClick}
      editTask={{
        _id: '2',
        rank: -999,
        category: 'D',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      defineEditTask={fnChange}
      submitEditTask={fnSubmit}
      handleDeleteTask={fnClick}
    />);

    expect(caseD.find('input[type="radio"][value="A"]').props().defaultChecked).toEqual(false);
    expect(caseD.find('input[type="radio"][value="B"]').props().defaultChecked).toEqual(false);
    expect(caseD.find('input[type="radio"][value="C"]').props().defaultChecked).toEqual(false);
    expect(caseD.find('input[type="radio"][value="D"]').props().defaultChecked).toEqual(true);

    const caseDefault = shallow(<EditTask
      toggleEditTaskPopup={fnClick}
      editTask={{
        _id: '2',
        rank: -999,
        category: 'E',
        title: 'Task Title',
        description: 'Task Description',
        completed: false,
      }}
      defineEditTask={fnChange}
      submitEditTask={fnSubmit}
      handleDeleteTask={fnClick}
    />);

    expect(caseDefault.find('input[type="radio"][value="A"]').props().defaultChecked).toEqual(false);
    expect(caseDefault.find('input[type="radio"][value="B"]').props().defaultChecked).toEqual(false);
    expect(caseDefault.find('input[type="radio"][value="C"]').props().defaultChecked).toEqual(false);
    expect(caseDefault.find('input[type="radio"][value="D"]').props().defaultChecked).toEqual(false);
  });
});
