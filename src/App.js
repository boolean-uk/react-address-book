import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders

  //use useEffect tells react that the component needs to do something after render 
  useEffect( () => {
    //create a fetch request 
    fetch("http://localhost:4000/contacts")
    //response converted to json
    .then(resp => resp.json())
    //json then console logged to check its value as well as being used to update the state.
    .then(json => {
      console.log(json),
      setContacts(json)
    })
  }, []) //empty array runs once when the component first loads

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}

          <li>
            {/* add link tags and then using to with strings indicating the location of the link */}
            <Link to="/" >
            Contacts List
            </Link>
          </li>

            {/* add link tags and then using to with strings indicating the location of the link */}
         <li>
            <Link to="/contacts/add" >
            Add New Contact
            </Link>
        </li>
        </ul>
      </nav>
      <main>
        <Routes>

          {/* Route tags used to show path that will show in url in browser. Element displays component name
              as well as any props used, which are delcared with any name e.g. fred and then assigned with the name of the 
              props  */}
          <Route
          path="/"
          element={<ContactsList contacts={contacts} />}
          >
          </Route>

           {/* Route tags used to show path that will show in url in browser. Element displays component name
              as well as any props used, which are delcared with any name e.g. fred and then assigned with the name of the 
              props.   */}
          <Route
          path="/contacts/add"
          element={<ContactsAdd  contacts={contacts} setContacts={setContacts}/>}
          >
          </Route>
        </Routes>
      </main>
    </>
  )
}

// - Use useEffect to make a fetch request to "http://localhost:4000/books" in App.js
// - When the response is returned, update the books state
// - Include the BooksList component, passing "books" as a prop
// Remember to start json-server in a new terminal - you can check your json-server is running by visiting http://localhost:4000/books in your browser.
// We'll go through part 2 on Zoom at 10:55am
// (If you are feeling comfortable/confident with the exercise feel free to take a shot at the next requirements in this time...)
