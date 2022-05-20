import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit({ setContacts, contacts }) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  const { id } = useParams();
  let currContact = null;
  contacts.forEach((contact) => {
    if (contact.id === +id) {
      currContact = contact;
    }
  });
  const [newContact, setNewContact] = useState(currContact);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    switch (name) {
      case "firstName":
        return setNewContact({ ...newContact, firstName: value });
        break;
      case "lastName":
        return setNewContact({ ...newContact, lastName: value });
        break;
      case "street":
        return setNewContact({ ...newContact, street: value });
        break;
      case "city":
        return setNewContact({ ...newContact, city: value });
        break;
      case "email":
        return setNewContact({ ...newContact, email: value });
        break;
      case "linkedIn":
        return setNewContact({ ...newContact, linkedIn: value });
        break;
      case "twitter":
        return setNewContact({ ...newContact, twitter: value });
        break;
    }
  };

  const handleSubmit = (e) => {
    // const id = Math.random();
    e.preventDefault();
    setContacts((prevContacts) => {
      return prevContacts.map((contact) => {
        if (contact.id === +id) {
          return { ...newContact, id: contact.id };
        } else return contact;
      });
    });

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newContact }),
    };

    fetch(`http://localhost:4000/contacts/${id}`, options);

    e.target.reset();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        onChange={handleChange}
        id="firstName"
        name="firstName"
        type="text"
        required
        value={newContact && newContact.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        onChange={handleChange}
        id="lastName"
        name="lastName"
        type="text"
        required
        value={newContact && newContact.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        onChange={handleChange}
        id="street"
        name="street"
        type="text"
        required
        value={newContact && newContact.street}
      />

      <label htmlFor="city">City:</label>
      <input
        onChange={handleChange}
        id="city"
        name="city"
        type="text"
        required
        value={newContact && newContact.city}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
        required
        value={newContact && newContact.email}
      />
      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        type="text"
        name="linkedIn"
        id="linkedIn"
        onChange={handleChange}
        required
        value={newContact && newContact.linkedIn}
      />
      <label htmlFor="twitter">Twitter:</label>
      <input
        type="text"
        name="twitter"
        id="twitter"
        onChange={handleChange}
        required
        value={newContact && newContact.twitter}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
