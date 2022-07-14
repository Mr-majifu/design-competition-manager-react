
import React from 'react';
import '../css/app.css';
import EntryList from './EntryList.js';
import AddForm from './AddForm.js';
import Search from './Search.js';

class App extends React.Component {
  state = {
    allEntries: [],
    showForm: false,
    searchInput: '',
    sortBy: 'Applicant',
    sortOrder: 'Ascending'
  }

  getAllEntries = () => {
    fetch("http://localhost:3030/api/entries")
      .then(request => request.json())
      .then(data => {
        this.setState({
          allEntries: data
        })
      })
  }
  showForm = () => {
    this.setState({ showForm: true })
  }
  closeForm = () => {
    this.setState({ showForm: false })
  }

  searchEntry = (input) => {
    this.setState({ searchInput: input })
  }

  sortBy = (value) => {
    this.setState({ sortBy: value })
  }
  sortOrder = (value) => {
    this.setState({ sortOrder: value })
  }

  componentDidMount() {
    this.getAllEntries()
  }

  render() {

    const { showForm, allEntries, searchInput, sortBy, sortOrder } = this.state

    let entryForm;
    if (showForm) {
      entryForm = (<AddForm closeForm={this.closeForm} getAllEntries={this.getAllEntries}></AddForm>)
    }

    return (
      <div className="app">
        <div className="title">
          <span>Design Competition Manager</span>
        </div>

        <hr></hr>

        <div className="addAndSearch">
          <div className="addBtnDiv">
            <button 
              className="addBtn" 
              onClick={this.showForm}
            >
              Add Entry
            </button>
          </div>

          <Search 
            searchInput={this.searchEntry} 
            sortBy={this.sortBy} 
            sortOrder={this.sortOrder}
            />
        </div>

        <EntryList 
          allEntries={allEntries} 
          getAllEntries={this.getAllEntries} 
          searchInput={searchInput} 
          sortBy={sortBy} 
          sortOrder={sortOrder}
        />

        {entryForm}
      </div>
    )
  }
}

export default App;
