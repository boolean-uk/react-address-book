import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  const { contacts } = props;

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <div>
                <button>
                  {" "}
                  <Link to={`/contacts/${contact.id}`}>View</Link>
                </button>
                <button>
                  <Link to={`/edit/${contact.id}`}>Edit</Link>
                </button>
                <button>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
