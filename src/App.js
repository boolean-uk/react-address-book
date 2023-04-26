import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import Meetings from "./components/Meetings"

export default function App() {
  const [contacts, setContacts] = useState([])

  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch('http://localhost:4040/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>

          <li><Link className="nav-element" to={'/'}>Contacts List</Link></li>

          <li><Link className="nav-element" to={'/contacts/add'}>Add New Contact</Link></li>

        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts} />} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts} />} />
          <Route path="/contact/:id/meetings" element={<Meetings />} />
        </Routes>
      </main>
    </>
  )
}