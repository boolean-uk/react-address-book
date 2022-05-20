import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { useFetch } from "./useFetch"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import MeetingsList from "./components/MeetingsList"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState(null)
  const { data, isPending } = useFetch("http://localhost:4000/contacts")
  
  //TODO: Load all contacts on useEffect when component first renders
  useEffect(() => {
    setContacts(data)
  }, [data])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <Link to="/">
            <li>Contacts List</li>
          </Link>
          <Link to="/contacts/add">
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route
            path="/"
            element={<ContactsList contacts={contacts} setContacts={setContacts} isPending={isPending} filter={''}/>}
          />
          <Route
            path="/contacts/add"
            element={<ContactsAdd contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path="/contacts/:id"
            element={<ContactsView />}
          />
          <Route
            path="/contacts/:id/edit"
            element={<ContactsEdit contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path="/contact/:id/meetings"
            element={<MeetingsList />}
          />
        </Routes>
      </main>
    </>
  )
}
