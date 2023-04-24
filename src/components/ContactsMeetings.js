import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

const initialDate = {
    date: '',
    location: '',
    time: '',
    contactId: null
}

function ContactsMeetings() {
    const params = useParams()
    initialDate.contactId = params.id

    const [meetings, setMeetings] = useState([])
    const [date, setDate] = useState(initialDate)

    useEffect(function() {
        fetch(`http://localhost:3030/meetings?contactId=${params.id}`)
        .then(res => res.json())
        .then(data => setMeetings(data))
    }, [])

    useEffect(() => {
        setDate(initialDate)
    },[meetings])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (date.location !== initialDate.location && date.time !== initialDate.time && date.date !== initialDate.date) {
            const res = await fetch("http://localhost:3030/meetings", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(date)
            })

            const data = await res.json()
            setMeetings([...meetings, data])
        } else {
            alert("Fill the fields correctly please")
        }
    }

    const handleChange = (e) => {
        const {name , value} = e.target
        setDate({...date, [name] : value})
    }

    const handleDelete = async (meetId) => {
        await fetch(`http://localhost:3030/meetings/${meetId}`, {
            method: "DELETE"
        })

        const deletedMeetings = meetings.filter(item => item.id !== meetId)
        setMeetings(deletedMeetings)
    }

    return (
        <>
            <header>
                <form className="date-form">
                    <div className="date">
                        <label htmlFor="meeting">Schedule a meeting: 
                            <input onChange={handleChange} type="date" className="mg-l" id="date" name="date" value={date.date} required/>
                        </label>
                    </div>
                    <div className="date">
                        <label htmlFor="time">Select a time: 
                            <input onChange={handleChange} type="time" className="mg-l" id="time" name="time" value={date.time} required></input>
                        </label>
                    </div>
                    <div className="date">
                        <label htmlFor="location">Location: 
                            <input onChange={handleChange} type="text" className="mg-l" id="location" name="location" size="20" value={date.location} required ></input>
                        </label>
                    </div>
                    <input onClick={handleSubmit} type="submit" className="submit-date"/>
                </form>
            </header>
            <ul className="contacts-list">
                {meetings.map((item, index) => {
                    return (
                        <li key={index}>
                            <p>{item.date}</p>
                            <p>Time: {item.time}</p>
                            <p>Location: {item.location}</p>
                            <Link onClick={() => handleDelete(item.id)} to={`/contacts/${params.id}/meetings`}>
                                Delete
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ContactsMeetings