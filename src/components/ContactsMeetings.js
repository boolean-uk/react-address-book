import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom";


function ContactsMeetings() {
  const [meetings, setMeetings] = useState({})
  const location = useLocation();

  // useEffect(() => {
  //   if (location.state) {
  //     const currentPerson = location.state;
  //     setContact(currentPerson);
  //   }
  // }, [location]);
  console.log(location.state.id)

  useEffect(() => {
    console.log('inside useEffect meetings')
    fetch(`http://localhost:4000/meetings/${location.state.id}`)
      .then((res) => res.json())
      .then((data) => {console.log(data); setMeetings(data.meetings);})
  }, [location]);

  console.log(meetings)


  return (
    <>
      <header>
      <h2>{location.state.firstName} {location.state.lastName}</h2>
      <h3>Meetings:</h3>
      </header>
      <ul className="meetings-list">
     { meetings.map((meeting) => {
        return (
          <p>{`You have a meeting at ${meeting.meetingTime} with ${meeting.meetingWith}`}</p>
          )
      })}
      </ul>
      <form className="meeting-form" onSubmit="">
      <h2>Add Meeting</h2>

      <label htmlFor="meetingTime">Meeting time:</label>
      <input id="meetingTime" name="meetingTime" type="time" onChange="" required /> <br /> <br />

      <label htmlFor="meetingWith">Meeting with:</label>
      <input id="meetingWith" name="meetingWith" type="text" onChange="" required/> <br /> <br />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Add meeting
        </button>
      </div>
    </form>
      

      </>
  )
}

export default ContactsMeetings