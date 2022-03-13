import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  const formReset = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  }
  const { setContacts, contacts } = props
  const navigate = useNavigate()
  const [form, setForm] = useState(formReset)

  const formSubmit = (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }
    fetch('http://localhost:4000/contacts', options)
      .then(res => res.json())
      .then(json => setContacts([...contacts, json]))
    setForm(formReset)
    navigate('/')
  }

  return (
    <form className="form-stack contact-form" onSubmit={formSubmit} >
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input onChange={e => setForm({ ...form, firstName: e.target.value })} value={form.firstName}
        id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input onChange={e => setForm({ ...form, lastName: e.target.value })} value={form.lastName}
        id="lastName" name="lastName" type="text" required />

      <label htmlFor="street">Street:</label>
      <input onChange={e => setForm({ ...form, street: e.target.value })} value={form.street}
        id="street" name="street" type="text" required />

      <label htmlFor="city">City:</label>
      <input onChange={e => setForm({ ...form, city: e.target.value })} value={form.city}
        id="city" name="city" type="text" required />

      <label htmlFor="email">Email:</label>
      <input onChange={e => setForm({ ...form, email: e.target.value })} value={form.email}
        id="email" name="email" type="email" required />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input onChange={e => setForm({ ...form, linkedIn: e.target.value })} value={form.linkedIn}
        id="linkedIn" name="linkedIn" type="text" required />

      <label htmlFor="twitter">Twitter:</label>
      <input onChange={e => setForm({ ...form, twitter: e.target.value })} value={form.twitter}
        id="twitter" name="twitter" type="text" required />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
