import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  useEffect(function() {
    fetch("http://localhost:3030/contacts")
    .then(res => res.json())
    .then(data => setContacts(data))
  }, [])

  const deleteContact = async (contactId) => {
    await fetch(`http://localhost:3030/contacts/${contactId}`, {
      method: "DELETE"
    })

    const deletedContacts = contacts.filter(item => item.id !== contactId)
    setContacts(deletedContacts)
  }

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to={'/'}>
            <li>Contacts List</li>
          </Link>
          <Link to={'/contacts/add'}>
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} deleteContact={deleteContact}/>} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/add" element={<ContactsAdd setContacts={setContacts} contacts={contacts} />}/>
        </Routes>
      </main>
    </>
  )
}
