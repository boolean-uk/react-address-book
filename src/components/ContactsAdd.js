import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  let navigate = useNavigate();

  const initialNewContact = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: "",
  };

  const { setContacts, contacts } = props;
  const [newContact, setNewContact] = useState(initialNewContact);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewContact({ ...newContact, [name]: value });
    // if (name === "firstName" && type === "text") {
    //   setNewContact({ ...newContact, firstName: value });
    // }
    // if (name === "lastName" && type === "text") {
    //   setNewContact({ ...newContact, lastName: value });
    // }
    // if (name === "street" && type === "text") {
    //   setNewContact({ ...newContact, street: value });
    // }
    // if (name === "city" && type === "text") {
    //   setNewContact({ ...newContact, [name]: value });
    // }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((res) => res.json())
      .then((result) => {
        setContacts([...contacts, result]);
        event.target.reset();
        setNewContact(initialNewContact);
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

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={handleChange}
        value={newContact.email}
      />

      <label htmlFor="linkedin">Linkedin:</label>
      <input
        id="linkedin"
        name="linkedin"
        type="text"
        required
        onChange={handleChange}
        value={newContact.linkedin}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={handleChange}
        value={newContact.twitter}
      />

      <div className="actions-section">
        <button
          className="button blue"
          type="submit"
          onClick={() => {
            navigate("/");
          }}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
