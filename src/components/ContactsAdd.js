import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialNewContact = {
  id: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  howToReach: {
    email: false,
    linkedIn: false,
    twitter: false,
    address: "",
  },
};

const ContactsAdd = ({ contacts, setContacts }) => {
  const [newContact, setNewContact] = useState(initialNewContact);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "firstName":
        setNewContact({ ...newContact, firstName: value });
        break;
      case "lastName":
        setNewContact({ ...newContact, lastName: value });
        break;
      case "street":
        setNewContact({ ...newContact, street: value });
        break;
      case "city":
        setNewContact({ ...newContact, city: value });
        break;
      case "howToReach":
        const clickedMethod = {
          ...newContact[name],
          [value]: checked,
        };
        setNewContact({ ...newContact, howToReach: clickedMethod });
        break;
      case "address":
        const contactWithAddress = {
          ...newContact.howToReach,
          address: value,
        };
        setNewContact({ ...newContact, howToReach: contactWithAddress });
        break;
      default:
        console.log("oops, we don't have that input field");
    }
  };

  const postRequest = (newContact) => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    };
    fetch("http://localhost:4000/contacts", opts)
      .then((res) => res.json())
      .then((contactData) => console.log(contactData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest(newContact);
    setContacts([...contacts, newContact]);
    setNewContact(initialNewContact);
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={newContact.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={newContact.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={newContact.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={newContact.city}
        onChange={handleChange}
        required
      />

      <div className="radio-wrapper">
        <input
          id="email"
          name="howToReach"
          type="radio"
          value="email"
          checked={newContact.howToReach.email}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>

        <input
          id="linkedIn"
          name="howToReach"
          type="radio"
          value="linkedIn"
          checked={newContact.howToReach.linkedIn}
          onChange={handleChange}
        />
        <label htmlFor="linkedIn">LinkedIn</label>

        <input
          id="twitter"
          name="howToReach"
          type="radio"
          value="twitter"
          checked={newContact.howToReach.twitter}
          onChange={handleChange}
        />
        <label htmlFor="twitter">Twitter</label>

        <input
          id="address"
          name="address"
          type={newContact.howToReach.email ? "email" : "text"}
          value={newContact.howToReach.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default ContactsAdd;
