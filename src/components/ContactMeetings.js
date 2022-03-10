import { useState, useEffect } from 'react'

function ContactMeetings() {


    const [meetings, setMeetings] = useState([])

   const [newMeeting, setNewMeeting] = useState({
       personId: 1,
       date: "",
       time: "",
       location: ""
   })

   useEffect(() => {
    fetch("http://localhost:4000/meetings")
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

          setNewMeeting({
            personId: 1,
            date: "",
            time: "",
            location: ""
        })
        }

    return (
      <div>
     <h1>Specifc Person</h1>

         <form className="form-stack contact-form" onSubmit={handleMeetingSubmit}>
       <h2>Add Meeting</h2>

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
    <div>{meetings.map(meeting => <div><p>{meeting.date}</p>
    <p>{meeting.time}</p>
    <p>{meeting.location}</p><br/></div>)}</div>
      </div>
    )
  }

  export default ContactMeetings;