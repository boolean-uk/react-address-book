import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit(props){
    const {contacts,setContacts} = props
    const navigate = useNavigate()
    const [form,setForm] = useState({})
    const params = useParams()
    useEffect(function () {
        fetch(`http://localhost:3030/contacts/${params.id}`)
          .then((res) => res.json())
          .then((data) => setForm(data));
      }, []);
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: [e.target.value] });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = fetch(`http://localhost:3030/contacts/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await fetch("http://localhost:3030/contacts/")
        .then((res) => res.json())
        .then((data) => setContacts(data));
        //i am already doing the update in the update function
        // navigate('/') can do this, gonna troubleshoot
        navigate(`/contacts/${params.id}`);
      };
    
      return (
        <form className="form-stack contact-form" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
    
          <label htmlFor="firstName">First Name</label>
          <input
            value={form.firstName}
            onChange={handleChange}
            id="firstName"
            name="firstName"
            type="text"
            required
          />
    
          <label htmlFor="lastName">Last Name:</label>
          <input
            value={form.lastName}
            onChange={handleChange}
            id="lastName"
            name="lastName"
            type="text"
            required
          />
    
          <label htmlFor="street">Street:</label>
          <input
            value={form.street}
            onChange={handleChange}
            id="street"
            name="street"
            type="text"
            required
          />
    
          <label htmlFor="city">City:</label>
          <input
            value={form.city}
            onChange={handleChange}
            id="city"
            name="city"
            type="text"
            required
          />
    
          <label htmlFor="email">Email:</label>
          <input
            value={form.email}
            onChange={handleChange}
            id="email"
            name="email"
            type="text"
          />
    
          <label htmlFor="linkedin">LinkedIn:</label>
          <input
            value={form.linkedin}
            onChange={handleChange}
            id="linkedin"
            name="linkedin"
            type="text"
          />
    
          <label htmlFor="twitter">Twitter:</label>
          <input
            value={form.twitter}
            onChange={handleChange}
            id="twitter"
            name="twitter"
            type="text"
          />
    
          <div className="actions-section">
            <button className="button blue" type="submit">
              Update
            </button>
          </div>
        </form>
      );

}
export default ContactsEdit