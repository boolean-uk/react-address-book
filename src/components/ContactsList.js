import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList({ contacts }) {
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
                {/**  Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>View</Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
