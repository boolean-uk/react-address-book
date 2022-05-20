import React, { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";
import { useFetch } from "../hooks/useFetch";
import { baseUrl } from "../utils/baseUrl";
import "./NewContact.css";

const NewContact = ({ contacts, setContacts }) => {
  console.log("9...", contacts);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  });

  const { postData, data, error } = useFetch(`${baseUrl}`, `POST`);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
    });
    postData({ ...formData });
    setContacts([...contacts, formData]);
    console.log("28...", contacts);
  };

  return (
    <section className="form-component">
      <form onSubmit={onSubmitFormHandler}>
        <h1>Add New Contact</h1>
        <div className="icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="formcontainer">
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
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              value={formData.name}
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
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              value={formData.surname}
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
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              value={formData.address}
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
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              value={formData.city}
            ></input>
          </div>
          <button type="submit">
            <strong>Add Contact</strong>
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewContact;
