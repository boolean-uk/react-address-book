import { Link, useSearchParams } from "react-router-dom";

function ContactsList({ contacts, setContacts }) {
  const deleteContact = (id) => {
    fetch("http://localhost:4000/contacts/" + id, {
      method: "DELETE",
    });
    const updatedArray = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedArray);
  };

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
                  <Link to={`/contacts/${contact.id}`}>View</Link>
                </button>
                <button>
                  <Link to={`/edit/${contact.id}`}>Edit</Link>
                </button>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
