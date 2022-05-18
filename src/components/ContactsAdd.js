import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialData = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
};

function ContactsAdd({ contacts, setContacts }) {
  const [inputData, setInputData] = useState(initialData);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "firstName") {
      setInputData({ ...inputData, firstName: value });
    }
    if (id === "lastName") {
      setInputData({ ...inputData, lastName: value });
    }
    if (id === "street") {
      setInputData({ ...inputData, street: value });
    }
    if (id === "city") {
      setInputData({ ...inputData, city: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setInputData(initialData);
      });
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
        value={inputData.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        value={inputData.lastName}
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        value={inputData.street}
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        value={inputData.city}
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
