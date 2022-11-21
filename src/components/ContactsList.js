import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiWinkSmile } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";

function ContactsList({ contacts, setContacts }) {
  const [filterCategory, setFilterCategory] = useState("all");

  const deleteContact = async (contact) => {
    // Delete contact from contacts
    // Make delete request to server

    const options = {
      method: "DELETE",
    };

    await fetch(`http://localhost:4000/contacts/${contact.id}`, options);

    const filteredContacts = contacts.filter(
      (storedContact) => storedContact.id !== contact.id
    );
    setContacts(filteredContacts);
  };

  // filters
  let filteredContacts = contacts;

  if (filterCategory === "work") {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.type === "work"
    );
  }

  if (filterCategory === "personal") {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.type === "personal"
    );
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <div className="filter-container">
        <button onClick={() => setFilterCategory("all")}>All</button>
        <button onClick={() => setFilterCategory("work")}>Work</button>
        <button onClick={() => setFilterCategory("personal")}>Personal</button>
      </div>
      <ul className="contacts-list">
        {filteredContacts.map((contact, index) => {
          const { firstName, lastName, id, type } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              {type === "work" ? <FaSuitcase /> : <BiWinkSmile />}
              <Link to={`/contacts/${id}`}>View</Link>
              <Link to={`/contacts/edit/${id}`}>Edit</Link>
              <button onClick={() => deleteContact(contact)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
