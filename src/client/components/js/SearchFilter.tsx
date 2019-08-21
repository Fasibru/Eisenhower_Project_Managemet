import * as React from 'react';
import { connect } from 'react-redux';

import { storeSearchQueryInput } from '../../actions/actionsFilters';

import { FiltersActionsTypes } from '../../../types/filterActionTypes';
import { Store } from '../../../types/storeTypes';

interface SearchFilterProps {
  searchQuery: string;
  storeSearchQueryInput(value: string): FiltersActionsTypes;
}

const mapStateToProps = (state: Store) => ({
  searchQuery: state.filters.filters.searchQuery,
});

// tslint:disable-next-line: variable-name
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
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
        type="text"
        placeholder="... search expression ..."
        onChange={handleChange}
      />
    </div>
  );
};

export default connect(mapStateToProps, { storeSearchQueryInput })(SearchFilter);
