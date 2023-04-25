
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, Route, Routes } from "react-router-dom";
function ContactsView() {
  const [contact, setContact] = useState(false)
  const params = useParams()
  console.log(params);
  useEffect(function () {
    fetch(`http://localhost:3030/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);
  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <div>
        <h3 className="contactview">How to contact: </h3>
        <p>Email: {contact.email}</p>
        <p>LinkedIn: {contact.linkedin}</p>
        <p>Twitter: {contact.twitter}</p>
      </div>
      <Link to ={`/contacts/${params.id}/meetings`} id = {contact.id}>Meetings</Link>
    </div>
    
  )
}

export default ContactsView
