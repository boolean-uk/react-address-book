import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import { baseUrl } from "./utils/baseUrl";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
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
        </Routes>
      </main>
    </>
  );
}
