import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList({ contacts, setContacts }) {
  //"contacts" must be passed as prop to this component

  const handleDelete = async (e, id) => {
    console.log(id);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(`http://localhost:4000/contacts/${id}`, options);
    fetch("http://localhost:4000/contacts/")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
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
              <p>
                {/** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}> View</Link>
                <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
                <button onClick={(e) => handleDelete(e, contact.id)}>
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
