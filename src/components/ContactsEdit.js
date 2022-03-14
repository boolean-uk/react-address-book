import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

function ContactsEdit(props) {

  const { setContacts, contacts } = props

  const [editContact, setEditContact] = useState({})


  const location = useLocation()

  useEffect(() => {
    if(location.state) {
      const {contact} = location.state
      setEditContact(contact)
    }
  }, [location] )


  const navigate = useNavigate();

  const handleInput = (event) => {
    setEditContact({...editContact, [event.target.name] : event.target.value})
  }


  const handleSubmit = (event) => {
    event.preventDefault()
        fetch(`http://localhost:4000/contacts/${editContact.id}`, { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editContact)
      })
      .then(response => response.json())
      .then(json => {
        const updatedContacts = contacts.map(person => person.id === json.id ? json : person)
        setContacts(updatedContacts)
        navigate("/")
      })
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleInput} value={editContact.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleInput} value={editContact.lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleInput} value={editContact.street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleInput} value={editContact.city}required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleInput} value={editContact.email} required/>

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleInput} value={editContact.linkedin}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleInput} value={editContact.twitter}/>

      <div>
      <label htmlFor="work">Work:</label>
      <input id="type" name="type" type="radio" onChange={handleInput} checked={editContact.type==="work"} value="work"/>
      <label htmlFor="personal">Personal:</label>
      <input id="type" name="type" type="radio" onChange={handleInput} checked={editContact.type==="personal"} value="personal"/>
      </div>


      <div className="actions-section">
        <button className="button blue" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
