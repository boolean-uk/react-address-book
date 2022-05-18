import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const initalUser = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: "",
};

function ContactsAdd({ contacts, setContacts }) {
  const [newContact, setNewContact] = useState(initalUser);
  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value } = e.target;
    setNewContact({ ...newContact, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    };
    fetch(`http://localhost:4000/contacts`, opts)
      .then((res) => res.json())
      .then((addedContact) => {
        console.log(addedContact);
        setContacts([...contacts, addedContact]);
        setNewContact(initalUser);
        navigate("/");
      });
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        onChange={handleChange}
        value={newContact.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        value={newContact.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        value={newContact.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        value={newContact.city}
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={handleChange}
        value={newContact.email}
      />

      <label htmlFor="linkedIn">linkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
        onChange={handleChange}
        value={newContact.linkedIn}
      />

      <label htmlFor="twitter">twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={handleChange}
        value={newContact.twitter}
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
