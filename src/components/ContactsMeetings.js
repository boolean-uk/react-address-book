import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useParams } from "react-router-dom"
import Spinner from "./Spinner"

function ContactsMeetings(props) {
    const params = useParams()
    const initial = {
        id: '',
        key: params.id,
        date: '',
        time: '',
        location: ''
      }
    const [formData, setFormData] = useState(initial)
  
    //"contacts" must be passed as prop to this component
    const { setMeetings, meetings } = props
    const meetingsToDisplay = meetings.filter(item => Number(item.key) === Number(params.id))



      
    const handleSubmit = async (e) => {
    e.preventDefault()
    const options = {
        // ensure HTTP method is set to POST
        method: 'POST',
        // set headers for content type
        headers: {
        'Content-Type': 'application/json'
        },
        // add data to the request body in JSON
        body: JSON.stringify(formData)
    }
    const res = await fetch('http://localhost:4000/meetings', options)
    const data = await res.json()
    console.log(data)
    setMeetings([...meetings,data])
    // navigate('/')
    setFormData(initial)
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  
    return (
      <>
        <header>
          <h2>Meetings</h2>
        </header>
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
            <h2>Create Meeting</h2>

            {/* <label htmlFor="key">key:</label>
            <input  id='' name="key" type="text" onChange={handleChange} value = {params.id} readonly/> */}

            <label htmlFor="date">Date:</label>
            <input  id='' name="date" type="text" onChange={handleChange} value = {formData.date} required />

            <label htmlFor="time">Time::</label>
            <input id='' name="time" type="text" onChange={handleChange} value = {formData.time} required/>

            <label htmlFor="location">Location:</label>
            <input id='' name="location" type="text" onChange={handleChange}  value = {formData.location} required/>
            <div className="actions-section">
                <button className="button blue" type="submit" >
                    Create
                </button>
            </div>
        </form>
        <h2>Meeting List</h2>
        <ul className="contacts-list">
            {console.log("Yes "+meetingsToDisplay)}
          {meetingsToDisplay.map((meeting, index) => {
            const { date, time, location } = meeting
            return (
              <li className="contact" key={index}>
                <p>
                    Date: {date}
                </p>
                <p>
                    Time: {time}
                </p>
                <p>
                    Location: {location}
                </p>
              </li>
            )
          })}
        </ul>
      </>
    )
  }
  
  export default ContactsMeetings