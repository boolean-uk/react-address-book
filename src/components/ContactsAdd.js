import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedIn: "",
    twitter: "",
  });

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleChange = (event) => {
    const inputvalue = event.target.value;
    const inputName = event.target.name;

    if (inputName === "firstName") {
      setContact({ ...contact, firstName: inputvalue });
    }

    if (inputName === "lastName") {
      setContact({ ...contact, lastName: inputvalue });
    }
    if (inputName === "street") {
      setContact({ ...contact, street: inputvalue });
    }

    if (inputName === "city") {
      setContact({ ...contact, city: inputvalue });
    }
    if (inputName === "email") {
      setContact({ ...contact, email: inputvalue });
    }
    if (inputName === "linkedIn") {
      setContact({ ...contact, linkedIn: inputvalue });
    }
    if (inputName === "twitter") {
      setContact({ ...contact, twitter: inputvalue });
    }
  };

  const handleSubmit = (event) => {
    const newPostRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };
    fetch("http://localhost:4000/contacts", newPostRequest)
      .then(setContacts([...contacts, contact]))
      .then(navigate("/"));
    event.preventDefault();
    navigate("/")
  };


 

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={contact.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={contact.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={contact.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={contact.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="Email">Email:</label>
      <input
        id="Email"
        name="email"
        type="email"
        value={contact.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="LinkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        value={contact.linkedIn}
        onChange={handleChange}
        required
      />
      <label htmlFor="Twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        value={contact.twitter}
        onChange={handleChange}
        required
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
