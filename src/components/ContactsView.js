import { CameraIcon, UserGroupIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])


  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <span className="contact-actions">
        <h2>{contact.firstName} {contact.lastName}</h2>
        <Link className="nav-element" to={`/contact/${contact.id}/meetings`}>
          <div className="meet-link">
            <h4>Meetings</h4>
          </div>
        </Link>
      </span>

      {contact.email && <>
        <h4>Email</h4>
        <p>{contact.email}</p>
      </>}
      {contact.linkedin && <>
        <h4>LinkedIn</h4>
        <p>{contact.linkedin}</p>
      </>}
      {contact.twitter && <>
        <h4>Twitter</h4>
        <p>{contact.twitter}</p>
      </>}

      <h4>Address</h4>
      <p>{contact.street} {contact.city}</p>
    </div>
  )
}

export default ContactsView