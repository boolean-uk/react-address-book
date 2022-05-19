import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)
  const { firstName, lastName, street, city, contactType } = contact

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const { id } = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:4000/contacts?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const retrievedContact = data[0]
        setContact(retrievedContact)
      })
  }, [id])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div className="contacts-view">
      <h2>{contactType === 'personal' ? <>&#127867;</> : <>&#128188;</>} {firstName} {lastName}</h2>
      <p>{street} {city}</p>
      {contact.email && <p>{contact.email}</p>}
      {contact.linkedIn && 
        <a href={`https://www.linkedin.com/in/${contact.linkedIn}`} target="_blank">
          {contact.linkedIn}
        </a>}
      {contact.twitter && 
        <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
          {contact.twitter}
        </a>}
        <Link to={`/contact/${contact.id}/meetings`} >
          <p>See meetings</p>
        </Link>
        <Link to={`/contacts/${contact.id}/edit`} >
          <p>Edit</p>
        </Link>
    </div>
  )
}

export default ContactsView