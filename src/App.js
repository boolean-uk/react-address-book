import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import { baseUrl } from "./utils/baseUrl";
import "./styles/styles.css";
import NewContact from "./components/NewContact";

export default function App() {
  // const [contacts, setContacts] = useState([]);
  // const baseUrl = " http://localhost:3000/contacts";
  const { data: contacts, isPending, error } = useFetch(`${baseUrl}`);

  //TODO: Load all contacts on useEffect when component first renders

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
            <Link to="/new">Add New Contact</Link>
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
              />
            }
          />
          <Route path="/contact/:id" element={<ContactsView />} />
          <Route path="/new" element={<NewContact />} />
        </Routes>
      </main>
    </>
  );
}

{
  /* TODO: Make these links */
}
