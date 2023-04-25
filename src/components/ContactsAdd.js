import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [ formData, setFormData ] = useState(
    {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    twitter: '',
    linkedin: '',
    type: ''
    }
  )

  const navigate = useNavigate()
  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleChange = (e) => {
    const { name, value} = e.target
    setFormData({...formData, [name]: value})
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:4000/contacts`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    setContacts([...contacts, data])
    setFormData({})
    navigate('/')
  }


  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required onChange={handleChange} value={contacts.firstName}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={contacts.lastName}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange} value={contacts.street}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange} value={contacts.city}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required onChange={handleChange} value={contacts.email}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleChange} value={contacts.twitter}/>

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleChange} value={contacts.linkedin}/>

      <label htmlFor="type">Type of contact</label>

      <div>
        <input id="personal" name="type" type="radio" onChange={handleChange} value="personal"/>
        Personal 🫂
        <input id="work" name="type" type="radio" onChange={handleChange} value="work"/>
        Work 💼
      </div>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
