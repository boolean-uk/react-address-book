import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ContactsList({ contacts, setContacts }) {
  const navigate = useNavigate();

  const deleteRequest = (contactId) => {
    fetch(`http://localhost:4000/contacts/${contactId}`, {
      method: "DELETE",
    }).then(() => {
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      setContacts(updatedContacts);
    });
  };

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
              <div>
                <Link to={`/contacts/${contact.id}`} state={{ contact }}>
                  <p>View</p>
                </Link>
                <Link to={`/contacts/${contact.id}/edit`} state={{ contact }}>
                  <p>Edit</p>
                </Link>
                <button onClick={() => deleteRequest(contact.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
