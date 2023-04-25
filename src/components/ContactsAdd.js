import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedin: "",
  twitter: "",
};

function ContactsAdd(props) {
  const { setContacts, contacts } = props;
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const update = (e) => {
    //here i will need setContacts
    // setContacts([...contacts, form]); // will not do this, because i will POST in the server
  };
  const ClearForm = (e) => {
    setForm({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      email: "",
      linkedin: "",
      twitter: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = fetch("http://localhost:3030/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    await fetch("http://localhost:3030/contacts/")
    .then((res) => res.json())
    .then((data) => setContacts(data));
    //i am already doing the update in the update function
    // navigate('/') can do this, gonna troubleshoot
    navigate("/");
  };
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  // i get these from the parent
  
  //TODO: Implement controlled form
  //send POST to json server on form submit
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        value={form.firstName}
        onChange={handleChange}
        id="firstName"
        name="firstName"
        type="text"
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        value={form.lastName}
        onChange={handleChange}
        id="lastName"
        name="lastName"
        type="text"
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        value={form.street}
        onChange={handleChange}
        id="street"
        name="street"
        type="text"
        required
      />

      <label htmlFor="city">City:</label>
      <input
        value={form.city}
        onChange={handleChange}
        id="city"
        name="city"
        type="text"
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        value={form.email}
        onChange={handleChange}
        id="email"
        name="email"
        type="text"
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        value={form.linkedin}
        onChange={handleChange}
        id="linkedin"
        name="linkedin"
        type="text"
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        value={form.twitter}
        onChange={handleChange}
        id="twitter"
        name="twitter"
        type="text"
      />

      <div className="actions-section">
        <button className="button blue" type="submit" onClick={update}>
          Create
        </button>
        <button className="ClearButton" onClick={ClearForm}>
          Clear
        </button>
      </div>
    </form>
  );
}
export default ContactsAdd;
