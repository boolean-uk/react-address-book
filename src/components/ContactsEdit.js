import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit({ contacts, setContacts }) {
  const [contact, setContact] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getContact = async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`);
    const fetchedContact = await res.json();
    setContact(fetchedContact);
  };

  useEffect(() => {
    getContact();
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const updateContact = async () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...contact }),
    };

    const res = await fetch(
      `http://localhost:4000/contacts/${contact.id}`,
      options
    );

    const updatedContact = await res.json();

    const updatedContactsList = contacts.map((storedContact) => {
      if (storedContact.id === updatedContact.id) {
        return { ...updatedContact };
      } else {
        return storedContact;
      }
    });

    setContacts(updatedContactsList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateContact();
    navigate("/");
  };

  if (!contact) {
    return <p>Loading...</p>;
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

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        value={contact.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
        value={contact.linkedIn}
        onChange={handleChange}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        value={contact.twitter}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit Contact
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
