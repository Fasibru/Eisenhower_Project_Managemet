import React from 'react';
import renderer from 'react-test-renderer';
import NewTask from '../src/client/components/js/NewTask';

describe('Testing NewTask', () => {
  it('Renders correctly', () => {
    const newTask = renderer
      .create(<NewTask
        toggleNewTaskPopup={() => {}}
        defineNewTask={() => { }}
        submitNewTask={() => { }}
        title="title"
        description="description"
      />);

    expect(newTask).toMatchSnapshot();
  });
});
