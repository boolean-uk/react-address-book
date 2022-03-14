import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:4000/contacts")
    .then(res => res.json())
    .then(json => {
      setContacts(json)
      setLoading(false)
    })
  }, [])
  
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/">Show Contacts</Link></li>
          <li><Link to="/contacts/edit">Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts} loading={loading} />} />
          <Route path="/contacts/edit" element={<ContactsAdd contacts={contacts} setContacts={setContacts} />} />
          <Route path="/contacts/:id" element={<ContactsView  />} />
          <Route path="/contacts/:id/meetings" element={<MeetingsView />}
        </Routes>
      </main>
    </>
  )
}
