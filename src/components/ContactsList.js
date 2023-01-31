import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props

 

  const handleDelete = (id) => {
    
   
      fetch(`http://localhost:4000/contacts/${id}`, { 
        method: "DELETE" })
        .then(() => {
          fetch("http://localhost:4000/contacts")
            .then((res) => res.json())
            .then((data) => {
              setContacts(data);
            });
        }
      );
    
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
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`} > View</Link>
                 <br/>
                <Link to={`/contacts/edit/${contact.id}`} >  Edit</Link>
                <br/>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </p>
              
            </li>

          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
