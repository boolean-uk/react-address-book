import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import MeetingsList from "./components/MeetingsList"
import MeetingsAdd from "./components/MeetingsAdd"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [meetings, setMeetings] = useState([])

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:4000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      setIsLoading(false)
  }, [contacts])

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:4000/meetings')
      .then(res => res.json())
      .then(data => setMeetings(data))
      setIsLoading(false)
  }, [meetings])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
      <Routes>
          {/* TODO: Add routes here  */}
          <Route path='/' element={<ContactsList setContacts={setContacts} contacts={contacts} isLoading={isLoading}/>} />
          <Route path='/contacts/:id' element={<ContactsView />} />
          <Route path='/contacts/add' element={<ContactsAdd setContacts={setContacts} contacts={contacts}/>} />
          <Route path='/contacts/edit/:id' element={<ContactsEdit setContacts={setContacts} contacts={contacts}/>} />
          <Route path='/contacts/:id/meetings' element={<MeetingsList meetings={meetings} setMeetings={setMeetings}/>} />
          <Route path='/contacts/:id/meetings/add' element={<MeetingsAdd meetings={meetings} setMeetings={setMeetings}/>} />
        </Routes>
      </main>
    </>
  )
}
