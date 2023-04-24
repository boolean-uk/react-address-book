import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialData = null;

function ContactsEdit(props) {
  const contacts = props.contacts;
  const setContacts = props.setContacts;
  const [contactData, setContactData] = useState(initialData);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContactData(data));
  }, [params.id]);

  if (!contactData) {
    return <p>Loading</p>;
  }

  const handleChange = (ev) => {
    const { name, value, type } = ev.target;

    if (name === "firstName" && type === "text") {
      setContactData({ ...contactData, firstName: value });
    }
    if (name === "lastName" && type === "text") {
      setContactData({ ...contactData, lastName: value });
    }
    if (name === "street" && type === "text") {
      setContactData({ ...contactData, street: value });
    }
    if (name === "city" && type === "text") {
      setContactData({ ...contactData, city: value });
    }
    if (name === "email" && type === "email") {
      setContactData({ ...contactData, email: value });
    }
    if (name === "linkedIn" && type === "text") {
      setContactData({ ...contactData, linkedIn: value });
    }
    if (name === "truthSocial" && type === "text") {
      setContactData({ ...contactData, truthSocial: value });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        updateContactArray(updatedUser);
        navigate("/contacts");
      });
  };

  const updateContactArray = (updatedUser) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === updatedUser.id) {
        return updatedUser;
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder={`${contactData.firstName}`}
        value={contactData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        placeholder={`${contactData.lastName}`}
        value={contactData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        placeholder={`${contactData.street}`}
        value={contactData.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        placeholder={`${contactData.city}`}
        value={contactData.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={`${contactData.email}`}
        value={contactData.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedIn">linkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        placeholder={`${contactData.linkedIn}`}
        value={contactData.linkedIn}
        onChange={handleChange}
      />

      <label htmlFor="TruthSocial">TruthSocial:</label>
      <input
        id="truthSocial"
        name="truthSocial"
        type="text"
        placeholder={`${contactData.truthSocial}`}
        value={contactData.truthSocial}
        onChange={handleChange}
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
