import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ContactsEdit(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [contactData, setContactData] = useState({})
  const nav = useNavigate()
  const {id} = useParams()

  //TODO: Implement controlled form
  //send POST to json server on form submit

  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`)
    const data = await res.json()
    setContactData(data)
  }, [])

  const handleChange = event => {
    const {name, value} = event.target
    const newContactData = {...contactData}
    newContactData[`${name}`] = value
    setContactData(newContactData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const res = await fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(contactData)
    })
    const data = await res.json()
    const updatedContacts = contacts.map(contact => contact.id === Number(id) ? data.contact: contact)
    setContacts(updatedContacts)
    nav(`/contacts/${id}`)
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Update Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input 
        id="firstName" 
        name="firstName" type="text" 
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
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
  )

}

export default ContactsEdit