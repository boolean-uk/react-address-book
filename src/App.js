import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/contacts`)
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to="/">
            <li>Contacts List</li>
          </Link>
          <Link to="/addNewContact">
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/addNewContact"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/view/:id" element={<ContactsView />} />
          <Route
            path="/contacts/:id/edit"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
