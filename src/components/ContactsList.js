import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList({ contacts, isPending, error }) {
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
            const { firstName, lastName } = contact;
            return (
              <li className="contact" key={index}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>
                  <Link to={`/contact/${contact.id}`}>View</Link>
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default ContactsList;
{
  /** TODO: Make a Link here to view contact */
}
