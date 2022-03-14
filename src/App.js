import { useEffect, useState } from "react"; // We're importing both the useEffect and the UseState functions from react 'engine'
import { Link, Route, Routes } from "react-router-dom"; // importing another react elements (Link, Route and Routes), I think these are element and not functions as they start with uppercase letter - just guessing.
import ContactsList from "./components/ContactsList"; // in line 3,4 and 5, we're importing the elements that we've created.
import ContactsAdd from "./components/ContactsAdd"; //
import ContactsView from "./components/ContactsView"; //
import "./styles/styles.css"; // importing the css style sheet.

export default function App() {
  //
  const [contacts, setContacts] = useState([]); // destructering the useState func and setting an initial state (empty array)

  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    // begining of the useEffect function
    fetch("http://localhost:4000/contacts") // we're making a request to API
      .then((res) => res.json()) // the response will then be transformed to JS object
      .then((json) => {
        // this function is caring the dating returned in the JS obj
        console.log(json); // this gives you a visibility of the data received
        setContacts(json); // this line is setting/updating the setfunction to the new data
      });
  }, []); // end of the first argument of the useEffect func (}). The second arg is current an empty array as we only want the useEffect function to render the data once.

  return (
    // here is the begining of the JSX that the App func is returning which is responsible of the content that gets displayed on the page
    <>
      <nav>
        {" "}
        <h2>Menu</h2>
        <ul>
          <li>
            {" "}
            <Link to="/">Contacts List</Link>{" "}
            {/*this li is renderig a text which is wrapped in the 'Link' element that we imported from react. the 'to' attribute , I think, is a keyword which you must use; it points to a directory */}
          </li>
          <li>
            <Link to="/contacts/add">Add New Contact</Link>{" "}
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          {" "}
          {/* This looks a parent element of the Route - I'm still not sure what it does exactly but I think I have an idea of it.*/}
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          {/* I don't really know how to explain what this line is doing other than: the route eelement is using a path which is the same one used in the 'link' and that it has access to the ContactList component with its state. So when the link 'Contact List' is clicked, this 'route' gets activated and takes the user into the contact list?   */}
          {/*  */}
          <Route
            path="/contacts/add"
            element={
              <ContactsAdd contacts={contacts} setContacts={setContacts} />
            }
          />
          <Route path="contacts/:id" element={<ContactsView />} />
        </Routes>
      </main>
    </>
  );
}
