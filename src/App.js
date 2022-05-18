import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import Nav from "./components/Nav";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch("http://localhost:4000/contacts/")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  useEffect(() => {}, []);

  console.log(contacts);

  return (
    <>
      <Nav />
      <main>
        <Routes>
          {/* <Route path="/" element={<Nav />} /> */}
          <Route
            path="/add"
            element={<ContactsAdd setContacts={setContacts} />}
          />
          <Route
            path="/"
            element={
              <ContactsList setContacts={setContacts} contacts={contacts} />
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
          {/* TODO: Add routes here  */}
        </Routes>
      </main>
    </>
  );
}
