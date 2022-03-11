import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

function ContactsMeetings (props) {
  const params = useParams()
  const [meetings, setMeeting] = useState([])
  const [formData, setForm] = useState({
    userId: params.id,
    subject: '',
    date: '',
    time: '',
    location: ''
  })

  useEffect(() => {
    fetch(`http://localhost:4000/meetings?userId=${params.id}`)
      .then(res => res.json())
      .then(res => {
        setMeeting(res)
      })
  }, [])

  function handleChange (e) {
    const { name, value } = e.target
    setForm(x => {
      return {
        ...x,
        [name]: value
      }
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    fetch('http://localhost:4000/meetings', options)
      .then(res => res.json())
      .then(res => {
        setMeeting(x => [...x, res])
        setForm({
          userId: params.id,
          subject: '',
          date: '',
          time: '',
          location: ''
        })
      })

  }

  return (
    <>
      <form className="form-stack contact-form" onSubmit={ handleSubmit }>
        <h2>Create Meeting</h2>

        <label htmlFor="subject">Subject:</label>
        <input id="subject" name="subject" type="text" onChange={ handleChange }
          value={ formData.subject } required />

        <label htmlFor="date">Date:</label>
        <input id="date" name="date" type="text" onChange={ handleChange }
          value={ formData.date } required />

        <label htmlFor="time">Time:</label>
        <input id="time" name="time" type="text" onChange={ handleChange }
          value={ formData.time } required />

        <label htmlFor="location">Location:</label>
        <input id="location" name="location" type="text" onChange={ handleChange }
          value={ formData.location } required />

        <div className="actions-section">
          <button className="button blue" type="submit" >
            Create a Meeting
          </button>
        </div>
      </form>
      <nav>
        <h2>List of meetings</h2>
        <ul className="contacts-list">
          { meetings.map((meeting, index) => {
            const { subject, date, time, location } = meeting
            return (
              <li className="contact" key={ index }>
                <p>Subject: { subject }</p>
                <p>Date: { date }</p>
                <p>Time: { time }</p>
                <p>Location: { location }</p>
              </li>
            )
          }) }
        </ul>
      </nav>
    </>
  )
}

export default ContactsMeetings
