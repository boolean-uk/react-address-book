import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";

function ContactsView(props) {
  const location = useLocation();
  console.log("In ContactsView props");
  console.log(props);

  const { contacts, setContacts } = props;
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    }
  }, [location]);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div className="contactCard">
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
