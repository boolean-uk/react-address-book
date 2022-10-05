import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import ContactsEdit from "./components/ContactsEdit"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  const navigate = useNavigate()
  const [render, setRender] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  
  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {setContacts(data); setIsLoaded(true);})
  }, [render]);

  const deleteContact = (id) => {

    fetch(`http://localhost:4000/contacts/${id}`, { method: "DELETE" })
      .then(() => {
        console.log("Delete successful")
        setRender([]);
        navigate('/')
    }); 
  
  };

  console.log(contacts)

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
          element={<ContactsList contacts={contacts} deleteContact={deleteContact} isLoaded={isLoaded} />}
        />
          <Route
          path="/contacts/add"
          element={<ContactsAdd contacts={contacts} setContacts={setContacts} />}
        />
          <Route
          path="/contacts/:id"
          element={<ContactsView contacts={contacts} />}
        />
          <Route
          path="/contacts/:id/edit"
          element={<ContactsEdit contacts={contacts} setContacts={setContacts} />}
        />
        </Routes>
      </main>
    </>
  )
}
