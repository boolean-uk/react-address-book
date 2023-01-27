import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  const contactID = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${contactID.id}`)
    .then((res)  => res.json())
    .then((data) => {
        console.log("Fetching contact...")
        setContact(data)
    })
  }, [contactID])

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