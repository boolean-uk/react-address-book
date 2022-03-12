import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function AddMeeting() {
  const navigate = useNavigate()
  const params = useParams()
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocations] = useState("")
  const [contactInfo, setContactInfo] = useState([])

  function handleDate(event) {
    const inputValue = event.target.value
    setDate(inputValue)
  }

  function handleTime(event) {
    const inputValue = event.target.value
    setTime(inputValue)
  }

  function handleLocation(event) {
    const inputValue = event.target.value
    setLocations(inputValue)
  }

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContactInfo(data.meetings))
  }, [params])
  console.log(contactInfo)

  function handleSubmit(event) {
    event.preventDefault()

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetings: [...contactInfo,{date:date,time:time,location:location}]
      }),
    }
    fetch(`http://localhost:4000/contacts/${params.id}`, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        console.log("THIS IS:", json)
        navigate(`/contact/${params.id}/meetings`)
      })
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Add Meeting</h2>

      <label htmlFor="date">Date:</label>
      <input
        id="date"
        name="date"
        type="date"
        value={date}
        onChange={handleDate}
        required
      />

      <label htmlFor="time">Time:</label>
      <input
        id="time"
        name="time"
        type="time"
        value={time}
        onChange={handleTime}
        required
      />

      <label htmlFor="location">Location:</label>
      <input
        id="location"
        name="location"
        type="location"
        value={location}
        onChange={handleLocation}
        required
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          add
        </button>
      </div>
    </form>
  )
}
