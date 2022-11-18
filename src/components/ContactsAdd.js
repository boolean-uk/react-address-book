import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const navigate = useNavigate();
  const initialContact = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  };

  const [contact, setContact] = useState(initialContact);

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => setContacts([...contacts, data]));
    event.target.reset();

    setContacts(initialContact);
  };
  const handleChange = (event) => {
    const targetvalue = event.target.value;
    const targetName = event.target.name;
    if (targetName === "firstName") {
      setContact({ ...contact, firstName: targetvalue });
    }
    if (targetName === "lastName") {
      setContact({ ...contact, lastName: targetvalue });
    }
    if (targetName === "street") {
      setContact({ ...contact, street: targetvalue });
    }
    if (targetName === "city") {
      setContact({ ...contact, city: targetvalue });
    }
  };
  console.log(contact);
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
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
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
