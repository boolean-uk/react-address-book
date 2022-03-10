import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [counter,setCounter] = useState(0)
  
  useEffect(() => contacts && fetch("http://localhost:4000/contacts")
          .then(res => res.json())
          .then(json => setContacts(() => json))
          , [counter])

  return (
    <>
      <nav>
        <ContactsList contacts={contacts}/>
      </nav>
      <main>
        <Routes>
          <Route path="/">Nowt</Route>
          <Route path="/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts} setCounter={setCounter}/>}/>
          <Route path="/:id" element={<ContactsView/>}/>
        </Routes>
      </main>
    </>
  )
}
