import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function ContactsView() {
  const location = useLocation();
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
        <h2>
          {contact.firstName} {contact.lastName}
        </h2>
        <p>
          Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
        <p>Linkedin: {contact.linkedin}</p>
        <p>Twitter: {contact.twitter}</p>
        <p>
          {contact.street},&nbsp;{contact.city}
        </p>
        <p>
          <Link to={"/"} className="backButton">
            Back to contacts list
          </Link>
        </p>
      </div>
    </>
  );
}

export default ContactsView;