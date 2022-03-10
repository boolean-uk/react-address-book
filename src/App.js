import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from './components/ContactsEdit'
import "./styles/styles.css"

export default function App () {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setContacts(res)
      })
  }, [])
  //TODO: Load all contacts on useEffect when component first renders

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to='/' >Contacts List</Link></li>
          <li><Link to='/contact/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>

        <Routes>
          <Route path='/' element={ <ContactsList contacts={ contacts } /> } />
          <Route path='/contact/add' element={ <ContactsAdd setContacts={ setContacts } contacts={ contacts } /> } />
          <Route path='/contact/:id' element={ <ContactsView /> } />
          <Route path='/contact/:id/edit' element={ <ContactsEdit setContacts={ setContacts } contacts={ contacts } /> } />
        </Routes>
      </main>
    </>
  )
}
