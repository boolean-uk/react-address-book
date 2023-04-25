const Meetings = (props) => {

  const {userId, meetings, setMeetings} = props

  const filteredMeetings = meetings.filter(meeting => meeting.userId === userId)

  const deleteMeeting = (id) => {
    fetch(`http://localhost:4000/meetings/${id}`, {
    method: 'DELETE'
    })
    setMeetings(meetings.filter(entry => entry.id !== id))
  }


  return(
    <>
      <ul>
      {filteredMeetings.map((meeting, index) => {
          const { time, date, location } = meeting
          return (
            <li key={index}>
              <p>
                {time} {date} {location}
              </p>
              <p onClick={() => deleteMeeting(meeting.id)}>Delete</p>
            </li>
          )
        })}
      </ul>
    </>

  )
}

export default Meetings
