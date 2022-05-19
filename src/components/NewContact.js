import React, { useState } from "react";
import "./NewContact.css";

const NewContact = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    address: "",
    city: "",
  });

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    setForm({
      name: "",
      surname: "",
      address: "",
      city: "",
    });
    console.log(form);
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
            <label htmlFor="first-name">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="first-name"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
            ></input>

            <label htmlFor="last-name">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="last-name"
              required
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
              value={form.surname}
            ></input>

            <label htmlFor="street">
              <strong>Street Address</strong>
            </label>
            <input
              type="text"
              placeholder="Street"
              name="street"
              required
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              value={form.address}
            ></input>
            <label htmlFor="city">
              <strong>City</strong>
            </label>
            <input
              type="text"
              placeholder="City"
              name="city"
              required
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              value={form.city}
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
