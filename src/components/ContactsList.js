import { useState,  } from "react"
import { Link, useSearchParams, useParams } from "react-router-dom"

function ContactsList({contacts, setContacts}) {

  const params = useParams()
  const onDelete =  (contactId)=>{
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    const res = fetch(`http://localhost:4000/contacts/${contactId}`, requestOptions)
    .then(response =>{ 
      if(response.status === 200){
        const newList = contacts.filter((item) => item.id !== contactId);
        setContacts(newList)
      }
    })
    // const data = await res.json()
    // console.log(data)

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
                <Link to={`/contacts/${contact.id}`}>
                  View
                </Link>&nbsp;
                <Link to={`/contacts/${contact.id}/edit`} >
                  Edit
                </Link>
                <button onClick={() => onDelete(contact.id)}>Delete</button>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList