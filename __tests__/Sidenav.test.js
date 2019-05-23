import React from 'react';
import renderer from 'react-test-renderer';
import Sidenav from '../src/client/components/js/Sidenav';

describe('Testing Sidenav', () => {
  it('Renders correctly', () => {
    const sidenav = renderer
      .create(<Sidenav
        toggleNewTaskPopup={() => { }}
        filters={{
          showTasks: 'both',
        }}
        handleFilterShowTasks={() => { }}
      />);

    expect(sidenav).toMatchSnapshot();
  });
});
