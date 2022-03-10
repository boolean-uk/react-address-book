import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

function ContactsAdd(props) {

  const { setContacts, contacts } = props

  const [newContact, setNewContact] = useState( {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: ""
  })


  const location = useLocation()

  useEffect(() => {
    if(location.state) {
      const {contact} = location.state
      setNewContact(contact)
    }
  }, [location] )


  const navigate = useNavigate();

  const handleInput = (event) => {
    setNewContact({...newContact, [event.target.name] : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(newContact.id) {
        fetch(`http://localhost:4000/contacts/${newContact.id}`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact)
      })
      .then(response => response.json())
      .then(json => {
        const updatedContacts = contacts.map(person => person.id === json.id ? json : person)
        setContacts(updatedContacts)
        navigate("/")
      })
    }
    else {
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

      <div className="actions-section">
        <button className="button blue" type="submit">
          {newContact.id ? 'Edit' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
