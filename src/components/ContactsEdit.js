import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContactsEdit = ({ contacts, setContacts }) => {
  const [editingContact, setEditingContact] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const editedContactIndex = editingContact.id;

  useEffect(() => {
    const clickedContact = location.state.contact;
    setEditingContact(clickedContact);
  }, [location]);

  if (!editingContact) return <p>Wait a minute...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setEditingContact({ ...editingContact, firstName: value });
        break;
      case "lastName":
        setEditingContact({ ...editingContact, lastName: value });
        break;
      case "street":
        setEditingContact({ ...editingContact, street: value });
        break;
      case "city":
        setEditingContact({ ...editingContact, city: value });
        break;
      case "howToReach":
        const clickedMethod = {
          ...editingContact[name],
          contactMethod: value,
        };
        setEditingContact({ ...editingContact, howToReach: clickedMethod });
        break;
      case "address":
        const contactWithAddress = {
          ...editingContact.howToReach,
          address: value,
        };
        setEditingContact({
          ...editingContact,
          howToReach: contactWithAddress,
        });
        break;
      default:
        console.log("oops, we don't have that input field");
    }
  };

  const patchRequest = () => {
    fetch(`http://localhost:4000/contacts/${editingContact.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingContact),
    })
      .then((res) => res.json())
      .then((editingContact) => {
        const updatedContacts = [...contacts];
        const targetIndex = updatedContacts.findIndex(
          (contact) => contact.id === editingContact.id
        );
        updatedContacts[targetIndex] = editingContact;
        setContacts(updatedContacts);
      });
  };

  const submitChange = (e) => {
    e.preventDefault();
    patchRequest();
    setEditingContact("");
    navigate("/");
  };

  return (
    <form className="form-stack contact-form" onSubmit={submitChange}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={editingContact.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={editingContact.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={editingContact.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={editingContact.city}
        onChange={handleChange}
        required
      />

      <div className="radio-wrapper">
        <input
          id="email"
          name="howToReach"
          type="radio"
          value="email"
          onChange={handleChange}
          checked={
            editingContact.howToReach.contactMethod === "email" ? true : false
          }
        />
        <label htmlFor="email">Email</label>
        <input
          id="linkedIn"
          name="howToReach"
          type="radio"
          value="linkedIn"
          onChange={handleChange}
          checked={
            editingContact.howToReach.contactMethod === "linkedIn"
              ? true
              : false
          }
        />
        <label htmlFor="linkedIn">LinkedIn</label>
        <input
          id="twitter"
          name="howToReach"
          type="radio"
          value="twitter"
          checked={
            editingContact.howToReach.contactMethod === "twitter" ? true : false
          }
          onChange={handleChange}
        />
        <label htmlFor="twitter">Twitter</label>
        <input
          id="address"
          name="address"
          type={
            editingContact.howToReach.contactMethod === "email"
              ? "email"
              : "text"
          }
          value={editingContact.howToReach.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Change
        </button>
      </div>
    </form>
  );
};

export default ContactsEdit;
