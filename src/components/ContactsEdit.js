import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ContactsEdit = (props) => {

  const { setContacts, contacts } = props
  const [contactEdit, setContactEdit] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${id}`)
      .then(res => res.json())
      .then(data => setContactEdit(data))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setContactEdit({...contactEdit, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:4000/contacts/${contactEdit.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactEdit)
    })
    const data = await res.json()
    setContacts(contacts.map(contact => contact.id === contactEdit.id ? data : contact))
    navigate('/')
  }

  return(
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
    <h2>Create Contact</h2>

    <label htmlFor="firstName">First Name</label>
    <input id="firstName" name="firstName" type="text" required onChange={handleChange} value={contactEdit.firstName}/>

    <label htmlFor="lastName">Last Name:</label>
    <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={contactEdit.lastName}/>

    <label htmlFor="street">Street:</label>
    <input id="street" name="street" type="text" required onChange={handleChange} value={contactEdit.street}/>

    <label htmlFor="city">City:</label>
    <input id="city" name="city" type="text" required onChange={handleChange} value={contactEdit.city}/>

    <label htmlFor="email">Email:</label>
    <input id="email" name="email" type="email" required onChange={handleChange} value={contactEdit.email}/>

    <label htmlFor="twitter">Twitter:</label>
    <input id="twitter" name="twitter" type="text" onChange={handleChange} value={contactEdit.twitter}/>

    <label htmlFor="linkedin">LinkedIn:</label>
    <input id="linkedin" name="linkedin" type="text" onChange={handleChange} value={contactEdit.linkedin}/>

    <div className="actions-section">
      <button className="button blue" type="submit">
        Update
      </button>
    </div>
  </form>
  )
}

export default ContactsEdit
