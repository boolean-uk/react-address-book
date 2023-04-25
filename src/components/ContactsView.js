import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState({})

  const params = useParams()
  //in built react functions that takes the last part of the URL an puts is as an
  // object for it to use

  useEffect(function() {
    fetch(`http://localhost:4000/contacts/${params.id}`)
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
      <p>LinkedIn: {contact.linkedin} </p>
      <p>Twitter: {contact.twitter}</p>
    </div>
  )
}

export default ContactsView