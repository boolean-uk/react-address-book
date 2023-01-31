import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props;

  function handleDelete(contact) {
    // Delete the contact
    fetch(`http://localhost:4000/contacts/${contact.id}`, {
      method: "DELETE",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        const filteredContacts = contacts.filter(
          (contactInfo) => contactInfo.id !== contact.id
        );
        setContacts(filteredContacts);
      });
  }
  // - (between tags) and &nbsp for space

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
                <Link to={`/contacts/${contact.id}`}>View</Link>&nbsp;
                <button onClick={() => handleDelete(contact)}>Delete</button>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
