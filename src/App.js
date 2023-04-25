import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsUpdate from "./components/ContactsUpdate"
import ContactsMeeting from "./components/ContactsMeeting"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:4000/contacts')
    .then(res => res.json())
    .then(data => setContacts(data))
    .then(() => {setIsLoading(false)})
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to={'/'}>Contacts List</Link></li>
          <li><Link to={'/contacts/add'}>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} isLoading={isLoading}/>} />
          <Route path='/contacts/:id' element={<ContactsView contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/add' element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/update/:id' element={<ContactsUpdate contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/:id/meetings' element={<ContactsMeeting />} />
        </Routes>
      </main>
    </>
  )
}
