import React from "react";

export default function contactInfoForm({
  handleChange,
  handleSubmit,
  newContact,
}) {
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        onChange={handleChange}
        value={newContact.firstName}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        onChange={handleChange}
        value={newContact.lastName}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        onChange={handleChange}
        value={newContact.street}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        value={newContact.city}
      />

      <label htmlFor="email">email:</label>
      <input
        id="email"
        name="email"
        type="text"
        required
        onChange={handleChange}
        value={newContact.email}
      />

      <label htmlFor="linkedIn">linkedIn:</label>
      <input
        id="linkedIn"
        name="linkedIn"
        type="text"
        required
        onChange={handleChange}
        value={newContact.linkedIn}
      />

      <label htmlFor="twitter">twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        onChange={handleChange}
        value={newContact.twitter}
      />

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
