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
    setContacts(data);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li className="linkListItem">
            <Link to="/" className="linkButton">
              Contacts List
            </Link>
          </li>
          <li className="linkListItem">
            <Link to="/addcontact" className="linkButton">
              Add New Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/addcontact"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactsView contacts={contacts} />}
          />
        </Routes>
      </main>
    </>
  );
}
