import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ContactsAdd(props) {
  const { setContacts, contacts } = props

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")

  function handleFirstName(event) {
    const inputValue = event.target.value
    setFirstName(inputValue)
  }

  function handleLastName(event) {
    const inputValue = event.target.value
    setLastName(inputValue)
  }

  function handleStreet(event) {
    const inputValue = event.target.value
    setStreet(inputValue)
  }

  function handleCity(event) {
    const inputValue = event.target.value
    setCity(inputValue)
  }

  function handleSubmit(event) {
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
      }),
    }

    fetch(`http://localhost:4000/contacts`, options)
      .then((res) => res.json())
      .then((json) => {
        setContacts([...contacts, json])
      })

    setFirstName("")
    setLastName("")
    setStreet("")
    setCity("")
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={firstName}
        onChange={handleFirstName}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={lastName}
        onChange={handleLastName}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={street}
        onChange={handleStreet}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={city}
        onChange={handleCity}
        required
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
