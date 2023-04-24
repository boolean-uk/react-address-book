import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props


  const deleteContact = (id) => {
    fetch(`http://localhost:4000/contacts/${id}`, {
    method: 'DELETE'
    })
    setContacts(contacts.filter(entry => entry.id !== id))
  }


  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {contacts.length === 0 && <p>You have no contacts yet! Add your <Link to='/contacts/add'>first contact</Link></p>}
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>View</Link>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
              </p>
              <p onClick={() => deleteContact(contact.id)}>Delete</p>

            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
