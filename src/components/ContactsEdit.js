import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import Form from './Form'

function ContactsEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentFormData, setCurrentFormData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3030/contacts/${id}`)
      .then(res => res.json())
      .then(data => setCurrentFormData(data))
  }, [])
 
  const edit = async (e, formData) => {
    e.preventDefault()

    await fetch(`http://localhost:3030/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    navigate('/')
  }

  return (
    <Form
      form={currentFormData}
      buttonName='Edit'
      submitForm={edit}
    />
  )
}

export default ContactsEdit
