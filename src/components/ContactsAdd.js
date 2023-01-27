import { useState } from "react"
import { useNavigate } from "react-router-dom";


function ContactsAdd(props) {
 const initialFormState = {
    firstName: "",
    lastName: "",
    street: "",
    city: ""
  }
const [ContactData, setContactData] = useState(initialFormState)
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const navigate = useNavigate()
  const { setContacts, contacts } = props
  
  function handleChange(event) {
    const inputName = event.target.name
    const inputValue = event.target.value
    const inputType = event.target.value

    if(inputName === "firstName"){
      
      setContactData({...ContactData, firstName: inputValue})
    }
    if(inputName === "lastName"){
      setContactData({...ContactData, lastName: inputValue})
    }
    if(inputName === "street"){
      setContactData({...ContactData, street: inputValue})
    }
    if(inputName === "city"){
      setContactData({...ContactData, city: inputValue})
    }
    console.log("the constactdata",ContactData)
  }
  function handleSubmit(event){
    event.preventDefault()
    
    fetch("http://localhost:4000/contacts",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ContactData)
      
    })
    .then((res) => res.json())
    .then((res) => {
      setContacts([...contacts, ContactData]);
      setContactData(initialFormState);
      navigate('/')
    })
        
  }
  //TODO: Implement controlled form
  //send POST to json server on form submit
  
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" value={ContactData.firstName} required onChange={handleChange}  />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" value={ContactData.lastName} required onChange={handleChange}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" value={ContactData.street} required onChange={handleChange}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" value={ContactData.city} required onChange={handleChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
