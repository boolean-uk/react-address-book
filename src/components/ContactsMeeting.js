import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

function ContactsMeeting(props) {
    const { setContacts } = props
    const [meetings, setMeetings] = useState()

    const params = useParams()

    useEffect(function() {
        fetch(`http://localhost:3030/contacts/${params.id}/meeting`)
          .then(res => res.json())
          .then(data => setMeetings(data))
    }, [])

    console.log(meetings[1]);

    return (
        <div>
            <div>
                {/* <h2>List of meetings from {contact.firstName} {contact.lastName}</h2> */}
            </div>
        </div>
    )
}

export default ContactsMeeting