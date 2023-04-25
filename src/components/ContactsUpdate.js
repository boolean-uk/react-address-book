import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


function ContactsUpdate({ setContacts, contacts }) {
  const navigate = useNavigate()
  const params = useParams()
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state

  const [contact , setContact] = useState({
    firstName: contacts[params.id -1 ].firstName,
    lastName: contacts[params.id-1].lastName,
    street: contacts[params.id-1].street,
    city: contacts[params.id-1].city,
    email: contacts[params.id-1].email,
    linkedin: contacts[params.id-1].linkedin,
    twitter: contacts[params.id-1].twitter
  })
console.log(params.id);

//   console.log(contacts);
  //TODO: Implement controlled form
  //send POST to json server on form submit
  // updates and handles the new conctact set when we type
  const handleChange = (e) =>{
    const {name,value,text} = e.target
    setContact({...contact, [name]: value})

  }

  // creating the addContact func that executes onSybmit
  // it makes a post req nad creates new contact with the contact that is typed
  const updateContact = async(e) =>{
    e.preventDefault()
    const update = await fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })

    const updateContact = await update.json()
    const updatedContacts = contacts.map(contact => {
        if (contact.id === params.id) {
          return updateContact
        }
        return contact
      })
      setContacts(updatedContacts)
    
    // setContacts([...contacts, data])
    navigate("/")



  }

  return (
    <form className="form-stack contact-form" onSubmit={updateContact}>
      {/* {console.log(contact)} */}
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required  onChange={handleChange}  value={contact.firstName}/>

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required onChange={handleChange} value={contact.lastName}/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required onChange={handleChange} value={contact.street}/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required onChange={handleChange} value={contact.city}/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required onChange={handleChange} value={contact.email}/>

      <label htmlFor="linkedin">LinkedIn:</label>
      <input id="linkedin" name="linkedin" type="text"  onChange={handleChange} value={contact.linkedin}/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text"  onChange={handleChange} value={contact.twitter}/>

      

      <div className="actions-section">
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
  )
}

export default ContactsUpdate
