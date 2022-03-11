import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { MutatingDots } from 'react-loader-spinner'
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import EditContact from "./components/EditContact"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState(null)

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    fetch(`http://localhost:4000/contacts`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
  }, [])

  if (!contacts) {
    return (<MutatingDots/>)
     
  }

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to="/">
            <li>Contacts List</li>
          </Link>
          <Link to="/contacts/add">
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd setContacts={setContacts} contacts={contacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/:id/edit"
            element={
              <EditContact setContacts={setContacts} contacts={contacts} />
            }
          />
        </Routes>
      </main>
    </>
  )
}
