import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Spinner from "./LoadingSpinner/Spinner.js"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, loading } = props

  const handleDelete = async id => {

    // send DELETE request to REMOVE an existing contact
    const fetchOptions = {
      method: 'DELETE'
    }
    // await fetch response
    const res = await fetch(`http://localhost:4000/contacts/${id}`, fetchOptions)
    // extract response data
    const data = await res.json()
    //
    const filteredContacts = contacts.filter(contact => {
      contact.id !== id
    })
    console.log(filteredContacts)
    setContacts(filteredContacts)
  }

  if (!contacts) {
    return <Spinner />
  }
  
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>

      { loading ? 
        <Spinner /> :
        <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, type } = contact
          console.log(firstName, lastName)
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName} ({type})
              </p>
              <p>
                <Link to={`/contacts/${contact.id}/view`}>View</Link>
                <Link to={`/contacts/${contact.id}/edit`} state={{contact}}>Edit</Link>
                <a href='' onClick={() => handleDelete(contact.id)}>Delet this</a>
              </p>
            </li>
          )
        })}
      </ul>
      }
      
    </>
  )
}

export default ContactsList
