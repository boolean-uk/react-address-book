import { Link, useSearchParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts, setContacts, isPending, filter } = props
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('type') || ''

  const handleDelete = (id) => {
    const opts = { method: "DELETE" }
    fetch(`http://localhost:4000/contacts/${id}`, opts)

    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
  }

  const handleFilterChange = (e) => {
    const type = e.target.value

    type ? setSearchParams({ type }) : setSearchParams({})
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
        <select id="filters" name="filters" onChange={handleFilterChange} defaultValue={query}>
          <option value="">All contacts</option>
          <option value="personal">Personal</option>
          <option value="work">work</option>
        </select>
      </header>
      {isPending && <CircularProgress />}
      {contacts && contacts.length === 0 && <span>No contacts...</span>}
      {contacts && <ul className="contacts-list">
        {contacts.filter(contact => contact.type.includes(query)).map((contact, index) => {
          const { firstName, lastName, type } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {type === 'personal' ? <>&#127867;</> : <>&#128188;</>} {firstName} {lastName}
              </p>
              <p>
                { /** TODO: Make a Link here to view contact */}
                <Link to={`/contacts/${contact.id}`}>
                  View
                </Link>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </p>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default ContactsList
