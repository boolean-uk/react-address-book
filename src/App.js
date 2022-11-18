import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const res = await fetch("http://localhost:4000/contacts");
    const contacts = await res.json();
    setContacts(contacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  console.log(contacts);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>Contacts List</li>
          <li>Add New Contact</li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
        </Routes>
      </main>
    </>
  );
}
