import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams();

  useEffect(function () {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>{contact.email && <span>{contact.email}</span>} </p>
      <p>{contact.number && <span>{contact.number}</span>}</p>
      <p>{contact.linkedIn && <span>{contact.linkedIn}</span>}</p>
      <p>{contact.twitter && <span>{contact.twitter}</span>}</p>
      <p>
        {contact.street} {contact.city}
      </p>
    </div>
  );
}

export default ContactsView;
