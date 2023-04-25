import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import "./styles/styles.css"
import Spinner from "./components/Spinner"

export default function App() {
  const [contacts, setContacts] = useState([])

  const [spinner, setSpinner] = useState(true)

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(function() {
    fetch("http://localhost:4000/contacts")
      .then(res => res.json())
      .then(data => {
        setSpinner(false)
        setContacts(data)
      })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to='/'>Contacts List</Link> </li>
          <li><Link to="/contacts/add">Add New Contact</Link></li>

        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path='/' element={spinner?<Spinner/>:<ContactsList contacts={contacts} setContacts={setContacts} />} />
          <Route path='/contacts/:id' element={<ContactsView />} />
          <Route path='/contacts/add' element={<ContactsAdd setContacts={setContacts} contacts={contacts}/>} />
          <Route path='/contacts/:id/edit' element={<ContactsEdit setContacts={setContacts} contacts={contacts}/>} />

        </Routes>
      </main>
    </>
  )
}
