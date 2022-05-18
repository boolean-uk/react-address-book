import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:4000/contacts?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        const retrievedContact = data[0]
        setContact(retrievedContact)
      })
  }, [params])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div className="contacts-view">
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      {contact.email && <p>{contact.email}</p>}
      {contact.linkedIn && 
        <a href={`https://www.linkedin.com/in/${contact.linkedIn}`} target="_blank">
          {contact.linkedIn}
        </a>}
      {contact.twitter && 
        <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
          {contact.twitter}
        </a>}
    </div>
  )
}

export default ContactsView