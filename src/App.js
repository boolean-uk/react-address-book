import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
// import { Spin } from "react"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([]);
  // const [loading, setLoading] = useState(false)
  //TODO: Load all contacts on useEffect when component first renders

//useffect to add extra email, linkedin and twitter for extension 1
useEffect(() => {}, [])

//useEffect to fetch the data and setContacts: Core
  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contactData) => {
        setContacts(contactData)
        console.log("contactData:", contactData)
      })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">
              Contacts List
            </Link>
          </li>
          <li>
            <Link to="/ContactsAdd">
              Add New Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main>
          <Routes>
            <Route path="/" element={<ContactsList
              contacts={contacts}
            />} />
            <Route path="/ContactsAdd" element={<ContactsAdd setContacts={setContacts} contacts={contacts} />} />
            <Route path="/contacts/:id" element={<ContactsView />} />
          </Routes>
      </main>
    </>
  )
}
