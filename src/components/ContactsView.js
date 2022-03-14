import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()
  console.log(params)

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(contact => setContact(contact))
  }, [params])

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