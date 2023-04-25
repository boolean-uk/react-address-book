import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const initialContact = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  email: '',
  linkedin: '',
  tweeter: '',
  type: ''
}

function ContactsAdd(props) {
  const navigate = useNavigate()
  const [contact, setContact] = useState(initialContact)

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (contact.firstName !== '') {
      const res = await fetch("http://localhost:3030/contacts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })

      const data = await res.json()

      setContacts([...contacts, data])
      navigate('/')
    }
  }

  const handleChange = (e) => {
    const {name , value} = e.target
    setContact({...contact, [name]:value})
  }


  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleChange} value={contact.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleChange} value={contact.lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleChange} value={contact.street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleChange} value={contact.city} required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleChange} value={contact.email} />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleChange} value={contact.linkedin} />

      <label htmlFor="tweeter">Tweeter:</label>
      <input id="tweeter" name="tweeter" type="text" onChange={handleChange} value={contact.tweeter} />


      <p><b>Choose what type of contact this should be: </b></p>
      <div className="radiobuttons">
        <div>
          <label htmlFor="work">Work: </label>
          <input type="radio" id="work" name="type" onChange={handleChange} value='Work'></input>
        </div>
        <div>
          <label htmlFor="personal">Personal: </label>
          <input type="radio" id="personal" name="type" onChange={handleChange} value='Personal'></input>
        </div>
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
