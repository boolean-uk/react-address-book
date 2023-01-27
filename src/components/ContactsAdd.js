import { useState } from "react"
import { useNavigate } from "react-router-dom";


function ContactsAdd(props) {

  const { setContacts, contacts } = props

  const navigate = useNavigate()

  const saveContact = () => {
    const body = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      street: document.getElementById("street").value,
      city: document.getElementById("city").value
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
    }}
    fetch(`http://localhost:4000/contacts`, options)
      .then(setContacts([...contacts, body]))
      .then(navigate('/'))
  }

  return (
    <form onSubmit={saveContact} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
