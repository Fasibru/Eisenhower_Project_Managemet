import React from 'react';
import renderer from 'react-test-renderer';
import EditTask from '../src/client/components/js/EditTask';

describe('Testing EditTask', () => {
  it('Renders correctly', () => {
    const editTask = renderer
      .create(<EditTask
        toggleEditTaskPopup={() => { }}
        editTask={{
          _id: '2',
          rank: -999,
          category: 'A',
          title: 'Test Task',
          description: 'Testing Task',
          completed: false,
        }}
        defineEditTask={() => { }}
        submitEditTask={() => { }}
        handleDeleteTask={() => { }}
      />);

    expect(editTask).toMatchSnapshot();
  });
});
