import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import ContactsEdit from "./components/ContactsEdit"
import ContactsDelete from "./components/ContactsDelete"
import ContactsMeetings from "./components/ContactsMeetings"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [meetings, setMeetings] = useState([])
  
  
  //TODO: Load all contacts on useEffect when component first renders
  useEffect (function() {
    fetch("http://localhost:4000/contacts")
    .then(res => res.json())
    .then(data => setContacts(data))
  }, [])

  useEffect (function() {
    fetch("http://localhost:4000/meetings")
    .then(res => res.json())
    .then(data => setMeetings(data))
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to='/'>
              Contacts List
              </Link>
          </li>
          <li>
            <Link to = {"/contacts/add"}>
              Add New Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path = '/' element = {<ContactsList contacts = {contacts}/>} />
          <Route path = '/contacts/:id' element = {<ContactsView />} />
          <Route path = '/contacts/add' element = {<ContactsAdd setContacts={setContacts} contacts={contacts} />} />
          <Route path = '/contacts/edit/:id' element = {<ContactsEdit setContacts={setContacts} contacts={contacts}/>} />
          <Route path = '/contacts/delete/:id' element = {<ContactsDelete setContacts={setContacts} contacts={contacts}/>} />
          <Route path = '/contacts/meetings/:id' element = {<ContactsMeetings setMeetings={setMeetings} meetings={meetings}/>} />
        </Routes>
      </main>
    </>
  )
}
