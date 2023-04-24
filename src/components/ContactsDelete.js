import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

function ContactsDelete(props) {


  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const params = useParams()
  const navigate = useNavigate();

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleDelete = async () => {
    await fetch(`http://localhost:4000/contacts/${params.id}`, {
        method: 'DELETE',
    })
    console.log(contacts[0])
    console.log(params.id)
    const updateContacts = contacts.filter(item => Number(item.id) !== Number(params.id))
    console.log("OK")
    console.log(updateContacts)
    setContacts([...updateContacts])
    navigate('/')
  }


  return (
    <div>
        <h2>{contacts.firstName} {contacts.lastName}</h2>
        <p>{contacts.street} {contacts.city}</p>
        <p> Delete this Contact! </p>
        <button onClick = {handleDelete}>Delete</button>
    </div>
  )
}

export default ContactsDelete