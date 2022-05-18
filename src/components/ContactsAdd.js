import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const initialData = { 
    firstName: "", 
    lastName: "", 
    street: "", 
    city: "",
    email: "",
    linkedIn: "",
    twitter: ""
  }

  const [formData, setFormData] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:4000/contacts`, opts)
      .then(res => res.json())
      .then(data => setContacts([...contacts, data]))

    setFormData(initialData)
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

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
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
