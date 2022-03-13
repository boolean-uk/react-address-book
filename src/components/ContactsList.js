import { useState } from "react"
import { Link, useSearchParams, useParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props

  const params=useParams()

 function deleteUser(){
   fetch (`http://localhost:4000/contacts/${params.id}`,{
     method:'DELETE'
   })
   .then((result)=>{
    result.json()
    .then((resp)=>{
  console.log(resp)
    })
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
              {/* Right here, I am creating a Link for the 'View' and the Link should target different id's submitted information */}
              <p><Link to={`/contacts/${contact.id}`}>View</Link></p>
              <p><Link to={`/contacts/${contact.id}/edit`}>Edit</Link></p>
              <button onClick={()=>deleteUser(`${contact.id}`)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
