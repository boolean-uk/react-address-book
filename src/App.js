import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import ContactsMeetings from "./components/ContactsMeetings";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to={"/"}>Contacts List</Link>
          </li>
          <li>
            <Link to={"/Contacts/add"}>Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route
            path="/"
            element={
              <ContactsList
                contacts={contacts}
                setContacts={setContacts}
                loading={loading}
              />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/view/:id"
            element={
              <ContactsView contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/edit/:id"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id/meetings" element={<ContactsMeetings />} />
        </Routes>
      </main>
    </>
  );
}
