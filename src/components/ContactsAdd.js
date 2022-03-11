import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router"


function ContactsAdd(props) {
  const { setContacts, contacts } = props
  const navigate = useNavigate()
  const location = useLocation()
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    linkedin: "",
    twitter: "",
  })

  useEffect(() => {
    if(location.state) {
      const {contact} = location.state
      setAddressData(contact)
    }
  }, [location] )

  function handleSubmit(e) {
    e.preventDefault()
    if (addressData.id) {
      fetch(`http://localhost:4000/contacts/${addressData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      })
        .then((res) => res.json())
        .then((json) => {
          const editedAddress = contacts.map((contact) =>
            contact.id === json.id ? json : contact
          )
          setContacts(editedAddress)
          navigate("/")
        })
    } else {
      fetch("http://localhost:4000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Address created!", json)
          setContacts([...contacts, json])
          navigate(`/`)
        })
    }
  }

  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value })
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        value={addressData.firstName}
        name="firstName"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        value={addressData.lastName}
        name="lastName"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="street">Street:</label>
      <input
        id="street"
        value={addressData.street}
        name="street"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="city">City:</label>
      <input
        id="city"
        value={addressData.city}
        name="city"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={addressData.email}
        name="email"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        id="linkedin"
        value={addressData.linkedin}
        name="linkedin"
        type="text"
        onChange={handleChange}
      />
      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        value={addressData.twitter}
        name="twitter"
        type="text"
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
