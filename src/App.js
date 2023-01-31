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
    fetch("http://localhost:4000/contacts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, data);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <li>
            {" "}
            <Link to="/"></Link>Contacts List
          </li>
          <li>
            <Link to="/ContactsAdd"></Link>Add New Contact
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          {/* TODO: Add routes here  */}
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route
            path="/contacts/add"
            element={<ContactsAdd ContactsAdd={ContactsAdd} />}
          />
          <Route
            path="/contacts/:id"
            element={<ContactsView ContactsView={ContactsView} />}
          />
        </Routes>
      </main>
    </>
  );
}
