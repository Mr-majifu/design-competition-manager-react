
import "../css/search.css"
import React from "react";
// import PropTypes from 'prop-types';

class Search extends React.Component {
  // static propTypes = {
  //   searchInput: PropTypes.any.isRequired
  // }

  // static defaultProps = {
  //   searchInput: 's',
  // }

  render() {
    const { searchInput, sortBy, sortOrder } = this.props

    return (
      <div className="searchList">
        <div className="search1">
          <span>Search : </span>
          <input type="text" placeholder="Keyword" onChange={(e) => searchInput(e.target.value)} />
        </div>
        <div className="search2">
          <span>Sort By : </span>
          <select onChange={(e) => sortBy(e.target.value)}>
            <option>Applicant</option>
            <option>Submission</option>
            <option>Score</option>
          </select>
        </div>
        <div className="search3">
          <span>Sort Order : </span>
          <select onChange={(e) => sortOrder(e.target.value)}>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>
    )
  }
}

// Search.propTypes = {
//   searchInput: PropTypes.any.isRequired
// }

// Search.defaultProps = {
//   searchInput: 's',
// }

export default Search