import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import "./styles/styles.css"
import ContactsMeetings from "./components/ContactsMeetings"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [editContact, setEditContact] = useState()
  const [loader, setLoader] = useState(true)
  
  useEffect(function() {
    fetch("http://localhost:3030/contacts")
    .then(res => res.json())
    .then(data => {
      setLoader(false)
      setContacts(data)
    })
  }, [])

  const deleteContact = async (contactId) => {
    await fetch(`http://localhost:3030/contacts/${contactId}`, {
      method: "DELETE"
    })

    const deletedContacts = contacts.filter(item => item.id !== contactId)
    setContacts(deletedContacts)
  }

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to={'/'}>
            <li>Contacts List</li>
          </Link>
          <Link to={'/contacts/add'}>
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        
        <Routes>
          <Route path="/" element={<ContactsList setContacts={setContacts} contacts={contacts} deleteContact={deleteContact} setEditContact={setEditContact}/>} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/add" element={<ContactsAdd setContacts={setContacts} contacts={contacts} />}/>
          <Route path="/contacts/edit" element={<ContactsEdit setContacts={setContacts} contacts={contacts} editContact={editContact} />} />
          <Route path="/contacts/:id/meetings" element={<ContactsMeetings />}/>
        </Routes>
        {
          loader && <div className="loader"></div>
        }
      </main>
    </>
  )
}
