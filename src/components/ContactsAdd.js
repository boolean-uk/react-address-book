import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd({ setContacts, contacts }) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  //const { setContacts, contacts } = props
  const [formData, setFormData] = useState({
    firstName : '',
    lastName : '',
    street : '',
    city : '',
    email : '',
    linkedin : '',
    twitter: ''
})
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

   // make a POST HTTP request to http://localhost:3030/tasks/
    // add data to the request body in the format JSON
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:4000/contacts", {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(formData) })
//we are making a request to json and getting all the data that is stored until now

const data = await res.json() //adding the new data into json
setContacts([...contacts, data])
navigate('/')
  }
     

  //TODO: Implement controlled form
  //send POST to json server on form submit

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required onChange={handleChange}
      value = {formData.firstName}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange}
      value = {formData.lastName}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange}
      value = {formData.street}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange}
      value = {formData.city}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="text" required onChange={handleChange}
      value = {formData.email} />

      <label htmlFor="linkedin">LinkedIn</label>
      <input id="linkedin" name="linkedin" type="text" required onChange={handleChange}
      value = {formData.linkedin} />

      <label htmlFor="twitter">Twitter</label>
      <input id="twitter" name="twitter" type="text" reaquired onChange={handleChange}
      vale = {formData.twitter} />


      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
