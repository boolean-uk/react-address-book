import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/Contacts/ContactsList";
import ContactsAdd from "./components/Contacts/ContactsAdd";
import ContactsView from "./components/Contacts/ContactsView";
import ContactsEdit from "./components/Contacts/ContactsEdit";
import MeetingsList from "./components/Meetings/MeetingsList";
import MeetingsView from "./components/Meetings/MeetingsView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const getContacts = () => {
    try {
      fetch("http://localhost:4000/contacts")
        .then((contactsData) => contactsData.json())
        .then((contactsData) => {
          setContacts(contactsData);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getMeetings = () => {
    try {
      fetch("http://localhost:4000/meetings")
        .then((meetingsData) => meetingsData.json())
        .then((meetingsData) => {
          setMeetings(meetingsData);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContacts();
    getMeetings();
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li className="linkListItem">
            <Link to="/" className="linkButton">
              Contacts List
            </Link>
          </li>
          <li className="linkListItem">
            <Link to="/addcontact" className="linkButton">
              Add New Contact
            </Link>
          </li>
          <li className="linkListItem">
            <Link to="/meetings" className="linkButton">
              Meetings List
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <ContactsList contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route
            path="/addcontact"
            element={<ContactsAdd setContacts={setContacts} />}
          />
          <Route path="/contact/:id" element={<ContactsView />} />
          <Route
            path="/editcontact/:id"
            element={<ContactsEdit setContacts={setContacts} />}
          />
          <Route
            path="/meetings"
            element={
              <MeetingsList
                contacts={contacts}
                meetings={meetings}
                setMeetings={setMeetings}
              />
            }
          />
          <Route
            path="/meeting/:id"
            element={<MeetingsView contacts={contacts} />}
          />
        </Routes>
      </main>
    </>
  );
}
