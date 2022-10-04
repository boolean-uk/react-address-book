import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props;
  const navigate = useNavigate()
  const [state, setState] = useState('')


  const deleteContact = (id) => {
    console.log(id);

    // DELETE request using fetch inside useEffect React hook
    fetch(`http://localhost:4000/contacts/${id}`, { method: "DELETE" }).then(
      () => console.log("Delete successful")
    );

    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))

    setState('updated')

    navigate('/')
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
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
