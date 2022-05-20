import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [twitter, setTwitter] = useState("")
  console.log(firstName, email, linkedIn, twitter)

  function onSubmit(event) {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        street: street,
        city: city,
        email: email,
        linkedIn: linkedIn,
        twitter: twitter,
      }),
    }

    fetch("http://localhost:4000/contacts", options)
    .then((res) => res.json())
    .then((json) => {
      setContacts([...contacts, json])
      
      setFirstName("")
      setLastName("")
      setStreet("")
      setCity("")
      setEmail("")
      setLinkedIn("")
      setTwitter("")
    })
  }

  function onFirstNameChanged(event) {
    setFirstName(event.target.value)
  }

  function onLastNameChanged(event) {
    setLastName(event.target.value)
  }

  function onStreetChanged(event) {
    setStreet(event.target.value)
  }

  function onCityChanged(event) {
    setCity(event.target.value)
  }

  function onEmailChanged(event) {
    setEmail(event.target.value)
  }

  function onLinkedInChanged(event) {
    setLinkedIn(event.target.value)
  }

  function onTwitterChanged(event) {
    setTwitter(event.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input onChange={onFirstNameChanged} value={firstName} id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input onChange={onLastNameChanged} value={lastName} id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input onChange={onStreetChanged} value={street} id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input onChange={onCityChanged} value={city} id="city" name="city" type="text" required/>

      <label htmlFor="email">Email:</label>
      <input onChange={onEmailChanged} value={email} id="emailAddress" name="email" type="email" placeholder="boolean@example.com" minLength="3" maxLength="64" required/>

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input onChange={onLinkedInChanged} value={linkedIn} id="linkedIn" name="linkedIn" type="text" required/>

      <label htmlFor="twitter">Twitter:</label>
      <input onChange={onTwitterChanged} value={twitter} id="twitter" name="twitter" type="text" required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
