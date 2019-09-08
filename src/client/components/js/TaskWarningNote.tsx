// tslint:disable-next-line: import-name
import React from 'react';

interface TaskWarningNoteProps {
  identifier: string;
  violatedFilters: string[];
}

// tslint:disable-next-line: variable-name
const TaskWarningNote: React.FC<TaskWarningNoteProps> = (
  { identifier, violatedFilters }) => {
  return (
    <p>{identifier} does not match the following filter criteria:
      <ul>
        <li>{violatedFilters}</li>
      </ul>
    </p>
  );
};

export default TaskWarningNote;
