import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MeetingsAdd(props) {
  const navigate = useNavigate();
  const { contacts, setMeetings } = props;
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [meeting, setMeeting] = useState({
    subject: "",
    date: "",
    time: "",
    planned_duration: 0,
    participants: [],
  });

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "subject") {
      setMeeting({ ...meeting, subject: inputValue });
    }
    if (inputName === "date") {
      setMeeting({ ...meeting, date: inputValue });
    }
    if (inputName === "time") {
      setMeeting({ ...meeting, time: inputValue });
    }
    if (inputName === "planned_duration") {
      setMeeting({ ...meeting, planned_duration: inputValue });
    }
  };

  const handleCheckBoxChange = (id) => {
    if (!selectedParticipants.includes(id)) {
      setSelectedParticipants([...selectedParticipants, id]);
    } else {
      const updatedParticipants = selectedParticipants.filter(
        (thisParticipant) => {
          if (thisParticipant !== id) {
            return thisParticipant;
          }
        }
      );
      setSelectedParticipants(updatedParticipants);
      setMeeting({ ...meeting, participants: selectedParticipants });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMeetingPostRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };
    try {
      fetch("http://localhost:4000/meetings", newMeetingPostRequest).then(
        (response) => {
          response.json();
          fetch("http://localhost:4000/contacts")
            .then((res) => res.json())
            .then((data) => {
              setMeetings(data);
              navigate("/meetings");
            });
        }
      );
    } catch (err) {
      console;
      console.error(err);
    }
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Create Meeting</h2>

      <label htmlFor="subject">Meeting Subject</label>
      <input
        id="subject"
        name="subject"
        type="text"
        required
        value={meeting.subject}
        onChange={handleChange}
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="text"
        required
        value={meeting.date}
        onChange={handleChange}
      />

      <label htmlFor="time">Time:</label>
      <input
        id="time"
        name="time"
        type="text"
        required
        value={meeting.time}
        onChange={handleChange}
      />

      <label htmlFor="planned_duration">Planned Duration:</label>
      <input
        id="planned_duration"
        name="planned_duration"
        type="number"
        required
        value={meeting.planned_duration}
        onChange={handleChange}
      />

      <p>Participants:</p>
      <div className="contactsForMeeting">
        <label>
          {contacts.map((contact, index) => (
            <p key={`participants${index}`}>
              <input
                type="checkbox"
                id={contact.id}
                name={`participants${index}`}
                onChange={(e) => handleCheckBoxChange(contact.id)}
                checked={selectedParticipants.includes(contact.id)}
              />
              &nbsp;{contact.firstName} {contact.lastName}
            </p>
          ))}
        </label>
      </div>

      <div className="actions-section">
        <button className="actionButton" type="submit">
          Create
        </button>
        <span className="actionButton" onClick={(e) => navigate(-1)}>
          Cancel
        </span>
      </div>
    </form>
  );
}

export default MeetingsAdd;

/*
      <div className="contactsForMeeting">
        {contacts.map((contact, index) => (
          <input
            type="checkbox"
            key={`checkbox${index}`}
            id={contact.id}
            name="participants"
            value={contact.id}
            onChange={handleCheckBoxChange}
          >
            {contact.firstName} {contact.lastName}
          </input>
        ))}
*/
