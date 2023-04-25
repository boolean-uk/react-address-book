import { useEffect, useState, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import ContactsEdit from "./components/ContactsEdit";
import "./styles/styles.css";
import './styles/mine.css'

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const spinnerRef = useRef(null);
  
  useEffect(()=>{
    
    fetch("http://localhost:3030/contacts")
      .then((res) => res.json())
      .then(data => {
        setLoading(false);
        setContacts(data);
        spinnerRef.current.style.display = 'none';
      });
  }, []);
  //TODO: Load all contacts on useEffect when component first renders
  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <Link to="/">
            <li>Contacts List</li>
          </Link>
          <Link to="/contacts/add">
            <li>Add New Contact</li>
          </Link>
        </ul>
      </nav>
      <main>
        {/* funny looking spinner */}
        <div id="loading-spinner">
          {loading && (
            <div ref={spinnerRef} className="loader">
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </div>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactsView />} />
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/contacts/:id/edit"
            element={
              <ContactsEdit contacts={contacts} setContacts={setContacts} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
