import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((contactData) => setContacts(contactData));
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to="/">
            <li>Contacts List</li>
          </Link>
          <Link to="/contacts/add">
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
          <Route
            path="/contacts/:id"
            element={<ContactsView contacts={contacts} />}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
