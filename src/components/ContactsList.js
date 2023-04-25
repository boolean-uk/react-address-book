import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Spinner from "./Spinner"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props


  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <Spinner />
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
                <Link to = {`/contacts/${contact.id}`}>
                  View
                </Link>
              </p>
              <p>
              <Link to = {`/contacts/edit/${contact.id}`}>
                  Edit
                </Link>
              </p>
              <p>
              <Link to = {`/contacts/delete/${contact.id}`}>
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
