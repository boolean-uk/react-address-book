import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function MeetingsList() {
  const { id } = useParams()
  const initialData = { about: "", location: "", time: "", contactId: id }
  const [meetingData, setMeetingData] = useState(initialData)
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/meetings?contactId=${id}`)
      .then(res => res.json())
      .then(data => setMeetings(data))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMeetingData({...meetingData, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingData)
    }
    fetch(`http://localhost:4000/meetings`, opts)
      .then(res => res.json())
      .then(data => setMeetings([...meetings, data]))

    setMeetingData(initialData)
  }

  return (
    <>
      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Add meeting</h2>

        <label htmlFor="about">About:</label>
        <input id="about" name="about" type="text" required value={meetingData.about} onChange={handleChange}/>

        <label htmlFor="location">Location:</label>
        <input id="location" name="location" type="text" required value={meetingData.location} onChange={handleChange}/>

        <label htmlFor="time">Time:</label>
        <input id="time" name="time" type="text" required value={meetingData.time} onChange={handleChange}/>

        <div className="actions-section">
          <button className="button blue" type="submit">
            Add
          </button>
        </div>
      </form>
      {meetings && meetings.length === 0 && <span>No meetings booked...</span>}
      {meetings && <ul>
        {meetings.map((meeting, i) => {
          const { about, location, time } = meeting
          return (
            <li key={i}>
              <h3>{about}</h3>
              <p>{time}, {location}</p>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default MeetingsList
