import { useEffect, useState } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
    const location = useLocation()
  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    fetch("http://localhost:4000/contacts")
    .then((response) => response.json())
    .then((data) => {
      console.log("data from server",data)
      setContacts(data)
    })
  }, [])
  console.log("this is contacts",contacts)
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          
          <li><Link to={`/`} >Contacts List</Link></li>
          <li><Link to={`/contacts/add`}>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/contacts/:id" element={<ContactsView  />}></Route>
          <Route path="/" element={<ContactsList contacts={contacts} />}></Route>
          <Route path="/contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts} />}></Route>
        </Routes>
      </main>
    </>
  )
}
