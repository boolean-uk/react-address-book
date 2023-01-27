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
  // useEffect(() => {
  //   fetch("http://localhost:4000/contacts")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setContacts(data)
  //     })
  // }, [contacts])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to="/ContactList">Contacts List</Link></li>
          <li><Link to="/ContactAdd">Add Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: PUT ALL routes here  */}
          <Route path="/ContactList" element={<ContactsList contacts={contacts}/>}/>
          <Route path="/ContactAdd" element={<ContactsAdd contacts={contacts}/>}/>
          <Route path="/ContactView" element={<ContactsView/>}/>
        </Routes>
      </main>
    </>
  )
}
