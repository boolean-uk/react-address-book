import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

export default function ContactsEdit({ contacts, setContacts }) {
  const [updatedContact, setUpdatedContact] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => setUpdatedContact(data));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    };

    fetch(`http://localhost:4000/contacts/${id}`, opts)
      .then((res) => res.json())
      .then((updatedUser) => {
        // console.log(contacts, updatedUser);
        const newContacts = contacts.map((c) =>
          c.id !== updatedUser.id ? c : updatedUser
        );
        // const oGContacts = contacts.filter((c) => c.id !== updatedUser.id);
        setContacts(newContacts);
        navigate("/");
      });
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setUpdatedContact({ ...updatedContact, [id]: value });
  }

  if (!updatedContact) {
    return <p>Loading</p>;
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        onChange={handleChange}
        value={updatedContact.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        value={updatedContact.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        value={updatedContact.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        value={updatedContact.city}
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={handleChange}
        value={updatedContact.email}
      />

      <label htmlFor="linkedIn">linkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        onChange={handleChange}
        value={updatedContact.linkedIn}
      />

      <label htmlFor="twitter">twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        onChange={handleChange}
        value={updatedContact.twitter}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Update Contact
        </button>
      </div>
    </form>
  );
}
