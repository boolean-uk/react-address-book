import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiWinkSmile, BiFilter } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";

function ContactsList({ contacts, setContacts }) {
  const [currentContact, setCurrentContact] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  const confirmPopup = useRef(null);
  const successMessage = useRef(null);
  const dropdown = useRef(null);

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

  const filterHover = (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains("filter-btn")) {
      setShowFilters(true);
    }

    // This is surely done in an easier way...
    if (
      !e.target.classList.contains("filter-btn") &&
      !e.target.classList.contains("filter-dropdown") &&
      !e.target.classList.contains("filter") &&
      !e.target.classList.contains("filter-btn-container")
    ) {
      setShowFilters(false);
    }
  };

  return (
    <>
      <section onMouseOver={filterHover}>
        <header className="title-and-btns">
          <h2>Contacts</h2>
          <BiFilter className="filter-btn" />
          <div className={`filter-dropdown ${showFilters && "show"}`}>
            <div className="filter-btn-container">
              <button
                onClick={() => setSearchParams({ type: ["work", "personal"] })}
                className="btn filter"
              >
                All
              </button>
              <button
                onClick={() => setSearchParams({ type: "work" })}
                className="btn filter"
              >
                Work
              </button>
              <button
                onClick={() => setSearchParams({ type: "personal" })}
                className="btn filter"
              >
                Personal
              </button>
            </div>
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
      </section>
    </>
  );
}

export default ContactsList;
