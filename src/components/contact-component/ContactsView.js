import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HTTPCONTACTS } from "../http";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(HTTPCONTACTS + `/${id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);

  if (!contact) {
    return <span className="loader"></span>;
  }

  return (
    <div>
      <h2>
        {contact.type === "work" && "💼 "}
        {contact.type === "personal" && "🍸"}
        {contact.firstName} {contact.lastName}
      </h2>
      <p>
        {contact.street} {contact.city} ({contact.email})
      </p>
      <p>
        {contact.linkedin} {contact.twitter}
      </p>
      <p>
        <Link to={`/contact/${contact.id}/meetings`}>Meetings</Link>
      </p>
    </div>
  );
}

export default ContactsView;
