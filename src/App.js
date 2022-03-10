import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ContactsList from './components/ContactsList';
import ContactsAdd from './components/ContactsAdd';
import ContactsView from './components/ContactsView';
import './styles/styles.css';

export default function App() {
	console.log('Rendering App')
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		fetch('http://localhost:4000/contacts')
			.then(res => res.json())
			.then(jsonResult => {setContacts(jsonResult)});
	}, []);
	return (
		<>
			<nav>
				<h2>Menu</h2>
				<ul>
					<li>
						<Link to='/'>Contacts List</Link>
					</li>
					<li>
            <Link to='/contacts/add-new'>Add New Contact</Link>
          </li>
				</ul>
			</nav>
			<main>
				<Routes>
					<Route
            path='/'
            element={<ContactsList contacts={contacts} />} />
					<Route
						path='/contacts/add-new'
						element={<ContactsAdd contacts={contacts} setContacts={setContacts} />} />
				</Routes>
			</main>
		</>
	);
}
