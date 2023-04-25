import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import ContactsDelete from "./components/ContactsDelete"
import Meetings from "./components/Meetings"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])

  useEffect(function() {
    fetch("http://localhost:4000/contacts")
      .then(res => res.json())
      .then(data => setContacts(data))
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/:id' element={<ContactsView />} />
          <Route path='/contacts/add/' element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/edit/:id' element={<ContactsEdit contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/delete/:id' element={<ContactsDelete contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/:id/meetings/' element={<Meetings />} />
        </Routes>
      </main>
    </>
  )
}
