// import React from 'react';
// import { shallow } from 'enzyme';
// import axios from 'axios';
// import App from '../../src/client/components/js/App';
// import data from '../../__mocks__/data.json';
// import task from '../../__mocks__/task.json';
// import taskData from '../../__mocks__/taskData.json';

// jest.mock('axios');

// describe('Testing axios calls in <App />', () => {
//   it('Fetches "filters" and "tasks" on "componentDidMount"', async () => {
//     // mock the response of the axios GET call
//     const response = data;
//     axios.get.mockResolvedValue(response);

//     const wrapper = shallow(<App />);
//     const instance = wrapper.instance();

//     // run the function
//     await instance.componentDidMount();

//     // check if axios GET was called
//     expect(axios.get).toHaveBeenCalled();

//     // check if filteredTasks and filters state were populated based on mock response
//     expect(wrapper.state('filteredTasks').length).toEqual(data.data.tasks.length);
//     expect(wrapper.state('filters').showTasks).toEqual(data.data.filters[0].showTasks);
//   });


//   it('handleNewTaskFormSubmit should add new task to state, reset newTask state object and toggle newTaskPopup', async () => {
//     const event = {
//       preventDefault: jest.fn(),
//     };

//     // mock the response of the axios POST call
//     const response = taskData;
//     axios.post.mockResolvedValue(response);

//     const wrapper = shallow(<App />);
//     const instance = wrapper.instance();

//     // initialize newTask state with data that usually comes from POST response
//     wrapper.setState({
//       newTask: {
//         title: taskData.data.title,
//         description: taskData.data.description,
//         category: taskData.data.category,
//       },
//     });

//     // check if newTask state was populated
//     expect(wrapper.state('newTask').title).toEqual(taskData.data.title);
//     expect(wrapper.state('newTask').description).toEqual(taskData.data.description);
//     expect(wrapper.state('newTask').category).toEqual(taskData.data.category);

//     // run function
//     await instance.handleNewTaskFormSubmit(event);

//     // check if axios POST was called
//     expect(axios.post).toHaveBeenCalled();

//     // check if newTask was added to filteredTasks state
//     expect(wrapper.state('filteredTasks')[0].title).toEqual(taskData.data.title);
//     expect(wrapper.state('filteredTasks')[0].description).toEqual(taskData.data.description);
//     expect(wrapper.state('filteredTasks')[0].category).toEqual(taskData.data.category);

//     // check if newTask state was reset
//     expect(wrapper.state('newTask')).not.toHaveProperty('title');
//     expect(wrapper.state('newTask')).not.toHaveProperty('description');
//     expect(wrapper.state('newTask')).not.toHaveProperty('category');
//     expect(wrapper.state('newTask')).not.toHaveProperty('_id');
//     expect(wrapper.state('newTask')).not.toHaveProperty('rank');
//     expect(wrapper.state('newTask')).not.toHaveProperty('completed');
//   });

//   it('handleFilterShowTasks should fire a PUT call, populate filters and filteredTasks state, ', async () => {
//     const wrapper = shallow(<App />);
//     const instance = wrapper.instance();

//     const event = {
//       target: {
//         value: 'both',
//       },
//     };

//     // reset filteredTasks and filters state
//     wrapper.setState({
//       filteredTasks: [],
//       filters: {},
//     });

//     // mock axios PUT call
//     axios.put.mockResolvedValue(data);

//     // run function
//     await instance.handleFilterShowTasks(event);

//     // check if axios PUT was called
//     expect(axios.put).toHaveBeenCalledTimes(1);

//     // check if filters state was set based on axios response
//     expect(wrapper.state('filters').showTasks).toEqual(data.data.filters[0].showTasks);

//     // check if filteredTask array is populated based on axios response
//     expect(wrapper.state('filteredTasks')).toEqual(data.data.tasks);
//   });

//   // it('Logs error when API call in "componentDidMount" catches one', async () => {
//   //   // console.log = jest.fn();

//   //   // const err = new Error('Network error');
//   //   // console.log(response);
//   //   axios.get.mockRejectedValue('Error');

//   //   const wrapper = shallow(<App />);
//   //   const instance = wrapper.instance();
//   //   await instance.componentDidMount();
//   //   // expect(console.log).toHaveBeenCalled();
//   // });
// });

// describe('Testing function calls and render in <App />', () => {
//   let wrapper;
//   let instance;

//   beforeEach(() => {
//     wrapper = shallow(<App />);
//     instance = wrapper.instance();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('Renders correctly', async () => {
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('toggleNewTaskPopup should toggle state "newTaskPopup"', () => {
//     // check default of newTaskPopup state
//     expect(wrapper.state('newTaskPopup')).toEqual(false);

//     // run function and check if newTaskPopup state was toggled
//     instance.toggleNewTaskPopup();
//     expect(wrapper.state('newTaskPopup')).toEqual(true);

//     // check if newTaskPopup state was toggled again
//     instance.toggleNewTaskPopup();
//     expect(wrapper.state('newTaskPopup')).toEqual(false);
//   });

//   it('toggleEditTaskPopup should toggle state "editTaskPopup" and reset "editTask" if populated', () => {
//     // check default of editTaskPopup state
//     expect(wrapper.state('editTaskPopup')).toEqual(false);

//     // check if running function toggles editTaskPopup state
//     instance.toggleEditTaskPopup();
//     expect(wrapper.state('editTaskPopup')).toEqual(true);

//     // populate editTask state
//     wrapper.setState({ editTask: task.task[0] });
//     expect(wrapper.state('editTask')).toHaveProperty('rank');
//     expect(wrapper.state('editTask')).toHaveProperty('completed');
//     expect(wrapper.state('editTask')).toHaveProperty('_id');
//     expect(wrapper.state('editTask')).toHaveProperty('category');
//     expect(wrapper.state('editTask')).toHaveProperty('description');
//     expect(wrapper.state('editTask')).toHaveProperty('title');

//     // check if function toggles editTaskPopup state and resets editTask state
//     instance.toggleEditTaskPopup();
//     expect(wrapper.state('editTaskPopup')).toEqual(false);
//     expect(wrapper.state('editTask')).not.toHaveProperty('rank');
//     expect(wrapper.state('editTask')).not.toHaveProperty('completed');
//     expect(wrapper.state('editTask')).not.toHaveProperty('_id');
//     expect(wrapper.state('editTask')).not.toHaveProperty('category');
//     expect(wrapper.state('editTask')).not.toHaveProperty('description');
//     expect(wrapper.state('editTask')).not.toHaveProperty('title');
//   });

//   it('populateEditTask should toggle editTaskPopup and populate the state', () => {
//     // check if editTask state is empty by default
//     expect(wrapper.state('editTask')).not.toHaveProperty('rank');
//     expect(wrapper.state('editTask')).not.toHaveProperty('completed');
//     expect(wrapper.state('editTask')).not.toHaveProperty('_id');
//     expect(wrapper.state('editTask')).not.toHaveProperty('category');
//     expect(wrapper.state('editTask')).not.toHaveProperty('description');
//     expect(wrapper.state('editTask')).not.toHaveProperty('title');

//     const taskValues = task.task[0];
//     instance.populateEditTask(taskValues);

//     // check if function has toggled editTaskPopup state
//     expect(wrapper.state('editTaskPopup')).toEqual(true);

//     // check if function has populated editTask state
//     expect(wrapper.state('editTask').rank).toEqual(taskValues.rank);
//     expect(wrapper.state('editTask').completed).toEqual(taskValues.completed);
//     expect(wrapper.state('editTask')._id).toEqual(taskValues._id);
//     expect(wrapper.state('editTask').category).toEqual(taskValues.category);
//     expect(wrapper.state('editTask').description).toEqual(taskValues.description);
//     expect(wrapper.state('editTask').title).toEqual(taskValues.title);
//   });

//   it('handleNewTaskFormChange should populate newTask state', () => {
//     // set up events for handleNewTaskFormChange function
//     const eventTitle = {
//       target: {
//         name: 'title',
//         value: 'Task Title',
//       },
//     };
//     const eventDescription = {
//       target: {
//         name: 'description',
//         value: 'Task Description',
//       },
//     };
//     const eventCategoryA = {
//       target: {
//         name: 'category',
//         value: 'A',
//       },
//     };
//     const eventCompleted = {
//       target: {
//         name: 'completed',
//         checked: true,
//       },
//     };

//     // check if title is populated in newTask state
//     expect(wrapper.state('newTask')).not.toHaveProperty('title');
//     instance.handleNewTaskFormChange(eventTitle);
//     expect(wrapper.state('newTask').title).toEqual('Task Title');

//     // check if description is populated in newTask state
//     expect(wrapper.state('newTask')).not.toHaveProperty('description');
//     instance.handleNewTaskFormChange(eventDescription);
//     expect(wrapper.state('newTask').description).toEqual('Task Description');

//     // check if category is populated in newTask state
//     expect(wrapper.state('newTask')).not.toHaveProperty('category');
//     instance.handleNewTaskFormChange(eventCategoryA);
//     expect(wrapper.state('newTask').category).toEqual('A');

//     // check if completed is populated in newTask state
//     expect(wrapper.state('newTask')).not.toHaveProperty('completed');
//     instance.handleNewTaskFormChange(eventCompleted);
//     expect(wrapper.state('newTask').completed).toEqual(true);
//   });

//   it('handleEditTaskFormSubmit should execute a PUT call, save the edited changes to the filteredTasks state, reset the state and toggle the popup', () => {
//     // console.log = jest.fn();
//     const event = {
//       preventDefault: jest.fn(),
//     };

//     // set editTaskPopup to true since this is when handleEditTaskFormSubmit can be submitted
//     wrapper.setState({
//       editTaskPopup: true,
//     });

//     // populate filteredTasks state
//     wrapper.setState({
//       filteredTasks: [taskData.data],
//     });

//     // populate editTask state
//     const editedTask = {
//       rank: 1,
//       completed: true,
//       _id: '5cd83df54f87753c84a30fbe',
//       category: 'D',
//       title: 'EDIT React Popup',
//       description: 'EDIT Implement a better solution for the popup',
//     };
//     wrapper.setState({ editTask: editedTask });

//     // find index of task to update
//     const editTaskIndex = wrapper.state('filteredTasks').findIndex(item => item._id === editedTask._id);

//     // check task that should be updated before the actual update
//     expect(wrapper.state('filteredTasks')[editTaskIndex].completed).toEqual(taskData.data.completed);
//     expect(wrapper.state('filteredTasks')[editTaskIndex].category).toEqual(taskData.data.category);
//     expect(wrapper.state('filteredTasks')[editTaskIndex].title).toEqual(taskData.data.title);
//     expect(wrapper.state('filteredTasks')[editTaskIndex].description).toEqual(taskData.data.description);

//     // run the function to actually update the filteredTasks state
//     // and fire the PUT call with mocked axios call
//     axios.put.mockRejectedValue('Some Error');
//     instance.handleEditTaskFormSubmit(event);

//     // check if axios PUT was called
//     expect(axios.put).toHaveBeenCalledTimes(1);

//     // check if task was updated
//     expect(wrapper.state('filteredTasks')[editTaskIndex].completed).toEqual(editedTask.completed);
//     expect(wrapper.state('filteredTasks')[editTaskIndex].category).toEqual(editedTask.category);
//     expect(wrapper.state('filteredTasks')[editTaskIndex].title).toEqual(editedTask.title);
//     expect(wrapper.state('filteredTasks')[editTaskIndex].description).toEqual(editedTask.description);

//     // check if editTask state was reset
//     expect(wrapper.state('editTask')).not.toHaveProperty('rank');
//     expect(wrapper.state('editTask')).not.toHaveProperty('completed');
//     expect(wrapper.state('editTask')).not.toHaveProperty('_id');
//     expect(wrapper.state('editTask')).not.toHaveProperty('category');
//     expect(wrapper.state('editTask')).not.toHaveProperty('description');
//     expect(wrapper.state('editTask')).not.toHaveProperty('title');

//     // check if editTaskPopup was toggled off
//     expect(wrapper.state('editTaskPopup')).toEqual(false);
//   });

//   it('handleEditTaskFormChange should populate editTask state', () => {
//     // set up events for handleEditTaskFormChange function
//     const eventTitle = {
//       target: {
//         name: 'title',
//         value: 'Edit Task Title',
//       },
//     };
//     const eventDescription = {
//       target: {
//         name: 'description',
//         value: 'Edit Task Description',
//       },
//     };
//     const eventCategoryA = {
//       target: {
//         name: 'category',
//         value: 'A',
//       },
//     };
//     const eventCompleted = {
//       target: {
//         name: 'completed',
//         checked: true,
//       },
//     };

//     // check if title is populated in editTask state
//     expect(wrapper.state('editTask')).not.toHaveProperty('title');
//     instance.handleEditTaskFormChange(eventTitle);
//     expect(wrapper.state('editTask').title).toEqual('Edit Task Title');

//     // check if description is populated in editTask state
//     expect(wrapper.state('editTask')).not.toHaveProperty('description');
//     instance.handleEditTaskFormChange(eventDescription);
//     expect(wrapper.state('editTask').description).toEqual('Edit Task Description');

//     // check if category is populated in editTask state
//     expect(wrapper.state('editTask')).not.toHaveProperty('category');
//     instance.handleEditTaskFormChange(eventCategoryA);
//     expect(wrapper.state('editTask').category).toEqual('A');

//     // check if completed is populated in editTask state
//     expect(wrapper.state('editTask')).not.toHaveProperty('completed');
//     instance.handleEditTaskFormChange(eventCompleted);
//     expect(wrapper.state('editTask').completed).toEqual(true);
//   });

//   it('handleDeleteTask should fire a DELETE call, the deleted task should be removed from filteredTasks array and editTask state should be reset', () => {
//     const firstTask = wrapper.state('filteredTasks')[0];
//     const secondTask = wrapper.state('filteredTasks')[1];

//     // populate editTask state
//     wrapper.setState({ editTask: firstTask });
//     // check if editTask state has respective properties
//     expect(wrapper.state('editTask')).toHaveProperty('title');
//     expect(wrapper.state('editTask')).toHaveProperty('description');
//     expect(wrapper.state('editTask')).toHaveProperty('category');
//     expect(wrapper.state('editTask')).toHaveProperty('_id');
//     expect(wrapper.state('editTask')).toHaveProperty('rank');
//     expect(wrapper.state('editTask')).toHaveProperty('completed');

//     // mock the axios DELETE call with error
//     axios.delete.mockRejectedValue('Delete error');

//     // check length of filteredTasks array prior to function call
//     expect(wrapper.state('filteredTasks').length).toEqual(17);
//     expect(wrapper.state('filteredTasks')[0]).toMatchObject(firstTask);

//     // run the function
//     instance.handleDeleteTask();

//     // check if axios DELETE was called
//     expect(axios.delete).toHaveBeenCalledTimes(1);

//     // check if editTask was removed from filteredTask array
//     expect(wrapper.state('filteredTasks').length).toEqual(16);
//     expect(wrapper.state('filteredTasks')[0]).not.toMatchObject(firstTask);
//     expect(wrapper.state('filteredTasks')[0]).toMatchObject(secondTask);

//     // check if editTask state was reset
//     expect(wrapper.state('editTask')).not.toHaveProperty('title');
//     expect(wrapper.state('editTask')).not.toHaveProperty('description');
//     expect(wrapper.state('editTask')).not.toHaveProperty('category');
//     expect(wrapper.state('editTask')).not.toHaveProperty('_id');
//     expect(wrapper.state('editTask')).not.toHaveProperty('rank');
//     expect(wrapper.state('editTask')).not.toHaveProperty('completed');
//   });
// });
