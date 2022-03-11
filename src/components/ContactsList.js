import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props

  function deleteContact(event) {
    // console.log("alright then!", event)
    const options = {
      method: "DELETE",
    }
    fetch(`http://localhost:4000/contacts/${event.id}`, options)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        const contactArr = [...contacts]
        for (let i = 0; i < contactArr.length; i++) {
          if (event.id === contactArr[i].id) {
            console.log(contactArr[i])
            contactArr.splice(i, 1)
            console.log(contactArr)
            setContacts(contactArr)
          }
        }
      })
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
              <Link to={`/contacts/${contact.id}`}>
                <p>View</p>
              </Link>
              <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
              <button onClick={() => deleteContact(contact)}>delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
