import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ContactsEdit(props) {
  // setContacts and contacts must be passed as props
  // to this component so contacts within the state can be edited
  const { setContacts, contacts } = props
  const [contactData, setContactData] = useState({})
  const nav = useNavigate()
  const {id} = useParams()

  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`)
    const data = await res.json()
    setContactData(data)
  }, [])

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
    const res = await fetch(`http://localhost:4000/contacts/${id}`, fetchOptions)
    // extract response data
    const data = await res.json()
    // replace LOCAL contact array state with data.contact; keep all other contacts unchanged
    const updatedContacts = contacts.map(contact => {
      if(contact.id === Number(id)) { 
        console.log(contact.id, id, data.contact, contact)
        // Was returning data.contact, but kept returning as undefined 
        // TODO: ((IMPORTANT)) figure out why that was
        return contact
      }
      console.log(contact)
      return contact
    })
    // update LOCAL State
    setContacts(updatedContacts)
    // redirect to this edited contact's page
    nav(`/contacts/${id}/view`)
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Update Contact</h2>

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

      <label htmlFor="contactType">Contact Type:</label>
      <select name='type' onChange={handleChange} value={contactData.type}>
        <option>Select type </option>
        <option>Personal</option>
        <option>Work</option>
      </select>

      <div className="actions-section">
        <button className="button" type="submit">
          Update
        </button>
      </div>
    </form>
  )

}

export default ContactsEdit