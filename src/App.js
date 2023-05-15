import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";
import ContactsEdit from "./components/ContactsEdit";

export default function App() {
  const [contacts, setContacts] = useState(null);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')

  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch(`http://localhost:4000/contacts`)
    .then((response) => response.json())
    .then((data) => setContacts(data))
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          {/* TODO: Make these links */}
          <Link to='/'><li>Contacts List</li></Link>
          <Link to='/contacts/add'><li>Add New Contact</li></Link>
        </ul>
      </nav>
      <main>
        <Routes>{/* TODO: Add routes here  */}
        
            <Route 
             path='/'
             element={<ContactsList contacts={contacts} setContacts={setContacts}/>}
            />
            <Route 
             path='/contacts/add'
             element={<ContactsAdd setContacts= {setContacts} contacts={contacts} firstName={firstName} setFirstName={setFirstName}
             lastName={lastName} setLastName={setLastName} street={street} setStreet={setStreet} city={city} setCity={setCity} email={email} setEmail={setEmail} linkedin={linkedin} setLinkedin={setLinkedin} twitter={twitter} setTwitter={setTwitter}  />}
            />
             <Route 
             path='/contacts/:id'
             element={<ContactsView  />}
            />
             <Route 
             path='/contacts/edit/:id'
             element={<ContactsEdit setContacts= {setContacts} contacts={contacts} 
            //  firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} street={street} setStreet={setStreet} city={city} setCity={setCity} email={email} setEmail={setEmail} linkedin={linkedin} setLinkedin={setLinkedin} twitter={twitter} setTwitter={setTwitter}  
             />}
            />
        </Routes>
      </main>
    </>
  );
}
