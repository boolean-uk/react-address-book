import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/links.css";

function ContactsList({ contacts }) {
  //"contacts" must be passed as prop to this component
  // const { contacts } = props;

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
                <Link to={`/contacts/${contact.id}`} className="link">
                  View
                </Link>
                {/* {console.log(contact)} */}
                <Link to={`/contacts/edit/${contact.id}`} className="link">
                  Edit
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
