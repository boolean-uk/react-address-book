import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

export default function App() {
  const API_URL = "http://localhost:4000/contacts";
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders

  const getContacts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    setPeople(setContacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts List</Link>
          </li>
          <li>Add New Contact</li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/contacts" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
