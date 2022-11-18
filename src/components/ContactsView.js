import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const { id } = useParams();

  const getContact = async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`);
    const fetchedContact = await res.json();
    setContact(fetchedContact);
  };

  useEffect(() => {
    getContact();
  }, [id]);

  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city}
      </p>
      <h4 className="contact-heading">Contact Details</h4>
      <ul>
        <li>
          <strong>Email: </strong>
          {contact.email ? contact.email : "No email provided"}
        </li>
        <li>
          <strong>LinkedIn: </strong>
          {contact.linkedIn ? contact.linkedIn : "No LinkedIn handle provided"}
        </li>
        <li>
          <strong>Twitter: </strong>
          {contact.twitter ? contact.twitter : "No Twitter handle provided"}
        </li>
      </ul>
    </div>
  );
}

export default ContactsView;
