import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import '../styles/contactsMeetings.css'

export default function ContactsMeetings() {
    const { id } = useParams()
    const [meetings, setMeetings] = useState([])
    const [meeting, setMeeting] = useState({
        contactId: id,
        date: '',
        time: '',
        location: ''
    })

    useEffect(() => {
        fetch(`http://localhost:3030/meetings?contactId=${id}`)
            .then(res => res.json())
            .then(data => setMeetings(data))
    }, [])

    const inputChanged = (e) => {
        setMeeting({...meeting, [e.target.name]: e.target.value})
    }

    const saveMeeting = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3030/meetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
        })

        const newMeeting = await res.json()

        setMeetings([...meetings, newMeeting])
    }

    return (
        <div>
            <form id="meetingForm" onSubmit={saveMeeting}>
                <label htmlFor="date">Date</label>
                <input required id="date" type="date" name="date" 
                    value={meeting.date} onChange={inputChanged} />
                
                <label htmlFor="time">Time</label>
                <input required  id="time" type="time" name="time" 
                    value={meeting.time}  onChange={inputChanged} />

                <label htmlFor="location">Location</label>
                <input required id="location" type="text" name="location" 
                    value={meeting.location} onChange={inputChanged} />

                <button type="submit">Create</button>
            </form>

            <div>
                {
                    meetings.map((meeting, index) => 
                        <div key={index}>
                            <p>Meeting {index + 1}</p>

                            <ul>
                                <li>
                                    Date: {meeting.date}
                                </li>
                                <li>
                                    Time: {meeting.time}
                                </li>
                                <li>
                                    Location: {meeting.location}
                                </li>
                            </ul>
                        </div>
                    ) 
                }
            </div>
        </div>
    )
}