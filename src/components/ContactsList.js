import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props

  const removeContact = (id) => {
    console.log('contact to remove', id)

    const updatedContacts = [...contacts]
    const removeIndex = updatedContacts.findIndex(contact=> contact.id == id)
    updatedContacts.splice(removeIndex,1)
    setContacts(updatedContacts)

    const options = {
      method: "DELETE"
    }
    fetch(`http://localhost:4000/contacts/${id}`,options)
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <Link to={`/contacts/${contact.id}`}>
                <div>View</div>
              </Link>
              <Link to={`contacts/${contact.id}/edit`}>
                <div>Edit</div>
              </Link>
              <button onClick={()=>{removeContact(contact.id)}}>
                Remove
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
