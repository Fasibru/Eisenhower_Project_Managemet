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
  console.log('violations:', violations);

  return (
    <React.Fragment>
      <p>Note: {identifier} does not match the following filter settings:
      </p>
      <ul>
        {violations}
      </ul>
    </React.Fragment>
  );
};

export default TaskWarningNote;
