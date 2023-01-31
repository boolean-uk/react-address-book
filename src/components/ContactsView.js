import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// import ContactsEdit from "./components/ContactsEdit";

function ContactsView() {
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContact(data);
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
      <Link to={`/contacts/${contact.id}/edit`}>
        <p>Edit</p>
      </Link>
    </div>
  );
}

export default ContactsView;
