import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"


function ContactsView() {
  const [contact, setContact] = useState(false)

  const params = useParams()

  useEffect(function() {
    fetch(`http://localhost:3030/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <p>{contact.email}</p>
      <p><a href={contact.linkedin} target="_blank">LinkedIn</a></p>
      <p><a href={contact.twitter} target="_blank">Twitter</a></p>
      <Link to={`/contacts/meetings/${contact.id}`}>Meetings</Link>
    </div>
  )
}

export default ContactsView