import { useState } from "react"
import { Link, useSearchParams} from "react-router-dom"

function ContactsList({contacts, setContacts}) {

  // const handleDelete = (index) => {
  //   const contact = contacts[index]
  //   const id = contact.id

  //   fetch(`http://localhost:4000/contacts/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }
  
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
                <Link to={`/contacts/${contact.id}`} >
                View
                </Link>
                &emsp;
                <Link to={`/contacts/edit/${contact.id}`} >
                Edit
                </Link>
                &emsp;
                <button>Delete</button>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
