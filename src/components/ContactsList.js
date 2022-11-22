import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiWinkSmile } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";

function ContactsList({ contacts, setContacts }) {
  const [currentContact, setCurrentContact] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();
  const confirmPopup = useRef(null);
  const successMessage = useRef(null);

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
    // rehide the confirm popup

    // show success message for 2 seconds
    successMessage.current.style.display = "block";
    cancelDelete();
    setTimeout(() => {
      successMessage.current.style.display = "none";
    }, 2000);
  };

  // filters
  let filteredContacts = contacts;

  const type = searchParams.getAll("type");

  if (type[0] === "work") {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.type === "work"
    );
  }

  if (type[0] === "personal") {
    filteredContacts = filteredContacts.filter(
      (contact) => contact.type === "personal"
    );
  }

  // If type has both 'work' and 'personal', set it back to the full contact list
  if (type.length > 1) {
    filteredContacts = contacts;
  }

  const confirmDelete = (user) => {
    confirmPopup.current.style.visibility = "visible";
    setCurrentContact(user);
  };

  const cancelDelete = () => {
    confirmPopup.current.style.visibility = "hidden";
  };

  return (
    <>
      <header className="title-and-btns">
        <h2>Contacts</h2>
        <div className="filter-container">
          <button
            onClick={() => setSearchParams({ type: ["work", "personal"] })}
          >
            All
          </button>
          <button onClick={() => setSearchParams({ type: "work" })}>
            Work
          </button>
          <button onClick={() => setSearchParams({ type: "personal" })}>
            Personal
          </button>
        </div>
      </header>
      <ul className="contacts-list">
        {filteredContacts.map((contact, index) => {
          const { firstName, lastName, id, type } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              {type === "work" ? <FaSuitcase /> : <BiWinkSmile />}
              <Link to={`/contacts/${id}`} className="btn view">
                View
              </Link>
              <Link to={`/contacts/edit/${id}`} className="btn edit">
                Edit
              </Link>
              <button
                onClick={() => confirmDelete(contact)}
                className="btn delete"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <p className="success" ref={successMessage}>
        Contact successfully deleted!
      </p>
      <div className="delete-confirm" ref={confirmPopup}>
        <p>Are you sure?</p>
        <div className="btn-container">
          <button onClick={() => deleteContact(currentContact)}>
            Confirm delete
          </button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default ContactsList;
