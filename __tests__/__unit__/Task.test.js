import React from 'react';
import renderer from 'react-test-renderer';
import Task from '../../src/client/components/js/Task';

describe('testing Task', () => {
  it('renders correctly', () => {
    const task = renderer
      .create(
        <Task
          className="test"
          key={1}
          task={{
            _id: '2',
            rank: -999,
            category: 'A',
            title: 'Test Task',
            description: 'Testing Task',
            completed: false,
          }}
          populateEditTask={() => {}}
        />,
      ).toJSON();

    expect(task).toMatchSnapshot();
  });
});
