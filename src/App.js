import { ContactsList, ContactsAdd, ContactsView, ContactsEdit, ContactsDel, ContactsMeetings } from './components/index'
import { useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import useFetch from "./hooks/useFetch"
import "./styles/styles.css"

export default function App () {
  const [contactType, setType] = useState('')
  const [contacts, setContacts] = useState([])
  const url = contactType === '' ? `http://localhost:4000/contacts` : `http://localhost:4000/contacts?type=${contactType}`
  const { isPending, error } = useFetch(url, contactType, setContacts)

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
      { isPending && <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> }
      { error && <h2>{ error }!</h2> }
    </>
  )
}
