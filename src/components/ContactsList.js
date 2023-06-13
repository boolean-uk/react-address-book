import { Link, useSearchParams } from "react-router-dom"
import { useEffect, useMemo } from 'react'

import Spinner from "./Spinner"
import Filter from './Filter'

function ContactsList({contacts, removeContact}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const types = searchParams.getAll('type')

  if (!contacts) {
    return <Spinner />
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
        {
          /* Using LinkFilter Component
            <Filter name='Work' contactTypes={['work']} />
            <Filter name='Personal' contactTypes={['personal']} />
            <Filter name='All' contactTypes={['work', 'personal']} />
            <Filter name='Restore' contactTypes={[]} /> 
          */
        }
        <Filter name='Work' typeFilter='work' params={searchParams} />
        <Filter name='Personal' typeFilter='personal' params={searchParams} />
      </header>
      <ul className="contacts-list">
        {contacts.filter(c => types.length ? types.includes(c.contactType) : true)
                  .map((contact, index) => {
          const { firstName, lastName, contactType } = contact
          return (
            <li className="contact" key={index}>
              <p style={contactType === 'work' ? 
                        {backgroundColor: 'rgba(255, 178, 102, 0.3)'} :
                        {backgroundColor: 'rgba(81, 23, 95, 0.3)'}}>
                {firstName} {lastName} {contactType}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                {
                  /*
                    The Link component defines a redirection url
                    that will be requested when clicked.
                    That url will be checked against the path 
                    defined in the Route components
                  */
                }
                <Link to={`contacts/${contact.id}`}>
                  View
                </Link>
                <Link to={`contacts/edit/${contact.id}`}>
                  Edit
                </Link>
                <button onClick={() => removeContact(contact.id)}>
                  Delete
                </button>
                <Link to={`contacts/${contact.id}/meetings`}>
                  Meetings
                </Link>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
