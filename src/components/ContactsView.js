import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function ContactsView () {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(res => {
        setContact(res)
      })
  }, [params])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{ contact.firstName } { contact.lastName }</h2>
      <p>{ contact.street } { contact.city }</p>
      <p>LinkedIn: { contact.linkedIn }</p>
      <p>Twitter: { contact.twitter }</p>
      <p>Email: { contact.email }</p>
      <Link to={ `/contact/${contact.id}/edit` } >Edit</Link>
    </div>
  )
}

export default ContactsView