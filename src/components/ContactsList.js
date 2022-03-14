import { useState } from "react"
import { Link, Route, Routes, useSearchParams } from "react-router-dom"
import ContactsView from "./ContactsView"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props
  // console.log("Log contact list", props)
  console.log("log contact list", props)

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
                <Link to={`/contacts/${contact.id}`}>
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
