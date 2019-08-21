import * as React from 'react';
import { connect } from 'react-redux';

import { storeSearchQueryInput } from '../../actions/actionsFilters';

import { FiltersActionsTypes } from '../../../types/filterActionTypes';

interface SearchFilterProps {
  storeSearchQueryInput(value: string): FiltersActionsTypes;
}

// tslint:disable-next-line: variable-name
const SearchFilter: React.FC<SearchFilterProps> = ({
  storeSearchQueryInput,
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    storeSearchQueryInput(event.target.value);
  };

  return (
    <div className="sidenav__search">
      <p>Search tasks:</p>
      <input
        className="sidenav__input"
        type="search"
        placeholder="... search expression ..."
        onChange={handleChange}
      />
    </div>
  );
};

export default connect(null, { storeSearchQueryInput })(SearchFilter);
