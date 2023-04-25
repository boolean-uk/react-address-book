import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

const initialState = {
      name: "",
      time: "",
      location: ""
};

function ContactsMeeting() {
    const [contact, setContact] = useState(false)
    const [meetings, setMeetings] = useState(initialState)

    const params = useParams()

    useEffect(function() {
        fetch(`http://localhost:3030/contacts/${params.id}`)
          .then(res => res.json())
          .then(data => setContact(data))
      }, [])

    useEffect(function() {
        fetch(`http://localhost:3030/contacts/${params.id}/meetings`)
          .then(res => res.json())
          .then(data => setMeetings(data))
    }, [])

    if (!contact) {
        return <p>Loading</p>
      }
    
    return (
        <div>
            {console.log(contact)}
            <h2>List of meetings for {contact.firstName} {contact.lastName}</h2>
            <ul className="contacts-list">
                {console.log(meetings)}
                {meetings.map((meeting, index) => {
                const { name, time, location } = meeting
                return (
                    <li className="contact" key={index}>
                    <p>
                        {name} {time} {location}
                    </p>
                    </li>
                )
                })}
            </ul>
        </div>
    )
}

export default ContactsMeeting