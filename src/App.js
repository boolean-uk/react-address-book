import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from './components/ContactsEdit'
import ContactsDelete from './components/ContactsDelete'
import ContactsMeeting from './components/ContactsMeeting'
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])

  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(response => response.json())
      .then(response => {
        console.log("Byeeee")
        console.log(response)
        setContacts(response)
      })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to='/'>Contacts List</Link>
          </li>
          <li>
            <Link to='/contact/add'>Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} />} />
          <Route path='/contact/add' element={< ContactsAdd contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contact/:id' element={< ContactsView />} />
          <Route path='/contact/:id/edit' element={< ContactsEdit contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contact/:id/delete' element={< ContactsDelete contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contact/:id/meeting' element={< ContactsMeeting contacts={contacts} setContacts={setContacts} />} />
        </Routes>
      </main>
    </>
  )
}
