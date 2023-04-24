import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props

  const navigate = useNavigate()


  const handleContactDelete = (index) => {
    const contact = contacts[index]
    const id = contact.id
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 200) setContacts(contacts.filter(contact => contact.id !== id))
    })
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
              <span className="contact-actions">
                <div> <Link className="nav-element" to={`/contacts/${contact.id}`}>View</Link></div>
                <div>
                  <Link to='/contacts/add' state={contact}>
                    <PencilIcon className="icon" />
                  </Link>
                </div>
                <div><TrashIcon className="icon" onClick={() => handleContactDelete(index)} /></div>

              </span>

            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
