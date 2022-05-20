import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { baseUrl } from "../utils/baseUrl";
import "./ContactsAdd.css";

const NewContact = ({ contacts, setContacts }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  });

  const { postData, data, error } = useFetch(`${baseUrl}`, `POST`);

  // async function updateLocalServer(el, id) {
  //   const opts = {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({}),
  //   };

  //   const response = await fetch(`${baseUrl}`, opts);
  //   const data = await response.json();
  // }

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    setContacts([...contacts, formData]);
    postData({ ...formData });

    setFormData({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
    });
    navigate("/");
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
