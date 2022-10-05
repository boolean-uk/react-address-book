import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/loadspinner.css";

function ContactsList(props) {
  const navigate = useNavigate();
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props;

  const deleteContact = (id) => {
    if (confirm("Are you sure you want to delete this contact?") == true) {
      fetch(`http://localhost:4000/contacts/${id}`, { method: "DELETE" }).then(
        () => {
          console.log("Delete successful");
          fetch("http://localhost:4000/contacts")
            .then((res) => res.json())
            .then((data) => {
              setContacts(data);
              navigate("/");
            });
        }
      );
    }
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.length === 0 && (
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
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
                <span
                  className="actionButton"
                  onClick={(e) => deleteContact(contact.id)}
                >
                  Delete
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
