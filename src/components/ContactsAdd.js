import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  const empty = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postcode: "",
    isBlocked: false
  }

  const { setContacts, contacts, setCounter } = props
  const [{firstName,lastName,street,city, postcode, isBlocked},setContact] = useState(empty)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({firstName,lastName,street,city,postcode,isBlocked})
  }

  function handleSubmit(event){
    event.preventDefault()
    fetch("http://localhost:4000/contacts", options)
    .then(res=>res.json())
    .then(() => {
      setCounter(prev => prev+1)
      setContact(empty)})
  }

  function handleInput(event){
    setContact(prev => ({...prev,[event.target.name]: event.target.value}))
  }

  function handleCheck(event){
    setContact(prev => ({...prev, [event.target.name]: event.target.checked}))
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleInput} value={firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleInput} value={lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleInput} value={street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleInput} value={city} required/>

      <label htmlFor="postcode">Postcode:</label>
      <input id="postcode" name="postcode" type="text" onChange={handleInput} value={postcode} required/>

      <label htmlFor="blocked">Blocked</label>
      <input id="blocked" name="isBlocked" type="checkbox" onChange={handleCheck} checked={isBlocked}></input>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
