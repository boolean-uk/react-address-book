import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const navigate = useNavigate();
  const { contacts, setContacts } = props;
  const newID = contacts.length + 1;
  const [contact, setContact] = useState({
    id: newID,
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  });

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "firstName") {
      setContact({ ...contact, firstName: inputValue });
    }
    if (inputName === "lastName") {
      setContact({ ...contact, lastName: inputValue });
    }
    if (inputName === "street") {
      setContact({ ...contact, street: inputValue });
    }
    if (inputName === "city") {
      setContact({ ...contact, city: inputValue });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContactPostRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };
    try {
      fetch("http://localhost:4000/contacts", newContactPostRequest)
        .then((response) => response.json())
        .then(setContacts([...contacts, contact]))
        .then(navigate("/"));
    } catch (err) {
      console;
      console.error(err);
    }
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
        value={contact.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        value={contact.lastName}
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        value={contact.street}
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        value={contact.city}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="actionButton" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
