import React from 'react'

const Meeting = ({ meeting }) => {
    return (
        <div className='meeting'>
            <section>
                <h4>Date and Time</h4>
                <p>{meeting.date} {meeting.time}</p>
            </section>

            <section>
                <h4>Location</h4>
                <p>{meeting.location}</p>
            </section>

        </div>
    )
}

export default Meeting