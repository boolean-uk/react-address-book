import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactEdit"
import Meetings from "./components/Meetings"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [sensor,setSensor] = useState(false)
  
  useEffect(() => contacts && fetch("http://localhost:4000/contacts")
          .then(res => res.json())
          .then(json => setContacts(() => json))
          , [sensor])

  return (
    <>
      <nav>
        <ContactsList contacts={contacts} setContacts={setContacts}/>
      </nav>
      <main>
        <Routes>
          <Route path="/">Nowt</Route>
          <Route path="/add" element={<ContactsAdd setSensor={setSensor}/>}/>
          <Route path="/:id" element={<ContactsView/>}/>
          <Route path="/:id/meetings" element={<Meetings/>}/>
          <Route path="/:id/edit" element={<ContactsEdit setSensor={setSensor}/>}/>
        </Routes>
      </main>
    </>
  )
}
