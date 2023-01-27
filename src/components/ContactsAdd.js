import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
 const navigate = useNavigate();

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [ firstName, setFirstName] = useState("")
  const [ lastName, setLastName] = useState("")
  const [ street, setStreet] = useState("")
  const [ city, setCity] = useState("")


  //TODO: Implement controlled form

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called", contacts)
    const newContact = { firstName, lastName, street, city}

    fetch("http://localhost:4000/contacts", {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(newContact)
    }).then(() => {
      console.log("New Contact added")
    })  
    // navigate("/*")
  }

  const handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    // console.log(value, name)

    if (name === "firstName") {
      setFirstName(value)
    }

    if (name === "lastName") {
      setLastName(value)
    }

    if (name === "street") {
      setStreet(value)
    }

    if (name === "city") {
      setCity(value)
    }
  }

  //send POST to json server on form submit


  return (
    <form onSubmit={handleSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input onChange={handleChange} id="firstName" name="firstName" type="text" value={firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input onChange={handleChange} id="lastName" name="lastName" type="text" value={lastName} required/>

      <label htmlFor="street">Street:</label>
      <input onChange={handleChange} id="street" name="street" type="text" value={street} required/>

      <label htmlFor="city">City:</label>
      <input onChange={handleChange} id="city" name="city" type="text" value={city} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
