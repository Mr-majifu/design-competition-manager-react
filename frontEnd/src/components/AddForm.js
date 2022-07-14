
import '../css/addForm.css'
import React from "react";

class AddForm extends React.Component {
  state = {
    applicant: '',
    description: '',
    submissionDate: '',
    submissionTime: '',
    score: '',
  }

  inputChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState({
      [name]: value
    })
  }

  onSubmit = () => {
    fetch("http://localhost:3030/api/entries", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicant: this.state.applicant,
        description: this.state.description,
        datetime_submitted: this.state.submissionDate + ' ' + this.state.submissionTime + ':00',
        score: this.state.score,
      }),
    })
      .then(request => request.json())
      .then(data => {
        // console.log(data);
        this.props.closeForm()
        this.props.getAllEntries()
      })
  }

  render() {
    const { closeForm } = this.props
    const { applicant, description, submissionDate, submissionTime, score } = this.state

    return (
      <div className="addEntryShade">
        <div className="addEntryBox" >
          <div className='addEntryBox-top'>
            <div className='addEntryBox-title'>
              <span>Add Entry</span>
            </div>
            <div className='addEntryBox-close'>
              <span onClick={closeForm}>X</span>
            </div>
          </div>

          <hr></hr>

          <div className='addEntryBox-inputList'>
            <div className='addEntryBox-applicant'>
              <span>Applicant :</span>
              <input type="text" name='applicant' value={applicant} onChange={this.inputChange}></input>
            </div>
            <div className='addEntryBox-description'>
              <span>Description :</span>
              <textarea name='description' value={description} onChange={this.inputChange}></textarea>
            </div>
            <div className='addEntryBox-submissionDate'>
              <span>Submission Date :</span>
              <input type="date" name='submissionDate' value={submissionDate} onChange={this.inputChange}></input>
            </div>
            <div className='addEntryBox-submissionTime'>
              <span>Submission time :</span>
              <input type="time" name='submissionTime' value={submissionTime} onChange={this.inputChange}></input>
            </div>
            <div className='addEntryBox-score'>
              <span>Score :</span>
              <input type="text" name='score' value={score} onChange={this.inputChange}></input>
            </div>
          </div>

          <hr></hr>

          <div className='addEntryBox-bottom'>
            <div className='addEntryBox-bottom-btn'>
              <button className='addEntryBox-bottom-cancelBtn' onClick={closeForm}>Cancel</button>
            </div>
            <div className='addEntryBox-bottom-btn'>
              <button className='addEntryBox-bottom-createBtn' onClick={this.onSubmit}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddForm;