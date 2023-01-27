import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

const initialContactState = {
  firstName: "Jake",
  lastName: "Burdass",
  street: "BLAHBLAH Road",
  city: "HUD"
}

export default function App() {
  const [contacts, setContacts] = useState([initialContactState])
  
  // TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data)
      })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to="/">Contacts List</Link></li>
          <li><Link to="/contacts/add">Add Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: PUT ALL routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts}/>}/>
          <Route path="/contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>}/>
          <Route path={`/contacts/:id`} element={<ContactsView/>}/>
        </Routes>
      </main>
    </>
  )
}
