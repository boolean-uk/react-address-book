import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders
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
          {/* TODO: Make these links */}
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
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/addNewContact"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          {/* <Route path="/view/:id" element={<ContactsView />} /> */}
        </Routes>
      </main>
    </>
  );
}
