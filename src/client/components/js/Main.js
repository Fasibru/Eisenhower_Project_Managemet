import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Main.css';
import '../css/Task.css';
import Task from './Task';


class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }
  static categorizeFilteredTasks(filteredTasks) {
    const categorizedFilteredTasks = {
      TasksCatA: [],
      TasksCatB: [],
      TasksCatC: [],
      TasksCatD: [],
    };

    // const { toggleEditTaskPopup } = this.props;

    filteredTasks.forEach((task) => {
      switch (task.category) {
        case 'A':
          categorizedFilteredTasks.TasksCatA.push(<Task key={task._id} className="task task-category-A" title={task.title} description={task.description} />);
          break;

        case 'B':
          categorizedFilteredTasks.TasksCatB.push(<Task key={task._id} className="task task-category-B" title={task.title} description={task.description} />);
          break;

        case 'C':
          categorizedFilteredTasks.TasksCatC.push(<Task key={task._id} className="task task-category-C" title={task.title} description={task.description} />);
          break;

        case 'D':
          categorizedFilteredTasks.TasksCatD.push(<Task key={task._id} className="task task-category-D" title={task.title} description={task.description} />);
          break;

        default:
          console.log(`There seems to be no category assigned to the following task: ${task}`);
      }
    });
    return categorizedFilteredTasks;
  }

  render() {
    const { filteredTasks } = this.props;
    const categorizedFilteredTasks = Main.categorizeFilteredTasks(filteredTasks);
    return (
      <main className="main">
        <div className="column-category">{categorizedFilteredTasks.TasksCatA}</div>
        <div className="column-category">{categorizedFilteredTasks.TasksCatB}</div>
        <div className="column-category">{categorizedFilteredTasks.TasksCatC}</div>
        <div className="column-category">{categorizedFilteredTasks.TasksCatD}</div>
      </main>
    );
  }
}

Main.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Main;
