import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";

const initialState = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: ""
  };

function ContactsEdit(props) {
  const { setContacts } = props
  const [formData, setFormData] = useState(initialState)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(function() {
    fetch(`http://localhost:3030/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3030/contacts/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    await fetch("http://localhost:3030/contacts")
    .then(res => res.json())
    .then(data => setContacts(data))
    navigate('/')
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleChange} value={formData.firstName}  />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleChange} value={formData.lastName} />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleChange} value={formData.street} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleChange} value={formData.city} />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleChange} value={formData.email} />
      
      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleChange} value={formData.linkedin} />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleChange} value={formData.twitter} />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save edits
        </button>
        <button className="button blue">
        <Link to={'/'}>Cancel</Link>
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
