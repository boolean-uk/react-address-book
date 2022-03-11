import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from './components/ContactsEdit'
import ContactsDel from "./components/ContactsDel"
import ContactsMeetings from './components/Meetings'
import "./styles/styles.css"

export default function App () {
  const [contacts, setContacts] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(res => {
        setContacts(res)
      })
  }, [])
  //TODO: Load all contacts on useEffect when component first renders
  if (!contacts) {
    return <div className="spinner-border"></div>
  }
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
          <Route path='/contact/:id/delete' element={ <ContactsDel setContacts={ setContacts } contacts={ contacts } /> } />
          <Route path='/contact/:id/meeting' element={ <ContactsMeetings /> } />
        </Routes>
      </main>
    </>
  )
}
