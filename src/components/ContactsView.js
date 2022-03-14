import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(response => response.json())
    .then(json => setContact(json))
  }, [params])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      {contact.email && <p>{contact.email}</p>}
      {contact.linkedin && <p>{contact.linkedin}</p>}
      {contact.twitter && <p>{contact.twitter}</p>}
      <Link to={`/contacts/${contact.id}/meetings`}>Meetings</Link>
    </div>
  )
}

export default ContactsView