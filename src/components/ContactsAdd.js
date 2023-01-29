import { useState } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props
  const [contact, setContact] = useState(
    {
    firstName: "",
    lastName: "",
    street: "",
    city:""
  }
  )

  //TODO: Implement controlled form
  //send POST to json server on form submit
 const navigate = useNavigate()

 const handleSubmit = (event) => {
  event.preventDefault()

  const submit = {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(contact),
  }
  fetch("http://localhost:4000/contacts", submit)
    .then(setContacts([...contacts,contact]))
      .then((data) => console.log(data))
        
        console.log("ADD NEW CONTACT", setContacts)
      }
 

  // const newForm = {
  //   // id: newId,
  //   firstName: "",
  //   lastName: "",
  //   street: "",
  //   city: ""
  // }

  // const newId = contacts.length+1
  
  const handleChange = (event)=> {
    const inputValue = event.target.value
    const inputName = event.target.name

    if(inputName === "firstName"){
      setContact({...contact,firstName:inputValue})
    }
    if(inputName === "lastName"){
      setContact({...contact,lastName:inputValue})
    }
    if(inputName === "lastName"){
      setContact({...contact,lastName:inputValue})
    }
    if(inputName === "street"){
      setContact({...contact,street:inputValue})
    }
    if(inputName === "city"){
      setContact({...contact,city:inputValue})
    }
  }

 
 
  return (
    <form className="form-stack contact-form"  onSubmit = {handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" 
      name="firstName"
       type="text"
       value ={contact.firstName}
      onChange={handleChange} 
      required 
     />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName"
       name="lastName" 
       type="text"
       value ={contact.lastName}
      onChange={handleChange}  
      required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text"
       value ={contact.street}
       onChange={handleChange}  
        required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text"
      value ={contact.city}
      onChange={handleChange}
      required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
