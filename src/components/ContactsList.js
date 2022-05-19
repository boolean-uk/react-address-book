import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, isPending } = props
  const [activeFilter, setActiveFilter] = useState({})

  const handleDelete = (id) => {
    const opts = { method: "DELETE" }
    fetch(`http://localhost:4000/contacts/${id}`, opts)

    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
  }

  const handleFilterChange = (e) => {
    const filter = e.target.value
    setActiveFilter({...activeFilter, type: filter})
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
        <select id="filters" name="filters" onChange={handleFilterChange} >
          <option value="">All contacts</option>
          <option value="personal">Personal</option>
          <option value="work">work</option>
        </select>
      </header>
      {isPending && <CircularProgress />}
      {contacts && contacts.length === 0 && <span>No contacts...</span>}
      {contacts && <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, contactType } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {contactType === 'personal' ? <>&#127867;</> : <>&#128188;</>} {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>
                  View
                </Link>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </p>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default ContactsList
