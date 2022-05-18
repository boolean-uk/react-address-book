import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;

  // When add new contact link is submitted
  // the state should store this data
  const contactInfo = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  };

  const [contactData, setContactData] = useState(contactInfo);

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
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    };
    fetch(`http://localhost:4000/contacts`, opts)
      .then((res) => res.json())
      .then((data) => setContacts([...contacts, data]));
  }

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
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
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

export default ContactsAdd;
