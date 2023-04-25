import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const MeetingsAdd = () => {

  const [meetings, setMeetings] = useState([])

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    userId: 0
  })

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setFormData({...formData, userId: location.state})
    }
  }, [location]);


  const handleChange = (e) => {
    const { name, value} = e.target
    setFormData({...formData, [name]: value})
    console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return(
    <form onSubmit={handleSubmit}>
      <h2>Create a meeting</h2>

      <label htmlFor="date">Date</label>
      <input id="date" name="date" type="date" required onChange={handleChange} value={meetings.date}/>

      <label htmlFor="time">Time</label>
      <input id="time" name="time" type="time" min="09:00" max="18:00" required onChange={handleChange} value={meetings.time} />

      <label htmlFor="location">Location</label>
      <input id="location" name="location" type="text" required onChange={handleChange} value={meetings.location}/>

    </form>
  )
}

export default MeetingsAdd
