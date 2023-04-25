import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { HTTPCONTACTS } from "../http";

URLSearchParams.prototype.remove = function (key, value) {
  const entries = this.getAll(key);
  const newEntries = entries.filter((entry) => entry !== value);
  this.delete(key);
  newEntries.forEach((newEntry) => this.append(key, newEntry));
};

function ContactsList({ contacts, setContacts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const deleteData = (id) => {
    fetch(HTTPCONTACTS + `/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(setContacts(contacts.filter((c) => c.id !== id)));
  };
  const handleDeleteButton = (id) => {
    deleteData(id);
  };
  const handleFilter = (e) => {
    const { name, value } = e.target;
    searchParams.getAll(name).includes(value)
      ? searchParams.remove(name, value)
      : searchParams.append(name, value);
    setSearchParams(searchParams);
  };

  const contactsToRender = contacts.filter((contact) => {
    if (contact.type === undefined) {
      return contact;
    }
    if (searchParams.getAll("type").length === 0) {
      return contact;
    }
    if (searchParams.getAll("type").includes(contact.type)) {
      return contact;
    }
  });

  return (
    <>
      <header>
        <h2>Contacts</h2>
        <div className="buttons">
          <label>
            Personal
            <input
              onClick={handleFilter}
              type="checkbox"
              name="type"
              value="personal"
              id="personal"
              checked={searchParams.getAll("type").includes("personal")}
            />
          </label>
          <label>
            Work
            <input
              value="work"
              onClick={handleFilter}
              type="checkbox"
              name="type"
              checked={searchParams.getAll("type").includes("work")}
              id="work"
            />
          </label>
        </div>
      </header>
      <ul className="contacts-list">
        {contactsToRender.map((contact, index) => {
          return (
            <li className="contact" key={index}>
              <p>
                {contact.type === "work" && "💼 "}
                {contact.type === "personal" && "🍸"}
                {contact.firstName} {contact.lastName}
              </p>
              <p className="links">
                <Link to={`/contacts/${contact.id}`}>View</Link>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                <Link to={`/`} onClick={() => handleDeleteButton(contact.id)}>
                  Delete
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
