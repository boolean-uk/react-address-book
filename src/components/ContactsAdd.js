import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

function ContactsAdd(props) {
  const { setContacts, contacts } = props;
  const location = useLocation();
  let initialFormState;
  if (!location.state) {
    initialFormState = {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      email: "",
      linkedIn: "",
      twitter: "",
    };
  } else {
    initialFormState = {
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      street: location.state.street,
      city: location.state.city,
      email: location.state.email,
      linkedIn: location.state.linkedIn,
      twitter: location.state.twitter,
    }
  }
  const [formData, setFormData] = useState(initialFormState);

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        email: formData.email,
        linkedIn: formData.linkedIn,
        twitter: formData.twitter,
      }),
    };

    fetch("http://localhost:4000/contacts", options)
      .then((res) => res.json())
      .then((contact) => {
        console.log("user created:", contact);
        setContacts([...contacts, contact]);
        setFormData(initialFormState);
        navigate("/");
      });
  };

  const onFirstNameChange = (event) => {
    setFormData({ ...formData, firstName: event.target.value });
  };
  const onLastNameChange = (event) => {
    setFormData({ ...formData, lastName: event.target.value });
  };
  const onStreetChange = (event) => {
    setFormData({ ...formData, street: event.target.value });
  };
  const onCityChange = (event) => {
    setFormData({ ...formData, city: event.target.value });
  };
  const onEmailChange = (event) => {
    setFormData({ ...formData, email: event.target.value });
  };
  const onLinkedInChange = (event) => {
    setFormData({ ...formData, linkedIn: event.target.value });
  };
  const onTwitterChange = (event) => {
    setFormData({ ...formData, twitter: event.target.value });
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        onChange={onFirstNameChange}
        value={formData.firstName}
        id="firstName"
        name="firstName"
        type="text"
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        onChange={onLastNameChange}
        value={formData.lastName}
        id="lastName"
        name="lastName"
        type="text"
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        onChange={onStreetChange}
        value={formData.street}
        id="street"
        name="street"
        type="text"
        required
      />

      <label htmlFor="city">City:</label>
      <input
        onChange={onCityChange}
        value={formData.city}
        id="city"
        name="city"
        type="text"
        required
      />

      <label htmlFor="city">Email:</label>
      <input
        onChange={onEmailChange}
        value={formData.email}
        id="email"
        name="email"
        type="email"
        required
      />

      <label htmlFor="city">LinkedIn:</label>
      <input
        onChange={onLinkedInChange}
        value={formData.linkedIn}
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
      />

      <label htmlFor="city">Twitter:</label>
      <input
        onChange={onTwitterChange}
        value={formData.twitter}
        id="twitter"
        name="twitter"
        type="text"
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
