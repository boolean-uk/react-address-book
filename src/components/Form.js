import { useState, useEffect } from "react"

export default function Form({ form, buttonName, submitForm }) {
    const emptyForm = {
        contactType: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        email: '',
        linkedIn: '',
        twitter: ''
    }
    const [formData, setFormData] = useState(emptyForm)

    const objectIsEmptyOrNull = (o) => {
        if (form && Object.keys(form).length === 0)
            return true;
        return false;
    }

    useEffect(() => {
        if (!objectIsEmptyOrNull(form))
            setFormData(form)
    }, [form])
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <form className="form-stack contact-form" 
                onSubmit={e => submitForm(e, formData)}>
            <h2>Create Contact</h2>

            <label htmlFor="contact-type">First Name</label>
            <select id="contact-type" name="contactType" 
                    onChange={e => handleChange(e)}>
                <option value="work ">Work</option>
                <option value="personal">Personal</option>
            </select>

            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" required
                onChange={e => handleChange(e)} value={formData.firstName} />

            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" name="lastName" type="text" required 
                onChange={e => handleChange(e)} value={formData.lastName} />

            <label htmlFor="street">Street:</label>
            <input id="street" name="street" type="text" required
            onChange={e => handleChange(e)} value={formData.street} />

            <label htmlFor="city">City:</label>
            <input id="city" name="city" type="text" required
            onChange={e => handleChange(e)} value={formData.city}/>

            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="text" required
            onChange={e => handleChange(e)} value={formData.email}/>

            <label htmlFor="linkedIn">LinkedIn:</label>
            <input id="linkedIn" name="linkedIn" type="text" required
            onChange={e => handleChange(e)} value={formData.linkedIn}/>

            <label htmlFor="twitter">Twitter:</label>
            <input id="twitter" name="twitter" type="text" required
            onChange={e => handleChange(e)} value={formData.twitter}/>

            <div className="actions-section">
                <button className="button blue" type="submit">
                    {buttonName}
                </button>
            </div>
        </form>
    )
}