import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  const params = useParams()
  console.log(params)
  useEffect(() => fetch(`http://localhost:4000/contacts/${params.id}`)
          .then(res => res.json())
          .then(json => {
            console.log(json)
            setContact(json)})
          ,[params])
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
    </div>
  )
}

export default ContactsView