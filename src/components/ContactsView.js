import { useEffect, useState } from "react"
import { Bars } from 'react-loader-spinner'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then((res) => res.json())
    .then((data) => setContact(data))
  }, [params])

  if (!contact) {
    return (<Bars/>)
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <br></br>
      <h4>Contact details:</h4>
      <br></br>
      <p><strong>{contact.contact}:</strong></p>
      <p>{contact.contactDetails}</p>
      <Link to={`/contact/${contact.id}/meetings`}>Meetings</Link>
    </div>
  )
}

export default ContactsView