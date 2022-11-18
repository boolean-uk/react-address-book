import { useState } from "react";
import { useNavigate } from "react-router-dom";

const contact = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
};

function ContactsAdd({ setContacts, contacts }) {
  const [newContact, setNewContact] = useState(contact);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  //send POST to json server on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        value={newContact.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        value={newContact.lastName}
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        value={newContact.street}
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        value={newContact.city}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
