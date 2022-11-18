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

const initialMeeting = {
  date: "",
  time: "",
  location: "",
};

function Meeting() {
  const [contact, setContact] = useState(null);
  const [newMeeting, setNewMeeting] = useState(initialMeeting);
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewMeeting({
      ...newMeeting,
      [name]: value,
    });
  };

  const postMeeting = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newMeeting,
      }),
    };

    const res = await fetch("http://localhost:4000/meetings", options);
    const meeting = await res.json();
    setMeetings([...meetings, meeting]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMeeting();
    setNewMeeting(initialMeeting);
  };

  return (
    <>
      <h1>Meetings</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Add New Meeting</h2>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="text"
          required
          value={newMeeting.date}
          onChange={handleChange}
        />
        <label htmlFor="time">Time</label>

        <input
          id="time"
          name="time"
          type="text"
          required
          value={newMeeting.time}
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={newMeeting.location}
          onChange={handleChange}
        />
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
