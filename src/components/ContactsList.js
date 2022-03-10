import { useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts } = props
  const params = useParams()



  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map(contact => {
          const { firstName, lastName, id } = contact
          return (
            <li className="contact" key={id}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/${id}`}> View</Link>

              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
