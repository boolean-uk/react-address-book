import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  //TODO: Implement controlled form
  //send POST to json server on form submit
  const formReset = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  }
  const [form, setForm] = useState(formReset)

  const inputs = (e) => {
    const formCopy = { ...form }
    //const formValues = ['firstName','lastName','street','city']

    if (e.target.id === 'firstName') {
      formCopy.firstName = e.target.value
      setForm(formCopy)
    }
    if (e.target.id === 'lastName') {
      formCopy.lastName = e.target.value
      setForm(formCopy)
    }
    if (e.target.id === 'street') {
      formCopy.street = e.target.value
      setForm(formCopy)
    }
    if (e.target.id === 'city') {
      formCopy.city = e.target.value
      setForm(formCopy)
    }
    if (e.target.id === 'email') {
      formCopy.email = e.target.value
      setForm(formCopy)
    }
    if (e.target.id === 'linkedIn') {
      formCopy.linkedIn = e.target.value
      setForm(formCopy)
    }
    if (e.target.id === 'twitter') {
      formCopy.twitter = e.target.value
      setForm(formCopy)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }
    fetch('http://localhost:4000/contacts', options)
      .then(res => res.json())
      .then(contacts => setForm(contacts))

    setForm(formReset)
  }

  return (
    <form className="form-stack contact-form" onSubmit={formSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input onChange={inputs} value={form.firstName}
        id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input onChange={inputs} value={form.lastName}
        id="lastName" name="lastName" type="text" required />

      <label htmlFor="street">Street:</label>
      <input onChange={inputs} value={form.street}
        id="street" name="street" type="text" required />

      <label htmlFor="city">City:</label>
      <input onChange={inputs} value={form.city}
        id="city" name="city" type="text" required />

      <label htmlFor="email">Email:</label>
      <input onChange={inputs} value={form.email}
        id="email" name="email" type="email" required />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input onChange={inputs} value={form.linkedIn}
        id="linkedIn" name="linkedIn" type="text" required />

      <label htmlFor="twitter">Twitter:</label>
      <input onChange={inputs} value={form.twitter}
        id="twitter" name="twitter" type="text" required />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
