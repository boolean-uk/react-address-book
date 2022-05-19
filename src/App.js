import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./styles/styles.css";

import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const data = await fetch("http://localhost:4000/contacts");
    const contacts = await data.json();
    setContacts(contacts);
  };

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            <Link to="/contacts/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
