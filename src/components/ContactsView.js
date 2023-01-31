import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function ContactsView() {
  const [contact, setContact] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then(res=>res.json())
      .then(data=>setContact(data))
  },[id])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <p>Email: <span>{contact.email}</span></p>
      <p>LinkedIn: <span>{contact.linkedIn}</span></p>
      <p>Twitter: <span>{contact.twitter}</span></p>
    </div>
  )
}

export default ContactsView