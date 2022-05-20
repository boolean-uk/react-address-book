import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialNewContact = {
  id: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  howToReach: "",
  address: "",
};

const ContactsAdd = ({ contacts, setContacts }) => {
  const [newContact, setNewContact] = useState(initialNewContact);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const postRequest = () => {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    };
    fetch("http://localhost:4000/contacts", opts)
      .then((res) => res.json())
      .then((contactData) => setContacts([...contacts, contactData]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest();
    setNewContact(initialNewContact);
    navigate("/");
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
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>

        <input
          id="linkedIn"
          name="howToReach"
          type="radio"
          value="linkedIn"
          onChange={handleChange}
        />
        <label htmlFor="linkedIn">LinkedIn</label>

        <input
          id="twitter"
          name="howToReach"
          type="radio"
          value="twitter"
          onChange={handleChange}
        />
        <label htmlFor="twitter">Twitter</label>

        <input
          id="address"
          name="address"
          type={newContact.howToReach === "email" ? "email" : "text"}
          value={newContact.address}
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
