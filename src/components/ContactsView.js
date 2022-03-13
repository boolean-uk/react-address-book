import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"


function ContactsView () {
  const [contact, setContact] = useState(false)
  const params = useParams()
  const { isPending, error } = useFetch(`http://localhost:4000/contacts/${params.id}`, params, setContact)

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
      { isPending && <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> }
      { error && <h2>{ error }!</h2> }
    </div>
  )
}

export default ContactsView