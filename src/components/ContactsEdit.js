import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const initialFormState = {
    id: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedIn: "",
    twitter: ""
}

export default function ContactsEdit(props) {

    const { setContacts, contacts } = props

    const [editContact, setEditContact] = useState(initialFormState)
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:4000/contacts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("updated:", data)
                setEditContact(data)
            })
    }, [])


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const newFormState = { ...editContact }
        if (name === "firstName") {
            newFormState.firstName = value
        }

        if (name === "lastName") {
            newFormState.lastName = value
        }

        if (name === "street") {
            newFormState.street = value
        }

        if (name === "city") {
            newFormState.city = value
        }

        if (name === "email") {
            newFormState.email = value
        }

        if (name === "linkedIn") {
            newFormState.linkedIn = value
        }

        if (name === "twitter") {
            newFormState.twitter = value
        }
        setEditContact(newFormState)
       
    };


    const handleSubmit = (event) => {
        event.preventDefault();
         console.log("Form changed")

         const changeDetail = editContact
         const changeDetailJson = JSON.stringify(changeDetail)
         console.log("json", changeDetailJson)
     
         const options = {
             method: "PATCH",
             body: changeDetailJson,
             headers: {
                 "Content-Type": "application/json",
             },
         }
         fetch(`http://localhost:4000/contacts/${id}`, options)
         .then((res) => res.json())
         .then((data) => {
             console.log("Updated  Contact", data)
     
             fetch("http://localhost:4000/contacts")
             .then((res) => res.json())
             .then((data) => {
               setEditContact(data)
             })
         })
         
         event.target.reset()
         navigate('/')
     
    }






    return (
        
            <form className="form-stack contact-form" onSubmit={handleSubmit}>
                <h2>Edit Contact</h2>

                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" required onChange={handleChange} value={editContact.firstName} />

                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={editContact.lastName} />

                <label htmlFor="street">Street:</label>
                <input id="street" name="street" type="text" required onChange={handleChange} value={editContact.street} />

                <label htmlFor="city">City:</label>
                <input id="city" name="city" type="text" required onChange={handleChange} value={editContact.city} />

                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required onChange={handleChange} value={editContact.email} />

                <label htmlFor="linkedIn">LinkedIn:</label>
                <input id="linkedIn" name="linkedIn" type="text" required onChange={handleChange} value={editContact.linkedIn} />

                <label htmlFor="twitter">Twitter:</label>
                <input id="twitter" name="twitter" type="text" required onChange={handleChange} value={editContact.twitter} />

                <div className="actions-section">
                    <button className="button blue" type="submit">
                        Edit
                    </button>
                </div>
            </form>
        
    )
}

