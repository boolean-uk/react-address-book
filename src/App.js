import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import Edit from "./components/Edit";
import { baseUrl } from "./utils/baseUrl";
import "./styles/styles.css";
import Meetings from "./components/Meetings";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(false);

  const { data, isPending, error } = useFetch(`${baseUrl}`);

  useEffect(() => {
    if (data) setContacts(data);
  }, [data]);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            {" "}
            <Link to="/">Contacts List</Link>
          </li>
          <li>
            {" "}
            <Link to="/contact/add">Add New Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ContactsList
                contacts={contacts}
                isPending={isPending}
                error={error}
                setContacts={setContacts}
                editing={editing}
                setEditing={setEditing}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactsView />} />
          <Route
            path="/contact/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contact/edit/:id"
            element={<Edit contacts={contacts} setContacts={setContacts} />}
          />
          <Route path="/contact/:id/meetings" element={<Meetings />} />
        </Routes>
      </main>
    </>
  );
}
