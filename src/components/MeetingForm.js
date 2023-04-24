import React, { useState } from 'react'



const MeetingForm = ({ contactId, meetings, setMeetings }) => {

    const initialData = {
        date: '',
        time: '',
        location: '',
        contactId: contactId
    }

    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:4000/meetings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 201) return res.json()
            })
            .then(data => {
                setData(initialData)
                setMeetings([...meetings, data])
            })
    }

    return (
        <form className='form-stack contact-form' onSubmit={handleSubmit}>

            <label htmlFor='date'>Date:</label>
            <input id="date" name="date" type="date" required onChange={handleChange} value={data.date} />

            <label htmlFor='time'>Time:</label>
            <input id="time" name="time" type="time" required onChange={handleChange} value={data.time} />

            <label htmlFor='location'>Location:</label>
            <input id="location" name="location" type="text" required onChange={handleChange} value={data.location} />

            <div className="actions-section">
                <button className="button blue" type="submit">
                    Create
                </button>
            </div>
        </form>
    )
}

export default MeetingForm