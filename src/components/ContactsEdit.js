import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ContactsEdit({ contacts, setContacts }) {
  const [contactToEdit, setContactToEdit] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setContactToEdit(data);
      });
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactToEdit({ ...contactToEdit, [name]: value });

    // if (id === "firstName") {
    //   setContactToEdit({ ...contactToEdit, firstName: value });
    // }
    // if (id === "lastName") {
    //   setContactToEdit({ ...contactToEdit, lastName: value });
    // }
    // if (id === "street") {
    //   setContactToEdit({ ...contactToEdit, street: value });
    // }
    // if (id === "city") {
    //   setContactToEdit({ ...contactToEdit, city: value });
    // }
    // if (id === "email") {
    //   setContactToEdit({ ...contactToEdit, email: value });
    // }
    // if (id === "linkedin") {
    //   setContactToEdit({ ...contactToEdit, linkedin: value });
    // }
    // if (id === "twitter") {
    //   setContactToEdit({ ...contactToEdit, twitter: value });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchRequest();
  };

  const patchRequest = () => {
    fetch("http://localhost:4000/contacts/" + contactToEdit.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactToEdit),
    })
      .then((res) => res.json())
      .then((updatedContact) => {
        updateContactsArray(updatedContact);
        navigate("/contacts");
      });
  };

  const updateContactsArray = (updatedContact) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactToEdit.id) {
        contact = updatedContact;
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  if (!contactToEdit) {
    return <p>Loading...</p>;
  }

  return (
    <form
      className="form-stack contact-form update-form"
      onSubmit={handleSubmit}
    >
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        value={contactToEdit.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        value={contactToEdit.lastName}
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        value={contactToEdit.street}
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        value={contactToEdit.city}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        value={contactToEdit.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        id="linkedin"
        name="linkedin"
        type="text"
        value={contactToEdit.linkedin}
        onChange={handleChange}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        value={contactToEdit.twitter}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
