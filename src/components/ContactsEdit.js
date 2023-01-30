import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const initialFormState = {
  
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: "",
}


function ContactsEdit(props){
    const [formState, setFormState] = useState(initialFormState)
    const navigate = useNavigate()
    const { setContacts, contacts } = props
    const {id} = useParams()
    
    useEffect(() => {
      fetch(`http://localhost:4000/contacts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data from server",data)
      setFormState(data)
    })
  }, [])
    
    
    function handleChange(event) {
        const inputName = event.target.name
        const inputValue = event.target.value
        const inputType = event.target.value

        

        if(inputName === "firstName"){
          setFormState({...formState, firstName: inputValue})
        }
        if(inputName === "lastName"){
          setFormState({...formState, lastName: inputValue})
        }        
        if(inputName === "street"){
          setFormState({...formState, street: inputValue})
        }
        if(inputName === "city"){
          setFormState({...formState, city: inputValue})
        }
        if(inputName === "email"){
          setFormState({...formState, email: inputValue})
        }
        if(inputName === "linkedIn"){
          setFormState({...formState, linkedin: inputValue})
        }
        if(inputName === "twitter"){
          setFormState({...formState, twitter: inputValue})
        }
        console.log("the constactdata",formState)
      }
      console.log("this is props ",props)
      function handleSubmit(){
    
    }

    return (
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
    
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value={formState.firstName} required onChange={handleChange}  />
    
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" name="lastName" type="text" value={formState.lastName} required onChange={handleChange}/>
    
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formState.email}  onChange={handleChange} />
    
          <label htmlFor="linkedIn">LinkedIn</label>
          <input id="linkedIn" name="linkedIn" type="text" value={formState.linkedIn}  onChange={handleChange}/>
    
          <label htmlFor="twitter">Twitter</label>
          <input id="twitter" name="twitter" type="text" value={formState.twitter} onChange={handleChange} />
    
          <label htmlFor="street">Street:</label>
          <input id="street" name="street" type="text" value={formState.street} required onChange={handleChange}/>
    
          <label htmlFor="city">City:</label>
          <input id="city" name="city" type="text" value={formState.city} required onChange={handleChange}/>
    
          <div className="actions-section">
            <button className="button blue" type="submit">
              Create
            </button>
          </div>
        </form>
      )
}

export default ContactsEdit