import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const contacts = props.contacts;
  const setContacts = props.setContacts;
  const params = useParams();
  // const params = useSearchParams();
  // const setContacts = props.setContacts;

  // useEffect(() => {
  //   fetch(`http://localhost:4000/contacts/${params.id}`)
  //     .then((res) => res.json())
  //     .then((contacts) => setContacts(contacts));
  // }, []);

  const deleteContact = (contactID) => {
    fetch(`http://localhost:4000/contacts/${contactID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          const updatedArrayContacts = contacts.filter(
            (item) => item.id != contactID
          );
          console.log(updatedArrayContacts);
          setContacts(updatedArrayContacts);
        }
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
              <Link to={`/contacts/view/${contact.id}`}>View</Link>
              <button>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
              </button>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
