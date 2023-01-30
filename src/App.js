import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import ContactsEdit from "./components/ContactsEdit"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  useEffect(() => {
    fetch(`http://localhost:4000/contacts`)
      .then(res=>res.json())
      .then(data=>setContacts(data))
  },[])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to={'/'}>
            <div>Contacts List</div>
          </Link>
          <Link to={'/contacts/add'}>
            <div>Add New Contact</div>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route 
            path={'/'}
            element={<ContactsList contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path={'/contacts/add'}
            element={<ContactsAdd contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path={'contacts/:id'}
            element={<ContactsView />}
          />
          <Route
            path={'contacts/:id/edit'}
            element={<ContactsEdit contacts={contacts} setContacts={setContacts} />}
          />
        </Routes>
      </main>
    </>
  )
}
