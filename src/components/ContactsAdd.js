import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";

const initialData = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  email: '',
  linkedin: '',
  twitter: ''
}

function ContactsAdd(props) {

  const { setContacts, contacts } = props
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state)
  const contact = location.state || null


  const [formData, setFormData] = useState(contact || initialData)


  const handleChange = (e) => {
    const val = e.target.value
    const name = e.target.name

    setFormData({ ...formData, [name]: val })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //update entry
    if (contact) {
      fetch(`http://localhost:4000/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => {
          if (res.status === 200) {
            return res.json()
          }
        })
        .then(data => {
          const updatedContacts = [...contacts]
          const index = updatedContacts.findIndex(item => item.id === contact.id);

          updatedContacts[index] = data
          setContacts(updatedContacts)
          navigate('/')
        })
      return
    }

    fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.status === 201) {
          return res.json()
        }
      })
      .then(data => {

        setContacts([...contacts, data])
        navigate('/')
      })


  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required onChange={handleChange} value={formData.firstName} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={formData.lastName} />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange} value={formData.street} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange} value={formData.city} />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleChange} value={formData.email || ''} />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleChange} value={formData.linkedin || ''} />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleChange} value={formData.twitter || ''} />


      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
