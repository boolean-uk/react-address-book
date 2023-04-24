import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  const emptyForm = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  }

  const { setContacts, contacts } = props
  const [formData, setFormData] = useState(emptyForm)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
 
  const create = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3030/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    const contact = await res.json()

    setContacts([...contacts, contact])
    
    navigate('/')
  }

  return (
    <form className="form-stack contact-form" onSubmit={e => create(e)}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required
        onChange={handleChange} value={formData.firstName} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required 
        onChange={handleChange} value={formData.lastName} />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required
       onChange={handleChange} value={formData.street} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required
       onChange={handleChange} value={formData.city}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="text" required
       onChange={handleChange} value={formData.email}/>

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="text" required
       onChange={handleChange} value={formData.linkedIn}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" required
       onChange={handleChange} value={formData.twitter}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
