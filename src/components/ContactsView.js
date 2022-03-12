import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function ContactsView () {
  const [contact, setContact] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(res => {
        setContact(res)
      })
  }, [params])

  if (!contact) {
    return <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
  }

  return (
    <div>
      <h2>{ contact.firstName } { contact.lastName }</h2>
      <p>{ contact.street } { contact.city }</p>
      <p>LinkedIn: { contact.linkedIn }</p>
      <p>Twitter: { contact.twitter }</p>
      <p>Email: { contact.email }</p>
      <p>{ contact.type }{ contact.type === 'personal' && <span>👌</span> }
        { contact.type === 'work' && <span>🤢</span> }</p>
      <Link to={ `/contact/${contact.id}/edit` } >(Edit)</Link>
      <Link to={ `/contact/${contact.id}/delete` }>(Delete)</Link>
      <br />
      <Link to={ `/contact/${contact.id}/meeting` } >(Meetings)</Link>
    </div>
  )
}

export default ContactsView