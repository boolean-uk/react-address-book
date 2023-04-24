import { useState } from "react"
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedin: "",
  twitter: ""
};

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3030/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json()
    setContacts([...contacts, data])
    navigate('/')
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleChange} value={formData.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleChange} value={formData.lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleChange} value={formData.street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleChange} value={formData.city} required/>

      <label htmlFor="city">Email:</label>
      <input id="city" name="email" type="text" onChange={handleChange} value={formData.email} required/>
      
      <label htmlFor="city">LinkedIn:</label>
      <input id="city" name="linkedin" type="text" onChange={handleChange} value={formData.linkedin} required/>

      <label htmlFor="city">Twitter:</label>
      <input id="city" name="twitter" type="text" onChange={handleChange} value={formData.twitter} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
