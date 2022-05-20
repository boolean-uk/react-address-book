import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ContactsEdit(props) {
  const { id } = useParams();
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;

  // When add new contact link is submitted
  // the state should store this data

  function updateContactDetails(contact) {
    const newContacts = [...contacts];
    const updatedContact = newContacts.find(
      (details) => details.id === contact.id
    );
    newContacts[updatedContact] = { ...contact };
    setContacts([...newContacts]);
  }

  const [contactData, setContactData] = useState([]);
  const navigate = useNavigate();

  function handleChange(event) {
    // add the values
    console.log("ContactData:", contactData);
    console.log("Name:", contactData.name);
    console.log("Value:", contactData.value);
    event.preventDefault();
    const { name, value } = event.target;
    setContactData({ ...contactData, [name]: value });
  }

  //TODO: Implement controlled form
  //send POST to json server on form submit

  function handleSubmit(event) {
    // on submit add the data to json server by POST
    // Post the contactData to the json server
    // Then do a POST Fetch to get it rendered by adding it to the contacts
    event.preventDefault();
    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    };
    fetch(`http://localhost:4000/contacts/${id}`, opts)
      .then((res) => res.json())
      .then((data) => {
        updateContactDetails(data);
        navigate("/");
      });
    // --- //
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={contactData.firstName}
        required
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={contactData.lastName}
        required
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={contactData.street}
        required
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={contactData.city}
        required
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={contactData.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="linkedIn"
        value={contactData.linkedIn}
        onChange={handleChange}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="twitter"
        value={contactData.twitter}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsEdit;
