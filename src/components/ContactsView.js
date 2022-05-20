import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ContactsView({ contacts }) {
  const [contact, setContact] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    contacts.forEach((contactA) => {
      if (contactA.id === +id) {
        setContact(contactA);
      }
    });
  }, []);
  //TODO: Get the contact to load from the params and fetch.

  //With useEffect, load the contact when params changes
  //and update contact state

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <>
      {contact && (
        <div>
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
          <p>
            {contact.street} {contact.city}
          </p>
          <p>{contact.email}</p>
          <p>{contact.linkedIn}</p>
          <p>{contact.twitter}</p>
          <Link to={`/contacts/${contact.id}/meetings`}>Meetings</Link>
        </div>
      )}
    </>
  );
}

export default ContactsView;
