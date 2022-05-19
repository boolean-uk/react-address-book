import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const clickedContact = location.state.contact;
    setContact(clickedContact);
  }, [location]);

  console.log(contact.id);
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
      <p>
        Reachable with {contact.howToReach.contactMethod}:{" "}
        <a href={contact.howToReach.address}>{contact.howToReach.address} </a>
      </p>
    </div>
  );
}

export default ContactsView;
