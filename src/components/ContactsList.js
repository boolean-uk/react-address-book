import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Oval } from "react-loader-spinner"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, isLoading } = props


  const deleteContact = (id) => {
    fetch(`http://localhost:4000/contacts/${id}`, {
    method: 'DELETE'
    })
    setContacts(contacts.filter(entry => entry.id !== id))
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      { isLoading ?
      <Oval
      height = "80"
      width = "80"
      radius = "9"
      color = 'green'
      ariaLabel = 'three-dots-loading'
      /> : (
      <ul className="contacts-list">
        <input type="checkbox"></input>
        <input type="checkbox"></input>
        {(contacts.length === 0)&& <p>You have no contacts yet! Add your <Link to='/contacts/add'>first contact</Link></p>}
        {contacts.map((contact, index) => {
          const { firstName, lastName, type } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName} {type === "personal" ? ('🧑‍🤝‍🧑') : ('💼')}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>View</Link>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
              </p>
              <p onClick={() => deleteContact(contact.id)}>Delete</p>
            </li>
          )
        })}
      </ul>
      )
      }
    </>
  )
}

export default ContactsList
