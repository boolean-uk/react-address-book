import { useState, useEffect } from "react"
import { useNavigate, useParams  } from "react-router-dom"

function ContactsEdit(props) {
    const {contacts, setContacts} = props
    const params = useParams()
    const navigate = useNavigate()
   // const [contacts, setContacts] = useState({})
    const [formData, setFormData] = useState({
         firstName : '',
         lastName : '',
         street : '',
         city : '',
         email : '',
         linkedin : '',
         twitter: ''
     })

   

    //first we get the data from the from 
    useEffect(function() {
        fetch(`http://localhost:4000/contacts/${params.id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
     }, [])

  
   const handleChange = (event) => {
    setFormData({...formData, [event.target.name] : event.target.value})
   } //everytime there is a change added on the form

//    const updateTask = async (listId, value) => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`http://localhost:4000/contacts/${params.id}`, {
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData) })
    //we are making a request to json and getting all the data that is stored until now
    
    // .then(res => res.json())  //adding the new data into json
    // .then(updatedContact => {
    //     setContacts(prevContacts => {
    //     return prevContacts.map(contact =>{
    //         if (contact.id === updatedContact.id){
    //             return updatedContact
    //         }else {
    //             return contact
    //         }
    //     })   //     })
    await fetch("http://localhost:4000/contacts/")
    .then((res) => res.json())
    .then((data) => setContacts(data))
     navigate(`/contacts/${params.id}`)
}
    return (
       
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          
    
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" name="firstName" type="text" required onChange={handleChange}
          value = {formData.firstName}/>
    
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" name="lastName" type="text" required onChange={handleChange}
          value = {formData.lastName}/>
    
          <label htmlFor="street">Street:</label>
          <input id="street" name="street" type="text" required onChange={handleChange}
          value = {formData.street}/>
    
          <label htmlFor="city">City:</label>
          <input id="city" name="city" type="text" required onChange={handleChange}
          value = {formData.city}/>
    
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="text" required onChange={handleChange}
          value = {formData.email} />
    
          <label htmlFor="linkedin">LinkedIn:</label>
          <input id="linkedin" name="linkedin" type="text" required onChange={handleChange}
          value = {formData.linkedin} />
    
          <label htmlFor="twitter">Twitter:</label>
          <input id="twitter" name="twitter" type="text" reaquired onChange={handleChange}
          vale = {formData.twitter} />
    
    
          <div className="actions-section">
            <button className="button blue" type="submit">
              Update
            </button>
          </div>
        </form>
      )
}

export default ContactsEdit