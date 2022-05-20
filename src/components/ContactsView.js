import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const params = useParams();

  useEffect(() => {
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
      <p>Street: {contact.street}</p>
      <p>City: {contact.city}</p>
      <p>Email: {contact.email}</p>
      <p>linkedIn: {contact.linkedIn}</p>
      <p>TruthSocial: {contact.truthSocial}</p>
      <Link to={`/contacts/edit/${params.id}`}>Edit contact</Link>
    </div>
  );
}

export default ContactsView;
