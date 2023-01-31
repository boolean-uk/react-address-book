import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useEffect } from "react"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        props.setContacts(data)
      })
  }, [])

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts != undefined ?
        contacts.map((contact, index) => {
          const { firstName, lastName, street, city } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`} state={contact}>View</Link>
              </p>
            </li>
          )
        }): ""}
      </ul>
    </>
  )
}

export default ContactsList
