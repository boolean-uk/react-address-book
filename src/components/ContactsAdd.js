import { useState } from "react"
import { useNavigate } from "react-router-dom";
import ContactsView from "./ContactsView";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkdin: '',
    twitter: ''
  });

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const HandleChange = (eventObject) => {
    const contact = newContact;
    contact[`${eventObject.target.name}`] = eventObject.target.value;
    setNewContact(contact);
  }

  const HandleSubmit = (eventObject) =>
  {
    eventObject.preventDefault();
    fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    })
    .then(res => res.json())
    .then(data => {

      setContacts([...contacts, data]);
    }).then(navigate('/'));
  }

  return (
    <form className="form-stack contact-form" onSubmit={HandleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={HandleChange} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={HandleChange} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={HandleChange} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={HandleChange} required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="text" onChange={HandleChange} required/>

      <label htmlFor="linkdin">Linkdin:</label>
      <input id="linkdin" name="linkdin" type="text" onChange={HandleChange} required/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={HandleChange} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
