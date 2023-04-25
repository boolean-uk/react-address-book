import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props

  

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
                <Link className="contactView" to={`/contacts/${contact.id}`}>
                  View
                </Link>
                {/* <Link className="contactEdit" to={"/contacts/edit"}>
                  Edit
                </Link> */}
                {/* <Link className="contactDelete" to={"/"} onClick={handleDelete}>
                  Delete
                </Link> */}
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
