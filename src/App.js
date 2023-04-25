import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import ContactsUpdate from "./components/ContactsUpdate"


export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setisLoading] = useState(false)

  useEffect(function () {
    setisLoading(true)
    // setting timeout to watch the loader
    setTimeout(() => {
      // get req to get the data from our local api
      fetch("http://localhost:4000/contacts")
    .then(res => res.json())
    .then(data => {setContacts(data)
          setisLoading(false)
    })

      
    }, 1000);
    
  }, [])
  // console.log(contacts);
  //TODO: Load all contacts on useEffect when component first renders



      
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          
          <li><Link to={'/'}>
            Contacts List
          </Link>
          </li>
          <li>
            <Link to={"contacts/add"}>
            Add New Contact

            </Link>
            </li>
        </ul>
      </nav>
      <main>
        {/* routing to different urls and specify which component will render  */}
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts} isLoading={isLoading}/>} />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="contacts/add" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>}/>
          <Route path="contacts/update/:id" element={<ContactsUpdate contacts={contacts} setContacts={setContacts}/>}/>
        </Routes>
      </main>
    </>
  )
}
