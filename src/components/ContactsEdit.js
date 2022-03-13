import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";


function ContactsEdit(props) {
    const [editForm, setEditForm] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()
    const { setupdate, update } = props

    useEffect(() => {
        fetch(`http://localhost:4000/contacts/${id}`)
            .then(res => res.json())
            .then(contact => setEditForm(contact))
    }, [id])

    const formSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editForm)
        }
        fetch(`http://localhost:4000/contacts/${id}`, options)
            .then(res => res.json())
        setEditForm({})
        setupdate(!update)
        navigate('/')
    }

    const deleteContact = () => {
        const options = { method: 'DELETE' }
        fetch(`http://localhost:4000/contacts/${id}`, options)
            .then(res => res.json())
            .then(json => alert(`${editForm.firstName} ${editForm.lastName} deleted!`))
            setupdate(!update)
        navigate('/')
    }
    console.log('editForm', editForm)
    return (<>
        <form className="form-stack contact-form" onSubmit={formSubmit} >
            <h2>Edit Contact</h2>

            <label htmlFor="edit-firstName">First Name</label>
            <input onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} defaultValue={editForm.firstName}
                id="edit-firstName" name="edit-firstName" type="text" />

            <label htmlFor="edit-lastName">Last Name:</label>
            <input onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} defaultValue={editForm.lastName}
                id="edit-lastName" name="edit-lastName" type="text" />

            <label htmlFor="edit-street">Street:</label>
            <input onChange={e => setEditForm({ ...editForm, street: e.target.value })} defaultValue={editForm.street}
                id="edit-street" name="edit-street" type="text" />

            <label htmlFor="edit-city">City:</label>
            <input onChange={e => setEditForm({ ...editForm, city: e.target.value })} defaultValue={editForm.city}
                id="edit-city" name="edit-city" type="text" />

            <label htmlFor="email">Email:</label>
            <input onChange={e => setEditForm({ ...editForm, email: e.target.value })} defaultValue={editForm.email}
                id="email" name="email" type="email" />

            <label htmlFor="edit-linkedIn">LinkedIn:</label>
            <input onChange={e => setEditForm({ ...editForm, linkedIn: e.target.value })} defaultValue={editForm.linkedIn}
                id="edit-linkedIn" name="edit-linkedIn" type="text" />

            <label htmlFor="edit-twitter">Twitter:</label>
            <input onChange={e => setEditForm({ ...editForm, twitter: e.target.value })} defaultValue={editForm.twitter}
                id="edit-twitter" name="edit-twitter" type="text" />

            <div className="actions-section">
                <button className="button blue" type="submit">
                    Update
                </button>
            </div>
        </form>
        <button id='delete' onClick={deleteContact}>Delete</button>
    </>
    )
}

export default ContactsEdit
