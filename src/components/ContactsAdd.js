import { useState } from "react"
import { useNavigate } from "react-router-dom";
const initialState = {
  firstName :'',
  lastName:'',
  street:'',
  city:'',
  email:'',
  linkedin:'',
  twitter:''
}

function ContactsAdd(props) {
  const [formData,setFormData] = useState(initialState)
  const navigate = useNavigate()
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const handleSubmit = async(e) =>{
      e.preventDefault()
      const res = fetch("http://localhost:3030/contacts/",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      //i am already doing the update in the update function
      // navigate('/') can do this, gonna troubleshoot
      // const data = await res.json()
      setContacts([...contacts, formData])
      navigate('/')
    }
  
  //TODO: Implement controlled form
  //send POST to json server on form submit
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name ]: [e.target.value]})
  }
  return (
<form className="form-stack contact-form" onSubmit = {handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input value = {formData.firstName} onChange = {handleChange}id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input value = {formData.lastName} onChange = {handleChange} id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input value = {formData.street} onChange = {handleChange} id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input value = {formData.city} onChange = {handleChange} id="city" name="city" type="text" required/>
      
      <label htmlFor="email">Email:</label>
      <input value = {formData.email} onChange = {handleChange} id="email" name="email" type="text"/>
      
      <label htmlFor="linkedin">LinkedIn:</label>
      <input value = {formData.linkedin} onChange = {handleChange} id="linkedin" name="linkedin" type="text" />
      
      <label htmlFor="twitter">Twitter:</label>
      <input value = {formData.twitter} onChange = {handleChange} id="twitter" name="twitter" type="text" />


      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )

}
export default ContactsAdd
