import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/ContactsDelete.css";
function ContactsDelete(props) {
  const { setContacts } = props;
  const [contact, setContact] = useState();

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const params = useParams();
  const navigate = useNavigate();

  useEffect(function () {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);

  const deleteContact = async (e) => {
    await fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
    navigate("/");
  };

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div>
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <p>{contact.email && <span>{contact.email}</span>} </p>
        <p>{contact.number && <span>{contact.number}</span>}</p>
        <p>{contact.linkedIn && <span>{contact.linkedIn}</span>}</p>
        <p>{contact.twitter && <span>{contact.twitter}</span>}</p>
        <p>
          {contact.street} {contact.city}
        </p>
      </div>
      <div>
        <h3>You want to delete this contact?</h3>
        <button onClick={deleteContact}>Yes</button>
        <button>
          {" "}
          <Link to={"/"} className="noDelete">
            No
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ContactsDelete;
