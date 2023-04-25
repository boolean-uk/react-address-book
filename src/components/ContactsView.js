import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState()
  const [notFound, setNotFound] = useState(true)

  const params = useParams()
  
  useEffect(function() {
    fetch(`http://localhost:3030/contacts/${params.id}`)
    .then(res => {
      if (res.status !== 404) {
        setNotFound(false)
      }
      return res.json()
    })
    .then(data => setContact(data))
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  if (notFound) {
    return <h2>Contact not found!</h2>
  }


  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Street: {contact.street}, City: {contact.city}</p>
      {contact.type && <p>Contact type: {contact.type}</p>}
      {contact.email && <p>Email: {contact.email}</p> }
      {contact.linkedin && <p>LinkedIn: {contact.linkedin}</p> }
      {contact.tweeter && <p>Tweeter: {contact.tweeter}</p> }
    </div>
  )
}

export default ContactsView