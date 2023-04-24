import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState({})

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  const params = useParams()  //looks at the url, extracts the last part of the url
  //console.log(params)

  useEffect(function() {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  function emptyField (field) {
    if (field) {
      return <p>{field}</p>
    }
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      {emptyField(contact.email)}
      {emptyField(contact.linkedin)}
      {emptyField(contact.twitter)}
    </div>
  )
}

export default ContactsView