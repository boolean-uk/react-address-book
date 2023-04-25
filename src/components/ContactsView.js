import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

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
      <p>
        {contact.street} {contact.city}
      </p>
      <p>{contact.email}</p>
      <p>{contact.linkedIn}</p>
      <p>{contact.twitter}</p>
      <p>
        <Link to={`/contacts/meetings/${contact.id}`}>Meetings</Link>
      </p>
    </div>
  );
}

export default ContactsView;
