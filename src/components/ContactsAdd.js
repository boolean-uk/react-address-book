import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
function ContactsAdd(props) {

  // setContacts1 and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts1, contacts } = props
  //TODO: Implement controlled form
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  console.log(contacts)
  const navigate = useNavigate()

  //send POST to json server on form submit
  function handleSubmit(e) {
    e.preventDefault()
    console.log(firstName, lastName, street, city)
    const contentOfContacts = { firstName, lastName, street, city }
    fetch(`http://localhost:4000/contacts`, {
      method: 'POST',
      body: JSON.stringify(contentOfContacts),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => setContacts1([...contacts, data], navigate('/')))

  }

  function firstNameChange(e) {
    e.preventDefault()
    setFirstName(e.target.value)
  }
  function lastNameChange(e) {
    e.preventDefault()
    setLastName(e.target.value)
  }
  function streetChange(e) {
    e.preventDefault()
    setStreet(e.target.value)
  }
  function cityChange(e) {
    e.preventDefault()
    setCity(e.target.value)

  }
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit} >
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required onChange={firstNameChange} value={firstName} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required value={lastName} onChange={lastNameChange} />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required value={street} onChange={streetChange} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required value={city} onChange={cityChange} />

      <div className="actions-section">
        <button className="button blue" type="submit" >
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
