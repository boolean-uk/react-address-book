import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  const { contacts, setContacts, loading } = props
  

  const handleDelete = (contact) => {
    const options = {
      method: 'DELETE', 
    }
  
    fetch(`http://localhost:4000/contacts/${contact.id}`, options)
    .then(() => {
      const contactsWithoutRemoved = contacts.filter(person => person.id !== contact.id)
      setContacts(contactsWithoutRemoved)
    })
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {!loading && contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <div>
              <p>
              <Link to={`/contacts/${contact.id}`}>View</Link>
              </p>
              <a href='#' onClick={() => handleDelete(contact)}>Delete</a>
              <p>
              <Link to={`/contacts/add`} state={contact}>
                Edit
              </Link>
              </p>
              </div>
            </li>
          )
        })}
        {loading && <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>}
      </ul>
    </>
  )
}

export default ContactsList
