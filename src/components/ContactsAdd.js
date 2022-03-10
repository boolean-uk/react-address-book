import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ContactsAdd({contacts, setContacts}) {

  const [addContactFormEmpty, setAddContactFormEmpty] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  })

  const [addContactForm, setAddContactForm] = useState(addContactFormEmpty)
  console.log(addContactForm)

  const onFirstNameChange = (event) => {
    setAddContactForm({...addContactForm, firstName: event.target.value})
  }

  const onLastNameChange = (event) => {
    setAddContactForm({...addContactForm, lastName: event.target.value})
  }

  const onStreetChange = (event) => {
    setAddContactForm({...addContactForm, street: event.target.value})
  }

  const onCityChange = (event) => {
    setAddContactForm({...addContactForm, city: event.target.value})
  }

  const onEmailChange = (event) => {
    setAddContactForm({...addContactForm, email: event.target.value})
  }

  const onLinkedInChange = (event) => {
    setAddContactForm({...addContactForm, linkedIn: event.target.value})
  }

  const onTwitterChange = (event) => {
    setAddContactForm({...addContactForm, twitter: event.target.value})
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: addContactForm.firstName,
        lastName: addContactForm.lastName,
        street: addContactForm.street,
        city: addContactForm.city,
        email: addContactForm.email,
        linkedIn: addContactForm.linkedIn,
        twitter: addContactForm.twitter
      })
    }

    fetch('http://localhost:4000/contacts', options)
    .then(response => response.json())
    .then(jsonResponse => {
      setContacts([...contacts, jsonResponse])
      setAddContactForm(addContactFormEmpty)
    })

  }

  //TODO: Implement controlled form
  //send POST to json server on form submit



  return (
    <form className='form-stack contact-form' onSubmit={onFormSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor='firstName'>First Name</label>
      <input id='firstName' name='firstName' type='text' onChange={onFirstNameChange} value={addContactForm.firstName} required />

      <label htmlFor='lastName'>Last Name</label>
      <input id='lastName' name='lastName' type='text' onChange={onLastNameChange} value={addContactForm.lastName} required/>

      <label htmlFor='street'>Street</label>
      <input id='street' name='street' type='text' onChange={onStreetChange} value={addContactForm.street} required/>

      <label htmlFor='city'>City</label>
      <input id='city' name='city' type='text' onChange={onCityChange} value={addContactForm.city} required/>

      <label htmlFor='email'>Email</label>
      <input id='email' name='email' type='text' onChange={onEmailChange} value={addContactForm.email} required/>

      <label htmlFor='linkedIn'>LinkedIn</label>
      <input id='linkedIn' name='linkedIn' type='text' onChange={onLinkedInChange} value={addContactForm.linkedIn}/>

      <label htmlFor='twitter'>Twitter</label>
      <input id='twitter' name='twitter' type='text' onChange={onTwitterChange} value={addContactForm.twitter}/>

      <div className='actions-section'>
        <button className='button blue' type='submit'>
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
