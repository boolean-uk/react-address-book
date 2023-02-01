import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const initialFormState = {
  name: "",
};

function ContactsMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [meetingDate, setMeetingData] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/meetings?contactId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newMeetingData = { ...meetingDta };
    newMeetingData[name] = value;
    setMeetingData(newMeetingData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMeeting = setMeetingData;
    newMeeting.contactID = id;
    const newMeetingJson = JSON.stringify(newMeeting);

    const options = {
      method: "POST",
      body: newMeetingJson,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:4000/meetings`, options)
      .then((res) => res.json())
      .then((data) => {
        setMeetings([...meetings, data]);
      });
  };
  return (
    <>
      <header>
        <h2>Meetings</h2>
      </header>
      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h2>Create A Meeting</h2>
        <label htmlFor="name">Meeting Title</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          onChange={handleChange}
          value={meetingData.name}
        />
        <div className="actions-section">
          <button className="button blue" type="submit">
            Create
          </button>
        </div>
      </form>
      <ul className="contacts-list">
        {meetings.map((meeting, index) => {
          return (
            <li className="contact" key={index}>
              <p>{meeting.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsMeetings;
