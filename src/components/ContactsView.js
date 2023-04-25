import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState({})

  const params = useParams()

  useEffect(function() {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p><br></br>
      <p>{contact.email}<br></br> {contact.linkedIn} <br></br>{contact.twitter}</p>

    </div>
  )
}

export default ContactsView