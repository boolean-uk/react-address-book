import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, [params.id]);

  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        <b>Address: </b>
        {contact.street}
      </p>
      <p>
        <b>City: </b>
        {contact.city}
      </p>
      <p>
        <b>Email: </b>
        {contact.email}
      </p>
      <p>
        <b>LinkedIn: </b>
        {contact.linkedin}
      </p>
      <p>
        <b>Twitter: </b>
        {contact.twitter}
      </p>
    </div>
  );
}

export default ContactsView;
