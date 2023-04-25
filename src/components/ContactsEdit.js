import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit(props) {
const navigate = useNavigate()
  let contact ={
    firstName:'',
    lastName:'',
    street:'',
    city:'',
    email:'',
    linkedIn:'',
    twitter:''

  }
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts} = props
  const [formData, setFormData] = useState(contact)
  const params = useParams()

  //TODO: Implement controlled form
  //send POST to json server on form submit
useEffect(function() {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(res => res.json())
    .then(data => setFormData(data))
}, [])


const handleSubmit = async (e) => {
  e.preventDefault();
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }
  const res = await fetch(`http://localhost:4000/contacts/${params.id}`, requestOptions)
  const data = await res.json()
  setContacts([...contacts,data])
  navigate('/')
}
const handleChange = (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value})
}
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" value={formData.firstName} type="text" required onChange={handleChange}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" value={formData.lastName} required onChange={handleChange}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" value={formData.street} required onChange={handleChange}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" value={formData.city} required onChange={handleChange}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" value={formData.email} required onChange={handleChange}/>

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="url" value={formData.linkedIn} required onChange={handleChange}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="url" value={formData.twitter} required onChange={handleChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
