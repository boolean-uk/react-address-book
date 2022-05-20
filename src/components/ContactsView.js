import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams();

  const { id } = params;

  useEffect(async () => {
    const data = await fetch(`http://localhost:4000/contacts/${id}`);
    const contact = await data.json();
    setContact(contact);
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
        {contact.street} {contact.city} {contact.email} {contact.linkedin}{" "}
        {contact.twitter}
      </p>
    </div>
  );
}

export default ContactsView;
