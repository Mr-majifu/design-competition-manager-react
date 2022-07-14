
import React from "react";
import "../css/editForm.css"

class EditForm extends React.Component {
  state = {
    editFormData: this.props.editFormData,
  }

  inputChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState({
      editFormData: {
        ...this.state.editFormData,
        [name]: value
      }
    })
  }

  onSubmit(entryId) {
    fetch(`http://localhost:3030/api/entry/${entryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicant: this.state.editFormData.applicant,
        description: this.state.editFormData.description,
        datetime_submitted: this.state.editFormData.submissionDate + ' ' + this.state.editFormData.submissionTime + ':00',
        score: this.state.editFormData.score,
      }),
    })
      .then(request => request.json())
      .then(() => {
        this.props.closeEditForm()
        this.props.getAllEntries()
      })
  }

  render() {
    const { editFormData } = this.state
    const { closeEditForm } = this.props

    return (
      <div className="editEntryShade">
        <div className="editEntryBox" >
          <div className='editEntryBox-top'>
            <div className='editEntryBox-title'>
              <span>Edit Entry</span>
            </div>
            <div className='editEntryBox-close'>
              <span onClick={closeEditForm}>X</span>
            </div>
          </div>

          <hr></hr>

          <div className='editEntryBox-inputList'>
            <div className='editEntryBox-applicant'>
              <span>Applicant :</span>
              <input type="text" name='applicant' value={editFormData.applicant} onChange={this.inputChange}></input>
            </div>
            <div className='editEntryBox-description'>
              <span>Description :</span>
              <textarea name='description' value={editFormData.description} onChange={this.inputChange}></textarea>
            </div>
            <div className='editEntryBox-submissionDate'>
              <span>Submission Date :</span>
              <input type="date" name='submissionDate' value={editFormData.submissionDate} onChange={this.inputChange}></input>
            </div>
            <div className='editEntryBox-submissionTime'>
              <span>Submission time :</span>
              <input type="time" name='submissionTime' value={editFormData.submissionTime} onChange={this.inputChange}></input>
            </div>
            <div className='editEntryBox-score'>
              <span>Score :</span>
              <input type="text" name='score' value={editFormData.score == null ? "" : editFormData.score} onChange={this.inputChange}></input>
            </div>
          </div>

          <hr></hr>

          <div className='editEntryBox-bottom'>
            <div className='editEntryBox-bottom-btn'>
              <button className='editEntryBox-bottom-cancelBtn' onClick={closeEditForm}>Cancel</button>
            </div>
            <div className='editEntryBox-bottom-btn'>
              <button className='editEntryBox-bottom-submitBtn' onClick={(e) => this.onSubmit(this.state.editFormData.id)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditForm