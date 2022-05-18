import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;

  //TODO: Implement controlled form
  //send POST to json server on form submit
  //add new contact to state
  //navigate to contacts list
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.reportValidity()) return;
    fetch("http://localhost:4000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        street,
        city,
      }),
    }).then((response) => {
      response.json().then((data) => {
        setContacts([...contacts, data]);
        navigate("/");
      });
    });
  };

  const handleChange = (source, target) => {
    target(source.value);
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required onChange={(e) => handleChange(e.target, setFirstName)} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={(e) => handleChange(e.target, setLastName)}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required   onChange={(e) => handleChange(e.target, setStreet)}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={(e) => handleChange(e.target, setCity)} />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default ContactsAdd;
