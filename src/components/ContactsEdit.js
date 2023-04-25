import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ContactsEdit.css";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  linkedIn: "",
  twitter: "",
  street: "",
  city: "",
};

function ContactsEdit(props) {
  const { setContacts } = props;
  const [editContact, setEditContact] = useState(initialState);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(function () {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setEditContact(data));
  }, []);

  const handleChange = (event) => {
    setEditContact({ ...editContact, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editContact),
    });
    await fetch(`http://localhost:4000/contacts/`)
      .then((res) => res.json())
      .then((data) => setContacts(data));
    navigate(`/contacts/${params.id}`);
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2 className="text">Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        onChange={handleChange}
        value={editContact.firstName}
        className="text"
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        value={editContact.lastName}
        className="text"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        onChange={handleChange}
        value={editContact.email}
        className="text"
      />
      <label htmlFor="number">Phone</label>
      <input
        id="number"
        name="number"
        type="tel"
        required
        onChange={handleChange}
        value={editContact.number}
        className="text"
      />
      <label htmlFor="">LinkedIn</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        onChange={handleChange}
        value={editContact.linkedIn}
        className="text"
      />
      <label htmlFor="">Twitter</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        onChange={handleChange}
        value={editContact.twitter}
        className="text"
      />
      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        value={editContact.street}
        className="text"
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        value={editContact.city}
        className="text"
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
