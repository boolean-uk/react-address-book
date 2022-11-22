import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Spinner from "./LoadingSpinner/Spinner"

import '../styles/styles.css'

function ContactsView(props) {
  const [contact, setContact] = useState(false)
  const {id} = useParams()

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

      <li className='meetings-button-li'><Link className='meetings-button' to={`/contacts/${contact.id}/meetings`}>Meetings</Link></li>
    </div>
  )
}

export default ContactsView