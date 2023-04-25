import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState({})
  const params = useParams() //Part of react router - function that extracts last part of url and returns it as an object

  useEffect(function () {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(res => res.json())
    .then(data => setContact(data))
  }, [])

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Address: {contact.street} {contact.city}</p>
      <p>Email: {contact.email}</p>
      <p>LinkedIn: {contact.linkedIn}</p>
      <p>Twitter: {contact.twitter}</p>
    </div>
  )
}

export default ContactsView