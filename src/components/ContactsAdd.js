import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  const initialForm = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  };

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const onStreetChange = (e) => {
    setStreet(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault()

    const options ={
      method: 'POST',
       headers: {
        'Content-Type' : 'application/json'
     },
     body: JSON.stringify({
       firstName: firstName,
       lastName: lastName,
       street: street,
       city: city,
     })
    }
    fetch('http://localhost:4000/contacts', options)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setContacts([...contacts, json])
      console.log(contacts)
      setFirstName("")
      setLastName("")
      setStreet("")
      setCity("")
    })
  }

  return (
    <form onSubmit={onSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        onChange={onFirstNameChange}
        value={firstName}
        id="firstName"
        name="firstName"
        type="text"
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        onChange={onLastNameChange}
        value={lastName}
        id="lastName"
        name="lastName"
        type="text"
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        onChange={onStreetChange}
        value={street}
        id="street"
        name="street"
        type="text"
        required
      />

      <label htmlFor="city">City:</label>
      <input
        onChange={onCityChange}
        value={city}
        id="city"
        name="city"
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
