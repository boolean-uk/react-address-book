//react
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
//helpers
import urlPath from '../helpers/helpers';

//notes
// ---useLocation:
// This hook returns the location object used by the react-router. This object represents the current URL and is immutable. Whenever the URL changes, the useLocation() hook returns a newly updated location object.
// ---navigate
// If you need to navigate programmatically (like after a form submits), this hook gives you an API to do so with a signature like this: navigate(to, { state={}, replace=false })

const ContactsAdd = (props) => {
  const { setContacts, contacts } = props;

  //form state object
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedin: '',
    twitter: '',
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setNewContact(contact);
    }
  }, [location]);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newContact.id) {
      fetch(`${urlPath}/contacts/${newContact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      })
        .then((res) => res.json())
        .then((json) => {
          const updatedContacts = contacts.map((friend) => (friend.id === json.id ? json : friend));
          setContacts(updatedContacts);
          navigate('/');
        });
    } else {
      fetch(`${urlPath}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      })
        .then((res) => res.json())
        .then((json) => {
          setContacts([...contacts, json]);
          navigate('/');
        });
    }
  };

  return (
    <form className='form-stack contact-form' onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor='firstName'>First Name</label>
      <input
        id='firstName'
        name='firstName'
        type='text'
        onChange={inputHandler}
        value={newContact.firstName}
        required
      />

      <label htmlFor='lastName'>Last Name:</label>
      <input
        id='lastName'
        name='lastName'
        type='text'
        onChange={inputHandler}
        value={newContact.lastName}
        required
      />

      <label htmlFor='street'>Street:</label>
      <input
        id='street'
        name='street'
        type='text'
        onChange={inputHandler}
        value={newContact.street}
        required
      />

      <label htmlFor='city'>City:</label>
      <input
        id='city'
        name='city'
        type='text'
        onChange={inputHandler}
        value={newContact.city}
        required
      />

      <label htmlFor='email'>Email:</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={inputHandler}
        value={newContact.email}
        required
      />

      <label htmlFor='linkedin'>LinkedIn:</label>
      <input
        id='linkedin'
        name='linkedin'
        type='text'
        onChange={inputHandler}
        value={newContact.linkedin}
      />

      <label htmlFor='twitter'>Twitter:</label>
      <input
        id='twitter'
        name='twitter'
        type='text'
        onChange={inputHandler}
        value={newContact.twitter}
      />

      <div className='actions-section'>
        <button className='button' type='submit'>
          {newContact.id ? 'Edit' : 'New'}
        </button>
      </div>
    </form>
  );
};

export default ContactsAdd;
