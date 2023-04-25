import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";
import "./styles/Loading.css";
import ContactsEdit from "./components/ContactsEdit";
import ContactsDelete from "./components/ContactsDelete";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);
  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:4000/contacts")
        .then((response) => response.json())
        .then((json) => {
          setContacts(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, []);

  return (
    <>
      {!completed ? (
        <>
          {!loading ? (
            <div className="spinner">
              <span className="text">Loading...</span>
              <div className="half-spinner"></div>
            </div>
          ) : (
            <div className="completed">&#x2713;</div>
          )}
        </>
      ) : (
        <>
          <nav className="menu">
            <h2>Menu</h2>
            <ul>
              <li>
                <Link to={"/"} className="menuLink">
                  {" "}
                  Contacts List
                </Link>
              </li>
              <li>
                <Link to={"/contacts/add"} className="menuLink">
                  {" "}
                  Add New Contact
                </Link>
              </li>
            </ul>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<ContactsList contacts={contacts} />} />
              <Route path="/contacts/:id" element={<ContactsView />} />
              <Route
                path="/contacts/add"
                element={
                  <ContactsAdd contacts={contacts} setContacts={setContacts} />
                }
              />
              <Route
                path="/contacts/edit/:id"
                element={<ContactsEdit setContacts={setContacts} />}
              />
              <Route
                path="/contacts/delete/:id"
                element={
                  <ContactsDelete
                    setContacts={setContacts}
                    contacts={contacts}
                  />
                }
              />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}
