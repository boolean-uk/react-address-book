import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props
  // const contactDelete = (deleteId) => { 
    
  // }
  // async it allows you to use the await keeper
  // 
  const contactDelete= async (e) => {
    // const navigate = useNavigate()
    const newContacts = contacts.filter((item) => item.id !== e.target.id);
    setContacts(newContacts)
    await fetch(`http://localhost:4000/contacts/${e.target.id}`, {
     method: "DELETE",
    });
    // history.push("/");
    // navigate("/") 
    await fetch("http://localhost:4000/contacts")
    .then((res) => res.json())
    .then((data) => setContacts(data));
   };

  //  setContacts(newContacts);

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
                <Link to={`/contacts/${contact.id}`} >
                {/* <Link to={`/contacts/add/${contact.id}`}> */}
                {/* <link to={`/`} */}
                View
                </Link>
                {/* // this function requires an argument */}
                <button onClick={contactDelete} id = {contact.id}>Delete</button>
              </p>
              {/* <p> <Link to={`/contacts/${contact.contactsDelete}`}>Delete</Link> 
              </p> */}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
