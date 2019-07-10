/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Main.scss';
import '../scss/Task.scss';
import Task from './Task';

const categorizeFilteredTasks = (filteredTasks) => {
  const categorizedFilteredTasks = {
    TasksCatA: [],
    TasksCatB: [],
    TasksCatC: [],
    TasksCatD: [],
  };

  filteredTasks.forEach((task) => {
    switch (task.category) {
      case 'A':
        categorizedFilteredTasks.TasksCatA.push(
          <Task
            className="task task-category-A"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'B':
        categorizedFilteredTasks.TasksCatB.push(
          <Task
            className="task task-category-B"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'C':
        categorizedFilteredTasks.TasksCatC.push(
          <Task
            className="task task-category-C"
            key={task._id}
            task={task}
          />,
        );
        break;

      case 'D':
        categorizedFilteredTasks.TasksCatD.push(
          <Task
            className="task task-category-D"
            key={task._id}
            task={task}
          />,
        );
        break;

      default:
        console.log(`There seems to be no category assigned to the following task: ${task}`);
    }
  });
  return categorizedFilteredTasks;
};

function Main({ filteredTasks }) {
  const categorizedFilteredTasks = categorizeFilteredTasks(
    filteredTasks,
  );

  // eslint-disable-next-line no-underscore-dangle
  const _sumDivHeights = (nodeList) => {
    const nodeArray = Array.from(nodeList);
    const numberOfNodes = nodeArray.length;

    // get styles of nodes - each node has same style due to React component
    const nodeStyle = nodeArray[0].currentStyle || window.getComputedStyle(nodeArray[0]);

    // get margins
    const marginTop = Number(nodeStyle.marginTop.split('px')[0]);
    const marginBottom = Number(nodeStyle.marginBottom.split('px')[0]);

    // calculate margin size without overlap
    let marginOffset;
    if (numberOfNodes === 1) {
      marginOffset = marginTop + marginBottom;
    } else {
      marginOffset = numberOfNodes
        * (marginTop + marginBottom)
        - (numberOfNodes - 1) * marginTop;
    }

    // calculate necessary height of whole div container
    const sumDivHeights = nodeArray.reduce(
      (offsetHeight, node) => offsetHeight + node.offsetHeight, 0,
    ) + marginOffset;

    return sumDivHeights;
  };

  // eslint-disable-next-line no-underscore-dangle
  const _getMaxContainerDivHeight = (divNodes) => {
    // get only div containers that have tasks in them
    const nonEmptyDivNodes = divNodes.filter(node => node.childNodes.length !== 0);

    // get max height of div containers
    const maxHeight = nonEmptyDivNodes.reduce(
      (max, node) => (
        _sumDivHeights(node.childNodes) > max ? _sumDivHeights(node.childNodes) : max), 0,
    );
    return maxHeight;
  };

  const setContainerDivHeight = () => {
    // calculate height of main div container based on scrolling
    const height = document.getElementById('main').scrollHeight + document.getElementById('main').scrollTop;

    // get direct child div containers of main div container
    const divs = document.getElementsByClassName('main__column-category');
    const divsArray = Array.from(divs);

    // change height of child div containers to extend css border to bottom when scrolled
    divsArray.forEach((div) => {
      div.style.maxHeight = _getMaxContainerDivHeight(divsArray) + 'px';
      div.style.height = height;
    });
  };

  return (
    <main className="main" id="main" onScroll={setContainerDivHeight}>
      <div className="main__column-category" id="main__column-category">{categorizedFilteredTasks.TasksCatA}</div>
      <div className="main__column-category">{categorizedFilteredTasks.TasksCatB}</div>
      <div className="main__column-category">{categorizedFilteredTasks.TasksCatC}</div>
      <div className="main__column-category">{categorizedFilteredTasks.TasksCatD}</div>
    </main>
  );
}

Main.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Main;
