import { Link } from "react-router-dom"

function ContactsList (props) {
  const { contacts } = props

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        { contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={ index }>
              <p>
                { firstName } { lastName }
              </p>
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
