import { useState } from "react"
import { useNavigate } from "react-router-dom";

const initalValues = {
  firstName: '',
  lastName: '',
  street: '',
  city: '',
}
let posting = false

function ContactsAdd(props) {

  const navigate = useNavigate()
  const { contacts, setContacts } = props
  const [formInfo, setformInfo] = useState(initalValues)

  const handelChange = (event) => {

    const key = event.target.name
    const value = event.target.value
    const changedInfo = {...formInfo}

    changedInfo[key] = value

    setformInfo(changedInfo)
  }

  const handelSubmit = (event) => {
    event.preventDefault()
    console.table('newContact', formInfo)
    postNewContact(formInfo)
    setformInfo(initalValues)
  }

  const postNewContact = (contact) => {
    if(!posting) {
      posting = true
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      }
      fetch(`http://localhost:4000/contacts`,options)
        .then(res=>res.json())
        .then(data=>setContacts([...contacts, data]))
        .then(posting = false)
        .then(navigate('/'))
    } else {
      console.log('Please wait for last POST to finish, try again in a few seconds')
    }
  }


  return (
    <form className="form-stack contact-form" onSubmit={handelSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={handelChange} value={formInfo.firstName} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={handelChange} value={formInfo.lastName} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={handelChange} value={formInfo.street} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={handelChange} value={formInfo.city} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
