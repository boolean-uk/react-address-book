import { useState } from "react"
import { useNavigate } from "react-router-dom";

const initialFormState = {
  id: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: ""
}

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const [newContactForm, setNewContactForm] = useState(initialFormState)
  const navigate = useNavigate()



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    

    const newFormState = {...newContactForm }
    if (name === "firstName") {
      newFormState.firstName = value
    }

    if (name === "lastName") {
      newFormState.lastName = value
    }

    if (name === "street") {
      newFormState.street = value
    }

    if (name === "city") {
      newFormState.city = value
    }

    if (name === "email") {
      newFormState.email = value
    }

    if (name === "linkedIn") {
      newFormState.linkedIn = value
    }

    if (name === "twitter") {
      newFormState.twitter = value
    }
    setNewContactForm(newFormState)
  };



  const handleSubmit = (event) => {
   event.preventDefault()
    console.log("Form Submitted")
    const newContact = newContactForm
    const newContactJson = JSON.stringify(newContact)
    console.log("json", newContactJson)

    const options = {
        method: "POST",
        body: newContactJson,
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch("http://localhost:4000/contacts", options)
    .then((res) => res.json())
    .then((data) => {
        console.log("Created New Contact", data)

        fetch("http://localhost:4000/contacts")
        .then((res) => res.json())
        .then((data) => {
          setNewContactForm(data)
        })
    })
    
    event.target.reset()
    navigate('/')

}






return (
  <form className="form-stack contact-form" onSubmit={handleSubmit}>
  <h2>Create Contact</h2>

  <label htmlFor="firstName">First Name</label>
  <input id="firstName" name="firstName" type="text" required  onChange={handleChange}/>

  <label htmlFor="lastName">Last Name:</label>
  <input id="lastName" name="lastName" type="text" required onChange={handleChange}/>

  <label htmlFor="street">Street:</label>
  <input id="street" name="street" type="text" required onChange={handleChange}/>

  <label htmlFor="city">City:</label>
  <input id="city" name="city" type="text" required onChange={handleChange}/>

  <label htmlFor="email">Email:</label>
  <input id="email" name="email" type="email" required onChange={handleChange}/>

  <label htmlFor="linkedIn">LinkedIn:</label>
  <input id="linkedIn" name="linkedIn" type="text" required onChange={handleChange}/>

  <label htmlFor="twitter">Twitter:</label>
  <input id="twitter" name="twitter" type="text" required onChange={handleChange}/>

    <div className="actions-section">
      <button className="button blue" type="submit">
        Create
      </button>
    </div>
  </form>

)
}

export default ContactsAdd



