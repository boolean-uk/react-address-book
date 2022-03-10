import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  const { contacts, setContacts, loading } = props;

  const handleDelete = (contact) => {
    fetch(`http://localhost:4000/contacts/${contact.id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedContacts = contacts.filter(
        (person) => person.id !== contact.id
      );
      setContacts(updatedContacts);
    });
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className='contacts-list'>
        {loading ? (<img className="spinner" src="https://img.icons8.com/ios/50/4a90e2/spinning-circle--v1.png"/>) : (
          contacts.map((contact, index) => {
            const { firstName, lastName } = contact;
            return (
              <li className='contact' key={index}>
                <p>
                  {firstName} {lastName}
                </p>
                <p>
                  <span>
                    <Link to={`/contacts/${contact.id}`}>View</Link>
                  </span>
                  <span>
                    <Link to={`/contacts/add`} state={{ contact }}>
                      Edit
                    </Link>
                  </span>
                  <span>
                    <a href='#' onClick={() => handleDelete(contact)}>
                      Delete
                    </a>
                  </span>
                </p>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}

export default ContactsList;
