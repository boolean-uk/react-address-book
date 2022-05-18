import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd({ contacts, setContacts }) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const initalUser = { firstName: "", lastName: "", street: "", city: "" };
  const [newContact, setNewContact] = useState(initalUser);
  //TODO: Implement controlled form
  //send POST to json server on form submit

  function handleChange(e) {
    const { id, value } = e.target;

    switch (id) {
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
    }
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

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
