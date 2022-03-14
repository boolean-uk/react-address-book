import { useState, useEffect } from "react"
import { camelCaseToHeader } from "../helperfunctions";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit(props) {

    const empty = {
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        postcode: "",
        email: "",
        twitter: "",
        linkedin: "",
        isBlocked: false
      }

    const {contacts, setContacts} = props
    const [formData,setFormData] = useState(empty)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => params && fetch(`http://localhost:4000/contacts/${params.id}`)
    .then(res => res.json())
    .then(json => setFormData(() => json))
    , [])
   
    const options = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
    }
    
    function handleSubmit(event){
    event.preventDefault()
    fetch(`http://localhost:4000/contacts/${params.id}`, options)
    .then(res=>res.json())
    .then(json => {
        setContacts(contacts => contacts.map(contact => contact.id == json.id ? json : contact))
        navigate(`/${params.id}`)
        })
    }
    
    function handleInput(event){
    setFormData(prev => ({...prev,[event.target.name]: event.target.value}))
    }

    function handleCheck(event){
    setFormData(prev => ({...prev, [event.target.name]: event.target.checked}))
    }
    
    return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Create Contact</h2>
        {Object.keys(formData).map(key => {
        if (key === "id") return
        if (key === "isBlocked") { return <>
        <label htmlFor="blocked">Blocked</label>
        <input id="blocked" name="isBlocked" type="checkbox" onChange={handleCheck} checked={formData.isBlocked}></input>
        </>
        }
        else return <>
        <label htmlFor={key}>{key && camelCaseToHeader(key)}</label>
        <input id={key} name={key} type="text" onChange={handleInput} value={formData[key]} required />
        </>})}
        <div className="actions-section">
        <button className="button blue" type="submit">
            Submit
        </button>
        </div>
    </form>
    )
}
    
    export default ContactsEdit
    