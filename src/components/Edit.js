import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialData = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: "",
};

const Edit = ({ setContacts }) => {
  const [editContact, setEditContact] = useState(initialData);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchData(id) {
    const response = await fetch(`http://localhost:3000/contacts/${id}`);
    const data = await response.json();
    setEditContact(data);
  }

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    const opts = {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(editContact),
    };

    fetch(`http://localhost:3000/contacts/${id}`, opts)
      .then((res) => res.json())
      .then((data) => {});

    setContacts((previous) => {
      const updatedArray = previous.map((item) => {
        if (item.id === editContact.id) return editContact;
        return item;
      });
      setContacts(updatedArray);
    });
    navigate("/");
  };

  const formInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditContact({ ...editContact, [name]: value });
  };

  return (
    <section className="form-component">
      <form onSubmit={onSubmitFormHandler}>
        <h1>Edit Existing Contact</h1>
        <div className="icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="form-container">
          <div className="container">
            <label htmlFor="firstName">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              required
              onChange={formInputChangeHandler}
              value={editContact.firstName}
            ></input>

            <label htmlFor="lastName">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              required
              onChange={formInputChangeHandler}
              value={editContact.lastName}
            ></input>

            <label htmlFor="street">
              <strong>Street Address</strong>
            </label>
            <input
              type="text"
              placeholder="Street"
              name="street"
              id="street"
              required
              onChange={formInputChangeHandler}
              value={editContact.street}
            ></input>
            <label htmlFor="city">
              <strong>City</strong>
            </label>
            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              required
              onChange={formInputChangeHandler}
              value={editContact.city}
            ></input>
            <label htmlFor="email">email:</label>
            <input
              id="email"
              name="email"
              type="text"
              required
              onChange={formInputChangeHandler}
              value={editContact.email}
            />

            <label htmlFor="linkedIn">linkedIn:</label>
            <input
              id="linkedIn"
              name="linkedIn"
              type="text"
              required
              onChange={formInputChangeHandler}
              value={editContact.linkedIn}
            />

            <label htmlFor="twitter">twitter:</label>
            <input
              id="twitter"
              name="twitter"
              type="text"
              required
              onChange={formInputChangeHandler}
              value={editContact.twitter}
            />
          </div>
          <button type="submit">
            <strong>Update Contact</strong>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Edit;
