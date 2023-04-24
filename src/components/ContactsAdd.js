import { useState } from "react"
import { useNavigate } from "react-router-dom";
import initialContact from "../initial";

function ContactsAdd(props) {

  const navigate = useNavigate()
  const [contact, setContact] = useState(initialContact)
  const { setContacts, contacts } = props // TODO: replace with getContacts()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:4000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      })

      const data = await response.json()
      setContacts([...contacts, data])
    } catch (err) {
      console.log(err)
    }
    setContact(initialContact)
    navigate('/')
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setContact({ ...contact, [name]: value })
  }


  return (
    <form onSubmit={handleSubmit} className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text"
        value={contact.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text"
        value={contact.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text"
        value={contact.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text"
        value={contact.city}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">E-mail:</label>
      <input id="email" name="email" type="email"
        value={contact.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="linkdin">LinkdIn:</label>
      <input id="linkdin" name="linkdin" type="text"
        value={contact.linkdin}
        onChange={handleChange}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text"
        value={contact.twitter}
        onChange={handleChange}
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
