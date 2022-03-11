import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"


function ContactsEdit(props) {

 let navigate = useNavigate()
  const params = useParams()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  })

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(response => response.json())
      .then(response => {
        setFormData(response)
      })
  }, [])

  const { setContacts } = props

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(preVal => {
      return { ...preVal, [name]: value }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log("this is formData:", formData)

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(`http://localhost:4000/contacts/${params.id}`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setContacts(preVal => preVal.map(contact => contact.id === params.id ? response : contact))
      setFormData({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        email: '',
        linkedIn: '',
        twitter: ''
      })
      navigate('/')
      
    })
  }

  return (
    <form onSubmit={handleSubmit}
      className="form-stack contact-form">
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text"
        onChange={handleChange} value={formData.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text"
        onChange={handleChange} value={formData.lastName} required />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text"
        onChange={handleChange} value={formData.street} required />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text"
        onChange={handleChange} value={formData.city} required />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="text"
        onChange={handleChange} value={formData.email} required />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="text"
        onChange={handleChange} value={formData.linkedIn} required />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text"
        onChange={handleChange} value={formData.twitter} required />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit