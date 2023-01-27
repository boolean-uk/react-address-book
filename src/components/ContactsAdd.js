import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  console.log("This is inside the Contacts Add, and this is the props,", props)

  //TODO: Implement controlled form

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("this is called when create is pressed, here is the new contact data", contacts)

    event.target.reset();
  }

  const handleChange = (event) => {
    const value = event.target.value
  }
  //send POST to json server on form submit

  return (
    <form className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required/>

      <div className="actions-section">
        <button onSubmit={handleSubmit} className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
