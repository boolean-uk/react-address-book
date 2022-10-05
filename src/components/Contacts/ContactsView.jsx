import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function ContactsView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    }
  }, [location]);

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <>
      <header>
        <h2>Contact Details</h2>
      </header>
      <div className="contactCard light-shadow">
        <p>
          <Link
            to={`/editcontact/${contact.id}`}
            state={{ contact }}
            className="actionButton"
          >
            Edit
          </Link>
        </p>
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
        <p>
          <strong>Linkedin:</strong> {contact.linkedin}
        </p>
        <p>
          <strong>Twitter:</strong> {contact.twitter}
        </p>
        <p>
          <strong>Address:</strong> {contact.street},&nbsp;{contact.city}
        </p>
        <p>
          <span className="backButton" onClick={(e) => navigate(-1)}>
            Back
          </span>
        </p>
      </div>
    </>
  );
}

export default ContactsView;
