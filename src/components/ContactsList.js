import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { baseUrl } from "../utils/baseUrl";

function ContactsList({ contacts, setContacts, isPending, error }) {
  async function deleteFromLocalServer(id) {
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    } catch (e) {
      console.log(e);
    }

    setContacts((previous) => previous.filter((item) => item.id !== id));
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {isPending && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        {contacts &&
          contacts.map((contact, index) => {
            console.log(contact.id);
            const { firstName, lastName } = contact;
            return (
              <li className="contact" key={index}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>
                  <Link to={`/contact/${contact.id}`}>View</Link>
                </p>
                <button onClick={() => deleteFromLocalServer(contact.id)}>
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default ContactsList;
