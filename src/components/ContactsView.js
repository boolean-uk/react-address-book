import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);

  const params = useParams();
  useEffect(
    function () {
      fetch(`http://localhost:4000/contacts/${params.id}`)
        .then((res) => res.json())
        .then((json) => {
          setContact(json);
        });
    },
    [params]
  );

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
      <p>{contact.email}</p>
      <p>{contact.linkedin}</p>
      <p>{contact.twitter}</p>
    </div>
  );
}

export default ContactsView;
