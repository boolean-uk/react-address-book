import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState([])

  //TODO: Get the contact to load from the params and fetch.
  const { id } = useParams();

  //With useEffect, load the contact when params changes
  //and update contact state
  useEffect(() => {
    //GET request to fetch contact by id
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((contactData) => {
        setContact(contactData)
      })

  },
    //params.id = dependency.
    [contact.id]
  )


  if (!contact) {
    return (
      <>
        <p>Loading...</p>
        <div className="loadingAnimation rotate-center"></div>
      </>
    )
  }

  //will need to add the new parts to contacts through a patch request
  return (
    <div>
      <h2 className="bigger">{contact.firstName} {contact.lastName}</h2>
      <div> <p className="bigger">{contact.street} {contact.city}</p></div>
      <div className="pGrid"><p className="contactLinks">Email:</p> <a>{contact.email}</a> </div>
      <div className="pGrid"> <p className="contactLinks">linkedIn:</p><a>{contact.linkedIn}</a></div>
      <div className="pGrid"> <p className="contactLinks">Twitter:</p> <a>{contact.twitter}</a></div>
    </div>
  )
}

export default ContactsView