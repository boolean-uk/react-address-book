import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ContactMeetings() {

  const params = useParams()

  const blankMeetingForm = {
    personId: params.id,
    meetingName: "",
    date: "",
    time: "",
    location: ""
}

   const [meetings, setMeetings] = useState([])
   const [newMeeting, setNewMeeting] = useState(blankMeetingForm)

   useEffect(() => {
    fetch(`http://localhost:4000/meetings?personId=${params.id}`)
        .then(response => response.json())
        .then(json => setMeetings(json))
   }, [])

    const handleMeetingInput = (event) => {
        setNewMeeting({...newMeeting, [event.target.name]: event.target.value})
    }

    const handleMeetingSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:4000/meetings", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMeeting)
          })
          .then(response => response.json())
          .then(json => setMeetings([...meetings, json]))

          setNewMeeting(blankMeetingForm)
        }

    return (
      <div>
       <form className="form-stack contact-form" onSubmit={handleMeetingSubmit}>
       <h2>Add Meeting</h2>

       <label htmlFor="meetingName">Meeting Name</label>
      <input id="meetingName" name="meetingName" type="text" onChange={handleMeetingInput} value={newMeeting.meetingName} required />

      <label htmlFor="date">Date</label>
      <input id="date" name="date" type="date" onChange={handleMeetingInput} value={newMeeting.date} required />

      <label htmlFor="time">Time</label>
      <input id="time" name="time" type="time" onChange={handleMeetingInput} value={newMeeting.time} required/>

      <label htmlFor="location">Location</label>
      <input id="location" name="location" type="text" onChange={handleMeetingInput} value={newMeeting.location} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Add
        </button>
      </div>
    </form>
    <div>{meetings.map(meeting => <div><p>{meeting.meetingName}</p>
    <p>{meeting.date}</p>
    <p>{meeting.time}</p>
    <p>{meeting.location}</p><br/></div>)}</div>
      </div>
    )
  }

  export default ContactMeetings;