//react
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
//components
import ContactsList from './components/ContactsList';
import ContactsAdd from './components/ContactsAdd';
import ContactsView from './components/ContactsView';
//stylesheets
import './styles/styles.css';
//helpers
import urlPath from './helpers/helpers';

const App = () => {
  // states
  const [contacts, setContacts] = useState([]);
  const [load, setLoading] = useState(false);

  useEffect(() => {
    //avoid blank screen - loading bar image
    setLoading(true);
    fetch(`${urlPath}/contacts`)
      .then((res) => res.json())
      .then((json) => {
        setContacts(json);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link
              style={{ color: 'inherit', textDecoration: 'inherit', fontWeight: 'bold' }}
              to='/'
            >
              Contacts List
            </Link>
          </li>
          <li>
            <Link
              style={{ color: 'inherit', textDecoration: 'inherit', fontWeight: 'bold' }}
              to='/contacts/add'
            >
              Add New Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path='/'
            element={<ContactsList contacts={contacts} setContacts={setContacts} loading={load} />}
          />
          <Route
            path='/contacts/add'
            element={<ContactsAdd contacts={contacts} setContacts={setContacts} />}
          />
          <Route path='/contacts/:id' element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
