import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ContactsEdit({ setContacts, contacts }) {
  const [contact, setContact] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(function () {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const updatedContact = await res.json();

    const updatedContacts = contacts.map((contact) => {
      if (contact.id === params.id) {
        return updatedContact
      } 
      return contact
    })
    setContacts([...contacts, updatedContacts]);
    navigate("/");
  };

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
        defaultValue={contact.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        defaultValue={contact.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        defaultValue={contact.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        defaultValue={contact.city}
      />

      <label htmlFor="email">E-mail:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={handleChange}
        defaultValue={contact.email}
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
        onChange={handleChange}
        defaultValue={contact.linkedIn}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={handleChange}
        defaultValue={contact.twitter}
      />

<label htmlFor="work">Work</label>
      <input
        id="work"
        name="contactType"
        type="radio"
        onChange={handleChange}
        value="work"
      
      />
      <label htmlFor="personal">Personal</label>
      <input
        id="personal"
        name="contactType"
        type="radio"   
        onChange={handleChange}
        value="personal"
        
        
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
