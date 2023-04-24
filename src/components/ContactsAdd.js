import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  const { setContacts, contacts } = props
  const navigate = useNavigate()

  const initialContact = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  }

  const [newContact, setNewContact] = useState(initialContact)

  //TODO: Implement controlled form
  //send POST to json server on form submit



  const handleChange = (event) => {
    const contact = newContact;
    contact[`${event.target.name}`] = event.target.value;
    setNewContact(contact);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    })
    const data = await res.json()
    setContacts([...contacts, data])
    console.log("Add successful")
    navigate('/')
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleChange} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleChange} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleChange} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleChange} required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleChange} />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="url" onChange={handleChange} />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleChange} />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
