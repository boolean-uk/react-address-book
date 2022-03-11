import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  const { setContacts, contacts } = props

  const navigate = useNavigate()

  const [addressData, setAddressData] = useState({ 
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: "",
  })

  function handleSubmit(e) {
    e.preventDefault()

    const options = {
     method: 'POST',
     headers : {
        'Content-Type' : 'application/json'
     },
     body: JSON.stringify({
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      street: addressData.street,
      city: addressData.city,
      email: addressData.email,
      linkedin: addressData.linkedin,
      twitter: addressData.twitter
     })
   }

  fetch("http://localhost:4000/contacts", options)
    .then(res => res.json())
    .then(json => {
      
      console.log("Address created!", json)
      setContacts( [...contacts, json])

      setAddressData({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        email: "",
        linkedin: "",
        twitter: "",
      })

    })
    navigate(`/`)
  }

  const handleChange = (e) => {
  setAddressData({...addressData, [e.target.name]: e.target.value})
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" value={addressData.firstName} name="firstName" type="text" required onChange={handleChange} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" value={addressData.lastName} name="lastName" type="text" required onChange={handleChange}/>

      <label htmlFor="street">Street:</label>
      <input id="street" value={addressData.street} name="street" type="text" required onChange={handleChange}/>

      <label htmlFor="city">City:</label>
      <input id="city" value={addressData.city} name="city" type="text" required onChange={handleChange}/>

      <label htmlFor="email">Email:</label>
      <input id="email" value={addressData.email} name="email" type="text" required onChange={handleChange}/>

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" value={addressData.linkedin} name="linkedin" type="text" required onChange={handleChange}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" value={addressData.twitter} name="twitter" type="text" required onChange={handleChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
