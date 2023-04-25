import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} - {contact.city}</p>
      <p>{contact && contact.email}</p>
      <p>{contact && contact.twitter}</p>
      <p>{contact && contact.linkedin}</p>
      <Link to={`/contacts/${contact.id}/meetings`} state={{contact}}>See Meetings</Link>
    </div>
  )
}

export default ContactsView
