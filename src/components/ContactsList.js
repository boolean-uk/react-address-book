import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList({contacts, deleteContact, setEditContact}) {
  
  const handleDelete = (contactId) => {
    deleteContact(contactId)
  }

  const handleEdit = (contact) => {
    setEditContact(contact)
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
              <p>
                <span className="link">
                  <Link to={`/contacts/${contact.id}`}>
                    View
                  </Link>
                </span>
                <span className="link">
                  <Link onClick={() => handleEdit(contact)} to={'/contacts/edit'}>
                    Edit
                  </Link>
                </span>
                <span className="link">
                  <Link onClick={() => handleDelete(contact.id)} to={'/'}>
                    Delete
                  </Link>
                </span>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
