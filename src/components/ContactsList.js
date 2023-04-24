import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList({contacts}) {

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
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
