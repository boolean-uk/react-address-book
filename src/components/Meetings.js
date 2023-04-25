import { useState } from "react"

export default function Meetings () {

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] :e.target.value})
    }

    //handleSubmit TODO

    //get all meetings

    return (
    <div>
        <form className="form-stack contact-form">
            <h3>Create Form</h3>

            <label htmlFor="date">Date:</label>
            <input id="date" name="date" type="text" required onChange={handleChange} value={formData.date}/>

            <label htmlFor="time">Time:</label>
            <input id="time" name="time" type="text" required onChange={handleChange} value={formData.time}/>

            <label htmlFor="location">Location:</label>
            <input id="location" name="location" type="text" required onChange={handleChange} value={formData.location}/>

            <div className="actions-section">
            <button className="button blue" type="submit">
                Create
            </button>
            </div>
        </form>
    </div>
    )
}