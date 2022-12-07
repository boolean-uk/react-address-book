import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props

  //TODO: Implement controlled form, with state being declared as first argument and function as the second. 
  //Usestate is given empty strings.
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")

  //consoling logging all the states to see if the display in console
  console.log(firstName, lastName, street, city)
  //send POST to json server on form submit

  //delcaring a function called submitButton which will be used for my submit button and is given an event as a parameter
  function submitButton(event) {
    //this stops the page refreshing/resetting when submit button is clicked
   event.preventDefault() 

   //create an object with keys called method explaining what method is being used e.g. post, patch, put, delete.
   // headers is a key also that has an obiect inside of it desctibing the content type being used.
    const options = {
      method: 'POST',
      headers: {
        'Content-Type' :  'application/json'
      },
      //in the body json.stringify is used which converts objects to json strings. Here the keys are given the same name as the name of 
      //the states.
      body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      street: street,
      city: city
      })
    }
  
    //Run the fetch request to add a new contact on the server
    //pass in the options object from above
    fetch("http://localhost:4000/contacts", options)
    //response converted to json
    .then(resp => resp.json())
    .then(json => {
       //json then console logged to check its value as well as being used to update the state.
      console.log(json)
      // Update the contacts state with the new object returned from the server.
      setContacts([...contacts, json])

      //Reset the form
      setFirstName("")
      setLastName("")
      setStreet("")
      setCity("")
    }) 
  }  

  //Change event handlers for each of the form fields
  //When the fields are changed by the user update the state

  function onFirstNameChanged(event) {
    setFirstName(event.target.value)
  }

  function onLastNameChanged(event) {
    setLastName(event.target.value)
  }

  function onStreetChanged(event) {
    setStreet(event.target.value)
  }

  function onCityChanged(event) {
    setCity(event.target.value)
  }

  return (
    //onSubmit event listener added to call submtiButton
    <form className="form-stack contact-form" onSubmit={submitButton}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
       //onChange event listener added to call function, value is used to call the state
       onChange={onFirstNameChanged} value={firstName} id="firstName" name="firstName" type="text" required 
      />

      <label htmlFor="lastName">Last Name:</label>
      <input 
       //onChange event listener added to call function, value is used to call the state
       onChange={onLastNameChanged} value={lastName}id="lastName" name="lastName" type="text" required
      />

      <label htmlFor="street">Street:</label>
      <input
       //onChange event listener added to call function, value is used to call the state
       onChange={onStreetChanged} value={street} id="street" name="street" type="text" required
       />

      <label htmlFor="city">City:</label>
      <input
       //onChange event listener added to call function, value is used to call the state 
       onChange={onCityChanged} value={city} id="city" name="city" type="text" required
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
