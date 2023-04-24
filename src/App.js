import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(function () {
    getContacts()
  }, [])

  const getContacts = () => {
    setIsLoading(true)
    try {
      fetch("http://localhost:4000/contacts")
        .then(res => res.json())
        .then(data => {
          setContacts(data)
          setIsLoading(false)
        })
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to='/contacts/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts} isLoading={isLoading} />} />
          <Route path='/contacts' element={<ContactsList contacts={contacts} isLoading={isLoading} />} />
          <Route path='/contacts/:id' element={<ContactsView getContacts={getContacts} />} />
          <Route path='/contacts/add' element={
            <ContactsAdd contacts={contacts} setContacts={setContacts} />}
          />
        </Routes>
      </main>
    </>
  )
}
