import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";
import ContactsEdit from "./components/ContactsEdit";
import ContactMeetings from "./components/ContactMeetings";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //TODO: Load all contacts on useEffect when component first renders
  useEffect(function () {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .then(() => setLoading(true));
  }, []);

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
          <Route
            path="/"
            element={
              <ContactsList
                isLoading={isLoading}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />
          <Route
            path="/contacts/edit/:id"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route path="/contacts/meetings/:id" element={<ContactMeetings />} />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd setContacts={setContacts} contacts={contacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
