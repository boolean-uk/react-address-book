import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Spinner from "./Spinner"

function ContactsList({contacts, removeContact}) {
  
  if (!contacts) {
    return <Spinner />
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
                { /** TODO: Make a Link here to view contact */}
                {
                  /*
                    The Link component defines a redirection url
                    that will be requested when clicked.
                    That url will be checked against the path 
                    defined in the Route components
                  */
                }
                <Link to={`contacts/${contact.id}`}>
                  View
                </Link>
                <Link to={`contacts/edit/${contact.id}`}>
                  Edit
                </Link>
                <button onClick={() => removeContact(contact.id)}>
                  Delete
                </button>
                <Link to={`contacts/${contact.id}/meetings`}>
                  Meetings
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
