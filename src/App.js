import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import "./styles/styles.css";
import "./styles/loadingSpinner.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/contacts" disabled={isLoading}>
              Contacts List
            </Link>
          </li>
          <li>
            <Link to="/add-new">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/contacts"
            element={
              <ContactsList
                contacts={contacts}
                setContacts={setContacts}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/add-new"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/edit/:id"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
