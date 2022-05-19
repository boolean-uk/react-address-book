import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ContactsView() {
  const [contact, setContact] = useState(false);
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `http://localhost:3000/contacts/${id}`
  );

  useEffect(() => {
    if (data) {
      setContact(data);
    }
  }, [data]);

  if (!contact) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isPending && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {contact && (
        <div>
          <h2>
            Hello
            {contact.firstName} {contact.lastName}
          </h2>
          <p>
            {contact.street} {contact.city}
          </p>
        </div>
      )}
    </>
  );
}

export default ContactsView;

//TODO: Get the contact to load from the params and fetch.
//With useEffect, load the contact when params changes
//and update contact state
