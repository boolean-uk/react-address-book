import { useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"

function ContactsList(props) {
  const navigate = useNavigate()
  //"contacts" must be passed as prop to this component
  const { contacts, loading } = props
  console.log("this is constacts in list",contacts)
 

  return (
    <>
      <header>
        <h2>Contacts</h2>
        {loading && (
          <img src="https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="loading spinner" />
        )}
      </header>
      <ul className="contacts-list">
        {contacts != undefined
        ? contacts.map((contact, index) => {
          const { firstName, lastName, id} = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
               <Link to={`/contacts/${id}`}>View</Link>
               <br />
               <Link to={`/contacts/edit/${id}`}>Edit</Link> 
              </p>
            </li>
          )
        }): "You Have No Contacts"}
      </ul>
    </>
  )
}

export default ContactsList
