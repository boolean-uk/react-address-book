import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

function ContactsUpdate({contacts, setContacts}) {
    const navigate = useNavigate()
    const params = useParams()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city:'',
        email: '',
        linkedIn: '',
        twitter: ''
    })
    
    useEffect(() => {
        fetch(`http://localhost:4000/contacts/${params.id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
      }, [])
 
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:4000/contacts/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        await fetch('http://localhost:4000/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))

        navigate(`/contacts/${params.id}`)
    }


    return (
        <form className="form-stack contact-form" onSubmit={handleUpdate}>
        <h2>Update Contact</h2>
  
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" required 
        onChange={handleChange} value={formData.firstName}/>
  
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" name="lastName" type="text" required 
        onChange={handleChange} value={formData.lastName}/>
  
        <label htmlFor="street">Street:</label>
        <input id="street" name="street" type="text" required 
        onChange={handleChange} value={formData.street}/>
  
        <label htmlFor="city">City:</label>
        <input id="city" name="city" type="text" required 
        onChange={handleChange} value={formData.city}/>
  
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required 
        onChange={handleChange} value={formData.email}/>
  
        <label htmlFor="linkedIn">LinkedIn:</label>
        <input id="linkedIn" name="linkedIn" type="text" required 
        onChange={handleChange} value={formData.linkedIn}/>
  
        <label htmlFor="twitter">Twitter:</label>
        <input id="twitter" name="twitter" type="text" required 
        onChange={handleChange} value={formData.twitter}/>
  
        <div className="actions-section">
          <Link to={'/'}>
            <button className="button blue" type="submit" >
              Back
            </button>
          </Link>
          <button className="button blue" type="submit" >
            Update
          </button>
        </div>
      </form>
    )
}

export default ContactsUpdate