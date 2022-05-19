import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, isPending } = props

  const handleDelete = (id) => {
    const opts = { method: "DELETE" }
    fetch(`http://localhost:4000/contacts/${id}`, opts)

    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {isPending && <CircularProgress />}
      {contacts && contacts.length === 0 && <span>No contacts...</span>}
      {contacts && <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>
                  View
                </Link>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </p>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default ContactsList
