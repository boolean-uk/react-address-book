import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit({ contacts, setContacts }) {
  const [contact, setContact] = useState(false);

  let navigate = useNavigate();
  let params = useParams();
  const { id } = params;

  useEffect(async () => {
    const data = await fetch(`http://localhost:4000/contacts/${id}`);
    const contact = await data.json();
    setContact(contact);
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((updatedContact) => {
        handleContactEdit(updatedContact);
        navigate("/");
      });
  }

  const handleContactEdit = (editContact) => {
    const editUser = contacts.map((contact) => {
      if (contact.id === editContact.id) {
        return editContact;
      }
      return contact;
    });
    setContacts(editUser);
  };

  if (!contact) {
    return <p>Loading</p>;
  }

  /* We get here (return) only if it finds the contact. If it doesn't find the contact
  then (see above - loading message)*/

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
        value={contact.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        value={contact.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        value={contact.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        value={contact.city}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={handleChange}
        value={contact.email}
      />

      <label htmlFor="linkedin">Linkedin:</label>
      <input
        id="linkedin"
        name="linkedin"
        type="text"
        required
        onChange={handleChange}
        value={contact.linkedin}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={handleChange}
        value={contact.twitter}
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
