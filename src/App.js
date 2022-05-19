import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import Meetings from "./components/Meetings.js";
import Nav from "./components/Nav";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders
  const { data, isPending, error } = useFetch(
    `http://localhost:4000/contacts/`
  );

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route
            path="/add"
            element={<ContactsAdd setContacts={setContacts} />}
          />
          <Route
            path="/"
            element={
              <ContactsList
                isPending={isPending}
                setContacts={setContacts}
                contacts={contacts}
                error={error}
              />
            }
          />
          <Route
            path="/contacts/:id"
            element={<ContactsView contacts={contacts} />}
          />
          <Route
            path="/contacts/:id/edit"
            element={
              <ContactsEdit setContacts={setContacts} contacts={contacts} />
            }
          />
          <Route
            path="/contacts/:id/meetings"
            element={<Meetings setContacts={setContacts} contacts={contacts} />}
          />
          {/* TODO: Add routes here  */}
        </Routes>
      </main>
    </>
  );
}
