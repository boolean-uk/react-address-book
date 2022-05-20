import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList({ contacts, setContacts }) {
  function handleDelete(id) {
    const opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:4000/contacts/${id}`, opts)
      .then((res) => res.json())
      .then(() => {
        const newContacts = contacts.filter((c) => c.id !== id);
        setContacts(newContacts);
      });
  }

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
                <Link to={`/view/${contact.id}`}>View</Link>
              </p>

              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
