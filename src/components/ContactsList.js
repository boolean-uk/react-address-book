import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  const { contacts, setContacts } = props

  const handleDelete = (contact) => {
    console.log("delete me")
    if (contact.id) {
      fetch(`http://localhost:4000/contacts/${contact.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contacts),
      })
        .then((res) => res.json())
        .then((json) => {
          const updatedContacts = contacts.filter(
            (record) => record.id !== contact.id
          )
          setContacts(updatedContacts)
        })
    }
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
              <Link to={`/contacts/${contact.id}`} state={{ contact }}>
                {" "}
                View{" "}
              </Link>
              <Link to={`/contacts/edit`} state={{ contact }}>
                {" "}
                Edit{" "}
              </Link>
              <Link
                to={`/`}
                state={{ contact }}
                onClick={() => handleDelete(contact)}
              >
                {" "}
                Delete{" "}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
