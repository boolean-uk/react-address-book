import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'


const initialState = {
  "name": "",
  "date": "",
  "time": "",
  "location": ""
}

function Meetings(props) {
  const [meetingData, setMeetingData] = useState(initialState)
  const [meetings, setMeetings] = useState([])
  const { id } = useParams()

  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}/meetings`)
    const data = await res.json()
    setMeetings(data)
  }, [])

  const handleChange = event => {
    // set the name and value (of the input) to be the target 
    // eg. input for meeting name
    const {name, value} = event.target
    // create a new variable, and asign all of the meetingData Obj to it
    const newMeetingData = {...meetingData}
    // Apply the new data that was input into the above fields into meetingData
    newMeetingData[`${name}`] = value
    setMeetingData(newMeetingData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    
    // send POST request to CREATE a new contact    
    const fetchOptions = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(meetingData)
    }
    // await for fetch response
    const res = await fetch(`http://localhost:4000/contacts/${id}/meetings`, fetchOptions)
    // extract response data
    const data = await res.json()
    // update LOCAL State, while keeping the previous data
    setMeetings([...meetings, data])
  }

  // TODO: Implement loading spinner correctly
  if (!meetings) {
    return <Spinner />
  }

  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>

      
      <form className='form-stack meeting-form' onSubmit={handleSubmit}>
        <h3 className='meetings-subheadings'>New Meeting:</h3>

        <label htmlFor='name'>Name: </label>
        <input 
          type="text" 
          id='name' 
          name='name' 
          placeholder='Project planning' 
          required 
          onChange={handleChange} 
          value={meetingData.name}
        />

        <label htmlFor='date'>Date: </label>
        <input 
          type="date" 
          id='date' 
          name='date'  
          required 
          onChange={handleChange} 
          value={meetingData.date}
          className='meeting-form-date'
        />
        
        <label htmlFor='time'>Time: </label>
        <input 
          type="time" 
          id='time' 
          name='time'  
          required 
          onChange={handleChange} 
          value={meetingData.time}
          className='meeting-form-time'
        />

        <label htmlFor='location'>Location: </label>
        <input 
          type="text" 
          id='location' 
          name='location' 
          placeholder='Zoom/Office room 3' 
          required 
          onChange={handleChange} 
          value={meetingData.location} 
        />

        <div className="actions-section new-meetings-button">
          <button className="button" type="submit">
            Create Meeting
          </button>
        </div>
      </form>

      <hr className='meetings-hr'/>

      <h3 className='meetings-subheadings'>Current Meetings:</h3>
      <ul className='contacts-list'>
        {meetings.map(meeting => <li className='contact'><p>{meeting.name} on {meeting.date} at {meeting.time} in {meeting.location}</p> </li>)}
      </ul>
    </>
  )
}

export default Meetings