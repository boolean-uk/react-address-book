import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts} = props
  
  
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName ,id } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${id}`}>  View </Link>
               
              </p>
                 

              {/* <p className="deleteContact" onClick={
                function clickDelete(){
                  const options = {
                    method:"DELETE"
                  }
                  fetch(`http://localhost:4000/contacts/${contact.id}`,options)
                  .then((res) => res.json())
                  .then(() =>{
                    fetch("http://localhost:4000/contacts")
                    .then((res) => res.json())
                    .then((data) =>{
                      setContact(data)
                    })
                  })
                }}
          >
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
