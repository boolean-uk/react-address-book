import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ContactsView(props) {
  const { contacts, setContacts } = props;
  const [contact, setContact] = useState(false);

  const navigate = useNavigate();
  //With useEffect, load the contact when params changes
  //and update contact state
  const { id } = useParams();
  useEffect(() => {
    setContact(contacts.find((c) => c.id == id));
  }, [id]);

  if (!contact) {
    return <p>Loading</p>;
  }

  const remove = () => {
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setContacts(contacts.filter((c) => c.id != id));
      setContact(null);
      navigate("/");
    });
  };

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
      </div>

      <Link to={`/contacts/${contact.id}/edit`}>
        <button className="button red">Edit</button>
      </Link>

      <button className="button red" onClick={remove}>
        Delete
      </button>
    </>
  );
}

export default ContactsView;
