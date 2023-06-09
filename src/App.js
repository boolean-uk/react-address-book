import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {

  // - A user can **view a list of contacts** at "/" when the app loads. 
  // - Each contact should show first name and last name
  // - The list of contacts should be fetched from json-server

  //- A user can **create a contact** at "/contacts/add" via a form when the "Add New Contact" menu link is clicked
  //   - The created contact should have:
  //   - first name
  //   - last name
  //   - street
  //   - city
  // - When the form is submitted, the created contact should be saved in the database by sending to json-server
  // - The created contact should be also be added to the contacts list
  // - The add new contact form should be reset

  // - A user can **view a specific contact** at "/contacts/:id" by pressing a "view" link from the contacts list
  // - The view contact page should display all the details of the contact
  // - The specific contact should be fetched from json-server based on it's id

  const [contacts, setContacts] = useState([])
  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch(`http://localhost:4000/contacts`)
      .then(res => res.json())
      .then(data => setContacts(data))

  }, [])
  console.log('checkin', contacts)

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <Link to='/'>
            <li>Contacts List</li>
          </Link>

          <Link to='/add'>
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route
            path="/" element={<ContactsList contacts1={contacts} />}>
          </Route>

          <Route
            path="/add" element={<ContactsAdd setContacts1={setContacts} contacts={contacts} />}>
          </Route>

          <Route
            path={`/contacts/:contactID`} element={<ContactsView />}>
          </Route>


        </Routes>
      </main>
    </>
  )
}
