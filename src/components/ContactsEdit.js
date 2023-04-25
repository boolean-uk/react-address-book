import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ContactsEdit ({contacts, setContacts}) {
    const navigate = useNavigate()
    const params = useParams()

    const filteredContact = contacts.find(item => params.id == item.id)
    const [contact, setContact] = useState(filteredContact)

    const handleChange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
            const res = await fetch(`http://localhost:4000/contacts/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            })
        const data = await res.json()
        setContact(data)
        setContacts(...contacts, contact)
        navigate('/')
        window.location.reload()
    }


    return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name:</label>
      <input id="firstName" name="firstName" type="text" required onChange={handleChange} value={contact.firstName}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={contact.lastName}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange} value={contact.street}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange} value={contact.city}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={handleChange} value={contact.email}/>

      <label htmlFor="linkedin">Linkedin:</label>
      <input id="linkedin" name="linkedin" type="text" onChange={handleChange} value={contact.linkedin}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={handleChange} value={contact.twitter}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Confirm Changes
        </button>
      </div>
    </form>
    )
}