import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Meeting from './Meeting'
import MeetingForm from './MeetingForm'

const Meetings = () => {

    const [meetings, setMeetings] = useState(null)

    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:4040/meetings?contactId=${params.id}`)
            .then(res => res.json())
            .then(data => setMeetings(data))
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <MeetingForm contactId={params.id} meetings={meetings} setMeetings={setMeetings} />
            {!meetings ?
                <div className='loading-spinner'>

                </div> :
                meetings.map((meeting, index) => {
                    return <Meeting key={index} meeting={meeting} />
                })}
        </div>
    )

}

export default Meetings;