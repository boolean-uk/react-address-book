import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts?id=${id}`)
      .then((res) => res.json())
      .then((targetContactArray) => {
        const [targetContact] = targetContactArray;
        setContact(targetContact);
      });
  }, [id]);

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
        {contact.email} {contact.linkedIn} {contact.twitter}
      </p>
      <Link to={`/contacts/${contact.id}/edit`} state={{ contact }}>
        <button className="button blue">Edit</button>
      </Link>
    </div>
  );
}

export default ContactsView;
