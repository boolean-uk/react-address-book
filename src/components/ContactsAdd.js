import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd (props) {
  const navigate = useNavigate()
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [formData, setForm] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  })

  function handleChange (e) {
    const { name, value } = e.target
    setForm(x => {
      return {
        ...x,
        [name]: value
      }
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    console.log(formData)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    fetch('http://localhost:4000/contacts', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setContacts([...contacts, res])
        setForm({
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
  //TODO: Implement controlled form
  //send POST to json server on form submit

  return (
    <form className="form-stack contact-form" onSubmit={ handleSubmit }>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={ handleChange }
        value={ formData.firstName } required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={ handleChange }
        value={ formData.lastName } required />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={ handleChange }
        value={ formData.street } required />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={ handleChange }
        value={ formData.city } required />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={ handleChange }
        value={ formData.email } required />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="text" onChange={ handleChange }
        value={ formData.linkedIn } required />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={ handleChange }
        value={ formData.twitter } required />

      <div className="actions-section">
        <button className="button blue" type="submit" >
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
