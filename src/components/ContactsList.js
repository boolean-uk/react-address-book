import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts } = props;

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
                <Link
                  to={`/contact/${contact.id}`}
                  state={{ contact }}
                  className="actionButton"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${contact.id}`}
                  state={{ contact }}
                  className="actionButton"
                >
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
