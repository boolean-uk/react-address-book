// Steps

// New Meeting componeent - Needs to have a form to add a new meeting as well as display list of meetings for the clicked on user
// Link to this component needs to be added to the ContactsView - probably pass down the user data / userParams to access id
// Edit db json file  to store the meetings data - each meetings object should have a users array of the id's
// In Meetings component, we need to user json server filters to fetch the correct data - https://github.com/typicode/json-server#getting-started
//
// When adding a new meeting, make sure to add the user id to that meeting on the server
// We need to run useEffect to fetch the new meeting data each time the meeting state is updated

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Meeting() {
  const [contact, setContact] = useState(null);
  const [meetings, setMeetings] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const getMeetings = async () => {
    const res = await fetch(`http://localhost:4000/meetings`);
    const meetings = await res.json();
    setMeetings(meetings);
  };

  const getContact = async () => {
    const res = await fetch(`http://localhost:4000/contacts/${id}`);
    const fetchedContact = await res.json();
    setContact(fetchedContact);
  };

  useEffect(() => {
    getContact();
  }, [id]);

  useEffect(() => {
    getMeetings();
  }, []);

  return (
    <>
      <h1>Meetings</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <form className="form-stack contact-form">
        <h2>Add New Meeting</h2>

        <label htmlFor="firstName">Date</label>
        <input id="firstName" name="firstName" type="text" required />

        <label htmlFor="lastName">Time</label>
        <input id="lastName" name="lastName" type="text" required />

        <label htmlFor="street">Location</label>
        <input id="street" name="street" type="text" required />

        <div className="actions-section">
          <button className="button blue" type="submit">
            Add Meeting
          </button>
        </div>
      </form>

      <h2>
        {!contact && "Meetings"}
        {contact && `Meetings for ${contact.firstName} ${contact.lastName}`}
      </h2>
      <ul>
        {meetings.map((meeting) => {
          return <li key={meeting.id}>{meeting.location}</li>;
        })}
      </ul>
    </>
  );
}

export default Meeting;
