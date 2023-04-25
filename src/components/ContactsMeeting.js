import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const initialState = {
  title: "",
  time: "",
  location: "",
};

function ContactsMeeting() {
  const [contact, setContact] = useState(false);
  const [meetings, setMeetings] = useState({});
  const [formData, setFormData] = useState(initialState);

  const params = useParams();

  useEffect(function () {
    fetch(`http://localhost:3030/contacts/${params.id}/meetings`)
      .then((res) => res.json())
      .then((data) => setMeetings(data));
  }, []);

  useEffect(function () {
    fetch(`http://localhost:3030/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);

  const handleSubmit = async (e) => {
    const res = await fetch(
      `http://localhost:3030/contacts/${params.id}/meetings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    setMeetings([...meetings, data]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>
        List of meetings for {contact.firstName} {contact.lastName}
      </h2>

      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <h3>New meeting</h3>

        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          value={formData.title}
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={handleChange}
          value={formData.location}
        />

        <label htmlFor="time">Time:</label>
        <input
          id="time"
          name="time"
          type="text"
          onChange={handleChange}
          value={formData.time}
        />

        <div className="actions-section">
          <button className="button blue" type="submit">
            Create
          </button>
        </div>
      </form>

      <ul className="contacts-list">
        {meetings.map((meeting, index) => {
          const { title, time, location } = meeting;
          return (
            <li className="contact" key={index}>
              <p>
                {title} {time} {location}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContactsMeeting;
