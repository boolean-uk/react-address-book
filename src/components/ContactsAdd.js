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

  function handleSubmit(event) {
    event.preventDefault()

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

  function handleChange(event){

   const inputName = event.target.name
   const inputValue = event.target.value
   
   if (inputName === "firstName") {
     setAddressData({...addressData, firstName: inputValue})
   }
   if (inputName === "lastName") {
     setAddressData({...addressData, lastName: inputValue})
   }
   if (inputName === "street") {
     setAddressData({...addressData, street: inputValue})
   }
   if (inputName === "city") {
    setAddressData({...addressData, city: inputValue})
  }
  if (inputName === "email") {
    setAddressData({...addressData, email: inputValue})
  }
  if (inputName === "linkedin") {
    setAddressData({...addressData, linkedin: inputValue})
  }
  if (inputName === "twitter") {
    setAddressData({...addressData, twitter: inputValue})
  }
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
