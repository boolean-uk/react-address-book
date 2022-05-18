import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./styles/styles.css";

import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data.results));
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to="/">Contacts List</Link>
          <Link to="/">Add New Contact</Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route element={<ContactsList />} />
          <Route path="/" element={<ContactsAdd />} />
        </Routes>
      </main>
    </>
  );
}
