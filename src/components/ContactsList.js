import { useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"


function ContactsList({contacts ,setContacts}) {
const params = useParams()
const navigate = useNavigate()
  //"contacts" must be passed as prop to this component
  // const { contacts } = 
 
  console.log(contacts);
  // console.log(conctactId);

  
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          const deleteContact = async () =>{
            await fetch(`http://localhost:4000/contacts/${contact.id}`,{
              method: 'DELETE'
            })
            const filteredContacts = contacts.filter(item => item.id !== contact.id)
              setContacts(filteredContacts)
              // navigate('/')
          }
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p className="edit-view">
                <Link to={`/contacts/${contact.id}`}>
                  View
                </Link>
                <Link to={`/contacts/update/${contact.id}`}>
                  Edit
                </Link>
                  

                <button className="delete" onClick={deleteContact}>Delete</button>
                

              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
