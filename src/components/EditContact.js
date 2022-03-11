import React from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"

export default function EditContact(props) {
    const [contactEdit, setContactEdit] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const {setContacts, contacts} = props


    useEffect(() => {
        fetch(`http://localhost:4000/contacts/${params.id}`)
        .then((res) => res.json())
        .then((data) => setContactEdit(data))
      }, [params])


function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    setContactEdit({...contactEdit, [name]: value})
}

console.log(contactEdit)

function handelSubmit(event) {
    event.preventDefault()

    const options = {
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
              firstName: contactEdit.firstName,
              lastName: contactEdit.lastName,
              street: contactEdit.street,
              city: contactEdit.city,
              contact: contactEdit.contact,
              contactDetails: contactEdit.contactDetails,
          })
    }

    fetch(`http://localhost:4000/contacts/${params.id}`, options)
    .then(function (response) {
        return response.json()
    }).then(function(json) {
        console.log("Updated:", json)
        const contactArr = [...contacts]
        for(let i=0; i<contactArr.length; i++) {
            if(contactArr[i].id === json.id) {
                contactArr.splice(i,1,json)
            }
        }
        setContacts(contactArr)
    })
    navigate("/")
}

    
  return (
    <form className="form-stack contact-form" onSubmit={handelSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={contactEdit.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={contactEdit.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={contactEdit.street}
        onChange={handleChange}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={contactEdit.city}
        onChange={handleChange}
        required
      />

      <label>
        Choose Method of Contact
        <select
          id="contact"
          name="contact"
          type="radio"
          onChange={handleChange}
          required
        >
          <option >Email</option>
          <option >LinkedIn</option>
          <option >Twitter</option>
        </select>
      </label>

      <label htmlFor="contactDetails">{contactEdit.contact}</label>
      <input
        id="contactDetails"
        name="contactDetails"
        type={contactEdit.contact}
        value={contactEdit.contactDetails}
        onChange={handleChange}
        required
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  )
}
 
