import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  let navigate=useNavigate()

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  //TODO: Implement controlled form
  //send POST to json server on form submit

  //Right here, I am initializing the firstName, lastName, street and city to a blank columm

const [firstName, setFirstName]=useState('')
const [lastName, setLastName]=useState('')
const [street, setStreet]=useState('')
const [city, setCity]=useState('')
const [email, setEmail]=useState('')
const [linkedin, setLinkedin]=useState('')
const [twitter, setTwitter]=useState('')

//I am writing what should be implemented after a submit button has been clicked in the onSubmit function.
function onSubmit(event) {
event.preventDefault()
console.log(firstName, lastName, street, city, email, linkedin, twitter)

const options = {
  method:'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    firstName:firstName,
    lastName:lastName,
    street:street,
    city:city,
    email:email,
    linkedin:linkedin,
    twitter:twitter
  }),
}



fetch('http://localhost:4000/contacts', options)
.then((res)=>res.json())
.then ((json) =>{
  navigate('/')
  console.log('contacts created', json)
  setContacts([...contacts, json])

  //Right here, I am reseting the below updated state value after it has been clicked.
  setFirstName('')
  setLastName('')
  setStreet('')
  setCity('')
  setEmail('')
  setLinkedin('')
  setTwitter('')


})

}

//setting up a function for the event target
function onFirstNameChange(event){
  setFirstName(event.target.value)
}

function onLastNameChange(event){
  setLastName(event.target.value)
}

function onStreetChange(event){
  setStreet(event.target.value)
}

function onCityChange(event){
  setCity(event.target.value)
}

function onEmailChange(event){
  setEmail(event.target.value)
}

function onLinkedinChange(event){
  setLinkedin(event.target.value)
}

function onTwitterChange(event){
  setTwitter(event.target.value)
}




  return (
    <form className="form-stack contact-form" onSubmit={onSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input onChange={onFirstNameChange} value={firstName}
      id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input onChange={onLastNameChange} value={lastName}
      id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input onChange={onStreetChange} value={street}
      id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input onChange={onCityChange} value={city}
      id="city" name="city" type="text" required/>

      <label htmlFor='email'>Email:</label>
      <input onChange={onEmailChange} value={email}
      id='email' name='email' type='text' require/>

<label htmlFor='linkedin'>Linkedin:</label>
      <input onChange={onLinkedinChange} value={linkedin}
      id='linkedin' name='linkedin' type='text' require/>

<label htmlFor='twitter'>Twitter:</label>
      <input onChange={onTwitterChange} value={twitter}
      id='twitter' name='twitter' type='text' require/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
