import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3030/contacts/${id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <div>
        <h4>Contact Info</h4>
        <p>Email: {contact.email}</p>
        <p>LinkedIn: {contact.linkedIn}</p>
        <p>Twitter: {contact.twitter}</p>
      </div>
    </div>
  )
}

export default ContactsView