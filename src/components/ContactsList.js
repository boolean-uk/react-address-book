import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList({ contacts, setContacts }) {
  const deleteContact = async (contact) => {
    // Delete contact from contacts
    // Make delete request to server

    const options = {
      method: "DELETE",
    };

    await fetch(`http://localhost:4000/contacts/${contact.id}`, options);

    const filteredContacts = contacts.filter(
      (storedContact) => storedContact.id !== contact.id
    );
    setContacts(filteredContacts);
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, id } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <Link to={`/contacts/${id}`}>View</Link>
              <Link to={`/contacts/edit/${id}`}>Edit</Link>
              <button onClick={() => deleteContact(contact)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
