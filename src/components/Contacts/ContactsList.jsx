import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/loadspinner.css";

function ContactsList(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  let filterTerms = searchParams.getAll("type");
  const navigate = useNavigate();
  const { contacts, setContacts } = props;

  const deleteContact = (id) => {
    if (confirm("Are you sure you want to delete this contact?") == true) {
      fetch(`http://localhost:4000/contacts/${id}`, { method: "DELETE" }).then(
        () => {
          fetch("http://localhost:4000/contacts")
            .then((res) => res.json())
            .then((data) => {
              setContacts(data);
              navigate("/");
            });
        }
      );
    }
  };

  if (filterTerms) {
    if (filterTerms.includes("work") && filterTerms.includes("personal")) {
      console.log("*** Should be both PERSONAL and WORK", filterTerms);
    }

    if (!filterTerms.includes("work") && filterTerms.includes("personal")) {
      console.log("*** Should only be PERSONAL", filterTerms);
    }

    if (!filterTerms.includes("personal") && filterTerms.includes("work")) {
      console.log("*** Should only be WORK", filterTerms);
    }
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.length === 0 && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link
                  to={`/contact/${contact.id}`}
                  state={{ contact }}
                  className="actionButton"
                >
                  View
                </Link>
                <Link
                  to={`/editcontact/${contact.id}`}
                  state={{ contact }}
                  className="actionButton"
                >
                  Edit
                </Link>
                <span
                  className="actionButton"
                  onClick={(e) => deleteContact(contact.id)}
                >
                  Delete
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
