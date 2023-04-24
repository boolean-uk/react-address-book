import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ContactsList({ contacts, setContacts }) {
  //"contacts" must be passed as prop to this component

  const navigate = useNavigate();
  const deleteContact = async (e) => {
    const newContacts = contacts.filter((item) => item.id !== e.target.id);
    setContacts(newContacts);
    const res = fetch("http://localhost:4000/contacts/" + [e.target.id], {
      method: "DELETE",
    });

    //refresh  contact List
    navigate("/");
    await fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
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
                {/**  Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>View</Link>
                <button onClick={deleteContact} id={contact.id}>
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
