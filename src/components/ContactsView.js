import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState({})

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()
  useEffect(()=> {
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
      <p>{contact.street} {contact.city}</p>
      <p>Email: {contact.email}</p>
      <p>LinkedIn: {contact.linkedin}</p>
      <p>Twitter: {contact.twitter}</p>

      <Link to={`/contacts/${params.id}/meetings`} >
      Meetings 
      </Link>


    </div>
  )
}

export default ContactsView