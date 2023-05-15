import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props;

  if (!contacts || contacts.length === 0) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleDelete = (e) => {
    let id = e.target.value;

    const filteredContacts = contacts.filter((contact) => {
      if (contact.id !== id) {
        return contact;
      }
    });
    setContacts(filteredContacts);

    const opts = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/contacts/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/contacts")
          .then((res) => res.json())
          .then((data) => {
            setContacts(data);
          });
      });
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
                <button onClick={handleDelete} value={contact.id}>
                  Delete
                </button>
                <br></br>
                {/** TODO: Make a Link here to view contact */}

                <Link to={`contacts/edit/${contact.id}`}>
                  <button>Edit</button> <br></br>
                </Link>
                <Link to={`contacts/${contact.id}`}>
                  <button>View</button>
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
