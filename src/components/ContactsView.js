import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const clickedContact = location.state.contact;
    setContact(clickedContact);
  }, [location]);

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
    </div>
  );
}

export default ContactsView;
