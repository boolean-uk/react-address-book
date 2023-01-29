import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ContactsView() {
  const [contact, setContact] = useState(false);
  // const { contacts } = props

  const { id } = useParams();

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  useEffect(() => {
    console.log("fetch ContactsView ");
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setContact(data);
        console.log("fetch run", data);
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
    </div>
  );
}

export default ContactsView;
