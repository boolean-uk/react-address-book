import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then(res => res.json())
      .then(contact => setContact(contact))
  }, [id])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <ul><li><span>Street:</span>{contact.street} </li>
        <li><span>City:</span>{contact.city}</li>
        <li><span>Email:</span>{contact.email}</li>
        <li><span>LinkedIn:</span>{contact.linkedIn} <span>Twitter:</span>{contact.twitter}</li>
      </ul>
     
    </div>
  )
}

export default ContactsView