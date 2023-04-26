import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { loading, contacts } = props;

  const [filter, setFilter] = useState(3);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.getAll("type").length === 0) {
      searchParams.set("type", "Personal");
      searchParams.append("type", "Work");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);

    switch (e.target.value) {
      case "1":
        searchParams.set("type", "Personal");
        break;
      case "2":
        searchParams.set("type", "Work");
        break;
      case "3":
        searchParams.set("type", "Personal");
        searchParams.append("type", "Work");
      default:
        break;
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <section className="contact-filter">
        <span className="filter-span">
          <input
            type="radio"
            id="personal"
            name="type"
            value={1}
            checked={filter == 1}
            onChange={handleFilterChange}
          ></input>
          <label htmlFor="personal">🙍</label>
          <input
            type="radio"
            id="work"
            name="type"
            value={2}
            checked={filter == 2}
            onChange={handleFilterChange}
          ></input>
          <label htmlFor="work">💼</label>
          <input
            type="radio"
            id="all"
            name="type"
            value={3}
            checked={filter == 3}
            onChange={handleFilterChange}
          ></input>
          <label htmlFor="all">All</label>
        </span>
      </section>
      <ul className="contacts-list">
        {loading ? (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <></>
        )}
        {contacts
          .filter((contact) =>
            searchParams.getAll("type").includes(contact.type)
          )
          .map((contact, index) => {
            const { firstName, lastName, type } = contact;
            return (
              <li className="contact" key={index}>
                <p>
                  {firstName} {lastName}
                  {type === "Work" ? <span>💼</span> : <span>🙍</span>}
                </p>
                <p>
                  <Link to={`/contacts/${contact.id}`}>View</Link>
                  <Link to={`/contacts/edit/${contact.id}`}>Edit</Link>
                  <Link to={`/contacts/delete/${contact.id}`}>Delete</Link>
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default ContactsList;
