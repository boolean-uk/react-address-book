import { useState } from "react"
import { Link, useSearchParams, isLoading } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, isLoading } = props

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {isLoading ? <LoadingSpinner /> :
        <ul className="contacts-list">
          {contacts.map((contact, index) => {
            const { firstName, lastName } = contact
            return (
              <li className="contact" key={index}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>
                  <Link to={`/contacts/${contact.id}`}>
                    View
                  </Link>
                </p>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}

export default ContactsList
