import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialData = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  truthSocial: "",
  linkedIn: "",
};

function ContactsAdd(props) {
  const contacts = props.contacts;
  const setContacts = props.setContacts;
  const [inputData, setInputData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const { name, value, type } = ev.target;

    if (name === "firstName" && type === "text") {
      setInputData({ ...inputData, firstName: value });
    }
    if (name === "lastName" && type === "text") {
      setInputData({ ...inputData, lastName: value });
    }
    if (name === "street" && type === "text") {
      setInputData({ ...inputData, street: value });
    }
    if (name === "city" && type === "text") {
      setInputData({ ...inputData, city: value });
    }
    if (name === "email" && type === "email") {
      setInputData({ ...inputData, email: value });
    }
    if (name === "linkedIn" && type === "text") {
      setInputData({ ...inputData, linkedIn: value });
    }
    if (name === "truthSocial" && type === "text") {
      setInputData({ ...inputData, truthSocial: value });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch(`http://localhost:4000/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts([...contacts, data]);
        setInputData(initialData);
        navigate("/contacts");
      });
  };

  console.log(inputData);

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={inputData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={inputData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={inputData.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={inputData.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={inputData.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedIn">linkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        value={inputData.linkedIn}
        onChange={handleChange}
      />

      <label htmlFor="TruthSocial">TruthSocial:</label>
      <input
        id="truthSocial"
        name="truthSocial"
        type="text"
        value={inputData.truthSocial}
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
