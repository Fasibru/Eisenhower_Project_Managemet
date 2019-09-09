import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable-next-line: import-name
import React from 'react';

interface TaskWarningNoteProps {
  identifier: string;
  violatedFilters: string[];
}

// tslint:disable-next-line: variable-name
const TaskWarningNote: React.FC<TaskWarningNoteProps> = (
  { identifier, violatedFilters }) => {

  const violations:
    Array<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>> = [];
  violatedFilters.forEach((item) => {
    violations.push(<li key={item}>{item}</li>);
  });

  return (
    <React.Fragment>
      <p>
        <span><FontAwesomeIcon icon={faExclamationTriangle} /></span>
        {identifier} does not match the following filter settings:
      </p>
      <ul>
        {violations}
      </ul>
    </React.Fragment>
  );
};

export default TaskWarningNote;
