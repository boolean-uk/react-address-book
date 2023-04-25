import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    linkedIn: "",
    twitter: "",
    street: "",
    city: "",
  });
  const navigate = useNavigate();

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const handleChange = (event) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });
    const data = await res.json();
    setContacts([...contacts, data]);
    navigate("/");
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2 className="text">Create Contact</h2>

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
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        onChange={handleChange}
        value={newContact.email}
      />
      <label htmlFor="number">Phone</label>
      <input
        id="number"
        name="number"
        type="tel"
        required
        onChange={handleChange}
        value={newContact.number}
      />
      <label htmlFor="">LinkedIn</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        onChange={handleChange}
        value={newContact.linkedIn}
      />
      <label htmlFor="">Twitter</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        onChange={handleChange}
        value={newContact.twitter}
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

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
