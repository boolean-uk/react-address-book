import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  const { setContacts, contacts } = props
  const navigate = useNavigate()



  const [formData, setFormData] = useState({})


  const handleChange = (e) => {
    const val = e.target.value
    const name = e.target.name

    setFormData({ ...formData, [name]: val })

  }

  const handleSubmit = (e) => {
    e.preventDefault()

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
      <input id="firstName" name="firstName" type="text" required onChange={handleChange} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange} />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange} />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleChange} />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleChange} />

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
