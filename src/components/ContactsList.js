import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  const { contacts, setContacts, loading } = props

  return (
    <>
        <header>
            <h2>Contacts</h2>
            {loading && (<div>
            <img className="loadingSpin" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="loading contacts"/>
            <p>Loading Contacts...</p>
            </div>)}
        </header>
        <ul className="contacts-list">
            {contacts.map((contact, index) => {
            const { firstName, lastName } = contact
            return (
                <li className="contact" key={index}>
                <p>
                    {firstName} {lastName}
                </p>
                <p>
                    { /** TODO: Make a Link here to view contact */}
                    <Link to={`/contacts/view/${contact.id}`}>View</Link> 
                </p>
                <p>
                <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                </p>
                <p className="deleteContact" onClick={function clickDelete() {
                    const options = {
                        method: "DELETE"
                    }
                        fetch(`http://localhost:4000/contacts/${contact.id}`, options)
                        .then((res)  => res.json())
                        .then(() => {
                            fetch("http://localhost:4000/contacts")
                            .then((res) => res.json())
                            .then((data) => {
                            setContacts(data)
                            })
                        })
                }}>
                    Delete Contact
                </p>
                </li>
            )
            })}
        </ul>
    </>
  )
}

export default ContactsList
