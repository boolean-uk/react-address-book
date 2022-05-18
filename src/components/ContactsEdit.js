import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ContactsEdit({ setContacts, contacts }) {
  const [formData, setFormData] = useState(null)
  const navigate = useNavigate()
  const params = useParams()

  const updateContact = (newContact) => {
    const newContacts = [...contacts]
    const contactToUpdateIndex = newContacts.findIndex(el => el.id === newContact.id)
    newContacts[contactToUpdateIndex] = {...newContact}
    setContacts([...newContacts])
  }

  useEffect(() => {
    fetch(`http://localhost:4000/contacts?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        const contactData = data[0]
        setFormData(contactData)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:4000/contacts/${params.id}`, opts)
      .then(res => res.json())
      .then(data => updateContact(data))

    navigate("/")
  }

  if (!formData) return <div>Please wait...</div>

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required value={formData.street} onChange={handleChange}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required value={formData.city} onChange={handleChange}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}/>

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="linkedIn" value={formData.linkedIn} onChange={handleChange}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="twitter" value={formData.twitter} onChange={handleChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
