import { useState } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";


function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts } = props
  const navigate = useNavigate()

  // const ContactID = useParams()
  const { id } = useParams();

  if (!contacts) {
    return <p>Loading contact list...</p>
  }


  //DELETE Api request
  // fetch(`http://localhost:4000/contacts/${ContactID.id}`, {
  //   method: 'DELETE'
  // })
  // get it to refresh the page


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
                <Link to={`contacts/${contact.id}`} >View</Link>
                <br />
                <Link to={`/contacts/editContact/${contact.id}`} >Edit</Link>
                <br />
                <button className="deleteContactButton"
                  onClick={() => {
                    console.log("delete.clicked", contact.id)
                    // DELETE Api request
                    fetch(`http://localhost:4000/contacts/${contact.id}`, {
                      method: 'DELETE'
                    })
                  }}>
                  Delete
                  <img className="deleteContact" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F48%2F85%2F23%2F4885230fb42908ee3f39bca15b26b7f0.jpg&f=1&nofb=1&ipt=2924e357005e14b4888cf73d30433e1b07d59d4fbdeb700453b73e6973be52bf&ipo=images" />
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
