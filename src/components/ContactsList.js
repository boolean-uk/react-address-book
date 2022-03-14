import { Link, useSearchParams } from "react-router-dom";
import * as Spinner from "react-loader-spinner"

function ContactsList(props) {
  const { contacts, setContacts, loading } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('type') || '';

  const handleFilter = (event) => {
    const type = event.target.value

    if(type !== "") {
      setSearchParams({ type })
    }
    else {
      setSearchParams({})
    }
  }

  const handleDelete = (contact) => {
    fetch(`http://localhost:4000/contacts/${contact.id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedContacts = contacts.filter(
        (person) => person.id !== contact.id
      );
      setContacts(updatedContacts);
    });


  };

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <div>
      <select name="filter-contacts" id="filter-contacts" onChange={handleFilter} value={searchValue}>
        <option value="">Show All</option>
        <option value="work">Work Only</option>
        <option value="personal">Personal Only</option>
      </select>
      </div><br/>
      <ul className='contacts-list'>
        {loading ? ( <Spinner.TailSpin color={`#008B8B`} />
        ) : (
          contacts
            .filter((contact) => contact.type.includes(searchValue))
            .map((contact, index) => {
              const { firstName, lastName } = contact;
              return (
                <li className='contact' key={index}>
                  <p>
                    {firstName} {lastName}{" "}
                    {contact.type === "work" ? "👷‍♀️" : "🏡"}
                  </p>
                  <p>
                    <span>
                      <Link to={`/contacts/${contact.id}`}>View</Link>
                    </span>
                    <span>
                      <Link
                        to={`/contacts/${contact.id}/edit`}
                        state={{ contact }}
                      >
                        Edit
                      </Link>
                    </span>
                    <span>
                      <a href='#' onClick={() => handleDelete(contact)}>
                        Delete
                      </a>
                    </span>
                  </p>
                </li>
              );
            })
        )}
      </ul>
    </>
  );
}

export default ContactsList;
