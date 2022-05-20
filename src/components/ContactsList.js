import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const contacts = props.contacts;
  const params = useParams();
  // const params = useSearchParams();
  // const setContacts = props.setContacts;

  // useEffect(() => {
  //   fetch(`http://localhost:4000/contacts/${params.id}`)
  //     .then((res) => res.json())
  //     .then((contacts) => setContacts(contacts));
  // }, []);
  // const deleteContact = () => {
  //   fetch(`http://localhost:4000/contacts/${params.id}`, {
  //     method: "DELETE",
  //   });
  // };
  //onClick={deleteContact(contact.id)}

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
              <button>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
