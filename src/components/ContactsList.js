import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props


//   function deleteContact(contact) {
//     const options = {
//         method: "DELETE"
//     }
//     useEffect(() => {
//         fetch(`http://localhost:4000/contacts/${contact.id}`)
//         .then((res)  => res.json())
//         .then((data) => {
//             console.log("Deleting contact...", data)
//             fetch("http://localhost:4000/contacts")
//             .then((res) => res.json())
//             .then((data) => {
//             setContacts(data)
//     })
//         })
//       }, [])
//   }

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
                <Link to={`/contacts/view/${contact.id}`}>View</Link> 
              </p>
              <p>
              <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
              </p>
              {/* <p onClick={console.log("click")}>
                Delete Contact
              </p> */}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
