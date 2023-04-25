import { useState } from "react"
import { useNavigate } from "react-router-dom";

// function ContactsAdd(props) {
   // setContacts and contacts must be passed in as props
function ContactsAdd ({setContacts, contacts}) {
  const navigate = useNavigate()
  // to this component so new contacts can be added to the
  // state
  const [formData, setFormData] = useState ({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  })
    // function handleChange(evt) {
    //   setContacts({firstName: evt.target.value})
    // }
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }
  //send POST to json server on form submit
  const handleSubmit = async (e) => {
    // prevent the page from refresh/reloade
    e.preventDefault()
    const res = await fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: {
        // you have to declare what kind of Content-Type the page of application is
        // this is for json always the same! 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    setContacts([...contacts, data]) 
      navigate('/')
  }

 

  return (
    <form className="form-stack contact-form" 
    onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input 
        id="firstName" 
        name="firstName" 
        type="text" 
        required 
        onChange={handleChange} 
        value={formData.firstName}/>

      <label htmlFor="lastName">Last Name:</label>
      <input 
        id="lastName" 
        name="lastName" 
        type="text" 
        required 
        onChange={handleChange} 
        value={formData.lastName}/>

      <label htmlFor="street">Street:</label>
      <input 
        id="street" 
        name="street" 
        type="text" 
        required 
        onChange={handleChange} 
        value={formData.street}/>

      <label htmlFor="city">City:</label>
      <input 
        id="city" 
        name="city" 
        type="text" 
        required 
        onChange={handleChange} 
        value={formData.city}/>

      <label htmlFor="email">Email:</label>
      <input 
        id="email" 
        name="email" 
        type="text" 
        required 
        onChange={handleChange} 
        value={formData.email}/>

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input 
        id="linkedIn" 
        name="linkedIn" 
        type="text"  
        onChange={handleChange} 
        value={formData.linkedIn}/>

      <label htmlFor="twitter">Twitter:</label>
      <input 
        id="twitter" 
        name="twitter" 
        type="text" 
        onChange={handleChange} 
        value={formData.twitter}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
