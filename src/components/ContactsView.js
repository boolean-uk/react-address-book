import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  const { id }= useParams();

  //With useEffect, load the contact when params changes
  //and update contact state
useEffect(() => {
//GET request to fetch contact by id
fetch(`http://localhost:4000/contacts/${id}`)
.then((res) => res.json())
.then((contactData) => {
  setContact(contactData)
  // console.log("contactData:", contactData)
})

//once data is returned, update state property to display 
//the contact on the page


}, 
//params.id = dependency. can uncomment 
//line below once rest of code is sorted
[contact.id]
)


  if (!contact) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
    </div>
  )
}

export default ContactsView