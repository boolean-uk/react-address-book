import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"

import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from './components/ContactsEdit'
import Meetings from './components/Meetings'
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      setLoading(false)
  }, [])

  console.log(contacts)

  return (
    <>
      <nav>
        <h2><Link to='/'>The not so <br /> <span>Yellow</span> Pages</Link></h2>
        <ul>
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts} loading={loading} />} />
          <Route path='/contacts/add' element={<ContactsAdd contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contacts/:id/view' element={<ContactsView loading={loading} />} />
          <Route path='/contacts/:id/edit' element={<ContactsEdit contacts={contacts} setContacts={setContacts} />} />
          <Route path='contacts/:id/meetings' element={<Meetings />} />
        </Routes>
      </main>
    </>
  )
}