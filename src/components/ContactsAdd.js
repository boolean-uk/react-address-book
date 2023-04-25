import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import Form from './Form'

function ContactsAdd({ setContacts, contacts }) {
  const navigate = useNavigate()

  const create = async (e, formData) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3030/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    const contact = await res.json()

    setContacts([...contacts, contact])
    
    navigate('/')
  }

  return (
    <Form
      form={{}}
      buttonName='Create'
      submitForm={create}
    />
  )
}

export default ContactsAdd
