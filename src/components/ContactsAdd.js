import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  
  
  const navigate = useNavigate()
  
  //TODO: Implement controlled form
  //send POST to json server on form submit

const handleSubmit = (e) => {
  e.preventDefault()
  console.log( {firstName, lastName, street, city})
  const newContact = {
    firstName, 
    lastName, 
    street, 
    city,
    id: Math.random()
  }
  console.log(newContact)

  
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newContact)
  }


  fetch('http://localhost:4000/contacts', opts)
  .then(response => response.json())
  .then(() => {
    setContacts(contacts);
    navigate(`/`);
    fetch('http://localhost:4000/contacts')
    .then((response) => response.json())
    .then((data) => setContacts(data))
  });

}

const changeFirst = (e) => {
  console.log(e.target.value);
  let first = e.target.value
  setFirstName(first)
}
const changeLast = (e) => {
  console.log(e.target.value);
  let last = e.target.value
  setLastName(last)
}

const changeStreet = (e) => {
  console.log(e.target.value);
  let street = e.target.value
  setStreet(street)
}
const changeCity = (e) => {
  console.log(e.target.value);
  let city = e.target.value
  setCity(city)
}



  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required value={firstName} onChange={changeFirst}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required value={lastName} onChange={changeLast}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required value={street} onChange={changeStreet} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required value={city} onChange={changeCity}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
