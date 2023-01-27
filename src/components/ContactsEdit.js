import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ContactsEdit(props){
    const [contact, setContact] = useState(contacts)
    const navigate = useNavigate()
    const { setContacts, contacts } = props
    const {id} = useParams()
    function handleChange(event) {
        const inputName = event.target.name
        const inputValue = event.target.value
        const inputType = event.target.value
    
        if(inputName === "firstName"){
          
          setContact({...contact, firstName: inputValue})
        }
        if(inputName === "lastName"){
          setContact({...contact, lastName: inputValue})
        }
        if(inputName === "street"){
          setContact({...contact, street: inputValue})
        }
        if(inputName === "city"){
          setContact({...contact, city: inputValue})
        }
        if(inputName === "email"){
          setContact({...contact, email: inputValue})
        }
        if(inputName === "linkedIn"){
          setContact({...contact, linkedin: inputValue})
        }
        if(inputName === "twitter"){
          setContact({...contact, twitter: inputValue})
        }
        console.log("the constactdata",contact)
      }
      console.log(props)
      function handleSubmit(){
    
    }

    // return (
        // <form className="form-stack contact-form" onSubmit={handleSubmit}>
        //   <h2>Edit Contact</h2>
    
        //   <label htmlFor="firstName">First Name</label>
        //   <input id="firstName" name="firstName" type="text" value={contact.firstName} required onChange={handleChange}  />
    
        //   <label htmlFor="lastName">Last Name:</label>
        //   <input id="lastName" name="lastName" type="text" value={contact.lastName} required onChange={handleChange}/>
    
        //   <label htmlFor="email">Email</label>
        //   <input id="email" name="email" type="email" value={contact.email}  onChange={handleChange} />
    
        //   <label htmlFor="linkedIn">LinkedIn</label>
        //   <input id="linkedIn" name="linkedIn" type="text" value={contact.linkedin}  onChange={handleChange}/>
    
        //   <label htmlFor="twitter">Twitter</label>
        //   <input id="twitter" name="twitter" type="text" value={contact.twitter} onChange={handleChange} />
    
        //   <label htmlFor="street">Street:</label>
        //   <input id="street" name="street" type="text" value={contact.street} required onChange={handleChange}/>
    
        //   <label htmlFor="city">City:</label>
        //   <input id="city" name="city" type="text" value={contact.city} required onChange={handleChange}/>
    
        //   <div className="actions-section">
        //     <button className="button blue" type="submit">
        //       Create
        //     </button>
        //   </div>
        // </form>
    //   )
}

export default ContactsEdit