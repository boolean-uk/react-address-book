import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from './components/ContactsEdit'
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
  }, [])

  console.log(contacts)

  return (
    <>
      <nav>
        <h2><Link to='/'>Menu</Link></h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contacts/add' element={<ContactsAdd contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contacts/:id/view' element={<ContactsView />} />
          <Route path='/contacts/id:/edit' element={<ContactsEdit contacts={contacts} setContacts={setContacts} />} />
        </Routes>
      </main>
    </>
  )
}
