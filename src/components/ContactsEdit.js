import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

const initialFormState = {
    id: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: "",
}

function ContactsEdit(props) {
    const [formState, setFormState] = useState(initialFormState)

    const { setContacts, contacts } = props
    const navigate = useNavigate()
    const contactID = useParams()


  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${contactID.id}`)
    .then((res)  => res.json())
    .then((data) => {
        console.log("Fetching contact...")
        setFormState(data)
    })
  }, [contactID])

    const handleChange = (event) => {
        const value = event.target.value;
        // const type = event.target.type;
        const name = event.target.name;
        // const checked = event.target.checked;

        // console.log("HandleChange", value, type, name, checked)

        const newFormState = {...formState}
        if(name === "firstName"){
            newFormState.firstName = value
        }
        if(name === "lastName"){
            newFormState.lastName = value
        }
        if(name === "street") {
            newFormState.street = value
        }
        if(name === "city") {
            newFormState.city = value
        }
        if(name === "email") {
            newFormState.email = value
        }
        if(name === "linkedin") {
            newFormState.linkedin = value
        }
        if(name === "twitter") {
            newFormState.twitter = value
        }
        setFormState(newFormState)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Form Submitted")
        const editContact = formState
        const editContactJson = JSON.stringify(editContact)

        const options = {
            method: "PATCH",
            body: editContactJson,
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(`http://localhost:4000/contacts/${contactID.id}`, options)
        .then((res) => res.json())
        .then((data) => {
            console.log("Edited contact:", data)
            
            fetch("http://localhost:4000/contacts/")
            .then((res) => res.json())
            .then((data) => {
                setContacts(data)
            })
        })
        // setContacts([...contacts, formState])
        event.target.reset()
        navigate('/')

    }


    return (
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>

        <label htmlFor="firstName">First Name</label>
        <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            required  
            onChange={handleChange}
            value={formState.firstName}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input 
            id="lastName" 
            name="lastName" 
            type="text" required 
            onChange={handleChange}
            value={formState.lastName}
        />

        <label htmlFor="street">Street:</label>
        <input 
            id="street" 
            name="street" 
            type="text" 
            required 
            onChange={handleChange}
            value={formState.street}
        />

        <label htmlFor="city">City:</label>
        <input 
            id="city" 
            name="city" 
            type="text" 
            required 
            onChange={handleChange}
            value={formState.city}
        />

        <label htmlFor="email">Email:</label>
        <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            onChange={handleChange}
            value={formState.email}
        />

        <label htmlFor="linkedin">LinkedIn:</label>
        <input 
            id="linkedin" 
            name="linkedin" 
            type="text" 
            required 
            onChange={handleChange}
            value={formState.linkedin}
        />

        <label htmlFor="twitter">Twitter:</label>
        <input 
            id="twitter" 
            name="twitter" 
            type="text" 
            required 
            onChange={handleChange}
            value={formState.twitter}
        />



        <div className="actions-section">
            <button className="button blue" type="submit">
            Edit
            </button>
        </div>
        </form>
    )
}

export default ContactsEdit
