import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import workLogo from "../components/images/Screenshot 2023-04-25 172916.png"
import personalLogo from "../components/images/freetime icon.png"

function ContactsList({ isLoading, contacts, setContacts }) {
  const deleteContact = async (contactId) => {
    await fetch(`http://localhost:4000/contacts/${contactId}`, {
      method: "DELETE",
    });

    const filteredContacts = contacts.filter((item) => item.id != contactId);

    setContacts(filteredContacts);
  };

  const handleClick = (e) => {
    deleteContact(e.target.id);
  };
  if (!isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>

      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, contactType } = contact;
          let workPersonal = <p></p>
          if (contactType == "work"){
            workPersonal = <img className="logo" src={workLogo} />
            
          } else if (contactType == "personal") {
            workPersonal = <img className="logo" src={personalLogo}/>
          }
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName} 
              </p>
              {workPersonal}
              <span>
                <Link to={`/contacts/${contact.id}`}>View</Link>
              </span>
              <span className="edit" id={contact.id}>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
              </span>
              <span className="delete" id={contact.id} onClick={handleClick}>
                Delete
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
