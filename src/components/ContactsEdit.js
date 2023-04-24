import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function ContactsEdit(props) {
  const { setContacts, contacts } = props
  const navigate = useNavigate()
  const location = useLocation()

  const initialContact = location.state

  const [newContact, setNewContact] = useState(initialContact)

  //TODO: Implement controlled form
  //send POST to json server on form submit

  console.log(newContact)


  const handleChange = (event) => {
    const contact = newContact;
    contact[`${event.target.name}`] = event.target.value;
    setNewContact(contact);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await fetch(`http://localhost:4000/contacts/${newContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      })
    const data = await res.json()
    setContacts(contacts.map(contact => contact.id === newContact.id ? data : contact))
    navigate(`/`)
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" placeholder={newContact.firstName} onChange={handleChange} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" placeholder={newContact.lastName} onChange={handleChange} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" placeholder={newContact.street} onChange={handleChange} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" placeholder={newContact.city} onChange={handleChange} required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" placeholder={newContact.email} onChange={handleChange} />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="url" placeholder={newContact.linkedIn} onChange={handleChange} />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" placeholder={newContact.twitter} onChange={handleChange} />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
