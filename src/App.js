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

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to={"/"}>
            <li>Contacts List</li>
          </Link>
          <Link to={"/contacts/add"}>
            <li>Add New Contact</li>
          </Link>
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
        </Routes>
      </main>
    </>
  );
}
