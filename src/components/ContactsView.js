import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

function ContactsView({contacts, setContacts}) {
  const navigate = useNavigate()
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city:'',
    email: '',
    linkedIn: '',
    twitter: ''
  })

  const params = useParams()
  console.log(contact)
  //console.log(params)

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(res => res.json())
    .then(data => setContact(data))
  }, [])

  const handleDelete = async () => {
    await fetch(`http://localhost:4000/contacts/${params.id}`, {
      method: 'DELETE'
    })
    
    await fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
    
    navigate('/')
  }

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Street: {contact.street}</p>
      <p>City: {contact.city}</p>
      <p>Email: {contact.email}</p>
      <p>LinkedIn: {contact.linkedIn}</p>
      <p>Twitter: {contact.twitter}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={'/'}>
        <button>
          Go Back
        </button>
      </Link>
    </div>
  )
}

export default ContactsView