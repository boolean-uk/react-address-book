import { useState } from "react"
import { Link, useSearchParams} from "react-router-dom"

function ContactsList({contacts, setContacts}) {

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
                <Link to={`/contacts/${contact.id}`} >
                View
                </Link>
                &emsp;
                <Link to={`/contacts/edit/${contact.id}`} >
                Edit
                </Link>
                &emsp;
                <Link to={`/contacts/delete/${contact.id}`} >
                Delete
                </Link>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
