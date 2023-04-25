import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { loading, contacts, getContacts } = props;
  let { filterWork, filterPersonal } = props;

  const turnOnWorkFilter = (e) => {
    props.setFilterWork((filterWork = !filterWork));
    console.log("filterWork= ", filterWork, "filterPersonal= ", filterPersonal);
    getContacts();
  };
  const turnOnPersonalFilter = (e) => {
    props.setFilterPersonal((filterPersonal = !filterPersonal));
    console.log("filterWork= ", filterWork, "filterPersonal= ", filterPersonal);
    getContacts();
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <h3>
        Filter on <button onClick={turnOnWorkFilter}>💼</button> and/or{" "}
        <button onClick={turnOnPersonalFilter}>🙍</button>
      </h3>
      <ul className="contacts-list">
        {loading ? (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <></>
        )}
        {contacts.map((contact, index) => {
          const { firstName, lastName, type } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
                {type === "Work" ? <span>💼</span> : <span>🙍</span>}
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`}>View</Link>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                <Link to={`/contacts/delete/${contact.id}`}>Delete</Link>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
