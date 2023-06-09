import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts1 } = props
  console.log(contacts1)
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {
          contacts1.map((contact, index) => {
            const { firstName, lastName } = contact
            return (
              <li className="contact" key={index}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>
                  { /** TODO: Make a Link here to view contact */}
                  {<Link to={`/contacts/${contacts1[index].id}`} >
                    View
                  </Link>}
                </p>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default ContactsList
