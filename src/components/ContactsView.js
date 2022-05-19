import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((response) => response.json())
      .then((data) => setContact(data));
  }, [id]);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <p>
          {contact.street} {contact.city}
        </p>
        <p>
          Facebook : <a href={contact.facebook}>{contact.facebook}</a>
        </p>
        <p>
          Twitter : <a href={contact.twitter}>{contact.twitter}</a>
        </p>
        <p>
          LinkedIn: <a href={contact.linkedin}>{contact.linkedin}</a>
        </p>
        <p>
          <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
        </p>

      </div>
    </>
  );
}

export default ContactsView;
