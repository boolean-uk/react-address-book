import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit({ setContacts, contacts }) {
  const navigate = useNavigate();
  const params = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  useEffect(() => {
    fetchInitialValue();
  }, []);

  const fetchInitialValue = () => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setStreet(data.street);
        setCity(data.city);
        setEmail(data.email);
        setLinkedin(data.linkedin);
        setTwitter(data.twitter);
      })
      .catch((error) => {
        console.error("Error fetching initial value:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      firstName,
      lastName,
      street,
      city,
      email,
      linkedin,
      twitter,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedContact),
    };

    fetch(`http://localhost:4000/contacts/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/contacts")
          .then((response) => response.json())
          .then((data) => setContacts(data));
        navigate("/contacts");
      });
  };

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <>
      {contacts.map(
        (contact) =>
          contact.id.toString() === params.id && (
            <form
              className="form-stack contact-form"
              onSubmit={handleSubmit}
              key={contact.id}
            >
              <h2>Edit Contact</h2>

              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => handleChange(e, setFirstName)}
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => handleChange(e, setLastName)}
              />

              <label htmlFor="street">Street:</label>
              <input
                id="street"
                name="street"
                type="text"
                required
                value={street}
                onChange={(e) => handleChange(e, setStreet)}
              />

              <label htmlFor="city">City:</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={city}
                onChange={(e) => handleChange(e, setCity)}
              />

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
              />

              <label htmlFor="linkedin">LinkedIn URL:</label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => handleChange(e, setLinkedin)}
              />

              <label htmlFor="twitter">Twitter URL:</label>
              <input
                id="twitter"
                name="twitter"
                type="url"
                value={twitter}
                onChange={(e) => handleChange(e, setTwitter)}
              />

              <div className="actions-section">
                <button className="button blue" type="submit">
                  Create
                </button>
              </div>
            </form>
          )
      )}
    </>
  );
}

export default ContactsEdit;
