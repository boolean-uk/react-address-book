import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ContactMeetings() {
  const params = useParams();
  const [contact, setContact] = useState(false);
  const [meetings, setMeetings] = useState([]);

  const [formData, setFormdata] = useState({
    activity: "",
    location: "",
    date: "",
    time: "",
    contactId: params.id,
  });
  useEffect(function () {
    fetch(`http://localhost:4000/meetings?contactId=${params.id}`)
      .then((res) => res.json())
      .then((data) => setMeetings(data));
  }, []);

  useEffect(function () {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setContact(data));
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/meetings", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMeetings([...meetings, data]);
  };

  return (
    <>
      <h2>
        Meetings with {contact.firstName} {contact.lastName}
      </h2>
      <form className="meetings-form" onSubmit={handleSubmit}>
        <label htmlFor="activity">Activity: </label>
        <input
          id="activity"
          name="activity"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="location">Location: </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="date">Date: </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          onChange={handleChange}
        />
        <label htmlFor="time">Time: </label>
        <input
          id="time"
          name="time"
          type="time"
          required
          onChange={handleChange}
        />
        <button className="button-add-meeting" type="submit">
          Add Meeting
        </button>
      </form>
      <ul className="meetingsList">
        {meetings.map((meeting, index) => {
          const { activity, date, time, location } = meeting;
          return (
            <li className="meeting" key={index}>
              <p>
                {activity} {location} {date} {time}{" "}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactMeetings;
