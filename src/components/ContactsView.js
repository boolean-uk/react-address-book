import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "./LoadingSpinner/Spinner"

function ContactsView(props) {
  const [contact, setContact] = useState(false)
  const {id} = useParams()

  const {loading} = props

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`)
    const data = await res.json()
    setContact(data)
  }, [])


  if (!contact) {
    return <Spinner />
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Pronouns: {contact.pronouns}</p>
      <p>Address: {contact.street}, {contact.city}</p>
      <br></br>
      <p>Contact Info:</p>
      <p>{contact.email}</p>
      <p>LinkedIn: {contact.linkedIn}</p>
      <p>Twitter: {contact.twitter}</p>
    </div>
  )
}

export default ContactsView