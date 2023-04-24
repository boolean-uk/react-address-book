import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

function ContactsEdit(props) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: ''
  })
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const params = useParams()

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const handleSubmit = async (e) => {
    e.preventDefault
    const res =fetch(`http://localhost:4000/contacts/${params.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    const updateContacts = contacts.map (item => {
        if (item.id === params.id){
            item = data
            console.log("ok")
        }
        return item
    })
    setContacts([updateContacts])
    Navigate('/')
    const form = document.querySelector(".form-stack contact-form")
    // form.reset()
    // console.log(contacts)
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handleChange} value = {formData.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handleChange} value = {formData.lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handleChange}  value = {formData.street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handleChange}  value = {formData.city} required/>

      <div className="actions-section">
        <button className="button blue" type="submit" >
          Apply
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit