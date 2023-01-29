import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders
  // A user can **view a list of contacts** at "/" when the app loads.
  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* <ContactsList /> */}
          {/* TODO: Make these links */}
          

          <li>
            <Link to="/contacts"> Contacts List</Link>
          </li>

          <li>
            <Link to="/contacts/add" > Add New Contact </Link>
           </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/contacts/"
            element={<ContactsList contacts={contacts} />}
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/add" element={<ContactsAdd />} />
        </Routes>
      </main>
    </>
  );
}
