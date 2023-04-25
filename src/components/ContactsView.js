import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useSearchParams} from "react-router-dom"

export default function ContactsView() {
  const [contact, setContact] = useState({})

  const params = useParams()  //looks at the url, extracts the last part of the url

  useEffect(function() {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setContact(data))
  }, [])

  if (!contact) {
    return <p>Loading</p>
  }

  function emptyField (field) {
    if (field) {
      return <p>{field}</p>
    }
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}
      {emptyField(contact.email)}
      {emptyField(contact.linkedin)}
      {emptyField(contact.twitter)} </p>
        <Link to={`/contacts/${contact.id}/meetings`} >
          Meetings
        </Link>
    </div>
  )
}