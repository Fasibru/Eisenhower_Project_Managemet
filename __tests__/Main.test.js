import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../src/client/components/js/Main';

describe('Testing Main', () => {
  it('Renders correctly', () => {
    const main = renderer
      .create(<Main
        filteredTasks={[{
          _id: '2',
          rank: -999,
          category: 'A',
          title: 'Test Task',
          description: 'Testing Task',
          completed: false,
        }]}
        populateEditTask={() => { }}
      />);

    expect(main).toMatchSnapshot();
  });
});
