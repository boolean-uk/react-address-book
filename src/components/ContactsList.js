import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
// import axios from "axios"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts } = props

  if (!contacts) {
    return <p>Loading contact list...</p>
  }

  const handleDelete = () => {
    //DELETE Api request
    fetch(`http://localhost:3000/people/${contacts.id}`, {
      method: 'DELETE'
    })
    // get it to refresh the page
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
                <Link to={`contacts/${contact.id}`} >View</Link>
                <br />
                <Link to={``} >Edit</Link>
                <br />
                <button className="deleteContactButton"
                  onClick={handleDelete}>
                    Delete
                  {/* <img className="deleteContact" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F48%2F85%2F23%2F4885230fb42908ee3f39bca15b26b7f0.jpg&f=1&nofb=1&ipt=2924e357005e14b4888cf73d30433e1b07d59d4fbdeb700453b73e6973be52bf&ipo=images" /> */}
                </button>
                {/* <Link to={``} >
                  Delete
                </Link> */}

              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
