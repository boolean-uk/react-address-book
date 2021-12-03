function CreateContactForm() {
  // [TODO] Write form handlers here and POST requests here...

  return (
    <form className="form-stack light-shadow center contact-form">
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input id="first-name-input" name="first-name-input" type="text" />
      <label htmlFor="last-name-input">Last Name:</label>
      <input id="last-name-input" name="last-name-input" type="text" />
      <label htmlFor="street-input">Street:</label>
      <input id="street-input" name="street-input" type="text" />
      <label htmlFor="city-input">City:</label>
      <input id="city-input" name="city-input" type="text" />
      <label htmlFor="post-code-input">Post Code:</label>
      <input id="post-code-input" name="post-code-input" type="text" />
      <div className="checkbox-section">
        <input id="block-checkbox" name="block-checkbox" type="checkbox" />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateContactForm;
