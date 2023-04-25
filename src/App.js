import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import ContactsDelete from "./components/ContactsDelete";
import ContactsMeeting from "./components/ContactsMeeting";

import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  let [filterWork, setFilterWork] = useState(false);
  let [filterPersonal, setFilterPersonal] = useState(false);

  useEffect(function () {
    getContacts();
  }, []);

  const getContacts = (e) => {
    if (filterWork === true && filterPersonal === true) {
      setLoading(true);
      fetch("http://localhost:3030/contacts/?type=Work&type=Personal")
        .then((res) => res.json())
        .then((data) => setContacts(data))
        .then((e) => {
          setLoading(false);
        });
    } else if (filterWork === true && filterPersonal === false) {
      setLoading(true);
      fetch("http://localhost:3030/contacts/?type=Work")
        .then((res) => res.json())
        .then((data) => setContacts(data))
        .then((e) => {
          setLoading(false);
        });
    } else if (filterWork === false && filterPersonal === true) {
      setLoading(true);
      fetch("http://localhost:3030/contacts/?type=Personal")
        .then((res) => res.json())
        .then((data) => setContacts(data))
        .then((e) => {
          setLoading(false);
        });
    } else if (filterWork === false && filterPersonal === false) {
      setLoading(true);
      fetch("http://localhost:3030/contacts/")
        .then((res) => res.json())
        .then((data) => setContacts(data))
        .then((e) => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/" element={<ContactsList />}>
              Contacts List
            </Link>
          </li>
          <li>
            <Link to="/contacts/add" element={<ContactsAdd />}>
              Add New Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ContactsList
                loading={loading}
                contacts={contacts}
                setFilterWork={setFilterWork}
                filterWork={filterWork}
                setFilterPersonal={setFilterPersonal}
                filterPersonal={filterPersonal}
                getContacts={getContacts}
              />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd setContacts={setContacts} contacts={contacts} />
            }
          />
          <Route
            path="/contacts/edit/:id"
            element={
              <ContactsEdit setContacts={setContacts} contacts={contacts} />
            }
          />
          <Route
            path="/contacts/delete/:id"
            element={
              <ContactsDelete setContacts={setContacts} contacts={contacts} />
            }
          />
          <Route
            path="/contacts/:id/meetings"
            element={
              <ContactsMeeting setContacts={setContacts} contacts={contacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
