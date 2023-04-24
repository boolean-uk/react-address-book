import { Link } from "react-router-dom"
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
function ContactsList(props) {

  const { contacts, setContacts } = props


  const handleContactDelete = (index) => {
    const contact = contacts[index]
    const id = contact.id
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 200) {
        setContacts(contacts.filter(contact => contact.id !== id))

      }
    })
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <span className="contact-actions">

                <Link style={{ display: 'flex', padding: '6px', backgroundColor: '#ec7e24', alignItems: 'center', borderRadius: '10px' }} to={`/contacts/${contact.id}`}>
                  <EyeIcon className="icon" />
                </Link>

                <div>
                  <Link to='/contacts/add' state={contact}>
                    <div style={{ display: 'flex', padding: '6px', backgroundColor: '#4D4745', alignItems: 'center', borderRadius: '10px' }}>
                      <PencilIcon className="icon" />
                    </div>
                  </Link>
                </div>
                <div style={{ display: 'flex', padding: '6px', backgroundColor: '#F0521B', alignItems: 'center', borderRadius: '10px' }}>
                  <TrashIcon className="icon" onClick={() => handleContactDelete(index)} />
                </div>

              </span>

            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
