import { Link } from "react-router-dom";


function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, deleteContact } = props;



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
              <p>
                <Link to={`/contacts/${contact.id}`} state={contact}>
                  View
                </Link>
                <Link to={`/contacts/${contact.id}/edit`} state={contact}>
                  Edit
                </Link>

                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
