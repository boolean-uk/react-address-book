import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

function ContactsList({contacts, isLoading}) {

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {isLoading ? <LoadingSpinner /> : <></>}
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`contacts/${contact.id}`}>
                  View
                </Link>
              </p>
              <p>
                <Link to={`contacts/update/${contact.id}`}>
                  Edit
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
