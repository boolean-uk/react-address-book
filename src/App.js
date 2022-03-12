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
  const [contactType, setType] = useState('')

  const url = contactType === '' ? `http://localhost:4000/contacts` : `http://localhost:4000/contacts?type=${contactType}`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setContacts(res)
      })
  }, [contactType])
  //TODO: Load all contacts on useEffect when component first renders
  if (!contacts) {
    return <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
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
          <Route path='/' element={ <ContactsList contacts={ contacts } setType={ setType } contactType={ contactType } /> } />
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
