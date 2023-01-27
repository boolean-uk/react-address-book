import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

let initialState = {
  // id: "", {index + 1}
  // name: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  //see if I need to add Type, and required = true
}


function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [formState, setFormState] = useState(initialState)

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log("formState", formState)
    //shows in contact list without POST REQUEST so will need to console log 
    //the POST to make sure it goes through to json
    setContacts([...contacts, formState])
    console.log("formState", formState)
    //POST request
    const opts = {
      method: 'POST',
      //stackoverflow says it has to be "application/json"
      headers: { 'content-type': 'application/json' },
      //double check what needs to be stringified
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
      })

    //add new data (js taken from the tips page)
    //reset the form
    // setFormState(initialState)
  }

  // console.log("formState", formState)
  // console.log("updated contacts:", contacts)

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
        value={formState.id}
        required
        onChange={handleChange} />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName"
        name="lastName"
        type="text"
        value={formState.name}
        required
        onChange={handleChange} />

      <label htmlFor="street">Street:</label>
      <input id="street"
        name="street"
        type="text"
        value={formState.name}

        required
        onChange={handleChange} />

      <label htmlFor="city">City:</label>
      <input id="city"
        name="city"
        type="text"
        value={formState.name}
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
