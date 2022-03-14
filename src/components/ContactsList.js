import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props

  console.log("log contact list ma boy", props)

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
                {/* add link tags and then using to with strings indicating the location of the link */}
                <Link to={`/contacts/${contacts.id}`} >
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
