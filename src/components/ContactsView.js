import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state


const params = useParams()
console.log(params)

useEffect(() => {
  fetch(`http://localhost:4000/contacts/${params.id}`)
  .then(response => response.json())
  .then (response =>{
    setContact(response)
  })
}, [params])


  if (!contact) {
    return <div className="spinner-border"></div>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street}, {contact.city}</p>
      <p>{contact.email}</p>
      <p>{contact.linkedIn}</p>
      <p>{contact.twitter}</p>
      <br/>
      <p><Link to={`/contact/${contact.id}/meetings`}>Meetings</Link></p>
    </div>
    
  )
}

export default ContactsView