
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  const { contacts, setContacts } = props;
  const deleteContact = async (e) => {
    const res = fetch("http://localhost:3030/contacts/" + [e.target.id], {
      method: "DELETE",
    });
    // useEffect(function () {
    //   fetch("http://localhost:3030/contacts")
    //     .then((res) => res.json())
    //     .then((data) => setContacts(data));
    // }, []);
    const newContacts = contacts.filter (item => item.id !== e.target.id)
    setContacts(newContacts)
  }
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
                <Link to={`/contacts/${contact.id}`}>View</Link>
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
