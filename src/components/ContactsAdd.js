import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

const initialState = {
  "firstName": "",
  "lastName": "",
  "street": "",
  "city": ""
}

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [data, setData] = useState(initialState)
  const nav = useNavigate()

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleChange = event => {
    const {name, value} = event.target
    const newData = {...data}
    newData[`${name}`] = value
    setData(newData)
  }

  const handleSubmit = event => {
    event.preventDefault()

    fetch('http://localhost:4000/contacts', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      })
      .then(res => res.json)
      .then(data => setData([...contacts, data]))
      Navigate('/')
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input 
        id="firstName" 
        name="firstName" type="text" 
        placeholder='Hilda' 
        onChange={handleChange} 
        value={data.firstName} 
        required 
      />

      <label htmlFor="lastName">Last Name:</label>
      <input 
        id="lastName" 
        name="lastName" 
        type="text" 
        placeholder='Hilda' 
        onChange={handleChange} 
        value={data.lastName} 
        required
      />

      <label htmlFor="street">Street:</label>
      <input 
        id="street" 
        name="street" 
        type="text" 
        placeholder='123 Hilda Street' 
        onChange={handleChange} 
        value={data.street} 
        required
      />

      <label htmlFor="city">City:</label>
      <input 
        id="city" 
        name="city" 
        type="text" 
        placeholder='Bastion City' 
        onChange={handleChange} 
        value={data.city} 
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
