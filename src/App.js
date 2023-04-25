import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders
  
  useEffect(function() {
    fetch("http://localhost:4000/contacts")
      .then(res => res.json())
      .then(data => setContacts(data))
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to={'/'}>Contacts List</Link></li>
          <li><Link to={'/contacts/add'}>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          // two attributes and in element attribute two components (info from stateHook)
          // after the url / show the element of ContactsList
          // there needs to be a front page (index '/') so see it as a index of a book.
          // click the edit link you're opening a new form just like the contactAdd form. 
          // so copying the page with a new url
          <Route path='/' element={<ContactsList contacts={contacts} setContacts={setContacts}/>} />
          <Route path='/contacts/:id' element={<ContactsView />} />
          <Route path='/contacts/add' element={<ContactsAdd setContacts={setContacts} contacts={contacts} />} />
        </Routes>
      </main>
    </>
  )
}
