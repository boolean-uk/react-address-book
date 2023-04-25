import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const MeetingsAdd = (props) => {

  const {meetings, setMeetings} = props

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    userId: 0
  })

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setFormData({...formData, userId: location.state})
    }
  }, [location]);


  const handleChange = (e) => {
    const { name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:4000/meetings`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    setMeetings([...meetings, data])
    setFormData({})
    navigate(`/`)
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

      <button className="button blue" type="submit">
          Create
      </button>
    </form>
  )
}

export default MeetingsAdd
