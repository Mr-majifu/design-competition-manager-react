import React from "react"
import "../css/entryList.css";
import EditForm from "./EditForm";

function search(arr, value) {
  return arr.filter(item => item.applicant.includes(value));
}

class EntryList extends React.Component {
  state = {
    showEditForm: false,
    editFormData: {},
  }

  deleteEntry(entryId) {
    fetch(`http://localhost:3030/api/entry/${entryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(request => request.json())
      .then(data => {
        console.log(data);
        this.props.getAllEntries()
      })
  }

  showEditForm = (params) => {
    this.setState({
      editFormData: params
    })
    this.setState({ showEditForm: true })
  }

  closeEditForm = () => {
    this.setState({ showEditForm: false })
  }

  render() {
    const { getAllEntries, allEntries, searchInput, sortBy, sortOrder } = this.props
    const { showEditForm, editFormData } = this.state

    let editForm;
    if (showEditForm) {
      editForm = (
        <EditForm 
          closeEditForm={this.closeEditForm} 
          editFormData={editFormData} 
          getAllEntries={getAllEntries}
        />
      )
    }

    let searchAllEntries = search(allEntries, searchInput)

    if (sortBy === "Applicant" && sortOrder === "Ascending") {
      searchAllEntries.sort((entry1, entry2) => {
        if (entry1.applicant < entry2.applicant)
          return -1;
        if (entry1.applicant > entry2.applicant)
          return 1;
        return 0
      }
      );
    } else if (sortBy === "Applicant" && sortOrder === "Descending") {
      searchAllEntries.sort((entry1, entry2) => {
        if (entry1.applicant < entry2.applicant)
          return 1;
        if (entry1.applicant > entry2.applicant)
          return -1;
        return 0
      }
      );
    } else if (sortBy === "Submission" && sortOrder === "Ascending") {
      searchAllEntries.sort((entry1, entry2) => {
        if (entry1.datetime_submitted < entry2.datetime_submitted)
          return -1;
        if (entry1.datetime_submitted > entry2.datetime_submitted)
          return 1;
        return 0
      }
      );
    } else if (sortBy === "Submission" && sortOrder === "Descending") {
      searchAllEntries.sort((entry1, entry2) => {
        if (entry1.datetime_submitted < entry2.datetime_submitted)
          return 1;
        if (entry1.datetime_submitted > entry2.datetime_submitted)
          return -1;
        return 0
      }
      );
    } else if (sortBy === "Score" && sortOrder === "Ascending") {
      searchAllEntries.sort((entry1, entry2) => {
        if (entry1.score < entry2.score)
          return -1;
        if (entry1.score > entry2.score)
          return 1;
        return 0
      }
      );
    } else if (sortBy === "Score" && sortOrder === "Descending") {
      searchAllEntries.sort((entry1, entry2) => {
        if (entry1.score < entry2.score)
          return 1;
        if (entry1.score > entry2.score)
          return -1;
        return 0
      }
      );
    }

    let trList = searchAllEntries.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.applicant}</td>
          <td>{item.description}</td>
          <td>{item.datetime_submitted}</td>
          <td>{item.score == null ? "Not Scored" : item.score}</td>
          <td>
            <div className="edit">
              <button className="editBtn" onClick={(e) => this.showEditForm({ id: item.id, applicant: item.applicant, description: item.description, submissionDate: item.datetime_submitted.slice(0, 10), submissionTime: item.datetime_submitted.slice(11, 16), score: item.score }, e)}>Edit</button>
            </div>
            <div className="delete">
              <button className="deleteBtn" onClick={(e) => this.deleteEntry(item.id, e)}>Delete</button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <div className="table">
        <table>
          <tbody>
            <tr>
              <th>NO.</th>
              <th>Applicant</th>
              <th>Description</th>
              <th>Submission Time</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
            {trList}
          </tbody>
        </table>
        {editForm}
      </div>
    );
  }
}

export default EntryList;