import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsAdd from "./components/ContactsAdd";
import ContactEdit from "./components/ContactsEdit";
import ContactsList from "./components/ContactsList";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);
  if (!contacts) {
    return <p>Loading</p>;
  }

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            <Link to="/"> Contacts List </Link>
          </li>
          <li>
            {" "}
            <Link to="/contacts/add"> Add new </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={<ContactsList contacts={contacts} />}
          ></Route>
          <Route
            path="contacts/add"
            element={
              <ContactsAdd setContacts={setContacts} contacts={contacts} />
            }
          ></Route>
          <Route
            path="contacts/:id/edit"
            element={
              <ContactEdit setContacts={setContacts} contacts={contacts} />
            }
          ></Route>
          <Route
            path="contacts/:id"
            element={<ContactsView contacts={contacts}  setContacts={setContacts} />}
          ></Route>
        </Routes>
      </main>
    </>
  );
}
