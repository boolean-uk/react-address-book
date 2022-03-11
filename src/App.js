import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactMeetings from "./components/ContactMeetings"
import ContactsEdit from "./components/ContactsEdit"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false) 
  
  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:4000/contacts`)
    .then(response => response.json())
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
          <li><Link to="/">Contacts List</Link></li>
          <li><Link to="/contacts/add">Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts} loading={loading} />}/>
          <Route path='/contacts/add' element={<ContactsAdd contacts={contacts} setContacts={setContacts} />}/>
          <Route path='/contacts/:id' element={<ContactsView />}/>
          <Route path='/contacts/:id/meetings' element={<ContactMeetings />}/>
          <Route path='/contacts/:id/edit' element={<ContactsEdit contacts={contacts} setContacts={setContacts} />}/>
        </Routes>
      </main>
    </>
  )
}
