import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const initialFormState = {
  id: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
};

function ContactsAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const navigate=useNavigate()

  //TODO: Implement controlled form
  //send POST to json server on form submit

  return (
    <form className="form-stack contact-form">
      <h2>Create Contact</h2>

      const handleChange=(event)=>{
      const value=event.target.value;
      const name=event.target.name;
      const newFormState={...formState}
      if (name==="firstName"){
        newFormState.firstName=value
      }
      if(name==="lastName"){
        newFormState.lastName=value
      }
      if(name==="street"){
        newFormState.street=value
      }
      if(name==="city"){
        newFormState.city=value
      }
      setFormState(newFormState)
      }
  


    const handleSubmit = (event) => {
        event.preventDefault()
      console.log("Form Submitted")
       const newContact = formState
      const newContactJson = JSON.stringify(newContact)
      

     const options = {
      method: "POST",
      body: newContactJson,
      headers: {
        "Content-Type": "application/json",
      },
    }
    fetch("http://localhost:4000/contacts", options)
      .then((res) => res.json())
      .then((data) => {
        console.log("Created New Contact", data)

        fetch("http://localhost:4000/contacts")
          .then((res) => res.json())
          .then((data) => {
            setContacts(data)
          })
      })
         navigate("/")
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
    <h2>Create Contact</h2>
  
    <label htmlFor="firstName">First Name</label>
    <input id="firstName" name="firstName" type="text" required  onChange={handleChange}/>
  
    <label htmlFor="lastName">Last Name:</label>
    <input id="lastName" name="lastName" type="text" required onChange={handleChange}/>
  
    <label htmlFor="street">Street:</label>
    <input id="street" name="street" type="text" required onChange={handleChange}/>   
    <label htmlFor="city">City:</label>
  <input id="city" name="city" type="text" required onChange={handleChange}/>

    <div className="actions-section">
      <button className="button blue" type="submit">
        Create
      </button>
    </div>
  </form>

)
}
  

  

export default ContactsAdd;
