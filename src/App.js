import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import ContactsEdit from "./components/ContactsEdit"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [update, setupdate] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(contacts => setContacts(contacts))
  }, [])

  console.log('main render', contacts)
  console.log('update', update)

  // Re-renders page when contacts edited or deleted
  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(contacts => setContacts(contacts))
  }, [update])


  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to='/'>  Contacts List</Link>
          </li>
          <li>
            <Link to='/contacts/add'>  Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} />} />
          <Route path='/contacts/add' element={<ContactsAdd contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contacts/:id' element={<ContactsView />} />
          <Route path='/contacts/:id/edit' element={<ContactsEdit update={update} setupdate={setupdate} />} />
        </Routes>
      </main>
    </>
  )
}
