import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders

    //get data with fetch inside the useEffect
    useEffect (() => {
      console.log("about the contact")
      fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) =>{
        console.log("data of person", data);
        setContacts(data)
      })
    },[])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li> <Link to="/">Contacts List </Link></li>
          <li> <Link to="/contacts/add">Add New Contact </Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts}/>}/>
          <Route path="/contacts/add" element={<ContactsAdd ContactsAdd={ContactsAdd}/>}/> 
          <Route path="/contacts/:id" element={<ContactsView ContactsView={ContactsView}/>}/>
          <Route path="/contacts/edit/:id" element={<ContactsEdit/>} />
        </Routes>
      </main>
    </>
  )
}
