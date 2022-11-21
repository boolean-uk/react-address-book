import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

  // the html here is for the loading spinner
  if (!contact) {
    return <p>Loading...</p>;
  }

  const {
    firstName,
    lastName,
    street,
    city,
    email,
    twitter,
    linkedIn,
    id: contactId,
    type,
  } = contact;

  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <p>
        {street}, {city}
      </p>
      <h4 className="contact-heading">Contact Details</h4>
      <ul>
        <li>
          <strong>Email: </strong>
          {email ? email : "No email provided"}
        </li>
        <li>
          <strong>LinkedIn: </strong>
          {linkedIn ? linkedIn : "No LinkedIn handle provided"}
        </li>
        <li>
          <strong>Twitter: </strong>
          {twitter ? twitter : "No Twitter handle provided"}
        </li>
      </ul>
      <p>
        <strong>Contact type:</strong> {type === "work" ? "Work" : "Personal"}
      </p>
      <Link to={`/contacts/${contactId}/meetings`}>Meetings</Link>
    </div>
  );
}

export default ContactsView;
