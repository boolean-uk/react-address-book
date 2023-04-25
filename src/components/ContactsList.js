import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/mine.css";
function ContactsList(props) {
  const { contacts, setContacts } = props;
  const [meetings, setMeetings] = useState([]);

  const deleteMeeting = async(num) => {
    await fetch(`http://localhost:3030/contacts${num}`, {
        method: "DELETE",
      });
  }
  const deleteContact = async (e) => {
    const newContacts = contacts.filter((item) => item.id !== e.target.id);
    setContacts(newContacts);
    const res = fetch("http://localhost:3030/contacts/" + [e.target.id], {
      method: "DELETE",
    });
    //referesh the data
    await fetch("http://localhost:3030/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
    // const res2 = await fetch(
    //   `http://localhost:3030/meetings?person=${e.target.id}`
    // );
    // const data = (await res).json();
    // setMeetings(data)
    // data.forEach(element => deleteMeeting(element.id))
    // meetings.forEach(async (meeting) => {
    //   await fetch(`http://localhost:3030/meetings/${meeting.id}`, {
    //     method: "DELETE",
    //   })
    // });
  };
  //"contacts" must be passed as prop to this component

  return (
    <>
      {console.log(meetings)}
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact;
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`} className="Link">
                  View
                </Link>
                <Link to={`/contacts/${contact.id}/edit`} className="Link">
                  Edit
                </Link>
                <button onClick={deleteContact} id={contact.id}>
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
