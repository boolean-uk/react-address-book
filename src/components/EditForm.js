import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

// //Const of the initial contacts.key
const initialState = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    email: "",
    twitter: "",
    linkedIn: "",
}

function EditForm(props) {
    const { setContacts, contacts } = props
    const [formState, setFormState] = useState(initialState)

    const navigate = useNavigate()
    const ContactID = useParams()

    //send PATCH to json server on form submit
    const handleSubmit = (event) => {
        event.preventDefault();


        //POST request
        const opts = {
            method: 'PATCH',
            //stackoverflow says it has to be "application/json"
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formState)
        }
        //Pass the URL we want to pass TO
        fetch(`http://localhost:4000/contacts/${ContactID.id}`, opts)
            // .then(function (response) { return response.json() })
            .then((res) => res.json())
            .then(data => {
                // setContacts([...contacts, formState])
                // console.log("posted contacts:", contacts)
                console.log("Patched contacts from formState:", data)
            })
        //reset the form. Timer to allow for post request to complete
        // setTimeout(() => {
        //     setFormState(initialState);
        // }, 500)

        //bring page back to contactlist: if creation is ok
        navigate(`/contacts/${ContactID.id}`)
    }


    //change the input from empty string to submitted info
    const handleChange = (event) => {
        //set targets to change
        const name = event.target.name
        const value = event.target.value

        if (name === "firstName") {
            setFormState({ ...formState, firstName: value })
        }
        if (name === "lastName") {
            setFormState({ ...formState, lastName: value })
        }
        if (name === "street") {
            setFormState({ ...formState, street: value })
        }
        if (name === "city") {
            setFormState({ ...formState, city: value })
        }
        if (name === "email") {
            setFormState({ ...formState, email: value })
        }
        if (name === "linkedIn") {
            setFormState({ ...formState, linkedIn: value })
        }
        if (name === "twitter") {
            setFormState({ ...formState, twitter: value })
        }
    }
    const handleCancel = () => {
        navigate(`/contacts/${ContactID.id}`)

    }

    return (
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
            <h2>Edit Contact: {`${ContactID.firstName}`}</h2>

            <label htmlFor="firstName">First Name</label>
            <input id="firstName"
                name="firstName"
                type="text"
                value={contacts.firstName}
                placeholder="Type to update details..."
                onChange={handleChange} />

            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName"
                name="lastName"
                type="text"
                value={contacts.lastName}
                placeholder="Type to update details..."
                onChange={handleChange} />

            <label htmlFor="street">Street:</label>
            <input id="street"
                name="street"
                type="text"
                value={contacts.street}
                placeholder="Type to update details..."
                onChange={handleChange} />

            <label htmlFor="city">City:</label>
            <input id="city"
                name="city"
                type="text"
                value={contacts.city}
                placeholder="Type to update details..."
                onChange={handleChange} />

            <label htmlFor="email">Email:</label>
            <input id="email"
                name="email"
                type="text"
                value={contacts.email}
                placeholder="Type to update details..."
                onChange={handleChange} />

            <label htmlFor="linkedIn">linkedIn:</label>
            <input id="linkedIn"
                name="linkedIn"
                type="text"
                value={contacts.linkedIn}
                placeholder="Type to update details..."
                onChange={handleChange} />

            <label htmlFor="twitter">Twitter:</label>
            <input id="twitter"
                name="twitter"
                type="text"
                value={contacts.twitter}
                placeholder="Type to update details..."

                onChange={handleChange} />

            <div className="actions-section">
                <button className="button blue" onClick={handleCancel}>
                    Cancel
                </button>

                <button className="button blue" type="submit">
                    Update
                </button>

            </div>
        </form>
    )
}

export default EditForm