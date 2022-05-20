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

  // This populates the form if the location state is not undefined
  // with the contact object from the location.state object
  // and runs again when the location state is updated
  useEffect(() => {
    if(location.state) {
      console.log("this is location.state", location.state)
      const {contact} = location.state
      setAddressData(contact)
    }
  }, [location] )

  // The handleSubmit function now does a PATCH if the addressData is 
  // populated. This maps through the contacts array, checks if the 
  // ID matches, if it does it sets the value to the JSON returned by the
  // server, otherwise it sets it to whatever was there unaltered

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
          // Checks if the contact.id matches the returned object id creates 
          // a new array with the edited contact otherwise 
          // adds the non matching existing contact back in then sets the mapped array
          // using the setContacts function
          const editedAddress = contacts.map(contact =>
            contact.id === json.id ? json : contact
          )
          setContacts(editedAddress)
          navigate("/")
        })
    } else {

      // Here the fetch is called if the ID field is empty (and therefore the
      // rest of them will be too) and it POSTS the contents of the form 
      // to the server and sets the value of contacts to a copy of the old array
      // with the new data added
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
      // I trimmed a load out of here by replacing the if statements
      // with the e.target.name key in [] so that this is dynamic
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
