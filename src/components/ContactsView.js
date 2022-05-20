import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()

  useEffect( function() {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(res => res.json())
    .then(json => {
      setContact(json)
    })
  }, [params])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <h4>Email: {contact.email}</h4>
      <h4>LinkedIn: {contact.linkedIn}</h4>
      <h4>Twitter: {contact.twitter}</h4>
    </div>
  )
}

export default ContactsView