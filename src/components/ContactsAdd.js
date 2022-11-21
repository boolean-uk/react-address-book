import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const contact = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: "",
  type: "",
};

function ContactsAdd({ setContacts, contacts }) {
  const [newContact, setNewContact] = useState(contact);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewContact({
      ...newContact,
      [name]: value,
    });
  };

  const postContact = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newContact,
      }),
    };

    const res = await fetch("http://localhost:4000/contacts", options);
    const contact = await res.json();
    setContacts([...contacts, contact]);
  };

  const successMessage = useRef(null);

  //send POST to json server on form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    postContact();
    // used useRef to change the style of success message from display: hidden to block
    // Page then redirects to home page after 2 seconds
    successMessage.current.style.display = "block";
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
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

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          value={newContact.email}
          onChange={handleChange}
        />

        <label htmlFor="linkedIn">LinkedIn:</label>
        <input
          id="linkedIn"
          name="linkedIn"
          type="text"
          value={newContact.linkedIn}
          onChange={handleChange}
        />

        <label htmlFor="twitter">Twitter:</label>
        <input
          id="twitter"
          name="twitter"
          type="text"
          value={newContact.twitter}
          onChange={handleChange}
        />

        <p>Contact type:</p>
        <div className="contact-type-form-control">
          <label htmlFor="work">
            Work:
            <input
              type="radio"
              id="work"
              name="type"
              value="work"
              checked={newContact.type === "work"}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="personal">
            Personal:
            <input
              type="radio"
              id="personal"
              name="type"
              value="personal"
              checked={newContact.type === "personal"}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="actions-section">
          <button className="button blue" type="submit">
            Create
          </button>
        </div>
      </form>
      <p className="success" ref={successMessage}>
        Contact created successfully!
      </p>
    </>
  );
}

export default ContactsAdd;
