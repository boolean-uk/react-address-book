import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContactEdit(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;
  const { id } = useParams();

  //TODO: Implement controlled form
  //send POST to json server on form submit
  //add new contact to state
  //navigate to contacts list
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.reportValidity()) return;
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        firstName,
        lastName,
        street,
        city,
        facebook,
        twitter,
        linkedin,
      }),
    }).then((response) => {
      response.json().then((data) => {
        //Update contacts list
        setContacts((prevContacts) => {
          const updatedContacts = prevContacts.map((contact) => {
            if (contact.id == id) {
              return {
                id: contact.id,
                firstName: data.firstName,
                lastName: data.lastName,
                street: data.street,
                city: data.city,
                facebook: data.facebook,
                twitter: data.twitter,
                linkedin: data.linkedin,
              };
            }
            return contact;
          });
          return updatedContacts;
        });
        navigate("/");
      });
    });
  };

  useEffect(() => {
    if (id) {
      const data = contacts.find((contact) => contact.id === Number(id));
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setStreet(data.street);
      setCity(data.city);
      setFacebook(data.facebook);
      setTwitter(data.twitter);
      setLinkedin(data.linkedin);
    } else window.alert("No contact found");
  }, []);

  const handleChange = (source, target) => {
    target(source.value);
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        value={firstName}
        name="firstName"
        type="text"
        required
        onChange={(e) => handleChange(e.target, setFirstName)}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        value={lastName}
        name="lastName"
        type="text"
        required
        onChange={(e) => handleChange(e.target, setLastName)}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        value={street}
        name="street"
        type="text"
        required
        onChange={(e) => handleChange(e.target, setStreet)}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        value={city}
        name="city"
        type="text"
        required
        onChange={(e) => handleChange(e.target, setCity)}
      />

      <label htmlFor="facebook">Facebook:</label>
      <input
        id="facebook"
        value={facebook}
        name="facebook"
        type="text"
        onChange={(e) => handleChange(e.target, setFacebook)}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        value={twitter}
        name="twitter"
        type="text"
        onChange={(e) => handleChange(e.target, setTwitter)}
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        id="linkedin"
        value={linkedin}
        name="linkedin"
        type="text"
        onChange={(e) => handleChange(e.target, setLinkedin)}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
}

export default ContactEdit;
