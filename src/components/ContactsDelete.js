import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

function ContactsDelete(props) {
    const { setContacts } = props
    const [contact, setContact] = useState()
  
    const navigate = useNavigate()
    const params = useParams()

    useEffect(function() {
        fetch(`http://localhost:3030/contacts/${params.id}`)
          .then(res => res.json())
          .then(data => setContact(data))
    }, [])

    const deleteContact = async (e) => {
        await fetch(`http://localhost:3030/contacts/${params.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }});
        await fetch("http://localhost:3030/contacts")
        .then(res => res.json())
        .then(data => setContacts(data))
        navigate('/')
    }

    if (!contact) {
        return <p>Loading</p>
    }

    return (
        <div>
            <div>
                <h2>{contact.firstName} {contact.lastName}</h2>
                <p>{contact.street} {contact.city}</p>
                <p>{contact.email}</p>
                <p><a href={contact.linkedin} target="_blank">LinkedIn</a></p>
                <p><a href={contact.twitter} target="_blank">Twitter</a></p>
            </div>
            <div>
                <p>Are you sure you want to delete this contact?</p>
                <button className="button blue" onClick={deleteContact}>
                Yes
                </button>
                <button className="button blue">
                <Link to={'/'}>No</Link>
                </button>
            </div>
        </div>
    )
}

export default ContactsDelete