import { Link } from 'react-router-dom';
import urlPath from '../helpers/helpers';
import LoadingBar from '../assets/LoadingBar.png';

const ContactsList = (props) => {
  const { contacts, setContacts, loading } = props;

  const handleDelete = (contact) => {
    fetch(`${urlPath}contacts/${contact.id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedContacts = contacts.filter((person) => person.id !== contact.id);
      setContacts(updatedContacts);
    });
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className='contacts-list'>
        {loading ? (
          <img className='spinner' src={LoadingBar} alt='loading...' />
        ) : (
          contacts.map((contact, index) => {
            const { firstName, lastName } = contact;
            return (
              <li className='contact' key={index}>
                <div>
                  {firstName} {lastName}
                </div>
                <div>
                  <div className='makeInlineBlock'>
                    <Link
                      style={{ color: 'green', textDecoration: 'inherit', fontWeight: 'bold' }}
                      to={`/contacts/${contact.id}`}
                    >
                      View
                    </Link>
                  </div>
                  <div className='makeInlineBlock'>
                    <Link
                      style={{ color: 'blue', textDecoration: 'inherit', fontWeight: 'bold' }}
                      to={`/contacts/add`}
                      state={{ contact }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className='makeInlineBlock'>
                    <a
                      style={{ color: 'red', textDecoration: 'inherit', fontWeight: 'bold' }}
                      onClick={() => handleDelete(contact)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

export default ContactsList;
