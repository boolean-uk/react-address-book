import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])

  const loadContacts = async () => {
    fetch("http://localhost:3030/contacts")
      .then(res => res.json())
      .then(data => setContacts(data))
  }

  const removeContact = async (id) => {
    await fetch(`http://localhost:3030/contacts/${id}`, {
      method: 'DELETE'
    })

    loadContacts()
  }

    //TODO: Load all contacts on useEffect when component first renders
    useEffect(function() {
      loadContacts()
    }, [])

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
        {
          /* 
            The Routes component is a container for 
            all the Route components 
          */
        }
        <Routes>
          {/* TODO: Add routes here  */}
          {
            /*
              Route component connects a path to a component
              The path represents a url.
              When that url is requested the corresponding component
              defined in element property will be called/rendered
            */
          }
          <Route 
            path='/'
            element={
              <ContactsList 
                contacts={contacts} 
                removeContact={removeContact}
              />
            }
          />

          <Route path='/contacts/:id' element={<ContactsView />} />

          <Route 
            path='/contacts/add' 
            element={
              <ContactsAdd 
                contacts={contacts} 
                setContacts={setContacts} 
              />
            } 
          />

          <Route 
            path='/contacts/edit/:id' 
            element={<ContactsEdit />} 
          />
        </Routes>
      </main>
    </>
  )
}
