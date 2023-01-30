import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts,setContacts } = props;


  const clickDelete = (id) => {
    const options = {
      method: "DELETE",
    };
    fetch(
      `http://localhost:4000/contacts/${id}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setContacts(contacts.filter(contact =>{ contact.id !== id}))
       
      });
  }
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
              <p>
                <Link to={`/contacts/${id}`}>
                  {/** TODO: Make a Link here to view contact */}
                  View
                </Link>
              </p>
              <p
                className="deleteContact"
                onClick={() => clickDelete(contact.id)}
              >
                Delete
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
