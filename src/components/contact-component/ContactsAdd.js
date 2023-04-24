import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HTTPCONTACTS } from "../../http";

const INITIAL_VALUES = {
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
  const navigate = useNavigate();
  const [formState, setFormState] = useState(INITIAL_VALUES);
  const postData = (data) => {
    fetch(HTTPCONTACTS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((respose) => setContacts([...contacts, respose]));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postData(formState);
    setFormState(INITIAL_VALUES);
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
        value={formState.firstName}
        onChange={handleChange}
        placeholder="Joe"
        required
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formState.lastName}
        onChange={handleChange}
        placeholder="Doe"
        required
      />
      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={formState.street}
        onChange={handleChange}
        placeholder="1 Main street"
        required
      />
      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={formState.city}
        onChange={handleChange}
        placeholder="London"
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="email@example.com"
        required
      />
      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        pattern="http://www.linkedin.com/.*"
        value={formState.linkedIn}
        onChange={handleChange}
        placeholder="http://www.linkedin.com/..."
      />
      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="url"
        pattern="http://twitter.com/.*"
        value={formState.twitter}
        onChange={handleChange}
        placeholder="http://twitter.com/..."
      />
      <div className="buttons">
        <input type="radio" value="work" name="type" onChange={handleChange} />
        Work
        <input
          type="radio"
          value="personal"
          name="type"
          onChange={handleChange}
        />
        Personal
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
