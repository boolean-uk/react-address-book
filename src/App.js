import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import Meeting from "./components/Meetings";
import "./styles/styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const res = await fetch("http://localhost:4000/contacts");
    const contacts = await res.json();
    setContacts(contacts);
    setLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  if (loading) {
    return (
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

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
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/edit/:id"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id/meetings" element={<Meeting />} />
        </Routes>
      </main>
    </>
  );
}
