import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  const params=useParams()
  console.log(params)
  console.log('Making a request for contact:' + params.id)

  // I haven't really understood what params does here, but I will read about it.
  // Right here, I am fetching each new information that has been submitted with its specific id and converting to json and updating it.
  useEffect(function(){
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(res=>res.json())
    .then(json => {
      setContact(json)
  })
  }, [params])
  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city} {contact.email} {contact.linkedin} {contact.twitter}</p>
    </div>
  )
}

export default ContactsView