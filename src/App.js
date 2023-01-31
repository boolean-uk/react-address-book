import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import ContactsMeetings from "./components/ContactsMeetings"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  // Loading state for my loading/spinner extension.
  const [loading, setLoading] = useState(false)
  
  
  //Load all contacts on useEffect when component first renders
  useEffect(() => {
    // Set loading to true... so spinner starts spinning!!!
    setLoading(true)
    fetch("http://localhost:4000/contacts")
    .then((res) => res.json())
    .then((data) => {
        setContacts(data)
        // Fetch request done... spinner can stop spinning. Did we receive any contacts?
        setLoading(false)
    })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* Links to Contacts List and Add Contact */}
          <li><Link to={`/`}>Contacts List</Link></li>
          <li><Link to={`/contacts/add`}>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        
        <Routes>
          {/* Routes for some of the components.  */}
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts} loading={loading}/>}/>
          <Route path='/contacts/add' element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>}/>
          <Route path='/contacts/view/:id' element={<ContactsView contacts={contacts} setContacts={setContacts}/>}/>
          <Route path='/contacts/edit/:id' element={<ContactsEdit contacts={contacts} setContacts={setContacts}/>}/>
          <Route path='/contacts/:id/meetings' element={<ContactsMeetings />}/>
        </Routes>
      </main>
    </>
  )
}
