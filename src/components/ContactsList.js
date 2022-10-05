import { Link } from "react-router-dom";


function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, deleteContact, isLoaded } = props;


  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      {!isLoaded ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : 
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
                <Link to={`/contacts/${contact.id}/meetings`} state={contact}>
                  Meetings
                </Link>

                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      }
    </>
  );
}

export default ContactsList;
