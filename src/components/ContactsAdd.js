import { useEffect, useRef, useState } from "react"
// import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
}


function ContactsAdd(props) {

  const { setContacts, contacts } = props
  const [formState, setFormState] = useState(initialState)

  //send POST to json server on form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    setContacts([...contacts, formState])

    //POST request
    const opts = {
      method: 'POST',
      //stackoverflow says it has to be "application/json"
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        "firstName": formState.firstName,
        "lastName": formState.lastName,
        "street": formState.street,
        "city": formState.city,
      })
    }
    //Pass the URL we want to pass TO
    fetch("http://localhost:4000/contacts", opts)
      .then(res => res.json())
      .then(data => {
        formState
        // console.log("posted contacts:", contacts)
        console.log("posted contacts formState:", formState)
      })
    //reset the form. Timer to allow for post request to complete
    setTimeout(() => {
      setFormState(initialState);
    }, 500)
  }

  //change the input from empty string to submitted info
  const handleChange = (event) => {
    //set targets to change
    const name = event.target.name
    const value = event.target.value

    if (name === "firstName") {
      setFormState({ ...formState, firstName: value })
    }
    if (name === "lastName") {
      setFormState({ ...formState, lastName: value })
    }
    if (name === "street") {
      setFormState({ ...formState, street: value })
    }
    if (name === "city") {
      setFormState({ ...formState, city: value })
    }

  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName"
        name="firstName"
        type="text"
        value={formState.firstName}
        required
        onChange={handleChange} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName"
        name="lastName"
        type="text"
        value={formState.lastName}
        required
        onChange={handleChange} />

      <label htmlFor="street">Street:</label>
      <input id="street"
        name="street"
        type="text"
        value={formState.street}

        required
        onChange={handleChange} />

      <label htmlFor="city">City:</label>
      <input id="city"
        name="city"
        type="text"
        value={formState.city}
        required
        onChange={handleChange} />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}


export default ContactsAdd
