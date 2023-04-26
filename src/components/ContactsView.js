import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4040/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])


  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <span className="contact-actions">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>{contact.firstName} {contact.lastName}</h2>
          <h4 style={{ color: '#ec7e24', fontWeight: 'bold' }}>{contact.contactType.toUpperCase()}</h4>
        </div>

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
export default ContactsView;