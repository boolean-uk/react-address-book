import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

let posting = false

const ContactsEdit = (props) => {

    const { contacts, setContacts } = props
    const [contact, setContact] = useState(null)
    const [formInfo, setFormInfo] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      fetch(`http://localhost:4000/contacts/${id}`)
        .then(res=>res.json())
        .then(data=>{setContact(data); setFormInfo(data)})
    },[id])

    const handelChange = (event) => {

        const key = event.target.name
        const value = event.target.value
        const changedInfo = {...formInfo}
    
        changedInfo[key] = value
    
        setFormInfo(changedInfo)
    }

    const handelSubmit = (event) => {
        event.preventDefault()
        console.table('newContact', formInfo)
        postNewContact(formInfo)
    }

    const postNewContact = (contact) => {
        if(!posting) {
          posting = true

          const options = {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
          }

          fetch(`http://localhost:4000/contacts/${id}`,options)
            .then(res=>res.json())
            .then(data=>{
                const updatedContacts = [...contacts]
                const replaceIndex = updatedContacts.findIndex(contact=> contact.id == id)
                updatedContacts.splice(replaceIndex,1,data)
                setContacts(updatedContacts)
            })
            .then(posting = false)
            .then(navigate('/'))
            
        } else {
          console.log('Please wait for last PATCH to finish, try again in a few seconds')
        }
    }

    if (!contact) {
        return <p>Loading...</p>
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

            <label htmlFor="email">Email:</label>
            <input id='email' name="email" type="email" onChange={handelChange} value={formInfo.email} required/>

            <label htmlFor="linkedIn">LinkedIn:</label>
            <input id='linkedIn' name="linkedIn" type='text' onChange={handelChange} value={formInfo.linkedIn} required/>

            <label htmlFor="twitter">Twitter:</label>
            <input id='twitter' name="twitter" type='text' onChange={handelChange} value={formInfo.twitter} required/>

            <div className="actions-section">
                <button className="button blue" type="submit">
                    Create
                </button>
            </div>
        </form>
    )
}

export default ContactsEdit