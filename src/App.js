import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import EditContact from './components/EditContact'
import DeleteContact from "./components/DeleteContact"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders

   //I am using the useEffect from react Library to fetch data from the server and after the data
   //has been fetched, the second '.then' will convert it to json and afterwards, I update the state.
  useEffect(()=>{
    fetch('http://localhost:4000/contacts')
    .then(res=> res.json())
    .then(json=> {
      console.log(json)
      setContacts(json)
    })
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
        {/* I am making a Link to the Contacts List and Add New Contact on the page. The 'Link' is imported from
         React Library */}
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>

         {/* I created the route path and in the element, I am importing the ContactsList and ContactsAdd alongside with their props.
         The ContactsView is standing alone because each of its viewed page will be determined by the new information the user adds or created */}
        <Routes>
          <Route path='/' element={<ContactsList contacts={contacts}/>} />
       <Route path='/contacts/add' element={<ContactsAdd setContacts={setContacts}/>} />
          <Route path='/contacts/:id' element={<ContactsView />}  />
          <Route path='/contacts/:id/edit' element={<EditContact />}  />
                </Routes>
      </main>
    </>
  )
}
