import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ContactsView.css";
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
      <h2 className="name">
        {contact.firstName} {contact.lastName}
      </h2>
      <div className="contactInfo">
        <p className="email">
          {contact.email && <span>{contact.email}</span>}{" "}
        </p>
        <p className="number">
          {contact.number && <span>{contact.number}</span>}
        </p>
        <p className="linkedIn">
          {contact.linkedIn && <span>{contact.linkedIn}</span>}
        </p>
        <p className="twitter">
          {contact.twitter && <span>{contact.twitter}</span>}
        </p>
        <p className="address">
          {contact.street} {contact.city}
        </p>
      </div>
    </div>
  );
}

export default ContactsView;
