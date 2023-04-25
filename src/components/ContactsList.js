import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import '../styles/mine.css'
function ContactsList(props) {
  const { contacts, setContacts } = props;
  
  const deleteContact = async (e) => {

    const newContacts = contacts.filter((item) => item.id !== e.target.id);
    setContacts(newContacts);
    const res = fetch("http://localhost:3030/contacts/" + [e.target.id], {
      method: "DELETE",
    });

    //referesh the data
    await fetch("http://localhost:3030/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  };
  //"contacts" must be passed as prop to this component

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`} className="Link" >View</Link>
                <Link to = {`/contacts/${contact.id}/edit`}className="Link" >Edit</Link>
                <button onClick={deleteContact} id={contact.id}>
                  Delete
                </button>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
