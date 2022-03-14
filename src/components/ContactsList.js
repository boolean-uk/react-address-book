import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts} = props

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }

  const handleDelete = id => {
    fetch(`http://localhost:4000/contacts/${id}`,options)
        .then(setContacts(contacts => contacts.filter(contact => contact.id != id)))
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
        <button><Link to="/add">Add New Contact</Link></button>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
              <button><Link to= {`/${contact.id}`}>
                View
              </Link></button>
              <button><Link to= {`${contact.id}/edit`}>
                Edit
              </Link></button>
              <button onClick={e => handleDelete(contact.id)}>Delete</button>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
