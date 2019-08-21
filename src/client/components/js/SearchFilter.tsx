import * as React from 'react';
import { connect } from 'react-redux';

import { Store } from '../../../types/storeTypes';

interface SearchFilterProps {
  searchQuery: string;
}

const mapStateToProps = (state: Store) => ({
  searchQuery: state.filters.filters.searchQuery,
});

// tslint:disable-next-line: variable-name
const SearchFilter: React.FC<SearchFilterProps> = ({ searchQuery }) => {
  return (
    <div className="sidenav__search">
      <p>Search tasks:</p>
      <input
        className="sidenav__input"
        type="search"
        placeholder="... search expression ..."
      />
    </div>
  );
};

export default connect(mapStateToProps)(SearchFilter);
