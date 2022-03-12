import { Link } from "react-router-dom"

function ContactsList (props) {
  const { contacts, setType, contactType } = props


  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <br />
      <label htmlFor="type">Contact filter</label>
      <br />
      <select
        id="type"
        value={ contactType }
        onChange={ e => setType(e.target.value) }
        name="type"
      >
        <option value="">--No filter selected--</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
      </select>
      <br />
      <ul className="contacts-list">
        { contacts.map((contact, index) => {
          const { firstName, lastName, type } = contact
          return (
            <li className="contact" key={ index }>
              <p>
                { firstName } { lastName }
              </p>
              <p>{ type }{ type === 'personal' && <span>👌</span> }
                { type === 'work' && <span>🤢</span> }</p>

              <p>
                <Link to={ `/contact/${contact.id}` } >View</Link>
              </p>
            </li>
          )
        }) }
      </ul>
    </>
  )
}

export default ContactsList
