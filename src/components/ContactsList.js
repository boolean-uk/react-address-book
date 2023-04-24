import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { loading, contacts } = props

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
      {loading ? <div className="spinner-container"><div className="loading-spinner"></div></div> : <></>}
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`}>View</Link>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                <Link to={`/contacts/delete/${contact.id}`}>Delete</Link>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
