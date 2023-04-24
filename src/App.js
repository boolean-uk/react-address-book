import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/contact-component/ContactsList";
import ContactsAdd from "./components/contact-component/ContactsAdd";
import ContactsView from "./components/contact-component/ContactsView";
import "./styles/styles.css";
import { HTTPCONTACTS } from "./http";
import ContactsEdit from "./components/contact-component/ContactsEdit";
import Meetings from "./components/meeting-components/Meetings";

export default function App() {
  const [contacts, setContacts] = useState(false);

  useEffect(() => {
    fetch(HTTPCONTACTS)
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to={"/"}>Contacts List</Link>
          </li>
          <li>
            <Link to={"/contacts/add"}>Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        {contacts ? (
          <Routes>
            <Route path="/" element={<ContactsList contacts={contacts} />} />
            <Route path="/contacts/:id" element={<ContactsView />} />
            <Route
              path="/contacts/edit/:id"
              element={
                <ContactsEdit contacts={contacts} setContacts={setContacts} />
              }
            />
            <Route
              path="/contacts/add"
              element={
                <ContactsAdd contacts={contacts} setContacts={setContacts} />
              }
            />
            <Route path="/contact/:id/meetings" element={<Meetings />} />
          </Routes>
        ) : (
          <span className="loader"></span>
        )}
      </main>
    </>
  );
}
