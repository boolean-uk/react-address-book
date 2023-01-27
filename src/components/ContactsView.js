import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"

function ContactsView() {

  const [contact, setContact] = useState(false)

  const location = useLocation()
  console.log("this is what is coming into location", location.state)


  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      console.log("locationstate", location.state);
      setContact(location.state);
    }
  }, [location]);

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