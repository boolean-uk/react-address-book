import { useNavigate, useParams } from "react-router";
import { HTTPCONTACTS } from "../http";
import { useEffect, useState } from "react";

const ContactsEdit = ({ contacts, setContacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(false);

  useEffect(() => {
    fetch(HTTPCONTACTS + `/${id}`)
      .then((res) => res.json())
      .then((data) => setFormState(data));
  }, []);

  const updateData = (data) => {
    fetch(HTTPCONTACTS + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      //   .then((res) => console.dir(res))
      .then((res) => {
        const newContacts = contacts.map((con) => {
          if (con.id === parseInt(id)) return res;
          return con;
        });
        setContacts(newContacts);
      })
      .then(() => navigate("/"));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formState);
  };

  if (!formState) {
    return <span className="loader"></span>;
  }

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={formState.firstName}
        onChange={handleChange}
        placeholder="Joe"
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={formState.lastName}
        onChange={handleChange}
        placeholder="Doe"
        required
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        value={formState.street}
        onChange={handleChange}
        placeholder="1 Main street"
        required
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        value={formState.city}
        onChange={handleChange}
        placeholder="London"
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="email@example.com"
        required
      />
      <label htmlFor="linkedIn">LinkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="url"
        pattern="hTTPContactss://www.linkedin.com/.*"
        value={formState.linkedIn}
        onChange={handleChange}
        placeholder="hTTPContactss://www.linkedin.com/..."
      />
      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="url"
        pattern="hTTPContactss://twitter.com/.*"
        value={formState.twitter}
        onChange={handleChange}
        placeholder="hTTPContactss://twitter.com/..."
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
};
export default ContactsEdit;
