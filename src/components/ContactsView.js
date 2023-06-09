import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState({})

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()
  console.log('params', params)

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.contactID}`)
      .then(res => res.json())
      .then(data => setContact(data)

      )
  }, [params.contactID])
  console.log('contact', contact)
  console.log('paramsid', params.contactID.id)
  if (!contact) {
    return <p>Loading</p>
  }
  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
    </div>
  )
}

export default ContactsView