import { useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

function ContactsList({ contacts, setContacts, isPending, error }) {
  //"contacts" must be passed as prop to this component

  let [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("type") || "";
  console.log(searchTerm);
  // const queryString = useLocation();
  // const queryParams = new URLSearchParams(queryString);
  // const query = queryParams.get("type");
  // console.log(query);

  const handleDelete = async (e, id) => {
    console.log(id);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(`http://localhost:4000/contacts/${id}`, options);
    fetch("http://localhost:4000/contacts/")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      });
  };

  const handleChange = (e) => {
    const type = e.target.value;
    if (type) {
      setSearchParams({ type });
    }
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <div className="filter">
        <form>
          <label htmlFor="personal">Personal</label>
          <input
            onChange={handleChange}
            type="radio"
            name="personal-work"
            value="personal"
            id="personal"
          />

          <label htmlFor="work">Work</label>
          <input
            type="radio"
            name="personal-work"
            value="work"
            id="work"
            onChange={handleChange}
          />
          <label htmlFor="all">All</label>
          <input
            onChange={handleChange}
            type="radio"
            name="personal-work"
            value="all"
            id="all"
          />
        </form>
      </div>
      <ul className="contacts-list">
        {error && <p>{error.message}</p>}
        {isPending && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        {!isPending &&
          contacts
            .filter((contact) => {
              if (searchTerm === "all" || !searchTerm) return true;
              return contact.type === searchTerm;
            })
            .map((contact, index) => {
              const { firstName, lastName } = contact;
              return (
                <li
                  className={`contact ${
                    contact.type === "personal" ? "yellow" : "green"
                  }`}
                  key={index}
                >
                  <p>
                    {firstName} {lastName}
                  </p>
                  <p>
                    {/** TODO: Make a Link here to view contact */}
                    <Link to={`/contacts/${contact.id}`}> View</Link>
                    <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
                    <button onClick={(e) => handleDelete(e, contact.id)}>
                      Delete
                    </button>
                  </p>
                </li>
              );
            })}
      </ul>
    </>
  );
}

export default ContactsList;
