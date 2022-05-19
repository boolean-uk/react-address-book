import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd({ setContacts }) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  const [newContact, setNewContact] = useState();
  // state
  // const { setContacts, contacts } = props

  //TODO: Implement controlled form
  //send POST to json server on form submit
  // console.log(setContacts);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    switch (name) {
      case "firstName":
        return setNewContact({ ...newContact, firstName: value });
        break;
      case "lastName":
        return setNewContact({ ...newContact, lastName: value });
        break;
      case "street":
        return setNewContact({ ...newContact, street: value });
        break;
      case "city":
        return setNewContact({ ...newContact, city: value });
        break;
      case "email":
        return setNewContact({ ...newContact, email: value });
        break;
      case "linkedIn":
        return setNewContact({ ...newContact, linkedIn: value });
        break;
      case "twitter":
        return setNewContact({ ...newContact, twitter: value });
        break;
      case "type":
        return setNewContact({ ...newContact, type: value });
        break;
    }
  };

  const handleSubmit = (e) => {
    const id = Math.random();
    e.preventDefault();
    setContacts((prevContacts) => [...prevContacts, { ...newContact, id }]);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newContact, id }),
    };

    fetch("http://localhost:4000/contacts/", options);

    e.target.reset();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        onChange={handleChange}
        id="firstName"
        name="firstName"
        type="text"
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        onChange={handleChange}
        id="lastName"
        name="lastName"
        type="text"
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        onChange={handleChange}
        id="street"
        name="street"
        type="text"
        required
      />

      <label htmlFor="city">City:</label>
      <input
        onChange={handleChange}
        id="city"
        name="city"
        type="text"
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
        required
      />
      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        type="text"
        name="linkedIn"
        id="linkedIn"
        onChange={handleChange}
        required
      />
      <label htmlFor="twitter">Twitter:</label>
      <input
        type="text"
        name="twitter"
        id="twitter"
        onChange={handleChange}
        required
      />
      <label htmlFor="type">Contact Type:</label>

      <select onChange={handleChange} name="type" id="type">
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
