import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  const { setContacts, contacts } = props

  const [newContact, setNewContact] = useState( {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: "",
    type: "work"
  })

  const navigate = useNavigate();

  const handleInput = (event) => {
    setNewContact({...newContact, [event.target.name] : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
        fetch("http://localhost:4000/contacts", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact)
      })
      .then(response => response.json())
      .then(json => {
        setContacts([...contacts, json])
        navigate("/")
      })
    }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleInput} value={newContact.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleInput} value={newContact.lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleInput} value={newContact.street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleInput} value={newContact.city}required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleInput} value={newContact.email} required/>

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleInput} value={newContact.linkedin}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleInput} value={newContact.twitter}/>

      <div>
      <label htmlFor="work">Work:</label>
      <input id="type" name="type" type="radio" onChange={handleInput} checked={newContact.type==="work"} value="work"/>
      <label htmlFor="personal">Personal:</label>
      <input id="type" name="type" type="radio" onChange={handleInput} checked={newContact.type==="personal"} value="personal"/>
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
