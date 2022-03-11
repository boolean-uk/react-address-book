import { useNavigate, useParams } from "react-router-dom";

export default function ContactsDel (props) {
  const navigate = useNavigate()
  const params = useParams()
  const { setContacts } = props
  function deleteMe () {
    setContacts(x => x.filter(c => c.id != params.id))
    fetch(`http://localhost:4000/contacts/${params.id}`, { method: 'DELETE' })
    navigate('/')
  }
  return (
    <div>
      <h2>Are u sure u wanna delete this thing mate?</h2>
      <button onClick={ deleteMe } >Yes mate</button>
      <button onClick={ () => navigate('/') }>No mate</button>
    </div>
  )
}