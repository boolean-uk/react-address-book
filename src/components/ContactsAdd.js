import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

const initialState = {
  "firstName": "",
  "lastName": "",
  "pronouns": "",
  "street": "",
  "city": "",
  "linkedIn": "",
  "twitter": "",
}

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [contactData, setContactData] = useState(initialState)
  const nav = useNavigate()

  const handleChange = event => {
    // set the name and value (of the input) to be the target 
    // eg. input for firstName
    const {name, value} = event.target
    // create a new variable, and asign all of the contactData Obj to it
    const newContactData = {...contactData}
    // Apply the new data that was input into the above fields into contactData
    newContactData[`${name}`] = value
    setContactData(newContactData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    // send PUT request to UPDATE an existing contact    
    const fetchOptions = {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(contactData)
    }

    // await for fetch response
    const res = await fetch('http://localhost:4000/contacts', fetchOptions)
    // extract response data
    const data = await res.json()
    // update LOCAL State
    setContacts([...contacts, data])
    // redirect to the home page
    nav('/')
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input 
        id="firstName" 
        name="firstName"
        type="text" 
        placeholder='Hilda' 
        onChange={handleChange} 
        value={contactData.firstName} 
        required 
      />

      <label htmlFor="lastName">Last Name:</label>
      <input 
        id="lastName" 
        name="lastName" 
        type="text" 
        placeholder='Hilda' 
        onChange={handleChange} 
        value={contactData.lastName} 
        required
      />

      <label htmlFor="pronouns">Pronouns:</label>
      <input 
        id="pronouns" 
        name="pronouns" 
        type="text" 
        placeholder='She/They' 
        onChange={handleChange} 
        value={contactData.pronouns} 
        required
      />

      <label htmlFor="street">Street:</label>
      <input 
        id="street" 
        name="street" 
        type="text" 
        placeholder='123 Hilda Street' 
        onChange={handleChange} 
        value={contactData.street} 
        required
      />

      <label htmlFor="city">City:</label>
      <input 
        id="city" 
        name="city" 
        type="text" 
        placeholder='Bastion City' 
        onChange={handleChange} 
        value={contactData.city} 
        required
      />

      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        name="email" type="email" 
        placeholder='Hilda@Hildamail.com' 
        onChange={handleChange} 
        value={contactData.email} 
        required 
      />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input 
        id="linkedIn" 
        name="linkedIn" 
        type="text" 
        placeholder="I don't know the LinkedIn format, sorry"
        onChange={handleChange} 
        value={contactData.linkedIn} 
        required
      />

      <label htmlFor="twitter">Twitter:</label>
      <input 
        id="twitter" 
        name="twitter" 
        type="text" 
        placeholder='@HildaH' 
        onChange={handleChange} 
        value={contactData.twitter} 
        required
      />

      <div className="actions-section">
        <button className="button" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
