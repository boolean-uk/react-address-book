import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props
  
  const deleteContact = async (event) => {

    //first delete the contact from the UseState
    //then asking a request to localhost to delete the contact 
    // asking GET to put out the list of filtered contacts
    const newContacts = contacts.filter((item) => item.id !== event.target.id)
    setContacts(newContacts)

   const res = await fetch ("http://localhost:4000/contacts/" + [event.target.id], {
  method : 'DELETE',
    })

    await fetch("http://localhost:4000/contacts/")
    .then((res) => res.json())
    .then((data) => setContacts(data))

  
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
              <p>
                {/* Make a Link here to view contact  */}
                <Link to={`/contacts/${contact.id}`} >
                  View
                </Link>
             </p>
             <p> 
              <Link to={`/contacts/edit/${contact.id}`} >
              Edit
              </Link>
             </p>
             <p>
              <button onClick={deleteContact} id={contact.id}>
              Delete
              </button>
            </p>
            </li>
            
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
