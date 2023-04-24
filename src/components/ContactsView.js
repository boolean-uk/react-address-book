import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import initialContact from "../initial"

function ContactsView({ getContacts }) {
  const navigate = useNavigate()
  const [isEditing, setEditing] = useState(false)
  const [editedContact, setEditedContact] = useState(initialContact)
  const [contact, setContact] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(data => { setContact(data); setEditedContact(data) })
  }, []) //contact


  if (!contact) {
    return <p>Loading</p>
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setEditedContact({ ...editedContact, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:4000/contacts/${contact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedContact),
      })

      const data = await response.json()
      setContact(editedContact)
      getContacts()
    } catch (e) {
      console.log(e)
    }
    setEditing(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/contacts/${contact.id}`, {
        method: 'DELETE'
      })
      getContacts();
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const viewTemplate = (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Address: {contact.street} {contact.city}</p>
      <p>E-mail: {contact.email}</p>
      <p>LinkdIn: {contact.linkdin}</p>
      <p>Twitter: {contact.twitter}</p>
      <button type="button" onClick={() => setEditing(true)}>Edit</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </div>
  )

  const editTemplate = (
    <div>
      <form action="post" onSubmit={handleSubmit}>
        <h2>
          <input type="text" name="firstName" value={editedContact.firstName} onChange={handleChange} />
          <input type="text" name="lastName" value={editedContact.lastName} onChange={handleChange} />
        </h2>
        <p>
          Street: <input type="text" name="street" value={editedContact.street} onChange={handleChange} />
          City: <input type="text" name="city" value={editedContact.city} onChange={handleChange} />
        </p>
        <p>E-mail: <input type="text" name="email" value={editedContact.email} onChange={handleChange} /></p>
        <p>LinkdIn: <input type="text" name="linkdin" value={editedContact.linkdin} onChange={handleChange} /></p>
        <p>Twitter: <input type="text" name="twitter" value={editedContact.twitter} onChange={handleChange} /></p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </div >
  )

  return (
    <div>
      {isEditing ? editTemplate : viewTemplate}
    </div>
  )
}

export default ContactsView