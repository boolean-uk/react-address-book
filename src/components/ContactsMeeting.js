import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"


function ContactsMeeting () {
    const params = useParams()
    const [meetings, setMeetings] = useState([])
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: ''
    })

    useEffect(() => {
        fetch(`http://localhost:4000/meetings?contactId=${params.id}`)
        .then(res => res.json())
        .then(data => setMeetings(data))
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // I cannot make it work, because I don't know how to GET meeting.id
    // in order to delete that meeting
    // const handleDelete = async () => {
    //     await fetch(`http://localhost:4000/meetings?id=${meeting.id}`, {
    //         method: 'DELETE'
    //     }) 
    // }

    const handleCreateMeeting = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:4000/contacts/${params.id}/meetings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        setMeetings([...meetings, data])
    
    }

    return (
        <div>
            <div>
                <header>
                    <h2>Meetings for contact with id:{params.id}</h2>
                </header>
                {meetings.map((meeting, index) => {
                    return (
                        <li className="meeting" key={index}>
                            <p>
                                Date: {meeting.date}
                            </p>
                            <p>
                                Time: {meeting.time}
                            </p>
                            <p>
                                Location: {meeting.location}
                            </p>
                            <p>
                                Conact_Id: {meeting.contactId}
                            </p>
                            <button onClick={handleDelete}>Delete Meeting</button>
                        </li>
                    )
                })}
            </div>
            <form className="form-stack contact-form" onSubmit={handleCreateMeeting}>
                <h2>Create Meeting</h2>

                <label htmlFor="date">Date:</label>
                <input id="date" name="date" type="text" required 
                onChange={handleChange} value={formData.date} />

                <label htmlFor="time">Time:</label>
                <input id="time" name="time" type="text" required 
                onChange={handleChange} value={formData.time}/>

                <label htmlFor="location">Location:</label>
                <input id="location" name="location" type="text" required 
                onChange={handleChange} value={formData.location}/>

                <div className="actions-section">
                    <Link to={`/contacts/${params.id}`}>
                    <button className="button blue" type="submit" >
                        Back
                    </button>
                    </Link>
                    <button className="button blue" type="submit" >
                    Create Meeting
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactsMeeting